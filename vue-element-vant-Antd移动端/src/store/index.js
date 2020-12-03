/*
 * @Author: seven
 * @Date: 2020-11-10 15:10:05
 * @LastEditTime: 2020-11-11 14:26:52
 * @LastEditors: seven
 * @Description:
 * @FilePath: \BH_Middle_ground\OrganizationManger\src\store\index.js
 * @博虹出品，抄袭必究😄
 */
import Vue from "vue";
import Vuex from "vuex";
import dist from "@/api/dist.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    distArr: dist.distMap,
    http: "http://192.168.10.113:8084",
    view: "",
    //存储需要记录滚动位置的页面
    scrooTopY: [
      { name: "index", value: 0 },
      { name: "party", value: 0 },
      { name: "publish", value: 0 },
      { name: "datacage", value: 0 },
      { name: "vindex", value: 0 },
    ],
  },
  mutations: {
    //存储tabbar页面的dom元素
    subMitView(state, val) {
      state.view = val;
    },
    //修改滚动的高度
    submitEditScrollTopHeight(state, val) {
      state.scrooTopY.forEach((element, index) => {
        if (element.name == val.router) {
          state.scrooTopY[index].value = val.value;
        }
      });
    }
  },
  actions: {},
  modules: {},
});
