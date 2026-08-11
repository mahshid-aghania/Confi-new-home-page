const { runTests, addCheck } = await import('./_run_tests_var.js');

/* =============================================================
FUNCTION widget_slideshow_init_bxslider()

- BxSlider

================================================================= */
export function sidebar_widget_slideshow_init_bxslider() {
    var buttonTopMargin = 4;
    // code for new classes May 2021 - Nissa
    if ($(".js-bxslider-widget").length > 0) {
        $(".js-bxslider-widget").imagesLoaded(function () {
            $(".js-bxslider-widget").each(function () {
                var oneSlider = $(this).children().length < 2;
                if (oneSlider) {
                    $(this).addClass("no-controls");
                }
                var slider = $(this).bxSlider({
                    mode: "fade",
                    pager: false,
                    adaptiveHeight: true,
                    randomStart: true,
                    nextText: '<i class="fa fa-chevron-right" aria-hidden="true"></i><span class="visuallyhidden">Next</span>',
                    prevText: '<i class="fa fa-chevron-left" aria-hidden="true"></i><span class="visuallyhidden">Previous</span>',
                    touchEnabled: false, //(!oneSlider),
                    controls: !oneSlider,
                    onSliderLoad: function () {
                        $(this).find("li a").attr("tabindex", "-1");
                        $(this)
                            .find('li[aria-hidden="false"] a')
                            .not(".notab")
                            .removeAttr("tabindex");
                        let imageHeight = $(this)
                            .find('li[aria-hidden="false"]')
                            .find("img")
                            .height();
                        let thisWrapper = $(this).closest(".bx-wrapper");
                        // if YouTube and hasn't loaded yet
                        if (!imageHeight || imageHeight == 0) {
                            imageHeight = 200;
                        }
                        thisWrapper
                            .find(".bx-controls-direction")
                            .css("top", imageHeight + buttonTopMargin + "px");
                    },
                    onSlideAfter: function () {
                        $(this).find("li a").attr("tabindex", "-1");
                        $(this)
                            .find('li[aria-hidden="false"] a')
                            .not(".notab")
                            .removeAttr("tabindex");
                        let imageHeight = $(this)
                            .find('li[aria-hidden="false"]')
                            .find("img")
                            .height();
                        // if no image height, set height for video
                        if (!imageHeight || imageHeight == 0) {
                            imageHeight = 200;
                        }
                        let thisWrapper = $(this).closest(".bx-wrapper");
                        thisWrapper
                            .find(".bx-controls-direction")
                            .css("top", imageHeight + buttonTopMargin + "px");
                    }
                });
                // add swipe using TouchSwipe in plugins.js, since BxSLider's touchEnabled setting is buggy in Chrome
                $(this).swipe({
                    swipeLeft: function (e, direction, distance, duration, fingerCount) {
                        e.stopPropagation();
                        slider.goToNextSlide();
                        return false;
                    },
                    swipeRight: function (e, direction, distance, duration, fingerCount) {
                        e.stopPropagation();
                        slider.goToPrevSlide();
                        return false;
                    }
                });
            });
        });
    }
    // code for old classes (remove after class changes are up on Production)
    if ($(".bxslider-widget").length > 0) {
        $(".bxslider-widget").imagesLoaded(function () {
            $(".bxslider-widget").each(function () {
                var oneSlider = $(this).children().length < 2;
                if (oneSlider) {
                    $(this).addClass("no-controls");
                }
                var slider = $(this).bxSlider({
                    mode: "fade",
                    pager: false,
                    adaptiveHeight: true,
                    randomStart: true,
                    nextText: '<i class="fa fa-chevron-right" aria-hidden="true"></i><span class="visuallyhidden">Next</span>',
                    prevText: '<i class="fa fa-chevron-left" aria-hidden="true"></i><span class="visuallyhidden">Previous</span>',
                    touchEnabled: false, //(!oneSlider),
                    controls: !oneSlider,
                    onSliderLoad: function () {
                        $(this).find("li a").attr("tabindex", "-1");
                        $(this)
                            .find('li[aria-hidden="false"] a')
                            .not(".notab")
                            .removeAttr("tabindex");
                        let imageHeight = $(this)
                            .find('li[aria-hidden="false"]')
                            .find("img")
                            .height();
                        let thisWrapper = $(this).closest(".bx-wrapper");
                        // if YouTube and hasn't loaded yet
                        if (!imageHeight || imageHeight == 0) {
                            imageHeight = 200;
                        }
                        thisWrapper
                            .find(".bx-controls-direction")
                            .css("top", imageHeight + buttonTopMargin + "px");
                    },
                    onSlideAfter: function () {
                        $(this).find("li a").attr("tabindex", "-1");
                        $(this)
                            .find('li[aria-hidden="false"] a')
                            .not(".notab")
                            .removeAttr("tabindex");
                        let imageHeight = $(this)
                            .find('li[aria-hidden="false"]')
                            .find("img")
                            .height();
                        // if no image height, set height for video
                        if (!imageHeight || imageHeight == 0) {
                            imageHeight = 200;
                        }
                        let thisWrapper = $(this).closest(".bx-wrapper");
                        thisWrapper
                            .find(".bx-controls-direction")
                            .css("top", imageHeight + buttonTopMargin + "px");
                    },
                });
                // add swipe using TouchSwipe in plugins.js, since BxSLider's touchEnabled setting is buggy in Chrome
                $(this).swipe({
                    swipeLeft: function (e, direction, distance, duration, fingerCount) {
                        e.stopPropagation();
                        slider.goToNextSlide();
                        return false;
                    },
                    swipeRight: function (e, direction, distance, duration, fingerCount) {
                        e.stopPropagation();
                        slider.goToPrevSlide();
                        return false;
                    },
                });
            });
        });
    }
}