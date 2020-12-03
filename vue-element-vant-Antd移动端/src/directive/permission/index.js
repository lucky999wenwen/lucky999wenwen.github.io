/*
 * @Descripttion: 
 * @version: 
 * @Author: seven
 * @Date: 2020-07-06 17:10:27
 * @LastEditors: seven
 * @LastEditTime: 2020-07-08 10:54:49
 */ 
import store from '@/store'
export default {
  install (Vue) {
    // v-permission=""
    Vue.directive('permission', {
      inserted (el, binding) {
        const { value } = binding
        const has = permission(value)
        if (!has) el.parentNode && el.parentNode.removeChild(el)
      }
    })
    // this.$permission()
    Vue.prototype.$permission = permission
  }
}

function permission (value = '', { all = false, not = false } = {}) {
  if(process.env.NODE_ENV === 'development') return true
  else {
    const permissions = store.state.menu.btnList.join(',')
    return permissions.indexOf(value) > -1
  }
  
  // if (isArray(value) || isString(value)) {
  //   const permissions = store.state.d2admin.permission.permissions
  //   let has = utils.helper[all ? 'allIn' : 'oneOf'](permissions, value)
  //   if (not) has = !has
  //   return has
  // } else {
  //   return false
  // }
}
