var banner = document.querySelector("header > .banner");
var cultivation = banner.querySelector("h1");
var cardAlis = banner.querySelectorAll(".card > li");
var guidimg = document.querySelector(".about >.guid > img");
var guidP = document.querySelectorAll(".about >.guid > p");
var servicesGlis = document.querySelectorAll(".services > .guid > li");
var worksguid = document.querySelector(".works > .guid");
var newsListalis = document.querySelectorAll(".news > .list > li");
var resumealis = document.querySelectorAll(".resume > .nane > li");
var explainLogo = document.querySelector(".explain > .logo");
var explainMessage = document.querySelector(".explain > .message");
// var guidImg = guid.querySelector('img')

var body = document.body;
//cultivation 缩放
body.onscroll = function() {
	if (window.pageYOffset >= 0) {
		// debugger;
		cultivation.style.transform = "scale(1)";
		//transform = scale(1)就变成了变量
		//transform = "scale(1)" 后面的部分就是字符串变量
		// for (var i = 0; i < cardAlis.length; i++) {
		// }
		cardAlis[0].classList.add("active");
		cardAlis[1].classList.add("active");
		cardAlis[2].classList.add("active");
		cardAlis[3].classList.add("active");
	}
	//about
	if (
		window.pageYOffset >
		guidimg.offsetTop - window.innerHeight + guidimg.offsetHeight
	) {
		guidimg.classList.add("active");
		guidP[0].classList.add("activ");
		guidP[1].classList.add("activ");
	}
	//service
	if (
		window.pageYOffset >
		servicesGlis[0].offsetTop -
			window.innerHeight +
			servicesGlis[0].offsetHeight / 2
	) {
		servicesGlis[0].classList.add("active");
		servicesGlis[1].classList.add("active");
		servicesGlis[2].classList.add("active");
	}

	if (window.pageYOffset > worksguid.offsetTop - window.innerHeight) {
		worksguid.classList.add("active");
	}
	if (window.pageYOffset > newsListalis[0].offsetTop - window.innerHeight) {
		newsListalis[0].classList.add("active");
		newsListalis[1].classList.add("activ");
		newsListalis[2].classList.add("active");
	}
	if (window.pageYOffset > resumealis[0].offsetTop - window.innerHeight) {
		resumealis[0].classList.add("active");
		resumealis[1].classList.add("activ");
		resumealis[2].classList.add("active");
	}
	if (window.pageYOffset > explainLogo.offsetTop - window.innerHeight) {
		explainLogo.classList.add("active");
		explainMessage.classList.add("active");
	}
};
window.scrollTo(0, 2);