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
        this.Commander();
        this.Events();
        this.Newsletter();
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

        var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "150%"}});

        // build scenes
        new ScrollMagic.Scene({triggerElement: ".parallax-photo"})
            .setTween(".parallax-photo > div", {y: "70%", ease: Linear.easeNone})
            .addTo(controller);
    },

    "Newsletter": function () {
        var inst = $('[data-remodal-id=newsletter]').remodal();
        var bottomed = false;

        // Detect scroll to bottom and show mailing list sign up
        $(document).scroll(function () {
            var height = $(document).height();
            var scrollTop = ($(window).scrollTop() + $(window).height());
            if (height - scrollTop <= 20 && bottomed == false) {
                inst.open();
                bottomed = true;
            }
        });

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        }

        // $(document).ready(function () {
        //     function validateEmail(email) {
        //         var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        //         return re.test(email);
        //     }

        //     $("#mc-embedded-subscribe").click(function() {
        //         var email = $("#mce-EMAIL").val();

        //         if(validateEmail(email) == true) {
        //             setCookie("mailingList", "subscribed", 365);
        //         }
        //     });

        //     var inst = $('[data-remodal-id=newsletter]').remodal();
        //     if(getCookie("updroidVisitor") != "visited") {
        //         inst.open();
        //         setCookie("updroidVisitor", "visited", 1);
        //     }
        // });
    },

    "Video": function () {
        $('.play-center').hover(function () {
            $('.play-icon-center').addClass('red');
        }, function () {
            $('.play-icon-center').removeClass('red');
        });

        $('.play, .play-center').bind("click", function (event) {
            document.getElementById('play-video').click();
            var content = $("#content-left,#content-right"); 
            var video = $(".youtube");

            content.addClass('fade');
            video.addClass("visible");
            content.css({"position": "absolute", "padding": "0"});
            // setTimeout(function () {content.css({"position": "absolute", "padding": "0"})}, 500);

            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            if(check == true) {
                $("#video").css("height", "60vw");
            }
            else {
                $("#video").css("height", "57vw");
            }
            $("#video .row").css("padding", "0");
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
        var armCopy = $("#arm-copy");
        var ioCopy = $("#io-copy");
        var cpuCopy = $("#cpu-copy");
        var baseCopy = $("#base-copy");

        var controller = new ScrollMagic.Controller();
        var offset = ($("#exploded").height()/2);

        new ScrollMagic.Scene({
          triggerElement: "#exploded", 
          offset: offset,
          duration: 3000
        })
        .setPin('#exploded')
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 540,
            duration: 200
        }).setTween("#arm", {x: "15%", y: "-30%"})
        .addTo(controller);

        // arm scene duration, highlight pagination button

        var armScene = new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 540,
            duration: 500
        }).addTo(controller);

        armScene.on('enter', function(event) {
            armCopy.addClass('active');
        });

        armScene.on('leave', function(event) {
            armCopy.removeClass('active');
        });


        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 950,
            duration: 200
        }).setTween("#arm", {x: "-=15%", y: "+=30%"})
        .addTo(controller);

        // Io scene duration, highlight pagination button

        var ioScene = new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1150,
            duration: 500
        }).addTo(controller);

        ioScene.on('enter', function(event) {
            ioCopy.addClass('active');
        });

        ioScene.on('leave', function(event) {
            ioCopy.removeClass('active');
        });

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1150,
            duration: 200
        }).setTween("#io", {y: "-5%", x: "-12%"})
        .addTo(controller);



        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1550,
            duration: 200
        }).setTween("#io", {y: "+=5%", x: "+=12%"})
        .addTo(controller);

        // CPU scene duration, highlight pagination button

        var cpuScene = new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1750,
            duration: 500
        }).addTo(controller);

        cpuScene.on('enter', function(event) {
            cpuCopy.addClass('active');
        });

        cpuScene.on('leave', function(event) {
            cpuCopy.removeClass('active');
        });



        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 1750,
            duration: 200
        }).setTween("#cpu", {x: "15%", y: "-30%"})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#exploded",
            offset: 2150,
            duration: 200
        }).setTween("#cpu", {x: "-=15%", y: "+=30%"})
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
            baseCopy.addClass('active');
        });

        baseScene.on('leave', function(event) {
            baseCopy.removeClass('active');
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
        function startTyping (num) {
            if(num == 1) {
                $("#editor1").typed({
                    strings: ["updroid.move(2)"],
                    typeSpeed: 50,
                    showCursor: true,
                    startDelay: 1000,
                    backDelay: 3000,
                    loop: true,

                    callback: function() {
                        
                    }
                });
            }

            else if (num == 2) {
                $("#editor2").typed({
                    strings: ["updroid.view(depth)"],
                    typeSpeed: 50,
                    showCursor: true,
                    startDelay: 1000,
                    backDelay: 3000,
                    loop: true,
                    callback: function() {

                    }
                });
            }
        }

        $('.commander-slider').slick({
            autoplay: false,
            pauseOnDotsHover: true,
            adaptiveHeight: true,
            dots: true,
            arrows: false,
        });

        $('.commander-slider').on('afterChange', function(event, slick, currentSlide){
            if(currentSlide == 1) {
                startTyping(1);
            }
            else if (currentSlide == 2) {
                startTyping(2);
            }
        });
    },

    "Events": function () {
        document.getElementById( 'top-order' ).addEventListener( 'click', function() {
            ga('send', 'event', 'link', 'MailingList', 'button-top');
        });

        // document.getElementById( 'bottom-order' ).addEventListener( 'click', function() {
        //     ga('send', 'event', 'link', 'PreOrder', 'button-bottom');
        // });

        // document.getElementById( 'confirm-diy' ).addEventListener( 'click', function() {
        //     ga('send', 'event', 'link', 'PreOrder', 'confirmed');
        // });
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
        this.animateWings();
        this.app();
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

    "app": function () {
        var commander = $("#commander");
        var explorer = $("#explorer");
        var editor = $("#editor");
        var terminal = $("#console");

        var controller = new ScrollMagic.Controller();

        // new ScrollMagic.Scene({
        //   triggerElement: "#app", 
        //   offset: 200,
        // }).setTween(explorer, 0.2, {x: "-30px", height: "+=100px"}).addTo(controller);
        
        // new ScrollMagic.Scene({
        //   triggerElement: "#app", 
        //   offset: 200,
        // }).setTween(editor, .2, {height: "+=100px"}).addTo(controller);
        
        // new ScrollMagic.Scene({
        //   triggerElement: "#app", 
        //   offset: 200,
        // }).setTween(terminal, .2, {x: "30px", height: "+=100px"}).addTo(controller);
        
        var origHeight = explorer[0].height + "px";
        var transformHeight = explorer[0].height * 1.1 + "px";
        explorer.hover(function () {
            explorer.css("transform", "translateX(-20%) scale(1.1)");
        }, function() {
            explorer.css("transform", "translateX(0) scale(1)");
        });

        editor.hover(function () {
            explorer.css("transform", "translateX(-30%)");
            terminal.css("transform", "translateX(10%)");            
            editor.css("transform", "scale(1.1)");
        }, function() {
            editor.css("transform", "scale(1)");
            explorer.css("transform", "translateX(0)");
            terminal.css("transform", "translateX(0)");
        });

        terminal.hover(function () {           
            terminal.css("transform", "translateX(10%) scale(1.1)");
        }, function() {
            terminal.css("transform", "translateX(0) scale(1)");
        });
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

