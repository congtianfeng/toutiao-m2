<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <articleItem v-for="item in list" :key="item.id" :article="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import articleItem from "./article-item.vue";
import { getArticles } from "@/api/users";
export default {
  name: "ArticleList",
  components: { articleItem },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      refreshing: false,
      timestamp: new Date(),
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp,
        });
        // console.log(data);
        this.list.push(...data.results);
        this.loading = false;
        if (data.results.length !== 0) {
          this.timestamp = data.pre_timestamp;
        } else {
          this.loading = false;
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp,
        });
        // console.log(data);
        this.list.unshift(...data.results);
        this.$toast.success(`刷新成功,更新了${data.results.length}条数据`);
      } catch {
        this.$toast.fail("更新失败");
      }
      this.refreshing = false;
    },
  },
};
</script>

<style scoped lang="less"></style>