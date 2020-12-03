<template>
  <div v-if="listData.length">
    <h1>熟悉</h1>
    <div  v-for="(item, index) in listData" :key="index">
      <h1>{{ item.name }}</h1>
      <img :src="item.images" alt="" />
    </div>
    <div>加载更多...</div>
  </div>
</template>

<script>
import { getJokeList } from "@/api/api";
export default {
  props: ["scrollObj"],
  data() {
    return {
      listData: [],
      page: 1,
    };
  },
  watch: {
    scrollObj() {
      if (this.scrollObj) {
        this.page = this.page + 1;
        this.getList();
      }
    },
  },
  methods: {
    getList() {
      getJokeList({ type: "gif", page: this.page, count: 10 }).then((res) => {
        res.result.forEach(element=>{
          this.listData.push(element)
        })
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style></style>
