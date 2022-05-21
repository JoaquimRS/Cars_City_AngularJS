var app = angular.module('Cars-City', ['ngRoute']);

app.config(['$routeProvider', ($routeProvider)=>{
    $routeProvider
        .when("/home", {
            templateUrl: "frontend/module/home/view/home.html", 
            controller: "controller_home",
            resolve: {
                brands: (services)=>{
                    return services.get('home','brands')
                },
                fuels: (services)=>{
                    return services.get('home','fuels')
                },
                categories: (services)=>{
                    return services.get('home','categories')
                }
                // news: (services)=>{
                //     return services.get_url('https://gnews.io/api/v4/search?q=cars&max=9&lang=es&token=496f742b965e88ec8fbcf250f0e26959')
                // }                
            }

        })
        .when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html", 
            controller: "controller_contact"
        }).otherwise({
            templateUrl: "frontend/view/inc/error404.html", 
        });
}]);
app.run(($rootScope, services, services_search)=>{
    var filters = {
        brand: "",
        model: "",
        price: "",
        fuel: "",
        category: "",
        city: "",
        order: "",
        page: "1"

    };
    if (localStorage.getItem("filters")){
        // no filters
    } else {
        localStorage.setItem("filters",JSON.stringify(filters))
    }
    $rootScope.change_search = function(){
        filters.brand = this.brands
        filters.category = this.categories
        filters.order = this.order
        filters.city = this.cities
        services_search.filter_cities(filters);
    }
    $rootScope.redirect_shop = ()=>{
        localStorage.setItem("filters",JSON.stringify(filters))
        //redirect -> shop en els filtros en localstorage
    }
    services_search.brands();
    services_search.categories();
    services_search.cities();
});
