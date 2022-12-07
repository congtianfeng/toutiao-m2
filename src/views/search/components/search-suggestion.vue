<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in suggestList"
      :key="index"
      :title="item"
      icon="search"
      @click="search(item)"
    ></van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    suggestList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async search(item) {
      this.$emit("result", item);
    },
  },
};
</script>

<style scoped lang="less"></style>