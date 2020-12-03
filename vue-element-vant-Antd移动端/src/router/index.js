/*
 * @Author: seven
 * @Date: 2020-11-06 14:51:27
 * @LastEditTime: 2020-11-10 15:11:54
 * @LastEditors: seven
 * @Description:
 * @FilePath: \BH_Middle_ground\OrganizationManger\src\router\index.js
 * @symbol_custom_string_obkoro1: 博虹出品，抄袭必究😄
 */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require("@/libs/util.import." + process.env.NODE_ENV);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    redirect: "/index",
    component: _import("main/home"),
    meta: {
      title: "home",
      keepAlive: true,
    },
    //底部导航栏的路由位置
    children: [
      {
        path: "/index",
        name: "index",
        component: _import("main/index"),
        meta: {
          title: "home",
          keepAlive: true,
          index: 1,
        },
      },
      {
        path: "/party",
        name: "party",
        component: _import("main/party/party"),
        meta: {
          keepAlive: true,
          index: 2,
        },
      },
      {
        path: "/publish",
        name: "publish",
        component: _import("main/publish"),
        meta: {
          keepAlive: true,
          index: 3,
        },
      },
      {
        path: "/datacage",
        name: "datacage",
        component: _import("main/datacage/datacage"),
        meta: {
          keepAlive: true,
          index: 4,
        },
      },
      {
        path: "/vindex",
        name: "vindex",
        component: _import("main/vindex/vindex"),
        meta: {
          keepAlive: true,
          index: 5,
        },
      },
    ],
  },
  {
    path: "/newdetail",
    name: "newdetail",
    component: _import("main/index/newdetail"),
    meta: {
      keepAlive: false,
      index: 6,
    },
  },
  {
    path: "*",
    name: "404",
    component: _import("system/404"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/app",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    store.state.scrooTopY.map((item) => {
      if (item.name == to.name) {
        setTimeout(() => {
          store.state.view.scrollTop = item.value;
        }, 100);
      }
    });
  }

  if (from.name) {
    store.state.scrooTopY.map((item) => {
      if (item.name == from.name) {
        let height = store.state.view.scrollTop;
        store.commit("submitEditScrollTopHeight", {
          router: item.name,
          value: height,
        });
      }
    });
  }
  next();
  // if(to.name) next()
  // else {
  //   console.log(from)
  //   next()
  // }
});

export default router;
