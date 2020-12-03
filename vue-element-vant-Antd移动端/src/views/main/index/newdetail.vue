<template>
  <div>
  <div>
    <h2>{{htmlUrl.title}}</h2>
    <h4>{{htmlUrl.passtime}}</h4>
    <img :src="htmlUrl.image" alt="">
  </div>
    <button @click="$router.go(-1)">返回</button>
    <!-- <iframe :src="htmlUrl" frameborder="0"></iframe> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlUrl: "",
    };
  },
  created() {
    console.log(this.$route.params.htmlUrl);
    this.htmlUrl = this.$route.params.htmlUrl;
  },
  mounted() {
    // console.log(this.$route.params.htmlUrl)
    // this.htmlUrl = this.$route.params.htmlUrl
  },
  // beforeRouteEnter (to, from, next) {
  //     // ...
  //     console.log(to,from,next)
  // }
};
</script>

<style lang="scss" scope>
iframe {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
