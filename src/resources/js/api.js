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
        var navigationSlidebar = new $.slidebars({scrollLock: true});

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
        this.Video();
        // this.Commander();
        this.Events();
        // this.Newsletter();
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

    // "Newsletter": function () {
    //     function setCookie(cname, cvalue, exdays) {
    //         var d = new Date();
    //         d.setTime(d.getTime() + (exdays*24*60*60*1000));
    //         var expires = "expires="+d.toUTCString();
    //         document.cookie = cname + "=" + cvalue + "; " + expires;
    //     }

    //     function getCookie(cname) {
    //         var name = cname + "=";
    //         var ca = document.cookie.split(';');
    //         for(var i=0; i<ca.length; i++) {
    //             var c = ca[i];
    //             while (c.charAt(0)==' ') c = c.substring(1);
    //             if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    //         }
    //         return "";
    //     }

    //     $(document).ready(function () {
    //         function validateEmail(email) {
    //             var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    //             return re.test(email);
    //         }

    //         $("#mc-embedded-subscribe").click(function() {
    //             var email = $("#mce-EMAIL").val();

    //             if(validateEmail(email) == true) {
    //                 setCookie("mailingList", "subscribed", 365);
    //             }
    //         });

    //         var inst = $('[data-remodal-id=newsletter]').remodal();
    //         if(getCookie("updroidVisitor") != "visited") {
    //             inst.open();
    //             setCookie("updroidVisitor", "visited", 1);
    //         }
    //     });
    // },

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
    },

    "DIYkit": function () {
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

    "Events": function () {
        document.getElementById( 'top-order' ).addEventListener( 'click', function() {
            ga('send', 'event', 'link', 'PreOrder', 'button-top');
        });

        document.getElementById( 'bottom-order' ).addEventListener( 'click', function() {
            ga('send', 'event', 'link', 'PreOrder', 'button-bottom');
        });

        document.getElementById( 'confirm-diy' ).addEventListener( 'click', function() {
            ga('send', 'event', 'link', 'PreOrder', 'confirmed');
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
        this.typeScene();
        this.loadView();
        this.resizeListen();
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

    // "slideScreens": function () {
    //     $('#screens-slider').slick({
    //         autoplay: false
    //     });

    //     $('video').hover(function toggleControls() {
    //         if (this.hasAttribute("controls")) {
    //             this.removeAttribute("controls")
    //         } else {
    //             this.setAttribute("controls", "controls")
    //         }
    //     });

    //     var video = $('#screens-slider .slick-active').find('video');
    //     video.get(0).play();
    
    //     $('#screens-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
    //         video.get(0).pause();
    //         video = $('#screens-slider .slick-active').find('video');
    //         video.get(0).play();
    //     });
    // },

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

