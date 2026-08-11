var winWidth = window.innerWidth;
var wmSiteMenu = document.getElementById("wm-site-menu");


/* ====================================
Some Code to help correct anchor links when there is layout shift 
in the page template, usually due to dynamic fetched content loaded into the DOM
========================================== */
async function scrollToHash(el) {
    if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'instant' });
        }, 600);
    }
    //console.log("scrolled");
}
// Select elements
const infograms = document.querySelectorAll('.infogram-embed');
infograms.forEach((infogram) => {
    // Add the mutationObserver
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            // Ensure it's an actual Element node, not just whitespace text
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (window.location.hash) {
                    const targetElement = document.querySelector(window.location.hash);
                    if (targetElement) {
                        scrollToHash(targetElement);
                    }
                }
            }
          });
        }
      }
    });
    observer.observe(infogram, { childList: true, subtree: true });
});



//------------------------------------------ //
function viewport() {
  var e = window,
    a = "inner";
  if (!("innerWidth" in window)) {
    a = "client";
    e = document.documentElement || document.body;
  }
  return { width: e[a + "Width"], height: e[a + "Height"] };
}


// For old chosen selects- can remove once new one is published everywhere ~ March 1, 2026

document.addEventListener("DOMContentLoaded", function() {
  // Get a reference to the select element
  const selectElement = document.querySelector("select.departmentDropdownMenu");

  // Add the 'change' event listener
  if(selectElement) {
      selectElement.addEventListener("change", function(event) {
        // The selected value is available via event.target.value
        const selectedValue = event.target.value;
    
        if (selectedValue) {
          window.location.href = selectedValue; // Navigates to the URL
        }
      });
  }
});



// // ====================== BREADCRUMBS ============================== //

// document.addEventListener("DOMContentLoaded", function () {

//   // remove the 'no-js' class from html tag, add 'js'
//   const html_tag = document.querySelector('html');
//   html_tag.classList.remove('no-js');
//   html_tag.classList.add('js');

//   // BREADCRUMB POPPER
//   if (
//     document.querySelector(".m-breadcrumbs") &&
//     document.querySelector(".m-breadcrumbs").length != 0
//   ) {
//     // Make sure Popper is loaded
//     if (typeof Popper != "undefined") {
//       var mySelector = "main .m-breadcrumbs";
//       var breadLists = document.querySelectorAll(mySelector);

//       var breadlistNum = 0;
//       for (b=0; b<breadLists.length; b++) {
//         var thisBreadList = breadLists[b];  
//         var breadListItems = thisBreadList.getElementsByTagName("li");
//         var numBreadListItems = breadListItems.length;
//         if (numBreadListItems > 3) {
//           var newCollapsedLinks = document.createElement("div");
//           newCollapsedLinks.setAttribute("id", "collapsedlinks" + breadlistNum);
//           for (i = 1; i < numBreadListItems - 2; ++i) {
//             newCollapsedLinks.appendChild(breadListItems[1]); // as items are taken away, the "next" item remains index 1
//           }
//           newArrow = document.createElement("div");
//           newArrow.setAttribute("id", "bc_arrow" + breadlistNum);
//           newArrow.setAttribute("data-popper-arrow", "true");
//           newCollapsedLinks.appendChild(newArrow);

//           // ELLIPSE
//           var newListItem = document.createElement("li");
//           newListItem.setAttribute("class", "m-breadcrumbs__link");
//           newButton = document.createElement("button");
//           newButton.innerHTML = "&hellip;";
//           newButton.setAttribute("aria-expanded", "false");
//           newButton.setAttribute(
//             "aria-controls",
//             "collapsedlinks" + breadlistNum
//           );
//           newListItem.appendChild(newButton);
//           thisBreadList.insertBefore(newListItem, thisBreadList.children[1]);
//           thisBreadList.insertBefore(
//             document.createTextNode("\n"),
//             thisBreadList.children[2]
//           );
//           newListItem.appendChild(newCollapsedLinks);

//           // create the Popper
//           const button = thisBreadList.querySelector(
//             ".m-breadcrumbs__link button"
//           );
//           const tooltip = thisBreadList.querySelector(
//             "#collapsedlinks" + breadlistNum
//           );

//           let popperInstance = null;

//           function create() {
//             popperInstance = Popper.createPopper(button, tooltip, {
//               placement: "bottom-start",
//               modifiers: [
//                 { name: "offset", options: { offset: [-5, 20] } },
//                 {
//                   name: "flip",
//                   options: { behavior: ["top-start", "bottom-start"] },
//                 },
//               ],
//             });
//           }
//           function destroy() {
//             if (popperInstance) {
//               popperInstance.destroy();
//               popperInstance = null;
//             }
//           }
//           function toggleLinks() {
//             if (tooltip.hasAttribute("data-show")) {
//               tooltip.removeAttribute("data-show");
//               button.setAttribute("aria-expanded", "false");
//               destroy();
//             } else {
//               tooltip.setAttribute("data-show", "");
//               button.setAttribute("aria-expanded", "true");
//               create();
//             }
//           }
//           button.addEventListener("click", toggleLinks);
//           document.addEventListener(
//             "click",
//             function (event) {
//               if (event.target.closest(".m-breadcrumbs__link button")) return;
//               if (tooltip.hasAttribute("data-show")) {
//                 tooltip.removeAttribute("data-show");
//                 button.setAttribute("aria-expanded", "false");
//                 destroy();
//               }
//             },
//             true
//           );
//         } else if (numBreadListItems == 1) {
//           thisBreadList.style.display = "none";
//         }

//         breadlistNum++;
//       } // end loop multiple breadcrumb lists
//     }
//   }
// });




// ======================== WM.EDU MENUS =============================== //

document.addEventListener("DOMContentLoaded", function () {

  // check if there's a topbar. if so, do all the menu thangs
	if (document.querySelector(".wm-topbar")) {
  
    // VARIABLES

    // topbar
    var topBar = document.querySelector(".wm-topbar");
    // site menu button
    var menuBtn = document.querySelector(".wm-topbar .wm-js-site-menu-button");
    // background
    var menuBackdrop = document.querySelector(".menubackdrop-dark");
    // site menu
    var siteMenu = document.querySelector(".wm-site-menu");
    // close site menu button
    var closeSiteMenuBtn = document.querySelector(".wm-site-menu .wm-js-site-menu-button-close-x");
    // primary wrapper of site menu content
    var siteMenuPrimaryWrapper = document.querySelector(".wm-site-menu__primary-wrapper")[0];
  


    //------------------------------------------ //
    // function - openMenus 
    function openMenus(which, callback) {
      if (which == "site") {
        document.body.classList.add("menu-open");
      } 
  
      //  set body to not scroll when menus are open
      const body = document.body;
  
      if (!$("html").hasClass("modal-open")) {
        freezeBackground(true);
      }
      
      // callback function used for setting focus for keyboard tabbing
      callback();
      
    } // end: openMenus()
  
    //------------------------------------------ //
    // Callback function to set focus on search input that should be visble now.... 
    // (sometimes it doesn't work on first attempt, so using an interval to poll it)
    function focusSearchBox() {
      var winWidth = window.innerWidth;
      if (winWidth > 1023) {
        // put cursor in search box on desktop
        var input = document.getElementById("q");
        var counter = 20;
        var checkExist = setInterval(function () {
          counter--;
          if (input || counter === 0) {
            input.focus();
            input.style.outline = "none";
            clearInterval(checkExist);
          }
        }, 100);
      } else {
        var thisClose = document.querySelector(
          ".wm-site-menu .wm-js-site-menu-button-close-x"
        );
        if (thisClose) {
          var counter = 20;
          var checkExist = setInterval(function () {
            counter--;
            if (thisClose || counter === 0) {
              thisClose.focus();
              clearInterval(checkExist);
            }
          }, 100);
        }
      }
    }
  
    // open site menu - topbar button click
    menuBtn.onclick = function (e) {
      e.preventDefault();
      this.setAttribute("aria-expanded", "true");
      openMenus("site", focusSearchBox);
      return false;
    };
  
    // CLOSE MENUS

    // function - closeMenus
    //------------------------------------------ //
    function closeMenus(which) {
  
      if (which == "all") {
        // close any expanded menu item, otherwise it is sticking around in keyboard tabbing even though the menus are visibility:hidden :(
        var expandedMenuButton = document.querySelector(
          '.primary-nav__togglesubmenu[aria-expanded="true"]'
        );
        if (expandedMenuButton) {
          expandedMenuButton.click();
        }
        
        if(document.body.classList.contains("menu-open")) {
            // set focus to the topbar toggle menu button
            menuBtn.focus();
            document.body.classList.remove("menu-open");
        }
        
      } 
      else if (which == "site") {
        document.body.classList.remove("menu-open");
      } 
  
      // reset menu scroll to top
      siteMenu.scrollTop = 0;
  
      // set scroll position of page to what it was before menu open
      const body = document.body;
  
      freezeBackground(false);
  
      // close open accordian
      const buttons = document.querySelectorAll(
        ".primary-nav .wm-js-togglesubmenu"
      );
  
      for (var b=0; b < buttons.length; b++) {
        buttons[b].setAttribute("aria-expanded", "false");
        buttons[b].nextElementSibling.setAttribute("aria-hidden", "true");
      }
    }
  
    // close menus - 'Esc' key close global and info for menus
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        menuBtn.setAttribute("aria-expanded", "false");
        closeMenus('all');
      }
    };
  
    // close menus - menubackdrop-dark click
    menuBackdrop.onclick = function (event) {
      menuBtn.setAttribute("aria-expanded", "false");
      closeMenus('all');
    };
  
    // close menus - close site menu button click
    closeSiteMenuBtn.onclick = function (e) {
      e.preventDefault();
      menuBtn.setAttribute("aria-expanded", "false");
      closeMenus("site");
      return false;
    };
  
    // function to make background not scroll when menus are open
    let previousScrollY = 0;
    //------------------------------------------ //
    function freezeBackground(freeze) {
      if (freeze) {
        previousScrollY = window.scrollY;
        var broadcastBarHeight;
        $("broadcastBarTop")
          ? (broadcastBarHeight = $("broadcastBarTop").outerHeight())
          : (broadcastBarHeight = 0);
        var topbarHeight = $(".wm-topbar").outerHeight();
        var topbarY = $(".wm-topbar").offset();
        topbarY = topbarY.top;
  
        if (previousScrollY == 0) {
          contentOffset = topbarHeight + broadcastBarHeight;
        } else {
          contentOffset = topbarHeight;
        }
  
        var scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;
          
        var homelogo = document.querySelector(".m-desktoplogo");
  
        $("html").addClass("modal-open").css({
          marginTop: -previousScrollY,
          overflow: "hidden",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: "fixed",
        });
        $(".wm-topbar").css({
          position: "absolute",
          top: topbarY,
          paddingRight: scrollbarWidth,
        });
        $("body").css({
          paddingRight: scrollbarWidth,
        });
        $("#main-header").css({
          marginTop: contentOffset,
        });
        
      } else {
        $("html").removeClass("modal-open").css({
          marginTop: 0,
          overflow: "visible",
          left: "auto",
          right: "auto",
          top: "auto",
          bottom: "auto",
          position: "static",
        });
        $(".wm-topbar").css({
          position: "",
          top: 0,
          paddingRight: 0,
        });
        $("body").css({
          paddingRight: 0,
        });
        $("#main-header").css({
          marginTop: 0,
        });
        if(previousScrollY && previousScrollY > 0) {
            window.scrollTo({
              top: previousScrollY,
              behavior: 'instant'
            });
            previousScrollY = 0;
        }
      }
    }
  
    // PRIMARY NAV ACCORDION SUBMENU

    var accordion = $("body").find('[data-behavior="accordion"]');
    var expandedClass = "is-expanded";
    $.each(accordion, function () {
      // loop through all accordions on the page
  
      var accordionItems = $(this).find('[data-binding="expand-accordion-item"]');
  
      $.each(accordionItems, function () {
        // loop through all accordion items of each accordion
        var $this = $(this);
        var triggerBtn = $this.find('[data-binding="expand-accordion-trigger"]');
  
        var setHeight = function (nV) {
          // set height of inner content for smooth animation
          var innerContent = nV.find(".accordion__content-inner")[0],
            maxHeight = $(innerContent).outerHeight(),
            content = nV.find(".accordion__content")[0];
  
          if (!content.style.height || content.style.height === "0px") {
            $(content).css("height", maxHeight);
          } else {
            $(content).css("height", "0px");
          }
        };
  
        var toggleClasses = function (event) {
          var clickedItem = event.currentTarget;
          var currentItem = $(clickedItem).parent();
          var clickedContent = $(currentItem).find(".accordion__content");
          var currentItemIsExpanded = currentItem.hasClass("is-expanded");
  
          $(".accordion__item").removeClass(expandedClass);
          $(".accordion__title").attr("aria-selected", "false");
          $(".accordion__title").attr("aria-expanded", "false");
          $(".accordion__content").attr("aria-hidden", "true");
          $(".accordion__content").css("height", "0px");
  
          if (!currentItemIsExpanded) {
            $(currentItem).toggleClass(expandedClass);
            setHeight(currentItem);
            $(clickedItem).attr("aria-selected", "true");
            $(clickedItem).attr("aria-expanded", "true");
            $(clickedContent).attr("aria-hidden", "false");
          } else {
            $(clickedItem).attr("aria-selected", "false");
            $(clickedItem).attr("aria-expanded", "false");
            $(clickedContent).attr("aria-hidden", "true");
          }
        };
  
        triggerBtn.on("click", event, function (e) {
          e.preventDefault();
          toggleClasses(event);
        });
  
        // open tabs if the spacebar or enter button is clicked whilst they are in focus
        $(triggerBtn).on("keydown", event, function (e) {
          if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
            toggleClasses(event);
          }
        });
      }); // end .each accordion items
    }); // end .each accordion
  
    // SEARCH SUGGESTIONS

    var search_box = document.querySelector("input#q");
    var common_area = document.querySelector(".wm-search__common-searches");
    var common_items = document.querySelector(".wm-search__common-searches .items");
    var suggestion_area = document.querySelector(".wm-search__suggested-results");
    var suggested_items = document.querySelector(".wm-search__suggested-results .items");
    var search_caption = document.querySelectorAll(".wm-search__caption");
  
    showCommonSearches();
    hideSuggestionArea();
  
    search_box.addEventListener("input", showSuggestions);
  
    //------------------------------------------ //
    function hideSuggestionArea() {
      suggestion_area.classList.add("hidden");
    }
  
    //------------------------------------------ //
    function showSuggestionArea() {
      search_box.classList.add("active");
      suggestion_area.classList.remove("hidden");
    }
  
    //------------------------------------------ //
    function hideCommonArea() {
      common_area.classList.add("hidden");
    }
  
    //------------------------------------------ //
    function showCommonArea() {
      common_area.classList.remove("hidden");
      search_caption[0].classList.remove("highlight");
    }
  
    //------------------------------------------ //
    function showCommonSearches() {
      // only try ajax if on www, test-www or dev-www
      if (window.location.href.indexOf("www.wm.edu") > -1) {
          xhr = new XMLHttpRequest();
          // the function that runs on return...
          xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              var myArr = JSON.parse(this.responseText);
              formatCommonSearches(myArr);
            }
          };
          var common_address = "/atoz/common_searches_json.php";
          xhr.open("GET", common_address, true);
          xhr.send();
      }
    }
  
    //------------------------------------------ //
    function formatCommonSearches(arr) {
      var out = "";
      // loop data items
      for (i = 0; i < arr.length; i++) {
        // fix the internal links...
        reone = /^(http|\/\/)/i;
        retwo = /(\.[a-zA-Z]+|\/)$/i;
        var comp = arr[i].url;
        if (!comp.match(reone) && !comp.match(retwo)) {
          arr[i].url = comp + ".php";
        }
        out += '<li><a href="' + arr[i].url + '">' + arr[i].display + "</a></li>";
      }
      common_items.innerHTML = out;
    }
  
    //------------------------------------------ //
    function showSuggestions(e) {
      var value = e.target.value;
      if (value.length < 3) {
        suggested_items.innerHTML = "";
        hideSuggestionArea();
        showCommonArea();
        search_box.classList.remove("active");
        search_caption[0].classList.remove("active");
        return false;
      } else {
        hideCommonArea();
        search_box.classList.add("active");
        search_caption[0].classList.add("active");
        // only try ajax if on www, test-www or dev-www
        if (window.location.href.indexOf("www.wm.edu") > -1) {
            xhr = new XMLHttpRequest();
            // the function that runs on return...
            xhr.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                formatSuggestions(myArr, value);
              }
            };
            var suggestions_address = "/atoz/suggestions_json.php";
            xhr.open("GET", suggestions_address, true);
            xhr.send();
        }
      }
    }
  
    //------------------------------------------ //
    function formatSuggestions(arr, str) {
      showSuggestionArea();
      // alpha sort the arr
      arr.sort(function (a, b) {
        return a.display < b.display ? -1 : a.display > b.display ? 1 : 0;
      });
  
      var out = "";
      // convert str to array (search terms)
      var terms = str.split(" ");
  
      // loop data items
      for (i = 0; i < arr.length; i++) {
        var matches_all_terms = 0;
        // loop search terms
        for (t = 0; t < terms.length; t++) {
          if (terms[t].length > 2) {
            // if display contains the term add to output
            var re = new RegExp(terms[t], "gi");
            var disp = arr[i].display;
            if (disp.match(re)) {
              matches_all_terms = 1;
            } else {
              matches_all_terms = 0;
              break;
            }
          }
        }
        if (matches_all_terms == 1) {
          // fix the internal links...
          reone = /^(http|\/\/)/i;
          retwo = /(\.[a-zA-Z]+|\/)$/i;
          var comp = arr[i].url;
          if (!comp.match(reone) && !comp.match(retwo)) {
            arr[i].url = comp + ".php";
          }
          out +=
            '<li><a href="' + arr[i].url + '">' + arr[i].display + "</a></li>";
        }
      }
      if (out == "") {
        search_caption[0].classList.add("highlight");
        hideSuggestionArea();
        //out = "Hit enter to search all of wm.edu";
      }
      suggested_items.innerHTML = out;
    }

  } // end: if .wm-topbar
  
    // Bulletproof Focus trap in W&M Menu
    if (wmSiteMenu) {
        let firstFocusableEl = null;
        let lastFocusableEl = null;
        let resizeTimeout;
        let mutationObserver;
    
        let lastFocusedLinkInfo = null; // Captures the href of the last focused link
    
        // Visibility check
        function isTrulyVisible(el) {
            const style = window.getComputedStyle(el);
            return !(
                style.display === 'none' ||
                style.visibility === 'hidden' ||
                style.opacity === '0' ||
                el.offsetParent === null ||
                !el.getClientRects().length
            );
        }
    
        // Grabs all the focusable elements inside the container
        // Excludes disabled elements and hidden elements (via the isTrulyVisible function)
        // Returns only the elements that are focusable and visible
        function getFocusableElements(container) {
            const all = container.querySelectorAll(
                'a[href]:not([disabled]):not([hidden]), button:not([disabled]):not([hidden]), textarea:not([disabled]):not([hidden]), input:not([disabled]):not([hidden]), select:not([disabled]):not([hidden])'
            );
            return Array.from(all).filter(el => !el.disabled && isTrulyVisible(el));
        }
        
        // Unbinds old event listeners
        // Removes any existing event listeners on the first and last focusable elements
        function unbindFocusTrap() {
            if (firstFocusableEl) firstFocusableEl.removeEventListener('keydown', handleFirst);
            if (lastFocusableEl) lastFocusableEl.removeEventListener('keydown', handleLast);
        }
        
        // Grabs all focusable elements in the container and assigns the first and last focusable elements
        // If no focusable elements are found, it returns early to avoid errors
        function bindFocusTrap(container) {
            const focusableEls = getFocusableElements(container);
            if (focusableEls.length === 0) return;
    
            firstFocusableEl = focusableEls[0];
            lastFocusableEl = focusableEls[focusableEls.length - 1];
    
            // Check if the currently focused element is valid, otherwise jump to the last focused link
            const active = document.activeElement;
            const stillValid = focusableEls.includes(active);
    
            if (!stillValid && lastFocusedLinkInfo) {
                // Try to find the last focused link by href
                const match = focusableEls.find(el =>
                    el.tagName === 'A' &&
                    el.getAttribute('href')?.replace(/\/+$/, '') === lastFocusedLinkInfo.href.replace(/\/+$/, '')
                );
    
                if (match) {
                    match.focus(); // Focus the link that was last focused before resize
                } else {
                    firstFocusableEl.focus(); // Default to the first element
                }
    
                lastFocusedLinkInfo = null; // Reset after restoring focus
            }
    
            firstFocusableEl.addEventListener('keydown', handleFirst);
            lastFocusableEl.addEventListener('keydown', handleLast);
        }
    
        // Focus Trap Logic (First and Last Elements)
        function handleFirst(e) {
            if (e.key === 'Tab' && e.shiftKey) {
                e.preventDefault();
                lastFocusableEl?.focus();
            }
        }
    
        function handleLast(e) {
            if (e.key === 'Tab' && !e.shiftKey) {
                e.preventDefault();
                firstFocusableEl?.focus();
            }
        }
    
        // Resets and re-applies the focus trap logic to esnure the focus management remains intact,
        // keeping it in line with any DOM changes that may have occured, like when the layout switches
        // between mobile and desktop views or when elements are added/removed dynamically
        function refreshFocusTrap() {
            unbindFocusTrap(); // remove any previously set event listeners or handlers related to the focus trap
            bindFocusTrap(wmSiteMenu); // rebind the focus trap to the wmSiteMenu element
        }
    
        // Captures focused element before performing any resize logic
        // Stores the currently focused link and its href in lastFocusedLinkInfo
        // 'A' is an anchor tag
        function captureFocusedElement() {
            const active = document.activeElement;
            if (active?.tagName === 'A' && active?.href) {
                lastFocusedLinkInfo = {
                    href: active.getAttribute('href')
                };
            } else {
                lastFocusedLinkInfo = null;
            }
        }
    
        // Captures the focused element before resize to ensure we can restore it
        window.addEventListener('resize', () => {
            captureFocusedElement();
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                refreshFocusTrap();
            }, 400);
        });
    
        // Watches for changes to the DOM inside wmSiteMenu.
        // If changes are detected, it calls refreshFocusTrap() to ensure the focus trap remains accurate
        mutationObserver = new MutationObserver(() => {
            refreshFocusTrap(); // Reapply focus trap when DOM changes
        });
    
        mutationObserver.observe(wmSiteMenu, {
            attributes: true,
            childList: true,
            subtree: true
        });
    
        refreshFocusTrap(); // Initial run
    }

}); // end: DOMContentLoaded listener