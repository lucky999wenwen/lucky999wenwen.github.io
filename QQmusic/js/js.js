// https://api.apiopen.top/searchMusic?name=好久不见
/* var current = 0;

$(".container .btn2").on("click", function() {
	$.get(
		" https://api.apiopen.top/searchMusic?name=好久不见",
		function(data, textStatus, jqXHR) {
			// console.log(this + "^_^");
			// console.log(data);
			// console.log(data.result[0].url);
			$(".head .container .xinxi  #myAudio source").attr(
				"src",
				data.result[0].url
			);
			var music = document.querySelector("#myAudio");
			var syopplay = music.paused;
			console.log(syopplay);
			console.log('ccc');
			
			document.querySelector("#myAudio").load()
		},
		"json"
	);

	
	// if (syopplay) {
	// 	music.play();
	// } 
	// else {
	// 	music.pause();
	// }
});
//上一曲
$(".container .btn1").on("click", function() {
	current--;
	// console.log(current);

	$.get(
		" https://api.apiopen.top/searchMusic?name=好久不见",
		function(data, textStatus, jqXHR) {
			console.log(data);
			if (current <= 0) {
				current = data.result.length - 1;
			}
			console.log(data.result.length);

			$(".head .container .xinxi audio source").attr(
				"src",
				data.result[current].url
			);
			document.querySelector("#myAudio").load()
		},
		"json"
	);
});
//下一曲
$(".container .btn3").on("click", function() {
	current++;
	$.get(
		" https://api.apiopen.top/searchMusic?name=可不可以",
		function(data, textStatus, jqXHR) {
			// console.log(data);
			if (current > data.result.length - 1) {
				current = 0;
			}
			console.log(data.result.length - 1);
			$(".head .container .xinxi audio source").attr(
				"src",
				data.result[current].url
			);
			document.querySelector("#myAudio").load()
		},
		"json"
	);
}); */
//用户输入搜索歌曲
//记录一下当前播放的的音乐链接
var nowmusiclink;
var currentval;
$('header.head').find('input').on("input", function() {
	// console.log($(this).val());
	currentval=$(this).val()
	setTimeout(function(){
		
	},100)
	if(currentval){
		mmm(currentval);
	}
	
	$("script").last().attr("src");
	// console.log($("script").last().attr("src"));
	//拿到最后一次插入的script里面的aip接口
	$.get($("script").last().attr("src"),
		function(data, textStatus, jqXHR) {
			//点击确定按钮播放音乐
			$("header.head").find('.serach').on("click", function() {
				$("script.start").nextAll().remove()
				// console.log(data.result[0]);
				// console.log(data.result[0].url);

				$(".play audio").attr("src",data.result[0].url);
				//保存一下当前播放歌曲的链接
				nowmusiclink = data.result[0].url
				
				// document.querySelector("#myAudio").load()
			});
			$("header.head #test").html = "";
			$.each(data.result, function(index, element) {
				// console.log(index, element);
				//读取到的歌曲名和演唱者显示出来
				$("header.head #test").append('<option value=""></option>');
				$("header.head #test option").eq(index).attr("value", element.title + element.author);
			});
			
		},
		"json"
	);
});
//根据用户输入的内容来生成对应的script标签链接
function mmm(value) {
	$("body").append(
		'<script src="https://api.apiopen.top/searchMusic?code=utf-8&name=' +
			value +
			'&callback=xxx"></script>'
	);
}
// var scriptall = document.querySelectorAll('script')
// // Array.prototype.apply('scriptall')
// $('body').find('script')
// // $("script.start").nextAll().remove()