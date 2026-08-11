export function photoset_slideshow_init_swiper() {
      $("#wm-photoset-caption-toggle").click(function () {
        $("#wm-photoset-caption-toggle-indicator").toggleClass("fa-plus fa-minus");
        $(".photosetSwiper .wmphotoset-caption").fadeToggle(400);

        if ($(this).attr("aria-expanded") == "true") {
          $("#wm-photoset-caption-toggle-text").html("Show Caption");
          $(this).attr("aria-expanded", "false");
          $(".photosetSwiper .wmphotoset-caption").attr("aria-hidden", "true");
          $(".photosetSwiper .wmphotoset-caption").css("position", "absolute");
          swiper.updateAutoHeight(600);
        } else {
          $("#wm-photoset-caption-toggle-text").html("Hide Caption");
          $(this).attr("aria-expanded", "true");
          $(".photosetSwiper .wmphotoset-caption").attr("aria-hidden", "false");
          $(".photosetSwiper .wmphotoset-caption").css("position", "relative");
          swiper.updateAutoHeight(600);
        }
      });

      var swiper = new Swiper(".photosetSwiper", {
        autoHeight: true,
        fadeEffect: {
          crossFade: true,
        },
        effect: "fade",
        speed: 600,
        pagination: {
          el: ".wmphotoset-pagination",
          type: "custom",
          renderCustom: function (swiper, current, total) {
            return "Photo " + current + " of " + total;
          },
        },
        navigation: {
          nextEl: ".wmphotoset-swiper-next",
          prevEl: ".wmphotoset-swiper-prev",
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
        loop: true,
      });
}