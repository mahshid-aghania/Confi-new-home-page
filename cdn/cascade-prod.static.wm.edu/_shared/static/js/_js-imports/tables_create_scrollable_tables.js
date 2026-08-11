/* =============================================================
FUNCTION tables_create_scrollable_tables()

- Scrollable Tables: wrap tables in div for scrolling on mobile devices

================================================================= */


export function tables_create_scrollable_tables() {
    const tables = document.querySelectorAll(
        ".user_content table:not(.gsc-search-box, .gsc-input, .gsc-above-wrapper-area-container, .tablespecialleft, .collapsible, .tablespecialleft + .tablespecial),.user_content_styles table:not(.gsc-search-box, .gsc-input, .gsc-above-wrapper-area-container, .tablespecialleft, .collapsible, .tablespecialleft + .tablespecial)"
    );
    if (!tables.length) return;

    tables.forEach((table,index) => {
        
        const wrapper = document.createElement("div");
        wrapper.className = "tablewrap";
 
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);

        // Create the scroll message
        const msg = document.createElement("p");
        msg.className = "scroll-message";
        msg.textContent = "Scroll right for more";

        wrapper.insertAdjacentElement('beforebegin', msg);
    });

    tables_toggle_scroll_tip();
    runTestsFn(tables);

    window.addEventListener("resize", () => {
        tables_toggle_scroll_tip();
        runTestsFn(tables);
    });

}

/* =============================================================
FUNCTION tables_toggle_scroll_tip()

- Display scroll message

================================================================= */
function tables_toggle_scroll_tip() {
    const wrappers = document.querySelectorAll(".tablewrap");
    if (!wrappers.length) return;

    wrappers.forEach(wrapper => {

        if (Math.round(wrapper.scrollWidth) > Math.round(wrapper.clientWidth)) {
            wrapper.classList.add('wide-table');
        } else {
            wrapper.classList.remove('wide-table');
        }
    });

}


// if true, outputs testings logs
const runTests = false;
function runTestsFn(tables) {
    if (runTests) {
        tables.forEach(table => {
            if (!table.parentNode.classList.contains('tablewrap')) {
                console.log('Table missing wrapping div:', table);
            }
        });

        const tablewraps = document.querySelectorAll('.tablewrap');
        tablewraps.forEach((wrap, index) => {

            const isOverflowing = wrap.scrollWidth > wrap.clientWidth;
            const messageIsVisible = wrap.classList.contains("wide-table");

            if (isOverflowing && !messageIsVisible) {
                console.log("Wide and hidden: ERROR: SCROLL MESSAGE SHOULD BE SHOWING ", index);

            } else if (isOverflowing && messageIsVisible) {
                // console.log("Wide and visible: CORRECT ", index);

            } else if (!isOverflowing && messageIsVisible) {
                console.log("Narrow and visible: MESSAGE SHOULD NOT BE SHOWING ", index);

            } else if (!isOverflowing && !messageIsVisible) {
                // console.log("Narrow and hidden: CORRECT ", index);
            }
        });
    }
}
