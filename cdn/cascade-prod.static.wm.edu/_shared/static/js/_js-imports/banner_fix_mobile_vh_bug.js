const { runTests, addCheck } = await import('./_run_tests_var.js');

/* =============================================================
FUNCTION banner_fix_mobile_vh_bug()

- Fix for mobile vh issues
- Custom variables in: banner.scss
- Only apply if there's a tall banner
- Set the value in the --vh custom property to the root of the document

================================================================= */
export function banner_fix_mobile_vh_bug() {
    if (document.querySelector(".m-header.-tall") &&
        document.querySelector("html").classList.contains("touch")) {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", vh + "px");

        if (runTests) {
            if (document.documentElement.style.getPropertyValue("--vh") != vh + "px") {
                console.log("Test failed - incorrect --vh custom property set");
                addCheck('mobileVH', false);
            } else {
                addCheck('mobileVH');
            }
        }
    }
}
