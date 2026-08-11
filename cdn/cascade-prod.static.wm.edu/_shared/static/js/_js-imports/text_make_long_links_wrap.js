const { runTests, addCheck } = await import('./_run_tests_var.js');
/* =============================================================
FUNCTION text_make_long_links_wrap()

- Find links with long url text and allow to break

================================================================= */

export function text_make_long_links_wrap() {
    var all_links = document.querySelectorAll("#content a");
    for (let i = 0; i < all_links.length; i++) {
        const link = all_links[i];
        if (link.text.match("http://") != null || link.text.match("https://") != null) {
            link.classList.add("long-url");
        }
    }
    
    // run tests
    if (runTests) {
    // Check if any long links don't have the class
      
      for(var i = 0; i < all_links.length; i++) {
        var link = all_links[i];
        if((link.text.includes("http://") || link.text.includes("https://")) && !link.classList.contains("long-url")) {
          console.log("Test failed on link: " + link.href);
          addCheck('longUrls', false);
        } else if((link.text.includes("http://") || link.text.includes("https://")) && link.classList.contains("long-url")) {
            addCheck('longUrls');
        }
      }
     
    }
}