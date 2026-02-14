function sectionFlowUp(target, isHide) {
  const hidTarget = $(target).parent().find("[data-fade-out]");
  const bgTarget = $(target).parent().find("[data-fade-bg]");
  const timeline = gsap.timeline();
  const width = isHide ? 0 : "40%";
  const opacity = isHide ? 0.2 : 1;
  const transform = isHide ? "scale(0)" : "scale(1)";
  gsap.to(hidTarget, {
    width: width,
    opacity: opacity,
    transform: transform,
    duration: 0.3,
  });

  // timeline.to(hidTarget, {
  //   width: 0,
  //   opacity: 0.2,
  //   transform: "scale(0)",
  // });

  // ScrollTrigger.create({
  //   trigger: target,
  //   start: "top 80%",
  //   end: "top 30%",
  //   scrub: .3,
  //   markers: true,
  //   pin: false,
  //   animation: timeline,
  // });
}

function fontFlowUp(target, isHide) {
  const titleTarget = $(target).find("[data-fade-title]");
  const descTarget = $(target).find("[data-fade-desc]");
  const linkTarget = $(target).find("[data-fade-link]");
  const alpha = !isHide ? 0 : 1;
  const transform = !isHide
    ? "translateY(100px) scale(0.5)"
    : "translateY(0) scale(1)";
  const duration = !isHide ? 0.1 : 0.3;
  const aniObj = {
    autoAlpha: alpha,
    transform: transform,
    duratin: duration,
    ease: "power1.out",
  };
  if (isHide) {
    gsap
      .timeline()
      .to(titleTarget, aniObj)
      .to(descTarget, aniObj, "-=0.2")
      .to(linkTarget, aniObj, "-=0.2");
  } else {
    gsap
      .timeline()
      .to(linkTarget, aniObj)
      .to(descTarget, aniObj, "<")
      .to(titleTarget, aniObj, "<");
  }
}

function solutionItemScroll() {
  if(!$(".solution-item").length) return;
  $(".solution-item").each(function () {
    const _this = $(this);
    ScrollTrigger.create({
      trigger: _this,
      start: "top 20%",
      end: "top 20%",
      scrub: .3,
      // markers: true,
      pin: false,
      onEnter: () => {
        _this.addClass('on')
      },
      onLeaveBack: () => {
        _this.removeClass('on') 
      },
    });
  })
}

function swiperSlide() {
  if(!$('.solutions-swiper').length) return;
  new Swiper(".solutions-swiper", {
    loop: true, // 循环模式选项
    slidesPerView: 1,
    autoplay: true,
    spaceBetween: 30,
    loadPrevNext: 100,
    breakpoints: {
      768: {
        //当屏幕宽度大于等于768
        slidesPerView: 3,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function solutionSwiperTab() {
  $('.solution-tab span').click(function(){
    if($(this).hasClass('active')) return;
    $(this).addClass('active').siblings().removeClass('active');
    const _inx = $(this).index();
    $('.solutions-swiper').eq(_inx).show().siblings().hide();
  })
}

$(document).ready(function () {
  // $(".solution-content").hover(
  //   function () {
  //     sectionFlowUp(this, true);
  //     fontFlowUp(this, true);
  //   },
  //   function () {
  //     sectionFlowUp(this, false);
  //     fontFlowUp(this, false);
  //   }
  // );
  if(!isMobileDevice()){
    solutionItemScroll();
  }
  swiperSlide();
  solutionSwiperTab();
});
