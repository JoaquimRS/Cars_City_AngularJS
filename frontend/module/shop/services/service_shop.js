app.factory("services_shop",["services","$rootScope","services_gmaps","services_swiper","services_localStorage","$parse",(services,$rootScope,services_gmaps,services_swiper,services_localStorage,$parse)=>{
    let service = {
        cars_pages:cars_pages,
        car_info:car_info,
        mod_user_like:mod_user_like,
        user_likes:user_likes
    };
    return service;  
    
    function cars_pages(cars, ppp, filters) {
        var notfilters
        
        for (let key of Object.keys(filters)) {
            let value = filters[key]
            if (key!="page"){
                if(value){
                    notfilters=false
                    //Existen filtros
                }
            }
        }
        if (notfilters==false) {
            services.post('shop','filter_cars',filters)
            .then((jsonFilteredCars)=>{
                return pagination_cars(jsonFilteredCars,ppp,filters);
            },(error)=>{
                console.log(error);
            });
        } else {
            return pagination_cars(cars,ppp,filters);
        }
        

    };
    async function pagination_cars(cars, ppp,filters){
        np = Math.ceil(cars.length/ppp)
        var prods = []
        var divcars = []
        let j = 0
        let lng = ppp
        for (let i = 1; i <= np; i++) {
            lng=lng + j
            for (j; j < lng; j++) {
                if (cars[j]){
                    divcars.push(cars[j])   
                } else {
                    break
                }                           
            }
            prods.push(divcars);
            divcars = []
        }
        $rootScope.shop_cars_pages = prods
        $rootScope.shop_cars = ((filters.page-1)>=prods.length) ? prods[prods.length-1] : prods[filters.page-1]
        services_gmaps.loadGmaps()
        services_swiper.loadSwiper()
        
    }
    function car_info (idCar) {
        services.get('shop','car',idCar)
        .then((jsonCarInfo)=>{
            $rootScope.details_car = jsonCarInfo
            services_swiper.loadSwiperDetails()
            services_gmaps.loadGmapsDetails()
            related_cars()
        },(error)=>{
            console.log(error);
        })
    };

    function related_cars () {
        services.post('shop','related_cars',$rootScope.details_car)
        .then((jsonRelated)=>{
            $rootScope.related_cars = jsonRelated
        },(error)=>{
            console.log(error);
        })
    };

    function user_likes() {
        var token = {token:services_localStorage.getToken()}
        var model
        services.post('shop','user_likes',token)
        .then((jsonUserLikes)=>{
            jsonUserLikes.forEach(Like => {
                model = $parse("like_focus_"+Like.id_coche)
                model.assign($rootScope, true)
            });
        },(error)=>{
            console.log(error);
        })
    };

    function mod_user_like(idCar) {
        var likeinfo = {
            idCar:idCar,
            token:services_localStorage.getToken()
        }
        services.post('shop','mod_user_like',likeinfo)
        .then((jsonUserLike)=>{
            
        },(error)=>{
            console.log(error);
        })
    };
}]);
