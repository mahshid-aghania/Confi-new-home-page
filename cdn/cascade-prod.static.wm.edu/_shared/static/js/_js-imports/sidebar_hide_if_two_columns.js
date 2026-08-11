/* =============================================================
FUNCTION sidebar_hide_if_two_columns()

- Hide the sidebar if input[name="hasSidebar"] == "N"

================================================================= */

const { runTests, addCheck } = await import('./_run_tests_var.js');


export function sidebar_hide_if_two_columns() {

    if ($('input:hidden[name="hasSidebar"]').val() == "N") {
        
        $('#sidebar').remove();
        $('#main_content').removeClass('hasSidebar');
        
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                setTimeout(() => {
                  targetElement.scrollIntoView({ behavior: 'instant' });
                }, 600);
            }
        }
        
        if (runTests) {
            if ($('#sidebar').length === 0 && !$('#main_content').hasClass('hasSidebar')) {
                addCheck('sidebarRemoved');
            } else {
                console.log("Sidebar test failed");
                addCheck('sidebarRemoved', false);
            }
        }
    }
}