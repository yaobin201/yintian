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
  $(".product-category-toggle").click(function () {
    if ($(this).next().is(":hidden")) {
      $(this).toggleClass("active").next().slideDown();
    } else {
      $(this).toggleClass("active").next().slideUp();
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

  // 新增修改 开始-----------------------------------------------
  // $('input[data-action="checkall"]').click(function (event) {
  //   event.stopPropagation()
  //   const id = $(this).attr('id');
  //   if (this.checked) {
  //     $('input[pid='+id+']').prop('checked', true)
  //   } else {
  //     $('input[pid='+id+']').prop('checked', false)
  //   }
  //   getCheckedData()
  // })
  // $('input[data-type="cat_item"]').click(function () {
  //   const pid = $(this).attr('pid');
  //   const checkedCount = $('input[pid=' + pid + ']:checked').length
  //   const totalCount = $('input[pid=' + pid + ']').length
  //   if(checkedCount == totalCount) {
  //     $('#'+pid).prop('checked', true)
  //   } else {
  //     $('#'+pid).prop('checked', false)
  //   }
  //   getCheckedData()
  // })
  $('.product-category-wrap input[type="checkbox"]').click(function () {
    reloadData()
  })

  initSearchParams();
  clickClearHandler();
});

// 从url中初始化参数到checkbox
function initSearchParams() {
  const proCat = getProductCat();
  // proCat是一组用加号拼接的字符串，单也可能没有加号
  if (proCat) {
    console.log(proCat, 'proCat是一组用加号拼接的字符串')
    // 从url中获取产品分类的ID 并用于请求新的分类列表和产品列表 todo
    fetchAndRefreshData(proCat.split('+'))
    // 从url中获取产品分类的ID 并设置checkbox状态
    resetCheckbox(proCat.split('+'))
  } else {
    // 原本的加载页面分类和产品列表逻辑 todo
    console.log('proCat是一组用加号拼接的字符串')
  }
}

// 选中checkbox
function reloadData() {
  $('#masView').addClass('mask-view');
  const ids = []
  $('.product-category-wrap input:checked').each(function(){
    ids.push($(this).attr('id'))
  });

  if (ids.length > 0) {
    // 这里开始处理请求数据 todo
    fetchAndRefreshData(ids)
    const curUrl = window.location.href.split('?')[0]
    const newUrl = `${curUrl}?product_cat=${ids.join('+')}`
    console.log(newUrl,' ...newUrl')
    if (!navigator.userAgent.match(/msie/i)) { 
      window.history.pushState({
        ids: ids.join('+')
      }, '', newUrl)
    }
    showClearBtn();
    $('#masView').removeClass('mask-view');
  } else {
    const curUrl = window.location.href.split('?')[0]
    window.location.replace(curUrl)
  }
}

// 增加点击clear动作
function clickClearHandler() {
  $('.clear-wrap').click(function (event) {
    console.log($(this).next())
    $(this).next().find('input[type="checkbox"]').each(function () {
      $(this).prop('checked', false)
    })
    // checkbox状态发生改变，开始加载新的数据
    reloadData()
  })
}

function resetCheckbox(ids) {
  ids.forEach(function (id) {
    // 用url中携带的ID找到对应的checkbox，将其标记为选中
    $(`#${id}`).prop('checked', true)
    const exsitPid = $(`#${id}`).attr('pid')
    // 将标记为选中的分类要展开显示
    if (exsitPid) {
      $(`#${exsitPid}`).parents('.product-category-toggle').each(function () {
        $(this).toggleClass("active").next().slideDown();
      })
    } else {
      $(`#${id}`).parents('.product-category-toggle').each(function () {
        $(this).toggleClass("active").next().slideDown();
      })
    }
  })
  showClearBtn();
}

function showClearBtn() {
  // 显示清除按钮 并绑定点击事件
  $('.clear-wrap').show()
  
}

function getProductCat() {
  const search = window.location.search.replace('?', '');
  console.log(search.split('&'),'.search')
  if (search) {
    const params = {}
    search.split('&').forEach(item => {
      const temp = item.split('=')
      params[temp[0]] = temp[1]
    })
    if (params['product_cat']) {
      return params['product_cat']
    }
  }
  return ''
}

// 这里更新左侧分类和右侧数据列表
function fetchAndRefreshData(catIds) {
  console.log(catIds)
}
// 新增修改 结束-----------------------------------------------

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