<template>
    <div class="container">
        <div class="header">
            <div class="back">
                <router-link :to="{ path: '/baodanList',query:{clientId:clientId,address:address}}" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">新增保单</div>
        </div>
        <div class="main">
            <ul class="familyList">
                <li class="liList" @click="relationshipFn">
                    <span class="liTitle">关系<i>*</i></span>
                    <input class="noUserSelect" type="text" placeholder="请填写关系" readonly="readonly" :value="relationshipDesc"/>
                    <span class="icon iconfont">&#xe61b;</span>
                </li>
                <li class="liList">
                    <span class="liTitle">保单号<i>*</i></span>
                    <input type="text" placeholder="请输入保单号" onkeyup="value=value.replace(/[^A-Za-z0-9]/g,'')" v-model="policyNo"/>
                </li>
                <li class="liList">
                    <span class="liTitle">保险公司<i>*</i></span>
                    <input type="text"  placeholder="请输入保险公司" v-model="comanyCode"/>
                </li>
                <li class="liList">
                    <span class="liTitle">产品名称<i>*</i></span>
                    <input type="text" placeholder="请输入产品名称" v-model="productName"/>
                </li>
                <li class="liList" @click="baoxianFn">
                    <span class="liTitle">类别<i>*</i></span>
                    <input class="noUserSelect" type="text" readonly="readonly" placeholder="请选择险种类别" :value="productTypeDesc"/>
                    <span class="icon iconfont">&#xe61b;</span>
                </li>
                <li class="liList">
                    <span class="liTitle">保费<i>*</i></span>
                    <input type="number" placeholder="请输入保费" v-model="premium" onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"/>
                </li>
                <li class="liList">
                    <span class="liTitle">保额<i>*</i></span>
                    <input type="number" placeholder="请输入保额" v-model="sumInsured" onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"/>
                </li>
                <!-- <li class="liList">
                    <span class="liTitle">投保人</span>
                    <input type="text" placeholder="请输入投保人姓名" v-model="appName"/>
                </li> -->
                <li class="liList">
                    <span class="liTitle">被保人<i>*</i></span>
                    <input type="text" placeholder="请输入被保人姓名" v-model="insName"/>
                </li>
                <li class="liList" @click="startDateFn">
                    <span class="liTitle">保障期起<i>*</i></span>
                    <input class="noUserSelect" type="text" readonly="readonly" placeholder="请选择保障期起" :value="coverStart"/>
                    <span class="icon iconfont">&#xe61b;</span>
                </li>
                <li class="liList liList_1" @click="endDateFn">
                    <span class="liTitle">保障期止<i>*</i></span>
                    <input  class="noUserSelect" type="text" readonly="readonly" placeholder="请选择保障期止" :value="coverEnd"/>
                    <span class="icon iconfont">&#xe61b;</span>
                </li>
            </ul>
            <div class="pdfBox">
                <input  class="noUserSelect" type="file"   @change="fileChangeFn" id="fileIpt"/>
                <div class="box">
                    <span class="icon" v-if="!policyPdf">+</span>
                    <span class="desc" v-if="!policyPdf">上传保单PDF</span>
                    <p class="iconfont" v-if="policyPdf">&#xe66a;</p>
                </div>
                <p class="alertBoxInfo">只支持PDF格式<i>*</i></p>
            </div>
        </div>
        <div class="footer">
            <div class="addBtn" @click="submit">提交</div>
        </div>
        <!-- 关系 -->
        <select-components v-if="isShipShow"  hasMyself='1' :isShow="isShipShow" title="关系" type="5" :passDescCode="relationshipCode" :passDesc="relationshipDesc" @relationshipChange="relationshipChange"></select-components> 
        <!-- 险种类型 -->
        <select-components v-if="isProductShow" :isShow="isProductShow" title="险种类型" type="9" :passDescCode="productType" :passDesc="productTypeDesc" @baoxianTypeChange="baoxianTypeChange"></select-components> 
        <!-- 开始时间 -->
        <select-components v-if="isStartDateShow" :isShow="isStartDateShow" title="开始时间" type="4" :passDescCode="coverStart" :passDesc="coverStart" @dateChange="startDateChange"></select-components> 
        <!-- 结束时间 -->
        <select-components v-if="isEndtDateShow" :isShow="isEndtDateShow" title="结束时间" type="4" :passDescCode="coverEnd" :passDesc="coverEnd" @dateChange="endtDateChange"></select-components> 
    </div>
   
</template>

<script>
import selectComponents from '../otherComponents/selectComponents';
import { Dialog, Toast} from 'vant';
export default {
    name: "addbaodan",
    components: {
        'select-components': selectComponents
    },
    data() {
        return {
            isShipShow: false, // 关系
            isProductShow: false, //产品类型
            isStartDateShow: false, // 开始
            isEndtDateShow: false, // 结束
            alertisShow: false,
            clientId:'', // 客户代码
            policyNo: '', //保单号
            productName: '', //产品名称
            productType: '', //产品类型code
            productTypeDesc:'', // 产品类型name
            premium: '', //保费
            sumInsured: '', //保额
            appName: '', //投保人
            insName: '', //被保人
            relationshipCode: '', //关系
            relationshipDesc:'',
            coverStart: '', //保障期起
            coverEnd: '', //保障期止
            comanyCode: '', //保险公司
            policyPdf: '', //二进制文件
            address:'',

        };
    },
    methods: {
        // 关系
        relationshipChange:  function (msg) {
            this.isShipShow = msg.show;
            this.relationshipDesc = msg.desc;
            this.relationshipCode = msg.code;
        },
        relationshipFn: function () {
            this.isShipShow = true;
        },
        // 保险类型
        baoxianTypeChange: function (msg) {
            this.isProductShow = msg.show;
            this.productTypeDesc = msg.desc;
            this.productType = msg.code;
        },
        baoxianFn: function () {
            this.isProductShow = true;
        },
        // 点击开始
        startDateFn: function () {
            this.isStartDateShow = true;
        },
        startDateChange: function (msg) {
            this.isStartDateShow = msg.show;
            this.coverStart = msg.code;
        },
        // 点击结束
        endDateFn: function () {
            this.isEndtDateShow = true;
        },
        endtDateChange: function (msg) {
            this.isEndtDateShow = msg.show;
            this.coverEnd = msg.code;
        },
        fileChangeFn: function (e) {
            this.policyPdf = e.target.files[0];
        },
        submit: function () {
            let _this = this;
            if (this.policyNo!='' && this.productType!='' && this.productName!='' && this.premium!='' && this.sumInsured!='' && this.insName!='' && this.coverStart!='' && this.coverEnd!='' && this.comanyCode!='' && this.policyPdf!='' && this.relationshipCode!='')  {
                
                let a = _this.coverStart.replace(/\-/g,'') * 1;
                let b = _this.coverEnd.replace(/\-/g,'') * 1;
                if (a>b) {
                    Toast('保障期止不可小于保障期起')
                } else {
                    Dialog.confirm({
                        title: '确定新增保单吗？',
                        message: ''
                    }).then(() => {
                        _this.trueBtn();
                    }).catch(() => {
                        _this.falseBtn();
                    }); 
                }
            } else {
                Toast('带 * 的为必填项')
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
            let formdata = new FormData();
                formdata.append("clientId", _this.clientId);
                formdata.append("policyNo", _this.policyNo); //保单号
                formdata.append("productName", _this.productName); //产品名称
                formdata.append("productType", _this.productType); //产品类型
                formdata.append("premium", _this.premium); //保费
                formdata.append("sumInsured", _this.sumInsured); //保额
                formdata.append(" appName", _this.appName); //投保人
                formdata.append("insName", _this.insName); //被保人
                formdata.append("relationshipCode", _this.relationshipCode); //关系
                formdata.append("coverStart", _this.coverStart); //保障期起
                formdata.append("coverEnd", _this.coverEnd); //保障期止
                formdata.append("comanyCode", _this.comanyCode); //保险公司
                formdata.append("policyPdf", _this.policyPdf); //二进制文件
            this.alertisShow = false;
            this.$axios.post('addClientPolicy.do',formdata,{}) 
            .then(res=>{
                if (res.data.code == 0) {
                    Toast.success('新增保单成功');
                    setTimeout(function () {
                    _this.$router.push({
                            path: '/shequhuokebaodanInfo',
                            query: {
                                clientId: _this.clientId,
                                address: _this.address
                            }
                        });
                    }, 2000)
                }
            }).catch(function(res){
                console.error(res)
            })
           
        }
    },
    mounted() {
        this.clientId = this.$route.query.clientId; // 接受参数
        this.address = this.$route.query.address; // 接受参数
        // let date = new Date();
        // let y = date.getFullYear();
        // let m = date.getMonth()+1<10? '0'+(date.getMonth()+1):date.getMonth()+1;
        // let d = date.getDate()<10?'0'+date.getDate():date.getDate();
        // let str = y+'-'+m+'-'+d;
        // this.coverStart = str;
        // this.coverEnd = str;
    }
};
</script>
<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        font-size: 0.3rem;
        background: #f7f7f7;
        box-sizing: border-box;
        position: relative;
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
    .noUserSelect {
        -webkit-user-select :none;
    }
    .main {
        width: 100%;
        flex:1;
        margin-top: .2rem;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        .tis {
            width: 100%;
            text-align: center;
            color: #999;
            line-height: 1rem;
            font-size: .28rem;
        }
        .familyList {
            width: 100%;
            height: 9.2rem;
            display: flex;
            flex-direction: column;
            margin-top: .2rem;
            background: #fff;
            box-sizing: border-box;
            padding-left: .25rem;
            padding-right: .25rem;
            .liList {
                width: 100%;
                height: .9rem;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #f7f7f7;
                position: relative;
                .liTitle {
                    font-size: .34rem;
                    i {
                        color: red;
                    }
                }
                input {
                    height: 100%;
                    flex: 1;
                    margin-left: .2rem;
                    border: none;
                    outline: none;
                    text-align: right;
                    font-size: .32rem;
                    // color: #777;
                }
                .icon {
                    font-size: .3rem;
                    margin-left: .1rem;
                    color: #777;
                    font-weight: bold;
                }
            }
            .liList_1 {
                border-bottom: none;
            }
        }
        .pdfBox {
            width: 100%;
            height: 3.5rem;
            background: #fff;
            margin-top: .2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: relative;
            input {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
            .box {
                width: 4rem;
                height: 2.3rem;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                border: 1px dashed #999;
                border-radius: .1rem;
                .icon {
                    display: block;
                    width: .5rem;
                    height: .5rem;
                    border: 1px solid #24c3c5;
                    border-radius: .3rem;
                    text-align: center;
                    line-height: .45rem;
                    font-size: .5rem;
                    color: #24c3c5;
                }
                .desc {
                    color: #24c3c5;
                    display: block;
                    margin-top: .2rem;
                    font-size: .3rem;
                }
                .iconfont {
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height: 2.3rem;
                    font-size: 1.5rem;
                    color: red;
                }
            }
            .alertBoxInfo {
                font-size: .26rem;
                margin-top: .1rem;
                color: #888;
                i {
                    color: red;
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
        .addBtn {
            width: 100%;
            height: .85rem;
            text-align: center;
            line-height: .85rem;
            font-size: .34rem;
            color: #fff;
            background: #24c3c5;
            border-radius: .1rem;
        }
    }
</style>
