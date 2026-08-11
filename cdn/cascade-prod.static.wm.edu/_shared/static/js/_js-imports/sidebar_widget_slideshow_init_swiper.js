const { runTests, addCheck } = await import('./_run_tests_var.js');

/* =============================================================
FUNCTION widget_slideshow_init_swiper()

- Swiper

================================================================= */
export function sidebar_widget_slideshow_init_swiper() {
    
    
    var num_rotating_widgets = $('.rotating-widget').length;
    var swipers = [];
    var swiperCascadeIds = [];
    
    $(".rotating-widget").each(function(i) {
        swiperCascadeIds[i] = $(this).data("cascadeid"); 
    });

    for (let i=0; i < num_rotating_widgets; i++) {

        var selString = ".rw-"+swiperCascadeIds[i];
        var numEntries = $(selString).find(".swiper-slide").length;
        var randPhoto = Math.floor(Math.random() * numEntries);
        
        //console.log("selString:"+selString);
        
        swipers[i] = new Swiper(selString, {
            autoHeight: true,
            slidesPerView: 1,
            loop: true,
            initialSlide: randPhoto,
            fadeEffect: {
                crossFade: true,
            },
            effect: "fade",
            speed: 800,
            a11y: true,
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
            on:{
              init:function(){
                var mediaHeight = $(selString).find(".swiper-slide-active").find("img").height();
                if(!mediaHeight) {
                   var mediaHeight = 200;
                }
                var totalHeight = mediaHeight + 4;
                
                $(selString).next(".widget-arrows").css({
            		top: totalHeight + "px"
            	});
            	//console.log("init:"+totalHeight);
              },
              slideChange:function(){
                var mediaHeight = $(selString).find(".swiper-slide-active").find("img").height();
                if(!mediaHeight) {
                   var mediaHeight = 200;
                }
                var totalHeight = mediaHeight + 4;
                
                $(selString).next(".widget-arrows").css({
            		top: totalHeight + "px"
            	});
            	//console.log("slideChange:"+totalHeight);
              }
            },
            navigation: {
                nextEl: ".swiper-next-" + swiperCascadeIds[i],
                prevEl: ".swiper-prev-" + swiperCascadeIds[i],
            },
        });
        
    }

}