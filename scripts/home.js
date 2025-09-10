// 计数器效果
function startNumberSwitch() {
  function execNumberAni() {
    $(".ani-numaber").each(function () {
      const $this = $(this);
      const target = parseInt($this.attr("data-number"));
      $this.animateNumber(
        {
          number: target,
          complete: function () {
            $this.find("i").show();
          },
        },
        2000
      );
    });
  }

  const numberSwich = $("#numberSwich")[0];
  const ob = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        execNumberAni();
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
      content.stop(true, true).slideDown(200, function () {
        content.removeClass("hidden");
      });
      const imgUrl = $(this).attr("data-img");
      $(this).parent().css("background-image", `url(${imgUrl})`);
    }
    $(".accordion-content").each(function () {
      if (!$(this).is(content)) {
        $(this)
          .stop(true, true)
          .slideUp(200, function () {
            $(this).addClass("hidden");
          });
      }
    });
  });
}

// 新闻列表切换背景图片
function newsBgSwitch() {
  $(".news-section>.bg-cover").bind("mouseenter", function () {
    const $this = $(this);
    if ($this.hasClass("active")) {
      return;
    }
    $this
      .addClass("active")
      .siblings()
      .removeClass("active")
      .css("background-image", "none");
    const imgUrl = $this.attr("data-img");
    $this.css("background-image", `url(${imgUrl})`);
  });
}

function bannerScaleAni() {
  if (isMobileDevice()) {
    return;
  }
  ScrollTrigger.create({
    trigger: ".banner-container",
    start: "top top",
    end: `+=1100`,
    scrub: true,
    // markers: true,
    pin: true,
    animation: gsap.to(".banner-wrapper", { width: "100%" }),
  });
}

$(document).ready(function () {
  bannerScaleAni();
  solutionAccording();
  newsBgSwitch();
  startNumberSwitch();
});
