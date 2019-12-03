<template>
  <div class="container">
    <div class="header">
      <div class="back">
        <router-link to="/storeActive" class="icon iconfont">&#xe611;</router-link>
      </div>
      <div class="title">新增活动</div>
    </div>
    <div class="main">
        <ul class="list">
            <li class="listEver">
                <div class="main_ipt">
                    <span class="desc">活动名称<i>*</i></span>
                    <div class="box">
                        <input class="ipt" type="text" placeholder="请输入活动名称" v-model="name"/>
                    </div>
                </div>
            </li>
            <li class="listEver" @click="dataFn">
                <div class="main_ipt">
                    <span class="desc">活动日期<i>*</i></span>
                    <div class="box">
                        <input class="ipt noUserSelect" readonly="readonly" type="text" placeholder="请输入活动日期" :value="date"/>
                    </div>
                    <span class="icon iconfont">&#xe61b;</span>
                </div>
            </li>
            <li class="listEver" @click="timeFn">
                <div class="main_ipt">
                    <span class="desc">活动时间<i>*</i></span>
                    <div class="box">
                        <input class="ipt noUserSelect" readonly="readonly" type="text" placeholder="请输入活动时间" :value="time"/>
                    </div>
                    <span class="icon iconfont">&#xe61b;</span>
                </div>
            </li>
            <li class="listEver">
                <div class="main_ipt">
                    <span class="desc">活动地点<i>*</i></span>
                    <div class="box">
                        <input class="ipt" type="text" placeholder="请输入活动地点" v-model="place"/>
                    </div>
                </div>
            </li>
            <li class="listEver">
                <div class="main_ipt">
                    <span class="desc">活动奖品<i>*</i></span>
                    <div class="box">
                        <input class="ipt" type="text" placeholder="请输入活动奖品" v-model="gift"/>
                    </div>
                </div>
            </li>
            <li class="listEver">
                <div class="main_ipt">
                    <span class="desc">联系人<i>*</i></span>
                    <div class="box">
                        <input class="ipt" type="text" placeholder="请输入联系人姓名" v-model="person"/>
                    </div>
                </div>
            </li>
            <li class="listEver">
                <div class="main_ipt">
                    <span class="desc">联系人电话<i>*</i></span>
                    <div class="box">
                        <input class="ipt" type="number" placeholder="请输入联系人电话" oninput="if(value.length>11) value=value.slice(0,11)" v-model="phone" @blur="phoneBlur"/>
                    </div>
                </div>
                <p class="errorMsg" v-if="phoneStatus">*手机号码格式不正确</p>
            </li>
            <li class="listEver_1">
                <div class="main_ipt">
                    <span class="desc">活动内容</span>
                    <div class="box">
                        <textarea placeholder="请输入活动内容" v-model="text"></textarea>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="save" @click="submit">提交</div>
    <!-- 添加日期 -->
    <select-components v-if="isStartDateShow" :isShow="isStartDateShow" title="日期" type="4" isMinDesc="true" :passDescCode="nowDate" :passDesc="nowDate" @dateChange="dateChange"></select-components> 
    <!-- 添加时间-->
    <select-components v-if="isTimeShow" :isShow="isTimeShow" title="时间" type="10" :passDescCode="nowTime" :passDesc="nowTime" @timeChange="timeChange"></select-components> 
  </div>
</template>

<script>
import selectComponents from '../otherComponents/selectComponents';
import { Dialog, Toast} from 'vant';
export default {
    name: "addActive",
    components: {
        'select-components': selectComponents
    },
    data() {
        return {
            phoneStatus: false,
            canClick: true,
            isStartDateShow: false,
            isTimeShow: false,
            nowDate:'',
            nowTime:'',
            date:'', // 活动日期
            time:'', // 活动时间
            name: '', //活动名称
            place:'', // 活动地址
            text:'', // 活动内容
            gift:'', // 活动奖品
            person:'', // 联系人
            phone: '' // 电话
        };
    },
    methods: {
         // 手机号input失去焦点
        phoneBlur: function () {
            if (this.phone!='') {
                if (this.checkPhone(this.phone)) {
                    this.phoneStatus = false;
                } else {
                    this.phoneStatus = true;
                }
            } else {
                this.phoneStatus = false;
            }
        },
        // 日期
        dataFn: function () {
            this.isStartDateShow = true;
        },
        dateChange: function (msg) {
            this.isStartDateShow = msg.show;
            this.date = msg.code;
        },
        // 时间
        timeFn: function () {
            this.isTimeShow = true;
        },
        timeChange: function (msg) {
            this.isTimeShow = msg.show;
            this.time = msg.code;
        },
        submit: function () {
            let _this = this;
            if (this.date!='' && this.time!='' && this.name!='' && this.place!='' && this.gift!='' && this.person!='' && this.phone!='')  {
                if (!this.phoneStatus) {
                    Dialog.confirm({
                        title: '确定新增活动吗？',
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
        /*
        * 点击取消 
        */
        falseBtn: function () {
            // this.alertisShow = false;
        },
        /*
        * 点击确定
        */
        trueBtn: function () {
            let _this = this;
            if (_this.canClick) {
                _this.canClick = false;
                this.$axios.get('addActivity.do',{
                    params: {
                        activityName: _this.name, //活动名称 必填 
                        activityTime: _this.date+' '+_this.time, // 活动时间 必填 
                        activityAddress: _this.place, // 活动地点 必填 
                        // activityStore:, // 活动主办方   
                        // activitySponsor:, // 活动赞助商   
                        activityContact: _this.person, // 活动联系人 必填 
                        activityPhone: _this.phone, // 活动联系电话 必填 
                        activityContent: _this.text, // 活动内容 必填 
                        activityPrize: _this.gift, // 活动奖品   
                    }
                }) 
                .then(res=>{
                    _this.canClick = true;
                    if (res.data.code == 0) {
                        Toast.success('新增活动成功');
                        setTimeout(function () {
                           _this.$router.go(-1);
                        }, 2000)
                    }
                }).catch(function(res){
                    console.error(res)
                })
            }
        }
    },
    mounted() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth()+1<10? '0'+(date.getMonth()+1):date.getMonth()+1;
        let d = date.getDate()<10?'0'+date.getDate():date.getDate();
        let str = y+'-'+m+'-'+d;
        this.nowDate = str;
        let h =  date.getHours()<10?'0'+ date.getHours(): date.getHours();
        let min = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
        this.nowTime = h+':'+min
    }
};
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
  font-size: 0.3rem;
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
    flex: 1;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling : touch;
    margin-top: .3rem;
    .list {
        width: 100%;
        height: auto;
        background: #fff;
        box-sizing: border-box;
        padding: 0 .3rem 0 .3rem;
        .listEver {
            width: 100%;
            height: auto;
            border-bottom: 1px solid #f7f7f7;
            .errorMsg {
                font-size: .28rem;
                line-height: .5rem;
                height: .5rem;
                color: red;
            }
            .main_ipt {
                height: .9rem; 
                width: 100%;
                display: flex;
                align-items: center;
            }
            .desc {
                display: block;
                height: 100%;
                line-height: .9rem;
                font-size: .34rem;
                i {
                    color: red;
                }
            }
            .box {
                height: 100%;
                flex: 1;
                margin-left: .3rem;
                margin-right: .3rem;
                .ipt {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    font-size: .32rem;
                    text-align: right;
                }
            }
            .icon {
                display: block;
                height: 100%;
                line-height: .9rem;
                font-size: .3rem;
                font-weight: bold;
                color: #777;
            }
        }
        .listEver_1 {
            width: 100%;
            height: 3rem;
            border-bottom: 1px solid #f7f7f7;
            display: flex;
            flex-direction: column;
            .desc {
                width: 100%;
                height: .9rem;
                line-height: .9rem;
                font-size: .34rem;
            }
            textarea {
                width: 100%;
                height: 1.7rem;
                border: none;
                outline: none;
                box-sizing: border-box;
                padding: .2rem;
                background: #f7f7f7;
                font-size: .32rem;
            }
        }
        .listEver:last-child {
            border-bottom: none;
        }
    }
}
.save {
    background: #24c3c5;
    width: 6.88rem;
    margin: auto;
    margin-bottom: .5rem;
    color: #fff;
    text-align: center;
    line-height: .85rem;
    font-size: .34rem;
    border-radius: .1rem;
}
</style>
