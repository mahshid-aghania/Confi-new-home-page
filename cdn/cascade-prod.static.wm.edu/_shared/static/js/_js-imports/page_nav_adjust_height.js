// this file includes exported page_nav_adjust_height() function 
// and internal page_nav_resize_observer() function

/* =============================================================
FUNCTION page_nav_adjust_height()

- If body width is greater than 930, adjust page navigation's height; otherwise, set content's minimum height as zero.

================================================================= */

const { runTests, addCheck } = await import('./_run_tests_var.js');
const { CONTENT_ELEMENT, 
        PAGENAV, 
        EXTRANAV, 
        SOCIALMEDIA_WRAPPER, 
        MOBILE_PAGENAV_BUTTON, 
        WM_PAGE_MENU } = await import('./page_nav_variables.js');
        

export function page_nav_adjust_height() {
    // this variable should match the $maincontent-bottom-spacing variable found in wm_spacing.scss
    let maincontent_bottom_spacing = 44;
    if (CONTENT_ELEMENT) {
        if (window.innerWidth > 930) {

            if (PAGENAV) {
                var pagenavheight = PAGENAV.offsetHeight;
                CONTENT_ELEMENT.style.minHeight = pagenavheight + maincontent_bottom_spacing + "px";

                // Added test
                if (runTests) {
                    if (parseInt(CONTENT_ELEMENT.style.minHeight) != pagenavheight + maincontent_bottom_spacing) {
                        console.log("Test failed - incorrect min-height set");
                        addCheck('setMinHeight', false)
                    } else {
                        addCheck('setMinHeight');
                    }
                }
            }
        } else {
            CONTENT_ELEMENT.style.minHeight = 0;

            if (runTests) {
                if (parseInt(CONTENT_ELEMENT.style.minHeight) != 0) {
                    console.log("Test failed - min-height not set to 0");
                    addCheck('removeMinHeight', false)
                } else {
                    addCheck('removeMinHeight');
                }
            }
        }
    }
}


/* =============================================================
FUNCTION page_nav_resize_observer

Add observer to page nav divs and run pageNav_adjustHeight() again when the a div size changes (this can happen when custom fonts finish)
================================================================= */
function page_nav_resize_observer() {
    const myObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
            page_nav_adjust_height();
            console.log('resize observed');
        });
    });
    // TODO: CHECK IF ALL OF THESE ARE NEEDED
    const pmenu = document.querySelector('.wm-page_menu');
    const smnav = document.querySelector('.social-media-nav');
    const enav = document.querySelector('.extra-nav');
    if (pmenu) { myObserver.observe(pmenu); }
    if (smnav) { myObserver.observe(smnav); }
    if (enav) { myObserver.observe(enav); }

}

