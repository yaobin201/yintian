var bannerSwiper = new Swiper(".swiper-banner", {
  direction: "horizontal",
  autoplay:true,
  parallax: true,
  loop: true, // 循环模式选项
  speed: 1000,
  // 如果需要分页器
  pagination: {
    el: ".swiper-pagination",
  },
});
if(isMobileDevice()) {
  var productMobileSwiper = new Swiper(".product-mobile-swiper", {
    direction: "horizontal",
    autoplay:true,
    parallax: true,
    loop: true, // 循环模式选项
    speed: 1000,
    // 如果需要分页器
    pagination: {
      el: ".swiper-pagination",
    },
  });
  var solutionMobileSwiper = new Swiper(".solution-mobile-swiper", {
    direction: "horizontal",
    autoplay:true,
    parallax: true,
    loop: true, // 循环模式选项
    speed: 1000,
    // 如果需要分页器
    pagination: {
      el: ".swiper-pagination",
    },
  });
}

var industrySwiper = new Swiper(".industry-swiper", {
  loop: true, // 循环模式选项
  slidesPerView: 1,
  autoplay:false,
  breakpoints: { 
      768: {  //当屏幕宽度大于等于768 
        slidesPerView: 3,
      },
      1280: {  //当屏幕宽度大于等于1280
        slidesPerView: 4,
      }
    },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

