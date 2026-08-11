/*
EXPORTED FROM THIS FILE:
topbar_search_toggle() 
- used only in Law & VIMS
 */
const { runTests, addCheck } = await import('./_run_tests_var.js');

/* =============================================================
- FUNCTION: topbar_search_toggle()
- toggle top bar search input
- used in Law & VIMS

================================================================= */
export function topbar_search_toggle() {
    if ($("#search_site").length > 0) {
        $("#search_site .search_site_submit").on('click', function (e) {
            if ($("#search_site").hasClass("open")) {
                $("#search_site").submit();
            } else {
                $("#search_site").addClass("open");
                setTimeout(function () {
                    $("#search_site #q").focus();
                }, 500);
            }
            e.preventDefault();
            return false;
        });
        $("#search_site .search_site_close").on('click', function (e) {
            e.preventDefault();
            $("#search_site").removeClass("open");
            return false;
        });


        // this was causing a redirect on the home page
        // if (runTests) {
        //     $("#search_site .search_site_submit").click();
        //     if ($("#search_site").hasClass("open")) {
        //         console.log("Test passed - search input open");
        //         addCheck('topbarSearch');
        //     } else {
        //         console.log("Test failed - search input not open");
        //     }

        //     $("#search_site .search_site_close").click();
        //     if (!$("#search_site").hasClass("open")) {
        //         console.log("Test passed - search input closed");
        //         addCheck('topbarSearch');
        //     } else {
        //         console.log("Test failed - search input not closed");
        //     }

        // }
    }
}
