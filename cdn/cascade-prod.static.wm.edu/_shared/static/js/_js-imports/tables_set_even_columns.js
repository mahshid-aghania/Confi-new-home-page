const { runTests, addCheck } = await import('./_run_tests_var.js');

/* =============================================================
FUNCTION tables_set_even_columns()

If the table has the class "even-columns", it calculates the number of columns and sets the width of each cell to an equal percentage.

================================================================= */
export function tables_set_even_columns() {

    $(".user_content table").each(function () {
        if ($(this).hasClass("even-columns")) {
            const numCols = $(this).find("tr:first td").length;
            const evenWidth = Math.floor(100.0 / numCols);
            $(this).find("td").each(function () {
                $(this).attr("width", evenWidth + "%");
            });
            
            if (runTests) {
                let tdWidth = $(this).find("tr:first td").attr('width');
                let diffWidth = false;
                $(this).find('td').each(function() {
                    if ($(this).attr('width') !== tdWidth) {
                       diffWidth = true;
                    }
                });
                if (!diffWidth) {
                    console.log('Test successful: table tds are even.');
                    addCheck('evenTables');
                } else {
                    console.log('Test failed: table tds are not even.');
                }
            }
            
        }
    });

}
