// alert("test");
$(function () {
  // 스크롤시 네비 변경하기
  let desktopGnb1 = $("nav#desktopGnb1");
  let desktopGnb2 = $("nav#desktopGnb2");

  desktopGnb2.hide();
  $(window).scroll(function () {
    let scrollTop = $(window).scrollTop();
    //alert(scrollTop);
    if (scrollTop >= 40) {
      desktopGnb2.show();
      desktopGnb1.hide();
    }
    if (scrollTop < 40) {
      desktopGnb1.show();
      desktopGnb2.hide();
    }
  });

  // 햄버거 버튼
  let hambergerBtn = $(".hambegerBtn");
  let close = $(".close");
  let mobileGnb = $(".mobileGnb li");
  let mobileMenu = $(".mobileMenu");

  hambergerBtn.click(function () {
    mobileMenu.show();
    $("body").addClass("hidden");
  });

  close.click(() => {
    mobileMenu.hide();
    $("body").removeClass("hidden");
  });

  // 캐로 셀 동작 구문
  let carousel_btn = $(".carousel_btn .btn li").not(
    ".carousel_btn .btn li:last-child"
  );
  let carousel_gallery = $(".gallery li");
  let current = 0;

  carousel_gallery.css("left", "100%");
  carousel_gallery.eq(current).css("left", 0);

  carousel_btn.click(() => {
    carousel_btn.removeClass("active");
    $(this).addClass("active");
    let current = $(this).index();
    clearInterval(clock);
    carousel_gallery.css("left", "100%");
    carousel_gallery.eq(current).animate({ left: 0 }, 500);
    move_btn(current);
  });

  move();
  // 1초마다 자동으로 동작하는 캐로 셀
  function move() {
    clock = window.setInterval(() => {
      prev = carousel_gallery.eq(current);
      prev.css("left", 0).animate({ left: "-100%" }, 200);

      carousel_btn.removeClass("active");
      carousel_btn.eq(current + 1).addClass("active");
      current = current + 1;

      if (current == 8) {
        current = 0;
      }

      let next = carousel_gallery.eq(current);
      next.css("left", "100%").animate({ left: "0" }, 200);
      carousel_btn.eq(current).addClass("active");
    }, 2000);
  }

  function move_btn(current) {
    clock = window.setInterval(() => {
      let prev = carousel_gallery.eq(current);
      prev.css("left", 0).animate({ left: "-100%" }, 200);

      carousel_btn.removeClass("active");
      carousel_btn.eq(current + 1).addClass("active");
      current = current + 1;

      if (current == 8) {
        current = 0;
      }

      let next = carousel_gallery.eq(current);
      next.css("left", "100%").animate({ left: "0" }, 200);
      carousel_btn.eq(current).addClass("active");
    }, 2000);
  }

  // 일시정지 재생
  let carousel_pause_btn = $("li.pause");
  let carousel_play_btn = $("li.play");

  carousel_pause_btn.click(() => {
    $(this).hide();
    carousel_play_btn.show();
    clearInterval(clock);
    carousel_gallery.eq(current).css("left", 0);
    carousel_btn.eq(current).addClass("active");
  });
  carousel_play_btn.click(() => {
    $(this).hide();
    carousel_pause_btn.show();
    move();
  });
});
