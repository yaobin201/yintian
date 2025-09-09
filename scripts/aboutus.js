$(document).ready(function () {
  let historySwiper = new Swiper(".historys-swiper", {
    slidesPerView: 1,
    autoplay: false,
    parallax: true,
    loop: true, // 循环模式选项
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className, a) {
        return '<span class="' + className + '"><span class="dot"></span><em class="line"></em></span>';
      },
    },
  });
  let honorSwiper = new Swiper(".honor-swiper", {
    slidesPerView: 1,
    autoplay: true,
    spaceBetween: 20,
    loop: true, // 循环模式选项
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        //当屏幕宽度大于等于768
        slidesPerView: 4,
      },
    },
  });
  let joinusSwiper = new Swiper(".joinus-swiper", {
    slidesPerView: 1,
    autoplay: true,
    spaceBetween: 20,
    loop: true, // 循环模式选项
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        //当屏幕宽度大于等于768
        slidesPerView: 3,
      },
    },
  });

  // $('.gsap-page').each(function () {
  //   const _this = $(this)
  //   const maskBox = _this.find('.fixed-bg')
  //   let to = gsap.timeline({
  //             scrollTrigger: { trigger: _this, pin: maskBox, start: 'top top', end: 'bottom top', scrub: .1, 
  //               // markers: {startColor: '#FF0000', endColor: '#FF0000', fontSize: '18px', fontWeight: 'bold', indent: 20 },
  //             }
  //           });
  // })


  // ScrollTrigger.create({
  //   trigger: '.cover-bg',
  //   start: 'top top',
  //   end: '+=1000',
  //   scrub: true,
  //   markers: true,
  //   pin: '.cover-bg',
    
  // })


});
