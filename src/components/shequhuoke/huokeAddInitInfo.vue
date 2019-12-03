<template>
    <div class="container">
        <div class="header">
            <div class="back">
                <router-link :to="{ path: '/'+addressUrl,query:{address:addressBack}}" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">新增客户</div>
        </div>
        <div class="main">
            <ul class="ulList">
                <li class="headImgBox">
                    <span class="name">头像</span>
                    <div class="headImg">
                        <img  v-if="head_image_web" :src="head_image_web"/>
                        <div class="box">
                            <input  class="noUserSelect" type="file"  accept="image/*" @change="uploadImg"/>
                        </div>
                    </div>
                    <span class="icon iconfont">&#xe61b;</span>
                </li>
                <li class="listBox">
                    <div class="main_ipt">
                        <span class="name">姓名<i>*</i></span>
                        <div class="box">
                            <input type="text" placeholder="请输入客户信息" v-model="name"/>
                        </div>
                    </div>
                </li>
                <li class="listBox">
                    <div class="main_ipt">
                        <span class="name">手机号<i>*</i></span>
                        <div class="box">
                            <input type="number" oninput="if(value.length>11) value=value.slice(0,11)" placeholder="请输入客户电话" v-model="phone" @blur="phoneBlur"/>
                        </div>
                    </div>
                    <p class="errorMsg" v-if="testInfo.phone.status">*手机号码格式不正确</p>
                </li>
                <li class="listBox">
                    <div class="main_ipt">
                        <span class="name">邮箱</span>
                        <div class="box">
                            <input type="text" placeholder="请输入客户邮箱" v-model="email" @blur="emailBlur"/>
                        </div>
                    </div>
                    <p class="errorMsg" v-if="testInfo.email.status">*邮箱格式不正确</p>
                </li>
                <li class="listBox" @click="cardTypeChooseFn">
                    <div class="main_ipt">
                        <span class="name">证件类型</span>
                        <div class="box">
                            <input  class="noUserSelect" type="text" readonly="readonly" placeholder="请选择客户证类型" v-model="cardId_name"/>
                        </div>
                        <span class="icon iconfont">&#xe61b;</span>
                    </div>
                </li>
                <li class="listBox" @click="clickCardId">
                    <div class="main_ipt">
                        <span class="name">证件号码</span>
                        <div class="box">
                            <input type="text" placeholder="请输入证件号码" onKeyUp="value=value.replace(/[\W^\_]/g,'')" :readonly="nocanIpt" v-model="cardId" @blur="cardIdBlur">
                        </div>
                    </div>
                    <p class="errorMsg" v-if="testInfo.cardId.status">*证件号码格式不正确</p>
                </li>
                <li class="listBox" @click="dateFn">
                    <div class="main_ipt">
                        <span class="name">出生日期</span>
                        <div class="box">
                            <input type="text"  class="noUserSelect" readonly="readonly" placeholder="请选择出生日期" :value="birthday">
                        </div>
                        <span class="icon iconfont">&#xe61b;</span>
                    </div>
                </li>
                <li class="listBox" @click="sexFn">
                    <div class="main_ipt">
                        <span class="name">性别</span>
                        <div class="box">
                            <input type="text"  class="noUserSelect" readonly="readonly" placeholder="请选择客户性别"  :value="sexDesc"/>
                        </div>
                        <span class="icon iconfont">&#xe61b;</span>
                    </div>
                </li>
                <li class="listBox" @click="changeArea">
                    <div class="main_ipt">
                        <span class="name">所在地区</span>
                        <div class="box">
                            <input type="text"  class="noUserSelect" readonly="readonly" placeholder="请选择客户住址" :value="provinceDesc&&cityDesc&&areaDesc?provinceDesc+'-'+cityDesc+'-'+areaDesc:''"/>
                        </div>
                        <span class="icon iconfont">&#xe61b;</span>
                    </div>
                </li>
                <li class="listBox">
                    <div class="main_ipt">
                        <span class="name">详细地址</span>
                        <div class="box">
                            <input type="text"  placeholder="请输入客户详细地址" v-model="address">
                        </div>
                    </div>
                </li>
                <li class="listBox">
                    <div class="main_ipt">
                        <span class="name">职业</span>
                        <div class="box">
                            <input type="text"  placeholder="请输入客户职业" v-model="occupationCode"/>
                        </div>
                    </div>
                </li>
                <!-- <li class="listBox" @click="sourceFn">
                    <span class="name">客户来源</span>
                    <div class="box">
                        <input type="text"  class="noUserSelect" readonly="readonly" placeholder="请选择客户来源" v-model="sourceDesc"/>
                     </div>
                    <span class="icon iconfont">&#xe61b;</span>
                </li> -->
            </ul>
        </div>
        <div class="saveBtn" @click="saveInfo">保存</div>
       <!-- 证件 -->
        <select-components v-if="isCardShow" :isShow="isCardShow" title="证件类型" type="2" :passDescCode="cardType" :passDesc="cardId_name" @cardChange="cardChange"></select-components> 
        <!-- 性别 -->
        <select-components v-if="isSexShow" :isShow="isSexShow" title="性别" type="3" :passDescCode="sex" :passDesc="sexDesc" @sexChange="sexChange"></select-components> 
        <!-- 时间 -->
        <select-components v-if="isDateShow" :isShow="isDateShow" title="出生日期" type="4" :passDescCode="birthday" :passDesc="birthday" @dateChange="dateChange"></select-components> 
        <!-- 来源 -->
        <!-- <select-components v-if="issourceShow" :isShow="issourceShow" title="客户来源" type="11" :passDescCode="sourceType" :passDesc="sourceDesc" @sourceChange="sourceChange"></select-components>  -->
        <!-- 地址 -->
        <address-components v-if="isShowMap" :isShow="isShowMap" :provinceCode='provinceCode' :cityCode='cityCode' :districtCode='areaCode' :province='provinceDesc' :city='cityDesc' :district='areaDesc' @areaChange="areaChange"></address-components>
    </div>
   
</template>

<script>
import addressComponents from '../otherComponents/addressComponents';
import selectComponents from '../otherComponents/selectComponents';
import { Dialog, Toast} from 'vant';
import wx from 'weixin-js-sdk';//引入微信sdk
export default {
    name: "huokeAddInitInfo",
    components: {
        'select-components': selectComponents,
        'address-components': addressComponents
    },
    watch: {
        cardType () {
            if (this.cardType !='') {
                this.nocanIpt = false;
            }
        }
    },
    data() {
        return {
            isShowMap: false, // 区域选择
            isCardShow: false, // 证件选择
            isSexShow: false, // 性别
            isDateShow: false, // 生日
            issourceShow: false, // 来源
            head_image_web:'',
            head_image:'',
            isShowMap: false, // 区域选择
            alertisShow: false, // 是否显示弹框
            nocanIpt: true, // 是否不可以输入
            addressUrl:'',
            addressBack:'',
            type:'',// 1修改 2 新增
            partnerStoreNo:'',
            clientId:'',
            cardId_name:'', // 证件名字
            url:'',
            headImage:'',
            name:'',
            phone:'',
            email:'',
            cardType:'', // 证件类型
            cardId:'', // 证件号码
            birthday:'', // 生日
            sex:'', // 性别字段
            sexDesc:'',
            provinceCode: '',
            provinceDesc:'',   
            cityCode:'',
            cityDesc:'',
            areaCode: "",
            areaDesc: "",
            address:'',
            occupationCode:'', // 职业
            // sourceType: '',// 客户来源id
            // sourceDesc:'', // 客户来源名字
            testInfo:{
                phone: {
                    status: false,
                    text:'手机号码格式不正确'
                },
                email: {
                    status: false,
                    text:'邮箱号码格式不正确'
                },
                cardId: {
                    status: false,
                    text:'证件号码格式不正确'
                }
            } // 测试arr
        };
    },
    methods: {
        // 手机号input失去焦点
        phoneBlur: function () {
            if (this.phone!='') {
                if (this.checkPhone(this.phone)) {
                    this.testInfo.phone.status = false;
                } else {
                    this.testInfo.phone.status = true;
                }
            } else {
                this.testInfo.phone.status = false;
            }
        },
        // 邮箱验证
        emailBlur: function () {
            if (this.email!='') {
                if (this.checkEmail(this.email)) {
                    this.testInfo.email.status = false;
                } else {
                    this.testInfo.email.status = true;
                }
            } else {
                this.testInfo.email.status = false;
            }
        },
         // 身份证号码验证
        cardIdBlur: function () {
            if (this.cardType == '01') { // 类为身份分证
                if (this.cardId!='') {
                    if (this.checkIdNo(this.cardId)) {
                        this.testInfo.cardId.status = false;
                        this.birthday = this.cardId.substring(6, 10) + "-" +this.cardId.substring(10, 12) + "-" + this.cardId.substring(12, 14);
                        if (parseInt(this.cardId.substr(16, 1)) % 2 == 1) { // 男
                            this.sex = '1'; // 性别字段
                            this.sexDesc = "男";
                        } else {
                            this.sex = '0'; // 性别字段
                            this.sexDesc = "女";
                        }
                    } else {
                        this.testInfo.cardId.status = true;
                    }
                } else {
                    this.testInfo.cardId.status = false;
                }
            }
        },
        clickCardId: function () {
            if (this.cardType =='') {
                Toast('先选择证件类型');
            }
        },
         /*
        * 点击区域
        */
        areaChange: function (msg) {
            this.isShowMap = msg.show;
            this.provinceDesc = msg.provinceValue; // 省
            this.cityDesc = msg.cityValue; // 市
            this.areaDesc = msg.areaValue; // 区
            this.provinceCode = msg.provinceCode; // 省编号
            this.cityCode = msg.cityCode; // 市编号
            this.areaCode = msg.areaCode; // 区编号
        },
         /*
        * 点击区域选择 
        */
        changeArea: function () {
            this.isShowMap = true;
        },
        // 证件
        cardTypeChooseFn: function () {
            this.isCardShow = true;
        },
        cardChange: function (msg) {
            this.isCardShow = msg.show;
            this.cardId_name = msg.desc;
            this.cardType = msg.code;
        },
        // 点击性别
        sexFn: function () {
            if (this.cardType == '01') {
                Toast('身份证类型时性别不可选');
            } else {
                this.isSexShow = true;
            }
        },
        sexChange: function (msg) {
            this.isSexShow = msg.show;
            this.sexDesc = msg.desc;
            this.sex = msg.code;
        },
        // 点击生日
        dateFn: function () {
            if (this.cardType == '01') {
                Toast('身份证类型时出生日期不可选');
            } else {
                this.isDateShow = true;
            }
        },
        dateChange: function (msg) {
            this.isDateShow = msg.show;
            this.birthday = msg.code;
        },
        // 客户来源
        // sourceFn: function () {
        //     this.issourceShow = true;
        // },
        // sourceChange: function (msg) {
        //     this.issourceShow = msg.show;
        //     this.sourceDesc = msg.desc;
        //     this.sourceType = msg.code;
        // },
        uploadImg: function (e) {
            let _this =this;
            let file = e.target.files[0];
            _this.head_image = e.target.files[0];
            if (window.FileReader) {    
                let reader = new FileReader();    
                reader.readAsDataURL(file);    
                //监听文件读取结束后事件    
                reader.onloadend = function (e) {
                   // 图片base64
                    _this.head_image_web = e.target.result;
                };    
            } 
        },
        /**
         * 点击保存
        */
        saveInfo: function () {
            let _this = this;
            if (this.name!='' && this.phone!='')  {
                let isTrue = true;
                let keyVal = '';
                for (let key in this.testInfo) {
                    if (this.testInfo[key].status) {
                        isTrue = false;
                        keyVal = key;
                        break;
                    }
                }
                if (isTrue) {
                    Dialog.confirm({
                        title: '确定要新增客户吗？',
                        message: ''
                    }).then(() => {
                        _this.trueBtn();
                    }).catch(() => {
                        _this.falseBtn();
                    });
                } else {
                    Toast(this.testInfo[keyVal].text);
                }
            } else {
                Toast('所有 * 为必填项')
            }
        },
        /*
        * 点击取消 
        */
        falseBtn: function () {

        },
        /*
        * 点击确定
        */
        trueBtn: function () {
            let _this = this;
            let formdata = new FormData();
                if (_this.head_image) {
                    formdata.append("head-image", _this.head_image);
                }
                formdata.append("clientName", _this.name); 
                formdata.append("phone", _this.phone); 
                formdata.append("email", _this.email);
                formdata.append("idType", _this.cardType);
                formdata.append("idNo", _this.cardId);
                formdata.append(" birthday", _this.birthday); 
                formdata.append("gender", _this.sex); 
                formdata.append("address", _this.address); 
                formdata.append("provinceCode", _this.provinceCode); 
                formdata.append("cityCode", _this.cityCode); 
                formdata.append("areaCode", _this.areaCode); 
                // formdata.append("sourceType", _this.sourceType); 
                formdata.append("occupationCode", _this.occupationCode); 
            this.$axios.post('addClientInfo.do',formdata) 
            .then(res=>{
                if (res.data.code == 0) {
                    Toast.success('新增保单成功');
                    setTimeout(function () {
                        _this.$router.push({
                            path: '/wodekehu',
                            query: {
                                
                            }
                        })
                    }, 2000);
                }
                _this.alertisShow = false;
                _this. alertTitle = '';
            }).catch(function(res){
                _this.alertisShow = false;
                console.error(res)
            })

        }
    },
    mounted() {
        this.clientId = this.$route.query.clientId; // 接受参数
        this.addressUrl = this.$route.query.addressUrl;
        this.addressBack = this.$route.query.address;
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
        padding-bottom: .25rem;
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
    .main {
        width: 100%;
        flex:1;
        overflow: hidden;
        overflow-y: auto;
        margin-bottom: .1rem;
        .ulList {
            background: #fff;
            width: 100%;
            box-sizing: border-box;
            padding-left: .3rem;
            padding-right: .3rem;
            margin-top: .3rem;
            .headImgBox {
                width: 100%;
                height: 1rem;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                position: relative;
                .name {
                    height: 100%;
                    display: block;
                    line-height: 1rem;
                    font-size: .34rem;
                }
                .headImg {
                    height: 100%;
                    flex: 1;
                    height: .8rem;
                    margin-top: .1rem;
                    img {
                        height: 100%;
                        width: .8rem;
                        border-radius: .4rem;
                        float: right;
                    }
                }
                .icon {
                    height: 100%;
                    float: right;
                    height: 100%;
                    margin-left: .1rem;
                    line-height: 1rem;
                    font-size: .3rem;
                    color: #999;
                    font-weight: bold;
                }
                .box {
                    position: absolute;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    top: 0;
                    opacity: 0;
                    input{
                        height: 100%;
                        width: 100%;
                    }
                    .noUserSelect {
                        -webkit-user-select :none;
                    }
                }
            } 
            .listBox { 
                width: 100%;
                height: auto;
                border-bottom: 1px solid #f7f7f7;
                // display: flex;
                // position: relative;
                .main_ipt {
                    width: 100%;
                    height: .85rem;
                    display: flex;
                    position: relative;
                    .name {
                        height: 100%;
                        display: block;
                        line-height: .85rem;
                        font-size: .34rem;
                        i {
                            color: red;
                        }
                    }
                    .box {
                        height: 100%;
                        flex: 1;
                        margin-left: .5rem;
                        input {
                            height: 100%;
                            width: 100%;
                            border: none;
                            text-align: right;
                            font-size: .34rem;
                        }
                        .noUserSelect {
                            -webkit-user-select :none;
                        }
                    }
                    .icon {
                        display: block;
                        height: .85rem;
                        line-height: .85rem;
                        margin-left: .2rem;
                        font-size: .3rem;
                        font-weight: bold;
                        color: #999;
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
    }
    .saveBtn {
        height: .85rem;
        background: #24c3c5;
        width: 6.88rem;
        color: #fff;
        text-align: center;
        line-height: .85rem;
        font-size: .34rem;
        border-radius: .1rem;
        margin:auto;
    }
</style>
