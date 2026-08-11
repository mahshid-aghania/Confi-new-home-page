/* =============================================================
FUNCTION page_nav_hide_empty_extra_divs

- add .empty class to .extra-navs with no children

================================================================= */

const { runTests, addCheck } = await import('./_run_tests_var.js');
const { CONTENT_ELEMENT, 
        PAGENAV, 
        EXTRANAV, 
        SOCIALMEDIA_WRAPPER, 
        MOBILE_PAGENAV_BUTTON, 
        WM_PAGE_MENU } = await import('./page_nav_variables.js');
const { page_nav_adjust_height } = await import('./page_nav_adjust_height.js');


export function page_nav_hide_empty_extra_divs() {
    if (EXTRANAV.length > 0) {
        for (let i = 0; i < EXTRANAV.length; i++) {
            const el = EXTRANAV[i];
            var children = el.children;
            if (children.length == 0) {
                var className = "empty";
                if (el.classList) {
                    el.classList.add(className);

                    if (runTests) {
                        if (!el.classList.contains(className)) {
                            console.log("Test failed - empty class not added");
                            addCheck('emptyDivs', false);
                        } else {
                            addCheck('emptyDivs');
                        }
                    }
                } else if (!hasClass(el, className)) {

                    el.className += " " + className;

                    if (runTests) {
                        if (!hasClass(el, className)) {
                            console.log("Test failed - empty class not added to className");
                            addCheck('emptyDivs', false);
                        } else {
                            addCheck('emptyDivs');
                        }
                    }
                }
            }
        }
        page_nav_adjust_height();
    }
}

