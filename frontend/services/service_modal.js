app.factory("services_modal",["services","services_localStorage","$rootScope","$location","services_middleware",(services,services_localStorage,$rootScope,$location,services_middleware)=>{
    let service = {
        show:show,
        login:login,
        no_login:no_login
    }
    return service
    function show(msg) {
        $rootScope.title_modal = msg.title
        $rootScope.desc_modal = msg.desc
        $rootScope.login_status = false
        $rootScope.modal_state = true
        services_localStorage.deleteToken()
    }

    function login() {
        $rootScope.modal_state = false
        services_middleware.logout()
    }

    function no_login() {
        $rootScope.modal_state = false
    }
}]);