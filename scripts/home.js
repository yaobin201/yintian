// 文字动效
function initHighlightText() {
  let splitHeadingTargets = document.querySelectorAll("[data-r-text]");

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

// 计数器效果
function startNumberSwitch() {
  function execNumberAni() {
    $(".ani-numaber").each(function () {
      const $this = $(this);
      const target = parseInt($this.attr("data-number"));
      console.log($this.animateNumber);
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

$(document).ready(function () {
  solutionAccording();
  newsBgSwitch();
  startNumberSwitch();
  initHighlightText();
});
