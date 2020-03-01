var clicktime = 0;
//记录第几首歌
var newmusic = 0;
var time;
var progress =0;
var id;
var songArr = ['麻雀','修炼爱情','嚣张dj','可不可以','沉默是金']	
var audio = document.querySelector(".palyer #music");
var current = 0;
var record = true
//监控一下上次播放的时间
var timer = 0;
xxx()
audio.onloadedmetadata = function() {
console.log("加载到了^_^");
// audio.play();
getsongtime()
};

//单曲、随机、循环播放
$(".palyer").find(".stop-play span").eq(3).on("click", function() {
	current = current >= 2 ? 0 : ++current;
	if(current ==0){
		$(".palyer").find(".stop-play span").eq(3).find('i').removeClass('glyphicon glyphicon-align-justify')
		$(".palyer").find(".stop-play span").eq(3).find('i').addClass('glyphicon glyphicon-refresh')
	}else if(current==1){
		$(".palyer").find(".stop-play span").eq(3).find('i').removeClass('glyphicon glyphicon-refresh')
		$(".palyer").find(".stop-play span").eq(3).find('i').addClass('glyphicon glyphicon-apple')

	}else{
		$(".palyer").find(".stop-play span").eq(3).find('i').removeClass('glyphicon glyphicon-apple')
		$(".palyer").find(".stop-play span").eq(3).find('i').addClass('glyphicon glyphicon-align-justify')
	}
	
});
//播放和暂停的切换
$(".palyer").find(".stop-play span").eq(1).on("click", function() {
		
		if (audio.paused) {
			//指针移动
			playmusic();
			initialize()
			audio.currentTime = timer
			$('.message').css({transform: "scale(1)"})
			
		} else {
			record=false
			pausemusic();
			clearInterval(id)
			setTimeout(function(){
				record = true
			},10000)
			$('.message').css({transform: "scale(0) rotateZ(360deg)"})
		}
	});
//  自动切换下一曲
audio.onended = function () {
	//自动循环播放
	if(current==0){
		newmusic = newmusic >= 4 ? 0 : ++newmusic;
	}else if(current==1){
		newmusic=newmusic
	}else{
		newmusic=redoms(0,4)
	}
	initialize()
	playmusic()
}
function redoms(m,n){
	return Math.round(Math.random() * (n - m) + m);
}

//上一曲
$(".palyer").find(".stop-play span").eq(0).on("click", function() {
	newmusic = newmusic <= 0 ? 4 : --newmusic;
	//播放音乐
	playmusic();
	initialize()
});
//下一曲
$(".palyer").find(".stop-play span").eq(2).on("click", function() {
	newmusic = newmusic >= 4 ? 0 : ++newmusic;
	playmusic();
	initialize()
});
//初始化函数
init(songArr[0])
function init(name){
	$.get(" https://api.apiopen.top/searchMusic?name=" + name +"",
	function(data, textStatus, jqXHR) {
				$(".palyer").find("#music").attr("src", data.result[0].url);
				$(".palyer .song .musititle").text(data.result[0].title);
				$(".palyer .song .musisinger").text(data.result[0].author);
				$(".palyer .boxa").find(".mage").css({"background-image": "url(" + data.result[0].pic + ")"});
				$(".palyer .mohu").find(".beijin").css({"background-image": "url(" + data.result[0].pic + ")"});

			// 事件监听
			// getPlay()

	},
	"json"
);
}

function initialize(){
			let m =songArr[newmusic]
			music(m)
			// //加动画效果
		$('.palyer').find('.list5').each(function(a,b){
			$('.palyer').find('.list5').eq(newmusic).find('li').eq(0).css({animation: "colors 5s linear infinite"})
			$('.palyer').find('.list5').eq(newmusic).find('i').eq(0).css({animation: "colors 5s linear infinite"})
			$('.palyer').find('.list5').eq(newmusic).find('li').eq(1).css({animation: "colors 15s linear infinite"})
			$('.palyer').find('.list5').eq(newmusic).find('li').eq(2).css({animation: "colors 25s linear infinite"})
			$('.palyer').find('.list5').eq(newmusic).find('li').eq(0).parents('.list5').siblings().find('li').css({"animation-play-state":"paused"})
			$('.palyer').find('.list5').eq(newmusic).find('li').eq(0).parents('.list5').siblings().find('i').css({"animation-play-state":"paused"})
			$('.palyer').find('.list5').eq(newmusic).siblings().find('li').addClass('active')
		})
}


function music(names){
	$.get(" https://api.apiopen.top/searchMusic?name=" + names +"",
		function(data, textStatus, jqXHR) {
					$(".palyer").find("#music").attr("src", data.result[0].url);
					$(".palyer .song .musititle").text(data.result[0].title);
					$(".palyer .song .musisinger").text(data.result[0].author);
					$(".palyer .boxa").find(".mage").css({"background-image": "url(" + data.result[0].pic + ")"});
					$(".palyer .mohu").find(".beijin").css({"background-image": "url(" + data.result[0].pic + ")"});

				// 事件监听
				getPlay()

		},
		"json"
	);
}
//歌单显示

function xxx(){
	let p =[];
	songArr.forEach(function(e,i,arr){
		setTimeout(function(){
			$.get('https://api.apiopen.top/searchMusic?name='+ e + '',
			function(data, textStatus, jqXHR) {
				// console.log(data.result[0].lrc);
				p.push(data)
				if(p.length ===5){
					setTimeout(function(){
						p.forEach(function(ele,index,ps){
							// console.log(ele);
							$('.palyer').find('.list5').eq(index).find('li >.singername').text(ele.result[newmusic].title)
							$('.palyer').find('.list5').eq(index).find('li >.songtitle').text(ele.result[newmusic].author)
							
					})
				},1000)
			}
			},
			"json"
		);
		},1000)

		
	})
}

//歌单点击播放
clickPlay()
function clickPlay(){
	$('.palyer').find('.list5').each(function(a,b){
		$('.palyer').find('.list5').on('click',function(){
			newmusic = $(this).index()
			let m =songArr[newmusic]
			music(m)
			//加动画效果
			$(this).find('li').eq(0).css({animation: "colors 5s linear infinite"})
			$(this).find('i').eq(0).css({animation: "colors 5s linear infinite"})
			$(this).find('li').eq(1).css({animation: "colors 15s linear infinite"})
			$(this).find('li').eq(2).css({animation: "colors 25s linear infinite"})
			$(this).find('li').eq(0).parents('.list5').siblings().find('li').css({"animation-play-state":"paused"})
			$(this).find('li').eq(0).parents('.list5').siblings().find('i').css({"animation-play-state":"paused"})
			$(this).siblings().find('li').addClass('active')
	
		})
	})
	
}
		
function getPlay(){
	$(".palyer").find(".mage").css({ animation: "rotates 2s linear infinite "});
	//图标移动
	$(".palyer").find(".music-player__pointer").css({ transform: " rotateZ(8deg)" });
	//播放暂停按钮切换
	$(".palyer").find(".stop-play span").eq(1).removeClass(".glyphicon glyphicon-play");
	$(".palyer").find(".stop-play span").eq(1).addClass(".glyphicon glyphicon-pause");

	audio.oncanplay = function() {
		console.log("可以播放");
		audio.play();
		getsongtime()
		//播放时时间减少
		timereduce()
	};
	audio.onloadedmetadata = function() {
	console.log("加载到了");
	};


}

function playmusic() {
	$(".palyer").find(".mage").css({ animation: "rotates 2s linear infinite "});
	//图标移动
	$(".palyer").find(".music-player__pointer").css({ transform: " rotateZ(8deg)" });
	//播放暂停按钮切换
	$(".palyer").find(".stop-play span").eq(1).removeClass(".glyphicon glyphicon-play");
	$(".palyer").find(".stop-play span").eq(1).addClass(".glyphicon glyphicon-pause");
	// initialize()

		audio.play();
		//得到歌曲时长
		getsongtime()
		//播放时时间减少
		timereduce()
}

function pausemusic() {
	$(".palyer").find(".music-player__pointer").css({ transform: " rotateZ(-15deg)" });
	$(".palyer").find(".stop-play span").eq(1).removeClass(".glyphicon glyphicon-pause");
	$(".palyer").find(".stop-play span").eq(1).addClass(".glyphicon glyphicon-play");
	$(".palyer").find(".mage").css({ "animation-play-state":"paused"});
	audio.pause();
}
function getsongtime() {
	//获取歌曲时长
	time = Math.ceil(audio.duration);
	var differminute = parseInt(time / 60);
    var differseconds = time % 60;
    if(differminute<10){
        differminute = '0'+ differminute
    }
    if(differseconds <10){
        differseconds = '0' + differseconds
    }
	$(".palyer .song .song-time").find(".fixed-time").text(differminute +':' + differseconds)
	$('.palyer .message .content .songname').text(differminute +':' + differseconds)
	progress = 300/time
}
function timereduce(){	
	clearInterval(id)
	time = Math.ceil( audio.duration - audio.currentTime);
	id = setInterval(function() {
		time--
		var minute = parseInt(time / 60)
		var seconds = time % 60;
		if(minute<10){
			minute = '0'+ minute
		}
		if(seconds <10){
			seconds = '0' + seconds
		}
		if(time>=0){
		$(".palyer .song .song-time").find('.time').text(minute +':' + seconds)
		}
	}, 1000);
}
//在输入框搜索
var currentval;
$('.palyer .message .serach input').on('blur',function(){
	$(this).val()
	currentval=$(this).val()
	$.get(" https://api.apiopen.top/searchMusic?name=" + currentval +"",
		function(data, textStatus, jqXHR) {
			// console.log(data);
			//点击确定按钮播放音乐
			$(".palyer .message .serach span").on("click", function() {
					newmusic=0;
					$(".palyer").find("#music").attr("src", data.result[0].url);
					$(".palyer .song .musititle").text(data.result[0].title);
					$(".palyer .song .musisinger").text(data.result[0].author);
					// $('.palyer .message .content .songtitle').text(data.result[0].title)
					// $('.palyer .message .content .singername').text(data.result[0].author)
					// console.log(data.result[newmusic].pic);
					$(".palyer .boxa").find(".mage").css({"background-image": "url(" + data.result[0].pic + ")"});
					$(".palyer .mohu").find(".beijin").css({"background-image": "url(" + data.result[0].pic + ")"});
						//歌单更新
								console.log(songArr.indexOf(data.result[0].title));
								if(songArr.indexOf(data.result[0].title)==-1){
									songArr.shift()
									songArr.push(data.result[0].title)
									console.log(songArr);
									let p =[];
									songArr.forEach(function(e,i,arr){
										$.get('https://api.apiopen.top/searchMusic?name='+ e + '',
										function(data, textStatus, jqXHR) {
											p.push(data)
											console.log(p);
											
											if(p.length ===5){
												setTimeout(function(){
													p.forEach(function(ele,index,ps){
														console.log('xxxxx');
														
														$('.palyer').find('.list5').each(function(a,b){
															$('.palyer').find('.list5').eq(index).find('li >.singername').text(ps[index].result[newmusic].title)
															$('.palyer').find('.list5').eq(index).find('li >.songtitle').text(ps[index].result[newmusic].author)
														})
													})
												},100)
											
											}
										
											
										},
										"json"
									);
										
									})
								}
		
				// 事件监听
				
				audio.oncanplay = function() {
					console.log("可以播放");
				};
				audio.onloadedmetadata = function() {
				console.log("加载到了");
				getPlay()
				};
				
			});


		},
		"json"
	);
	
})
//在搜索框显示出歌手和歌名
$('.palyer .message .serach input').on('input',function(){
	$(this).val()
	console.log($(this).val());
	$(this).val()
	xxx =  $(this).val()
	$.get(" https://api.apiopen.top/searchMusic?name=" + xxx +"",
		function(data, textStatus, jqXHR) {
			//点击确定按钮播放音乐
			$("header.head #test").html = "";
			$.each(data.result, function(index, element) {
				//读取到的歌曲名和演唱者显示出来
				$(".palyer .message .serach #test").append('<option value=""></option>');
				$(".palyer .message .serach #test option").eq(index).attr("value", element.title + element.author);
			});
			
		},
		"json"
	);

})

//音量改变
var volumes = 50;
//音量初始化
$(".palyer .song .click-logo").find('b').css({width:volumes + "%"})
document.querySelector(".palyer #music").volume = (volumes/100)
$(".palyer .song .click-logo").find('input[type=range]').on('input',function(){
	volumes = $(this).val()
	$(".palyer .song .click-logo").find('b').css({width:volumes + "%"})
	document.querySelector(".palyer #music").volume = (volumes/100)
})

//监听事件，实时更新进度条
audio.ontimeupdate= function () {
	$(".palyer .song .song-time .schedule").find('span').css("width", audio.currentTime/ audio.duration * 100 + '%');
	if(record ){
	timer = audio.currentTime
	}
	
}
//进度条改变播放进度
$(".palyer .song .song-time .schedule").find('input[type=range]').on("input", function(e) {
	e.preventDefault();
	// console.log($(this).val());
	$(".palyer .song .song-time .schedule").find('span').css("width", $(this).val() + "%");
	audio.currentTime = $(this).val() / 100 *audio.duration
	time = Math.ceil(audio.duration - audio.currentTime);
})

//动画
$('.boxa').css({transform:"translateX(0px)"})
$('.music-player__pointer').css({transform: "rotateZ(-15deg) translateY(0px)"})
$(".song").css({transform:" translateX(0px)"})