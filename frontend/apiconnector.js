app.factory("services", ['$http','$q', ($http, $q)=> {
    let serviceBase = '/tema7_ximo/backend/index.php?module=';
    
    let obj = {};

        obj.get_url = function (url) {
          var defered = $q.defer();
          var promise = defered.promise;
          $http({
                method: 'GET',
                url: url
            }).success(function(data, status, headers, config) {
               defered.resolve(data);
            }).error(function(data, status, headers, config) {
               defered.reject(data);
            });
          return promise;
        };

        obj.get = function (module, functi, param=null) {
            var defered = $q.defer();
            var promise = defered.promise;
            var url = (param)?serviceBase + module + '&op=' + functi + '&param=' + param:serviceBase + module + '&op=' + functi
            $http({
                  method: 'GET',
                  url: url
              }).success(function(data, status, headers, config) {
                 defered.resolve(data);
              }).error(function(data, status, headers, config) {
                 defered.reject(data);
              });
            return promise;
        };

        obj.post = function (module, option, data) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                  method: 'POST',
                  url: serviceBase + module + '&op=' + option,
                  data: data
              }).success(function(response, status, headers, config) {
                defered.resolve(response);
              }).error(function(error, status, headers, config) {
                 defered.reject(error);
              });
            return promise;
          };

    return obj;

}]);