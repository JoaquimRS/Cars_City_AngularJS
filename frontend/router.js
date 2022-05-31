var app = angular.module('Cars-City', ['ngRoute','routeStyles','toastr']);

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
                },
                news: (services)=>{
                    return services.get_url('https://gnews.io/api/v4/search?q=cars&max=9&lang=es&token=496f742b965e88ec8fbcf250f0e26959')
                }                
            }

        })
        .when("/shop",{
            templateUrl: "frontend/module/shop/view/shop.html",
            css: ["frontend/view/css/shop.css","frontend/view/css/details.css"],
            controller: "controller_shop",
            resolve: {
                brands_models: (services)=>{
                    return services.get('shop','brands_models')
                },
                fuels: (services)=>{
                    return services.get('shop','fuels')
                },
                categories: (services)=>{
                    return services.get('shop','categories')
                },
                cities: (services)=>{
                    return services.get('shop','cities')
                },
                all_cars: (services)=>{
                    return services.get('shop','cars')
                }

            }
        })
        .when("/details/:id",{
            templateUrl: "frontend/module/shop/view/details.html",
            css: ["frontend/view/css/shop.css","frontend/view/css/details.css"],
            controller: "controller_details"
        })
        .when("/login",{
            templateUrl: "frontend/module/login/view/login.html",
            css: ["frontend/view/css/login.css"],
            controller: "controller_login"
        })
        .when("/verify/:token",{
            templateUrl: "frontend/module/login/view/verify.html",
            css: ["frontend/view/css/login.css"],
            controller: "controller_verify"
        })
        .when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html", 
            controller: "controller_contact"
        }).when("/error",{
            templateUrl: "frontend/view/inc/error404.html",
            css: ['frontend/view/css/error.css']
        })
        .otherwise({
            redirectTo: "/home"
        });
}]);
app.run(($rootScope, $location, $window, services, services_search)=>{
    $rootScope.c_menu = $location.path()
    $rootScope.login_status = (localStorage.getItem("token")) ? true : false
    $rootScope.redirect_login = ()=> {
        localStorage.setItem("ll",$location.path())
        $location.path("/login")
    }
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
        filters.brand = (this.brands!=null)?this.brands:""
        filters.category = (this.categories!=null)?this.categories:""
        filters.order = (this.order!=null)?this.order:""
        filters.city = (this.cities!=null)?this.cities:""
        services_search.filter_cities(filters);
    }
    $rootScope.redirect_shop = ()=>{
        localStorage.setItem("filters",JSON.stringify(filters))
        var redirect = ($location.path()=="/shop") ? $window.location.reload() : $location.path("/shop")

    }
    $rootScope.search_icon = function () {
        $rootScope.search_focus = ($rootScope.search_focus) ? false : true;
        $rootScope.search_style=($rootScope.search_focus) ? {'display': 'flex'} : {'display': 'none'};

    }

    services_search.brands();
    services_search.categories();
    services_search.cities();
});
