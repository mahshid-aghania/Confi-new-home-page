/*
IN THIS FILE:

- photoset_slideshow_init_slideshow - uses Flexslider
- photoset_slideshow_adjust-height()

 */
const { runTests, addCheck } = await import('./_run_tests_var.js');

/* =============================================================
FUNCTION photoset_slideshow_init_slideshow()

- Load photoset slideshow

================================================================= */
export function photoset_slideshow_init_slideshow() {
    if ($('#wm-photoset .slides').length > 0) {
        $('#wm-photoset').imagesLoaded(function () {
            $('#wm-photoset').flexslider({
                slideshow: false,
                controlNav: false,
                directionNav: true,
                animation: "fade",
                animationLoop: false,
                start: function (slider) {
                    if (slider.count == 1) {
                        $("#wm-photoset-position").hide();
                    }
                    $("#wm-photoset-position").text("Photo " + (slider.currentSlide + 1) + " of " + slider.count);
                    slider.animate({
                        "height": slider.slides.eq(slider.currentSlide).height()
                    }, 0);
                },
                before: function (slider) {
                    $("#wm-photoset-position").text("Photo " + (slider.animatingTo + 1) + " of " + slider.count);
                    let wmSlideHeight = slider.slides.eq(slider.animatingTo).outerHeight();
                    slider.animate({
                        "height": wmSlideHeight
                    }, 400);
                }
            });
            $("#wm-photoset-caption-toggle").click(function () {
                $(this).toggleClass("hide-caption");
                let activeSlideCaptionHeight = $("#wm-photoset .flex-active-slide .wmphotoset-caption").outerHeight();
                $("#wm-photoset .wmphotoset-caption").fadeToggle(400);
                if ($(this).hasClass("hide-caption")) {
                    $("#wm-photoset-caption-toggle-text").html("Hide Caption");
                    $("#wm-photoset-caption-toggle-indicator").removeClass("fa-plus").addClass("fa-minus");
                    $("#wm-photoset").animate({
                        "height": $("#wm-photoset .flex-active-slide").outerHeight()
                    }, 400);
                } else {
                    $("#wm-photoset-caption-toggle-text").html("Show Caption");
                    $("#wm-photoset-caption-toggle-indicator").removeClass("fa-minus").addClass("fa-plus");
                    $("#wm-photoset").animate({
                        "height": $("#wm-photoset .flex-active-slide").height() - activeSlideCaptionHeight
                    }, 400);
                }
            });
        });
    }
}

/* =============================================================
FUNCTION photoset_slideshow_adjust_height()

- Adjust height of photoset slideshow; used after resize

================================================================= */
export function photoset_slideshow_adjust_height() {
    if ($("#wm-photoset .slides").length > 0) {
        $("#wm-photoset").stop(true, true).animate({
            "height": $("#wm-photoset .flex-active-slide").height()
        }, 400);
    }
}