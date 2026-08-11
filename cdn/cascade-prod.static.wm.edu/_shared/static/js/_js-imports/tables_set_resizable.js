const { runTests, addCheck } = await import('./_run_tests_var.js');

/* =============================================================
FUNCTION tables_set_resizable()

If the table has the class "resizable", it removes the fixed widths and sets the width to 100%.

================================================================= */
export function tables_set_resizable() {

    $(".user_content table").each(function () {
         if ($(this).hasClass("resizable")) { // remove fixed widths and let adjust automatically
            $(this).width("100%");
            $(this).find("td").each(function () {
                $(this).removeAttr("width");
            });
            
            if (runTests) {
                let tdHasWidth = false;
                $(this).find('td').each(function() {
                    if ($(this).attr('width') !== undefined) {
                       tdHasWidth = true;
                    }
                });
                if (!tdHasWidth) {
                    console.log('Test successful: table tds are resizable.');
                    addCheck('resizableTables');
                } else {
                    console.log('Test failed: table tds are not resizable.');
                }
            }
            
        }
    });

}
