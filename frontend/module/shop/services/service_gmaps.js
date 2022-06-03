app.factory("services_gmaps",["$rootScope",($rootScope)=>{
    let service = {
        loadGmaps:loadGmaps,
        loadGmapsDetails:loadGmapsDetails
    };
    return service;  
    function loadGmaps() {
        var centerPoint = { lat :  38.78317511958979, lng :  -0.7851077280611519 };
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom :  8,
            center :  centerPoint,
            gestureHandling :  "auto",
            zoomControl :  true,
          });
        $rootScope.shop_cars.forEach((car, i)=>{
            const carPos = { lat :  parseFloat(car.lat), lng :  parseFloat(car.lng) };
            const infowindow = new google.maps.InfoWindow({
                content :  '<div id="root-gmaps">' +
                            '<div class="swiper_gmaps">'+
                                '<div class="swiper-wrapper">'+
                                    '<div class="swiper-slide" ng-repeat="carImg in car.carImages">'+
                                        '<img src="frontend/view/img/cars/'+car.IMG+'" class="gmaps_img"></img>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                            '<div id="gmaps_content" onclick="http://ximo.com/tema7_ximo/#/details/'+ car.id_coche + ' ">' +
                                '<b>'+car.nombre_marca + " " + car.nombre_modelo+'</b><br>'+
                                '<span>Ciudad :  '+car.ciudad+'</span><br>'+
                                '<span>Precio :  '+car.precio+'€</span><br>'
    
            });
            
            const marker = new google.maps.Marker({
            position :  carPos,
            map,
            title :  car.nombre_marca + " " + car.nombre_modelo,
            animation :  google.maps.Animation.DROP, //animacio per a cada marcador
            });
    
            marker.addListener("click", () => {
            if (infowindow.getMap()) {
                infowindow.close();  
            }
            else {
                infowindow.open({
                    anchor :  marker,
                    map,
                    shouldFocus :  false,
                    });
                }
            });
        })
    };
    function loadGmapsDetails() {
        var centerPoint = { lat :  38.78317511958979, lng :  -0.7851077280611519 };
        const map = new google.maps.Map(document.getElementById("map_details"), {
            zoom :  8,
            center :  centerPoint,
            gestureHandling :  "auto",
            zoomControl :  true,
          });
        car = $rootScope.details_car
        const carPos = { lat :  parseFloat(car.lat), lng :  parseFloat(car.lng) };
        const infowindow = new google.maps.InfoWindow({
            content :  '<div id="root-gmaps">' +
                        '<div class="swiper_gmaps">'+
                            '<div class="swiper-wrapper">'+
                                '<div class="swiper-slide" ng-repeat="carImg in car.carImages">'+
                                    '<img src="frontend/view/img/cars/'+car.IMG+'" class="gmaps_img"></img>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                        '<div id="gmaps_content">' +
                            '<b>'+car.nombre_marca + " " + car.nombre_modelo+'</b><br>'+
                            '<span>Ciudad :  '+car.ciudad+'</span><br>'+
                            '<span>Precio :  '+car.precio+'€</span><br>'

        });
        
        const marker = new google.maps.Marker({
        position :  carPos,
        map,
        title :  car.nombre_marca + " " + car.nombre_modelo,
        animation :  google.maps.Animation.DROP, //animacio per a cada marcador
        });

        marker.addListener("click", () => {
        if (infowindow.getMap()) {
            infowindow.close();  
        }
        else {
            infowindow.open({
                anchor :  marker,
                map,
                shouldFocus :  false,
                });
            }
        });
        
    };
}]);
