<template>
    <div class="container" id="pdfDom">
        <div class="header">
            <div class="back" @click="backFn">
                <a class="iconfont">&#xe611;</a>
            </div>
            <div class="title">添加记录</div>
        </div>
        <div class="shijian">
            <span class="desc">事件<i>*</i> ：</span>
            <input type="text" placeholder="请输入事件" v-model="content">
        </div>
        <div class="shijian_1">
            <span class="desc">时间<i>*</i> ：</span>
            <div class="dateBox">
                <div class="inputBox">
                    <input type="text"  class="noUserSelect"  readonly="readonly" placeholder="请选择日期" :value="date" @click="dataFn">
                    <input type="text"  class="noUserSelect"  readonly="readonly" placeholder="请选择时间" :value="time" @click="timeFn">
                </div>
            </div>
        </div>
        <div class="content">
            <span class="desc">内容<i>*</i> ：</span>
            <textarea v-model="result" placeholder="请输入沟通内容"></textarea>
        </div>
        <div class="btn" @click="submit">创建</div>
        <!-- 添加日期 -->
        <select-components v-if="isStartDateShow" :isShow="isStartDateShow" title="日期" type="4" :passDescCode="date" :passDesc="date" @dateChange="dateChange"></select-components> 
        <!-- 添加时间-->
        <select-components v-if="isTimeShow" :isShow="isTimeShow" title="时间" type="10" :passDescCode="time" :passDesc="time" @timeChange="timeChange"></select-components> 
    </div>
</template>

<script>
import selectComponents from '../otherComponents/selectComponents';
import { Dialog, Toast} from 'vant';
export default {
    name: "tianjiajilu",
    components: {
        'select-components': selectComponents
    },
    data() {
        return {
            canClick: true,
            isStartDateShow: false, 
            isTimeShow: false,
            clientId:'',
            date:'',
            time:'',
            result:'',
            content:'',
            address:'',
            addressBack:'',
            alertisShow: false // 是否显示弹框
        };
    },
    methods: {
        // 点击返回
        backFn: function () {
            this.$router.go(-1);
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
            if (this.content && this.date && this.time && this.result)  {
                Dialog.confirm({
                    title: '确定创建记录吗？',
                    message: ''
                }).then(() => {
                    _this.trueBtn();
                }).catch(() => {
                    _this.falseBtn();
                });;
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
                this.$axios.get('addCommunication.do',{
                    params: {
                        clientId: _this.clientId,
                        date: _this.date+' '+_this.time,
                        content: _this.content,
                        result: _this.result,
                        subject:''
                    }
                }) 
                .then(res=>{
                    _this.canClick = true;
                    if (res.data.code == 0) {
                        Toast.success('新增成功');
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
        let _this =this;
        this.clientId = this.$route.query.clientId;
        this.addressBack = this.$route.query.addressBack;
        this.address = this.$route.query.address;
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth()+1<10? '0'+(date.getMonth()+1):date.getMonth()+1;
        let d = date.getDate()<10?'0'+date.getDate():date.getDate();
        let str = y+'-'+m+'-'+d;
        this.date = str;
        let h =  date.getHours()<10?'0'+ date.getHours(): date.getHours();
        let min = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
        this.time = h+':'+min
    }
};
</script>
<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #fff;
        font-size: 0.3rem;
        background: #f7f7f7;
        box-sizing: border-box;
        padding-bottom: .25rem;
    }
    .noUserSelect {
        -webkit-user-select :none;
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
            margin-left: .1rem;
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
            margin-right: .3rem;
            text-align: center;
            line-height: 0.8rem;
            font-size: 0.34rem;
        }
    }
    .shijian {
        width: 100%;
        height: .9rem;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        margin-top: .2rem;
        padding: 0.1rem .3rem 0 .2rem;
        .desc {
            font-size: .35rem;
            i {
                color: red;
            }
        }
        input {
            flex: 1;
            height: 100%;
            box-sizing: border-box;
            padding-left: .2rem;
            font-size: .32rem;
            outline: none;
            border: 1px solid #777;
        }
    }
    .shijian_1 {
        width: 100%;
        height: .9rem;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        margin-top: .2rem;
        padding: 0.1rem .3rem 0 .2rem;
        .desc {
            font-size: .35rem;
            i {
                color: red;
            }
        }
        .dateBox {
            position: relative;
            flex: 1;
            height: 100%;
            .inputBox {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                input {
                    width: 50%;
                    height: 100%;
                    box-sizing: border-box;
                    padding-left: .2rem;
                    font-size: .32rem;
                    outline: none;
                    border: 1px solid #777;
                }
            }
            .date {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                .el-date-editor {
                    flex: 1;
                    height: 100%;
                    opacity: 0;
                }
            }
        }
    }
    .content {
        width: 100%;
        height: .9rem;
        display: flex;
        // align-items: center;
        box-sizing: border-box;
        margin-top: .2rem;
        padding: 0.1rem .3rem 0 .2rem;
        .desc {
            font-size: .35rem;
            i {
                color: red;
            }
        }
        textarea {
            flex: 1;
            height: 2rem;
            padding: .2rem;
            font-size: .32rem;
            outline: none;
            border: 1px solid #777;
        }
    }
    .btn {
        position: absolute;
        bottom: .4rem;
        height: .85rem;
        background: #24c3c5;
        width: 6.88rem;
        left: 50%;
        margin-left: -3.44rem;
        color: #fff;
        text-align: center;
        line-height: .85rem;
        font-size: .34rem;
        border-radius: .1rem;
    }
</style>
