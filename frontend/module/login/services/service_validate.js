app.factory("services_validate",["services","$rootScope","toastr",(services,$rootScope,toastr)=>{
    let service = {
        validate_login:validate_login,
        validate_register:validate_register
    }
    return service;

    function validateUserLog(user) {
        if (user.length > 0){
            var reg = /^[a-zA-Z0-9_\.]+$/;
            return reg.test(user);
        }
        return false;
    };
    function validatePasswordLog(password) {
        if (password.length > 0){
            var strongReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            var weakReg = /^[a-zA-Z0-9_\.]+$/;
            // return weakReg.test(password);
            return strongReg.test(password);
        }
        return false;
    };
    function validateUserReg(user) {
        if (user.length > 0){
            var reg = /^[a-zA-Z0-9_\.]+$/;
            return reg.test(user);
        }
        return false;
    };
    
    function validateEmailReg(email) {
        if (email.length > 0){
            var reg =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return reg.test(email);
        }
        return false;
    };
    
    function validatePasswordReg(password) {
        if (password.length > 0){
            var strongReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            var weakReg = /^[a-zA-Z0-9_\.]+$/;
            // return weakReg.test(password);
            return strongReg.test(password);
        }
        return false;
    };
    
    function validatePassword2Reg(password1, password2) {
        if (password1==password2) {
            return true;
        }
        return false;
    
    };
    function validate_login(forminfo) {
        var check = true
        var username = validateUserLog(forminfo.log_username)
        var password = validatePasswordLog(forminfo.log_password)

        if (!username) {
            str = "Usuario incorrecto"
            toastr.error(str);
            check=false
            $rootScope.error_log_username = str
        } else {
            $rootScope.error_log_username = ""

        }
        if (!password) {
            str = "Contraseña incorrecta"
            toastr.error(str);
            check=false
            $rootScope.error_log_password = str
        } else {
            $rootScope.error_log_password = ""
        }
        return check;
    };

    function validate_register(forminfo) {
        var check = true
        var username = validateUserReg(forminfo.reg_username)
        var email = validateEmailReg(forminfo.reg_email)
        var password = validatePasswordReg(forminfo.reg_password)
        var password2 = validatePassword2Reg(forminfo.reg_password,forminfo.reg_password_2)

        if (!username) {
            str = "Usuario incorrecto"
            toastr.error(str);
            check=false
            $rootScope.error_reg_username = str
        } else {
            $rootScope.error_reg_username = ""

        }
        if (!email) {
            str = "Email incorrecto"
            toastr.error(str);
            check=false
            $rootScope.error_reg_email = str
        } else {
            $rootScope.error_reg_email = ""

        }
        if (!password) {
            str = "Contraseña incorrecta"
            toastr.error(str);
            check=false
            $rootScope.error_reg_password = str
        } else {
            $rootScope.error_reg_password = ""
        }
        if (!password2) {
            str = "Las contraseñas no coinciden"
            toastr.error(str);
            check=false
            $rootScope.error_reg_password_2 = str
        } else {
            $rootScope.error_reg_password_2 = ""
        }
        return check;
    };
    
}]);
