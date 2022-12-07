<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="pubReply">发布</van-button>
  </div>
</template>

<script>
import { articleReply } from "@/api/users";
export default {
  name: "CommentPost",
  components: {},
  props: {
    articleId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async pubReply() {
      try {
        const { data } = await articleReply({
          target: this.articleId,
          content: this.message,
        });
        this.$emit("updateList2", data.new_obj);
        this.message = "";
      } catch (err) {
        this.$toast.fail("评论失败");
      }
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>