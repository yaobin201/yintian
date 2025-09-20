// 计数器效果
function startNumberSwitch() {
  const numberSwich = $("#numberSwich")[0];
  const ob = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        execNumberAni('numberSwich');
        ob.unobserve(entry.target);
      }
    });
  });
  ob.observe(numberSwich);
}

// solution切换效果
function solutionAccording() {
  $(".accordion-section").bind("mouseenter", function () {
    const content = $(this).find(".accordion-content");
    if (content.hasClass("hidden")) {
      content.stop(true, true).slideDown(600, function () {
        content.removeClass("hidden");
      });
      const imgUrl = $(this).attr("data-img");
      $(this).parent().css("background-image", `url(${imgUrl})`);
    }
    $(".accordion-content").each(function () {
      if (!$(this).is(content)) {
        $(this)
          .stop(true, true)
          .slideUp(600, function () {
            $(this).addClass("hidden");
          });
      }
    });
  });
}

// 新闻列表切换背景图片
function newsBgSwitch() {
  const first = $(".news-section>.bg-cover").eq(0)
  const imgUrl = first.find('.news-bgsource').attr('src');
  first.css("background-image", `url(${imgUrl})`);
  first.addClass("active");

  $(".news-section>.bg-cover").bind("mouseenter", function () {
    const $this = $(this);
    if ($this.hasClass("active")) {
      return;
    }
    $this
      .addClass("active")
      .siblings()
      .removeClass("active")
    const imgUrl = $this.find('.news-bgsource').attr('src');
    $this.css("background-image", `url(${imgUrl})`);
  });
}

function bannerScaleAni() {
  if (isMobileDevice()) {
    return;
  }
  let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-flag',
        pin: false,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 0.3,
      },
    });
    tl.fromTo(
      '.banner-wrapper',
      {
        "transform": "scale(1)",
        "border-radius": "0rem",
      },
      {
        "transform":  "scale(0.9)",
        "border-radius": "0.5rem",
      }
    );

}

function whoweareAni() {
  const _$whoWeAre = $('.who-we-are').eq(0)
  ScrollTrigger.create({
    trigger: _$whoWeAre,
    start: 'top bottom',
    end: 'bottom bottom',
    scrub: 0.3,
    onEnter: () => {
      console.log('enter who we are')
      initHighlightText('home')
    }
  })
}

$(document).ready(function () {
  whoweareAni();
  bannerScaleAni();
  solutionAccording();
  newsBgSwitch();
  startNumberSwitch();
});
