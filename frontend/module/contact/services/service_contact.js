app.factory("services_contact",["services","$rootScope",(services,$rootScope)=>{
    let service = {send_contact_email:send_contact_email};
    return service;
    function send_contact_email(name, email, matter, message) {
        services.post('contact','send_contact_us',{name:name,email:email,matter:matter,message:message})
        .then((response)=>{
            if(response != "Error!"){
                // toastr.success("Email enviado");
                console.log("Email enviado");
            } else {
                // toastr.error("Error al enviar el email");
                console.log("Error al enviar el email");
            }
            // location.href = "#/home"
            // window.location.reload();
            return;
        }, (error)=>{
            console.log(error);
        });
        
    }
    
}]);
