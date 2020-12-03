<template>
  <div>
    指挥
    <div v-if="dataList.length">
      <div
        class="new-item"
        v-for="(item, index) in dataList"
        :key="index"
        @click="toDel(item)"
      >
        <img class="new-img" :src="item.image" alt="" />
        <p>{{ item.title }}</p>
        <p>{{ item.passtime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/api";
export default {
  props: ["scrollObj"],
  data() {
    return {
      dataList: [],
      count: 90,
      cont: 80,
      page: 30,
    };
  },
  watch: {
    scrollObj() {
      if (this.scrollObj) {
        this.page = this.page + 1;
        this.getLists();
      }
    },
  },
  methods: {
    //点击每一个消息跳转带详情页面
    toDel(item) {
      this.$router.push({ name: "newdetail", params: { htmlUrl: item } });
    },
    getLists() {
      getList({ page: this.page, count: 5 }).then((res) => {
        res.result.forEach((element) => {
          this.dataList.push(element);
        });
      });
    },
  },
  created() {
    this.getLists();
  },
  // beforeRouteEnter(to, from, next) {
  //   // ...
  //   next((vm) => {
  //     setTimeout(() => {
  //       vm.$store.state.view.scrollTop = vm.$store.state.scrooTopY[1].value;
  //     }, 100);
  //   });
  // },
  // beforeRouteLeave(to, from, next) {
  //   let scrollTop = this.$store.state.view.scrollTop;
  //   this.$store.commit("submitEditScrollTopHeight", {
  //     router: "party",
  //     value: scrollTop,
  //   });
  //   next();
  // },
};
</script>

<style></style>
