/* =============================================================
FUNCTION isMobile()

- Returns true if viewport width is less than 650px
- used in several modules

=============================================================== */
export function isMobile() {
    return window.innerWidth < 650 ? true : false;
}
