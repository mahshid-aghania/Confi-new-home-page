const { runTests, addCheck } = await import('./_run_tests_var.js');

/* =============================================================
FUNCTION new_tab_aria_label()

- Add aria-label to links that open in new tab

================================================================= */

export function new_tab_aria_label() {

    // Prevent running inside Cascade preview iframe
    const inIframe = window.self !== window.top;

    if (inIframe) {
        return;
    }

    const links = document.querySelectorAll('a[target="_blank"]');

    links.forEach(function (link) {

        // Skip if aria-label already exists
        if (link.hasAttribute("aria-label")) {
            return;
        }

        let linkText = link.textContent.trim();

        // Skip empty links
        if (!linkText) {
            return;
        }

        // Skip if text already contains parentheses
        if (linkText.includes("(") || linkText.includes(")")) {
            return;
        }

        // Escape double quotes
        linkText = linkText.replace(/"/g, "&quot;");

        link.setAttribute(
            "aria-label",
            linkText + " (opens in a new tab)"
        );

    });

}