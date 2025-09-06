function pageWrapFlowUp() {
  const pageWraps = document.querySelectorAll(".flow-up");
  const ob = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = +entry.target.dataset.delayStep || 0;
        gsap.fromTo(
          entry.target,
          {
            autoAlpha: 0,
            transform: "translateY(6rem)",
          },
          {
            autoAlpha: 1,
            transform: "translateY(0)",
            delay: 0.3 + delay,
            duration: 0.3 + delay,
            ease: "power1.out",
          }
        );
        ob.unobserve(entry.target);
      }
    });
  });

  pageWraps.forEach((pageWrap) => {
    ob.observe(pageWrap);
  });
}

function showPolicy() {
  const policy = $("#data-policy");
  gsap.fromTo(
    policy,
    {
      transform: "translateY(5rem)",
    },
    {
      transform: "translateY(0)",
      duration: 0.8,
      ease: "power1.out",
      delay: 1,
    }
  );
  $(".privacy-btn").click(function () {
    const type = $(this).attr("data-type");
    console.log(type);
    policy.hide();
  });
}

function isMobileDevice() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // 检查设备是否为移动设备
  return /iPad|iPhone|iPod|Android|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
}

function controlNavbar() {
  if (isMobileDevice()) {
    return;
  }
  let lastScrollTop = 0; // 上一次滚动的位置
  $(window).scroll(function (event) {
    const st = $(this).scrollTop(); // 当前滚动的位置
    if (st == 0) {
      $(".header_wrapper")
        .removeClass("header_wrapper_scroll")
        .removeClass("header_wrapper_scroll_out");
      return;
    }
    if (st > lastScrollTop) {
      $(".header_wrapper")
        .removeClass("header_wrapper_scroll")
        .addClass("header_wrapper_scroll_out");
    } else {
      $(".header_wrapper")
        .removeClass("header_wrapper_scroll_out")
        .addClass("header_wrapper_scroll");
    }
    lastScrollTop = st;
  });
}

function gasp_bg_ani() {
  $("[ani-gsap-bg]").each(function () {
    console.log(this, '...this')
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: this,
        pin: false,
        markers: false,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.3,
      },
    });
    tl.fromTo(
      this,
      {
        "background-position": "0% 0%",
      },
      {
        "background-position": "0% 100%",
      }
    );

    const titleTarget = $(this).find("[data-banner-title]");
    const iconTarget = $(this).find("[data-banner-icon]");

    const timeline = gsap.timeline()
    timeline.fromTo(
      titleTarget.eq(0),
      {
        autoAlpha: 0,
        transform: "translateY(3rem)",
      },
      {
        autoAlpha: 1,
        transform: "translateY(0)",
        duration: .6,
        ease: "power1.out",
      }
    );
    timeline.fromTo(
      iconTarget.eq(0),
      {
        autoAlpha: 0,
        transform: "translateY(3rem)",
      },
      {
        autoAlpha: 1,
        transform: "translateY(0)",
        duration: .6,
        ease: "power1.out",
      }
    );



  });
}

$(document).ready(function () {
  // 处理导航
  $("#menuBurger").click(function () {
    $(".header-right-column")
      .addClass("mobile-menus")
      .show()
      .addClass("fade-in");
    $(".media-absolute").hide();
  });
  $(".mobile-mask").click(function () {
    $(".header-right-column")
      .hide()
      .removeClass("fade-in")
      .removeClass("mobile-menus");
    $(".media-absolute").show();
  });
  $(".mobile-menus .product-underline").click(function () {
    $(this).find(".categorys-list").toggle();
  });

  controlNavbar();

  // 语言切换
  $("#langArrow").click(function () {
    $(".lang-items").toggle().toggleClass("fade-in");
    $("#langArrow").toggleClass("rotate-180");
  });
  $("body").click(function (e) {
    if (
      !$(e.target).closest(".lang-items").length &&
      !$(e.target).closest("#langArrow").length
    ) {
      $(".lang-items").hide().removeClass("fade-in");
      $("#langArrow").removeClass("rotate-180");
    }
  });
  $(".lang-item").click(function (e) {
    $(".lang-items").hide().removeClass("fade-in");
    $("#langArrow").removeClass("rotate-180");
    console.log("切换了语言：", $(e.target).attr("data-lang"));
  });

  // 导航产品下拉
  $(".product-underline").hover(
    function () {
      $(".categorys-list").show().addClass("fade-in");
    },
    function () {
      $(".categorys-list").removeClass("fade-in").hide();
    }
  );

  $(".ani-pop-code").hover(
    function () {
      $(this).find(".pop-code").show().addClass("fade-in");
    },
    function () {
      $(this).find(".pop-code").removeClass("fade-in").hide();
    }
  );

  // 底部自定义滚动条
  $(".scroll-content").mCustomScrollbar({
    theme: "dark", // 选择一个主题，如 "dark", "light", "light-3" 等
    autoHideScrollbar: true,
  });

  showPolicy();
  pageWrapFlowUp();
  gasp_bg_ani()
});
