<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginSubmit">
      <van-field
        placeholder="请输入手机号"
        :rules="usersRules.mobileRules"
        v-model="users.mobile"
        name="mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        type="password"
        name="验证码"
        placeholder="请输入验证码"
        :rules="usersRules.codeRules"
        v-model="users.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click="sendCode"
            native-type="button"
            ><span v-if="codeShow">发送验证码</span
            ><span v-else
              ><van-count-down
                :time="time"
                format="ss秒"
                @finish="finish" /></span
          ></van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          block
          type="info"
          native-type="submit"
          :loading="loading"
        >
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { getSmsCode, login } from "@/api/users";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      users: {
        mobile: "",
        code: "",
      },
      usersRules: {
        mobileRules: [
          { required: true, message: "手机号码不能为空" },
          {
            pattern:
              /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: "手机号码格式不正确",
          },
        ],
        codeRules: [
          { required: true, message: "验证码不能为空" },
          { pattern: /^\d{6}$/, message: "验证码格式不正确" },
        ],
      },
      loading: false,
      time: 6 * 1000,
      codeShow: true,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 发送验证码功能
    async sendCode() {
      // 先验证手机号
      try {
        await this.$refs.loginSubmit.validate("mobile");
        this.codeShow = false;
      } catch (err) {
        this.$toast.fail("验证失败");
      }
      try {
        // 发送验证码请求
        await getSmsCode(this.users.mobile);
        this.$toast.success("发送成功");
      } catch (err) {
        if (err.response && err.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试");
        } else {
          this.$toast("发送失败，请稍后重试");
        }
      }
    },
    finish() {
      this.codeShow = true;
    },
    // 提交表单功能
    async onSubmit() {
      this.loading = true;
      try {
        const data = await login(this.users);
        this.$toast.success("登录成功");
        this.$store.commit("updateUsers", data);
        this.$router.push("/home");
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败");
        }
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    // width: 152px;
    // height: 46px;
    line-height: 46px;
    background-color: #ededed;
    // font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
