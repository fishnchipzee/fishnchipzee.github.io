$(window).on('load',function(){
	waterfall();
	var dataInt={"data":[{"src":'4.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'}]}
	$(window).on('scroll',function(){
		if(checkScrollSlide) {
			$.each(dataInt.data,function(key,value){
				var oBox=$('<div>').addClass('box').appendTo($('#flowMain'));
				var oPic=$('<div>').addClass('pic').appendTo($(oBox));
				var oImg=$('<img>').attr('src','tp/'+$(value).attr('src')).appendTo($(oPic));
			})
			waterfall();
		}
	})
})

function waterfall(){
	var $boxs=$("#flowMain>div");
	var w=$boxs.eq(0).outerWidth(); //每列宽度
	var cols=Math.floor($(window).width()/w); //列数
	$("#flowMain").width(w*cols).css({'margin':'0 auto'});
	//遍历div前6个高度放入数组
	var hArr=[];
	$boxs.each(function(index,value){
		var h=$boxs.eq(index).outerHeight();
		if (index<cols) {
			hArr[index]=h;
		} else {
			var minH=Math.min.apply(null,hArr);
			var minHIndex=$.inArray(minH,hArr);
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minHIndex*w+'px'
			})
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();
		}
	})
}

function checkScrollSlide(){ //判断是否具备加载条件
	var $lastBox=$('#main>div').last();
	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerheight()/2);
	var scrollTop=$(window).scrollTop();
	var documentH=$(window).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;
}