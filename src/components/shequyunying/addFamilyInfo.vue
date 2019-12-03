<template>
    <div class="container">
        <div class="header">
            <div class="back">
                <router-link :to="{ path: '/'+addressUrl,query:{partnerStoreNo:partnerStoreNo,clientId:clientId}}" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">家庭信息</div>
        </div>
        <div class="main">
             <ul class="familyList">
                <li class="title" v-if="type == 1" v-html="'成员'+(index+1)"></li>
                <li class="title" v-if="type == 2">新增成员</li>
                <li class="liList" @click="relationshipFn">
                    <div class="main_ipt">
                        <span class="liTitle">关系<i>*</i></span>
                        <input type="text" readonly="readonly" placeholder="请选择关系" :value="familyInfo.relationshipDesc"/>
                        <span class="icon iconfont">&#xe61b;</span>
                    </div>
                </li>
                <li class="liList">
                    <div class="main_ipt">
                        <span class="liTitle">姓名<i>*</i></span>
                        <input type="text" placeholder="请输入姓名" v-model="familyInfo.clientName"/>
                    </div>
                <li class="liList">
                    <div class="main_ipt">
                        <span class="liTitle">手机号<i>*</i></span>
                        <input type="number" placeholder="请输入手机号码" v-model="familyInfo.phone" oninput="if(value.length>11) value=value.slice(0,11)" @blur="phoneBlur"/>
                    </div>
                    <p class="errorMsg" v-if="testInfo.phone.status">*手机号码格式不正确</p>
                </li>
                <li class="liList">
                    <div class="main_ipt">
                        <span class="liTitle">邮箱</span>
                        <input type="text" placeholder="请输入邮箱号码" v-model="familyInfo.email" @blur="emailBlur"/>
                    </div>
                    <p class="errorMsg" v-if="testInfo.email.status">*邮箱格式不正确</p>
                </li>
                <li class="liList" @click="cardTypeChooseFn">
                    <div class="main_ipt">
                        <span class="liTitle">证件类型</span>
                        <input class="noUserSelect" type="text" readonly="readonly" placeholder="选择证件类型" :value="familyInfo.idTypeDesc"/>
                        <span class="icon iconfont">&#xe61b;</span>
                    </div>
                </li>
                <li class="liList" @click="clickCardId">
                    <div class="main_ipt">
                        <span class="liTitle">证件号码</span>
                        <input class="noUserSelect" type="text" :readonly="nocanIpt" placeholder="请输入证件号码" onKeyUp="value=value.replace(/[\W^\_]/g,'')" v-model="familyInfo.idNo" @blur="cardIdBlur"/>
                    </div>
                    <p class="errorMsg" v-if="testInfo.cardId.status">*证件号码格式不正确</p>
                </li>
                <li class="liList" @click="dateFn">
                    <div class="main_ipt">
                        <span class="liTitle">出生日期</span>
                        <input class="noUserSelect" type="text" readonly="readonly" placeholder="请选择出生日期" :value="familyInfo.birthday"/>
                        <span class="icon iconfont">&#xe61b;</span>
                    </div>
                </li>
                <li class="liList" @click="sexFn">
                    <div class="main_ipt">
                        <span class="liTitle">性别</span>
                        <input class="noUserSelect" type="text" readonly="readonly" :placeholder="familyInfo.gender?familyInfo.gender==1?'男':'女':'请选择性别'"/>
                        <span class="icon iconfont">&#xe61b;</span>
                    </div>
                </li>
                <li class="liList" @click="changeArea">
                    <div class="main_ipt">
                        <span class="liTitle">所在地区</span>
                        <input class="noUserSelect" type="text" readonly="readonly" placeholder="请选择地区" :value="familyInfo.provinceDesc!=''&&familyInfo.cityDesc!=''&&familyInfo.areaDesc!=''?familyInfo.provinceDesc+'-'+familyInfo.cityDesc+'-'+familyInfo.areaDesc:''"/>
                        <span class="icon iconfont">&#xe61b;</span>
                    </div>
                </li>
                <li class="liList">
                    <div class="main_ipt">
                        <span class="liTitle">详细地址</span>
                        <input type="text" placeholder="请输入详细地址" v-model="familyInfo.address"/>
                    </div>
                </li>
                <li class="liList">
                    <div class="main_ipt">
                        <span class="liTitle">职业</span>
                        <input type="text" placeholder="请输入职业" v-model="familyInfo.occupationCode"/>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="saveBtn" @click="saveFamilyFn">保存</div>
        </div>
        <!-- 证件 -->
        <select-components v-if="isCardShow" :isShow="isCardShow" title="证件类型" type="2" :passDescCode="familyInfo.idType" :passDesc="familyInfo.idTypeDesc" @cardChange="cardChange"></select-components> 
        <!-- 性别 -->
        <select-components v-if="isSexShow" :isShow="isSexShow" title="性别" type="3" :passDescCode="familyInfo.gender" :passDesc="familyInfo.gender=='1'?'男':'女'" @sexChange="sexChange"></select-components> 
        <!-- 时间 -->
        <select-components v-if="isDateShow" :isShow="isDateShow" title="出生日期" type="4" :passDescCode="familyInfo.birthday" :passDesc="familyInfo.birthday" @dateChange="dateChange"></select-components> 
        <!-- 关系 -->
        <select-components v-if="isShipShow" :isShow="isShipShow" hasMyself='0' title="关系" type="5" :passDescCode="familyInfo.relationshipCode" :passDesc="familyInfo.relationshipDesc" @relationshipChange="relationshipChange"></select-components> 
        <address-components v-if="isShowMap" :isShow="isShowMap" :provinceCode='familyInfo.provinceCode' :cityCode='familyInfo.cityCode' :districtCode='familyInfo.areaCode' :province='familyInfo.provinceDesc' :city='familyInfo.cityDesc' :district='familyInfo.areaDesc' @areaChange="areaChange"></address-components>
    </div>
</template>

<script>
import addressComponents from '../otherComponents/addressComponents';
import selectComponents from '../otherComponents/selectComponents';
import { Dialog, Toast} from 'vant';
export default {
    name: "addFamilyInfo",
    components: {
        'select-components': selectComponents,
        'address-components': addressComponents
    },
    data() {
        return {
            nocanIpt: true, // 是否不可以输入
            index:'',
            addressUrl:'',
            type:'',
            map_index: '',
            familyInfo:{},
            isShowMap: false,
            partnerStoreNo:'',
            clientId:'',
            familyId: '',
            isShowMap: false, // 区域选择
            isCardShow: false, // 证件选择
            isSexShow: false, // 性别
            isDateShow: false, // 生日
            isShipShow: false, // 关系
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
            } // 测试
        };
    },
    methods: {
             clickCardId: function () {
            if (this.familyInfo.idType == '' || this.familyInfo.idType == null) {
                Toast('先选择证件类型');
            } else {
                this.nocanIpt = false;
            }
        },
        // 手机号input失去焦点
        phoneBlur: function () {
            if (this.familyInfo.phone!='') {
                if (this.checkPhone(this.familyInfo.phone)) {
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
            if (this.familyInfo.email!='') {
                if (this.checkEmail(this.familyInfo.email)) {
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
            if (this.familyInfo.idType == '01') { // 类为身份分证
                if (this.familyInfo.idNo!='') {
                    if (this.checkIdNo(this.familyInfo.idNo)) {
                        this.testInfo.cardId.status = false;
                        this.familyInfo.birthday = this.familyInfo.idNo.substring(6, 10) + "-" +this.familyInfo.idNo.substring(10, 12) + "-" + this.familyInfo.idNo.substring(12, 14);
                        if (parseInt(this.familyInfo.idNo.substr(16, 1)) % 2 == 1) { // 男
                            this.familyInfo.gender = '1'; // 性别字段
                        } else {
                            this.familyInfo.gender = '0'; // 性别字段
                        }
                    } else {
                        this.testInfo.cardId.status = true;
                    }
                } else {
                    this.testInfo.cardId.status = false;
                }
            }
        },
        /*
        * 点击区域
        */
        areaChange: function (msg) {
            this.isShowMap = msg.show;
            this.familyInfo.provinceDesc = msg.provinceValue; // 省
            this.familyInfo.cityDesc = msg.cityValue; // 市
            this.familyInfo.areaDesc = msg.areaValue; // 区
            this.familyInfo.provinceCode = msg.provinceCode; // 省编号
            this.familyInfo.cityCode = msg.cityCode; // 市编号
            this.familyInfo.areaCode = msg.areaCode; // 区编号
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
            this.familyInfo.idTypeDesc = msg.desc;
            this.familyInfo.idType = msg.code;
        },
        // 点击性别
        sexFn: function () {
            if(this.familyInfo.idType == '01') {
                 Toast('身份证类型时性别不可选');
            } else {
                this.isSexShow = true;
            }
        },
        sexChange: function (msg) {
            this.isSexShow = msg.show;
            this.familyInfo.gender = msg.code;
        },
        // 点击生日
        dateFn: function () {
            if(this.familyInfo.idType == '01') {
                Toast('身份证类型时出生日期不可选');
            } else {
                this.isDateShow = true;
            }
        },
        dateChange: function (msg) {
            this.isDateShow = msg.show;
            this.familyInfo.birthday = msg.code;
        },
        relationshipChange:  function (msg) {
            this.isShipShow = msg.show;
            this.familyInfo.relationshipDesc = msg.desc;
            this.familyInfo.relationshipCode = msg.code;
        },
        relationshipFn: function () {
            this.isShipShow = true;
        },
        /**
         * 获取客户家庭信息
        */
        getFamilyData: function () {
            let _this = this;
            if (this.type == 1) { // 修改
                this.$axios.get('getClientFamilyInfo.do',{
                params: {
                    clientId: _this.clientId
                }
                }) 
                .then(res=>{
                    _this.familyInfo = res.data.data.familyInfo[_this.index];
                    _this.cardIdBlur();
                    _this.phoneBlur();
                    _this.emailBlur();
                }).catch(function(res){
                    console.error(res)
                })
            } else { // 添加
                let _this = this;
                _this.familyInfo = {
                    address: '',
                    age: '',
                    areaCode: '',
                    areaDesc: '',
                    birthday: '',
                    cityCode: '',
                    cityDesc: '',
                    clientName: '',
                    email: '',
                    familyId: '',
                    gender: '',
                    idNo: '',
                    idType: '',
                    idTypeDesc: "",
                    occupationCode: '',
                    phone: '',
                    provinceCode: '',
                    provinceDesc: '',
                    relationshipCode: '',
                    relationshipDesc: '',
                }
            }
        },
        saveFamilyFn: function () {
            let _this = this;
            if ( _this.familyInfo.phone!='' && _this.relationshipCode!=''&&  _this.familyInfo.clientName!='') {
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
                        title: '确定提交吗？',
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
                Toast('带 * 为必填项');
            }
        },
        /*
        * 点击确定
        */
        trueBtn: function () {
            this.alertisShow = false;
            let _this = this;
            let sendInfo = {};
            if (_this.familyInfo.relationshipCode!='') {
                sendInfo.relationshipCode = _this.familyInfo.relationshipCode;
            }
            if (this.type == '1') {
                if (_this.familyInfo.clientId!='') {
                    sendInfo.clientId =  _this.familyInfo.clientId;
                }
            } else {
                sendInfo.familyId = this.familyId
            }
                
            if (_this.familyInfo.clientName!='') {
                sendInfo.clientName =  _this.familyInfo.clientName;
            }
            if (_this.familyInfo.phone!='') {
                sendInfo.phone = _this.familyInfo.phone;
            }
            if (_this.familyInfo.email!='') {
                sendInfo.Email =  _this.familyInfo.email;
            }
            if (_this.familyInfo.idType!='') {
                sendInfo.idType =  _this.familyInfo.idType;
            }

            if (_this.familyInfo.idNo!='') {
                sendInfo.idNo = _this.familyInfo.idNo;
            }
            if (_this.familyInfo.birthday!='') {
                sendInfo.birthday =  _this.familyInfo.birthday;
            }
            if (_this.familyInfo.gender!='') {
                sendInfo.gender =  _this.familyInfo.gender;
            }
            if (_this.familyInfo.provinceCode!='') {
                sendInfo.provinceCode = _this.familyInfo.provinceCode;
            }
            if (_this.familyInfo.cityCode!='') {
                sendInfo.cityCode =  _this.familyInfo.cityCode;
            }
            if (_this.familyInfo.areaCode!='') {
                sendInfo.areaCode =  _this.familyInfo.areaCode;
            }
            if (_this.familyInfo.address!='') {
                sendInfo.address =  _this.familyInfo.address;
            }
            if (_this.familyInfo.occupationCode!='') {
                sendInfo.occupationCode =  _this.familyInfo.occupationCode;
            }
            if (this.type == 1) {
                this.$axios.get('updateClientFamilyInfo.do',{
                    params: sendInfo
                }) 
                .then(res=>{
                    if (res.data.code == 0) {
                        Toast.success('修改家庭成员成功');
                        setTimeout(function () {
                            _this.$router.push({
                                path: '/'+_this.addressUrl,
                                query: {
                                    partnerStoreNo:_this.partnerStoreNo, 
                                    clientId: _this.clientId
                                }
                            })
                        }, 2000)
                    }
                   
                }).catch(function(res){
                    console.error(res)
                })
            } else {
                this.$axios.get('addClientFamilyInfo.do',{
                    params: sendInfo
                }) 
                .then(res=>{
                   if (res.data.code == 0) {
                        Toast.success('新增家庭成员成功');
                        setTimeout(function () {
                            _this.$router.push({
                                path: '/'+_this.addressUrl,
                                query: {
                                    partnerStoreNo:_this.partnerStoreNo, 
                                    clientId: _this.clientId
                                }
                            })
                        }, 2000)
                    }
                }).catch(function(res){
                    console.error(res)
                })
            }
        }
    },
    mounted() {
        this.partnerStoreNo = this.$route.query.partnerStoreNo; // 接受参数
        this.clientId = this.$route.query.clientId; // 接受参数
        this.type = this.$route.query.type;
        this.familyId = this.$route.query.familyId;
        this.addressUrl = this.$route.query.addressUrl;
        if (this.type == 1) {
            this.index = this.$route.query.index;
        }
        this.getFamilyData();
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
    .main {
        width: 100%;
        flex:1;
        background: #fff;
        box-sizing: border-box;
        margin-top: .2rem;
        padding-left: .25rem;
        padding-right: .25rem;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        .familyList {
            width: 100%;
            height: 10.8rem;
            display: flex;
            flex-direction: column;
            .title {
                height: 100%;
                height: .8rem;
                color: #24c3c5;
                line-height: .8rem;
                font-size: .34rem;
            }
            .liList {
                width: 100%;
                height: auto;
                border-bottom: 1px solid #f7f7f7;
                // display: flex;
                // position: relative;
                .main_ipt {
                    width: 100%;
                    height: .9rem;
                    display: flex;
                    align-items: center;
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
                        font-size: .34rem;
                        // color: #777;
                    }
                    .noUserSelect {
                        -webkit-user-select :none;
                    }
                    .icon {
                        font-size: .32rem;
                        margin-left: .1rem;
                        color: #777;
                        font-weight: bold;
                    }
                }
            }
            .errorMsg {
                font-size: .28rem;
                line-height: .5rem;
                height: .5rem;
                color: red;
            }
            .liList:last-child {
                border-bottom: none;
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
        .saveBtn {
            width: 100%;
            height: .86rem;
            text-align: center;
            line-height: .86rem;
            font-size: .34rem;
            color: #fff;
            background:  #24c3c5;
            // margin-top: .2rem;
            border-radius: .1rem;
        }
    }
</style>
