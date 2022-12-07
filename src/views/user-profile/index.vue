<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 个人信息 -->
    <van-cell
      class="avatar-cell"
      title="头像"
      is-link
      center
      @click="onChangePhoto"
    >
      <van-image class="avatar" round fit="cover" :src="profile.photo" />
    </van-cell>
    <van-cell title="昵称" :value="profile.name" is-link />
    <van-cell title="性别" :value="gender" is-link />
    <van-cell title="生日" :value="profile.birthday" is-link />
    <!-- /个人信息 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <updatePhoto
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="profile.photo = $event"
      />
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile, updateUserPhoto } from "@/api/users";
import updatePhoto from "./components/update-photo.vue";
export default {
  name: "UserProfile",
  components: { updatePhoto },
  props: {},
  data() {
    return {
      profile: {},
      isUpdatePhotoShow: false,
      img: null,
    };
  },
  computed: {
    gender() {
      if (this.profile.gender === 0) return "男";
      else {
        return "女";
      }
    },
  },
  watch: {},
  created() {
    this.getUserProfiles();
  },
  mounted() {},
  methods: {
    async getUserProfiles() {
      try {
        const { data } = await getUserProfile();
        this.profile = data;
      } catch (err) {
        this.$toast.fail("获取用户资料失败");
      }
    },
    onChangePhoto() {
      this.$refs.file.click();
    },

    onFileChange() {
      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(this.$refs.file.files[0]);
      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true;
    },
  },
};
</script>

<style scoped lang="less">
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 30px;
      height: 30px;
    }
  }
}
</style>