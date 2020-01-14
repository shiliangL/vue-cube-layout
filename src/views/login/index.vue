<template>
  <div class="user-login">
    <div class="user-login-bg" :style="{'background-image':`url(${backgroundImage})`}" />

    <div class="page-login--layer">
      <ul class="circles">
        <li v-for="n in 10" :key="n" />
      </ul>
    </div>

    <div class="page-login--time">{{ time }}</div>

    <div class="content-wrapper">
      <h2 class="slogan">
        <!-- 欢迎使用 -->
      </h2>
      <div class="form-container">
        <h4 class="form-title">登录</h4>
        <el-form ref="form" :model="loginForm" label-width="0">
          <div class="form-items">
            <el-row class="form-item">
              <el-col>
                <el-form-item
                  prop="username"
                  :rules="[ { required: true, message: '会员名/邮箱/手机号不能为空'}]"
                >
                  <div class="form-line">
                    <i class="el-icon-edit-outline input-icon" />
                    <el-input v-model="loginForm.username" placeholder="会员名/邮箱/手机号" />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="password" :rules="[ { required: true, message: '密码不能为空'}]">
                  <div class="form-line">
                    <i class="el-icon-service input-icon" />
                    <el-input v-model="loginForm.password" type="password" placeholder="密码" />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-col>
                <el-form-item>
                  <el-checkbox class="checkbox">记住账号</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-button
                type="primary"
                class="submit-btn ac"
                size="small"
                :loading="loading"
                @click="submitBtn('form')"
              >登 录</el-button>
            </el-row>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
const backgroundImage =
  'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png'

import { validUsername } from '@/utils/validate'
import dayjs from 'dayjs'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      backgroundImage: backgroundImage,
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timeInterval)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    submitBtn(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.loading = true
          this.$router.push({ path: this.redirect || '/' })
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          this.loading = false
          return false
        }
      })
    },
    refreshTime() {
      this.time = dayjs().format('HH:mm:ss')
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

.user-login {
  user-select: none;
  .user-login-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
  }
  .el-checkbox__label {
    color: #999;
    font-size: 13px;
  }
  .content-wrapper {
    position: absolute;
    top: -100px;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .slogan {
      user-select: none;
      text-align: center;
      color: #3080fe;
      font-size: 36px;
      letter-spacing: 2px;
      line-height: 48px;
      text-shadow: 0 2px 5px 0 rgba(0,0,0,.3);
    }
  }
  .form-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 30px 40px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 1px 1px 2px #eee;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .form-Item {
    position: relative;
    flex-direction: column;
  }
  .form-line {
    position: relative;
    display: flex;
    align-items: center;
    &:after {
      content: "";
      position: absolute;
      bottom: 3px;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-color: #dcdcdc;
      border-radius: 0;
    }
  }
  .el-input {
    width: 240px;
    input {
      border: none;
      margin: 0;
      padding-left: 10px;
      font-size: 13px;
    }
  }
  .form-title {
    margin: 0 0 20px;
    text-align: center;
    color: #3080fe;
    letter-spacing: 12px;
  }
  .input-icon {
    color: #999;
  }
  .checkbox {
    margin-left: 5px;
  }
  .submit-btn {
    margin-bottom: 25px;
    width: 100%;
    background: #3080fe;
    border-radius: 28px;
  }
  .tips {
    color: #999;
  }
  .link {
    color: #999;
    text-decoration: none;
    font-size: 13px;
  }
  .line {
    color: #dcd6d6;
    margin: 0 8px;
  }

  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;

    li {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background:#fafafa78;
      animation: animate 25s linear infinite;
      bottom: -200px;

      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }

        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }

      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }

      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }

      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }

      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }

      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }

      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }

      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }

      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }

      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }

      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }

  .page-login--time {
    text-shadow: 0 2px 5px 0 rgba(0,0,0,.3);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 24px;
    font-size: 10rem;
    text-align: center;
    font-weight: bold;
    color: #fafafa78;
    overflow: hidden;
  }
}

@media screen and (max-width: 720px) {
  .user-login {
    .content-wrapper {
      margin: 20px auto;
      top: 40px;
      max-width: 300px;
      display: block;
      .slogan {
        color: #3080fe;
        font-size: 22px;
        line-height: 30px;
        text-shadow: 0 2px 5px 0 rgba(0,0,0,.3);
      }
    }
  }
}
</style>
