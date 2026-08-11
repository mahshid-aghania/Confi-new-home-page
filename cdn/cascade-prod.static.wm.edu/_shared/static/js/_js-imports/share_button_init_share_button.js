const { runTests, addCheck } = await import('./_run_tests_var.js');

/* =============================================================
- FUNCTION: share_button_init_share_button()
- Create the "popper" and sharebar links
- this does not appear to be used anywhere but is an option on all page types

================================================================= */
export function share_button_init_share_button() {

    const share_button = document.querySelector('.m-share__button');
    const share_tooltip = document.querySelector('.m-share__tooltip');

    function createSharePopper() {
        var share_popperInstance = Popper.createPopper(share_button, share_tooltip, {
            placement: "right",
            modifiers: [
                { name: "offset", options: { offset: [0, 5], } },
                { name: "flip", options: { fallbackPlacements: ['bottom'], } }
            ],
        });
    }

    function toggleLinks() {
        if (share_tooltip.hasAttribute("data-show")) {
            share_tooltip.removeAttribute("data-show");
            share_button.setAttribute("aria-expanded", "false");
        } else {
            share_tooltip.setAttribute("data-show", "");
            share_button.setAttribute("aria-expanded", "true");
            createSharePopper();
        }
    }

    if (share_button) {
        share_button.addEventListener("click", toggleLinks);
        document.addEventListener(
            "click",
            function (event) {
                if (event.target.closest(".m-share__button") || event.target.closest(".m-share__tooltip")) return;
                if (share_tooltip.hasAttribute("data-show")) {
                    share_tooltip.removeAttribute("data-show");
                    share_button.setAttribute("aria-expanded", "false");
                }
            },
            true
        );

        // SET DOMAIN IN SHARE LINKS

        var currentSite = "$currentPageSiteName";
        if (currentSite == "vims.edu") {
            currentSite = "www.vims.edu";
        }
        const currentHost = location.hostname;
        if (currentHost == "cascadetst.wm.edu") {
            if (currentSite == "www.vims.edu") {
                currentSite = "test-vims.wm.edu";
            }
            else {
                currentSite = "test-" + currentSite;
            }
        }
        else if (currentHost == "cascadedev.wm.edu") {
            if (currentSite == "www.vims.edu") {
                currentSite = "dev-vims.wm.edu";
            }
            else {
                currentSite = "dev-" + currentSite;
            }
        }
        else {
            currentSite = currentHost;
        }

        const linkmatches = document.querySelectorAll(".m-share__li a");
        for (const shareLink of linkmatches) {
            var shareLinkHref = shareLink.href;
            shareLinkHref = shareLinkHref.replace("__MY_SITE_DOMAIN__", currentSite);
            shareLink.href = shareLinkHref;
        }
        
        if (runTests) {
            
            share_button.click();
            if (share_tooltip.hasAttribute("data-show") && share_button.getAttribute("aria-expanded") === "true") {
                addCheck('sharePopup');
            } else {
                console.log("Open test failed - share button");
                addCheck('sharePopup', false);
            }
                    
            share_button.click();
            if (!share_tooltip.hasAttribute("data-show") && share_button.getAttribute("aria-expanded") === "false") {
                addCheck('sharePopup');
            } else {
                console.log("CLose test failed - share button");
                addCheck('sharePopup', false);
            }
        }
    }


    // Since borrowed news.wm.edu stories pull the title from wordpress and do not have a title
    // in the page, we're using the og: metadata fields that we wrote on the page with php output buffering
    if (document.querySelector('.wp-post-content')) {

        var originalTitle = document.querySelector("meta[property='og:title']").getAttribute("content");

        // js encodes spaces to %20, velocity .url function (used lower in page) encodes spaces to +
        var encodedTitle = encodeURIComponent(originalTitle);
        var subject = encodedTitle.replaceAll("%20", " ");
        var subject2 = encodedTitle;

        $(".m-share__li a").each(function () {
            var link = $(this).attr("href");
            var link = link.replace(/title=/, "title=" + subject2); // LinkedIn
            var link = link.replace(/\?subject=/, "?subject=" + subject); // email
            var link = link.replace(/body=%0A/, "body=" + subject + "%0A"); //email, borrowed news.wm.edu
            var link = link.replace(/body=%20%0A/, "body=" + subject + "%0A"); //email, borrowed news.wm.edu
            var link = link.replace(/body= %0A/, "body=" + subject + "%0A"); //email, borrowed news.wm.edu
            var link = link.replace(/&t=/, "&t=" + subject); // Facebook
            var link = link.replace(/\?text=/, "?text=" + subject2); // Twitter

            $(this).attr("href", link);
        });
    }



}