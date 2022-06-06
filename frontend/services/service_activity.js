app.factory("services_activity",["$interval","$location","services","$rootScope", "services_localStorage", "services_modal" ,($interval,$location,services,$rootScope,services_localStorage,services_modal)=>{
    let service = {
        activity:activity,
        refresh_activity:refresh_activity
    };
    return service;
    
    function check_activity() {
        var promise = $interval(() => {
            if (services_localStorage.getToken()){

                services.post('login','control_user',{token:services_localStorage.getToken()})
                .then((jsonControlUser)=>{
                    if (jsonControlUser=="false") {
                        services_modal.show({title:"Error usuario",desc:"Por favor vuelva a iniciar sesión"})
                        $interval.cancel(promise)
                    }
                },(error)=>{
                    console.log(error);
                });
                services.post('login','activity')
                .then((jsonActivity)=>{
                    if (jsonActivity.split('"')[1]=="inactivo") {
                        services_modal.show({title:"Usuario inactivo",desc:"Por favor vuelva a iniciar sesión"})
                        $interval.cancel(promise)
                    }
                },(error)=>{
                    console.log(error);
                });
            } else {
                $interval.cancel(promise)
            }
        }, 1 * 10 * 1000);
    };
    
    function refresh_activity() {
        services.post('login','refresh_cookie')
        .then((jsonRefreshActivity)=>{
        },(error)=>{
            console.log(error);
        });    
    };
    
    function refresh_token(){

        var checkToken = $interval(() => {
            if (services_localStorage.getToken()){
                services.post('login','refresh_token',{token:services_localStorage.getToken()})
                .then((jsonToken)=>{
                    if (jsonToken==false) {
                        services_modal.show({title:"Error usuario",desc:"Por favor vuelva a iniciar sesión"})
                        $interval.cancel(checkToken)
                    } else {
                        services_localStorage.setToken(jsonToken)
                    }
                    
                },(error)=>{
                    console.log(error);
                }); 
            } else {
                $interval.cancel(checkToken)
            }
            
          }, 1   * 60 * 1000);
    };
    function activity() {
        check_activity()
        refresh_token()
    }    

    
}]);