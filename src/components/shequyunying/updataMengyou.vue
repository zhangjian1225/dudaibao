<template>
    <div class="container">
        <div class="header">
            <div class="back">
                <router-link :to="{ path: '/mengyouxiangxi',query:{partnerStoreNo:partnerStoreNo}}" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">修改信息</div>
        </div>
        <div class="main">
            <ul class="ulList">
                <li class="li">
                    <div class="main_ipt">
                        <span class="name">店铺名称<i>*</i></span>
                        <div class="box">
                            <input type="text"  v-model="storeName" placeholder="请输入店铺名称"/>
                        </div>
                    </div>
                </li>
                <li class="li" @click="showStoreFn">
                    <div class="main_ipt">
                        <span class="name">店铺类型<i>*</i></span>
                        <div class="box">
                            <input class="noUserSelect" type="text" readonly="readonly" placeholder="请选择店铺类型" :value="storeType"/>
                        </div>
                        <span class="icon iconfont">&#xe61b;</span>
                    </div>
                </li>
                <li class="li">
                    <div class="main_ipt">
                        <span class="name">联系人姓名<i>*</i></span>
                        <div class="box">
                            <input type="text" v-model="userName" placeholder="请输入联系人姓名">
                        </div>
                    </div>
                </li>
                <li class="li">
                    <div class="main_ipt">
                        <span class="name">电话号码<i>*</i></span>
                        <div class="box">
                            <input type="number" oninput="if(value.length>11) value=value.slice(0,11)"  v-model="phone" placeholder="请输入电话号码" @blur="phoneBlur"/>
                        </div>
                    </div>
                    <p class="errorMsg" v-if="phoneStatus">*手机号码格式不正确</p>
                </li>
                <li class="li" @click="changeArea">
                    <div class="main_ipt">
                        <span class="name">所在地区<i>*</i></span>
                        <div class="box">
                            <input class="noUserSelect"  type="text" readonly="readonly" placeholder="请选择所在区域" :value="province!=''?province+'-'+city+'-'+district:''"/>
                        </div>
                        <span class="icon iconfont">&#xe61b;</span>
                    </div>
                </li>
                <li class="li">
                    <div class="main_ipt">
                        <span class="name">详细地址<i>*</i></span>
                        <div class="box">
                            <input type="text" placeholder="请输入详细地址"  v-model="address"/>
                        </div>
                    </div>
                </li>
                <li class="li" @click="raleFn">
                    <div class="main_ipt">
                        <span class="name">利益分配</span>
                        <div class="box">
                            <input class="noUserSelect"  type="text" readonly="readonly" v-model="rale"/>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="codeImg" @click="saveInfo"><a>保存盟友信息</a></div>
            <div class="upData" @click="delInfo"><a>解除盟友关系</a></div>
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
            shows:true,
            searchResult: [],
            storeIndex:0,
            isShowStore: false, // 是否显示类型选择
            isShowMap: false, // 区域选择
            dataObj: {},
            partnerStoreNo: '',
            storeName: '', //店名
            storeType: '', // 店类型
            storeTypeCode: '',
            userName: '', // 名字
            phone: '', // 电话
            province: '', // 省
            city: '', // 市
            district: '', // 区
            provinceCode: '', // 省编号
            cityCode: '', // 市编号
            districtCode: '', // 区编号
            address:'', // 地址
            rale: '', // 比例
            alertStatus: 0 // 点击那个按钮触发的 0 默认 1 保存 2 解除

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
        raleFn: function () {
            Toast('利益分配不可修改');
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
        /**
         * 点击保存
        */
        saveInfo: function () {
            this.alertStatus = 1;
            let _this = this;
            if (_this.storeName!='' && _this.storeTypeCode!='' && _this.userName!='' && _this.phone!='' && _this.address!='' && _this.cityCode!='' && _this.districtCode!='' && _this.provinceCode!=''  ) {
                if (!this.phoneStatus) {
                    Dialog.confirm({
                        title: '确定要修改吗？',
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
                Toast('带 * 为必填项');
            }
        },
        /**
         * 点击解除
        */
        delInfo: function () {
            this.alertStatus = 2;
            let _this = this;
            Dialog.confirm({
                title: '确定要解除吗？',
                message: ''
            }).then(() => {
                _this.trueBtn();
            }).catch(() => {
                _this.falseBtn();
            });
        },
        /*
        * 点击取消
        */
        falseBtn: function () {
            Dialog.close();
        },
        /*
        * 点击取确定
        */
        trueBtn: function () {
            if (this.alertStatus == 1) {
                let _this = this;
                this.$axios.get('updatePartnerStore.do',{
                    params: {
                        partnerStoreName: _this.storeName,	//名称	
                        partnerStoreType: _this.storeTypeCode,	//类型代码	
                        provinceCode: _this.provinceCode,	//省代码	
                        cityCode: _this.cityCode,	//市代码	
                        areaCode: _this.districtCode,	//区代码	
                        address: _this.address,	//详细地址	
                        principal: _this.userName,	//负责人	
                        phone: _this.phone,	//电话	
                        partnerStoreNo: _this.partnerStoreNo	//代码	
                    }
                }) 
                .then(res=>{
                    if (res.data.code == 0) {
                        Toast.success('修改成功');
                        setTimeout(function () {
                            _this.$router.push({
                                path: '/mengyouxiangxi',
                                query: {
                                    partnerStoreNo: _this.partnerStoreNo
                                }
                            })
                        },2000)
                    }
                }).catch(function(res){
                    console.error(res)
                })
            } else {
                let _this = this;
                this.$axios.get('removePartnerStore.do',{
                    params: {	
                        partnerStoreNo: _this.partnerStoreNo	//代码	
                    }
                }) 
                .then(res=>{
                    if (res.data.code == 0) {
                        Toast.success('解除成功');
                        setTimeout(function () {
                            _this.$router.push({
                                path: '/wodemengyou',
                                query: {
                                    
                                }
                            })
                        },2000)
                    }
                }).catch(function(res){
                    console.error(res)
                })
            };
        }
    },
    mounted() {
        this.partnerStoreNo = this.$route.query.partnerStoreNo;
        let _this = this;
        this.$axios.get('partnerStoreInfo.do',{
            params: {
               partnerStoreNo: _this.partnerStoreNo
            },
            showLoadMask:false,
        }) 
        .then(res=>{
            if (res.data.code == 0) {
                _this.dataObj = res.data.data.partnerStoreInfo;
                _this.storeName = res.data.data.partnerStoreInfo.partnerStoreName;
                _this.storeTypeCode = res.data.data.partnerStoreInfo.partnerStoreType;
                _this.storeType = res.data.data.partnerStoreInfo.partnerStoreTypeDesc;
                _this.userName = res.data.data.partnerStoreInfo.principal;
                _this.phone = res.data.data.partnerStoreInfo.phone;
                _this.address = res.data.data.partnerStoreInfo.address;
                _this.province = res.data.data.partnerStoreInfo.provinceDesc;
                _this.city =  res.data.data.partnerStoreInfo.cityDesc;
                _this.district =  res.data.data.partnerStoreInfo.areaDesc;
                _this.provinceCode = res.data.data.partnerStoreInfo.provinceCode;
                _this.cityCode =  res.data.data.partnerStoreInfo.cityCode;
                _this.districtCode =  res.data.data.partnerStoreInfo.areaCode;
                _this.rale = res.data.data.partnerStoreInfo.rate*100+"%";
            }
            _this.phoneBlur();
        }).catch(function(res){
            console.error(res)
        })
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
    .main {
        width: 100%;
        flex:1;
        position: relative;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        .ulList {
            background: #fff;
            width: 100%;
            box-sizing: border-box;
            padding-left: .3rem;
            padding-right: .3rem;
            margin-top: .3rem;
            position: relative;
            .li {
                width: 100%;
                height: auto;
                border-bottom: 1px solid #f7f7f7;
                .main_ipt {
                    display: flex;
                    height: .86REM;
                    width: 100%;
                }
                .name {
                    height: .85rem;
                    display: block;
                    line-height: .86rem;
                    font-size: .34rem;
                    i {
                        color: red;
                    }
                }
                .box {
                    height: .85rem;
                    flex: 1;
                    margin-left: .5rem;
                    input {
                        width: 100%;
                        height: 100%;
                        outline: none;
                        border: none;
                        text-align: right;
                        font-size: .32rem;
                    }
                }
                .icon {
                    display: block;
                    width: .3rem;
                    height: .85rem;
                    line-height: .86rem;
                    font-size: .3rem;
                    font-weight: bold;
                    margin-left: .1rem;
                    color: #777;
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
        height: 2.5rem;
        box-sizing: border-box;
        padding-right: .25rem;
        padding-left: .25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .codeImg {
            width: 100%;
            height: .85rem;
            box-sizing: border-box;
            a {
                display: block;
                width: 100%;
                height: 100%;
                text-align: center;
                line-height: .85rem;
                font-size: .34rem;
                color: #fff;
                background: #24c3c5;
                border-radius: .1rem;
            }
        }
        .upData {
            margin-top: .3rem;
            width: 100%;
            height: .85rem;
            box-sizing: border-box;
            a {
                display: block;
                width: 100%;
                height: 100%;
                text-align: center;
                line-height: .85rem;
                font-size: .34rem;
                color: #24c3c5;
                border-radius: .1rem;
                border: 1px solid #24c3c5;
            }
        }
    }
</style>
