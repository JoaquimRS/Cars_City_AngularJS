app.factory("services_recover",["services","$rootScope","toastr","services_validate","$location",(services,$rootScope,toastr,services_validate,$location)=>{
    let service = {
        submit_email:submit_email,
        submit_recover:submit_recover
    }
    return service;
    function submit_email(email) {
        if (services_validate.validate_ask_email(email)) {
            var url = "http://ximo.com/tema7_ximo/#/recover/"
            services.post('login','recover_email',{["email"]:email,["url"]:url})
            .then((json)=>{
                if(json.msg != "") {
                    toastr.success(json.msg);
                    $location.path("/login")
                    $rootScope.error_rec_email = ""
                } else {
                    msg = "Correo no se ha podido enviar"
                    toastr.error(msg);
                    $rootScope.error_rec_email = msg
                }
            },(error)=>{
                msg = "Correo no se ha podido enviar"
                toastr.error(msg);
                $rootScope.error_rec_email = msg
            });
        }
    }

    function submit_recover(recoverinfo) {
        if (services_validate.validate_recover(recoverinfo)) {
            services.post('login','recover_password',recoverinfo)
            .then((json)=>{
                if(json != "") {
                    toastr.success("Contraseña cambiada correctamente");
                    $location.path("/login")
                } else {
                    msg = "Error al recuperar contraseña"
                    toastr.error(msg);
                    $rootScope.error_rec = msg
                }
            },(error)=>{
                msg = "Error al recuperar contraseña"
                toastr.error(msg);
                $rootScope.error_rec = msg
            });
        }
    }
}]);
 