<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-if="delShow"
        ><span @click="$emit('delAll')">全部删除</span>
        <span @click="delShow = false">完成</span></span
      >
      <van-icon v-else @click="delShow = true" name="delete" />
    </van-cell>
    <van-cell
      v-for="(item, index) in historyList"
      :key="index"
      :title="item"
      @click="$emit('result', item)"
    >
      <van-icon name="close" @click="$emit('del', index)" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  props: {
    historyList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return { delShow: false };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less"></style>