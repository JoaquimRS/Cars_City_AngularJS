app.factory("services_middleware",["$window","$location","services","$rootScope", "services_localStorage",($window, $location, services,$rootScope,services_localStorage)=>{
    let service = {
        decode:decode,
        logout:logout
    };
    return service;
    function decode() {
        var token = services_localStorage.getToken()
        services.post('login','data_user',{token:token})
        .then((userinfo)=>{
            if (userinfo == "false") {
                $rootScope.login_status = false
                console.log("false");
            } else {
                $rootScope.url_user_image = userinfo.avatar
                $rootScope.login_status = true
            }

        }, (error)=>{
            console.log(error);
        })
    };
    function logout() {  
        services_localStorage.deleteToken()
        $location.path("/login")
        $rootScope.login_status = false
    };
}]);