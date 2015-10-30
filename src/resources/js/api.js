﻿/*****************************************************/
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
        this.Exploded();
        this.Parallax();
        this.DIYkit();
        this.Youtube();
        this.Video();
        this.Commander();
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
    
    "Youtube": function () {
        var trigger = $("#play-video");
        trigger.click(function () {
          var theModal = $('.up1-video'),
              videoSRC = 'https://www.youtube.com/embed/uxpDa-c-4Mc',
              videoSRCauto = videoSRC + "?autoplay=1";
          $(theModal).find('iframe').attr('src', videoSRCauto);
          var closeButton = $(theModal).find('.icon-cross')
          closeButton.click(function () {
              $(theModal, 'iframe').attr('src', videoSRC);
            });
        });

        $(document).on('closing', '.remodal', function (e) {
          // Reason: 'confirmation', 'cancellation'
          console.log('Modal is closing' + (e.reason ? ', reason: ' + e.reason : ''));
        });
    },

    "Video": function () {
        $('.play-center').hover(function () {
            $('.play-icon-center').addClass('red');
        }, function () {
            $('.play-icon-center').removeClass('red');
        });

        $('.play, .play-center').bind("click touchstart", function (event) {
            document.getElementById('play-video').click();
        });
    },
    // "Cycle": function () {
    //     // Cycle robot image set on click of image (non touch devices only)
    //     $("html.no-touch #sb-site").on("click", "div.images", function () {
    //         $("div.images").find(".cycle-slideshow").cycle("next");
    //     });

    //     // Stop the above click event happening on the pager links
    //     $("html.no-touch #sb-site").on("click", "div.cycle-pager", function (event) {
    //         event.stopPropagation();
    //     });
    // },
    "Exploded": function () {
        var arm = $("#sArm");
        var io = $("#sIO");
        var cpu = $("#sCPU");
        var base = $("#sBase");

        var controller = new ScrollMagic.Controller();

        if ($(document).width() > 992) {
            new ScrollMagic.Scene({
              triggerElement: "#exploded", 
              offset: 310,
              duration: 3000
            })
            .setPin('#exploded')
            .addTo(controller);

        }

        else {
            new ScrollMagic.Scene({
              triggerElement: "#exploded", 
              offset: 240,
              duration: 3000 
            })
            .setPin('#exploded')
            .addTo(controller);

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

        // arm scene duration, highlight pagination button

        var armScene = new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 540,
            duration: 500
        }).addTo(controller);

        armScene.on('enter', function(event) {
            arm.addClass('active');
        });

        armScene.on('leave', function(event) {
            arm.removeClass('active');
        });


        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 950,
            duration: 200
        }).setTween("#arm", {x: "-=15%", y: "+=30%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 950,
            duration: 100
        }).setTween("#arm-copy", {opacity: 0})
        .addTo(controller);

        // Io scene duration, highlight pagination button

        var ioScene = new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1150,
            duration: 500
        }).addTo(controller);

        ioScene.on('enter', function(event) {
            io.addClass('active');
        });

        ioScene.on('leave', function(event) {
            io.removeClass('active');
        });

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1150,
            duration: 200
        }).setTween("#io", {y: "-5%", x: "-12%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1150,
            duration: 100
        }).setTween("#io-copy", {opacity: 1})
        .addTo(controller);



        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1550,
            duration: 200
        }).setTween("#io", {y: "+=5%", x: "+=12%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1550,
            duration: 100
        }).setTween("#io-copy", {opacity: 0})
        .addTo(controller);

        // CPU scene duration, highlight pagination button

        var cpuScene = new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1750,
            duration: 500
        }).addTo(controller);

        cpuScene.on('enter', function(event) {
            cpu.addClass('active');
        });

        cpuScene.on('leave', function(event) {
            cpu.removeClass('active');
        });



        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1750,
            duration: 200
        }).setTween("#cpu", {x: "15%", y: "-30%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1750,
            duration: 100
        }).setTween("#cpu-copy", {opacity: 1})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2150,
            duration: 200
        }).setTween("#cpu", {x: "-=15%", y: "+=30%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2150,
            duration: 100
        }).setTween("#cpu-copy", {opacity: 0})
        .addTo(controller);

        // Remove cpu to make animation simpler

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2350,
            duration: 5
        }).setTween("#cpu", {opacity: 0})
        .addTo(controller);


        // Base scene start, highlight pagination button

        var baseScene = new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2350,
            duration: 500
        }).addTo(controller);

        baseScene.on('enter', function(event) {
            base.addClass('active');
        });

        baseScene.on('leave', function(event) {
            base.removeClass('active');
        });

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2350,
            duration: 200
        }).setTween("#arm", {y: "-40%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2350,
            duration: 200
        }).setTween("#io", {y: "-40%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2350,
            duration: 200
        }).setTween("#base", {y: "-20%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2250,
            duration: 100
        }).setTween("#base-copy", {opacity: 1})
        .addTo(controller);



        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2750,
            duration: 200
        }).setTween("#arm", {y: "+=40%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2750,
            duration: 200
        }).setTween("#io", {y: "+=40%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2750,
            duration: 200
        }).setTween("#base", {y: "+=20%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2750,
            duration: 100
        }).setTween("#base-copy", {opacity: 0})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2850,
            duration: 100
        }).setTween("#close-copy", {opacity: 1})
        .addTo(controller);

        // var poochie = $("#poochie");

        // poochie.on('click', function() {

        //     if ($(document).width() > 992) {
        //         new ScrollMagic.Scene({
        //           triggerElement: "#exploded", // starting scene, when reaching this element
        //           offset: 3310,
        //           duration: 2000 // pin the element for a total of 400px
        //         })
        //         .setPin('#exploded')
        //         .addTo(controller); // the element we want to pin
        //     }

        //     else {
        //         new ScrollMagic.Scene({
        //           triggerElement: "#exploded", // starting scene, when reaching this element
        //           offset: 3240,
        //           duration: 800 // pin the element for a total of 400px
        //         })
        //         .setPin('#exploded')
        //         .addTo(controller); // the element we want to pin
        //     }

        //     new ScrollMagic.Scene({
        //     triggerElement: "#exploded",
        //         offset: 2850,
        //         duration: 100
        //     }).setTween("#close-copy", {opacity: 0})
        //     .addTo(controller);

        //     new ScrollMagic.Scene({
        //         triggerElement: "#exploded",
        //         offset: 3250,
        //         duration: 100
        //     }).setTween("#poochie-copy", {opacity: 1})
        //     .addTo(controller);

        //     new ScrollMagic.Scene({
        //         triggerElement: "#exploded",
        //         offset: 3300,
        //         duration: 400
        //     }).setTween("#base", {y: "-200%"})
        //     .addTo(controller);

        //     new ScrollMagic.Scene({
        //         triggerElement: "#exploded",
        //         offset: 3300,
        //         duration: 400
        //     }).setTween("#arm", {y: "-200%"})
        //     .addTo(controller);

        //     new ScrollMagic.Scene({
        //         triggerElement: "#exploded",
        //         offset: 3300,
        //         duration: 400
        //     }).setTween("#io", {y: "-200%"})
        //     .addTo(controller);

        //     if($(window).width() < 977) {
        //         console.log("small");
        //         console.log($(window).width());
        //         $('html, body').animate({
        //             scrollTop: .5 * $(document).height()
        //         }, 1000);
        //     }

        //     else if($(window).width() < 1185 && $(window).width() >= 977) {
        //         console.log('med: ' + $(window).width() );
        //         $('html, body').animate({
        //             scrollTop: .508 * $(document).height()
        //         }, 1000);
        //     }

        //     else if($(window).width() >= 1185) {
        //         console.log("large: " + $(window).width());
        //         $('html, body').animate({
        //             scrollTop: .5082 * $(document).height()
        //         }, 1000);
        //     }
        // });
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
        $('#confirm-diy').bind("click touchstart", function (event) {
            var apple = navigator.userAgent.match(/(iPod|iPhone|iPad)/);
            if($('#diy-agree').is(':checked') == false) {
                window.alert("Please confirm you understand before proceeding.");
                event.preventDefault();
            }
            else {
                if(apple == null) {
                    document.getElementById('buy-diy').click();
                    event.preventDefault();
                }
                else {
                    window.open('https://updroid.tilt.com/up1-dev-kit/checkout/payment');
                }
            }
        });
    },

    "Commander": function () {
        $('.commander-slider').slick({
            autoplay: false,
            pauseOnDotsHover: true,
            adaptiveHeight: true,
            dots: true,
            arrows: false,
        });
    },
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
        this.slideScreens();
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

    "slideScreens": function () {
        $('#screens-slider').slick({
            autoplay: false
        });

        $('video').hover(function toggleControls() {
            if (this.hasAttribute("controls")) {
                this.removeAttribute("controls")
            } else {
                this.setAttribute("controls", "controls")
            }
        });

        var video = $('#screens-slider .slick-active').find('video');
        video.get(0).play();
    
        $('#screens-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
            video.get(0).pause();
            video = $('#screens-slider .slick-active').find('video');
            video.get(0).play();
        });
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

