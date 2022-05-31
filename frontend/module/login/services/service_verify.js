app.factory("services_verify",["services","$location","$rootScope","toastr",(services,$location,$rootScope,toastr)=>{
    let service = {
        verify_user:verify_user
    }
    return service;
    function loadErrorVerify() {
        $rootScope.verify_title = "Error verificación email"
        $rootScope.verify_button = "Volver a inicar sesion"
        $rootScope.verify_status = true
    } 
    function verify_user(token) {
        services.get('login','verify_user',token)
        .then((msg_verify)=>{           
            if(msg_verify=="true"){
                $rootScope.verify_title = "Email Verificado"
                $rootScope.verify_button = "Iniciar Sesion"
            } else {
                if (msg_verify=="") {
                    loadErrorVerify()
                } else {
                    $rootScope.verify_title = msg_verify
                    $rootScope.verify_button = "Iniciar Sesion"

                }
            }            
        },(error)=>{
            loadErrorVerify()
        });
    }
    

}]);
