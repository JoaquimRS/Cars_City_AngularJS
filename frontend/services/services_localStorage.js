app.factory("services_localStorage",["services","$rootScope",(services,$rootScope)=>{
    let service = {
        setToken:setToken,
        getToken:getToken,
        deleteToken:deleteToken,
        getLastLocation:getLastLocation


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

    function getLastLocation() {  
        return localStorage.getItem("ll");
    }
}]);
