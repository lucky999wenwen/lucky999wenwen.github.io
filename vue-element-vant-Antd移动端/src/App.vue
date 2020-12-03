<!--
 * @Author: seven
 * @Date: 2020-11-06 14:51:27
 * @LastEditTime: 2020-11-10 16:59:05
 * @LastEditors: seven
 * @Description: 
 * @FilePath: \BH_Middle_ground\OrganizationManger\src\App.vue
 * @symbol_custom_string_obkoro1: 博虹出品，抄袭必究😄
-->
<template>
  <div id="app">
    <transition :name="animate1">
      <keep-alive>
        <router-view v-if="$router.currentRoute.meta.keepAlive" />
      </keep-alive>
    </transition>
    <transition :name="animate">
      <router-view v-if="!$router.currentRoute.meta.keepAlive" />
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      animate: "",
      animate1: "",
    };
  },
  watch: {
    $route(to, from) {
      if (to.meta.index && from.meta.index) {
        if (to.meta.index > from.meta.index) {
          //设置动画名称
          this.animate = "out1";
          this.animate1 = "out1";
        } else {
          // console.log("后退")
          this.animate = "in1";
          this.animate1 = "out1";
        }
      }
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow: hidden;
  position: relative;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* 路由转场动画 */

@mixin fixStyle1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  flex: 1;
}
.in1-enter-active {
  @include fixStyle1;
  z-index: 200;
  transition: transform 0.4s ease;
}
.in1-enter {
  transform: translateX(100vw);
}
.in1-leave-active {
  @include fixStyle1;
  z-index: 100;
  transition: transform 0.4s ease;
}
.in1-leave-to {
  transform: translateX(-100vw);
}
.out1-enter-active {
  @include fixStyle1;
  z-index: 200;
  transition: transform 0.4s ease;
}
.out1-enter {
  transform: translateX(-100vw);
}
.out1-leave-active {
  @include fixStyle1;
  z-index: 200;
  transition: transform 0.4s ease;
}
.out1-leave-to {
  transform: translateX(100vw);
}
</style>
