/* =============================================================
FUNCTION page_nav_adjust_social_icons()

- Social Media Icons: adds a class to the social icons wrapper in the page nav if there are 5, 6, or 9 icons so that the icon layout can be altered for aesthetics.

================================================================= */

const { runTests, addCheck } = await import('./_run_tests_var.js');
const { CONTENT_ELEMENT, 
        PAGENAV, 
        EXTRANAV, 
        SOCIALMEDIA_WRAPPER, 
        MOBILE_PAGENAV_BUTTON, 
        WM_PAGE_MENU } = await import('./page_nav_variables.js');
        


export function page_nav_adjust_social_icons() {

    if (SOCIALMEDIA_WRAPPER) {
        for (let i = 0; i < SOCIALMEDIA_WRAPPER.length; i++) {
            let numIcons = SOCIALMEDIA_WRAPPER[i].querySelectorAll('.sm_icon');
            if (numIcons.length == 5 || numIcons.length == 6 || numIcons.length == 9) {
                SOCIALMEDIA_WRAPPER[i].classList += " -js-narrow";
            }
        }
        if (runTests) {
            for (let i = 0; i < SOCIALMEDIA_WRAPPER.length; i++) {
                let numIcons = SOCIALMEDIA_WRAPPER[i].querySelectorAll('.sm_icon');
                if ((numIcons.length == 5 || numIcons.length == 6 || numIcons.length == 9) && SOCIALMEDIA_WRAPPER[i].classList.contains("-js-narrow")) {
                    addCheck('socialIconsAdd');
                } else if ((numIcons.length == 5 || numIcons.length == 6 || numIcons.length == 9) && !SOCIALMEDIA_WRAPPER[i].classList.contains("-js-narrow")) {
                    console.log("Test failed - -js-narrow class not added");
                    addCheck('socialIconsAdd', false);
                } else {
                    addCheck('socialClassNone');
                }
            }
        }
    }
}



