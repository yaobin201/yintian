
function isMobileDevice() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // 检查设备是否为移动设备
  return /iPad|iPhone|iPod|Android|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
}

function pageWrapFlowUp() {
  const isMobel = isMobileDevice()
  const pageWraps = document.querySelectorAll(".flow-up");
  const _delay = isMobel ? '0.3' : '1'
  const ob = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = +entry.target.dataset.delayStep || 0;
        gsap.fromTo(
          entry.target,
          {
            autoAlpha: 0,
            transform: "translateY(50px)",
          },
          {
            autoAlpha: 1,
            transform: "translateY(0)",
            delay: _delay,
            duration: 0.5 + delay,
            ease: "power1.out",
          }
        );
        ob.unobserve(entry.target);
      } else {
        // $(entry.target).css('opacity', 0)
      }
    });
  }, {
    rootMargin: isMobel ? '10px' : '100px'
  });

  pageWraps.forEach((pageWrap) => {
    ob.observe(pageWrap);
  });
}

function showPolicy() {
  $("#data-policy").cookieBar({
    closeButton: '.privacy-btn',
    name: 'mycookiename'
  })
  $("#data-policy").on('cookieBar-close', function() {
    console.log('cookiebar关闭回调')
  })
}

// 防抖方法
function AntiShake(fn,wait){
    var timer = null;
    return function(){
        if(timer !== null){
            clearTimeout(timer);
        }
        timer = setTimeout(fn,wait);
    };
}
// 节流方法
function AntiThrottle(fn,delay){
  let throttleTimer = null;
  return () => {
    if(throttleTimer) return;
    throttleTimer = setTimeout(() =>{
        fn.call(this);
        clearTimeout(throttleTimer);
        throttleTimer = null;
    }, delay);
  }
}


var lastScrollTop = 0; // 上一次滚动的位置
function pageNavScroll() {
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
}

function controlNavbar() {
  if (isMobileDevice()) {
    return;
  }
  $(window).scroll(AntiThrottle(pageNavScroll, 1000));
}

function normalWrapAni() {
  if(!$(".text-bani").length) {
    return
  }
  $(".text-bani").each(function () {
    const _this = $(this);
    ScrollTrigger.create({
      trigger: _this,
      start: "top 75%",
      end: "bottom 75%",
      scrub: true,
      // markers: true,
      onEnter: () => {
        console.log('enter')
        _this.find(".text-bani-timeline").each(function (index) {
          const dataDelay = +$(this).attr("data-delay-step") || 0;
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
      onLeaveBack: () => {
        _this.find(".text-bani-timeline").css("opacity", 0);
      }
    });
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

function execNumberAni(flag) {
  // 数字滚动
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

// 文字动效
function initHighlightText(flag) {
  if(window[flag]) return;
  window[flag] = true;
  let splitHeadingTargets = document.querySelectorAll("[data-r-text]");
  if(!splitHeadingTargets.length) {
    return;
  }
  splitHeadingTargets.forEach((heading) => {
    const scrollStart =
      heading.getAttribute("data-highlight-scroll-start") || "top 75%";

    const scrollEnd =
      heading.getAttribute("data-highlight-scroll-end") || "bottom 75%";
    const fadedValue = heading.getAttribute("data-highlight-fade") || 0.2;

    const staggerValue = heading.getAttribute("data-highlight-stagger") || 0.05;

    new SplitText(heading, {
      type: "words, chars",
      autoSplit: true,
      onSplit(self) {
        let ctx = gsap.context(() => {
          let tl = gsap.timeline({
            scrollTrigger: {
              scrub: true,
              trigger: heading,
              start: scrollStart,
              end: scrollEnd,
            },
          });
          tl.from(self.chars, {
            autoAlpha: fadedValue,
            stagger: staggerValue,
            ease: "linear",
          });
        });
        return ctx;
      },
    });
  });
}

const lenis = new Lenis({
  lerp: 0.05,
  autoRaf: true,
  smoothWheel: true,
  smoothTouch: true
});
// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
// lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);


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

  $("#openSearchIcon").click(function () {
    $(".search-entry .search-txt").addClass("active");
    $('#searchTxt').show(300);
    $("#closeSearchIcon").show(300);
  });
  $("#closeSearchIcon").click(function () {
    $(".search-entry .search-txt").removeClass("active");
    $('#searchTxt').hide(300);
    $("#closeSearchIcon").hide(300);
  });
  $('#headerSearchInput').on('keyup', function(event) {
    if(event.key == 'Enter' || event.keyCode == 13 || event.which == 13) {
      const val = $(this).val().trim()
      if(!val) return;
      window.location.href = `./search.html?keyword=${val}`
    }
  })

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
  normalWrapAni();
  showPolicy();
  pageWrapFlowUp();
  gasp_bg_ani()
});
