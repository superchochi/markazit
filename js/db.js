/**
 * file containing functions for db
 */
function getItems(categories, limit, offset, pager, view) {
	$.ajax({
		url : "db.php?function=getItems&categories=" + categories + "&limit="
				+ limit + "&offset=" + offset,
		success : function(data) {
			var json = data;// JSON.parse(data);
			var cols = [];
			$.each(json, function(i, item) {
				var col = $(document.createElement("div"));
				col.attr("dbId", item[0]);
				col.addClass(view);
				var img = $(document.createElement("img"));
				img.addClass("img-responsive");
				img.attr("src", "../" + item[3].trim());
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
				span2.text("Цена: " + item[2]);
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
			}
			$("." + view).bind(
					'click',
					function(e) {
						e.preventDefault();
						getItem($(this).attr("dbId"));
						$('#popup').bPopup().css('top',
								$(this).css("top") - 600 + 'px');
					});
		},
		limit : limit
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
	$.ajax({
		url : "db.php?function=getItem&id=" + id,
		success : function(data) {
			$("#popup #mainImg").attr("src", "");
			$("#popup #catalogNum").text("");
			$("#popup #price").text("");
			$("#popup #secondImg").attr("src", "");
			$("#popup #thirdImg").attr("src", "");
			$("#popup #fourthImg").attr("src", "");
			$("#popup #weight").text(weight);
			$("#popup #params").text("");
			var weight = data[0];
			var price = data[1];
			var path = data[2];
			var param1 = data[3];
			var param2 = data[4];
			var param3 = data[5];
			var param4 = data[6];
			if (path) {
				$("#popup #mainImg").attr("src", "../" + path.trim());
			}
			$("#popup #catalogNum").text(this.id);
			if (price) {
				$("#popup #price").text(price);
			}
			/*
			 * if(param1) { $("#popup #secondImg").attr("src", param1.trim()); }
			 * if(param2) { $("#popup #thirdImg").attr("src", param2.trim()); }
			 * if(param3) { $("#popup #fourthImg").attr("src", param3.trim()); }
			 */
			if (weight) {
				$("#popup #weight").text(weight);
			}
			if (param4) {
				$("#popup #params").text(param4.trim());
			}
		},
		id : id
	});
}