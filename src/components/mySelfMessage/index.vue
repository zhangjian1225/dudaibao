<template>
  <div class="container">
      <div class="header">
          <div class="back">
            <router-link to="/homePage" class="icon iconfont">&#xe611;</router-link>
          </div>
          <div class="title">个人信息</div>
      </div>
      <div class="main">
          <ul class="list">
              <li class="listEver listEver_1">
                <div class="text">我的头像</div>
                <div class="myHeadImg">
                    <img src="../../assets/image/header.jpg"/>
                </div>
              </li>
              <li class="listEver">
                <router-link to="/mySelfMsg">
                  <div class="text">身份认证</div>
                  <div class="text_1">未认证</div>
                  <span class="icon iconfont">&#xe61b;</span>
                </router-link>
              </li>
              <li class="listEver">
                <router-link to="/zizhirenzheng">
                  <div class="text">资质认证</div>
                  <div class="text_1">未认证</div>
                  <span class="icon iconfont">&#xe61b;</span>
                </router-link>
              </li>
              <li class="listEver">
                <div class="text">登录手机账号</div>
                <div class="text_1">15810219338</div>
                <span class="icon iconfont">&#xe61b;</span>
              </li>
              <li class="listEver">
                <div class="text">姓名</div>
                <div class="text_1">平超</div>
              </li>
              <li class="listEver">
                <div class="text">推荐人</div>
                <span class="icon iconfont">&#xe61b;</span>
              </li>
              <li class="listEver">
                <div class="text">证件号码</div>
                <div class="text_1">142431199512282719</div>
              </li>
               <li class="listEver">
                <div class="text">证件编号</div>
                <div class="text_1">142431199512282719</div>
              </li>
               <li class="listEver">
                <div class="text">归属门店</div>
                <div class="text_1">XXX门店</div>
              </li>
               <li class="listEver">
                 <router-link to="/myBankCard">
                  <div class="text">银行卡</div>
                  <div class="text_1">未绑定</div>
                  <span class="icon iconfont">&#xe61b;</span>
                </router-link>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'mySelfMessage',
  data () {
    return {
  
    }
  }
}
</script>
<style lang="scss" scoped>
  a {
    list-style: none;
    text-decoration: none;
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
          align-items: center;
          padding: 0 .2rem 0 .2rem;
          .listEver {
              width: 100%;
              height: .83rem;
              border-bottom: 1px solid #e5e5e5;
              display: flex;
              a {
                display: block;
                width: 100%;
                height: 100%;
                display: flex;
              }
              .text {
                  flex: 1;
                  height: 100%;;
                  line-height: .83rem;
                  font-size: .34rem;
                  color: #000;
              }
              .text_1 {
                  height: 100%;
                  line-height: .83rem;
                  font-size: .32rem;
                  color: #666;
              }
              .text_1_end {
                  color: red;
              }
              .icon {
                  height: 100%;;
                  line-height: .83rem;
                  font-size: .3rem;
                  color: #777;
                  font-weight: bold;
                  margin-left: .1rem;
              }
          }
          .listEver_1 {
              width: 100%;
              height: 1.24rem;
              align-items: center;
              .text {
                  flex: 1;
                  height: 100%;;
                  line-height: 1.24rem;
                  font-size: .34rem;
                  color: #000;
              }
              .myHeadImg {
                  width: 1rem;
                  height: 1rem;
                  img {
                      width: 100%;
                      height: 100%;
                      border-radius: 50%;
                      overflow: hidden;
                  }
              }
          }
      }
  }
</style>
