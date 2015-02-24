/*****************************************************/
/*                    Global                         */
/*****************************************************/
var Global =
{
    "Init": function () {

    }
};

/*****************************************************/
/*                    Utils                          */
/*****************************************************/
var Utils =
{
    "Placeholder": function(){
        // Add placeholder support for browsers that don't support it
        $("input, textarea").placeholder();
    },
	"SelectBox": function(){
		// Select boxes
		$("select").selectBoxIt({ "autoWidth": false });
	}
};

/*****************************************************/
/*                   Homepage                        */
/*****************************************************/
var Homepage =
{
    "Init": function () {
        Utils.Placeholder();
		Utils.SelectBox();
        this.EnhanceFormElements();
        this.Video();
    },
    "EnhanceFormElements": function () {
        // Course type radio buttons
        $("#course-type").buttonset();

        // Other info checkboxes
        $("#other-info").buttonset();
    },
    "Video": function () {
        // Call FitVids as soon as the page is loaded
        $("#homepage header div.row").fitVids();

        var $videoWrapper = $("#homepage header .fluid-width-video-wrapper"),
            $body = $("body"),
            video = $("#video")[0],
            player = $f(video);

        // Show the video on click of the play link & play the video
        $("#homepage").on("click", "#play", function(e) {
            e.preventDefault();

            $body.append("<div id='video-overlay'></div>");
            $videoWrapper.addClass("show").append("<a id='video-close'><span class='icon-cross'></div>");
            player.api("play");
        });

        // Hide the video on click of the close link & pause the video
        $("#homepage").on("click", "#video-close", function(e) {
            e.preventDefault();

            $("#video-overlay").remove();
            $videoWrapper.removeClass("show");
            player.api("pause");
        });
    }
};

/*****************************************************/
/*                    Results                        */
/*****************************************************/
var Results =
{
    "Init": function () {
        this.Navigation();
        this.Video();
        this.Masonry();
        this.Carousel();
    },
    "Navigation": function () {
        $.slidebars({
            scrollLock: true // true or false
        });
    },
    "Video": function () {
        $("#results div.media, div.modules div.video").fitVids();
    },
    "Masonry": function () {
        var $container = $("#results div.modules");
        $container.imagesLoaded( function() {
            $container.masonry({
                itemSelector: ".item"
            });
        });
    },
    "Carousel": function () {
        var $carousel = $("#results div.jcarousel");
        $carousel
            .on("jcarousel:create jcarousel:reload", function() {
                var element = $(this),
                    width = element.innerWidth();

                element.jcarousel("items").css("width", width + "px");
            })
            .jcarousel({
        });

        $(".jcarousel-prev")
            .on("jcarouselcontrol:active", function() {
                $(this).removeClass("disabled");
            })
            .on("jcarouselcontrol:inactive", function() {
                $(this).addClass("disabled");
            })
            .jcarouselControl({
                target: "-=1"
            }
        );

        $(".jcarousel-next")
            .on("jcarouselcontrol:active", function() {
                $(this).removeClass("disabled");
            })
            .on("jcarouselcontrol:inactive", function() {
                $(this).addClass("disabled");
            })
            .jcarouselControl({
                target: "+=1"
            }
        );
    }
};

/*****************************************************/
/*                   Save                           */
/*****************************************************/
var Save =
{
	"Init": function () {
        Utils.Placeholder();
		Utils.SelectBox();
	}
};

$(document).ready(function () {
    Global.Init();
});