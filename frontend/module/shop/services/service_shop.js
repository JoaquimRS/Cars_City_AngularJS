app.factory("services_shop",["services","$rootScope",(services,$rootScope)=>{
    let service = {
        cars_pages:cars_pages
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
        

    }
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
        loadGmaps()
        loadSwiper()
        
    }
    function loadSwiper() {
        setTimeout(() => {
            const swiper = new Swiper('.swiper', {
                loop :  false,
                slidesPerView :  1,
                spaceBetween :  1,
                pagination :  {
                    el :  '.swiper-pagination',
                    type :  'fraction',
                    },
                centeredSlides :  true,
                navigation :  {
                    nextEl :  '.swiper-button-next',
                    prevEl :  '.swiper-button-prev',
                  },
            });
        }, 500)
    }
    function loadGmaps() {
        var centerPoint = { lat :  38.78317511958979, lng :  -0.7851077280611519 };
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom :  8,
            center :  centerPoint,
            gestureHandling :  "auto",
            zoomControl :  true,
          });
        $rootScope.shop_cars.forEach((car, i)=>{
            const carPos = { lat :  parseFloat(car.lat), lng :  parseFloat(car.lng) };
            const infowindow = new google.maps.InfoWindow({
                content :  '<div id="root-gmaps">' +
                            '<div class="swiper_gmaps">'+
                                '<div class="swiper-wrapper">'+
                                    '<div class="swiper-slide" ng-repeat="carImg in car.carImages">'+
                                        '<img src="frontend/view/img/cars/'+car.IMG+'" class="gmaps_img"></img>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                            '<div id="gmaps_content">' +
                                '<b>'+car.nombre_marca + " " + car.nombre_modelo+'</b><br>'+
                                '<span>Ciudad :  '+car.ciudad+'</span><br>'+
                                '<span>Precio :  '+car.precio+'€</span><br>'
    
            });
            
            const marker = new google.maps.Marker({
            position :  carPos,
            map,
            title :  car.nombre_marca + " " + car.nombre_modelo,
            animation :  google.maps.Animation.DROP, //animacio per a cada marcador
            });
    
            marker.addListener("click", () => {
            if (infowindow.getMap()) {
                infowindow.close();  
            }
            else {
                infowindow.open({
                    anchor :  marker,
                    map,
                    shouldFocus :  false,
                    });
                }
            });
        })
    }
}]);
