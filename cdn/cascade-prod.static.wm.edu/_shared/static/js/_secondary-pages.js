/*
FUNCTIONS IN THIS FILE
imported
- as_department_dropdown_init_dropdown - W&M only
- banner_fix_mobile_vh_bug
- directory_listing_init_photo_grid
- images_add_caption
- news_listings_load_wp_stories
- page_nav_adjust_height
- page_nav_hide_empty_extra_divs
- page_nav_remove_mobile_nav_if_empty
- page_nav_toggle_mobile_nav
- people_page_darken_banner_on_scroll - W&M only
- photoset_slideshow_init_slideshow
- photoset_slideshow_adjust_height
- share_button_init_share_button
- sidebar_hide_if_two_columns
- sidebar_widget_slideshow_init_bxslider
- tables_apply_collapsible_style
- tables_create_scrollable_tables
- tables_set_even_columns
- tables_set_resizable
- text_make_long_links_wrap
- topbar_search_toggle - Law & VIMS only
- atoz_nav

in-file
- run functions on resize
*/

// JS modules get parsed after the page has loaded so no need for DOMContentLoaded check

// These functions are loaded as-needed into the page using conditional dynamic imports
// For more information, see link at bottom of file.

// this array holds functions that run on resize
let resizeFunctions = [];

let isMobile =  window.innerWidth < 650 ? true : false;

// page nav functions
if (document.querySelector('.page_nav')) {
    const { page_nav_adjust_height } = await import('./_js-imports/page_nav_adjust_height.js');
    const { page_nav_hide_empty_extra_divs } = await import('./_js-imports/page_nav_hide_empty_extra_divs.js');
    const { page_nav_adjust_social_icons } = await import('./_js-imports/page_nav_adjust_social_icons.js');
    const { page_nav_remove_mobile_nav_if_empty } = await import('./_js-imports/page_nav_remove_mobile_nav_if_empty.js');
    const { page_nav_toggle_mobile_nav } = await import('./_js-imports/page_nav_toggle_mobile_nav.js');
    page_nav_adjust_height();
    page_nav_hide_empty_extra_divs();
    page_nav_adjust_social_icons();
    page_nav_remove_mobile_nav_if_empty();
    page_nav_toggle_mobile_nav();

    resizeFunctions.push(page_nav_adjust_height);

}

// hide sidebar if needed
if ($('input:hidden[name="hasSidebar"]').val() == "N") {
    const { sidebar_hide_if_two_columns } = await import('./_js-imports/sidebar_hide_if_two_columns.js');
    sidebar_hide_if_two_columns();
}

// // sidebar widget bxslider slideshow functions
if ($(".bxslider-widget").length > 0) {
    const { sidebar_widget_slideshow_init_bxslider } = await import('./_js-imports/sidebar_widget_slideshow_init_bxslider.js');
    sidebar_widget_slideshow_init_bxslider();
}

// // sidebar widget swiper slideshow functions
if ($(".rotating-widget").length > 0) {
    const { sidebar_widget_slideshow_init_swiper } = await import('./_js-imports/sidebar_widget_slideshow_init_swiper.js');
    sidebar_widget_slideshow_init_swiper();
}

// Image click proxies (widgets, directory, news, features)
if (
    document.querySelector('.js-widget-image') ||
    document.querySelector('.js-directory-image') ||
    document.querySelector('.js-news-image') ||
    document.querySelector('.js-as-image') ||
    document.querySelector('.js-feature-image')
) {
    const { init_image_click_proxies } = await import('./_js-imports/init_image_click_proxies.js');
    init_image_click_proxies();
}

// new tab aria-label accessibility enhancement
if (document.querySelector('a[target="_blank"]')) {
    const { new_tab_aria_label } = await import('./_js-imports/new_tab_aria_label.js');
    new_tab_aria_label();
}

// file link aria-label accessibility enhancement
if (document.querySelector('a[href]')) {
    const { init_filetype_aria_labels } = await import('./_js-imports/init_filetype_aria_labels.js');
    init_filetype_aria_labels();
}

// // table functions
if (document.querySelector('.user_content table') || document.querySelector('.user_content_styles table')) {
    const { tables_create_scrollable_tables } = await import('./_js-imports/tables_create_scrollable_tables.js');
    const { tables_apply_collapsible_style } = await import('./_js-imports/tables_apply_collapsible_style.js?v=03102025');
    const { tables_set_even_columns } = await import('./_js-imports/tables_set_even_columns.js');
    const { tables_set_resizable } = await import('./_js-imports/tables_set_resizable.js');
    tables_create_scrollable_tables();
    tables_apply_collapsible_style();
    tables_set_even_columns();
    tables_set_resizable();
}

// add image captions
if ($("img[class$=caption]").length > 0) {
    const { images_add_caption } = await import('./_js-imports/images_add_caption.js');
    images_add_caption();
}
// update vh on banner on mobile to fix ios bug
if (document.querySelector(".m-header.-tall") &&
    document.querySelector("html").classList.contains("touch")) {
    const { banner_fix_mobile_vh_bug } = await import('./_js-imports/banner_fix_mobile_vh_bug.js');
    banner_fix_mobile_vh_bug();
}

// init share button
if (document.querySelector('.m-share__button')) {
    const { share_button_init_share_button } = await import('./_js-imports/share_button_init_share_button.js');
    share_button_init_share_button();
}

// apply class to text break long urls
const { text_make_long_links_wrap } = await import('./_js-imports/text_make_long_links_wrap.js');
text_make_long_links_wrap();

// photoset functions
if ($('#wm-photoset').length > 0) {
    const { photoset_slideshow_init_slideshow,
        photoset_slideshow_adjust_height } = await import('./_js-imports/photoset_slideshow_init_slideshow.js');
    photoset_slideshow_init_slideshow();
    photoset_slideshow_adjust_height();

    resizeFunctions.push(photoset_slideshow_adjust_height);
}

// //photoset swiper slideshow functions
if ($("#wm-photoset").length > 0) {
    const { photoset_slideshow_init_swiper } = await import('./_js-imports/photoset_slideshow_init_swiper.js');
    photoset_slideshow_init_swiper();
}

// News Listing pages load WP stories
if (document.querySelector("*[data-wpsrc^='http']")) {
    const { news_listings_load_wp_stories } = await import('./_js-imports/news_listings_load_wp_stories.js');
    news_listings_load_wp_stories();
}

// Directory listing photo grid styles and popup
if ($(".wm_dir_entry_item").length > 0) {
    const { directory_listing_init_photo_grid } = await import('./_js-imports/directory_listing_init_photo_grid.js');
    directory_listing_init_photo_grid();
    resizeFunctions.push(directory_listing_init_photo_grid);
}

// On AtoZ pages, creates a <select> out of the letter menu's <ul> to be used for mobile
if ($("#atoz_ul").length > 0) {
    const { atoz_nav } = await import('./_js-imports/atoz_nav.js');
    atoz_nav();
}

// SITE SPECIFIC ===================================================
// WM.EDU =========================================================
// A&S Department Dropdown
// if (document.querySelector(".departmentDropdownMenu")) {
//     const { as_department_dropdown_init_dropdown } = await import('./_js-imports/as_department_dropdown_init_dropdown.js');
//     as_department_dropdown_init_dropdown();
// }

if (document.querySelector(".menu-button-links")) {
    const { menu_button_links } = await import('./_js-imports/menu_button_links.js');
    menu_button_links();
}

// People pages darken banner on scroll
if (document.querySelector('.m-header.-tall.-text-bl .m-header__photo')) {
    const { people_pages_darken_banner_on_scroll } = await import('./_js-imports/people_pages_darken_banner_on_scroll.js');
    people_pages_darken_banner_on_scroll();
}


// WM.EDU AND VIMS ========================================
// Ideation fancybox popups (deprecated but still in use on a few older content pages)
if ($(".ideation-popup-link").length > 0) {
    const { ideation_fancybox_popups } = await import('./_js-imports/ideation_fancybox_popups.js');
    ideation_fancybox_popups();
}
    

// LAW & VIMS =====================================================

// toggle top bar search
if ($("#search_site").length > 0) {
    const { topbar_search_toggle } = await import('./_js-imports/topbar_search_toggle.js');
    topbar_search_toggle();
}

// BREADCRUMBS
if (document.querySelector(".m-breadcrumbs")) {
  const { breadcrumb_popper } = await import('./_js-imports/breadcrumbs.js');
  breadcrumb_popper();
}

// RUN FUNCTIONS ON PAGE RESIZE ===============================================
function updateOnResize() {
    resizeFunctions.forEach(function (fn) {
        fn();
    });
}

let resizeTimer;
window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        updateOnResize();
    }, 100);
});



// // These functions are loaded as-needed into the page using conditional dynamic imports
// // Dynamic imports: https://javascript.plainenglish.io/javascript-dynamically-importing-modules-94e1b88c420