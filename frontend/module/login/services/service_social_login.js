app.factory("services_social_login",["services","$location","$rootScope","services_localStorage","services_middleware","services_auth0","toastr",(services,$location,$rootScope,services_localStorage,services_middleware,services_auth0,toastr)=>{
    let service = {
        google:google,
        github:github,
        handleAuthentication:handleAuthentication
        
    }
    return service;
    function handleAuthentication() {
        services_localStorage.getAccessToken() ? services_auth0.auth0_handleAuthentication(services_localStorage.getAccessToken()) : "No access token"
        services_localStorage.deleteAccessToken()
    }
    
    function google() {
        services_auth0.auth0_authorization("google-oauth2")
        services_localStorage.setSocialUser("google-oauth2")
    }

    function github() {
        services_auth0.auth0_authorization("github")
        services_localStorage.setSocialUser("github")
    }
    
}]);