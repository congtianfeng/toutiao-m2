<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        background="#3296fa"
        show-action
        @keyup="change"
        @keydown.enter="result(searchText)"
      >
        <template #action>
          <div @click="$router.back()">取消</div>
        </template>
      </van-search>
    </form>
    <!-- /搜索栏 -->
    <!-- 搜索历史组件 -->
    <SearchHistory
      v-if="searchText.trim() === ''"
      :historyList="historyList"
      @del="del"
      @result="result"
      @delAll="historyList = []"
    />
    <!-- 搜索联想建议组件 -->
    <Searchsuggest
      v-else-if="isSuggestShow"
      :suggestList="suggestList"
      @result="result"
    />
    <!-- 搜索结果组件 -->
    <SearchResult v-else :searchText="searchText" />
  </div>
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import Searchsuggest from "./components/search-suggestion.vue";
import SearchResult from "./components/search-result.vue";
import { getSuggest } from "@/api/users";
import { getItemm, setItemm } from "@/utils/localStorage";
export default {
  name: "SearchPage",
  components: { SearchHistory, Searchsuggest, SearchResult },
  props: {},
  data() {
    return {
      searchText: "",
      isSuggestShow: false,
      suggestList: [],
      resultList: [],
      historyList: getItemm("history") || [],
      timer: 0, //防抖
    };
  },
  computed: {},
  watch: {
    historyList(val) {
      setItemm("history", val);
    },
  },
  created() {},
  methods: {
    change() {
      clearTimeout(this.timer);
      this.isSuggestShow = true;
      if (!this.searchText.trim()) return;
      // 防抖处理
      this.timer = setTimeout(async () => {
        const { data } = await getSuggest(this.searchText);
        this.suggestList = data.options;
      }, 500);
    },
    result(val) {
      this.isSuggestShow = false;
      this.searchText = val;
      this.historyList.unshift(val);
    },
    del(index) {
      this.historyList.splice(index, 1);
    },
  },
};
</script>

<style scoped></style>