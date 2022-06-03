app.factory("services_login",["services","$location","$rootScope","services_validate","services_localStorage","toastr",(services,$location,$rootScope,services_validate,services_localStorage,toastr)=>{
    let service = {
        submit_login:submit_login,
        submit_register:submit_register
    }
    return service;
    function loadLastLocation() {
        $rootScope.login_status = true
        var ll = services_localStorage.getLastLocation()
        $location.path(ll)

    }
    function submit_login(forminfo) {
        if(services_validate.validate_login(forminfo)){
            services.post('login','submit_login',forminfo)
            .then((json)=>{
                var check=true

                json.error ? ($rootScope.error_login=json.error, check=false, toastr.error(json.error)) : ""
                
                json.msg ? (toastr.info(json.msg),check=false) : ""

                check ? (services_localStorage.setToken(json),loadLastLocation()) : ""
            
            },(error)=>{
                console.log(error);
            });
        }

    }
    function submit_register(forminfo) {
        forminfo.url = "http://ximo.com/tema7_ximo/#/verify/"
        if(services_validate.validate_register(forminfo)){
            services.post('login','submit_register',forminfo)
            .then((json)=>{
                var check=true

                json.error ? ($rootScope.error_reg=json.error, check=false, toastr.error(json.error)) : ""
                
                json.msg ? (toastr.info(json.msg),check=false) : ""                
            
            },(error)=>{
                console.log(error);
            });
        }
    }
}]);
