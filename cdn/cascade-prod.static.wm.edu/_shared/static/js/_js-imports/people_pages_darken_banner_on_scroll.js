/*
EXPORTED FROM THIS FILE:

- people_pages_darken_banner_on_scroll()

not exported
- onScroll()
- requestTick()
- fadeOnScroll()

 */

const TALL_BANNER = document.querySelector(".m-header.-tall");
const TALL_BANNER_PHOTO = document.querySelector(".m-header.-tall .m-header__photo");

/* =============================================================
FUNCTION people_pages_darken_banner_on_scroll()

    - On people pages, darken banner image on scroll

    ================================================================= */

// wait until image is loaded before adding black background
// otherwise it's just a big black rectangle while waiting for the image to load.
// Because it's a background image  we need to load the image in a
// js placeholder image so the load event can fire
export function people_pages_darken_banner_on_scroll() {

   // TODO: test tall banner constants
   if (document.querySelector(".m-header.-tall.-text-bl .m-header__photo")) {
      var imgUrlSrc = TALL_BANNER_PHOTO.style.backgroundImage;
      var imgUrl = imgUrlSrc.match(/\((.*?)\)/)[1].replace(/('|")/g, '');

      let placeholderImg = document.createElement("img");

      placeholderImg.addEventListener('load', (e) => {
         TALL_BANNER.style.backgroundColor = "black";
         // Listen for scroll events and call function that calls function lol
         window.addEventListener('scroll', onScroll, false);

         placeholderImg = null;
      });

      placeholderImg.src = imgUrl;
   }
}
/* =============================================================

   - This animation performance optimization using requestAnimationFrame is based on
   - https://www.html5rocks.com/en/tutorials/speed/animations/

   ================================================================= */


//Set base variables for scroll event ================================================================= */
var lastScrollY = 0,
   ticking = false;

/* =============================================================
FUNCTION onScroll()

- onScroll() function keeps track of scroll value
- called by scroll event listener down below
- requestTick runs on scroll which calls update function

================================================================= */
function onScroll() {
   lastScrollY = window.scrollY;
   requestTick();
}

/* =============================================================
FUNCTION requestTick()

- requestTick() function calls rAF (which calls our update function) if it's not already been done

================================================================= */
function requestTick() {
   if (!ticking) {
      requestAnimationFrame(fadeOnScroll);
      ticking = true;
   }
}

/* =============================================================
FUNCTION fadeOnScroll()

- Reduce opacity of an element based on scroll height and start height
best used for small areas of the screen due to performance issues
- @param {string} el
- @param {number} fulltransparencyHeight
- @param {number} maxblur in pixels
- @return {void} Nothing

================================================================= */
function fadeOnScroll() {
   var currentScroll = lastScrollY,
      maxtransparency = .3,
      fulltransparencyHeight = 900;
      let opacity = maxtransparency;
   if (currentScroll <= fulltransparencyHeight && (1 - currentScroll / fulltransparencyHeight) > maxtransparency) {
      opacity = 1 - currentScroll / fulltransparencyHeight;
   } 
   TALL_BANNER_PHOTO.style.opacity = opacity;

   // allow further rAFs to be called
   ticking = false;
}

