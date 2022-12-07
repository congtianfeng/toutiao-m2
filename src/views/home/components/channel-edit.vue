<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain @click="toggleEdit">{{
        isEdit ? "编辑" : "完成"
      }}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in pannelList"
        :key="value.id"
        :text="value.name"
        @click="editPannels(index)"
      >
        <van-icon
          v-show="isCloseShow && index !== 0"
          slot="icon"
          name="cross"
          size="10"
      /></van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="value in commandPannels"
        :key="value.id"
        :text="value.name"
        @click="addPannel(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from "@/api/users";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    pannelList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      allChannels: [],
      isCloseShow: false,
      isEdit: true,
    };
  },
  computed: {
    commandPannels() {
      return this.allChannels.filter((item) => {
        if (!this.pannelList.find((i) => i.id === item.id)) {
          return item;
        }
      });
    },
  },
  watch: {},
  created() {
    this.getAllChannels();
  },
  mounted() {},
  methods: {
    async getAllChannels() {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.channels;
      } catch (err) {
        this.$toast.fail("获取频道列表失败");
      }
    },
    // 添加频道
    addPannel(value) {
      this.$emit("addP", value);
    },
    toggleEdit() {
      this.isCloseShow = !this.isCloseShow;
      this.isEdit = !this.isEdit;
    },
    // 编辑频道
    editPannels(val) {
      if (val === 0) return;
      if (this.isCloseShow) {
        this.$emit("editP", val);
      } else {
        this.$emit("editPp", val);
      }
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  .channel-item {
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 14px;
      }
    }
  }
}
/deep/ .van-grid-item__icon-wrapper {
  position: absolute;
  top: -16px;
  right: 0;
  width: 5px;
  height: 5px;
}
</style>
