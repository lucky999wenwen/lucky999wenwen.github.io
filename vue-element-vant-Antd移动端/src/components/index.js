/*
 * @Author: seven
 * @Date: 2020-11-10 20:33:49
 * @LastEditTime: 2020-11-12 20:15:23
 * @LastEditors: seven
 * @Description: 
 * @FilePath: \BH_Middle_ground\OrganizationManger\src\components\index.js
 * @symbol_custom_string_obkoro1: 博虹出品，抄袭必究😄
 */
import Vue from 'vue'
import bhLayer from './layer'
import BhTable from './table'
Vue.component('bh-layer', bhLayer)
Vue.component('bh-table', BhTable)
// const vueFiles = require.context('./', true, /component\.vue$/)
// vueFiles.keys().forEach(key => {
//   const component = vueFiles(key).default
//   Vue.component(component.name, component)
// })