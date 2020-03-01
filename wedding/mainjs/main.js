var mySwiper = new Swiper(".swiper1", {
	// autoplay: true,

	// loop: true, // 循环模式选项

	// // 如果需要分页器
	// pagination: {
	//     el: ".swiper-pagination",
	//     clickable: true
	// },

	// 如果需要前进后退按钮
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	}

	// 如果需要滚动条
	// scrollbar: {
	// 	el: ".swiper-scrollbar"
	// }
});
var mySwiper1 = new Swiper(".swiper-container", {
	loop: true,
	loopAdditionalSlides: 3
});

$(".smoothScroll").click(function() {
	$("html, body").animate(
		{ scrollTop: $($(this).attr("href")).offset().top - 20 + "px" },
		1000
	);
	return false; //不要这句会有点卡顿
});

$("#scroll").click(function() {
	$("html, body").animate(
		{ scrollTop: $($(this).attr("href")).offset().top + 20 + "px" },
		1000
	);
	return false; //不要这句会有点卡顿
});
$(".menu .navbar-right")
	.find("a")
	.eq(0)
	.css({ color: "#6b6ee9" });
$(".menu .navbar-right")
	.find("a")
	.on("click", function() {
		$("html, body").animate(
			{ scrollTop: $($(this).attr("href")).offset().top + 20 + "px" },
			1000
		);
		console.log(
			$(this)
				.css({ color: "#6b6ee9" })
				.parent("li")
				.siblings()
				.children()
				.css({ color: "#000" })
		);

		return false; //不要这句会有点卡顿
	});

var married = document.querySelector(".married");
document.body.onscroll = function() {
	if (
		window.pageYOffset >
		married.offsetTop - window.innerHeight + married.offsetHeight / 5
	) {
		$("#home .bg")
			.find("#icon")
			.removeClass("wd_header_wrapper")
			.addClass("nav-mune");
		// console.log('xxx')
	} else {
		$("#home .bg")
			.find("#icon")
			.removeClass("nav-mune")
			.addClass("wd_header_wrapper");
	}
    $(".said").css({transform: "translateY(-100px)",opacity: 0});
    $('section').each(function(){
        if (window.pageYOffset >$(this).offset().top - window.innerHeight + $(this).height()){
            let n= $(this).index()
           $(".said").eq(n).css({transform: "translateY(0px)",opacity: 1});
           $(".said").eq(n).parents('section').siblings().find('.said').css({transform: "translateY(-100px)",opacity: 0});
		  
		   
		} 
		if (window.pageYOffset >$(this).offset().top - window.innerHeight ){
			let m = $(this).index()
			$(".menu .navbar-right").find("a").eq(m).css({ color: "#6b6ee9" }).parent("li")
			.siblings()
			.children()
			.css({ color: "#000" })
		}
       
        
        
    })
   
};
