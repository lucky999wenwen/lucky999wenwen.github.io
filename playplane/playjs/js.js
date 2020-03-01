var stage = document.querySelector(".stage");
var buttonActiongame = document.querySelector(".stage > .action > .actiongame");
var playgamestage = document.querySelector(".stage > .playgame");
var grade = document.querySelector(".playgame > .grade");
var ranking = document.querySelector(".playgame > .ranking");
var dead = document.querySelector(".playgame > .dead");
var resurgence = document.querySelector(".playgame > .dead > .resurgence");
var restart = document.querySelector(".playgame > .dead > .restart");
var game;
//开始游戏界面点击开始切换场景
buttonActiongame.onclick = function() {
	stage.style.transition = "0.3s";
	stage.style.marginLeft = "-100%";
	//实例化游戏
	game = new Game();
	//创建玩家
	game.createPlayer();
	//开始游戏
	game.start();
};
//玩家飞机的配置
var Planefig = {
	path: "./images/our-plane.gif",
	bomb: "./images/our-plane-boom.gif",
	w: 46,
	h:60,
	blood: 3,
	delay: 60
};
//子弹的参数配置
var Bullet = {
	path: "./images/3333.png",
	enemypath:"./images/enemy-bullet.png",
	w: 6,
	h: 14,
	spend: -5,
	FrameNumber: 0,
	blood: 1
};
//敌机子弹参数配置
var EmenyBullet = {
	path:"./images/enemy-bullet.png",
	w: 6,
	h: 14,
	spend: 5,
	FrameNumber: 0,
	blood: 1
};
;
//敌方飞机1
var Novelplane = {
	path: "./images/enemy-plane-s.png",
	bomb: "./images/enemy-plane-s-boom.gif",
	novebullet :  "./images/enemy-bullet.png",
	w: 34,
	h: 32,
	spend: 5,
	blood: 1,
	delay: 30
};
//敌机2号
var Centreplane = {
	path: "./images/enemy-plane-m.png", //正常图
	byplay: "./images/enemy-plane-m-hit.png", //挨打图
	bomb: "./images/enemy-plane-m-boom.gif", //爆炸图片
	novebullet :  "./images/enemy-bullet.png",//敌机普通状态下的子弹
	w: 46, //图片宽度
	h: 60, //图片高度
	spend: 3, //速度
	blood: 5, //血条
	delay: 50 //延时
};
//敌机3号
var Bigplane = {
	path: "./images/enemy-plane-l.png",
	byplay: "./images/enemy-plane-l-hit.png",
	bomb: "./images/enemy-plane-l-boom.gif",
	novebullet :  "./images/enemy-bullet.png",
	w: 110,
	h: 164,
	spend: 1,
	blood: 8,
	delay: 80
};
//元素构造器
//path 图片路径   pagex和pagey是触屏时的坐标
function Element(type, pagx, pagy) {
	this.path = type.path; //正常图
	this.byplay = type.byplay; //挨打图
	this.bomb = type.bomb; //爆炸图
	this.blood = type.blood; //飞机和子弹的固定血条
	this.shisb = type.blood; //飞机、子弹的受攻击后的血条记录
	this.delay = type.delay; //延时的记录
	this.d = type.delay; //最初的延时
	this.w = type.w; //图片宽度
	this.h = type.h; //图片高度
	this.spend = type.spend;
	this.pagx = pagx; //触屏事件的X坐标
	this.pagy = pagy; //触屏事件的Y坐标
	this.bullet = []; //子弹存储的数组
	this.die = false; //记录飞机的死忙状态
}
function Game() {
	this.FrameNum = 0; //帧数
	this.players = 0; //玩家
	this.Gameposback = 0; //游戏时背景移动
	this.eyens = []; //敌机产生接收数组
	this.emenybullet = [];//敌机子弹存储数组
	this.windowW = window.innerWidth;
	this.windowH = window.innerHeight;
	this.setIntervalid = 0; //定时器的id
	this.grade = 0; //成绩记录
}

//触屏时鼠标的位置，将图片移动到正中间
Element.prototype.planemove = function() {
	this.node.style.left = this.pagx - this.w / 2 + "px";
	this.node.style.top = this.pagy - this.h / 2 + "px";
};
Element.prototype.drew = function() {
	this.node = document.createElement("img");
	this.node.src = this.path;
	playgamestage.appendChild(this.node);
	this.planemove();
};

//游戏背景的切换
Game.prototype.showback = function() {
	this.Gameposback++;
	playgamestage.style.backgroundPositionY = this.Gameposback + "px";
};
//位置移动
Element.prototype.move = function() {
	this.pagy += this.spend;
	this.planemove();
};
//玩家飞机
Game.prototype.createPlayer = function() {
	var newPlayer = new Element(
		Planefig,
		window.innerWidth / 2,
		window.innerHeight - 40
	);
	newPlayer.drew();
	this.players = newPlayer;
};

//触屏事件
document.body.ontouchmove = function(event) {
	// console.log(event.touches[0].pageX, event.touches[0].pageY);
	game.players.pagx = event.touches[0].pageX;
	game.players.pagy = event.touches[0].pageY;
	game.players.planemove();
};

// 子弹射出事件Bullet
Element.prototype.creatBullet = function() {
	var newBullet = new Element(
		Bullet,
		game.players.pagx+10,
		game.players.pagy
	);
	newBullet.drew();
	this.bullet.push(newBullet);
	// console.log(Bullet.but);
};
//判断子弹是否超出  返回布尔值
function checkTOPOver(n) {
	if (n.pagy < -n.h / 2) {
		return true;
	}
}
// 子弹的移动事件
Element.prototype.moveBulletnew = function() {
	this.bullet.forEach(function(element, index, arr) {
		element.move();
		if (checkTOPOver(element)) {
			// console.log(element);
			playgamestage.removeChild(element.node);
			arr.splice(index, 1);
		}
	});
};

//敌方飞机
Game.prototype.creatEnemyfig = function(type) {
	var RandomNumber = Math.floor(Math.random() * this.windowW);
	var newcreatEnemy = new Element(type, RandomNumber, -type.h / 2);
	newcreatEnemy.drew();
	this.eyens.push(newcreatEnemy);
};
//敌机子弹
// Game.prototype.creatEnemyBullet = function(type) {
// 	var RandomNumber = Math.floor(Math.random() * this.windowW);
// 	var enemyBullet = new Element(type,RandomNumber,this)
// 	enemyBullet.drew()
// 	this.emenybullet.push(enemyBullet)
// };

//判断敌机是否超出  返回布尔值
Element.prototype.checkBottomOver = function() {
	if (this.pagy > game.windowH + this.h / 2) {
		return true;
	}
};
//敌机的移动事件
Game.prototype.Figallmove = function() {
	this.eyens.forEach(function(element, index, arr) {
		element.move();
		if (element.checkBottomOver()) {
			// console.log(element);
			playgamestage.removeChild(element.node);
			arr.splice(index, 1);
		}
	});
};

//判断子弹是否和敌机发生碰撞  返回布尔值
Element.prototype.YnCrash = function(other) {
	// if (this.shisb > 0) {
	var XLevel = Math.abs(this.pagx - other.pagx) < (this.w + other.w) / 2;
	var YVertical = Math.abs(this.pagy - other.pagy) < (this.h + other.h) / 2;
	// console.log('xxx');
	return XLevel && YVertical ? true : false;
	// }
};
//遍历所有的子弹是否与敌机发生碰撞
Game.prototype.checkAllCrash = function() {
	game.eyens.forEach(function(eyen, index, eyens) {
		game.players.bullet.forEach(function(bullet, i, arr) {
			if (eyen.YnCrash(bullet)) {
				//子弹和敌机已经发生碰撞，血条减小
				eyen.shisb--;
				//子弹死亡
				bullet.shisb--;
			}
		});
		if (eyen.YnCrash(game.players) && !game.players.die) {
			//玩家飞机和敌机撞上了，玩家飞机爆炸
			eyen.shisb = 0;
			//敌机爆炸，敌机血量为0
			game.players.shisb--;
			//玩家血量减一
			game.players.die = true;
			//玩家飞机死亡
			game.players.node.src = game.players.bomb;
			//切换玩家飞机爆炸图片
		}
	});
};

//检测所有的敌机和我方子弹   检测它们的血量
Game.prototype.detectionAllE = function() {
	//敌机受到攻击时的状态
	game.eyens.forEach(function(eyen, index, eyens) {
		if (eyen.shisb < eyen.blood && eyen.shisb > 0) {
			//收到攻击但是还没有死（处于挨打状态）
			eyen.node.src = eyen.byplay;
		} else if (eyen.shisb <= 0 && !eyen.die) {
			eyen.die = true;
			//敌机血量小于0时，说明敌机已经死了
			eyen.node.src = eyen.bomb;
		}
	});
	game.players.bullet.forEach(function(bullet, index, bullets) {
		if (bullet.shisb <= 0) {
			//子弹死忙
			game.grade++;
			//分数加加
			playgamestage.removeChild(bullet.node);
			//移除掉死忙的子弹节点
			bullets.splice(index, 1);
			//数组更新
			grade.innerText = game.grade;
		}
	});
};
//花钱买命
resurgence.onclick = function() {
	//重新赋予购买的生命
	game.players.shisb = 3;
	//生命购买完成，购买框弹回
	dead.style.bottom = -dead.offsetHeight + "px";
};
//重新开始
restart.onclick = function() {
	//页面刷新，重置游戏
	window.location.reload();
};

//清楚掉爆炸后的飞机
Game.prototype.clearExplodeFig = function() {
	game.eyens.forEach(function(eyen, index, eyens) {
		if (eyen.die === true) {
			eyen.delay--;
			if (eyen.delay < 0) {
				playgamestage.removeChild(eyen.node);
				//移除掉死忙的子弹节点
				eyens.splice(index, 1);
				//数组更新
			}
		}
	});
	if (game.players.die) {
		if (game.players.shisb > 0) {
			//如果还有命
			game.players.delay--;
			//延时开始
			if (game.players.delay < 0) {
				//爆炸完成显示新的玩家飞机
				game.players.node.src = game.players.path;
				game.players.die = false;
				//重置新的延时记录值
				game.players.delay = game.players.d;
			}
		} else {
			//结束
			game.gameOver();
		}
	}
};

Game.prototype.start = function() {
	this.setIntervalid = setInterval(function() {
		// console.log(this.setIntervalid );
		//游戏背景变化
		game.showback();
		//帧数
		game.FrameNum++;
		//敌机每一帧移动
		game.Figallmove();
		//子弹每一帧移动
		game.players.moveBulletnew();
		//检测子弹和敌机是否发生碰撞
		game.checkAllCrash();
		//检测敌机和子弹的血量
		game.detectionAllE();
		//清理爆炸后的飞机
		game.clearExplodeFig();
		if (game.FrameNum % 5 === 0) {
			//用户飞机子弹的创建
			game.players.creatBullet();
			// game.eyens.forEach(function(element,index,arr){
			// 	element.creatEnemyBullet(Bullet)
			// })
			// game.creatEnemyBullet(EmenyBullet)
		}
		if (game.FrameNum % 50 === 0) {
			//敌方小飞机的创建
			game.creatEnemyfig(Novelplane);
		}
		if (game.FrameNum % 150 === 0) {
			game.creatEnemyfig(Centreplane);
		}
		if (game.FrameNum % 500 === 0) {
			game.creatEnemyfig(Bigplane);
		}
	}, 30);
	this.state = 1;
	//记录一下游戏的状态
	ranking.style.top = -ranking.offsetHeight + 'px'
};
//游戏停止
Game.prototype.gamePause = function() {
	clearInterval(this.setIntervalid);
	//清除定时器
	this.state = 0;
	//记录一下游戏的状态3
};
//游戏结束
Game.prototype.gameOver = function() {
	this.gamePause();
	dead.style.bottom = "100px";
	ranking.style.top = ranking.offsetHeight + 'px'
};

//点击一下触发暂停事件 再次点击触发继续游戏事件
playgamestage.ontouchstart = function(start) {
	// console.log(start);
	//ontouchstart手指按下的时候的坐标
	var startX = start.touches[0].clientX;
	var startY = start.touches[0].clientY;
	document.body.ontouchend = function(end) {
		//ontouchend手指离开的时候的坐标
		var endX = end.changedTouches[0].clientX;
		var endY = end.changedTouches[0].clientY;
		if (startX === endX && startY === endY) {
			// console.log('xxx');
			if (game.state === 0) {
				game.start();
			} else {
				game.gamePause();
			}
		}
	};
};

Game.prototype.Buff = function(){
	Element.prototype.creatBullet = function() {
		var newBullet = new Element(
			Bullet,
			game.players.pagx + 18,
			game.players.pagy
		);
		var newBullet2 = new Element(
			Bullet,
			game.players.pagx - 18,
			game.players.pagy
		);
		newBullet.drew();
		newBullet2.drew()
		this.bullet.push(newBullet);
		this.bullet.push(newBullet2)
		// console.log(Bullet.but);
	};
}