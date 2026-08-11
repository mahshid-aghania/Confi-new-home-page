/* =============================================================
FUNCTION popups_disable_vertical_scroll()

- disable the keyboard up/down arrows and pageup/pagedown
- used in fancybox popups
    - directory listing photo grid
    - reslife popups

================================================================= */
export function popups_disable_vertical_scroll(e) {
    let vertscroll_ar = new Array(40, 38, 34, 33);
    if ($.inArray(e.keyCode, vertscroll_ar) >= 0) {
        e.preventDefault();
    }
};
