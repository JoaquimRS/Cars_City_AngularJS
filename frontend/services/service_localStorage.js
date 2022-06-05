app.factory("services_localStorage",["services","$rootScope","$location",(services,$rootScope,$location)=>{
    let service = {
        setToken:setToken,
        getToken:getToken,
        deleteToken:deleteToken,
        setSocialUser:setSocialUser,
        getSocialuser:getSocialuser,
        deleteSocialuser:deleteSocialuser,
        getAccessToken:getAccessToken,
        deleteAccessToken:deleteAccessToken,
        setLastLocation:setLastLocation,
        getLastLocation:getLastLocation,
        setFilters:setFilters,
        getFilters:getFilters,

    }
    return service
    function setToken(token) {
        localStorage.setItem("token",token);
    }

    function getToken() {  
        return localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : false
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

    function setLastLocation() {
        localStorage.setItem("ll",$location.path())
    }

    function getLastLocation() {  
        return localStorage.getItem("ll");
    }

    function setFilters(filters) {
        localStorage.setItem("filters",JSON.stringify(filters))
    }

    function getFilters() {
        return JSON.parse(localStorage.getItem("filters"))
    }
    
}]);
