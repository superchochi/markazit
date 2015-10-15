$(function() {
    $(window).on("resize", function() {
        var w = ((window.innerWidth - $("#mainContainer").width()) / 2) - 15;
        $(".background1").css("width", w);
        $(".background2").css("width", w)
    });
    $('.dropdown-menu').parent().on('show.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });
    $('.dropdown-menu').parent().on('hide.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });

    $('#menu').on('hide.bs.collapse', function() {
        $("#menu").css("background", "");
    });
    $('#menu').on('show.bs.collapse', function() {
        $("#menu").css("background", "#a77649");
    });
});

function updateMenu() {
    if (window.innerWidth / 16 > 47.9375) {
        if ($(this).scrollTop() > $("#topImage").height() - $("#menu").height()) {
            $("#menu").removeClass("menu-default");
            $("#menu").addClass("menu-top");
            $("#logo").css({"opacity": "1", "visibility": "visible", "margin-left": "1.8%"});
            $("#galleryGrid").css({"padding-top": "calc(1% + 86px)"});
        } else if ($(this).scrollTop() < $("#topImage").height()) {
            $("#menu").removeClass("menu-top");
            $("#menu").addClass("menu-default");
            $("#logo").css({"opacity": "0", "visibility": "hidden", "margin-left": "-10%"});
            $("#galleryGrid").css({"padding-top": "1%"});
        }
    } else {
        $("#menu").removeClass("menu-top");
        $("#menu").addClass("menu-default");
        $("#logo").css({"opacity": "0", "visibility": "hidden", "margin-left": "-10%"});
    }
}

$(window).scroll(function() {
    var docElement = $(document)[0].documentElement;
    var winElement = $(window)[0];

    var subtract = docElement.scrollHeight - winElement.innerHeight;
    if ((subtract <= winElement.pageYOffset)) { //|| (subtract == winElement.pageYOffset - 1)){
        $("#footerContainer").slideDown(300);
        //alert("bottom");
    }
    else {
        $("#footerContainer").slideUp(300);
    }

    updateMenu();
});
$(window).resize(function() {
    updateMenu();
});

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-67547699-1', 'auto');
  ga('send', 'pageview');