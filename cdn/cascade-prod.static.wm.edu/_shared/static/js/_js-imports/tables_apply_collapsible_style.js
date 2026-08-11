/* =============================================================
FUNCTION tables_apply_collapsible_style()

- Collapse tables to display content
- Added expand/collapse all functionality for top-level tables

================================================================= */

export function tables_apply_collapsible_style() {

    const COLLAPSIBLE_TABLE = $("table.collapsible");
    let isExpanded = true;

    if (COLLAPSIBLE_TABLE.length > 0) {

        // for accessibility, assign presentation role and remove summary and caption
        COLLAPSIBLE_TABLE.attr("role", "presentation");
        COLLAPSIBLE_TABLE.removeAttr("summary");
        $("table.collapsible > caption").remove();

        // remove .tablespecial formatting
        if (COLLAPSIBLE_TABLE.hasClass('tablespecial')) {
            COLLAPSIBLE_TABLE.removeClass('tablespecial');
        }

        // remove any borders
        COLLAPSIBLE_TABLE.removeAttr("border");
        COLLAPSIBLE_TABLE.css("border", "none");
        $("table.collapsible tr").css("border", "none");
        $("table.collapsible td").css("border", "none");

        const topLevelTables = $("table.collapsible:not(table.collapsible table.collapsible)");

        function getButtonText(isExpanded) {

            isExpanded = (isExpanded === "true" || isExpanded === true);

            let expandText = "Expand";
            let collapseText = "Collapse";
            let allOnPageText = " All";
            let someOnPageText = " Section";

            let currentText = isExpanded ? collapseText : expandText;

            if (window.innerWidth >= 650) {
                if (topLevelTables.length > 1) {
                    currentText = currentText + someOnPageText;
                } else
                    currentText = currentText + allOnPageText;
                {}
            } else {
                currentText = isExpanded ? collapseText : expandText;
            }
            return currentText;
        }

        // Create Expand buttons for each top level table
        topLevelTables.each(function(tableIndex) {

            // if there's only one row, don't show expand button
            let showExpandButton = true;
            const tableRows = $(this).find(':is(h2, h3, h4, h5, h6):first-child');
            if (tableRows.length <= 1) {
                showExpandButton = false;
            }

            const table = $(this);
            const tableId = 'collapsible-table-' + tableIndex;
            table.attr('data-table-id', tableId);

            if (showExpandButton) {

                const expandCollapseButton = $('<button class="expand-collapse-all" data-table-id="' + tableId + '" aria-label="' + getButtonText(false) + '" aria-expanded="false"><span class="expand-text">' + getButtonText(false) + '</span><i class="fa-solid fa-plus"></i><i class="fa-solid fa-minus"></i></button>');

                // Insert button before the table
                table.before(expandCollapseButton);
            }
        });

        // for each td:
        // add toggle button if the first heading in table
        // add .extra-space to last child
        // add wrapper around td content and hide
        $("table.collapsible tr td").each(function(index) {

            if ($(this).closest("table").hasClass("collapsible")) {
                var headerNode = null;
                var myId = 'collapsible-' + index;

                $(this).children().each(function() {

                    if ($(this).is(":is(h2, h3, h4, h5, h6):first-child") && headerNode == null) {
                        $(this).wrapInner('<button class="collapsible_title_text toggle-collapsible-table-button" aria-expanded="false" aria-controls="' + myId + '"></button>');
                        headerNode = $(this).addClass("collapsible_title").detach();
                    }
                    if ($(this).is(":last-child:not(p, ol, ul)")) {
                        $(this).parent().addClass("extra-space");
                    }
                });

                $(this).wrapInner('<div class="collapsible_content" id="' + myId + '"></div>');
                $(".collapsible_content").attr("aria-hidden", "true");

                if (headerNode != null) {
                    $(this).children(".collapsible_content").before(headerNode);
                }
            }

        });

        // show table after all modifications have been made
        COLLAPSIBLE_TABLE.css("display", "table");

        /* HANDLER FUNCTIONS =================================================================== */

        // Individual collapsible section handlers
        $(".collapsible_title_text").mousedown(function() {
            $(this).removeClass('key-focus');
        });
        $(".collapsible_title_text").keyup(function() {
            $(this).addClass('key-focus');
        });
        $(".collapsible_title_text").click(function() {
            const button = $(this);
            toggleCollapsibleSection(button);
        });

        // Expand/Collapse All button handler
        // adds/removes .open on all table's rows
        // updates Expand button text and aria-label
        $(".expand-collapse-all").click(function() {

            let isExpanded = $(this).attr('aria-expanded');
            // convert to boolean
            isExpanded = (isExpanded === "true" || isExpanded === true);

            const button = $(this);
            const tableId = button.attr('data-table-id');
            const table = $('table[data-table-id="' + tableId + '"]');
            const allSections = table.find('.collapsible_title_text');

            if (isExpanded) {
                // Collapse all sections
                allSections.each(function() {
                    const sectionButton = $(this);
                    if (sectionButton.parent('.collapsible_title').hasClass("open")) {
                        toggleCollapsibleSection(sectionButton);
                    }
                });
                isExpanded = false;
            } else {
                // Expand all sections
                allSections.each(function() {
                    const sectionButton = $(this);
                    if (!sectionButton.parent('.collapsible_title').hasClass("open")) {
                        toggleCollapsibleSection(sectionButton);
                    }
                });
                isExpanded = true;
            }

            $(this).attr('aria-expanded', isExpanded);
            $(this).attr('aria-label', getButtonText(isExpanded));
            $(this).find('.expand-text').text(getButtonText(isExpanded));
            // $(this).find('.fa-solid').            )

        });

        // update button text on resize
        function updateExpandText() {
            $('.expand-collapse-all').each(function() {
                $(this).find('.expand-text').text(getButtonText($(this).attr('aria-expanded')));
            });
        }
        updateExpandText();
        window.addEventListener('resize', updateExpandText);

    }

}

/* =============================================================
HELPER FUNCTION toggleCollapsibleSection()

- Handles the expand/collapse behavior for individual sections
- sets/removes .open class on title
- sets aria-expanded attribute
- sets aria-hidden attribute

================================================================= */
function toggleCollapsibleSection(button) {

    // default animation speed
    let slidespeed = 300;

    // reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        slidespeed = 0;
    }

    if (button.parent('.collapsible_title').hasClass("open")) {
        button.parent('.collapsible_title').removeClass("open");
        button.parent('.collapsible_title').siblings('.collapsible_content').slideUp(slidespeed, function() {
            $(this).attr("aria-hidden", "true");
        });
        button.attr("aria-expanded", "false");
    } else {
        button.parent('.collapsible_title').addClass("open");
        button.parent('.collapsible_title').siblings('.collapsible_content').slideUp(0, function() {
            $(this).attr("aria-hidden", "false");
            $(this).slideDown(slidespeed, function() {});
        });
        button.attr("aria-expanded", "true");

        // add scrolltip if tablespecial is found.
        button.parent(".collapsible_title").siblings(".collapsible_content").find(".tablewrap").each(function() {
            var div = this;
            var mytable = $(this).find("table");
            if (div.scrollWidth > div.clientWidth) {
                mytable.css({
                    "margin-top": "1.4em",
                    "max-width": "100%"
                });
                $(this).find(".scroll-message").show();
            } else {
                $(this).find(".scroll-message").hide();
                mytable.css("margin-top", "");
            }
        });
    }
}