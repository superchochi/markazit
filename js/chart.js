$(function() {		
	$("#btn_panel li a").first().attr('class', 'active_btn');
	$("#btn_panel li a").on('click', function(e){
		$("#btn_panel li a").removeAttr('class', 'active_btn');
		e.preventDefault();
		$(this).toggleClass('active_btn');
	})
	
	var color9K = ["#F2B705","#0092B9","#666"];
	var data9K = [37.5, 42.5, 20];
	var label9K = ["Злато","Сребро","Други"];
	
	var color10K = ["#F2B705","#0092B9","#D97904"];
	var data10K = [41.7, 52, 6.3];
	var label10K = ["Злато","Сребро","Мед"];
	
	var color14K = ["#F2B705","#0092B9","#D97904"];
	var data14K = [58.4, 30, 11.70];
	var label14K = ["Злато","Сребро","Мед"];
	
	var color18K = ["#F2B705","#0092B9","#D97904"];
	var data18K = [75, 15, 10];
	var label18K = ["Злато","Сребро","Мед"];
	
	var color22K = ["#F2B705","#0092B9","#D97904", "#BC3603"];
	var data22K = [91.7, 5, 2, 1.3];
	var label22K = ["Злато","Сребро","Мед","Цинк"];
	
	var karats = {
		"K9": [
			color9K,
			data9K,
			label9K
		],
		"K10": [
			color10K,
			data10K,
			label10K
		],"K14": [
			color14K,
			data14K,
			label14K
		],
		"K18": [
			color18K,
			data18K,
			label18K
		],
		"K22": [
			color22K,
			data22K,
			label22K
		]
	}
	
	$('#btn_panel ul li a').bind('click', function(e){
		e.preventDefault();
		var text = $(this).data();
		$(this).focus();
		var karat = karats[text.karat];			
		setTimeout(function(){
			$('canvas').css('opacity', '0');
			plotData(karat[0], karat[1], karat[2]);
		}, 100);
		setTimeout(function(){
			$('canvas').css('opacity', '1');
		}, 200);
	});
	

	function getTotal(myData){
	  var myTotal = 0;
	  for (var j = 0; j < myData.length; j++) {
		myTotal += (typeof myData[j] == 'number') ? myData[j] : 0;
	  }
	  return myTotal;
	}

	function plotData(myColor, myData, myLabel) {
	  var canvas;
	  var ctx;
	  var lastend = 0;
	  var myTotal = getTotal(myData);
	  var doc;
	  canvas = document.getElementById("canvas");
	  var x = (canvas.width)/2;
	  var y = (canvas.height)/2;
	  var r = 150;
	  
	  ctx = canvas.getContext("2d");
	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  for (var i = 0; i < myData.length; i++) {
		ctx.fillStyle = myColor[i];
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.arc(x,y,r,lastend,lastend+(Math.PI*2*(myData[i]/myTotal)),false);
		ctx.lineTo(x,y);
		ctx.fill();
		
		// Now the pointers
		ctx.beginPath();
		var start = [];
		var end = [];
		var last = 0;
		var flip = 0;
		var textOffset = 0;
		var precentage = (myData[i]/myTotal)*100;
		start = getPoint(x,y,r-20,(lastend+(Math.PI*2*(myData[i]/myTotal))/2));
		end = getPoint(x,y,r+20,(lastend+(Math.PI*2*(myData[i]/myTotal))/2));
		if(start[0] <= x)
		{
		  flip = -1;
		  textOffset = -110;
		}
		else
		{
		  flip = 1;
		  textOffset = 10;
		}
		ctx.moveTo(start[0],start[1]);
		ctx.lineTo(end[0],end[1]);
		ctx.lineTo(end[0]+120*flip,end[1]);
		ctx.strokeStyle = "#bdc3c7";
		ctx.lineWidth   = 2;
		ctx.stroke();
		// The labels
		ctx.font="17px Arial";
		ctx.fillText(myLabel[i]+" "+precentage.toFixed(2)+"%",end[0]+textOffset,end[1]-4); 
		// Increment Loop
		lastend += Math.PI*2*(myData[i]/myTotal);
		
	  }
	}
	// Find that magical point
	function getPoint(c1,c2,radius,angle) {
	  return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
	}
	// The drawing
	plotData(color9K, data9K, label9K);
});