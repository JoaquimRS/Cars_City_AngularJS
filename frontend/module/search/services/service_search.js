app.factory("services_search",["services","$rootScope",(services,$rootScope)=>{
    let service = {
        brands:brands,
        categories:categories,
        cities:cities,
        filter_cities:filter_cities
    };
    return service;
    function brands() {
        services.get('search','brands')
        .then((jsonBrands)=>{
            $rootScope.search_brands = jsonBrands;
        },(error)=>{
            console.log(error);
        })
    };
    function categories() {
        services.get('search','categories')
        .then((jsonCategories)=>{
            $rootScope.search_categories = jsonCategories;
        },(error)=>{
            console.log(error);
        })
    };
    function cities() {
        services.get('search','cities')
        .then((jsonCities)=>{
            $rootScope.search_cities = jsonCities;
        }, (error)=>{
            console.log(error);
        })
    }
    function filter_cities(filters) {
        services.post('search','filter_cities',filters)
        .then((jsonCities)=>{
            $rootScope.search_cities = jsonCities;
        }, (error)=>{
            console.log(error);
        })
    }
}]);