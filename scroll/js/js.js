//轮播图滚动
var y = 0;
var current = 0;
var canmove = true;
var srcolltime = 0;
$("body").on("wheel", function(e) {
	y += e.originalEvent.deltaY;
	// console.log(y);
	setTimeout(function() {
		if (canmove) {
			if (y > 0) {
				nextPic();
				show();
			}
			if (y < 0) {
				prvPic();
				show();
			}
		}
		y = 0;
	}, 200);
});
function show() {
	$(".main section.content .list>li")
		.eq(0)
		.animate({
			"margin-top": -100 * current + "vh",
			function() {
				setTimeout(function() {
					canmove = true;
				}, 300);
			}
		});
	xxx();
	towmanmove();
	roTate();
	$(".main .nav .menu .move").css({
		left: current * 65 + (772 + Math.pow(current * 2, 1.7)) + "px"
	});
	$(".main .content ul.dot li")
		.eq(current)
		.addClass("active")
		.siblings()
		.removeClass("active");
}
function nextPic() {
	current =
		current >= $(".main section.content .list>li").length - 1
			? current
			: ++current;
	show();
	towmanmove()
	roTate()
}
function prvPic() {
	current = current <= 0 ? 0 : --current;
	show();
	towmanmove()
	roTate()
}
//小房子黑色初始化
$(".main .nav")
	.find("ul.right li .bb")
	.eq(0)
	.css({ width: "100%" });
//总体轮播图小点点初始化
$(".main .content ul.dot li")
	.eq(0)
	.addClass("active");
//菜单栏点击工作事件
$(".main .nav")
	.find("ul.right li")
	.on("click", function() {
		current = $(this).index();
		show();
	
		xxx();
		//当前点击的那一个菜单.end().siblings().css({ width: "0%" })
		$(".main .nav")
			.find("ul.right li")
			.eq(current)
			.off("mouseleave");
	});
//总体轮播图小点点点击
$(".main .content ul.dot li").on("click", function() {
	current = $(this).index();
	show();
});
//将其他的项变成蓝色
function xxx() {
	$(".main .nav")
		.find("ul.right li .bb")
		.each(function(a, b) {
			if (a == current) {
				$(".main .nav")
					.find("ul.right li .bb")
					.eq(current)
					.animate({ width: "100%" }, function() {
						setTimeout(function() {
							canmove = true;
						}, 600);
					});
			}
			if (a != current) {
				$(".main .nav")
					.find("ul.right li .bb")
					.eq(a)
					.animate({ width: "0%" }, function() {
						setTimeout(function() {
							canmove = true;
						}, 600);
					});
			}
		});
}
//鼠标进入事件
$(".main .nav")
	.find("ul.right li")
	.on("mouseenter", function() {
		current = $(this).index();
		if (canmove) {
			canmove = false;
			$(".main .nav")
				.find("ul.right li .bb")
				.eq($(this).index())
				.animate({ width: "100%" }, 600, function() {
					setTimeout(function() {
						canmove = true;
					}, 600);
				});
		}
	});
//鼠标离开事件
$(".main .nav")
	.find("ul.right li")
	.on("mouseleave", function() {
		$(".main .nav")
			.find("ul.right li .bb")
			.eq($(this).index())
			.animate({ width: "0%" }, 600);
	});
//home轮播图
//小点点初始化
var dotcurrent = 0;
$(".main .content .list li.home .dots span")
	.eq(0)
	.addClass("active");
$(".main .content .list li.home .dots span").click(function() {
	dotcurrent = $(this).index();
	$(".main .content .list li.home .dots span")
		.eq(dotcurrent)
		.addClass("active")
		.siblings()
		.removeClass("active");
});
$(".main .content .list li.home .dots").css("top", 80 + "%");
//小点点往上移动
$(".main .content .list li.home .icon li")
	.eq(0)
	.addClass("active");
$(".main .content .list li.home .icon li").css("top", 0 + "px");
//第二张人物移动
function towmanmove(){
	if(current==1){
		$(".main .content ul.list .course .iconic .top").css({left: "500px",top:" -100px",  opacity: 1});
		$(".main .content ul.list .course .iconic .left").css({left: "0px",top:" 200px",  opacity: 1});
		$(".main .content ul.list .course .iconic .bottom").css({left: "500px",top:" 450px",  opacity: 1});
	}else{
		$(".main .content ul.list .course .iconic .top").css({left: "300px",top:" -200px",  opacity: 0});
		$(".main .content ul.list .course .iconic .left").css({left: "-100px",top:" 200px",  opacity: 1});
		$(".main .content ul.list .course .iconic .bottom").css({left: "600px",top:" 350px",  opacity: 1});
	}
}
//第四张：格式代码
//旋转
function roTate(){
	if(current<3){
		$(".main .content ul.list .about .content .banner").css({
			transform: "rotateZ(45deg)"
		});
		$(".main .content ul.list .about .content .banne").css({
			transform: "rotateZ(45deg)"
		});
	}
	if(current>3){
		$(".main .content ul.list .about .content .banner").css({
			transform: "rotateZ(-45deg)"
		});
		$(".main .content ul.list .about .content .banne").css({
			transform: "rotateZ(-45deg)"
		});
	}
	if(current==3){
		$(".main .content ul.list .about .content .banner").css({
			transform: "rotateZ(0)"
		});
		$(".main .content ul.list .about .content .banne").css({
			transform: "rotateZ(0)"
		});
	}
}