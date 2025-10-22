$(document).ready(function () {
  // 产品图片滚动
  new Swiper(".product-cats-swiper", {
    loop: true, // 循环模式选项
    slidesPerView: 2,
    spaceBetween: 6,
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

  if(isMobileDevice()) {
    var productMobileSwiper = new Swiper(".product-mobile-swiper", {
      direction: "horizontal",
      autoplay:false,
      parallax: true,
      loop: true, // 循环模式选项
      speed: 1000,
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },
    });
  }

  // 产品分类处理
  $(".product-category-list").hide();
  // $(".product-category-toggle:eq(0)").addClass("active").next().show();
  $(".product-category-toggle").click(function () {
    console.log($(this).next())
    if ($(this).next().is(":hidden")) {
      $(".product-category-toggle").removeClass("active").next().slideUp();
      $(this).toggleClass("active").next().slideDown();
    } else {
      $(".product-category-toggle").removeClass("active").next().slideUp();
    }
  });

  // 详情页产品处理
  if($('.product-detail-others').length == 1) {
    const proCardHover = $('.pro-card-hover')
    if(proCardHover.length == 1) { 
      proCardHover.eq(0).parent().addClass('justify-center')
    }
    if(proCardHover.length <= 2) {
      proCardHover.addClass('flex-33')
    }
  }

  $('input[data-action="checkall"]').click(function (event) {
    event.stopPropagation()
    const id = $(this).attr('id');
    if (this.checked) {
      $('input[pid='+id+']').prop('checked', true)
    } else {
      $('input[pid='+id+']').prop('checked', false)
    }
    getCheckedData()
  })
  $('input[data-type="cat_item"]').click(function () {
    const pid = $(this).attr('pid');
    const checkedCount = $('input[pid=' + pid + ']:checked').length
    const totalCount = $('input[pid=' + pid + ']').length
    if(checkedCount == totalCount) {
      $('#'+pid).prop('checked', true)
    } else {
      $('#'+pid).prop('checked', false)
    }
    getCheckedData()
  })
});

function getCheckedData() {
  // 所有选中的子级分类ID
  const checkedData = []
  $('input[data-type="cat_item"]:checked').each(function () {
    checkedData.push($(this).attr('id'))
  })
  // 如果全选了某个分类，那么就不需要再添加子级分类ID
  const selectedCheckAll = []
  $('input[data-action="checkall"]').each(function () {
    if (this.checked) {
      selectedCheckAll.push($(this).attr('id'))
    } else {
      $('input[pid='+$(this).attr('id')+']:checked').each(function () {
        selectedCheckAll.push($(this).attr('id'))
      })
    }
  })
  // 凡是选中的分类，都需要添加到checkedData中
  const checkedAll = []
  $('input[type="checkbox"]:checked').each(function () {
    checkedAll.push($(this).attr('id'))
  })
  console.log('1: ',checkedData)
  console.log('2: ',selectedCheckAll)
  console.log('3: ',checkedAll)
  return checkedData
}