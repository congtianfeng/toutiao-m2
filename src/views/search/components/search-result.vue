<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getResult } from "@/api/users";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      results: [],
      page: 1,
      perpage: 20,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      const { data } = await getResult({
        page: this.page,
        perpage: this.perpage,
        q: this.searchText,
      });
      this.results.push(...data.results);
      this.loading = false;
      if (data.results.length) {
        this.page++;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style scoped lang="less"></style>