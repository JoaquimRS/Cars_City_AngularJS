app.factory("services_swiper",[()=>{
    let service = {
        loadSwiper:loadSwiper,
        loadSwiperDetails:loadSwiperDetails
    };
    return service;  
    function loadSwiper() {
        setTimeout(() => {
            const swiper = new Swiper('.swiper', {
                loop :  false,
                slidesPerView :  1,
                spaceBetween :  1,
                pagination :  {
                    el :  '.swiper-pagination',
                    type :  'fraction',
                    },
                centeredSlides :  true,
                navigation :  {
                    nextEl :  '.swiper-button-next',
                    prevEl :  '.swiper-button-prev',
                  },
            });
        }, 500)
    };
    function loadSwiperDetails() {
        setTimeout(() => {
            const swiper = new Swiper('.swiper', {
                initialSlide: 3,
                loop: false,
                slidesPerView: 7,
        
                direction: 'vertical',
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction',
                    },
                centeredSlides: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  },
                scrollbar: {
                    el: '.swiper-scrollbar',
                  },
                mousewheel: {
                    invert: false,
                  },
            });
        }, 500)
    };
    
}]);
