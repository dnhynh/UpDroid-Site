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

        document.getElementById( 'facebook' ).addEventListener( 'click', function() {
            ga('send', 'event', 'link', 'Facebook linked');
        });

        document.getElementById( 'instagram' ).addEventListener( 'click', function() {
            ga('send', 'event', 'link', 'Instagram linked');
        });

        document.getElementById( 'twitter' ).addEventListener( 'click', function() {
            ga('send', 'event', 'link', 'Twitter linked');
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
        // this.Cycle();
        this.Exploded();
        this.ScrollConfig();
        this.DIYkit();
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
    },
    "Exploded": function () {

        var controller = new ScrollMagic.Controller();

        if ($(document).width() > 992) {
            new ScrollMagic.Scene({
              triggerElement: "#exploded", // starting scene, when reaching this element
              offset: 310,
              duration: 3000 // pin the element for a total of 400px
            })
            .setPin('#exploded')
            .addTo(controller); // the element we want to pin
        }

        else {
            new ScrollMagic.Scene({
              triggerElement: "#exploded", // starting scene, when reaching this element
              offset: 240,
              duration: 3000 // pin the element for a total of 400px
            })
            .setPin('#exploded')
            .addTo(controller); // the element we want to pin
        }


        
        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 540,
            duration: 100
        }).setTween("#start-copy", {opacity: 0})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 540,
            duration: 200
        }).setTween("#arm", {x: "15%", y: "-30%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 640,
            duration: 100
        }).setTween("#arm-copy", {opacity: 1})
        .addTo(controller);

        

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 850,
            duration: 200
        }).setTween("#arm", {x: "-=15%", y: "+=30%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 850,
            duration: 100
        }).setTween("#arm-copy", {opacity: 0})
        .addTo(controller);



        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 950,
            duration: 200
        }).setTween("#io", {y: "-5%", x: "-12%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 950,
            duration: 100
        }).setTween("#io-copy", {opacity: 1})
        .addTo(controller);



        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1350,
            duration: 200
        }).setTween("#io", {y: "+=5%", x: "+=12%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1350,
            duration: 100
        }).setTween("#io-copy", {opacity: 0})
        .addTo(controller);



        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1450,
            duration: 200
        }).setTween("#cpu", {x: "15%", y: "-30%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1450,
            duration: 100
        }).setTween("#cpu-copy", {opacity: 1})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1850,
            duration: 200
        }).setTween("#cpu", {x: "-=15%", y: "+=30%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1850,
            duration: 100
        }).setTween("#cpu-copy", {opacity: 0})
        .addTo(controller);



        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2050,
            duration: 5
        }).setTween("#cpu", {opacity: 0})
        .addTo(controller);


        // Base 

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2050,
            duration: 200
        }).setTween("#arm", {y: "-40%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2050,
            duration: 200
        }).setTween("#io", {y: "-40%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2050,
            duration: 200
        }).setTween("#base", {y: "-20%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1950,
            duration: 100
        }).setTween("#base-copy", {opacity: 1})
        .addTo(controller);



        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2450,
            duration: 200
        }).setTween("#arm", {y: "+=40%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2450,
            duration: 200
        }).setTween("#io", {y: "+=40%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2450,
            duration: 200
        }).setTween("#base", {y: "+=20%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2450,
            duration: 100
        }).setTween("#base-copy", {opacity: 0})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2550,
            duration: 100
        }).setTween("#close-copy", {opacity: 1})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2900,
            duration: 400
        }).setTween("#base", {y: "-200%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2900,
            duration: 400
        }).setTween("#arm", {y: "-200%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2900,
            duration: 400
        }).setTween("#io", {y: "-200%"})
        .addTo(controller);
    },

    "DIYkit": function () {
        // var disclaimer = document.getElementById( 'disclaimer' );
        // var diy = $('#diy-button');
        // diy.on("click", function (event) {
        //     event.preventDefault();
        //     diy.addClass('hidden');
        //     $('#confirm-diy').removeClass('hidden');
        //     disclaimer.className = "expand";
        // });
        $('#confirm-diy').on("click", function(event) {
            if($('#diy-agree').is(':checked') == false) {
                window.alert("Please confirm you understand before proceeding.");
                event.preventDefault();
            }
            else {
                document.getElementById('buy-diy').click();
                event.preventDefault();
            }
        });
    },

    "ScrollConfig": function() {
        var arm = $("#sArm");
        var io = $("#sIO");
        var cpu = $("#sCPU");
        var base = $("#sBase");
        $(document).on("mousewheel", function() {
            console.log("scroll: " + $(document).scrollTop());
            console.log("height: " + $(document).height());
        });

        arm.on('click', function() {

            if($(window).width() < 977) {
                console.log("small");
                console.log($(window).width());
                $('html, body').animate({
                    scrollTop: .263 * $(document).height()
                }, 1000);
            }

            else if($(window).width() < 1185 && $(window).width() >= 977) {
                console.log('med: ' + $(window).width() );
                $('html, body').animate({
                    scrollTop: .282 * $(document).height()
                }, 1000);
            }

            if($(window).width() >= 1185) {
                console.log("large: " + $(window).width());
                $('html, body').animate({
                    scrollTop: .2947 * $(document).height()
                }, 1000);
            }
        });

        io.on('click', function() {

            if($(window).width() < 977) {
                console.log("small");
                console.log($(window).width());
                $('html, body').animate({
                    scrollTop: .34 * $(document).height()
                }, 1000);
            }

            else if($(window).width() < 1185 && $(window).width() >= 977) {
                console.log('med: ' + $(window).width() );
                $('html, body').animate({
                    scrollTop: .34 * $(document).height()
                }, 1000);
            }

            else if($(window).width() >= 1185) {
                console.log("large: " + $(window).width());
                $('html, body').animate({
                    scrollTop: .36 * $(document).height()
                }, 1000);
            }
        });

        cpu.on('click', function() {

            if($(window).width() < 977) {
                console.log("small");
                console.log($(window).width());
                $('html, body').animate({
                    scrollTop: .4015 * $(document).height()
                }, 1000);
            }

            else if($(window).width() < 1185 && $(window).width() >= 977) {
                console.log('med: ' + $(window).width() );
                $('html, body').animate({
                    scrollTop: .41 * $(document).height()
                }, 1000);
            }

            else if($(window).width() >= 1185) {
                console.log("large: " + $(window).width());
                $('html, body').animate({
                    scrollTop: .4373 * $(document).height()
                }, 1000);
            }
        });

        base.on('click', function() {

            if($(window).width() < 977) {
                console.log("small");
                console.log($(window).width());
                $('html, body').animate({
                    scrollTop: .5 * $(document).height()
                }, 1000);
            }

            else if($(window).width() < 1185 && $(window).width() >= 977) {
                console.log('med: ' + $(window).width() );
                $('html, body').animate({
                    scrollTop: .508 * $(document).height()
                }, 1000);
            }

            else if($(window).width() >= 1185) {
                console.log("large: " + $(window).width());
                $('html, body').animate({
                    scrollTop: .5082 * $(document).height()
                }, 1000);
            }
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
        this.typeScene();
        this.animateWings();
    },

    "installClick": function () {
        // var instructions = document.getElementById( 'instructions' );
    
        // document.getElementById( 'install' ).addEventListener( 'click', function() {
        //     ga('send', 'event', 'Downloads', 'Commander Download');
        //     $(instructions).scrollView();
        //     setTimeout(function () {
        //         var height = $(window).scrollTop();

        //         if (height >= $(instructions).offset().top - 300) {
        //             instructions.className = 'expanded';
        //         }
        //     }, 500);
            
        //     $("#close-instructions").click(function() {
        //         instructions.className = '';
        //     });
        // });

        // $.fn.scrollView = function () {
        //   return this.each(function () {
        //     $('html, body').animate({
        //       scrollTop: $(this).offset().top - 100
        //     }, 500);
        //   });
        // }
    },

    "typeScene": function () {
        function startTyping () {
            $(".typing").typed({
                strings: ["UpCom starts with one command.", "cmdr gui"],
                typeSpeed: 50,
                showCursor: true,
                backDelay: 1000,
            });
        }

        $(document).ready(function () {
            $("#upcom-pop").bind('click', false),
            $(window).bind("scroll", checkHeight)
        });

        function checkHeight () {
            var height = $(window).scrollTop();
            if (height >= $(".type").offset().top - 300) {
                startTyping();

                $(window).unbind("scroll", checkHeight);
                setTimeout(function () {
                    $("#terminal").velocity({
                        translateX: "-100%"
                    });
                }, 7000);
                setTimeout(showUpCom, 8000);
            }
        }

        function showUpCom () {
            $("#upcom-empty").velocity("fadeIn", {duration: 500});
            setTimeout(function() {
                $("#upcom-pop").velocity("fadeIn", {duration: 500},
                    {complete: $("#upcom-pop").unbind('click', false)}
                    );
            }, 2000);
        }
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
    },

    "animateWings": function () {
        var wings = $('.top-left-wing, .middle-left-wing, .bot-left-wing, .top-right-wing, .middle-right-wing, .bot-right-wing');
        var left = $('.top-left-wing, .middle-left-wing, .bot-left-wing');
        var right = $('.top-right-wing, .middle-right-wing, .bot-right-wing');
        $(left).velocity({
            translateX: "5px"
        });
        $(right).velocity({
            translateX: "-5px"
        })
        $(wings).velocity("fadeIn", {
            duration: 1500,
            delay: 1000
        });
        $(left).velocity({
            translateX: "0px"
        });
        $(right).velocity({
            translateX: "0px"
        });
    }
};

$(document).ready(function () {
    Global.Init();
});

