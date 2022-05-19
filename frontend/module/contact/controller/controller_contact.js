app.controller("controller_contact", ($scope,services_contact)=>{
    $scope.send_email = ()=>{
        services_contact.send_contact_email($scope.name,$scope.email,$scope.matter,$scope.message);
    }
})

