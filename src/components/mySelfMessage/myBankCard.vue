<template>
  <div class="container">
      <div class="header">
          <div class="back"><router-link to="/mySelfMessage" class="icon iconfont">&#xe611;</router-link> </div>
          <div class="title">我的银行卡</div>
      </div>
      <div class="main">
          <ul class="list">
              <li class="listEver">
                <div class="main_ipt">
                  <div class="text">姓名</div>
                  <div class="box">
                    <input class="noUserSelect" placeholder="" value="平超" readonly="readonly"/>
                  </div>
                </div>
              </li>
              <li class="listEver">
                <div class="main_ipt">
                  <div class="text">银行卡号</div>
                  <div class="box">
                    <input placeholder="请输入银行卡号" />
                  </div>
                </div>
              </li>
              <li class="listEver">
                <div class="main_ipt">
                  <div class="text">银行名称</div>
                  <div class="box">
                    <input placeholder="请输入银行名称"/>
                  </div>
                </div>
              </li>
              <li class="listEver">
                <div class="main_ipt">
                  <div class="text">开户行</div>
                  <div class="box">
                    <input placeholder="请输入开户行"/>
                  </div>
                </div>
              </li>
          </ul>
      </div>
      <div class="footer">
        <div class="submit">提交</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'homePage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
              width: 100%;
              height: .83rem;
              display: flex;
              .text {
                height: 100%;
                line-height: .83rem;
                font-size: .34rem;
                color: #000;
              }
              .box {
                height: 100%;
                flex: 1;
                margin-left: .3rem;
                input {
                  width: 100%;
                  height: 100%;
                  line-height: .83rem;
                  border: none;
                  outline: none;
                  text-align: right;
                  font-size: .32rem;
                }
              }
            }
        }
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
