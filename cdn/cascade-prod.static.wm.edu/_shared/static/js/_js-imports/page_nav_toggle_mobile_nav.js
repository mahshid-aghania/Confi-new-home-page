/* =============================================================
FUNCTION page_nav_toggle_mobile_nav()

- open/close menu on mobile
================================================================= */

const { runTests, addCheck } = await import('./_run_tests_var.js');
const { CONTENT_ELEMENT, 
        PAGENAV, 
        EXTRANAV, 
        SOCIALMEDIA_WRAPPER, 
        MOBILE_PAGENAV_BUTTON, 
        WM_PAGE_MENU } = await import('./page_nav_variables.js');
let CONTENT_PAGE_NAV = MOBILE_PAGENAV_BUTTON.parentElement;


export function page_nav_toggle_mobile_nav() { }
if (MOBILE_PAGENAV_BUTTON) {

    MOBILE_PAGENAV_BUTTON.addEventListener("click", function (e) {
        e.preventDefault();
        if (CONTENT_PAGE_NAV.classList.contains("open")) {
            CONTENT_PAGE_NAV.classList.remove("open");
            MOBILE_PAGENAV_BUTTON.setAttribute("aria-expanded", "false");
            
            if (runTests) {
                runTheseTests("closed");
            }
        } else {
            CONTENT_PAGE_NAV.classList.add("open");
            MOBILE_PAGENAV_BUTTON.setAttribute("aria-expanded", "true");
            
            if (runTests) {
                runTheseTests("open");
            }
        }
        
        return false;
    });
}

function runTheseTests(status) {
    
    if (status === "open" && CONTENT_PAGE_NAV.classList.contains("open") && MOBILE_PAGENAV_BUTTON.getAttribute("aria-expanded") === "true") {
        addCheck('mobileToggle');
    } else if (status === "open" && (!CONTENT_PAGE_NAV.classList.contains("open") || MOBILE_PAGENAV_BUTTON.getAttribute("aria-expanded") === "false")) {
        console.log("Test failed - mobile nav should be open");
        addCheck('mobileToggle', false);
    } else if (status === "closed" && !CONTENT_PAGE_NAV.classList.contains("open") && MOBILE_PAGENAV_BUTTON.getAttribute("aria-expanded") === "false") {
        addCheck('mobileToggle');
    } else if (status === "closed" && (!CONTENT_PAGE_NAV.classList.contains("open") || MOBILE_PAGENAV_BUTTON.getAttribute("aria-expanded") === "false")) {
        console.log("Test failed - mobile nav should be closed");
        addCheck('mobileToggle', false);
    }

}