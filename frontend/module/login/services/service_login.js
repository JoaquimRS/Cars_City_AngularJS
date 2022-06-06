app.factory("services_login",["services","$location","$rootScope","services_validate","services_localStorage","services_middleware","toastr","services_activity",(services,$location,$rootScope,services_validate,services_localStorage,services_middleware,toastr, services_activity)=>{
    let service = {
        submit_login:submit_login,
        submit_register:submit_register,
        submit_social_user:submit_social_user
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
            .then((jsonLogin)=>{
                var check=true
                
                jsonLogin.error ? ($rootScope.error_login=jsonLogin.error, check=false, toastr.error(jsonLogin.error)) : ""
                
                jsonLogin.msg ? (toastr.info(jsonLogin.msg),check=false) : ""
                
                check ? (services_localStorage.setToken(jsonLogin),loadLastLocation(),services_middleware.decode(),services_activity.activity()) : ""
            
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

    function submit_social_user(social_userinfo) {
        var userInfo 
        switch (services_localStorage.getSocialuser()) {
            case "github":
                userInfo = {
                    uuid: social_userinfo.sub,
                    user: social_userinfo.nickname,
                    email: "https://github.com/"+social_userinfo.nickname,
                    avatar: social_userinfo.picture,
                    entity: "github"
                }
                break;
            case "google-oauth2":
                userInfo = {
                    uuid: social_userinfo.sub,
                    user: social_userinfo.nickname,
                    email: social_userinfo.email,
                    avatar: social_userinfo.picture,
                    entity: "google-oauth2"
                }
                break;
        }
        services_localStorage.deleteSocialuser()
        services.post('login','sign_in',userInfo)
        .then((jsonSignIn)=>{
            var check=true
                
            jsonSignIn.error ? ($rootScope.error_login=jsonSignIn.error, check=false, toastr.error(jsonSignIn.error)) : ""
                
            jsonSignIn.msg ? (toastr.info(jsonSignIn.msg),check=false) : ""
                
            check ? (services_localStorage.setToken(jsonSignIn),loadLastLocation(),services_middleware.decode(),services_activity.activity()) : ""         
            
        },(error)=>{
            console.log(error);
        });
    }
}]);
