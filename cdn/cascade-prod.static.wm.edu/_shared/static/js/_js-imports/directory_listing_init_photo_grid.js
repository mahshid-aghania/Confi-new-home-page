const { runTests, addCheck } = await import('./_run_tests_var.js');
import { isMobile } from './browser_get_viewport_width.js';
import { popups_disable_vertical_scroll } from './popups_disable_vertical_scroll.js';

/* =============================================================
FUNCTION directory_listing_init_photo_grid

- Uses Fancybox 2.1.5 to create popup
- on desktop, opens popup
- on mobile, navigates to page
- Used on "Listing Page - Directory with Photo Grid - Folder Order"

================================================================= */
export function directory_listing_init_photo_grid() {

	if ($(".wm_dir_entry_item").length > 0) {
		$(".wm_dir_entry_item .name_position").hide();
		$(".wm_dir_entry_item").hover(function () {
			$(this).find(".name_position").show();
		}, function () {
			$(this).find(".name_position").filter(":visible").hide();
		});
		$(".wm_dir_entry_item a").focus(function () {
			$(this).find(".name_position").show();
		});
		$(".wm_dir_entry_item a").blur(function () {
			$(this).find(".name_position").filter(":visible").hide();
		});
        
        $('.fancybox').click(function () {
		    if (!isMobile()) {
		        // hidden variable to hold scrollbar position
    			if (!$('#scrollbarposition').length) {
    				$('#main').append('<input type="hidden" id="scrollbarposition" value="0" />');
    			}
    			// hidden variable to hold event timestamp
    			if (!$('#mytstamp').length) {
    				$('#main').append('<input type="hidden" id="mytstamp" value="0" />');
    			}

                Fancybox.bind("[data-fancybox]", {
                    idle: false,
                    compact: false,
                    defaultType: "html",
                    mainClass: 'wm_dir_popup user_content',
                    width: "auto",
                });
		    } else {
		        let subPage = window.location.href;
				var url = window.location.href;
				var filename = url.substring(url.lastIndexOf('/') + 1);
				var subPath = url.replace(filename, "");
				subPath = subPath + $(this).attr("href").substring(1) + '.php';
				document.location = subPath;
		    }
		});
        
// 		$('.fancybox').click(function () {
// 		    if (!isMobile()) {
// 		        // hidden variable to hold scrollbar position
//     			if (!$('#scrollbarposition').length) {
//     				$('#main').append('<input type="hidden" id="scrollbarposition" value="0" />');
//     			}
//     			// hidden variable to hold event timestamp
//     			if (!$('#mytstamp').length) {
//     				$('#main').append('<input type="hidden" id="mytstamp" value="0" />');
//     			}

    // 			Fancybox.bind('[data-fancybox]', {
    // 				type: 'inline',
    // 				wrapCSS: 'wm_dir_popup user_content',
    // 				width: 680,
    // 				  Html: {
    //                     autoSize: false,
    //     				autoHeight: true,
    //     				autoResize: true,
    //                   },

    // 				afterClose: function () {
    // 					$(document).unbind("keydown", popups_disable_vertical_scroll);
    // 					$('#scrollbarposition').val('0');
    // 					$('.fancybox').unbind('click.fb-start');
    // 				}
    // 			});
// 		    } else {
// 		        let subPage = window.location.href;
// 				var url = window.location.href;
// 				var filename = url.substring(url.lastIndexOf('/') + 1);
// 				var subPath = url.replace(filename, "");
// 				subPath = subPath + $(this).attr("href").substring(1) + '.php';
// 				document.location = subPath;
// 		    }
// 		});
		
		let selectedProfile = getURLParam("profile");
		if (selectedProfile != "") {
			$("#" + selectedProfile + "_link").click();
		}

		let hoverChecked = false;
		if (runTests) {
			$(".wm_dir_entry_item").on("mouseenter", function () {
				if ($(this).find(".name_position").css("display", "block")) {
					if (!hoverChecked) {
						console.log("Test passed - name showing on hover event");
						addCheck('picHover');
						hoverChecked = true;
					}
				} else {
					console.log("Test failed - name not showing on hover event");
				}
			});
		}
	}
}

/* =============================================================
FUNCTION getURLParam()

- Get a URL parameter and return it

================================================================= */
function getURLParam(strParamName) {
	var strReturn = "";
	var strHref = window.location.href;
	if (strHref.indexOf("?") > -1) {
		var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
		var aQueryString = strQueryString.split("&");
		for (var iParam = 0; iParam < aQueryString.length; iParam++) {
			if (aQueryString[iParam].indexOf(strParamName + "=") > -1) {
				var aParam = aQueryString[iParam].split("=");
				strReturn = aParam[1];
				break;
			}
		}
	}
	return strReturn;
}
