<template>
  <div class="container">
        <div class="header">
            <div class="back">〈</div>
            <div class="title">我的账户</div>
        </div>
        <div class="main">
            <div class="cardBox">
                <div class="cardBoxMoney">可以提现余额</div>
                <div class="moneyBox">
                    <span class="icon">¥</span>
                    <span class="num">10000.0000</span>
                </div>
                <div class="tixianBox">
                    <router-link to="/tixian">
                        <div class="tixianBtn">提现 ></div>
                    </router-link>
                </div>
            </div>
            <div class="listBox">
                <ul class="ulList">
                    <li class="liList">
                        <router-link to="/duanxian">
                            <div class="text">短险累计收入</div>
                            <div class="num">100000.000</div>
                            <div class="icon">〉</div>
                        </router-link>
                    </li>
                    <li class="liList">
                        <router-link to="/tixianmingxi">
                            <div class="text">累计提现</div>
                            <div class="num">100000.000</div>
                            <div class="icon">〉</div>
                        </router-link>
                    </li>
                    <li class="liList">
                        <router-link to="/daishengxiao">
                            <div class="text">待生效收入</div>
                            <div class="num">100000.000</div>
                            <div class="icon">〉</div>
                        </router-link>
                    </li>
                    <li class="liList liListEnd">
                        <router-link to="/shouxian">
                            <div class="text">寿险累计收入</div>
                            <div class="num">100000.000</div>
                            <div class="icon">〉</div>
                        </router-link>
                    </li>
                </ul>
            </div>
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
        height: .8rem;
        width: 100%;
        background: #fff;
        .back {
            position: absolute;
            height: 100%;
            width: auto;
            line-height: .8rem;
            // font-weight: bold;
            left: .05rem;
            font-size: .3rem;
            z-index: 1;
            a {
                list-style: none;
                text-decoration: none;
            }
        }
        .title {
            position: absolute;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: .8rem;
            font-size: .3rem;
        }
    }
    .main {
        flex: 1;
        width: 100%;
        .cardBox {
            width: 6.9rem;
            height: 2.5rem;
            background: url(./images/1.png) no-repeat;
            background-size: 100% 100%;
            margin:.3rem  auto;
            position: relative;
            .cardBoxMoney {
                position: absolute;
                left: .5rem;
                top: .67rem;
                color: #fff;
                font-size: .28rem;
            }
            .moneyBox {
                position: absolute;
                top: 1.3rem;
                left: .5rem;
                color: #fff;
                display: flex;
                height: .6rem;
                .icon {
                    height: .6rem;
                    font-size: .5rem;
                    line-height: .9rem;
                }
                .num {
                    margin-left: .2rem;
                    flex: 1;
                    font-size: .6rem;
                }
            }
            .tixianBox {
                position: absolute;
                top: .9rem;
                right: 0;
                height: .6rem;
                width: 1.73rem;
                background: rgba(255,255,255, .5);
                border-radius: .3rem 0 0 .3rem;
                text-align: center;
                line-height: .6rem;
                color: #fff;
                a {
                    width: 100%;
                    height: 100%;
                     color: #fff;
                }
            }
        }
        .listBox {
            width: 100%;
            background: #fff;
            box-sizing: border-box;
            padding: 0 .25rem 0 .25rem;
            margin-top: .2rem;
            .ulList {
                width: 100%;
                .liList {
                    width: 100%;
                    height: .84rem;
                    border-bottom: 1px solid #e6e6e6;
                    line-height: .84rem;
                    a {
                        width: 100%;
                        height: 100%;
                        display: flex;
                    }
                    .text {
                        font-size: .28rem;
                        box-sizing: border-box;
                        padding-left: .1rem;
                        color: #333;
                        font-weight: bold;
                    }
                    .num {
                        flex: 1;
                        text-align: end;
                        margin-right: .3rem;
                        color: #ff2a00;
                        font-size: .26rem;
                        font-weight: bold;
                    }
                    .icon {
                        font-size: .24rem;
                        color: #b9b9b9;
                        font-weight: bold;
                    }
                }
                .liListEnd {
                    border: none;
                }
            }
        }
    }
</style>
