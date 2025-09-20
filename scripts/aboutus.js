$(document).ready(function () {
  let historySwiper = new Swiper(".historys-swiper", {
    slidesPerView: 1,
    autoplay: true,
    parallax: true,
    loop: true, // 循环模式选项
    speed: 800,
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
      nextEl: ".swiper-button-next-join",
      prevEl: ".swiper-button-prev-join",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    breakpoints: {
      768: {
        //当屏幕宽度大于等于768
        slidesPerView: 3,
      },
    },
  });

  $('.gsap-page').each(function () {
    const _this = $(this)
    // const maskBox = _this.find('.fixed-bg')
    // if(maskBox.length) {
    //   gsap.timeline({
    //       scrollTrigger: { trigger: _this, pin: maskBox, start: 'top top', end: 'bottom top', scrub: .1, 
    //     }
    //   });
    // }
    const aniPs = _this.find('.ani-p')
    aniPs.css('opacity', 0)
    gsap.timeline({
        scrollTrigger: { trigger: _this, start: 'top 58%', end: 'bottom 58%', scrub: .1, 
          onEnter: () => {
            aniPs.each(function () {
              const dataDelay = +$(this).attr('data-delay-step') || 0
              gsap.fromTo(
                this,
                {
                  opacity: 0,
                  transform: "translate(0,3rem)",
                },
                {
                  opacity: 1,
                  transform: "translate(0,0)",
                  duration: 0.5,
                  delay: 0.1 + dataDelay,
                }
              );
            })
            if(_this.find('.ani-numaber').length) {
              execNumberAni('aboutusNumberAni')
            }
          },
          onLeaveBack: () => {
            aniPs.each(function () {
              const dataDelay = +$(this).attr('data-delay-step') || 0
              gsap.fromTo(
                this,
                {
                  opacity: 1,
                  transform: "translate(0,0)",
                },
                {
                  opacity: 0,
                  transform: "translate(0,3rem)",
                  duration: 0.5,
                }
              );
            })
          }
      }
    });
  })


  // ScrollTrigger.create({
  //   trigger: '.cover-bg',
  //   start: 'top top',
  //   end: '+=1000',
  //   scrub: true,
  //   markers: true,
  //   pin: '.cover-bg',
    
  // })


});
