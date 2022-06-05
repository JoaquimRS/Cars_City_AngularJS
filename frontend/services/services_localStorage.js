app.factory("services_localStorage",["services","$rootScope",(services,$rootScope)=>{
    let service = {
        setToken:setToken,
        getToken:getToken,
        deleteToken:deleteToken,
        setSocialUser:setSocialUser,
        getSocialuser:getSocialuser,
        getAccessToken:getAccessToken,
        getLastLocation:getLastLocation,
        deleteAccessToken:deleteAccessToken,
        deleteSocialuser:deleteSocialuser


    }
    return service
    function setToken(token) {
        localStorage.setItem("token",token);
    }

    function getToken() {  
        return JSON.parse(localStorage.getItem("token"))
    }

    function deleteToken() {
        localStorage.removeItem("token")
    }

    function setSocialUser(provider) {
        localStorage.setItem("SocialUser",JSON.stringify(provider))
    }

    function getSocialuser() {
        return JSON.parse(localStorage.getItem("SocialUser"))
    }

    function deleteSocialuser() {
        return localStorage.removeItem("SocialUser")
    }

    function getAccessToken() {
        return localStorage.getItem("access_token")
    }

    function deleteAccessToken() {
        return localStorage.removeItem("access_token")
    }

    function getLastLocation() {  
        return localStorage.getItem("ll");
    }
}]);
