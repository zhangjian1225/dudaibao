<template>
    <div class="container">
        <div class="header">
            <div class="back" v-if="showBackBtn">
                <router-link to="/shequyunying" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">新增加盟</div>
        </div>
        <div class="banner"></div>
        <div class="main">
            <ul class="ulList">
                <li class="li">
                    <div class="main_ipt">
                        <span class="name">店铺名称<i>*</i></span>
                        <div class="box">
                            <input type="text" placeholder="请输入店名" v-model="storeName">
                        </div>
                    </div>
                </li>
                <li class="li" @click="showStoreFn()">
                    <div class="main_ipt">
                        <span class="name">店铺类型<i>*</i></span>
                        <div class="box">
                            <input class="noUserSelect" type="text" readonly="readonly" placeholder="选择店铺类型" :value="storeType"/>
                        </div>
                        <span class="icon iconfont">&#xe61b;</span>
                    </div>
                </li>
                <li class="li">
                    <div class="main_ipt">
                        <span class="name">联系人姓名<i>*</i></span>
                        <div class="box">
                            <input type="text" placeholder="请输入客户姓名" v-model="userName"/>
                        </div>
                    </div>
                </li>
                <li class="li">
                    <div class="main_ipt">
                        <span class="name">手机号<i>*</i></span>
                        <div class="box">
                            <input type="number" placeholder="请输入客户电话" oninput="if(value.length>11) value=value.slice(0,11)" v-model="phone" @blur="phoneBlur">
                        </div>
                    </div>
                    <p class="errorMsg" v-if="phoneStatus">*手机号码格式不正确</p>
                </li>
                <li class="li">
                    <div class="main_ipt">
                        <span class="name">验证码<i>*</i></span>
                        <div class="box">
                            <input type="text" placeholder="请输入验证码" v-model="testCode"/>
                        </div>
                        <span class="getTest">获取验证码</span>
                    </div>
                </li>
                <li class="li"  @click="changeArea">
                    <div class="main_ipt">
                        <span class="name">所在地区<i>*</i></span>
                        <div class="box">
                            <input class="noUserSelect" type="text" readonly="readonly" placeholder="选择客户地址" :value="province!=''&&city!=''&&district!=''?province+'-'+city+'-'+district:''"/>
                        </div>
                        <span class="icon iconfont">&#xe61b;</span>
                    </div>
                </li>
                <li class="li">
                    <div class="main_ipt">
                        <span class="name">详细地址<i>*</i></span>
                        <div class="box">
                            <input type="text" placeholder="请输入客户详细地址" v-model="address">
                        </div>
                    </div>
                </li>
                <li class="li">
                    <div class="main_ipt">
                        <span class="name">利益分配比例</span>
                        <div class="box">
                            <input type="number" placeholder="请输入利益比例" v-model="rale" onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="submitBtn" @click="saveInfo">生成专属二维码</div>
        </div>
        <select-components v-if="isShowStore" :isShow="isShowStore" title="店铺类型" type="1" :passDescCode="storeTypeCode" :passDesc="storeType" @storeChange="storeChange"></select-components> 
        <address-components v-if="isShowMap" :isShow="isShowMap" :provinceCode='provinceCode' :cityCode='cityCode' :districtCode='districtCode' :province='province' :city='city' :district='district' @areaChange="areaChange"></address-components>
    </div>
   
</template>

<script>
import addressComponents from '../otherComponents/addressComponents';
import selectComponents from '../otherComponents/selectComponents';
import { Dialog, Toast} from 'vant';
export default {
    name: "",
    components: {
        'select-components': selectComponents,
        'address-components': addressComponents
    },
    data() {
        return {
            phoneStatus: false,
            storeTypeData: [],
            showBackBtn: true, // 是否显示返回按钮
            isShowMap: false, // 区域选择
            isShowStore: false,
            storeType: '',
            storeTypeCode: '', // 店铺类型列表选中的id
            provinceCode:'',
            cityCode:'',
            districtCode:'',
            province:'',
            city:'',
            district:'',
            storeName:'', // 店名
            userName: '', //姓名
            phone: '', // 手机号
            testCode:'', // 验证码
            address:'', //地址
            rale:'', //比例
            empNo:''
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
        storeChange: function (data) {
            this.isShowStore = data.show;
            this.storeType = data.desc;
            this.storeTypeCode = data.code;
        },
        // 显示类型列表
        showStoreFn: function () {
            this.isShowStore = true;
            
        },
        /*
        * 点击区域
        */
        areaChange: function (msg) {
            this.isShowMap = msg.show;
            this.province = msg.provinceValue; // 省
            this.city = msg.cityValue; // 市
            this.district = msg.areaValue; // 区
            this.provinceCode = msg.provinceCode; // 省编号
            this.cityCode = msg.cityCode; // 市编号
            this.districtCode = msg.areaCode; // 区编号
        },
        /*
        * 点击区域选择 
        */
        changeArea: function () {
            this.isShowMap = true;
        },
        saveInfo: function () {
            let _this = this;
            if (_this.storeName!='' && _this.storeTypeCode!='' && _this.userName!='' && _this.phone!='' && _this.address!='' && _this.cityCode!='' && _this.districtCode!='' && _this.provinceCode!='' && _this.testCode!='' ) {
                if (!this.phoneStatus) {
                    Dialog.confirm({
                        title: '确定要新增吗？',
                        message: ''
                    }).then(() => {
                        _this.submit();
                    }).catch(() => {
                        _this.falseBtn();
                    });
                } else {
                    Toast('手机号码格式错误');
                }   
            } else {
                Toast('带 * 为必填项');
            }
        },
        /*
        * 点击取消
        */
        falseBtn: function () {
            Dialog.close();
        },
        submit: function () {
            let _this = this;
            if (this.empNo) {
                this.$axios.get('addPartnerStore.do',{
                    params: {
                        partnerStoreName: _this.storeName,//名称
                        partnerStoreType: _this.storeTypeCode,//类型代码
                        provinceCode: _this.provinceCode,//省代码
                        cityCode: _this.cityCode,//市代码
                        areaCode: _this.districtCode,//区代码
                        address: _this.address,//详细地址
                        principal: _this.userName,//负责人
                        phone: _this.phone,//电话
                        rate: _this.rale//利益比例（默认是小数）
                    }
                }) 
                .then(res=>{
                    if (res.data.code == 0) {
                        Toast.success('新增成功');
                        _this.$router.push({
                            path: '/getImgCode',
                            query: {
                                partnerStoreNo: res.data.data.partnerStoreNo,
                                addressBack:'addmengyou'
                                // code: _this.code
                            }
                        })
                    }
                }).catch(function(res){
                    console.error(res)
                })
            } else {
                this.$axios.get('addps.do',{
                    params: {
                        empNo: _this.empNo,
                        partnerStoreName: _this.storeName,//名称
                        partnerStoreType: _this.storeTypeCode,//类型代码
                        provinceCode: _this.provinceCode,//省代码
                        cityCode: _this.cityCode,//市代码
                        areaCode: _this.districtCode,//区代码
                        address: _this.address,//详细地址
                        principal: _this.userName,//负责人
                        phone: _this.phone,//电话
                        rate: _this.rale//利益比例（默认是小数）
                    }
                }) 
                .then(res=>{
                    if (res.data.code == 0) {
                        console.log(res)
                        Toast.success('新增成功');
                        _this.$router.push({
                            path: '/getImgCode',
                            query: {
                                partnerStoreNo: res.data.data.partnerStoreNo,
                                addressBack:'addmengyou'
                                // code: _this.code
                            }
                        })
                    }
                }).catch(function(res){
                    console.error(res)
                })
            }
        }
    },
    mounted() {
        this.empNo = this.$route.query.empNo;
        if (this.empNo!=undefined && this.empNo!='') {
            this.showBackBtn = false;
        }
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
    .banner {
        width: 100%;
        height: 2.2rem;
        background: url(./images/6.png) no-repeat;
        background-size: 100% 100%;
    }
    .main {
        width: 100%;
        flex:1;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        .ulList {
            background: #fff;
            width: 100%;
            box-sizing: border-box;
            padding-left: .3rem;
            padding-right: .3rem;
            .li {
                width: 100%;
                height: auto;
                border-bottom: 1px solid #f7f7f7;
                .main_ipt {
                    width: 100%;
                    height: .85rem;
                    display: flex;
                    align-items: center;
                    .name {
                        height: 100%;
                        display: block;
                        line-height: .88rem;
                        font-size: .34rem;
                        i {
                            color: red;
                        }
                    }
                    .box {
                        height: 100%;
                        margin-left: .5rem;
                        flex: 1;
                    }
                    input {
                        height: 100%;
                        width: 100%;
                        outline: none;
                        border: none;
                        text-align: right;
                        font-size: .32rem;
                    }
                    .getTest {
                        padding: .1rem .2rem;
                        border: 1px solid #24c3c5;
                        border-radius: .35rem;
                        font-size: .28rem;
                        color: #24c3c5;
                        margin-left: .2rem;
                    }
                    .icon {
                        display: block;
                        height: .85rem;
                        line-height: .88rem;
                        margin-left: .2rem;
                        font-size: .3rem;
                        color: #777;
                        font-weight: bold;
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
        .submitBtn {
            height: .85rem;
            background: #24c3c5;
            width: 100%;
            color: #fff;
            text-align: center;
            line-height: .85rem;
            font-size: .34rem;
            border-radius: .1rem;
        }
    }
</style>
