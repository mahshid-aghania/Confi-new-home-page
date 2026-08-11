/* =============================================================
FUNCTION images_add_caption()

- Captioned Images - add figcaption from alt text

================================================================= */
const { runTests, addCheck } = await import('./_run_tests_var.js');

export function images_add_caption() {
    if ($("img[class$=caption]").length > 0) {
        
        var wysiwygImgArray = new Array(
            'centerwithcaption',
            'rightwithcaption',
            'leftwithcaption',
            'photowithcaption'
        );

        wysiwygImgArray.forEach(imageClass => {
            var thisImage = $("img." + imageClass);
            if (thisImage.length > 0) {
                thisImage.imagesLoaded(function () {
                    thisImage.each(function () {
                        // use html defined width on image if available,
                        // otherwise use actual width of image
                        var myWidth = $(this).attr('width') ? $(this).attr('width') : $(this).prop("naturalWidth");

                        /* Check for tags in alt text */
                        var oldAlt = $(this).attr("alt");
                        var newAlt = oldAlt;
                        newAlt = newAlt.replace(/\{(\/?)em\}/g, "<$1em>");
                        newAlt = newAlt.replace(/\{(\/?)strong\}/g, "<$1strong>");
                        newAlt = newAlt.replace(/\{br\/?\}/g, "<br/>");

                        $(this)
                            .wrap('<figure class="' + imageClass + '-wrapper"></figure>')
                            .after("<figcaption>" + newAlt + "</figcaption>");
                        // max-width is fallback for older browsers
                        $(this).parent("figure").css("max-width", "100%");
                        $(this).parent("figure").css("width", "min(100%," + myWidth + "px)");
                        // remove left/right margins on wide images
                        myWidth > 830 ? $(this).parent("figure").css("margin-left", "0") : null;
                        myWidth > 830 ? $(this).parent("figure").css("margin-right", "0") : null;
                        
                        if (runTests) {
                            if ($(this).parent("figure").length > 0 && $(this).next('figcaption').innerText != '') {
                                addCheck('imgCaptions');
                            } else if ($(this).parent("figure").length === 0 || $(this).next('figcaption').innerText === '') {
                                console.log('image has no figure or text in figcaption');
                                addCheck('imgCaptions', false);
                                return false;
                            }
                        }
                        
                    });
                });
            }
        });

    }
}

