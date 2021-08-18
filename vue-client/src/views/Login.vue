<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">后台管理系统</span>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="80px"
          class="loginForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="email"
              v-model="loginForm.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('loginForm')"
              class="submit_btn"
              >登录</el-button
            >
          </el-form-item>
          <div class="tiparer">
            <span
              >还没有账号？<router-link to="/register">注册</router-link></span
            >
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur",
            type: "email",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "密码长度在6到20个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this.$axios.post("api/users/login", this.loginForm).then((res) => {
            // 登录成功
            // console.log(res.data.token);
            const { token } = res.data;
            // 存储token
            localStorage.setItem("userToken", token);
            // 解析token
            const decoded = jwt_decode(token);
            //console.log(decoded);
            this.$message({
              message: "用户登录成功",
              type: "success",
            });
            this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decoded));
            this.$store.dispatch("setUser", decoded);
            this.$router.push("/index");
          });
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
  .form_container {
    width: 370px;
    height: 210px;
    position: absolute;
    top: 10%;
    left: 34%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    .manage_tip {
      .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #fff;
      }
      .loginForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
        .submit_btn {
          width: 100%;
        }
        .tiparer {
          text-align: right;
          color: #000;
          font-size: 12px;
        }
      }
    }
  }
}
</style>