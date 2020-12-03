/*
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2020-09-16 15:45:23
 * @LastEditors: seven
 * @LastEditTime: 2020-11-10 20:38:00
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import Antd from 'ant-design-vue';
import Vant from 'vant';
import VueCropper from 'vue-cropper'

import 'element-ui/lib/theme-chalk/index.css'
import 'ant-design-vue/dist/antd.css';
import 'vant/lib/index.css';

// 组件
import '@/components'

// Vue.config.productionTip = false
Vue.use(element);
Vue.use(Antd);
Vue.use(Vant);
Vue.use(VueCropper)

let install = null;
function render(props) {
  install = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
} else {
  render();
}
export async function bootstrap({ param, components, utils }) {
  // 注册主应用下发的组件
  Vue.use(components);
  // 把工具函数挂载在vue $mainUtils对象
  Vue.prototype.$mainUtils = utils;
}

export async function mount(props) {
  render(props);
  Vue.prototype.$app = props
}
export async function unmount(props) {
  install.$destroy();
}