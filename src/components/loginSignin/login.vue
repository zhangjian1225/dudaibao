<template>
  <div class="container">
    <div class="header">
      <div class="back">
        <!-- <router-link to="/" class="icon iconfont">&#xe611;</router-link> -->
      </div>
      <div class="title">登录</div>
    </div>
    <div class="main">
      <div class="mainIco">
        <img src="../../assets/image/header.jpg" />
      </div>
      <div class="userNameBox">
        <span class="icon"></span>
        <input type="number" class="userName" placeholder="请输入手机号码" v-model="username"  oninput="if(value.length>11) value=value.slice(0,11)"/>
      </div>
      <div class="passwordBox">
        <span class="icon"></span>
        <input type="password" class="password" placeholder="请输入密码" v-model="password" />
      </div>
      <div class="nowSgininBox">
        <router-link to="/forgetPassword">忘记密码</router-link>
        <!-- <router-link to="/signin">立即注册</router-link> -->
      </div>
      <div class="loginBtn" @click="loginFn">登 录</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "",
  data() {
    return {
      code:'', // 获取微信code
      username: "",
      password: "",
      isCanClick: false,
      openId: ''
    };
  },
  methods: {
    // 点击登录
    loginFn: function() {
      let _this = this;
      if (this.isCanClick) {
        this.isCanClick = false;
        if (this.username == "" || this.password == "") {
          Toast('手机号码或密码未填写')
          setTimeout(function() {
            _this.isCanClick = true;
          }, 2000);
        } else {
          this.$axios
            .get("judgeLogin.do", {
              params: {
                username: _this.username,
                password: _this.password,
                oid: _this.openid
              }
            })
            .then(res => {
              if (res.data.code == 0) {
                Toast.success('登录成功');
                _this.isCanClick = true;
                window.location.href = '/#/';
              } else {
                _this.isCanClick = true;
              }
            })
            .catch(function(res) {
              _this.isCanClick = true;
            });
        }
      }
    },
    // 获取opneId
    getOpenId: function () {
      let _this = this;
      this.$axios.get("/getopenid.do", {
        params: {
          noLoadMask: true,
          wxcode: _this.code
        }
      })
      .then(res => {
        _this.openid = res.data.data.openid;
      })
      .catch(function(res) {
        _this.isCanClick = true;
      });
    },
    getCode () { // 非静默授权，第一次有弹框
        this.code = '';
        var local = window.location.href // 获取页面url
        // var appid = 'wx6ff891728badb1df' 
        var appid = "wx6df24f73f607044a";
        this.code = this.getUrlCode().code // 截取code
        if (this.code == null || this.code === '') { // 如果没有code，则去请求
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
        } else {
          this.isCanClick = true;
          this.getOpenId();
        }
    },
    getUrlCode() { // 截取url中的code方法
        var url = location.search
        this.winUrl = url
        var theRequest = new Object()
        if (url.indexOf("?") != -1) {
            var str = url.substr(1)
            var strs = str.split("&")
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
            }
        }
        return theRequest
    }
  },
  mounted() {
    this.getCode();
  },
  
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.3rem;
  background: #fff;
  box-sizing: border-box;
  padding-bottom: 0.25rem;
}
.header {
  position: relative;
  height: 0.8rem;
  width: 100%;
  background: #fff;
  // display: flex;
  // align-items: center;
  border-bottom: 1px solid #f7f7f7;
  .back {
    position: absolute;
    height: 100%;
    width: auto;
    line-height: 0.8rem;
    left: 0.05rem;
    font-size: 0.3rem;
    z-index: 1;
    margin-left: 0.1rem;
    a {
      list-style: none;
      color: #000;
      text-decoration: none;
      font-size: .3rem;
      font-weight: bold;
    }
  }
  .title {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.34rem;
    margin-right: .3rem;
  }
}
.main {
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  display: flex;
  flex-direction: column;
  .mainIco {
    width: 100%;
    height: 2.1rem;
    display: flex;
    justify-content: center;
    margin-top: 0.8rem;
    img {
      width: 2.1rem;
      height: 2.1rem;
      margin: auto;
    }
  }
  .userNameBox {
    width: 100%;
    height: 1rem;
    border-bottom: 1px solid #f7f7f7;
    display: flex;
    margin-top: 0.7rem;
    align-items: center;
    .icon {
      width: 0.3rem;
      height: 0.4rem;
      background: url(./images/2.png) no-repeat;
      background-size: 100% 100%;
    }
    .userName {
      height: 0.6rem;
      width: 100%;
      border: none;
      outline: none;
      font-size: 0.32rem;
      margin-left: 0.5rem;
    }
  }
  .passwordBox {
    width: 100%;
    height: 1rem;
    border-bottom: 1px solid #f7f7f7;
    display: flex;
    align-items: center;
    .icon {
      width: 0.35rem;
      height: 0.35rem;
      background: url(./images/3.png) no-repeat;
      background-size: 100% 100%;
    }
    .password {
      height: 0.6rem;
      width: 100%;
      border: none;
      outline: none;
      font-size: 0.32rem;
      margin-left: 0.45rem;
    }
  }
  .nowSgininBox {
    width: 100%;
    height: .5rem;
    margin-top: .2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      font-size: .28rem;
      color: #777;
    }
  }
  .loginBtn {
    margin-top: 0.6rem;
    width: 100%;
    height: 0.8rem;
    background: #24c3c5;
    text-align: center;
    line-height: 0.8rem;
    color: #fff;
    font-size: 0.34rem;
    border-radius: 0.1rem;
  }
}
</style>
