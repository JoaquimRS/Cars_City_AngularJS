app.directive('simpleModal', (services, services_modal) =>{
    return {
        scope: true,
        templateUrl: 'frontend/components/modal/template/template_modal.html',
        link: (scope) =>{
            scope.no_login = ()=> {
                services_modal.no_login()
            }
            scope.login = ()=>{
                services_modal.login()
            }
        }
    };
});