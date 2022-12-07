<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        @click="$router.push('/search')"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 头部导航栏 -->
    <van-tabs animated swipeable v-model="active">
      <van-tab v-for="item in pannelList" :key="item.id" :title="item.name">
        <!-- 文章列表区域-组件 -->
        <articleList :channel="item"></articleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" @click="isEditChannelShow = true">
        <img src="~@/assets/gradient-gray-line.png" alt="" /><i
          class="more iconfont icon-gengduo"
        ></i>
      </div>
    </van-tabs>
    <!-- 频道编辑 -->
    <van-popup
      class="edit-channel-popup"
      v-model="isEditChannelShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      ><ChannelEdit
        :pannelList="pannelList"
        @addP="addP"
        @editP="editP"
        @editPp="editPp"
      ></ChannelEdit
    ></van-popup>
    <!-- /频道编辑 -->
  </div>
</template>

<script>
import { getUserChannels } from "@/api/users";
import articleList from "./components/article-list.vue";
import ChannelEdit from "./components/channel-edit.vue";
export default {
  name: "HomeIndex",
  components: { articleList, ChannelEdit },
  props: {},
  data() {
    return {
      active: 0,
      pannelList: [],
      isEditChannelShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserChannels();
  },
  mounted() {},
  methods: {
    async getUserChannels() {
      try {
        const { data } = await getUserChannels();
        this.pannelList = data.channels;
      } catch (err) {
        this.$toast.fail("获取频道列表失败");
      }
    },
    addP(val) {
      this.pannelList.push(val);
    },
    editP(val) {
      this.pannelList.splice(val, 1);
    },
    editPp(val) {
      this.active = val;
      this.isEditChannelShow = false;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 274px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    font-size: 14px;
    .van-icon {
      font-size: 16px;
      color: #fff;
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 52px;
    height: 44px;
  }
  .more {
    position: fixed;
    top: 46px;
    right: 0;
    width: 52px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #ffffff;
    opacity: 0.9;
  }
  .edit-channel-popup {
    padding-top: 100px;
    box-sizing: border-box;
  }
}
</style>
