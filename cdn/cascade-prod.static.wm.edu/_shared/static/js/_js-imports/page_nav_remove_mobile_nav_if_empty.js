/* =============================================================
FUNCTION page_nav_remove_mobile_nav_if_empty

- If there is no menu content just delete the button

================================================================= */

const { runTests, addCheck } = await import('./_run_tests_var.js');
const { CONTENT_ELEMENT, 
        PAGENAV, 
        EXTRANAV, 
        SOCIALMEDIA_WRAPPER, 
        MOBILE_PAGENAV_BUTTON, 
        WM_PAGE_MENU } = await import('./page_nav_variables.js');
        


export function page_nav_remove_mobile_nav_if_empty() {
    if (PAGENAV != null && WM_PAGE_MENU != null) {

        let social_media_nav = document.querySelector('.social-media-nav');
        let extra_nav_empty = document.querySelector(".extra-nav.empty");

        if ((WM_PAGE_MENU.innerHTML.trim() == "") && !social_media_nav && extra_nav_empty) {
            PAGENAV.removeChild(MOBILE_PAGENAV_BUTTON);
        }

        if (runTests) {
            if ((WM_PAGE_MENU.innerHTML.trim() == "") && !social_media_nav && extra_nav_empty) {
                if (!PAGENAV.contains(MOBILE_PAGENAV_BUTTON)) {
                    addCheck('removeMobilePageNav');
                } else {
                    console.log("Test failed - mobile nav button not removed");
                    addCheck('removeMobilePageNav', false);
                }
            }
        }
    }
}