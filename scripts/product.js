$(document).ready(function () {
  // 产品图片滚动
  new Swiper(".product-cats-swiper", {
    loop: true, // 循环模式选项
    slidesPerView: 2,
    autoplay: true,
    breakpoints: {
      768: {
        //当屏幕宽度大于等于768
        slidesPerView: 5,
      },
      1280: {
        //当屏幕宽度大于等于1280
        slidesPerView: 7,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // 产品分类处理
  $(".product-category-list").hide();
  $(".product-category-toggle:eq(0)").addClass("active").next().show();
  $(".product-category-toggle").click(function () {
    if ($(this).next().is(":hidden")) {
      $(".product-category-toggle").removeClass("active").next().slideUp();
      $(this).toggleClass("active").next().slideDown();
    }
  });
});
