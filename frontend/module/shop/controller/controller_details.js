app.controller("controller_details", ($scope,$location,$routeParams,services_shop)=>{
    var idCar = $routeParams.id
    $scope.id_details = idCar

    services_shop.car_info(idCar)
    
    $scope.main_img = (url_img)=>{$scope.details_car.IMG = url_img}
    $scope.return_shop = ()=>{$location.path("/shop")}
    $scope.redirec_related = (idCar)=>{$location.path("/details/"+idCar)}
})
