$(function() {
	$(window).on("resize", function() {
		var w = (window.innerWidth - $("#topImage").width()) / 2;
		$(".background1").css("width", w);
		$(".background2").css("width", w)
	});
	$('.dropdown-menu').parent().on('show.bs.dropdown', function(e){
		$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
	});
	$('.dropdown-menu').parent().on('hide.bs.dropdown', function(e){
		$(this).find('.dropdown-menu').first().stop(true, true).slideUp();
	});
	
	$('#menu').on('hide.bs.collapse', function () {
	  $("#menu").css("background", "");
	});
	$('#menu').on('show.bs.collapse', function () {
	  $("#menu").css("background", "#a77649");
	});
});

function updateMenu() {
	if(window.innerWidth / 16 > 47.9375) {
		if($(this).scrollTop() > $("#topImage").height() - $("#menu").height()) {
			$("#menu").removeClass("menu-default");
			$("#menu").addClass("menu-top");
		} else if($(this).scrollTop() < $("#topImage").height()) {
			$("#menu").removeClass("menu-top");
			$("#menu").addClass("menu-default");
		}
	} else {
		$("#menu").removeClass("menu-top");
		$("#menu").addClass("menu-default");
	}
}

$(window).scroll(function() {
	updateMenu();
});
$(window).resize(function() {
	updateMenu();
});