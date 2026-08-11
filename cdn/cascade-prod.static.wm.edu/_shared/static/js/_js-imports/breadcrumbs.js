/* =============================================================
FUNCTION breadcrumb_popper

- Breadcrumb popper is basically a tooltip and the code collapses the middle section of breacrumb links into a "popper."

================================================================= */

export function breadcrumb_popper() {
  const html_tag = document.querySelector('html');
  html_tag.classList.remove('no-js');
  html_tag.classList.add('js');

  const breadLists = document.querySelectorAll(".m-breadcrumbs");
  if (!breadLists.length || typeof Popper === "undefined") return;

  breadLists.forEach((thisBreadList, breadlistNum) => {
    //const breadListItems = thisBreadList.getElementsByTagName("div");
    const breadListItems = thisBreadList.querySelectorAll('.m-breadcrumbs__link');
    const numBreadListItems = breadListItems.length;

    if (numBreadListItems > 3) {
      const newCollapsedLinks = document.createElement("div");
      newCollapsedLinks.setAttribute("id", "collapsedlinks" + breadlistNum);

      for (let i = 1; i < numBreadListItems - 2; ++i) {
        newCollapsedLinks.appendChild(breadListItems[i]);
      }

      const newArrow = document.createElement("div");
      newArrow.setAttribute("id", "bc_arrow" + breadlistNum);
      newArrow.setAttribute("data-popper-arrow", "true");
      newCollapsedLinks.appendChild(newArrow);

      const newListItem = document.createElement("div");
      newListItem.className = "m-breadcrumbs__link";

      const newButton = document.createElement("button");
      newButton.innerHTML = "&hellip;";
      newButton.setAttribute("aria-expanded", "false");
      newButton.setAttribute("aria-controls", "collapsedlinks" + breadlistNum);

      newListItem.appendChild(newButton);
      thisBreadList.insertBefore(newListItem, thisBreadList.children[1]);
      thisBreadList.insertBefore(document.createTextNode("\n"), thisBreadList.children[2]);
      newListItem.appendChild(newCollapsedLinks);

      const button = newButton;
      const tooltip = newCollapsedLinks;

      let popperInstance = null;

      function createPopperInstance() {
        popperInstance = Popper.createPopper(button, tooltip, {
          placement: "bottom-start",
          modifiers: [
            { name: "offset", options: { offset: [-5, 20] } },
            {
              name: "flip",
              options: { fallbackPlacements: ["top-start", "bottom-start"] },
            },
          ],
        });
      }

      function destroyPopperInstance() {
        if (popperInstance) {
          popperInstance.destroy();
          popperInstance = null;
        }
      }

      function toggleLinks() {
        const isVisible = tooltip.hasAttribute("data-show");
        if (isVisible) {
          tooltip.removeAttribute("data-show");
          button.setAttribute("aria-expanded", "false");
          destroyPopperInstance();
        } else {
          tooltip.setAttribute("data-show", "");
          button.setAttribute("aria-expanded", "true");
          createPopperInstance();
        }
      }

      button.addEventListener("click", toggleLinks);


        document.onkeydown = function (evt) {
          evt = evt || window.event;
          if (evt.keyCode == 27) {
              tooltip.removeAttribute("data-show");
              button.setAttribute("aria-expanded", "false");
              destroyPopperInstance();
          }
        };

      document.addEventListener("click", (event) => {
        if (event.target.closest(".m-breadcrumbs__link button") || newCollapsedLinks.contains(event.target)) return;
        if (tooltip.hasAttribute("data-show")) {
          tooltip.removeAttribute("data-show");
          button.setAttribute("aria-expanded", "false");
          destroyPopperInstance();
        }
      }, true);
    } else if (numBreadListItems === 1) {
      thisBreadList.style.display = "none";
    }
  });
}