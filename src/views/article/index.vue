<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-if="loadsucess">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleInfo.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleInfo.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleInfo.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleInfo.pubdate | relativeTime }}
          </div>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="followState"
            >{{ articleInfo.is_followed ? "取消关注" : "关注" }}</van-button
          >
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          v-html="articleInfo.content"
          ref="articleContent"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-if="notfound">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-if="fail">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <!-- 文章评论区域 -->
      <ArticleComment
        :idd="articleId"
        :typee="typee"
        :list="list"
        @updateList="updateList"
      ></ArticleComment>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="articleInfo.comm_count" color="#777" />
      <van-icon
        color="#777"
        :class="{ active: articleInfo.is_collected }"
        name="star-o"
        @click="collectArticle"
      />
      <van-icon
        color="#777"
        :class="{ active: articleInfo.attitude === 1 }"
        name="good-job-o"
        @click="like"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 发布文章评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <ArticleReply
        :articleId="articleId"
        @close="isPostShow = false"
        @updateList2="updateList2"
      />
    </van-popup>
    <!-- /发布文章评论 -->
  </div>
</template>

<script>
import {
  getArticleById,
  followUser,
  delFollowUser,
  collectArticle,
  delCollectArticle,
  addLike,
  deleteLike,
} from "@/api/users";
import { ImagePreview } from "vant";
import ArticleComment from "./components/article-comment.vue";
import ArticleReply from "./components/reply.vue";
export default {
  name: "ArticleIndex",
  components: { ArticleComment, ArticleReply },
  props: {},
  data() {
    return {
      list: [],
      articleId: this.$route.query.articleId,
      articleInfo: {},
      loading: true,
      loadsucess: false,
      notfound: false,
      fail: false,
      typee: "a",
      isPostShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArticle();
  },
  mounted() {},
  methods: {
    async getArticle() {
      try {
        const { data } = await getArticleById(this.articleId);
        this.articleInfo = data;
        this.loadsucess = true;
        // 处理图片点击预览
        this.$nextTick(() => {
          const articleContent = this.$refs.articleContent;
          const img = articleContent.querySelectorAll("img");
          const images = [];
          img.forEach((item, index) => {
            images.push(item.src);
            item.addEventListener("click", function () {
              ImagePreview({ images, startPosition: index });
            });
          });
        });
      } catch (err) {
        if (err && err.response.status === 404) this.notfound = true;
        else {
          this.fail = true;
        }
      }
      this.loading = false;
    },
    // 关注按钮功能
    async followState() {
      if (this.articleInfo.is_followed) {
        try {
          await delFollowUser(this.articleInfo.aut_id);
          this.$toast.success("取消关注成功");
          this.articleInfo.is_followed = false;
        } catch (err) {
          this.$toast.fail("取消关注失败");
        }
      } else {
        try {
          await followUser(this.articleInfo.aut_id);
          this.$toast.success("关注成功");
          this.articleInfo.is_followed = true;
        } catch (err) {
          this.$toast.fail("关注失败");
        }
      }
    },
    // 收藏图标按钮点击功能
    async collectArticle() {
      if (this.articleInfo.is_collected) {
        try {
          await delCollectArticle(this.articleId);
          this.$toast.success("取消收藏成功");
          this.articleInfo.is_collected = false;
        } catch (err) {
          this.$toast.fail("取消收藏失败");
        }
      } else {
        try {
          await collectArticle(this.articleId);
          this.$toast.success("收藏成功");
          this.articleInfo.is_collected = true;
        } catch (err) {
          this.$toast.fail("收藏失败");
        }
      }
    },
    // 点赞功能
    async like() {
      if (this.articleInfo.attitude === 1) {
        try {
          await deleteLike(this.articleId);
          this.$toast.success("取消点赞成功");
          this.articleInfo.attitude = -1;
        } catch (err) {
          this.$toast.fail("取消点赞失败");
        }
      } else {
        try {
          await addLike(this.articleId);
          this.$toast.success("点赞成功");
          this.articleInfo.attitude = 1;
        } catch (err) {
          this.$toast.fail("点赞失败");
        }
      }
    },
    updateList(val) {
      this.list = [...this.list, ...val];
    },
    updateList2(val) {
      this.list.unshift(val);
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 12px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 27px 16px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 61px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      color: #666666;
      margin: 16px 0 23px;
    }
    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #c3c3c3;
      font-size: 15px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 8px;
        background-color: #e22829;
      }
    }
    /deep/ .active {
      color: red !important;
    }
  }
}
</style>
