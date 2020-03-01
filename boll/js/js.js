/** @type {HTMLCanvasElement} */
document.body.addEventListener('touchmove', function (e) {
	e.preventDefault();
  }, {passive: false});

let canvas = document.querySelector("#canvas");
let stage = document.querySelector('.stage')

let x =  window.screen.availHeight
let ctx = canvas.getContext("2d");
let img = new Image();
img.src = "./preloadsheet.png";
let game = {
	stageWidth: stage.offsetWidth, //画布宽度
	stageHeight: stage.offsetHeight, //画布高度
	score: 0, //分数
	center: {
		x: stage.offsetWidth / 2, //画布中心的x,y
		y: stage.offsetHeight / 2
	}
};
//设置画布的大小
canvas.width = game.stageWidth;
canvas.height = game.stageHeight;

//画布背景
function drawCloth() {
	ctx.fillStyle = "#eaeaea";
	ctx.fillRect(0, 0, game.stageWidth, game.stageHeight);
}

//颜色选取数组
let circleColor = [
	"#FFC09F",
	"#25C6FC",
	"#DE8100",
	"#04DD98",
	"#7C6354",
	"#C5FF24",
	"#E93C07",
	"#F8FB6C",
	"#FF13FE",
	"#FF4238",
	"#322105",
	"#007850",
	"#FF9966",
	"#FF6666",
	"#99CCFF",
	"#666633",
	"#6699CC",
	"#CCCCFF",
	"#CC3399",
	"#66CCCC",
	"#CC0066"
];
//画圆的方法
//圆心坐标想x,y半径r,是否填充fill
// var fill = true
function drawCircle(x, y, r, color, fill) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.closePath();
	if (fill) {
		ctx.fillStyle = color;
		ctx.fill();
	} else {
		ctx.strokeStyle = color;
		ctx.stroke();
	}
}
//游戏结束时的遮罩
function drawClothover() {
	ctx.beginPath();
	ctx.arc(game.center.x, game.center.y, game.stageHeight, 0, 2 * Math.PI);
	ctx.fillStyle = "rgba(0,0,0,0.2)";
	ctx.fill();
}
//生成随机的颜色
function randomColor() {
	return circleColor[Math.round(Math.random() * circleColor.length)];
}
//场景准备**********
//球 a
let a = {
	r: 50,
	maxR: 50,
	minR: 40,
	zoom: true,
	color: randomColor()
};
let b = {
	r: 30,
	maxR: 30,
	minR: 20,
	zoom: true,
	color: randomColor()
};
//初始化时的两个球球大小变化函数
function ballScale(obj) {
	if (obj.zoom) {
		obj.r -= 0.5;
		obj.zoom = obj.r <= obj.minR ? false : true;
	} else {
		obj.r += 0.5;
		obj.zoom = obj.r >= obj.maxR ? true : false;
	}
}
//开始按钮图片的信息对象
let start_btn_png = {
	name: "start_btn_png",
	width: game.stageWidth / 2,
	height:
		((file["start_btn_png"].h / file["start_btn_png"].w) *
			game.stageWidth) /
		2,
	x: (game.stageWidth - game.stageWidth / 2) / 2,
	y: game.stageHeight / 2 + 60
};
//分享箭头
let arrow_png = {
	name: "arrow_png",
	width: game.stageWidth / 2,
	height: ((file["arrow_png"].h / file["arrow_png"].w) * game.stageWidth) / 2,
	x: (game.stageWidth - game.stageWidth / 2) / 2,
	y: game.stageHeight / 2 + 60
};
//我的成绩
let balance_base_bg_png = {
	name: "balance_base_bg_png",
	width: game.stageWidth,
	height:
		(file["balance_base_bg_png"].h / file["balance_base_bg_png"].w) *
		game.stageWidth,
	x: (game.stageWidth - game.stageWidth) / 2,
	y: game.stageHeight / 2 - 150
};
//不服再来
let again_btn_png = {
	name: "again_btn_png",
	width: game.stageWidth / 3,
	height:
		((file["again_btn_png"].h / file["again_btn_png"].w) *
			game.stageWidth) /
		3,
	x: (game.stageWidth - game.stageWidth / 3) / 2 - 80,
	y: game.stageHeight / 3 + 300
};

//画出按钮
function drawBtn(params) {
	ctx.drawImage(
		img,
		file[params.name].x,
		file[params.name].y,
		file[params.name].w,
		file[params.name].h,
		params.x,
		params.y,
		params.width,
		params.height
	);
}
//初始化准备
function ready() {
	ballScale(a);
	ballScale(b);
	drawCircle(
		game.center.x - a.minR,
		game.center.y - a.maxR,
		a.r,
		a.color,
		true
	);
	drawCircle(
		game.center.x + b.minR,
		game.center.y - b.maxR,
		b.r,
		b.color,
		true
	);
	drawBtn(start_btn_png);
}

//生成指定随机数的函数
function randomNumber(m, n) {
	return Math.round(Math.random() * (n - m) + m);
}
//球球在屏幕中创建
function Boll(m, n) {
	this.r = randomNumber(m, n);
	this.color = randomColor();
}
// var b = new Boll(2,15)
//敌方小球球出现的位置
Boll.prototype.enemyBoll = function() {
	var number = randomNumber(0, 3);
	switch (number) {
		case 0:
			//从上面生成
			this.x = randomNumber(-this.r, game.stageWidth + this.r);
			this.y = -this.r;
			break;

		case 1:
			//从右面生成
			this.x = game.stageWidth + this.r;
			this.y = randomNumber(-this.r, game.stageHeight + this.r);
			break;

		case 2:
			//从下面生成
			this.x = randomNumber(-this.r, game.stageWidth + this.r);
			this.y = game.stageWidth + this.r;
			break;

		case 3:
			//从右面生成
			this.x = -this.r;
			this.y = randomNumber(-this.r, game.stageHeight + this.r);
			break;
	}
};
//敌方球球速度随机生成
function randomSpeed(m, n) {
	return Math.random() * (n - m) + m;
}
let bollspeed = 3;
//敌方球球的速度
Boll.prototype.enemySpeed = function() {
	if (this.x > game.stageWidth) {
		this.speedx = -randomSpeed(0, bollspeed);
		this.speedy = randomSpeed(-bollspeed, bollspeed);
	}
	if (this.x < 0) {
		this.speedx = randomSpeed(0, bollspeed);
		this.speedy = randomSpeed(-bollspeed, bollspeed);
	}
	if (this.y < 0) {
		this.speedx = randomSpeed(-bollspeed, bollspeed);
		this.speedy = randomSpeed(0, bollspeed);
	}
	if (this.y > game.stageHeight) {
		this.speedx = randomSpeed(-bollspeed, bollspeed);
		this.speedy = -randomSpeed(0, bollspeed);
	}
};
//敌方球球移动
Boll.prototype.move = function() {
	this.x = this.x + this.speedx;
	this.y = this.y + this.speedy;
};
//检测球球是否超出画布
Boll.prototype.cheakBoll = function() {
	let rightOver = this.x > game.stageWidth + this.r;
	let leftOver = this.x < -this.r;
	let topOver = this.y < -this.r;
	let bottomOver = this.y > game.stageHeight + this.r;
	this.okOver = rightOver || leftOver || topOver || bottomOver;
};
//我方小球球构造器
function ouRboll() {
	this.x = game.center.x;
	this.y = game.center.y;
	this.r = 6;
	this.die = false;
	this.color = randomColor();
	this.nature = {
		r: this.r,
		maxR: this.r + 8,
		minR: this.r,
		zoom: true,
		color: randomColor()
	};
}
let ourboll = new ouRboll();
//判断是否发生了碰撞
function checkCrash(boll) {
	let d = Math.sqrt(
		Math.pow(boll.x - ourboll.x, 2) + Math.pow(boll.y - ourboll.y, 2)
	);
	if (d < boll.r + ourboll.r) {
		// console.log("撞上了");
		return true;
	}
}

let mmm = true;
let enemyArr = [];
//帧数
let frame = 0;
//为了第二次的重新开始能够再次点击小球球开始游戏
let click = false;
//游戏开始
function start() {
	frame++;
	if (frame % 4 == 0) {
		//敌方小球球
		let newBoll = new Boll(ourboll.r - 4, ourboll.r + 20);
		newBoll.enemyBoll();
		newBoll.enemySpeed();
		enemyArr.push(newBoll);
	}
	enemyArr.forEach(function(boll, index) {
		//敌方小球球移动
		boll.move();
		//画出敌方小球球
		drawCircle(boll.x, boll.y, boll.r, boll.color, true);
		//检测是否发生碰撞
		if (checkCrash(boll)) {
			if (boll.r > ourboll.r) {
				ourboll.die = true;
				// console.log(ourboll.die);
				//我方球球死，游戏结束
				gameOver();
			} else {
				ourboll.die = false;
				boll.die = true;
				// console.log('我方大' + ourboll.die)
				//敌方死忙球球的半径
				var dieBollr = boll.r / 15;
				ourboll.r += dieBollr;
				ourboll.nature.r += dieBollr;
				ourboll.nature.minR += dieBollr;
				ourboll.nature.maxR += dieBollr;
				//得分加加
				game.score += Math.ceil(dieBollr / 5);
			}
		}
	});
	//画出我方球球
	drawCircle(ourboll.x, ourboll.y, ourboll.r, ourboll.color, true);
	//画出我方球球圆环
	ballScale(ourboll.nature);
	drawCircle(
		ourboll.x,
		ourboll.y,
		ourboll.nature.r,
		ourboll.nature.color,
		false
	);

	//删除超出的球球
	enemyArr.forEach(function(boll, index) {
		//检测敌方小球球超出
		boll.cheakBoll();
		if (boll.okOver || boll.die) {
			enemyArr.splice(index, 1);
		}
	});

	//画出得分
	ctx.font = "30px Arial";
	ctx.fillStyle = "#333333";
	ctx.fillText("个数:" + game.score, 10, 50);
}
let actionGame = false;

//游戏排行榜
function m() {
	let score = game.score;
	if (localStorage.score) {
		//方法将数据转换为 JavaScript 对象
			let oldArr = JSON.parse(localStorage.score);
			for (var i = 0; i < oldArr.length; i++) {
				// 检查每一个得分数组对象
				for (key in oldArr[i]) {
					if (key == score) {
						oldArr[i][key]++;
						localStorage.score = JSON.stringify(oldArr);
						return;
					}
	
				}
				
			}		
		let newScore = {};
		newScore[score] = 1;
		oldArr.push(newScore);
		localStorage.score = JSON.stringify(oldArr);
	} else {
		// console.log("第一次");
		let newScore = {};
		newScore[score] = 1;
		localStorage.score = JSON.stringify([newScore]);
	}
}
let zong = 0;
//低于当前分数人数
let man = 0;
//计算排名
function close(){
	let score = game.score;
	if (localStorage.score) {
		//方法将数据转换为 JavaScript 对象
			let oldArr = JSON.parse(localStorage.score);
			for (var i = 0; i < oldArr.length; i++) {
				// 检查每一个得分数组对象
				for (key in oldArr[i]) {
					//计算总人数
					zong += oldArr[i][key];
					if (key < score) {
						man += oldArr[i][key];
					}
	
				}
				
			}		
	}
}


//我方球球死忙，游戏结束
function gameOver() {
	clearInterval(id);
	close()
	m();
	//计算比率
	setTimeout(function(){
	let bi = ((man / zong)*100).toFixed(2)
	ctx.font = "16px Arial";
	ctx.fillStyle = "#333333";
	ctx.fillText(bi, game.center.x + 5, game.center.y +(game.center.y*0.17) );
	zong=0;
	man=0;
	},111)
	//为了能够重新开始
	actionGame = false;
	//画出吃掉的球球个数
	ctx.font = "20px Arial";
	ctx.fillStyle = "#333333";
	ctx.fillText(game.score, game.center.x -(game.center.x*0.01) , game.center.y -(game.center.y*0.012));
	//画布增加一层遮罩
	drawClothover();
	//不服再来
	drawBtn(again_btn_png);
	//分享箭头
	// drawBtn(arrow_png)
	//我的成绩
	drawBtn(balance_base_bg_png);
}

let id = setInterval(function() {
	//每一帧都要清空画布
	ctx.clearRect(0, 0, game.stageWidth, game.stageHeight);
	//更新画布
	drawCloth();
	//画出球球
	if (!actionGame) {
		ready();
	} else {
		//游戏正式开始
		start();
	}
}, 30);

//点击开始游戏

canvas.onclick = function(e) {
	let x =
		e.offsetX >= start_btn_png.x &&
		e.offsetX <= start_btn_png.x + start_btn_png.width;
	let y =
		e.offsetY >= start_btn_png.y &&
		e.offsetY <= start_btn_png.y + start_btn_png.height;
	if (x && y) {
		actionGame = true;
	}

	//判断我方小球球是都被点击到了

	if (
		Math.abs(event.offsetX - game.center.x) < ourboll.r &&
		Math.abs(event.offsetY - game.center.y) < ourboll.r
	) {
			canvas.onmousemove = function(event) {
				//我方小球跟随鼠标移动
				// console.log(event);
				ourboll.x = event.offsetX;
				ourboll.y = event.offsetY;
			};
	}

	if (navigator.maxTouchPoints) {
		canvas.ontouchmove = function(event) {
			// console.log(event);
			ourboll.x = event.touches[0].pageX ;
			ourboll.y = event.touches[0].pageY;
		};
	}

	//点击不服再来，再次重新开始新的一局
	let x1 =
		e.offsetX >= again_btn_png.x &&
		e.offsetX <= again_btn_png.x + again_btn_png.width;
	let y1 =
		e.offsetY >= again_btn_png.y &&
		e.offsetY <= again_btn_png.y + again_btn_png.height;
	if (x1 && y1) {
		newStart();
	}
};
//下一次游戏重新开始
function newStart() {
	// 分数清零
	game.score = 0;
	//我方小球重新创建
	ourboll = new ouRboll();
	enemyArr = [];
	console.log(enemyArr);
	//定时器重新启动
	id = setInterval(function() {
		//每一帧都要清空画布
		ctx.clearRect(0, 0, game.stageWidth, game.stageHeight);
		//更新画布
		drawCloth();
		//画出球球
		if (!actionGame) {
			ready();
		} else {
			//游戏正式开始
			start();
		}
	}, 30);
}
