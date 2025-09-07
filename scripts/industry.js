function flexCardAni() {
  $(".industry-sitem").mouseenter(function () {
    $(this).addClass("on").siblings().removeClass("on");
  });
  $(".industry-sitem").each(function () {
    $(this).css("opacity", 0).css("transform", "translate(30px,0)");
  });
  $(".industry-wrapper").each(function () {
    const _this = $(this);
    ScrollTrigger.create({
      trigger: this,
      start: "top 75%",
      end: "bottom 75%",
      scrub: true,
      markers: false,
      onEnter: () => {
        _this.find(".industry-sitem").each(function () {
          $(this).css("opacity", 0).css("transform", "translate(30px,0)");
        });
        gsap.fromTo(
          _this.find(".industry-ani1").eq(0),
          {
            opacity: 0,
            transform: "translate(0, 6rem)",
          },
          {
            opacity: 1,
            transform: "translate(0, 0)",
            delay: 0.1,
            duration: 0.5,
            ease: "power1.out",
          }
        );
      },
    });
  });
  // industryFlag
  $(".industryFlag").each(function () {
    const _this = $(this);
    ScrollTrigger.create({
      trigger: _this,
      start: "top 75%",
      end: "bottom 75%",
      scrub: true,
      markers: false,
      onEnter: () => {
        gsap.fromTo(
          this,
          {
            opacity: 0,
            transform: "translate(30px,0)",
          },
          {
            opacity: 1,
            transform: "translate(0,0)",
            duration: 1.5,
          }
        );
        _this.find(".industry-sitem").each(function (index) {
          const dataDelay = +$(this).attr("data-delay");
          gsap.fromTo(
            this,
            {
              opacity: 0,
              transform: "translate(30px,0)",
            },
            {
              opacity: 1,
              transform: "translate(0,0)",
              duration: 0.5,
              delay: 0.1 + dataDelay,
            }
          );
          gsap.fromTo(
            $(this).find(".pic").eq(0),
            {
              scale: 1.25,
              transform: "translate(20px,-30px)",
            },
            {
              scale: 1,
              transform: "translate(0,0)",
              duration: 1 + dataDelay,
              delay: dataDelay,
            }
          );
        });
      },
    });
  });
  $(".text-bani").each(function () {
    const _this = $(this);
    ScrollTrigger.create({
      trigger: _this,
      start: "top 75%",
      end: "bottom 75%",
      scrub: true,
      markers: false,
      onEnter: () => {
        _this.find(".text-bani-timeline").each(function (index) {
          const dataDelay = +$(this).attr("data-delay-step");
          gsap.fromTo(
            this,
            {
              autoAlpha: 0,
              transform: "translateY(6rem)",
            },
            {
              autoAlpha: 1,
              transform: "translateY(0)",
              delay: 0.1 + dataDelay,
              duration: 0.5,
              ease: "power1.out",
            }
          );
        });
      },
    });
  });
}

function execIndustrySwiper() {
  const bannerSwiper = new Swiper("#industryWrap2", {
    autoplay: true,
    effect: "fade",
  });

  $("#cusSwiperNav1 > div").click(function () {
    if ($(this).hasClass("on")) return;
    $(this).addClass("on").siblings().removeClass("on");
    bannerSwiper.slideTo($(this).index());
  });
}

function execPhoneSwiper() {
  const phoneSwiper = new Swiper(".phoneSwiper", {
    direction: "vertical", // 垂直切换选项
    autoplay: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

$(document).ready(function () {
  flexCardAni();
  execIndustrySwiper();
  execPhoneSwiper();
});
