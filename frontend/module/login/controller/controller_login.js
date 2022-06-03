app.controller("controller_login", ($location, $scope,services_login)=>{
    $scope.change_form = ()=>{
        $scope.form_status = ($scope.form_status) ? false : true
    }
    $scope.submit_login = () => {
        var forminfo = {
            log_username: ($scope.log_username) ? $scope.log_username : "",
            log_password: ($scope.log_password) ? $scope.log_password : ""
        }
        services_login.submit_login(forminfo)
        
    }
    $scope.submit_register = () => {
        var forminfo = {
            reg_username: ($scope.reg_username) ? $scope.reg_username : "",
            reg_email: ($scope.reg_email) ? $scope.reg_email : "",
            reg_password: ($scope.reg_password) ? $scope.reg_password : "",
            reg_password_2: ($scope.reg_password_2) ? $scope.reg_password_2 : "",
        }
        services_login.submit_register(forminfo)
    }
    $scope.recover_password = () => {
        $location.path("/ask_email")
    }
})
