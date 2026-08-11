document.addEventListener("DOMContentLoaded", function() {
    
    // used to check if row is loaded
    const peopleRow = document.querySelector('.o-people');
    const eventsRow = document.querySelector('.o-homeevents');
    const newsRow = document.querySelector('.o-homenews');
    const socialRow = document.querySelector('.o-homephotos');
    
    if (peopleRow) {
        // HACK- rmove the hacky extra people row that is being written out for now 
        // because we can't nest [system-view:internal] tags in Cascade and we want to be able to preview in Cascade
        var peoplehack = document.getElementById('peoplehack');
        if (peoplehack) {
            //peoplehack.remove();
            peoplehack.parentNode.removeChild(peoplehack);
        }
    }

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
          var context = this,
            args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
    };
    ;// ANIMATION STUFF
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 0,
            delay: 50,
        });
    }
    
     // ---------------------- RESEARCH ROW ----------------------------//
    function equalizeCardHeights() {
        const cards = document.querySelectorAll(".HomeResearch__card");
    
        // Always reset heights first
        cards.forEach(card => {
            card.style.height = "auto";
        });
    
        // Don't equalize on mobile
        if (window.innerWidth <= 600) {
            return;
        }
    
        // Find the tallest card
        let maxHeight = 0;
    
        cards.forEach(card => {
            maxHeight = Math.max(maxHeight, card.offsetHeight);
        });
    
        // Apply that height to all cards
        cards.forEach(card => {
            card.style.height = maxHeight + "px";
        });
    }
    
    window.addEventListener("load", equalizeCardHeights);
    
    window.addEventListener("resize", () => {
        clearTimeout(window.__cardResizeTimer);
        window.__cardResizeTimer = setTimeout(equalizeCardHeights, 100);
    });

    // ---------------------- NEWS ROW ----------------------------//
    if (newsRow) {
        $.ajax({
            url: "/js/feeds/news.json",
            dataType: "json",
            success: function(data) {
                outputStoryData(data);
            },
            error: function(x,y,z) {
            console.log("Error with AJAX: "+y);
            }
        });
        
        function outputStoryData(data) {
            var myItems = data;
            
            for(let i=0; i < myItems.length; i++) {
                let myIdSel = "#homenewsitem-"+i;
                //let myDash = "-";
                let myTitleSel = myIdSel + " .headline--homenews";
                let myLinkSel = myIdSel + " a";
                
                $(myTitleSel).html(myItems[i].title);
                $(myLinkSel).attr("href", myItems[i].url);
                
                if(i<2) {
                    let myImageWrapperSel = myIdSel + " .m-listimage__inner";
                    let myImageSel = myIdSel + " img";
                    
                    //$(myImageWrapperSel).css("background-image", "url("+myItems[i].image+")");
                    $(myImageSel).attr("src", myItems[i].image);
                    $(myImageSel).attr("alt", myItems[i].image_alt);
                    
                    $(myLinkSel).attr("aria-label", myItems[i].title);
                }
        
            }
        }
    }
    
    // ---------------------- EVENTS ROW ----------------------------//
    
    if (eventsRow) {
        
        var wmfeed = "/js/feeds/spotlight.json";
        $.ajax({
            url: wmfeed,
            dataType: "json",
            success: function(data) {
                    outputSpotlightEvent(data);
                },
            error: function(x,y,z) {
            console.log("Error with AJAX: "+y);
            }
        });
        
        var wmhomepagefeed = "/js/feeds/events.json";
        $.ajax({
            url: wmhomepagefeed,
            dataType: "json",
            success: function(data) {
                    outputUpcomingEvents(data);
                },
            error: function(x,y,z) {
            console.log("Error with AJAX: "+y);
            }
        });
        
        // CLICK PROXY FOR SPOTLIGHT EVENT
        document.addEventListener('click', function(e) {
            const trigger = e.target.closest('#spotlight_event .js-spotlight-trigger');
            if (!trigger) return;
    
            const link = document.querySelector('#spotlight_event .info a');
            if (link) {
                window.location = link.href;
            }
        });
        
        function outputSpotlightEvent(data) {
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var myText='';
            var container = $("#spotlight_event");
            var entry = data.spotlight;
            //var myTitle = '<div class="event_name"><span>'+entry.title+'</span></div>';
            var myTitle = entry.title;
            var myUrl = entry.url;
            myUrl = myUrl.replace("/wmhomepage/","/wm/");
    
            var sDate = new Date(entry.dtstart*1000);
            var month = months[sDate.getMonth()];
            var day = sDate.getDate();
            var hours = sDate.getHours();
            var ampm = "am";
            if (hours == 12) {
                ampm = "pm";
            }
            else if (hours > 11) {
                ampm= "pm";
                hours = hours - 12;
            } else if (hours == 0) {
                hours = "12";
            }                
            var minutes = "0" + sDate.getMinutes();
            minutes = minutes.substr(-2);
            
            var time = hours + ':' + minutes + ampm;
            var nowTimestamp = Math.floor(new Date() / 1000);
            if (entry.dtstart < nowTimestamp) {
                var todayDate = new Date();
                var month = months[todayDate.getMonth()];
                day = todayDate.getDate();
                time = "Ongoing";
            }
            var myMonth = month;
            var myDay = day;
            var myTime = time;
            if (time == '12:00am'|| time == '12:01am') {
                myTime = '';
            }
            var myLocation = entry.location;
            var myImage = entry.fullimageurl;
            var mySummary = entry.summary;
            myText += '<div class="m-calentry"><div class="cal js-spotlight-trigger" style="background-image:url('+myImage+')"><span><h3>Spotlight Event</h3><div class="date"><div class="month">' + myMonth + '</div><div class="day">' + myDay + '</div></div></span></div><div class="info"><a href="'+myUrl+'"><div class="title">' + myTitle + '</div><div class="location">' + myLocation + '</div><div class="time">' + myTime + '</div></a><div class="summary">' + mySummary + '</div></div></div>';       
            container.html(myText);
        }
    
        function outputUpcomingEvents(data) {
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var myText='<h3 class="sr-only">Upcoming Featured Events</h3><div class="eventcol">';
            var container = $("#upcoming_events");
            var maxNum = 4;
            for (var i = 1; i <= data.entries.length; i++) {
                if (i <= maxNum) {
                    var entry = data.entries[i-1];
                    //var myTitle = '<div class="event_name"><span>'+entry.title+'</span></div>';
                    var myTitle = entry.title;
                    var myUrl = entry.url;
                    myUrl = myUrl.replace("/wmhomepage/","/wm/");
                    var sDate = new Date(entry.dtstart*1000);
                    var month = months[sDate.getMonth()];
                    var day = sDate.getDate();
                    var hours = sDate.getHours();
                    var ampm = "am";
                    if (hours == 12) {
                        ampm = "pm";
                    }
                    else if (hours > 11) {
                        ampm= "pm";
                        hours = hours - 12;
                    } else if (hours == 0) {
                        hours = "12";
                    }                
                    var minutes = "0" + sDate.getMinutes();
                    minutes = minutes.substr(-2);
                    
                    var time = hours + ':' + minutes + ampm;
                    var nowTimestamp = Math.floor(new Date() / 1000);
                    if (entry.dtstart < nowTimestamp) {
                        var todayDate = new Date();
                        var month = months[todayDate.getMonth()];
                        day = todayDate.getDate();
                        time = "Ongoing";
                    }
                    var myMonth = month;
                    var myDay = day;
                    var myTime = time;
                    if (time == '12:00am'|| time == '12:01am') {
                        myTime = '';
                    }
                    var myLocation = entry.location;
                    myText += '<div class="m-calentry c' + i + '"><a href="'+myUrl+'"><div class="cal"><div class="date"><div class="month">' + myMonth + '</div><div class="day">' + myDay + '</div></div></div> <div class="info"><div class="title">' + myTitle + '</div><div class="location">' + myLocation + '</div><div class="time">' + myTime + '</div></div></a></div>';
                    
                    if(i == Math.ceil(maxNum/2)) {
                        myText += '</div><div class="eventcol">';
                    }
                
                }
            }
            myText += '</div>'; // end eventcol
            container.html(myText);
        }
    }
    
    // ---------------------- PHOTOS/SOCIAL ROW ----------------------------//
        
        
    if (socialRow) {
        
        imagesLoaded( document.querySelector('body'), function( instance ) {
            var myfeed = "/js/feeds/instagram.json";
            $.ajax({
                url: myfeed,
                dataType: "json",
                success: function(data) {
                        outputPosts(data);
                    },
                error: function(x,y,z) {
                console.log("Error with AJAX: "+y);
                }
            });
            
            function outputPosts(data) {
                var myText='';
                var container = $("#homephotos");
                var maxNum = 13;
                var counter = 1;
                var post = "";
                var prevPost = "";
                for (var i = 1; i <= data.posts.length; i++) {
                        if (counter <= maxNum) {
                            post = data.posts[i-1];
                            if(post.url != prevPost) {
                                myText += '<div class="griditem"><a href="'+post.url+'"><figure style="background-image:url('+post.image+')"><img alt="'+post.text+'" class="sr-only" src="'+post.image+'"/></figure></a></div>';
                                counter++;
                                prevPost = post.url;
                            }
                        }
                        else {
                            break;
                        }
                }
                container.html(myText);
            }
        
        });
    }


   // ---------------------- PEOPLE ROW ----------------------------//
   
   if (peopleRow) {
    
        /*
    *   This content is licensed according to the W3C Software License at
    *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
    */
        (function() {
            var tablist = document.querySelectorAll('.o-people [role="tablist"]')[0];
            var tabs;
            var panels;
    
            generateArrays();
    
            function generateArrays() {
                tabs = document.querySelectorAll('.o-people [role="tab"]');
                panels = document.querySelectorAll('.o-people [role="tabpanel"]');
            }
            ;// For easy reference
            var keys = {
                end: 35,
                home: 36,
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                delete: 46,
                enter: 13,
                space: 32
            };
    
            // Add or subtract depending on key pressed
            var direction = {
                37: -1,
                38: -1,
                39: 1,
                40: 1
            };
    
            // Bind listeners
            for (i = 0; i < tabs.length; ++i) {
                addListeners(i);
            }
            ;function addListeners(index) {
                tabs[index].addEventListener('click', clickEventListener);
                tabs[index].addEventListener('keydown', keydownEventListener);
                tabs[index].addEventListener('keyup', keyupEventListener);
    
                // Build an array with all tabs (<button>s) in it
                tabs[index].index = index;
            }
            ;// When a tab is clicked, activateTab is fired to activate it
            function clickEventListener(event) {
                var tab = event.target;
                activateTab(tab, true);
            }
            ;// Handle keydown on tabs
            function keydownEventListener(event) {
                var key = event.keyCode;
    
                switch (key) {
                case keys.end:
                    event.preventDefault();
                    // Activate last tab
                    focusLastTab();
                    break;
                case keys.home:
                    event.preventDefault();
                    // Activate first tab
                    focusFirstTab();
                    break;
    
                    // Up and down are in keydown
                    // because we need to prevent page scroll >:)
                case keys.up:
                case keys.down:
                    determineOrientation(event);
                    break;
                }
                ;
            }
            ;// Handle keyup on tabs
            function keyupEventListener(event) {
                var key = event.keyCode;
    
                switch (key) {
                case keys.left:
                case keys.right:
                    determineOrientation(event);
                    break;
                case keys.delete:
                    determineDeletable(event);
                    break;
                case keys.enter:
                case keys.space:
                    activateTab(event.target, true);
                    break;
                }
                ;
            }
            ;// When a tablist's aria-orientation is set to vertical,
            // only up and down arrow should function.
            // In all other cases only left and right arrow function.
            function determineOrientation(event) {
                var key = event.keyCode;
                var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
                var proceed = false;
    
                if (vertical) {
                    if (key === keys.up || key === keys.down) {
                        event.preventDefault();
                        proceed = true;
                    }
                    ;
                } else {
                    if (key === keys.left || key === keys.right) {
                        proceed = true;
                    }
                    ;
                }
                ;if (proceed) {
                    switchTabOnArrowPress(event);
                }
                ;
            }
            ;// Either focus the next, previous, first, or last tab
            // depending on key pressed
            function switchTabOnArrowPress(event) {
                var pressed = event.keyCode;
    
                if (direction[pressed]) {
                    var target = event.target;
                    if (target.index !== undefined) {
                        if (tabs[target.index + direction[pressed]]) {
                            tabs[target.index + direction[pressed]].focus();
                        } else if (pressed === keys.left || pressed === keys.up) {
                            focusLastTab();
                        } else if (pressed === keys.right || pressed == keys.down) {
                            focusFirstTab();
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            ;// Activates any given tab panel
            function activateTab(tab, setFocus) {
    
                // if clicking on the active tab, just clean up and return
                if (tab.getAttribute("aria-selected") == "true") {
                    var controls = tab.getAttribute('aria-controls');
                    // make sure this panel is not hidden
                    document.getElementById(controls).removeAttribute('hidden');
                    return;
                }
    
                // sets focus to the tabpanel
                setFocus = setFocus || true;
                //console.log(setFocus);
    
                // get current active info
                var currButton = document.querySelector('.m-people-thumbs__button[aria-selected="true"]');
                var currentPersonId = currButton.getAttribute('aria-controls');
                var currentPerson = document.getElementById(currentPersonId);
    
                // cleanup: hide everything that isn't current active 
                for (p = 0; p < panels.length; p++) {
                    if (panels[p].getAttribute("id") != currentPersonId) {
                        panels[p].setAttribute('hidden', '');
                    }
                    // remove all personout's
                    panels[p].classList.remove('personout');
                }
                ;// Deactivate all other tabs
                //deactivateTabs();
    
                // Reset buttons, then activate this one
                for (t = 0; t < tabs.length; t++) {
                    tabs[t].setAttribute('tabindex', '-1');
                    tabs[t].setAttribute('aria-selected', 'false');
                }
                ;tab.removeAttribute('tabindex');
                // Set the tab as selected
                tab.setAttribute('aria-selected', 'true');
    
                // animate out the current live person
                currentPerson.classList.add('personout');
                currentPerson.addEventListener('transitionend', function(e) {
                    // remove this event listener
                    currentPerson.removeEventListener('transitionend', arguments.callee);
                    if (currentPerson.classList.contains('personout')) {
                        currentPerson.classList.remove('personout');
                        currentPerson.setAttribute('hidden', '');
                    }
                });
    
                // Get the value of aria-controls (which is an ID)
                var controls = tab.getAttribute('aria-controls');
    
                // animate in the selected person
                document.getElementById(controls).removeAttribute('hidden');
    
                // Set focus when required
                if (setFocus) {
                    document.getElementById(controls).focus({
                        preventScroll: true
                    });
                    //console.log('attempted to set focus');
                }
                ;
    
            }
            ;// Deactivate all tabs and tab panels
            function deactivateTabs() {
                for (t = 0; t < tabs.length; t++) {
                    tabs[t].setAttribute('tabindex', '-1');
                    tabs[t].setAttribute('aria-selected', 'false');
                }
                ;for (p = 0; p < panels.length; p++) {
                    panels[p].setAttribute('hidden', 'hidden');
                }
                ;
            }
            ;// Make a guess
            function focusFirstTab() {
                tabs[0].focus();
            }
            ;// Make a guess
            function focusLastTab() {
                tabs[tabs.length - 1].focus();
            }
            ;// Detect if a tab is deletable
            function determineDeletable(event) {
                target = event.target;
    
                if (target.getAttribute('data-deletable') !== null) {
                    // Delete target tab
                    deleteTab(event, target);
    
                    // Update arrays related to tabs widget
                    generateArrays();
    
                    // Activate the closest tab to the one that was just deleted
                    if (target.index - 1 < 0) {
                        activateTab(tabs[0]);
                    } else {
                        activateTab(tabs[target.index - 1]);
                    }
                    ;
                }
                ;
            }
            ;// Deletes a tab and its panel
            function deleteTab(event) {
                var target = event.target;
                var panel = document.getElementById(target.getAttribute('aria-controls'));
    
                target.parentElement.removeChild(target);
                panel.parentElement.removeChild(panel);
            }
            ;// Determine whether there should be a delay
            // when user navigates with the arrow keys
            function determineDelay() {
                var hasDelay = tablist.hasAttribute('data-delay');
                var delay = 0;
    
                if (hasDelay) {
                    var delayValue = tablist.getAttribute('data-delay');
                    if (delayValue) {
                        delay = delayValue;
                    } else {
                        // If no value is specified, default to 300ms
                        delay = 300;
                    }
                    ;
                }
                ;return delay;
            }
            ;
        }());
    
        // END: PEOPLE TAB CODE (thumbnails are tabs) ------------------------//
    
        function checkVisible(el) {
            if (el) {
                var rect = el.getBoundingClientRect();
                var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
                return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
            }
        }
    
        var scrollChanges = debounce(function() {
    
            var peoplerow = document.querySelector('.o-people');
    
            if (peoplerow && window.pageYOffset > 100) {
    
                // load buttons
                imagesLoaded(document.querySelector('main'), function(instance) {
    
                    var buttonimgs = document.querySelectorAll('.m-people-thumbs__button');
                    for (i = 0; i < buttonimgs.length; i++) {
                        var di = buttonimgs[i].getAttribute('data-img');
                        if (di && di !== "") {
                            buttonimgs[i].style.backgroundImage = "url(" + di + ")";
                            buttonimgs[i].removeAttribute('data-img');
                        }
                    }
                    ;
                });
    
            }
    
            if (checkVisible(peoplerow)) {
                // load main images
                var mainimgbgs = document.querySelectorAll('.m-person__image');
                for (i = 0; i < mainimgbgs.length; i++) {
                    var di = mainimgbgs[i].getAttribute('data-img');
                    if (di && di !== "") {
                        mainimgbgs[i].style.backgroundImage = "url(" + di + ")";
                        mainimgbgs[i].removeAttribute('data-img');
                        var innerimg = mainimgbgs[i].querySelector('img');
                        innerimg.setAttribute("src", di);
                    }
                }
                ;
                // check if read more stories button is visible
                if (window.innerWidth >= 968) {
    
                    if (!$("body").hasClass("menu-open") && !$("body").hasClass("info-open")) {
                        var scrollTop = Math.max($("html").scrollTop(), $("body").scrollTop(), $("window").scrollTop())
                          , elementOffset = $('.o-people').offset().top
                          , elementHeight = $('.o-people').height()
                          , topDistance = (elementOffset - scrollTop);
                        if (topDistance < 1 && Math.abs(topDistance) < elementHeight) {
                            $(".wm-topbar").addClass("is-hidden");
                        } else {
                            $(".wm-topbar").removeClass("is-hidden");
                        }
                    }
                } else if (window.innerWidth < 968 && $(".wm-topbar").hasClass("is-hidden")) {
                    $(".wm-topbar").removeClass("is-hidden");
                }
    
            }
    
        }, 10);
    
        window.addEventListener('scroll', scrollChanges);
    
        // (onload...)
        scrollChanges();
    
        // var pc = document.querySelector('.o-people__content');
        // if (pc !== null) {
        //     if (window.innerWidth >= 1220 && window.innerWidth / window.innerHeight < 1440 / 900) {
        //         pc.classList.add('single-col-thumbs');
        //     }
        // }
    
        // check the people height
        if ($('.m-people-main').outerHeight() && $('.m-people-main').outerHeight() < 770) {
            $('.m-people-main').addClass('js-short');
        } else {
            $('.m-people-main').removeClass('js-short');
        }
    
        window.addEventListener('resize', function() {
            // if (pc !== null) {
            //     if (window.innerWidth >= 1220 && window.innerWidth / window.innerHeight < 1440 / 900) {
            //         pc.classList.add('single-col-thumbs');
            //     } else {
            //         pc.classList.remove('single-col-thumbs');
            //     }
            // }
            if ($('.m-people-main').outerHeight() && $('.m-people-main').outerHeight() < 770) {
                $('.m-people-main').addClass('js-short');
            } else {
                $('.m-people-main').removeClass('js-short');
            }
        });
   }



});
