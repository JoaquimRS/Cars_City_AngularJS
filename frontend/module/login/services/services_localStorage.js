app.factory("services_localStorage",["services","$rootScope",(services,$rootScope)=>{
    let service = {
        setToken:setToken,
        getLastLocation:getLastLocation

    }
    return service
    function setToken(token) {
        localStorage.setItem("token",token);
    }

    function getLastLocation() {  
        return localStorage.getItem("ll");
    }
}]);
