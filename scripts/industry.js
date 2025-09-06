function flexCardAni() {
  $('.industry-sitem').mouseenter(function () {
    $(this).addClass('on').siblings().removeClass('on');
  })
  $('.industry-sitem').each(function () {
    $(this).css('opacity', 0).css('transform', 'translate(30px,0)')
  })
  $('.industry-wrapper').each(function () {
    const _this = $(this)
    ScrollTrigger.create({
      trigger: _this,
      start: 'top 75%',
      end: 'bottom 75%',
      scrub: true,
      markers:true,
      onEnter: () => {
        _this.find('.industry-sitem').each(function () {
          $(this).css('opacity', 0).css('transform', 'translate(30px,0)')
        })
        gsap.fromTo(_this.find('.industry-ani1'), {
          opacity: 0,
          transform: 'translate(0, 30px)',
        }, {
          opacity: 1,
          transform: 'translate(0, 0)',
          duration: 0.5,
        })
      }
    })

  })
  // industryFlag
  $('.industryFlag').each(function () {
    const _this = $(this)
    ScrollTrigger.create({
      trigger: _this,
      start: 'top 75%',
      end: 'bottom 75%',
      scrub: true,
      markers:false,
      onEnter: () => {
        console.log('enter')
        _this.find('.industry-sitem').each(function (index) {
          const dataDelay = +$(this).attr('data-delay')
          gsap.fromTo(this, {
            opacity: 0,
            transform: 'translate(30px,0)',
          },{
            opacity: 1,
            transform: 'translate(0,0)',
            duration: 0.5,
            delay: 0.5 + dataDelay
          })
          gsap.fromTo($(this).find('.pic').eq(0), {
            scale: 1.25,
            transform: 'translate(20px,-30px)',
          }, {
            scale: 1,
            transform: 'translate(0,0)',
            duration: 1 + dataDelay,
            delay: dataDelay
          })
        })
      },
    })
    
  })
}

function execIndustrySwiper() {
  const bannerSwiper = new Swiper("#industryWrap2", {
    autoplay:true,
    effect: "fade",
  });

  $('#cusSwiperNav1 > div').click(function () {
    if($(this).hasClass('on')) return;
    $(this).addClass('on').siblings().removeClass('on');
    bannerSwiper.slideTo($(this).index());
  })
}

$(document).ready(function () {
  flexCardAni();
  execIndustrySwiper();
});