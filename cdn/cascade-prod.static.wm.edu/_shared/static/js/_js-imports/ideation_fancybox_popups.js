/* =============================================================
FUNCTION ideation_fancybox_popups

- The Lightbox feature has quietly retired, but some older content 
  in A&S and VIMS still uses it 
  
- Looks for ideation-popup-link class attached to an a tag and inits
  an iframe fancybox on click
  
- iframe is sandboxed and only supports pages from same domain

=============================================================== */
export function ideation_fancybox_popups() {
    // add some custom css to the page
    var styles = `
        .fancybox__content {
            padding: .7rem;
            max-height: 90vh;
        }
        .fancybox__slide {
            padding: .7rem;
        }
    `;
    var styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    // add a nofollow and some data- attributes to the link
    $(".ideation-popup-link").each(function() {
        $(this).attr("rel","nofollow");
        $(this).attr("data-type","iframe");
        $(this).attr("data-width","800");
        $(this).attr("data-height","1200");
    })

    Fancybox.bind('.ideation-popup-link', {
        Html : {
          iframeAttr : {
            sandbox: "allow-scripts allow-same-origin"
          }
        }
    });
    
}
