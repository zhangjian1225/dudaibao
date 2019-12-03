<template>
  <div class="container">
    <div class="header">
      <div class="title">报名参加</div>
    </div>
    <div class="main">
        <div class="contentBox">
            <p class="titleBox">
                <span class="title" v-html="activeInfo.activityName"></span>
                <span class="plauNum" v-html="'已经报名 '+activeInfo.activityClient+' 人'"></span>
            </p>
            <ul class="list">
                <li>
                    <span>时间：</span>
                    <p v-html="activeInfo.activityTime"></p>
                </li>
                <li>
                    <span>地点：</span>
                    <p v-html="activeInfo.activityAddress"></p>
                </li>
                <li>
                    <span>奖品：</span>
                    <p v-html="activeInfo.activityPrize"></p>
                </li>
                <li>
                    <span>内容：</span>
                    <p  v-html="activeInfo.activityContent"></p>
                </li>
            </ul>
            <div class="nameBox">
                <div class="main_ipt">
                    <span>姓名：<i>*</i></span>
                    <div class="box">
                        <input type="num" placeholder="请输入姓名" v-model="name"/>
                    </div>
                </div>
            </div>
            <div class="nameBox">
                <div class="main_ipt">
                    <span>电话：<i>*</i></span>
                    <div class="box">
                        <input type="number" placeholder="请输入电话" oninput="if(value.length>11) value=value.slice(0,11)" v-model="phone"  @blur="phoneBlur"/>
                    </div>
                </div>
                <p class="errorMsg" v-if="phoneShow">*手机号码格式不正确</p>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="addreBtn" @click="submitFn">立即报名</div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog} from 'vant';
export default {
    name: "playActive",
    data() {
        return {
            activityCode:'',
            activeInfo: {},
            name: '',
            phone:'',
            phoneShow: false,
            empNo:''
        };
    },
    methods: {
        // 手机号input失去焦点
        phoneBlur: function () {
            if (this.phone!='') {
                if (this.checkPhone(this.phone)) {
                    this.phoneShow = false;
                } else {
                    this.phoneShow = true;
                }
            } else {
                this.phoneShow = false;
            }
        },
        submitFn: function () {
            let _this = this;
            if ( this.name!='' && this.phone!='')  {
                if (!this.phoneShow) {
                    Dialog.confirm({
                        title: '确定要参加活动吗？',
                        message: ''
                    }).then(() => {
                        _this.trueBtn();
                    }).catch(() => {
                        _this.falseBtn();
                    });
                } else {
                    Toast('手机号码格式错误');
                }
            } else {
                Toast('带 * 为必填项')
            }
        },
        falseBtn: function () {

        },
        trueBtn: function () {
            let _this = this;
            this.$axios.get("client/joinActivity.do", {
                params: {
                    activityCode: _this.activityCode,
                    clientName: _this.name,
                    phone: _this.phone,
                    empNo: _this.empNo
                }
            })
            .then(res => {
                if (res.data.code == '0') {
                    Toast.success('报名成功');
                }
            })
            .catch(function(res) {
                console.error(res);
            });
        }
    },
    mounted() {
        this.activityCode =  this.$route.query.activityCode;
        let _this = this;
        this.$axios.get("getActivityInfo.do", {
            params: {
                activityCode: _this.activityCode
            }
        })
        .then(res => {
            this.empNo = res.data.data.empNo,
            this.activeInfo = res.data.data.activityInfo;
        })
        .catch(function(res) {
            console.error(res);
        });
    }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  font-size: 0.3rem;
  box-sizing: border-box;
  padding-bottom: 0rem;
}
.header {
  position: relative;
  height: 0.8rem;
  width: 100%;
  background: #fff;
  .title {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.34rem;
    // margin-right: .3rem;
  }
}
.main {
  width: 100%;
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  -webkit-overflow-scrolling : touch;
  padding: .3rem .3rem 0 .3rem;
  .contentBox {
    width: 100%;
    height: auto;
    .titleBox {
        height: .5rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
            font-size: .34rem;
        }
        .playNum {
            font-size: .32rem;
        }
    }
    .list {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 0rem .3rem 0 .3rem;
        margin-top: .3rem;
        li {
            width: 100%;
            height: auto;
            display: flex;
            margin-bottom: .2rem;
            span {
                display: block;
                font-size: .34rem;
            }
            p {
                flex: 1;
                height: auto;
                margin-left: .3rem;
                line-height: .45rem;
            }
        }
    }
  }
  .nameBox {
        height: auto;
        width: 100%;
        .main_ipt {
            height: .8rem;
            width: 100%;
            margin-top: .3rem;
            display: flex;
            align-items: center;
        }
        span {
            display: block;
            font-size: .34rem;
            i {
                color: red;
            }
        }
        .box {
            display: flex;
            align-items: center;
            height: .8rem;
            flex: 1;
            margin-left: .3rem;
            input {
                width: 100%;
                height: 100%;
                border: none;
                outline: none;
                box-sizing: border-box;
                padding-left: .3rem;
                font-size: .32rem;
                border: 1px solid #777;
            }
        }
        .errorMsg {
            font-size: .28rem;
            line-height: .5rem;
            height: .5rem;
            color: red;
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
    .addreBtn {
        width: 100%;
        height: .86rem;
        text-align: center;
        line-height: .86rem;
        font-size: .34rem;
        color: #fff;
        border-radius: .1rem;
        background:  #24c3c5;
    }
}
</style>
