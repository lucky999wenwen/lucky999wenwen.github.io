var alis = document.querySelectorAll(".header>.novel > .menu > li > p");
var ali = document.querySelectorAll(".novel > .menu > li");
var submenu = document.querySelectorAll(".backcolr");
var spanalitwo = ali[1].querySelectorAll(".backcolr > .theme >span");
var spanfont = ali[1].querySelectorAll(".backcolr > .font >span");
var fontsize = ali[1].querySelectorAll(".backcolr > .fontsize > .list >span");
var fonts = ali[1].querySelector(".backcolr > .fontsize > .list >h5");
var back = document.querySelector(".header > .back");
var timeAlli = document.querySelectorAll(
	".header > .back > .incon >ul.time>li"
);
var dayAlli = document.querySelectorAll(".header > .back > .incon >ul.day>li");
var selfmotion = ali[1].querySelector(".backcolr > .selfmotion > span");
// var content = document.querySelector(".content");
alis.forEach(function(element, index, arr) {
	element.xxx = index;
	showtim();
	element.onclick = function() {
		show(this.xxx);
	};
});
function show(n) {
	if (submenu[n].style.display == "block") {
		showtim();
	} else {
		showtim();
		submenu[n].style.display = "block";
	}
}
function showtim() {
	for (var i = 0; i < submenu.length; i++) {
		submenu[i].style.display = "none";
	}
}
//背景主题的切换。
spanalitwo.forEach(function(e, i, arr) {
	e.pp = i;
	// console.log(e.mm);
	document.querySelector("#content").className = getCookie("theme");
	//网页重新加载时从cookie拿到保存的主题
	e.addEventListener("click", function(element, index, str) {
		var mm = this.getAttribute("class");
		//拿到点击的那一个span的主题的class
		document.querySelector("#content").className = mm;
		//把得到得className名字赋给文章className名
		setCookie("theme", mm, 1000);
		//设置cookie的键值对和过期时间
		traverse();
		if (this.innerText == "✔") {
			this.innerText = "";
		} else {
			this.innerText = "✔";
		}
	});
});
function traverse() {
	for (var i = 0; i < spanalitwo.length; i++) {
		spanalitwo[i].innerText = "";
	}
}
//字体的切换
spanfont.forEach(function(e, i, arr) {
	e.pp = i;
	document.querySelector("#content").style.fontFamily = getCookie("字体");
	//网页重新加载时从cookie拿到保存的主题
	if (getCookie("clik") == i) {
		arr[i].style.border = getCookie("fontborder");
		arr[i].style.color = getCookie("fontcolor");
	}
	e.addEventListener("click", function(element, index, str) {
		// console.log(this.pp);
		var clik = this.pp;
		var font = this.innerText;
		document.querySelector("#content").style.fontFamily = font;
		setCookie("字体", font, 1000);
		//键值对，过期时间设置
		clearfontborder();
		if (
			this.style.border == "solid 1px lawngreen" &&
			this.style.color == "lawngreen"
		) {
			this.style.border = "solid 1px #E6E6FA";
			this.style.color = "black";
		} else {
			this.style.border = "solid 1px lawngreen";
			this.style.color = "lawngreen";
		}
		setCookie("fontborder", this.style.border, 1000);
		setCookie("fontcolor", this.style.color, 1000);
		setCookie("clik", clik, 1000);
	});
}, this);
//字体大小的调节

function fontSize() {
	var size = 16;
	document.querySelector("#content").style.fontSize =
		getCookie("fontsize") + "px";
	fonts.innerText = getCookie("fontsize");
	// console.log(getCookie("fontsize"));
	// if(size != getCookie('fontsize')){
	// 	// size=getCookie('fontsize');
	// }
	fontsize.forEach(function(element, index, arr) {
		// size = getCookie('fontsize');
		element.i = index;
		element.addEventListener("click", function(e, index, arr) {
			// console.log(this.i);
			if (this.i == 0) {
				if (size <= 4) {
					size -= 0;
				} else {
					size -= 2;
				}
			} else {
				if (size >= 40) {
					size += 0;
				} else {
					size += 2;
				}
			}
			fonts.innerText = size;
			document.querySelector("#content").style.fontSize = size + "px";
			setCookie("fontsize", size, 1000);
		});
	});
}
fontSize();
function clearfontborder() {
	for (var i = 0; i < spanfont.length; i++) {
		spanfont[i].style.border = "solid 1px #E6E6FA";
		spanfont[i].style.color = "black";
	}
}

function setCookie(key, value, exdays) {
	if (exdays) {
		var d = new Date();
		var f = d.getTime() + 24 * 60 * 60 * 1000 * exdays;
		document.cookie = key + "=" + value + ";" + "expires=" + new Date(f);
	} else {
		document.cookie = key + "=" + value;
	}
}

function delCookie(key) {
	document.cookie = key + "=;" + "expires=Sun Feb 01 1970 00:00:00 GMT+0800";
}

function getCookie(key) {
	var str = document.cookie;
	var value;
	str.split(";").forEach(function(keyVlaue, index, strArray) {
		var subArray = keyVlaue.split("=");
		if (subArray[0].trim() === key) {
			value = subArray[1];
			// console.log(value);

			for (var i = 2; i < subArray.length; i++) {
				value = value.concat("=", subArray[i]);
				// console.log(subArray[i]);
			}
		}
	});
	return value;
}
//每天时间提醒护眼模式
//页面滚动
function pagescroll() {
	function xxx(n) {
		return n < 10 ? "0" + n : n;
	}
	setInterval(function() {
		var time = new Date();
		timeAlli[0].innerText = xxx(time.getHours());
		timeAlli[2].innerText = xxx(time.getMinutes());
		timeAlli[4].innerText = xxx(time.getSeconds());
		dayAlli[0].innerText = time.getFullYear() + "年";
		dayAlli[1].innerText = time.getUTCMonth() + "月";
		dayAlli[2].innerText = time.getDate() + "日";
	}, 1000);
	document.body.onscroll = function() {
		if (window.pageYOffset > window.innerHeight - back.offsetHeight) {
			back.style.display = "block";
		} else {
			back.style.display = "none";
		}
	};
}
pagescroll();

//自动阅读模式
function selfmoTion() {
	var a = 0;
	var x;
	selfmotion.addEventListener("click", function() {
		a++;

		if (a % 2 == 1) {
			this.innerText = "Yes";
			var y = 0;
			x = setInterval(function () {
					y += 1;
					window.scroll(0, y);
			}, 50);
		} else {
			clearInterval(x);
			this.innerText = "No";
		}
	});
}
selfmoTion();
