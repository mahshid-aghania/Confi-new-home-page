const { runTests, addCheck } = await import('./_run_tests_var.js');

/* ============================================================
   Image → Link Click Proxy
   Used in TEST / DEV to simulate block-link behavior
   ============================================================ */

export function init_image_click_proxies() {

    const configs = [
        {
            container: '.directory_listing',
            trigger: '.js-directory-image',
            target: '.person_name'
        },
        {
            container: '.news_listing',
            trigger: '.js-news-image',
            target: 'header a'
        },
        {
            container: '.news_listing',
            trigger: '.js-as-image',
            target: '.dept_news_story_title'
        },
        {
            container: '.feature_listing',
            trigger: '.js-feature-image',
            target: 'header a'
        },
        {
            container: '.widget',
            trigger: '.js-widget-image',
            target: 'figcaption a'
        }
    ];

    configs.forEach(function(config){

        document.querySelectorAll(config.container).forEach(function(container){

            const trigger = container.querySelector(config.trigger);
            if (!trigger) return;

            trigger.addEventListener('click', function(){

                const targetLink = container.querySelector(config.target);
                if (!targetLink) return;

                targetLink.click();

            });

        });

    });

}