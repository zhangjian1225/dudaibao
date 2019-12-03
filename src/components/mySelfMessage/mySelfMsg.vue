<template>
  <div class="container">
      <div class="header">
          <div class="back">
            <router-link to="/mySelfMessage" class="icon iconfont">&#xe611;</router-link> 
          </div>
          <div class="title">个人信息认证</div>
      </div>
      <div class="main">
          <ul class="list">
              <li class="listEver">
                <div class="main_ipt">
                  <div class="text">姓名</div>
                  <div class="box">
                    <input placeholder="请输入真实姓名"/>
                  </div>
                </div>
              </li>
              <li class="listEver">
                <div class="main_ipt">
                  <div class="text">登录手机账号</div>
                  <div class="box">
                    <input class="noUserSelect" placeholder="" value="15810219338" readonly="readonly"/>
                  </div>
                  <p class="errorMsg" v-if="phoneStatus">*手机号码格式不正确</p>
                </div>
              </li>
              <li class="listEver">
                <div class="main_ipt">
                  <div class="text">身份证号</div>
                  <div class="box">
                    <input placeholder="请输入身份证号"/>
                  </div>
                </div>
                <p class="errorMsg" v-if="cardIdStatus">*证件号码格式不正确</p>
              </li>
              <li class="listEver">
                <div class="main_ipt">
                  <div class="text">居住地址</div>
                  <div class="box">
                    <input placeholder="请输入居住地址"/>
                  </div>
                </div>
              </li>
          </ul>
      </div>
      <div class="footer">
        <div class="submit">认证</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'mySelfMsg',
  data () {
    return {
      phoneStatus: false,
      cardIdStatus: false
    }
  }
}
</script>
<style lang="scss" scoped>
  .noUserSelect {
    -webkit-user-select :none;
  }
  .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #f7f7f7;
        font-size: .3rem;
    }
  .header {
    position: relative;
    height: 0.8rem;
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    .back {
      height: 100%;
      width: auto;
      line-height: 0.8rem;
      font-size: 0.3rem;
      z-index: 1;
      margin-left: 0.1rem;
      font-weight: bold;
      a {
        list-style: none;
        color: #000;
        text-decoration: none;
      }
    }
    .title {
      flex: 1;
      height: 100%;
      margin-right: 0.3rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.34rem;
    }
  }
  .main {
      width: 100%;
      flex: 1;
      overflow: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling : touch;
      .list {
          width: 100%;
          height: auto;
          background: #fff;
          margin-top: .2rem;
          box-sizing: border-box;
          padding: 0 .3rem 0 .3rem;
          .listEver {
              width: 100%;
              height: auto;
              position: relative;
              border-bottom: 1px solid #e5e5e5;
              .main_ipt {
                height: .83rem;
                display: flex;
              }
              .text {
                  height: 100%;;
                  line-height: .83rem;
                  font-size: .34rem;
                  color: #000;
              }
              .box {
                height: 100%;
                flex: 1;
                margin-left: 1rem;
              }
              input {
                  width: 100%;
                  height: 100%;
                  border: none;
                  outline: none;
                  text-align: right;
                  font-size: .32rem;
              }
          }
          // .errorMsg {
          //     font-size: .28rem;
          //     line-height: .5rem;
          //     height: .5rem;
          //     color: red;
          // }
          // .listEver:last-child {
          //   border-bottom: none;
          // }
      }
  }
  .footer {
      width: 100%;
      height: 1.4rem;
      box-sizing: border-box;
      padding-right: .25rem;
      padding-left: .25rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .submit {
          width: 100%;
          height: .86rem;
          text-align: center;
          line-height: .86rem;
          font-size: .34rem;
          color: #fff;
          background:  #24c3c5;
          margin-top: .2rem;
          border-radius: .1rem;
      }
  }
</style>
