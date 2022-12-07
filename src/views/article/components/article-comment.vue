<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.aut_name"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">hello</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | relativeTime
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon
          slot="right-icon"
          name="like-o"
          :class="{ active: item.is_liking }"
          @click="like(item.is_liking, item.com_id)"
        />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComments, addCommentLike, deleteCommentLike } from "@/api/users";
export default {
  name: "ArticleComment",
  props: {
    list: {
      type: Array,
      required: true,
    },
    idd: {
      type: [Number, String],
      required: true,
    },
    typee: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      totalCount: 0,
      offset: null,
    };
  },

  methods: {
    async onLoad() {
      // 异步更新数据

      const { data } = await getComments({
        type: this.typee,
        source: this.idd,
        offset: this.offset,
        limit: 10,
      });
      this.$emit("updateList", data.results);
      // 更新总数据条数
      this.totalCount = data.total_count;

      // 3. 将加载更多的 loading 设置为 false
      this.loading = false;

      // 4. 判断是否还有数据
      if (data.results.length) {
        this.offset = data.last_id; // 更新获取下一页数据的页码
      } else {
        this.finished = true; // 没有数据了，关闭加载更多
      }
    },
    //  评论点赞或取消
    async like(val, id) {
      if (val) {
        try {
          await deleteCommentLike(id);
          this.$toast.success("取消点赞成功");
        } catch (err) {
          this.$toast.fail("取消点赞失败");
        }
      } else {
        try {
          await addCommentLike(id);
          this.$toast.success("点赞成功");
        } catch (err) {
          this.$toast.fail("点赞失败");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
  .active {
    color: red;
  }
}
</style>