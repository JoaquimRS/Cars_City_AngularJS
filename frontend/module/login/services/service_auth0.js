app.factory("services_auth0",["services","$rootScope","services_login",(services,$rootScope,services_login)=>{
    let service = {
        auth0_authorization:auth0_authorization,
        auth0_handleAuthentication:auth0_handleAuthentication

    }
    return service
    
    async function auth0_authorization(provider) {
        services.get('login','auth0_credentials')
        .then((jsonCredentials)=>{
            var webAuth = new auth0.WebAuth(jsonCredentials)
            webAuth.authorize({connection: provider});
        })
    }

    async function auth0_handleAuthentication(token) {
        services.get('login','auth0_credentials')
        .then((jsonCredentials)=>{
            var webAuth = new auth0.WebAuth(jsonCredentials)
            
            webAuth.client.userInfo(token, function(err, social_userinfo) {
                services_login.submit_social_user(social_userinfo)
            });
        
        })

    }

}]);
