app.controller("controller_home", ($scope, brands, fuels, categories,news)=>{
    $scope.brands = brands
    $scope.fuels = fuels
    $scope.categories = categories
    $scope.news = news.articles
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
    $scope.redirect_new = (url)=>{
        window.open(url, '_blank')
    }
})

