<template>
  <div class="container">
    <div class="header">
      <div class="back">
        <router-link to="/accountKeepe">〈</router-link>
      </div>
      <div class="title">提现</div>
    </div>
    <div class="main">
        <div class="bankIpt">
            <div class="bankBox">
                <img src="./images/2.png"/>
                <span class="bankName">招商银行(8899)</span>
                <span class="bankType">快捷</span>
                <span class="iconText">〉</span>
            </div>
            <div class="iptBox">
                <div class="icon">¥</div>
                <input type="text">
            </div>
        </div>
        <div class="bankTypeBox">
            <div class="bank_1" @click="changeType(false)">
                <div class="textType">请选择转出方式</div>
                <div class="typeBox">
                    <div class="chooseBox">
                        <div :class="chooseType?'chooseBox_1':'chooseBox_2'"></div>
                    </div>
                    <div class="textBox">
                        <div class="textBox_1">快速到账</div>
                        <div class="textBox_2">预计<span>2小时内到账</span>，每日限额5000元</div>
                    </div>
                </div>
            </div>
            <div class="bank_2" @click="changeType(true)">
                <div class="typeBox">
                    <div class="chooseBox">
                        <div :class="!chooseType?'chooseBox_1':'chooseBox_2'"></div>
                    </div>
                    <div class="textBox">
                        <div class="textBox_1">普通到账</div>
                        <div class="textBox_2">预计<span>04月20号</span> (2天后) 23:59前到账</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "homePage",
  data() {
    return {
      chooseType: true
    };
  },
  methods: {
      changeType: function (type) {
          this.chooseType = type;
      }
  }
};
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
  font-size: 0.3rem;
}
.header {
  position: relative;
  height: 0.8rem;
  width: 100%;
  background: #fff;
  .back {
    position: absolute;
    height: 100%;
    width: auto;
    line-height: 0.8rem;
    // font-weight: bold;
    left: 0.05rem;
    font-size: 0.3rem;
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
    line-height: 0.8rem;
    font-size: 0.3rem;
  }
}
.main {
    flex: 1;
    width: 100%;
    .bankIpt {
        width: 100%;
        height: 2rem;
        box-sizing: border-box;
        margin-top: .2rem;
        background: #fff;
        padding: 0 .26rem 0 .26rem;
        .bankBox {
            width: 100%;
            height: .87rem;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            align-items: center;
            img {
                width: .46rem;
                height: .46rem;
            }
            .bankName {
                height: .46rem;
                line-height: .46rem;
                font-size: .26rem;
                font-weight: bold;
                margin-left: .2rem;
            }
            .bankType {
                font-size: .28rem;
                color: #999;
                margin-left: .2rem;
            }
            .iconText {
                font-size: .28rem;
                margin-left: auto;
                color: #999;
            }
        }
        .iptBox {
            width: 100%;
            height: .5rem;
            margin-top: .3rem;
            display: flex;
            align-items: center;
            .icon {
                font-size: .5rem;
            }
            input {
                flex: 1;
                margin-left: .2rem;
                height: .6rem;
                border: none;
                outline: none;
                font-size: .5rem;
            }
        }
    }
    .bankTypeBox {
        width: 100%;
        height: 3.9rem;
        background: #fff;
        margin-top: .2rem;
        box-sizing: border-box;
        padding: .3rem .26rem 0 .26rem;
        .bank_1 {
            height: 2rem;
            width: 100%;
            border-bottom: 1px solid #e6e6e6;
            .textType {
                font-size: .28rem;
                font-weight: bold;
            }
            .typeBox {
                width: 100%;
                height: .42rem;
                display: flex;
                margin-top: .3rem;
                .chooseBox {
                    width: .45rem;
                    .chooseBox_1 {
                        width: .41rem;
                        height: .41rem;
                        border: 2px solid #e6e6e6;
                        border-radius: .25rem;
                    }
                    .chooseBox_2 {
                        width: .45rem;
                        height: .45rem;
                        border-radius: .25rem;
                        background: url(./images/3.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
                .textBox {
                    height: 100%;
                    flex: 1;
                    margin-left: .2rem;
                    .textBox_1 {
                        font-size: .28rem;
                    }
                    .textBox_2 {
                        font-size: .28rem;
                        color: #999999;
                        margin-top: .2rem;
                        span {
                            color: #ff2400;
                        }
                    }
                }
            }
        }
        .bank_2 {
            height: 1.6rem;
            width: 100%;
            .typeBox {
                width: 100%;
                height: .42rem;
                display: flex;
                margin-top: .3rem;
                .chooseBox {
                    width: .45rem;
                    .chooseBox_1 {
                        width: .41rem;
                        height: .41rem;
                        border: 2px solid #e6e6e6;
                        border-radius: .25rem;
                    }
                    .chooseBox_2 {
                        width: .45rem;
                        height: .45rem;
                        border-radius: .25rem;
                        background: url(./images/3.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
                .textBox {
                    height: 100%;
                    flex: 1;
                    margin-left: .2rem;
                    .textBox_1 {
                        font-size: .28rem;
                    }
                    .textBox_2 {
                        font-size: .28rem;
                        color: #999999;
                        margin-top: .2rem;
                        span {
                            color: #ff2400;
                        }
                    }
                }
            }
        }
    }
}
</style>