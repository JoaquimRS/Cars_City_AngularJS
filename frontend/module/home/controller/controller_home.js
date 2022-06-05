app.controller("controller_home", ($location, $scope, brands, fuels, categories,news, services_localStorage)=>{
    $scope.brands = brands
    $scope.fuels = fuels
    $scope.categories = categories
    $scope.news = news.articles
    $scope.redirect_home_shop = function(info){
        var filters = {
            brand: (info.brand!=null) ? info.brand : "",
            model: "",
            price: "",
            fuel: (info.fuel!=null) ? info.fuel : "",
            category: (info.category!=null) ? info.category : "",
            city: "",
            order: "",
            page: "1"
        };
        services_localStorage.setFilters(filters)
        $location.path("/shop")
    }
    
    setTimeout(() => {
        const swiper = new Swiper('.swiper', {
            loop: true,
            slidesPerView: 3,
            spaceBetween: 50,
            autoplay: {
                delay: 3000,
                },
            pagination: {
            el: '.swiper-pagination',
            },
            centeredSlides: true,
        })
    }, 0)

    $scope.redirect_new = (url)=>{
        window.open(url, '_blank')
    }

})

