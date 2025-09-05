function pageWrapFlowUp() {
  const pageWraps = document.querySelectorAll(".flow-up");
  const ob = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.fromTo(
          entry.target,
          {
            autoAlpha: 0.2,
            transform: "translateY(3rem)",
          },
          {
            autoAlpha: 1,
            transform: "translateY(0)",
            duration: 0.8,
            ease: "linear",
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
      ease: "linear",
      delay: 1,
    }
  );
  $(".privacy-btn").click(function () {
    const type = $(this).attr("data-type");
    console.log(type);
    policy.hide();
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
});
