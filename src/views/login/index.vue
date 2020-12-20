<template>
  <div id="login">
    <div class="loginBox">
      <div class="auth-form">
        <!-- 关闭按钮 -->
        <van-icon name="close"
                  class="closeButton"
                  @click="close" />
        <!-- 账号密码登录 -->
        <van-cell-group>
          <van-field v-model="phone"
                     required
                     clearable
                     maxlength="11"
                     placeholder="请输入手机号"
                     :error-message="phoneNumberRight?'':'手机号格式不正确'" />
          <van-field center
                     clearable
                     required
                     maxlength="6"
                     v-model="smsCode"
                     placeholder="请输入验证码">
            <van-button slot="button"
                        size="small"
                        type="primary"
                        v-if="!countDown"
                        :disabled="captchaDisable"
                        @click="sendVerifyCode">发送验证码</van-button>
            <van-button slot="button"
                        size="small"
                        type="primary"
                        disabled=""
                        v-model="smsCode"
                        v-else>已发送{{countDown}}s</van-button>
          </van-field>
        </van-cell-group>
        <van-button type="info"
                    size="large"
                    style="margin-top:1rem"
                    @click='login'>登陆</van-button>
        <!-- 底部声明 -->
        <p class="agreement">温馨提示：<br>未注册的手机号，登录时将自动注册，且代表同意<a @click.stop="agreement(0)"
             class="agreement-box">用户协议</a>、<a @click.stop=agreement(1)
             class="agreement-box">隐私策略</a></p>
      </div>
    </div>
  </div>
</template>

<script>
// 引入Vant的组件
import { Toast, Dialog } from 'vant'
// 引入API调用接口
import { postLoginSMSCode, postLogin, postUserInfo } from '@/api/personal'
import { setToken } from '@/util/auth'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      countDown: 0,                 // 倒计时
      phone: '',              // 手机号码
      smsCode: '',               // 短信验证码
      userInfo: null
    };
  },
  computed: {
    // 1.手机号码验证
    phoneNumberRight () {
      let value = this.phone;
      // 1.1 当输入的手机号大于10位进行验证
      if (value.length > 10) {
        return /[1][3,4,5,6,7,8][0-9]{9}$/.test(value);
      } else {
        return true;
      }
    },
    // 2.发送验证码按钮显示
    captchaDisable () {
      if (this.phone.length > 10 && this.phoneNumberRight) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    ...mapActions(['syncuserInfo']),
    // 获取手机验证码
    sendVerifyCode () {
      this.countDown = 60;
      this.timeIntervalID = setInterval(() => {
        this.countDown--;
        // 如果减到0 则清除定时器
        if (this.countDown == 0) {
          clearInterval(this.timeIntervalID);
        }
      }, 1000)

      // 获取短信验证码
      postLoginSMSCode({ phone: this.phone, source: 'LOGIN_SMS' }).then(response => {
        // 获取验证码成功
        Dialog.alert({
          title: '温馨提示:',
          message: '验证码:' + response.data
        }).then(() => {
        });
      })
    },
    // 登录
    login () {
      // 验证手机号
      if (!this.phoneNumberRight || this.phone.length < 10) {
        Toast({
          message: '手机号格式不正确',
          duration: 800
        });
        return;
      }
      postLogin({ phone: this.phone, smsCode: this.smsCode }).then(response => {
        setToken('access_token', response.access_token)
        postUserInfo().then(res => {
          console.log(res.data)
          this.syncuserInfo(res.data)
          this.$router.back()
        })
      })

    },
    // 7.用户协议
    agreement (index) {
      if (index == 0) {
        Toast({
          message: '用户协议',
          duration: 800
        })
      } else {
        Toast({
          message: '隐私策略',
          duration: 800
        })
      }
    },
    // 8.关闭
    close () {
      this.$router.back();
    },
    // 正则验证
    phoneRegex (number) {
      return (/[1][3,4,5,6,7,8][0-9]{9}$/.test(number));
    }
  }
}
</script>
<style lang="less" scoped>
#login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../images/login/back2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  .loginBox {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    opacity: 0.95;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    .auth-form {
      position: relative;
      padding: 2rem;
      width: 26.5rem;
      max-width: 90%;
      font-size: 1.167rem;
      background-color: #fff;
      border-radius: 8px;
      box-sizing: border-box;
    }
    img {
      position: absolute;
      top: 1rem;
      left: 50%;
      width: 4rem;
      transform: translate(-50%, -70%);
      z-index: 1;
      @media screen and (max-width: 320px) {
        top: 0.5rem;
        transform: translate(-50%, -40%);
        width: 5rem;
      }
    }
    .closeButton {
      position: absolute;
      right: 1rem;
      top: 0.4rem;
    }
    .verificationImage {
      position: absolute;
      right: 0;
      width: 8rem;
      height: 3rem;
      margin-left: 3rem;
    }
  }
}
.title {
  padding: 0.5rem;
  font-size: 0.5rem;
  color: grey;
}
.agreement {
  // margin-top: 1.667rem;
  line-height: 1rem;
  color: #767676;
  font-size: 0.867rem;
  .agreement-box {
    color: blue;
  }
}
</style>
