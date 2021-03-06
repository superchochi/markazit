﻿/**
 * file containing functions for db
 */ 

function getItems(categories, limit, offset, pager, view, order) {
	$.ajax({
		url : "db.php?function=getItems&categories=" + categories + "&limit=" + limit + "&offset=" + offset + "&order=" + order,
		success : function(data) {
			createElements(data, limit, pager, view);
		},
		limit : limit,
		pager : pager,
		view : view
	});
}

function searchItem(id, pager, view) {
	$.ajax({
		url : "db.php?function=searchItem&id=" + id,
		success : function(data) {
			var arr = [data];
			createElements(arr, this.limit, this.pager, this.view);
		},
		limit : 20,
		pager : pager,
		view : view
	});
}

function createElements(json, limit, pager, view) {
	//var json = data;// JSON.parse(data);
	var cols = [];
	$.each(json, function(i, item) {
		var col = $(document.createElement("div"));
		col.attr("dbId", item[0]);
		col.addClass(view);
		var img = $(document.createElement("img"));
		img.addClass("img-responsive");
		img.attr("src", item[3].trim());		
		/*
		 * var span1 = $(document.createElement("span"));
		 * span1.addClass("center-block"); span1.css("width", "100%");
		 * span1.css("text-align", "center"); span1.text("Име");
		 */
		var span2 = $(document.createElement("span"));
		span2.addClass("center-block");
		span2.addClass("price");
		span2.css("width", "100%");
		span2.css("text-align", "center");
		span2.css("font-size", "1.4em");
		span2.text("Цена: " + item[2] + " лв.");
		col.append(img);
		// col.append(span1);
		col.append(span2);		
		cols[i] = col;
	});
	var row = $(document.createElement("div"));
	row.addClass("row");
	$.each(cols, function(i, item) {
		row.append(item);
		if ((i > 0 && (i + 1) % 4 === 0) || (i + 1) === this.limit) {
			row.insertBefore(pager);
			row = $(document.createElement("div"));
			row.addClass("row");
		}
	});
	if (row.has("div")) {
		row.insertBefore(pager);
	};
	
	$('.' + view).bind('load', function(e){
		var img = $(this).children('img');
		console.log(img);
		if(img.naturalWidth() != img.naturalHeight()){
			$('.navbar-right').css('display', "none");
				$('.col-sm-3').removeClass('col-sm-3').addClass('col-sm-12');
				view = "col-sm-12";
		}
	});
	/*var img = $('.' + view).children('img');
	console.log(img);
	if(img.naturalWidth() != img.naturalHeight()){
			$('.navbar-right').css('display', "none");
				$('.col-sm-3').removeClass('col-sm-3').addClass('col-sm-12');
				view = "col-sm-12";
	}*/
	$("." + view).bind('click', function(e) {
		e.preventDefault();
		var imgChild = $("." + view + ' img');
		if(imgChild.first().naturalWidth() == imgChild.first().naturalHeight()){
			doLeftRightPopup();			
		}
		else {
			doTopBottomPopup();
		}
		var item = getItem($(this).attr("dbId"));
		$("#popup #mainImg").attr("src", "");
		$("#popup #catalogNum").text("");
		$("#popup #price").text("");
		$("#popup #firstImg").attr("src", "");
		$("#popup #secondImg").attr("src", "");
		$("#popup #thirdImg").attr("src", "");
		$("#popup #fourthImg").attr("src", "");
		$("#popup #firstImg").hide();
		$("#popup #secondImg").hide();
		$("#popup #thirdImg").hide();
		$("#popup #fourthImg").hide();
		$("#popup #weight").text(weight);
		$("#popup #params").text("");
		if (item[2]) {
			$("#popup #mainImg").attr("src", item[2].trim());
			$("#popup #firstImg").attr("src", item[2].trim());
			$("#popup #firstImg").show();
		}
		$("#popup #catalogNum").text(item[10]);
		if (item[1]) {
			$("#popup #price").text(item[1]);
		}
		if (item[3] != "") {
			$("#popup #secondImg").attr("src", item[3].trim());
			$("#popup #secondImg").show();
		}
		if (item[4] != "") {
			$("#popup #thirdImg").attr("src", item[4].trim());
			$("#popup #thirdImg").show();
		}
		if (item[5] != "") {
			$("#popup #fourthImg").attr("src", item[5].trim());
			$("#popup #fourthImg").show();
		}
		if (parseFloat(item[0]) > 0) {
			$("#popup #weight").text(item[0] + " гр.");
			$("#popup #weight").parent().css('display', '');
			$("#popup #weight").parent().next().css('display', '');
		}
		else{
			$("#popup #weight").parent().css('display', 'none');
			$("#popup #weight").parent().next().css('display', 'none');
		}
		
		var params = "";
		if (item[6].trim().length != 0) {
			//$("#popup #params").text(item[6].trim());
			params += ("<span>" + item[6].trim() + "</span>");
		}
		if (item[7].trim().length != 0) {
			//$("#popup #params").text(item[7].trim());
			params += ("</br><span>" + item[7].trim() + "</span>");
		}
		if (item[8].trim().length != 0) {
			//$("#popup #params").text(item[8].trim());
			params += ("</br><span>" + item[8].trim() + "</span>");
		}
		if (item[9].trim().length != 0) {
			//$("#popup #params").text(item[9].trim());
			params += ("</br><span>" + item[9].trim() + "</span>");
		}
		$("#popup #params").html(params);
		$('#popup').bPopup().css('top',
				$(this).css("top") - 600 + 'px');
	});
}

function getCount(categories) {
	var res;
	$.ajax({
		url : "db.php?function=getCount&categories=" + categories,
		success : function(data) {
			res = data;
		},
		async : false
	});
	return res;
}

function getItem(id) {
	var res;
	$.ajax({
		url : "db.php?function=getItem&id=" + id,
		success : function(data) {
			res = data;
		},
		id : id,
		async : false
	});
	return res;
}