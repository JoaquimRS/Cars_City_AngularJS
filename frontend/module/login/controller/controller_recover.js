app.controller("controller_recover", ($location,$routeParams, $scope, services_recover,$window)=>{
    var route = $location.path().split("/")[1]
    var token = $routeParams.token
    switch (route) {
        case "ask_email":
            $scope.submit_email = ()=>{
                services_recover.submit_email($scope.rec_email)   
            }
            break;
        case "recover":
            $scope.submit_passwords = ()=>{
                var recoverinfo = {
                    rec_password: ($scope.rec_password) ? $scope.rec_password : "",
                    rec_password_2: ($scope.rec_password_2) ? $scope.rec_password_2 : "",
                    token: token
                }
                services_recover.submit_recover(recoverinfo)
            }
            break;
    }
})