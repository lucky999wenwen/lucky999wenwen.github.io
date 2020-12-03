<template>
  <div class="home">
    <div class="view" ref="view" id="Box" @scroll="scrollTop">
      <transition :name="animate">
        <keep-alive>
          <router-view :scrollObj="scrollObj" />
        </keep-alive>
      </transition>
    </div>
    <keep-alive>
      <ul class="nav">
        <van-tabbar
          active-color="#D83427"
          inactive-color="#656565"
          v-model="active"
          safe-area-inset-bottom
        >
          <van-tabbar-item
            replace
            to="/index"
            class="van-tabbar-item-radius-tl"
          >
            <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? icon1.active : icon1.normal"
              alt
            />
            <span>首页</span>
          </van-tabbar-item>

          <van-tabbar-item info replace to="/party">
            <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? icon2.active : icon2.normal"
              alt
            />
            <span>智慧党建</span>
          </van-tabbar-item>

          <van-tabbar-item info replace to="/publish">
            <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? icon3.active : icon3.normal"
              alt
            />
            <span>发布</span>
          </van-tabbar-item>

          <van-tabbar-item
            info
            replace
            to="/datacage"
            class="var-tabbar-item2 van-tabbar-item-radius-tl van-tabbar-item-radius-tr"
          >
            <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? icon4.active : icon4.normal"
              alt
            />
            <span>数据铁笼</span>
          </van-tabbar-item>

          <van-tabbar-item info replace to="/vindex">
            <img
              slot="icon"
              slot-scope="props"
              :src="props.active ? icon5.active : icon5.normal"
              alt
            />
            <span>个人中心</span>
          </van-tabbar-item>
        </van-tabbar>
      </ul>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      active: 0, //底部导航的下标
      icon1: {
        active: require("@/assets/navicon/home.png"),
        normal: require("@/assets/navicon/home-d.png"),
      },
      icon2: {
        active: require("@/assets/navicon/party.png"),
        normal: require("@/assets/navicon/party-d.png"),
      },
      icon3: {
        active: require("@/assets/navicon/publish.png"),
        normal: require("@/assets/navicon/publish-d.png"),
      },
      icon4: {
        active: require("@/assets/navicon/data.png"),
        normal: require("@/assets/navicon/data-d.png"),
      },
      icon5: {
        active: require("@/assets/navicon/user.png"),
        normal: require("@/assets/navicon/user-d.png"),
      },
      scrollObj: false,
      animate: "",
    };
  },
  watch: {
    $route(to, from) {
      if (to.meta.index && from.meta.index) {
        if (to.meta.index > from.meta.index) {
          //设置动画名称
          this.animate = "in";
        } else {
          // console.log("后退")
          this.animate = "out";
        }
      }
    },
  },
  methods: {
    //触底监听
    scrollTop() {
      let scrollTop = document.getElementById("Box").scrollTop;
      let clientHeight = document.getElementById("Box").clientHeight;
      let scrollHeight = document.getElementById("Box").scrollHeight;
      this.scrollObj = false;
      if (scrollTop + clientHeight >= scrollHeight) {
        this.scrollObj = true;
      }
    },
  },
  mounted() {
    this.$store.commit("subMitView", this.$refs.view);
  },
};
</script>

<style lang="scss" scope>
.home {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.view {
  flex: 1;
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
}

.nav {
  display: flex;
  height: 50px;
  position: relative;
  z-index: 999;
  li {
    width: 50%;
  }
}

@mixin fixStyle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  flex: 1;
}
.in-enter-active {
  @include fixStyle;
  z-index: 200;
  transition: transform 0.4s ease;
}
.in-enter {
  transform: translateX(100vw);
}
.in-leave-active {
  @include fixStyle;
  z-index: 100;
  transition: transform 0.4s ease;
}
.in-leave-to {
  transform: translateX(-100vw);
}
.out-enter-active {
  @include fixStyle;
  z-index: 200;
  transition: transform 0.4s ease;
}
.out-enter {
  transform: translateX(-100vw);
}
.out-leave-active {
  @include fixStyle;
  z-index: 200;
  transition: transform 0.4s ease;
}
.out-leave-to {
  transform: translateX(100vw);
}
</style>
