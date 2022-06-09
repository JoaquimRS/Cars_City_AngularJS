app.factory("services_contact",["services","$location","$rootScope","toastr",(services,$location,$rootScope,toastr)=>{
    let service = {send_contact_email:send_contact_email};
    return service;
    function send_contact_email(name, email, matter, message) {
        services.post('contact','send_contact_us',{name:name,email:email,matter:matter,message:message})
        .then((response)=>{
            if(response != '"Error!"'){
                toastr.success("Email enviado");
                $location.path("/home")
                
            } else {
                toastr.error("Error al enviar el email");
                
            }
            return;
        }, (error)=>{
            console.log(error);
        });
        
    }
    
}]);
