var app = angular.module('Cars-City', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/contact", {
            templateUrl: "frontend/module/contact/view/contact.html", 
            controller: "controller_contact"
        }).otherwise({
            templateUrl: "frontend/view/inc/error404.html", 
        });
}]);
