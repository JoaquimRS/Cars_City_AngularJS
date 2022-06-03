app.controller("controller_verify", ($location,services_verify,$routeParams, $scope)=>{
    services_verify.verify_user($routeParams.token)

    $scope.verify_login = ()=>{
        $location.path("/login")
    }
    
})
