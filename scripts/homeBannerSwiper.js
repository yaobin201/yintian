var bannerSwiper = new Swiper(".swiper-banner", {
  direction: "vertical", // 垂直切换选项
  autoplay:true,
  parallax: true,
  loop: true, // 循环模式选项
  // 如果需要分页器
  pagination: {
    el: ".swiper-pagination",
  },
});

var industrySwiper = new Swiper(".industry-swiper", {
  loop: true, // 循环模式选项
  slidesPerView: 1,
  autoplay:true,
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

