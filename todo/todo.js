let time = new Date();
let year = time.getFullYear();
let month = time.getMonth() + 1;
let data = time.getDate();
let timer = year + "/" + month + "/" + data;
let idtime = year + "" + month + "" + data;
Vue.component("add-todo", {
	props: ["isEditing", "todos"],
	data: function() {
		return {
			newTodo: "",
			ok: true
		};
	},
	template: `
                <div class="addText" :class="{active:isEditing}">
                    <div :class="{model:isEditing}" @click="$emit('close-editing')"></div>
                    <textarea v-model.trim='newTodo' @input="okc"></textarea>
                    <button v-bind:disabled="ok" @click='buttonclick'>确定</button>
                </div>
                `,
	methods: {
		buttonclick: function() {
			if (this.newTodo) {
				this.$emit("translate-newtodo", this.newTodo);
				this.newTodo = "";
				this.ok = true;
			}
		},
		okc: function() {
			if (this.newTodo != "") {
				this.ok = false;
			}
		}
	}
});

Vue.component("todo-item", {
	props: ["todo"],
	data: function() {
		return {
			current: 0,
			isList: true,
			myVar: null
		};
	},
	template: `
                    <li @touchstart='xxx' @touchend='xx' :class="{finish:todo.finished}" v-show="todo.delate">
                        <i v-if="todo.finished" class="fa fa-check-square" @click='undelete'></i>
                        <i v-else class="fa fa-square-o"></i>
                        <span @click='Click'>{{todo.text}}</span>
                    </li>
                `,
	methods: {
		Click: function() {
			this.current++;
			this.$emit("backcurrent", this.current);
		},
		//撤销删除
		undelete: function() {
			this.$emit("childundelete");
		},
		//长按删除掉已经删除的todo
		xxx: function(event) {
			this.myVar = setTimeout(() => {
				let x = event.touches[0].pageX;
				let y = event.touches[0].pageY;
				this.$emit("backpagey", [y, this.isList]);
			}, 1000);
		},
		xx: function() {
			clearTimeout(this.myVar);
		}
	}
});
//删除的遮罩
Vue.component("delat-bu", {
	props: ["delatbull"],
	template: `<div :class="{list:delatbull}" @click="$emit('undelatetodo')">
				<span></span>
				<span v-show='delatbull' @click="$emit('delatetodo')">删除</span>
				</div>`,
	methods: {}
});
//头部
Vue.component("logo", {
	props: [],
	data: function() {
		return {
			//菜单栏的数据
			navs: [
				{
					text: "皮肤"
				},
				{
					text: "查看历史"
				},
				{
					text: "好美"
				},
				{
					text: "好帅"
				},
				{
					text: "屌爆了"
				}
			],
			navcurrent:0,
			listshow:false
		};
	},
	template: `<div>
					<span>todo</span>
					<span class='fa fa-list-ul' @click='listnav'></span>
					<ul v-show="listshow">
					<li v-for="(nav,index) in navs"  @click='navclick(index)'>{{nav.text}}</li>
					</ul>
				</div>`,
	methods: {
		listnav: function() {
			this.navcurrent=this.navcurrent >=2 ? 1:++this.navcurrent
			if(this.navcurrent%2!=0){
				this.listshow=true
			}else{
				this.listshow=false
			}
		},
		navclick: function(index) {
			console.log(index);
		}
	}
});
Vue.component("serch", {});
var app = new Vue({
	el: "#app",
	data: {
		todos: [],
		isEditing: false,
		time: null,
		delatbull: false
	},
	computed: {
		//已经完成的
		finishedTodos: function() {
			return this.todos
				.filter(function(todo) {
					return todo.finished;
				})
				.reverse();
		},
		//没有完成的
		unfinishedTodos: function() {
			return this.todos
				.filter(function(todo) {
					return !todo.finished;
				})
				.reverse();
		}
	},
	methods: {
		addTodo: function(str) {
			// console.log(str);

			// 提交数据
			this.todos.push({
				id: idtime + "" + this.todos.length,
				text: str,
				finished: false,
				current: 0,
				pagey: null,
				delate: true
			});
			this.seTlocalStorage();
			// 关闭编辑状态
			this.isEditing = false;
		},
		seTlocalStorage: function() {
			localStorage[timer] = JSON.stringify(app.todos);
		},
		getcurrent: function(m, i) {
			app.todos.forEach((element, index, arr) => {
				if (element.id == i) {
					Vue.set(app.todos[index], "current", m);
				}
			});
			if (m % 2 != 0) {
				app.todos.forEach((element, index, arr) => {
					if (element.id == i) {
						Vue.set(app.todos[index], "finished", true);
						this.seTlocalStorage();
					}
				});
			}
		},
		parentundelete: function(x) {
			app.todos.forEach((element, index, arr) => {
				if (element.id == x) {
					Vue.set(app.todos[index], "current", 0);
					Vue.set(app.todos[index], "finished", false);
					this.seTlocalStorage();
				}
			});
		},
		//获得触屏时的位置坐标
		backpageys: function(y, z) {
			app.todos.forEach((element, index, arr) => {
				if (element.id == z) {
					Vue.set(app.todos[index], "pagey", y[0]);
					this.seTlocalStorage();
				}
			});
			this.delatbull = y[1];
			this.seTlocalStorage();
		},
		//点击删除
		delatetodo: function(a) {
			app.todos.forEach((element, index, arr) => {
				if (element.pagey != null) {
					Vue.set(app.todos[index], "delate", false);
					this.seTlocalStorage();
					this.delatbull = false;
				}
			});
		},
		//取消删除
		undelatetodo: function() {
			app.todos.forEach((element, index, arr) => {
				if (element.delate) {
					Vue.set(app.todos[index], "pagey", null);
					this.delatbull = false;
					this.seTlocalStorage();
				}
			});
		}
	}
});

if (localStorage[timer] != null) {
	let newlo = JSON.parse(localStorage[timer]);
	app.todos = newlo;
} else if (localStorage.key(localStorage.length - 1) != null) {
	let m = localStorage.key(localStorage.length - 1);
	let newLosto = JSON.parse(localStorage.getItem(m));
	for (e of newLosto) {
		if (!e.finished) {
			app.todos.push(e);
		}
	}
}
