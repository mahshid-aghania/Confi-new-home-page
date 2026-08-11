/*
EXPORTED FROM THIS FILE:

- news_listings_load_wp_stories()

not exported
- outputListItem()
- outputListItemNewsBlock()
- outputListItemGrid()
- outputListItemListbox()
- stripTrailingSlash()

 */

/* =============================================================
FUNCTION news_listings_load_wp_stories()

- Load WP stories in News Listings

================================================================= */
export function news_listings_load_wp_stories() {

    /* loop articles with data-wpsrc and run ajax call to get and output thumbnail, title and summary */


    // loop the articles in news list page
    $("article[data-wpsrc]").each(function () {

        $(this).find("header > a").html("Loading&#8230;");

        var strStoryUrl = $(this).attr("data-wpsrc");
        strStoryUrl = stripTrailingSlash(strStoryUrl);


        // get the slug from the url
        var slug = strStoryUrl.substring(strStoryUrl.lastIndexOf('/') + 1);

        var metacontainer = $(this);

        $.ajax({
            url: "https://news.wm.edu/wp-json/wp/v2/posts/?slug=" + slug + "&_embed",
            dataType: "json",
            success: function (data) {
                outputListItem(metacontainer, data[0]);
            },
            error: function (x, y, z) {
                console.log("Error with AJAX: " + y);
            }
        });

    });


    // loop the news listing block items
    $(".dept_news_story[data-wpsrc^='http']").each(function () {

        // get the slug from the url
        var strStoryUrl = $(this).attr("data-wpsrc");
        strStoryUrl = stripTrailingSlash(strStoryUrl);
        var slug = strStoryUrl.substring(strStoryUrl.lastIndexOf('/') + 1);

        var metacontainer = $(this);

        $.ajax({
            url: "https://news.wm.edu/wp-json/wp/v2/posts/?slug=" + slug + "&_embed",
            dataType: "json",
            success: function (data) {
                outputListItemNewsBlock(metacontainer, data[0]);
            },
            error: function (x, y, z) {
                console.log("Error with AJAX: " + y);
            }
        });

    });


    // loop the news listbox items
    $("span.listbox_story[data-wpsrc^='http']").each(function () {

        var showSummary = $(this).attr("data-summary");

        // get the slug from the url
        var strStoryUrl = $(this).attr("data-wpsrc");
        strStoryUrl = stripTrailingSlash(strStoryUrl);
        var slug = strStoryUrl.substring(strStoryUrl.lastIndexOf('/') + 1);

        var metacontainer = $(this);

        $.ajax({
            url: "https://news.wm.edu/wp-json/wp/v2/posts/?slug=" + slug + "&_embed",
            dataType: "json",
            success: function (data) {
                outputListItemListbox(metacontainer, data[0], showSummary);
            },
            error: function (x, y, z) {
                console.log("Error with AJAX: " + y);
            }
        });

    });


    // Loop the Color Grid News items
    $(".grid-item[data-wpsrc^='http']").each(function () {

        // get the slug from the url
        var strStoryUrl = $(this).attr("data-wpsrc");
        strStoryUrl = stripTrailingSlash(strStoryUrl);
        var slug = strStoryUrl.substring(strStoryUrl.lastIndexOf('/') + 1);

        var metacontainer = $(this);

        $.ajax({
            url: "https://news.wm.edu/wp-json/wp/v2/posts/?slug=" + slug + "&_embed",
            dataType: "json",
            success: function (data) {
                outputListItemGrid(metacontainer, data[0]);
            },
            error: function (x, y, z) {
                console.log("Error with AJAX: " + y);
            }
        });

    });


}




function stripTrailingSlash(str) {
    if (str.substr(-1) === '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}

// works for standard news listing pages
function outputListItem(metacontainer, data) {
    // AUTHOR
    let authorName = data.acf.custom_author_text.trim(); // optional custom over-ride
    if (authorName == "") {
        authorName = data._embedded.author[0].name;
    }
    metacontainer.find(".author").html(authorName);
    // EXCERPT
    metacontainer.append(data.excerpt.rendered);
    // TITLE
    metacontainer.find("header > a").html(data.title.rendered);
    // THUMBNAIL
    if (data._embedded['wp:featuredmedia']) {
        var storyLink = metacontainer.find("header > a").attr("href");
        //$("#my_image").attr("src","second.jpg");
        var myThumb = metacontainer.find(".news-listing-thumb img");
        myThumb.attr("src", data._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        myThumb.attr("alt", data._embedded['wp:featuredmedia'][0].alt_text);
    }
}

// the format of news blocks are a little different....
function outputListItemNewsBlock(metacontainer, data) {
    // EXCERPT
    metacontainer.append(data.excerpt.rendered);
    // TITLE
    metacontainer.find(".dept_news_story_title").html(data.title.rendered);
    // THUMBNAIL
    if (data._embedded['wp:featuredmedia']) {
        var storyLink = metacontainer.find(".dept_news_story_title").attr("href");
        var myThumb = metacontainer.find(".dept_news_story_img img");
        myThumb.attr("src", data._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
        myThumb.attr("alt", data._embedded['wp:featuredmedia'][0].alt_text);
        //metacontainer.prepend( '<a class="dept_news_story_img" href="'+storyLink+'"><img src="'+data._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url+'" alt="'+data._embedded['wp:featuredmedia'][0].alt_text+'"/></a>');
    }
}

// the format of listboxes are a little different....
function outputListItemListbox(metacontainer, data, showSummary) {
    // EXCERPT
    if (showSummary == "Yes") {
        metacontainer.append('<div class="listing-desc">' + data.excerpt.rendered + '</div>');
    }
    // TITLE
    metacontainer.find(".listing-link").html(data.title.rendered);

}


// the format of color grid news cards are a little different....
function outputListItemGrid(metacontainer, data) {
    // IMAGE
    if (data._embedded['wp:featuredmedia']) {
        var myThumb = metacontainer.find(".image__wrapper img");
        myThumb.attr("src", data._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url);
        myThumb.attr("alt", data._embedded['wp:featuredmedia'][0].alt_text);
        myThumb.css('opacity', '1');

    }
    // TITLE
    var myTitle = metacontainer.find(".content__title");
    myTitle.html(data.title.rendered);
    myTitle.css('opacity', '1');

}
