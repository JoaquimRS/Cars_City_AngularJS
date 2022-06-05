app.controller("controller_shop", ($scope,$location,toastr,brands_models,fuels,categories,cities,all_cars,services_shop,services_localStorage,$parse)=>{
    var filters = (services_localStorage.getFilters()) ? services_localStorage.getFilters() : {brand :  "",model :  "",price :  "",fuel :  "",category :  "",city :  "",order :  "",page :  "1"};
    var ppp = 5
    services_shop.cars_pages(all_cars,ppp,filters)

    services_localStorage.getToken() ? services_shop.user_likes() : "No token"
    $scope.shop_brands = brands_models[0]
    $scope.shop_models = brands_models[1]
    $scope.shop_fuels = fuels
    $scope.shop_categories = categories
    $scope.shop_cities = cities
    
    // HIGH LIGHTS
    $scope.filter_brands = filters.brand
    $scope.filter_models = filters.model
    $scope.filter_price = filters.price
    $scope.filter_fuels = filters.fuel
    $scope.filter_categories = filters.category
    $scope.filter_cities = filters.city

    $scope.removeFilters = function (){
        delete $scope.filter_brands
        delete $scope.filter_models
        delete $scope.filter_price
        delete $scope.filter_fuels
        delete $scope.filter_categories
        delete $scope.filter_cities
        filters.brand = ""
        filters.model = ""
        filters.price = ""
        filters.fuel = ""
        filters.category = ""
        filters.city = ""
        filters.order = ""
        filters.page = "1"
        services_localStorage.setFilters(filters)
        services_shop.cars_pages(all_cars, ppp, filters)

    }

    $scope.loadPage = function (page){
        filters.page = page
        services_localStorage.setFilters(filters)
        services_shop.cars_pages(all_cars, ppp, filters)
    }
    $scope.filter_change = async function (){
        filters.brand = (this.filter_brands) ? this.filter_brands : ""
        filters.model = (this.filter_models) ? this.filter_models : ""
        filters.price = (this.filter_price) ? this.filter_price : ""
        filters.fuel = (this.filter_fuels) ? this.filter_fuels : ""
        filters.category = (this.filter_categories) ? this.filter_categories : ""
        filters.city = (this.filter_cities) ? this.filter_cities : ""
        services_localStorage.setFilters(filters)
        services_shop.cars_pages(all_cars, ppp, filters)        
    }
    $scope.redirect_details = (idCar)=>{$location.path("/details/"+idCar)}

    $scope.clickLike = function (){
        var idCar = this.car.id_coche
        $parse("like_focus_"+idCar)($scope) ? $parse("like_focus_"+idCar).assign($scope, false) : $parse("like_focus_"+idCar).assign($scope, true)
        services_localStorage.getToken() ? services_shop.mod_user_like(idCar) : ($location.path("/login"),toastr.info("Debes iniciar sesión"))
       
    }
})
