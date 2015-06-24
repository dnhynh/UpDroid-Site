/*****************************************************/
/*                    Global                         */
/*****************************************************/
var Global =
{
    "Init": function () {
        this.Navigation();
        this.BorderFade();
        this.HeaderIcons();
        this.BackToTop();
    },
    "Navigation": function () {
        // Setup push navigation using slidebars plugin
        var navigationSlidebar = new $.slidebars();

        // Intercept the navigation link clicks so the nav is closed before redirecting
        $("#main-navigation").on("click", "a", function (event) {
            event.preventDefault();
            navigationSlidebar.slidebars.close();
            var href = $(this).attr("href");

            setTimeout(function () {
                window.location.href = href;
            }, 1000);
        });
    },
    "BorderFade": function () {
        // Fade the red site border in, 2 seconds after the page has finished loading
        setTimeout(function () {
            $("body").addClass("padding-active");
        }, 2000);
    },
    "HeaderIcons": function () {
        var $header = $("#header");

        $(window).scroll(function () {
            // Remove header icons after scroll passes 20 px
            if ($(this).scrollTop() >= 20) {
                $header.addClass("inactive");
            }
            else {
                $header.removeClass("inactive");
            }
        });
    },
    "BackToTop": function () {
        var windowHeight = $(window).height(),
            documentHeight = $(document).height(),
            $backTop = $("#back-top");

        $(window).scroll(function () {
            // Animate in the back to top arrow when the scrollbar is at the bottom of the page (offset 20 pixels)
            if ($(this).scrollTop() + windowHeight >= documentHeight - 20) {
                $backTop.addClass("active");
            }
            else {
                $backTop.removeClass("active");
            }
        });

        // Scroll to top of page when back to top arrow is clicked
        $("#sb-site").on("click", "#back-top", function () {
            $("html, body").animate({scrollTop: 0}, 800);
        });
    }
};

/*****************************************************/
/*                   Homepage                        */
/*****************************************************/
var Homepage =
{
    "Init": function () {
        this.Parallax();
        this.Cycle();
    },
    "Parallax": function () {
        // Simple test for Mobile Safari
        var isMobileSafari = navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/) && !navigator.userAgent.match("CriOS");

        if (!Modernizr.touch || isMobileSafari) {
            var scrollTop,
                $parallax1 = $("#parallax-1"),
                $parallax2 = $("#parallax-2"),
                $parallax3 = $("#parallax-3"),
                $parallax4 = $("#parallax-4");

            $(window).scroll(function () {
                scrollTop = $(this).scrollTop();

                // Fade out the dots & type connectors when the user scrolls 20 pixels from the top
                scrollTop >= 20 ? $parallax1.addClass("inactive") : $parallax1.removeClass("inactive");

                // Start the parallax effect after 10 pixels has been scrolled
                scrollTop <= 10 ? scrollTop = 0 : scrollTop = scrollTop - 10;

                // When the user scrolls, animate the 3 different parallax sections at different ratios
                $parallax2.css("transform", "translateY(-" + (scrollTop * 1.5) + "px)");
                $parallax3.css("transform", "translateY(-" + (scrollTop / 2) + "px)");
                $parallax4.css("transform", "translateY(-" + (scrollTop / 3) + "px)");
            });
        }
    },
    "Cycle": function () {
        // Cycle robot image set on click of image (non touch devices only)
        $("html.no-touch #sb-site").on("click", "div.images", function () {
            $("div.images").find(".cycle-slideshow").cycle("next");
        });

        // Stop the above click event happening on the pager links
        $("html.no-touch #sb-site").on("click", "div.cycle-pager", function (event) {
            event.stopPropagation();
        });
    }
};

/*****************************************************/
/*                   Contact                         */
/*****************************************************/
var Contact =
{
    "Init": function () {
        this.FormValidation();
    },
    "FormValidation": function () {
        // Contact form validation
        $("#ss-form").validate( {
            errorPlacement: function(error, element) {}
        });

        // Newsletter form validation
        $("#mc-embedded-subscribe-form").validate( {
            errorPlacement: function(error, element) {}
        });
    }
};

/*****************************************************/
/*                   UpCom                           */
/*****************************************************/

var UpCom = 
{
    "Init": function () {
        this.installClick();
        this.loadView();
        this.resizeListen();
    },

    "installClick": function () {
        var instructions = document.getElementById( 'instructions' );
    
        document.getElementById( 'install' ).addEventListener( 'click', function() {
            ga('send', 'event', 'Downloads', 'Commander Download');
            $(instructions).scrollView();
            setTimeout(function () {
                var height = $(window).scrollTop();

                if (height >= $(instructions).offset().top - 300) {
                    instructions.className = 'expanded';
                }
            }, 500);
            
            $("#close-instructions").click(function() {
                instructions.className = '';
            });
        });
    },

    "loadView": function () {
        $(document).ready(function(){
        if($(window).width()< 768)
            {
                $("#tidy").remove().insertBefore($("#tidy-switch"));
                $("#controls").remove().insertBefore($("#controls-switch"));
            }
        });
    },

    "resizeListen": function () {
        $(document).load($(window).bind("resize", listenWidth));

        function listenWidth( e ) {
        if($(window).width()<768)
            {
                $("#tidy").remove().insertBefore($("#tidy-switch"));
                $("#controls").remove().insertBefore($("#controls-switch"));
            } else {
                $("#tidy").remove().insertAfter($("#tidy-switch"));
                $("#controls").remove().insertAfter($("#controls-switch"));
            }
        }
    }
};

/*****************************************************/
/*                   Homepage                        */
/*****************************************************/
var Up1 =
{
    "Init": function () {
        this.Cycle();
    },
    "Cycle": function () {
        // Cycle robot image set on click of image (non touch devices only)
        $("html.no-touch #sb-site").on("click", "#modules-slider", function () {
            $(this).find(".cycle-slideshow").cycle("next");
        });

        // Stop the above click event happening on the pager links
        $("html.no-touch #sb-site").on("click", "div.cycle-pager", function (event) {
            event.stopPropagation();
        });
    }
};

$(document).ready(function () {
    Global.Init();
});

