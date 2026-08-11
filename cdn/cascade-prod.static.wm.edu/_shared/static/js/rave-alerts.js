///////////////////////////////////////////////////////////////////////////////
//
// GET RAVE (TRIBE) ALERTS
//
// IMPORTANT! ANYTIME THIS FILE IS UPDATED:
//
//   1. PUBLISH
//
//   2. INVALIDATE SERVER CACHE
//
//   3. UPDATE THE FORMAT THAT INCLUDES THIS SCRIPT WITH A NEW CACHE-BUSTING
//      QUERY STRING, I.E. ?v=1.3 AND PUBLISH THE PAGES USING THE FORMAT
//
///////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {


    //----------------------------------
    // BLOCK THESE IDS:
    // In case an alert was sent and dispatch does not want it in the event history
    // make sure to add double quotes around the identifier(s) 
    //
    // Example:
    // const blockedAlertIds = ["IDENTIFIER", "IDENTIFIER"]
    //----------------------------------
    const blockedAlertIds = []; 


    //-------------------------------------------
    // GLOBAL VARS:
    // can be edited for testing
    //
    // PROD: https://static.wm.edu/cap/v1/alert_history.json 
    // TEST: https://static.wm.edu/cap/test/alert_history.json
    // 
    // Examples:
    // https://cascade-dev.static.wm.edu/_shared/static/json/test_alert_history_moderate.json
    // https://cascade-dev.static.wm.edu/_shared/static/json/test_alert_history_extreme.json
    //
    //-------------------------------------------

    const myRequest = new Request("https://static.wm.edu/cap/v1/alert_history.json"); 
 
    const alertPage = "https://www.wm.edu/alert/";
    
    
    //----------------------------------
    // FUNCTION: LoadAlerts
    //----------------------------------
    async function loadAlerts(forPage) {

        let responseJson;

        // FETCH THE JSON
        try {
            const response = await fetch(myRequest, {cache: "no-store"});
            responseJson = await response.json(); // new JSONArray(response); // await response.json();
        } catch (error) { 
            console.log('There was an error', error.message);
        }
        
        // FIGURE OUT WHAT PAGE WE'RE ON
        var thisRavePage = "";
        if(document.querySelector("#emt-homepage-box")) {
            thisRavePage = "emt";
        }
        else if (document.querySelector("#rave_announcement")) {
            thisRavePage = "wmalert";
        }
        else if (/^news/.test(window.location.host)) {
            thisRavePage = "wmnews";
        }
        else if (document.querySelector("body.mywm")) {
            thisRavePage = "mywm";
        }
        else if (document.querySelector("body.wmhome")) {
            thisRavePage = "wmhome";
        }
        else {
            thisRavePage = "unknown";
        }
        //console.log(thisRavePage);
        
        let headlineOutput = ""; 
        let listOutput = "";
        let eventSeverity = ""; // only set in loop if value == "" (we want the latest )
        
        if(responseJson && responseJson.length > 0) {
            
            // UTILITY VARIABLES
            // for date reformatting while in loop
            var sent_timestamp = "";
            var sent_date = "";
            var sent_date_locale = "";
            var sent_date_locale_clean = "";
            var locale_options = {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit"};  
            
            // optional content depending on page we're running on
            var toggleButtonOutput = "";
            var descriptionOutput = "";
            var newDescriptionOutput = "";
            
            var barText = "Tribe Alert";
            var headingNum = "";
            var paras = [];

            //----------------------------------
            // LOOP: Loop the json alerts
            //----------------------------------
            for(var i=0; i < responseJson.length; i++) {
                // if msgType is "Alert" (not Cancel) and this identifier is not in the blockedAlertIds array, add some html to myOutput
                if(responseJson[i].alert.msgType == "Alert" && !blockedAlertIds.includes(responseJson[i].alert.identifier)) {
            
                    //window.scrollTo(0,0);
                    
                    // The Event severity is the severity of the latest non-cancel event (latest coming first in json array). Set once then don't set again in loop.
                    if(eventSeverity == "") {
                        eventSeverity = responseJson[i].alert.info.severity;
                    }
                    
                    // CLEAN UP AND REFORMAT SOME THINGS
                    
                    // reformat the timestamp of this alert 
                    sent_timestamp = Date.parse(responseJson[i].alert.sent);
                    sent_date = new Date(sent_timestamp); 
                    sent_date_locale = sent_date.toLocaleString("en-us", locale_options);
                    sent_date_locale_clean = sent_date_locale.replace("AM", "am").replace("PM","pm").replace(" at",",");
                    
                    
                    // remove spaces between \n's
                    descriptionOutput = responseJson[i].alert.info.description.replace(/[ ]+\n/g, '\n');

                    paras = descriptionOutput.split("\n\n");
                    lines = [];
                    new_lines = [];
                    newDescriptionOutput = "";
        
                    var used_ul = "no";
                    for(let pc=0; pc<paras.length; pc++) {
                        
                        // add p tags around paragraphs
                        paras[pc] = "<p>\n" + paras[pc] + "\n</p>";

                        lines[pc] = paras[pc].split('\n');
                        new_lines[pc] = lines[pc];

                        for(let lc=0; lc<lines[pc].length; lc++) {
                            if(lines[pc][lc].startsWith("-")) {
                                if(used_ul == "yes") {
                                    new_lines[pc][lc] = "<li>"+lines[pc][lc].replace(/^- /,'')+"</li>";
                                }
                                else {
                                    new_lines[pc][lc] = "</p><ul><li>"+lines[pc][lc].replace(/^- /,'')+"</li>";
                                }
                                used_ul = "yes";
                            }
                            else {
                                if(used_ul == "yes") {
                                    if(new_lines[pc][lc] != "" && new_lines[pc][lc] != "<p>" && new_lines[pc][lc] != "</p>") {
                                        new_lines[pc][lc] = "</ul><p>"+lines[pc][lc]+"<br/>";
                                    }
                                    else if(new_lines[pc][lc] == "</p>") {
                                        new_lines[pc][lc] = "</ul>";
                                    }
                                    else {
                                        new_lines[pc][lc] = "</ul>"+lines[pc][lc];
                                    }
                                }
                                else {
                                    if(lines[pc][lc] != "<p>" && !lines[pc][lc].endsWith("</p>")) {
                                        new_lines[pc][lc] = lines[pc][lc]+"<br/>";
                                    }
                                    else {
                                        new_lines[pc][lc] = lines[pc][lc];
                                    }
                                }
                                used_ul = "no";
                            }
                            newDescriptionOutput += new_lines[pc][lc];
                            // if this is the last line in the paragraph section, close the ul if we need to
                            if(lc+1 == lines[pc].length && used_ul == "yes" ) {
                                newDescriptionOutput +=  "</ul>";
                            }
                            //console.log(new_lines[pc][lc]);
                        }
                        
                    }
                    descriptionOutput = newDescriptionOutput.replace(/<p><\/p>/g, "");
                    descriptionOutput = descriptionOutput.replace(/www\.dining\.wm\.edu/g, "dining.wm.edu");
                    descriptionOutput = linkify(descriptionOutput);

                    
                    // PRODUCE HEADLINE OUTPUT
                    if(headlineOutput == "") {
                        
                        // some customizations based on page
                        if(eventSeverity == "Extreme" || thisRavePage == "emt") {
                            toggleButtonOutput = "";
                        }
                        else {
                            toggleButtonOutput = `
                                <button class="tribe-alert__toggle minus" id="tribe-alert__toggle" aria-controls="tribe-alert__content" aria-expanded="true">
                                    <span class="button-text">Collapse</span>
                                </button>
                            `;
                        }
                        if (!(thisRavePage == "wmhome" && eventSeverity == "Extreme") && !(thisRavePage == "wmalert")) {
                            descriptionOutput = "";
                        }
    
                        if(thisRavePage == "emt") {
                            headingNum = "h2";
                        }
                        else {
                            headingNum = "h3";
                        }
                        if(eventSeverity == "Minor") {
                            barText = "W&amp;M Info";
                        }
                        headlineOutput = `
                        <div role="alert" class="alert-latest ${responseJson[i].alert.info.severity.toLowerCase()}">
                            <div class="tribe-alert__header">
                                ${barText}
                                ${toggleButtonOutput}
                            </div>
                            <div class="tribe-alert__content" id="tribe-alert__content">
                                <div class="tribe-alert__content--padding">
                                    <div class="tribe-alert__icon" aria-hidden="true"></div>
                                    <${headingNum} class="tribe-alert__title">
                                        ${responseJson[i].alert.info.headline}
                                    </${headingNum}>
                                    <div class="tribe-alert__date">${sent_date_locale_clean}</div>
                                    <div class="tribe-alert__desc">${descriptionOutput}</div>
                                    <div class="tribe-alert__link">
                                        <a href="${alertPage}">More Information</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        
                        // If not on the W&M alert page, break. No need to keep going through older event messages on whatever page this is
                        if(thisRavePage != "wmalert") {
                            break;
                        }
                    }
                    // PRODUCE LIST OUTPUT
                    listOutput = listOutput + `
                        <div class="rave_list_item">
                        <h2 class="rave_list_item__title">${responseJson[i].alert.info.headline}</h2>
                        <div class="rave_list_item__date">${sent_date_locale_clean}</div>
                        ${descriptionOutput}
                        </div>
                    `;
        
                } // END IF ITEM IS ALERT
                
            } // END LOOP JSON ARRAY

    
            //----------------------------------
            // OUTPUT- different things on different pages 
            //----------------------------------
            // ALERT PAGE
            if(thisRavePage == "wmalert") {
                if(listOutput != "") {
                    document.querySelector("#rave_announcement").innerHTML= listOutput;
                }
                else {
                    document.querySelector("#rave_announcement").innerHTML = "There are currently no alerts.";
                }
            }
            // EMT PAGE
            else if (thisRavePage == "emt") {
                if(headlineOutput != "") {
                    document.querySelector("#emt-homepage-box").innerHTML= headlineOutput;
                }
                else {
                    document.querySelector("#emt-homepage-box").innerHTML = '<p style="padding:20px">There are currently no alerts.</p>';
                }
            }
            // HEADLINE
            else {
                // else add headline to page
                var alertDiv= document.createElement("div");
                alertDiv.innerHTML = headlineOutput;
                alertDiv.classList.add("tribe-alert__wrapper");
                document.body.insertBefore(alertDiv, document.body.firstChild);
            }
            
            document.body.addEventListener( 'click', function ( event ) {
                if( event.target.id == 'tribe-alert__toggle' ) {
                    var section = document.querySelector('.tribe-alert__content');
                    var emToggle = document.querySelector(".tribe-alert__toggle");
                    var isCollapsed = section.getAttribute('aria-hidden') === 'true';
                    if(isCollapsed) {
                        expandSection(section,emToggle)
                    } else {
                        collapseSection(section,emToggle)
                    }
                }
            });
            
            // IF EXTREME AND W&M HOMEPAGE, HIDE THE HOMEPAGE ROWS (Should already be done with PHP)
            if(thisRavePage == "wmhome" &&  eventSeverity.toLowerCase() == "extreme") {
                document.querySelector('body').classList.add("js-hide-rows");
  
                // Add the stay informed content to page
                var stayInformed = document.createElement('div');
                var mainContent = document.querySelector('main');
                stayInformed.classList.add("alert-resources-container");
                var stayInformedContent = `
                <div class="alert-resources"><h2>Stay Informed</h2>
                    <p>For the latest up-to-date information regarding campus-wide emergencies, please consider following these communication channels:</p>
                    <ul class="resource-icons">
                        <li><a href="https://www.facebook.com/wmnews"><span class="fab fa-facebook" aria-hidden="true"></span>Facebook</a></li>
                        <li><a href="https://www.twitter.com/WMNews"><span class="fab fa-x-twitter" aria-hidden="true"></span>X</a></li>
                        <li><a href="https://www.wm.edu/mobileapps/"><span class="fa-regular fa-mobile" aria-hidden="true"></span>Mobile Alerts</a></li>
                    </ul>
                </div>
                `;
                stayInformed.innerHTML = stayInformedContent;
                if(mainContent) {
                    mainContent.appendChild(stayInformed);
                }
                
                // Hack to keep button from being hidden as you scroll past people row
                if(document.querySelector('.wm-topbar__menu-button')) {
                    document.querySelector('.wm-topbar__menu-button').style.right = "0";
                    document.querySelector('.wm-topbar__menu-button').style.opacity = "1";
                }

            } // END IF EXTREME AND W&M HOMEPAGE
            
            // APPEND THE CSS TO THE PAGE HEAD
            var ravestyle = document.createElement('style');
            ravestyle.innerHTML = getRaveCSS(); 
            document.head.appendChild(ravestyle);
            
        } // Else json file is empty...
        else if (document.querySelector("#emt-homepage-box")) {
            document.querySelector("#emt-homepage-box").innerHTML = '<p style="padding:20px">There are currently no alerts.</p>';
        }
        else if (document.querySelector("#rave_announcement")) {
            document.querySelector("#rave_announcement").innerHTML = '<p style="margin:0px;padding:20px;background:#eff0f0;">There are currently no alerts.</p>';
        }
    }
    
    
    // =================================================================
    // CALL FUNCTION LoadAlerts
    // 
    // ====================================================================
    loadAlerts();
    
    
    //---------------------------------------------------
    // FUNCTION: linkify
    //---------------------------------------------------
    function linkify(text) {
        var urlRegex =/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, function(url) {
            return '<a href="' + url + '">' + url + '</a>';
        });
    }
    
    //---------------------------------------------------
    // FUNCTION: mmd (micro markdown parser)
    //
    // https://github.com/p01/mmd.js
    // commented out stuff we don't need  and changed '*'' to '-' for lists.
    // Just works with - for lists and # for headings
    //---------------------------------------------------
    function mmd(src) {
    	var h='';
    
    	function escape(t){
    		return new Option(t).innerHTML;
    	}
    	function inlineEscape(s){
    		return escape(s)
    			.replace(/!\[([^\]]*)]\(([^(]+)\)/g, '<img alt="$1" src="$2">')
    			.replace(/\[([^\]]+)]\(([^(]+?)\)/g, '$1'.link('$2'))
    			.replace(/`([^`]+)`/g, '<code>$1</code>')
    			.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, '<strong>$2</strong>')
    			.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, '<em>$2</em>');
    // 			return escape(s);
    	}
    
    	src
    	.replace(/^\s+|\r|\s+$/g, '')
    	.replace(/\t/g, '    ')
    	.split(/\n\n+/)
    	.forEach(function(b, f, R){
    		f=b[0];
    		R={
    			'-':[/\n- /,'<ul><li>','</li></ul>'],
     			'1':[/\n[1-9]\d*\.? /,'<ol><li>','</li></ol>'],
     			' ':[/\n    /,'<pre><code>','</code></pre>','\n'],
     			'>':[/\n> /,'<blockquote>','</blockquote>','\n']
    		}[f];
    		h+=
    			R?R[1]+('\n'+b)
    				.split(R[0])
    				.slice(1)
    				.map(R[3]?escape:inlineEscape)
    				.join(R[3]||'</li>\n<li>')+R[2]:
    			f=='#'?'<h'+(f=b.indexOf(' '))+'>'+inlineEscape(b.slice(f+1))+'</h'+f+'>':
    			f=='<'?b:
    			'<p>'+inlineEscape(b)+'</p>';
    	});
    	return h;
    };
    
    //---------------------------------------------------
    // FUNCTION: addToggleListener
    //---------------------------------------------------
    function addToggleListener() {
        document.querySelector('.tribe-alert__toggle').addEventListener('click', function(e) {
            var section = document.querySelector('.tribe-alert__content');
            var emToggle = document.querySelector(".tribe-alert__toggle");
            
            var isCollapsed = section.getAttribute('aria-hidden') === 'true';
            
            if(isCollapsed) {
                expandSection(section,emToggle)
            } else {
                collapseSection(section,emToggle)
            }
        });
    }

    //---------------------------------------------------
    // FUNCTION: collapseSection
    //--------------------------------------------------
    function collapseSection(element, toggle) {
      // get the height of the element's inner content, regardless of its actual size
      var sectionHeight = element.scrollHeight;
      
      // temporarily disable all css transitions
      var elementTransition = element.style.transition;
      element.style.transition = '';
      
      // on the next frame (as soon as the previous style change has taken effect),
      // explicitly set the element's height to its current pixel height, so we 
      // aren't transitioning out of 'auto'
      requestAnimationFrame(function() {
        element.style.maxHeight = sectionHeight + 'px';
        element.style.transition = elementTransition;
        
        // on the next frame (as soon as the previous style change has taken effect),
        // have the element transition to max-height: 0
        requestAnimationFrame(function() {
          element.style.maxHeight = 0 + 'px';
          
          // when the next css transition finishes (which should be the one we just triggered)
          element.addEventListener('transitionend', function(e) {
            // remove this event listener so it only gets triggered once
            element.removeEventListener('transitionend', arguments.callee);
            
            if(element.getAttribute('aria-hidden') == "true") {
                // set content to hidden    
                element.style.visibility = "hidden";
                element.style.maxHeight = 0 + 'px';
            }
          });
        });
      });
      
      // mark the section as "currently collapsed"
      element.setAttribute('aria-hidden','true');
      toggle.setAttribute('aria-expanded','false');
      
        toggle.classList.remove("minus");
        toggle.classList.add("plus");
        toggle.innerHTML = '<span class="button-text">View Alert</span>'; 

    }

    //------------------------------------------------------
    // FUNCTION: expandSection
    //------------------------------------------------------ 
    function expandSection(element, toggle) {
      // set content to visible    
      element.style.visibility = "visible";
        
      // get the height of the element's inner content, regardless of its actual size
      var sectionHeight = element.scrollHeight;
      
      // have the element transition to the height of its inner content
      element.style.maxHeight = sectionHeight + 'px';
    
      // when the next css transition finishes (which should be the one we just triggered)
      element.addEventListener('transitionend', function(e) {
        // remove this event listener so it only gets triggered once
        element.removeEventListener('transitionend', arguments.callee);
        
        // remove "height" from the element's inline styles, so it can return to its initial value
        element.style.maxHeight = null;
      });
      
      // mark the section as "currently not collapsed"
      element.setAttribute('aria-hidden','false');
      
      toggle.setAttribute('aria-expanded','true');
      toggle.classList.remove("plus");
      toggle.classList.add("minus");
      toggle.innerHTML = '<span class="button-text">Collapse</span>'; 
    }

    //------------------------------------------------------
    // FUNCTION: get RaveCSS
    //------------------------------------------------------ 
    function getRaveCSS() {
        var theCSS = `
    body.js-hide-rows .o-homehero,
    body.js-hide-rows .o-homecallout,
    body.js-hide-rows .HomeAdmission,
    body.js-hide-rows .HomeStats,
    body.js-hide-rows .HomeSchools,
    body.js-hide-rows .o-people,
    body.js-hide-rows .o-homenews,
    body.js-hide-rows .o-homeevents,
    body.js-hide-rows .o-homephotos {
        display: none;
    }
    .alert-latest,
    .alert-latest.moderate {
        background: var(--spirit-100, #FFF8E7);
        width: 100%;
        font-family: "adelle-sans", sans-serif;
    }
    .alert-latest.minor {
    	 background: var(--marine-100, #E9F2F3);
    }
    .alert-latest.extreme {
    	 background: var(--brick-100, #F4EDEB);
    }
    .tribe-alert__header, 
    .alert-latest .tribe-alert__header {
        font-family: "adelle-sans", sans-serif;
    }
     .tribe-alert__header,
     .alert-latest .tribe-alert__header,
     .alert-latest.moderate .tribe-alert__header{
    	 background: #654908;
    	 background: linear-gradient(270deg, var(--spirit-900, #654908) 19.57%, var(--spirit-800, #986E0C) 50.16%, var(--spirit-900, #654908) 80.75%);
    	 position: relative;
    	 width: 100%;
    	 text-transform: uppercase;
    	 text-align: center;
    	 letter-spacing: 0.05em;
    	 padding: 10px 0px;
    	 line-height: 1.6;
    	 color: #fff;
    	 font-size: 1.123rem;
    	 font-weight: 700;
    	 margin-bottom: 0;
    	 margin-top: 0;
    	 min-height: 48px;
    }
    .alert-latest.minor .tribe-alert__header {
    	 background: #3C1E16;
    	 background: linear-gradient(270deg, var(--marine-850, #0D3D49) 19.57%, var(--marine-600, #247B8C) 50.16%, var(--marine-850,#0D3D49) 80.75%);
    }
    .alert-latest.extreme .tribe-alert__header {
    	 background: #3C1E16;
    	 background: linear-gradient(270deg, var(--brick-900, #3C1E16) 19.57%, var(--brick-600, #964A37) 50.16%, var(--brick-900, #3C1E16) 80.75%);
    }
    .tribe-alert__header::before,
    .tribe-alert__header::after {
        content: none !important;
    }
     .tribe-alert__header .desktop {
    	 display: none;
    }
     .tribe-alert__toggle {
    	 background: transparent;
    	 color: #fff;
    	 padding: 0 16px;
    	 position: absolute;
    	 right: 0;
    	 top: 0;
    	 font-size: .8rem;
    	 font-weight: 400;
    	 letter-spacing: 0;
    	 cursor: pointer;
    	 margin:0;
    	 height: 100%;
    	 width: 100%;
    	 text-align:right;
    	 border: 0;
    	 text-transform: uppercase;
    }
     .tribe-alert__toggle:focus-visible {
    	 outline-offset: -2px;
    	 outline-width: 3px;
    	 outline-color: initial;
    }
     .tribe-alert__toggle span {
    	 pointer-events: none;
    }
     .tribe-alert__toggle .button-text {
    	 display: none;
    }
     .tribe-alert__toggle:hover, .tribe-alert__toggle:focus-visible {
    	 text-decoration: underline !important;
    	 background: initial;
    }
    .tribe-alert__toggle:focus {
    	 background: initial;
    }    
    .tribe-alert__toggle::after {
        width: 20px;
        height: 12px;
        content: "";
        display: inline-block;
        margin-left: 10px;
        background-size: contain; /* needs this */
        background-repeat: no-repeat;
    }
    .tribe-alert__toggle.minus::after {
        background-image: url('data:image/svg+xml,<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools --><svg width="800px" height="800px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="none"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="%23ffffff"/></g></svg>');
    }
    .tribe-alert__toggle.plus::after {
        background-image: url('data:image/svg+xml,<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools --><svg fill="%23ffffff" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 455 455" xml:space="preserve" stroke="%23ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 455,242.5 "/></g></svg>');
        
    }
    .tribe-alert__content {
        padding: 0 22px;
        position: relative;
        color: #212220;
        margin: 0 auto;
        z-index: 20;
        max-width: 990px;
        font-size: 1.02rem;
        letter-spacing: 0.015em;
        overflow: hidden;
        transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in;
        height:auto;
        max-height:none;
        opacity: 1;
        box-sizing: border-box;
    }
    .tribe-alert__content--padding {
        padding: 1.8rem 0;
    }
     .tribe-alert__content[aria-hidden="true"] {
    	 opacity: 0;
    }
     .tribe-alert__icon {
    	 display: none;
    	 position: absolute;
    	 top: 40px;
    	 width: 70px;
    	 height: 70px;
    	 background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="%23D8A120" d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.8 536.6 69.6 524.5C62.4 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 416C302.3 416 288 430.3 288 448C288 465.7 302.3 480 320 480C337.7 480 352 465.7 352 448C352 430.3 337.7 416 320 416zM320 224C301.8 224 287.3 239.5 288.6 257.7L296 361.7C296.9 374.2 307.4 384 319.9 384C332.5 384 342.9 374.3 343.8 361.7L351.2 257.7C352.5 239.5 338.1 224 319.8 224z"/></svg>');
    	 background-size: contain; /* needs this */
    	 background-repeat: no-repeat;
    }
    .minor .tribe-alert__icon {
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="%23247B8C" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/></svg>');
    }
    .extreme .tribe-alert__icon {
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Pro 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path fill="%23964A37" d="M320 64C335.4 64 350.1 70.1 361 81L559 279C569.9 289.9 576 304.6 576 320C576 335.4 569.9 350.1 559 361L361 559C350.1 569.9 335.4 576 320 576C304.6 576 289.9 569.9 279 559L81 361C70.1 350.1 64 335.4 64 320C64 304.6 70.1 289.9 81 279L279 81C289.9 70.1 304.6 64 320 64zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z"/></svg>');
    }
    .tribe-alert__title {
    	 font-weight: 700 !important;
    	 text-transform: uppercase;
    	 font-size: 1.15rem;
    	 letter-spacing:0.05em;
    	 color: var(--spirit-800, #986E0C) !important;
    	 padding: 0;
    	 line-height: 1.6;
    	 margin: 0 0 .3rem !important;
    }
    .minor .tribe-alert__title {
        color: var(--marine-700, #1D6270) !important;
    }
    .extreme .tribe-alert__title {
        color: var(--brick-600, #964A37) !important;
    }
     .tribe-alert__date {
        font-weight: 700;
    	 margin-bottom: .4rem;
    }
     .tribe-alert__desc {
        font-weight: 400;
        margin-bottom: .3rem;
        padding: 0;
     }
     .tribe-alert__desc:empty {
         display: none;
     }
     .tribe-alert__desc a {
    	 color: #8f6b15;
    	 text-decoration: none;
    	 font-weight: 700;
    }
    .minor .tribe-alert__desc a {
    	 color: var(--marine-800, #164A54);
    }
    .extreme .tribe-alert__desc a {
    	 color: var(--brick-600, #964A37);
    }
     .tribe-alert__desc a:hover, .tribe-alert__desc a:focus {
    	 text-decoration: underline;
    }
     .tribe-alert__link {
        color: #8f6b15;
    	 display: inline-block;
    	 white-space: nowrap;
    	 letter-spacing: 0;
    	 font-size: 1.02rem;
    }
    .tribe-alert__link a {
        color: #8f6b15 !important;
        font-weight: 700;
        position: relative;
    }
    .tribe-alert__link a::after {
        content: "";
        display: inline;
    	background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Pro 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path fill="%23CA9210" d="M571.3 331.3C577.5 325.1 577.5 314.9 571.3 308.7L395.3 132.7C389.1 126.5 378.9 126.5 372.7 132.7C366.5 138.9 366.5 149.1 372.7 155.3L521.4 304L80 304C71.2 304 64 311.2 64 320C64 328.8 71.2 336 80 336L521.4 336L372.7 484.7C366.5 490.9 366.5 501.1 372.7 507.3C378.9 513.5 389.1 513.5 395.3 507.3L571.3 331.3z"/></svg>');
    	background-size: contain; /* needs this */
    	position: absolute;
    	top: 0;
    	left: calc(100% + 7px);
    	width: 20px;
    	height: 20px;
    	transition: all .3s ease;
    }
    .minor .tribe-alert__link a::after {
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Pro 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path fill="%235095A3" d="M571.3 331.3C577.5 325.1 577.5 314.9 571.3 308.7L395.3 132.7C389.1 126.5 378.9 126.5 372.7 132.7C366.5 138.9 366.5 149.1 372.7 155.3L521.4 304L80 304C71.2 304 64 311.2 64 320C64 328.8 71.2 336 80 336L521.4 336L372.7 484.7C366.5 490.9 366.5 501.1 372.7 507.3C378.9 513.5 389.1 513.5 395.3 507.3L571.3 331.3z"/></svg>');
    }
    .extreme .tribe-alert__link a::after {
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Pro 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path fill="%23AB6E5F" d="M571.3 331.3C577.5 325.1 577.5 314.9 571.3 308.7L395.3 132.7C389.1 126.5 378.9 126.5 372.7 132.7C366.5 138.9 366.5 149.1 372.7 155.3L521.4 304L80 304C71.2 304 64 311.2 64 320C64 328.8 71.2 336 80 336L521.4 336L372.7 484.7C366.5 490.9 366.5 501.1 372.7 507.3C378.9 513.5 389.1 513.5 395.3 507.3L571.3 331.3z"/></svg>');
    }
    .minor .tribe-alert__link a {
        color: var(--marine-800, #164A54) !important;
    }
    .extreme .tribe-alert__link a {
        color: var(--brick-600, #964A37) !important;
    }
    .tribe-alert__link a:hover::after {
      transform: translate3d(5px,0,0);
    }
     .alert-resources {
    	 padding: 5.5rem 0 5.5rem;
    	 margin: auto;
    	 max-width: 650px;
    	 text-align: center;
    	 font-size: 1rem;
    	 letter-spacing: 0.015em;
    	 color: #000;
    }
    .alert-resources h2 {
        font-family: "adelle",serif;
        font-size: 2.5rem !important;
        font-weight: 500;
        margin-bottom: 1.5rem;
    }
     .alert-resources p {
    	 padding: 0 22px;
    	 margin-bottom: 2rem;
    }
     .resource-icons {
    	 display: flex;
    	 justify-content: center;
    	 flex-wrap: wrap;
    	 width: 100%;
    	 margin: 3rem auto 0;
    	 padding: 0 16px;
    }
     .resource-icons li {
    	 width: 120px;
    	 list-style: none;
    	 font-size: .975rem;
    	 line-height: 1.2;
    	 margin-bottom: 2rem;
    }
     .resource-icons a, .resource-icons a:hover, .resource-icons a:focus {
    	 color: #115740;
    	 text-decoration: none;
    	 letter-spacing: 0.01em;
    	 font-weight: 700;
     	 display: inline-block;
    	 min-width: 90px;
    }
     .resource-icons a span {
    	 display: block;
    	 color: #b58e5b;
    	 font-size: 3rem;
    	 padding-bottom: 1.7rem;
    	 transition: all .3s;
    }
     .resource-icons a:hover span, .resource-icons a:focus span {
    	 color: #115740;
    }
    /* ALERT PAGE */
    .rave_list_item {
        margin-bottom: 4rem;
        font-size: 1.02rem;
    }
    .user_content .rave_list_item li {
      margin-bottom: 0;
    }
    .rave_list_item__title {
        font-weight: 700 !important;
    }
    .rave_list_item__title {
        letter-spacing: .015rem;
        font-size: 1.48rem;
        line-height: 1.4;
        margin: 0 0 0.1rem;
    }
    .rave_list_item__date {
        font-weight: 400;
        margin-bottom: 1.3rem;
    }
    /* EMT PAGE */
    #emt-homepage-box {
        padding: 0;
    }
    #emt-homepage-box .tribe-alert__header {
        display: none;
    }
    @media only screen and (min-width: 450px) {
    	 .tribe-alert__header .mobile {
    		 display: none;
    	}
    	 .tribe-alert__header .desktop {
    		 display: inline;
    	}
    }
     @media only screen and (min-width: 600px) {
    	 .resource-icons li {
    		 width: 130px;
    	}
    }
     @media only screen and (min-width: 700px) {
    	 .tribe-alert__toggle .button-text {
    		 display: inline;
    	}
    }
     @media only screen and (min-width: 800px) {
    	 .tribe-alert__icon {
    		 display: block;
    	}
    	 .tribe-alert__title, .tribe-alert__date, .tribe-alert__desc, .tribe-alert__link {
    		 margin-left: max(12%, 95px) !important;
    	}
    }
`;
        return theCSS;
    }

});

