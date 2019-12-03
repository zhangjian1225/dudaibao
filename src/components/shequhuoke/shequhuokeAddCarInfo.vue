<template>
    <div class="container">
        <div class="header">
            <div class="back">
                <router-link :to="{ path: '/shequhuokeCarInfo',query:{clientId:clientId,address: address}}" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">车辆信息</div>
        </div>
        <div class="main">
            <div class="main_info_box">
                <div class="userCard">
                    <ul class="userCardList">
                        <li class="listLiNum"  @click="aFn">
                            <div class="main_ipt">
                                <span class="desc">车牌号<i>*</i></span>
                                <span class="carNumbox" v-html="carInfoData.carNum" v-if="type == 1">未填</span>
                                <input class="ipt" maxlength="7" onkeyup="this.value=this.value.replace(/[^\u4e00-\u9fa5 \. A-Z0-9]/g,'')" placeholder="请输入车辆号码" type="text" v-model="carInfoData.carNum" v-if="type == 2" @blur="cardNumTest"/>
                            </div>
                             <p class="errorMsg" v-if="carError">*证件号码格式不正确</p>
                        </li>
                        <li class="listLi" @click="carCompanyFn">
                            <span class="desc">品牌类型<i>*</i></span>
                            <input class="ipt noUserSelect" readonly="readonly" placeholder="请选择品牌类型" type="text" v-model="carInfoData.brandDesc"/>
                            <span class="icon iconfont">&#xe61b;</span>
                        </li>
                    </ul>
                </div>
                <div class="userCard">
                    <ul class="userCardList">
                        <li class="userCardDesc">行驶证信息</li>
                        <li class="listLi">
                            <span class="desc">车辆识别码</span>
                            <input class="ipt" placeholder="请输入车辆识别码" onkeyup="value=value.replace(/[^A-Za-z0-9]/g,'')" type="text" v-model="carInfoData.viNum"/>
                        </li>
                        <li class="listLi">
                            <span class="desc">发动机型号</span>
                            <input class="ipt" type="text" placeholder="请输入发动机型号" onkeyup="value=value.replace(/[^A-Za-z0-9]/g,'')" v-model="carInfoData.engineNum"/>
                        </li>
                        <li class="listLi">
                            <span class="desc">座位数</span>
                            <input class="ipt" type="number" placeholder="请输入座位数" v-model="carInfoData.carSeating"/>
                        </li>
                        <li class="listLi" @click="applicationFn">
                            <span class="desc">注册日期</span>
                            <input class="ipt noUserSelect" type="text" readonly="readonly" placeholder="请选择日期" :value="carInfoData.applicationDate"/>
                            <span class="icon iconfont">&#xe61b;</span>
                        </li>
                        <li class="listLi listLi_1" @click="carTypeFn">
                            <span class="desc">车辆类型</span>
                            <input class="ipt noUserSelect" type="text" readonly="readonly" placeholder="请选择车辆类型" v-model="carInfoData.carTypeDesc"/>
                            <span class="icon iconfont">&#xe61b;</span>
                        </li>
                    </ul>
                </div>
                <div class="userCard userCard_1">
                    <ul class="userCardList">
                        <li class="userCardDesc">过户</li>
                        <li class="listLi" @click="isTrueFn">
                            <span class="desc">是否过户</span>
                            <input class="ipt noUserSelect" readonly="readonly" placeholder="是否过户" :value="carInfoData.isTransferDesc"/>
                            <span class="icon iconfont">&#xe61b;</span>
                        </li>
                        <li class="listLi listLi_1" v-if="carInfoData.isTransfer == 'Y'" @click="transferFn">
                            <span class="desc">日期</span>
                            <input class="ipt noUserSelect" readonly="readonly" placeholder="请选择日期" v-model="carInfoData.transferDate"/>
                            <span class="icon iconfont">&#xe61b;</span>
                        </li>
                        <li class="textBox">
                            <p>备注</p>
                            <textarea class="noUserSelect" placeholder="请输入备注信息" v-model="carInfoData.remark"></textarea>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="saveBtn" @click="saveCarFn">保存</div>
        </div>
        <!-- 注册时间 -->
        <select-components v-if="isDateShow" :isShow="isDateShow" title="注册时间" type="4" :passDescCode="carInfoData.applicationDate" :passDesc="carInfoData.applicationDate" @dateChange="dateChange"></select-components> 
        <!-- 过户时间 -->
        <select-components v-if="isDateShow2" :isShow="isDateShow2" title="过户时间" type="4" :passDescCode="carInfoData.transferDate" :passDesc="carInfoData.transferDate" @dateChange="dateChange2"></select-components> 
        <!-- 车辆类型 -->
        <select-components v-if="carTypeShow" :isShow="carTypeShow" title="车辆类型" type="6" :passDescCode="carInfoData.carTypeCode" :passDesc="carInfoData.carTypeDesc" @carTypeChange="carTypeChange"></select-components> 
        <!-- 是否 -->
        <select-components v-if="alertisShow" :isShow="alertisShow" title="是否过户" type="7" :passDescCode="carInfoData.isTransfer" :passDesc="carInfoData.isTransferDesc" @isTrueChange="isTrueChange"></select-components> 
        <!-- 品牌类型 -->
        <select-components v-if="carCompanyShow" :isShow="carCompanyShow" title="品牌类型" type="12" :passDescCode="carInfoData.brand" :passDesc="carInfoData.brandDesc" @carCompanyChange="carCompanyChange"></select-components> 
    </div>
   
</template>


<script>
import selectComponents from '../otherComponents/selectComponents';
import { Dialog, Toast} from 'vant';
export default {
    name: "carInfo",
    components: {
        'select-components': selectComponents
    },
    data() {
        return {
            carError: false,
            type:'',
            isDateShow: false, // 注册时间
            isDateShow2: false, // 过户时间
            carTypeShow: false, // 车辆类型
            alertisShow: false, // 是否
            carCompanyShow: false, // 品牌类型
            address:'',
            clientId:'',
            carInfoData: {
                applicationDate: '', // 注册时间
                brand: '', // 品牌类型
                brandDesc:'',
                carNum: '', // 车牌
                carTypeCode: '',
                carTypeDesc:'', // 车类型
                clientId: '',
                carSeating:'', // 座位数
                empNo: '',
                engineNum: '', // 发动机型号
                isTransfer: 'N', // 是否过户
                isTransferDesc:'否',
                transferDate: '', // 过户时间
                viNum: '', // 车辆识别码
                remark:'' // 备注
            },
            chooseIndex: 0,
        };
    },
    methods: {
        aFn: function () {
            if (this.type == 1) {
                Toast('车牌不能更改');
            }
        },
        //  判断车牌是否合法
        cardNumTest: function () {
            if (this.carInfoData.carNum!='') {
                if (this.checkCarNum(this.carInfoData.carNum)) {
                    this.carError = false;
                } else {
                    this.carError = true;
                }
            } else {
                this.carError = false;
            }
        },
        // 点击注册时间
        applicationFn: function () {
            this.isDateShow = true;
        },
        dateChange: function (msg) {
            this.isDateShow = msg.show;
            this.carInfoData.applicationDate = msg.code;
        },
        // 点击过户时间
        transferFn: function () {
            this.isDateShow2 = true;
        },
        dateChange2: function (msg) {
            this.isDateShow2 = msg.show;
            this.carInfoData.transferDate = msg.code;
        },
        // 点击车辆类型
        carTypeFn: function () {
            this.carTypeShow = true;
        },
        carTypeChange: function (msg) {
            this.carTypeShow =  msg.show;
            this.carInfoData.carTypeDesc = msg.desc;
            this.carInfoData.carTypeCode = msg.code;
        },
        // 是否过户
        isTrueFn: function () {
            this.alertisShow = true;
        },
        isTrueChange: function (msg) {
            this.alertisShow =  msg.show;
            // if (!msg.show) {
            //     this.carInfoData.transferDate = '';
            // }
            this.carInfoData.isTransfer = msg.code;
            this.carInfoData.isTransferDesc = msg.desc;
        },
        // 品牌类型
        carCompanyFn: function () {
            this.carCompanyShow = true;
        },
        carCompanyChange: function (msg) {
            this.carCompanyShow =  msg.show;
            this.carInfoData.brand = msg.code;
            this.carInfoData.brandDesc = msg.desc;
        },
        /**
         * 获取车列表
         */
        getcarData: function () {
            let _this =this; 
            this.$axios.get('getCarInfo.do',{
                params: {
                    clientId: _this.clientId
                }
            }) 
            .then(res=>{
                _this.carInfoData = res.data.data.carList[_this.chooseIndex];
                _this.carInfoData.isTransferDesc = _this.carInfoData.isTransfer=='Y'?'是':'否'; 
            }).catch(function(res){
                console.error(res)
            })
        },
        
        // 保存
        saveCarFn: function () {
            let _this = this;
            let alertHtml = '';
            let date = new Date();
            let y = date.getFullYear();
            let m = date.getMonth()+1<10? '0'+(date.getMonth()+1):date.getMonth()+1;
            let d = date.getDate()<10?'0'+date.getDate():date.getDate();
            let str = y+'-'+m+'-'+d;
            let n = str.replace(/\-/g,'') * 1; // 当前时间
            if (_this.carInfoData.applicationDate !='') {
                let a = _this.carInfoData.applicationDate.replace(/\-/g,'') * 1;
                if (a>n) {
                    alertHtml = '注册日期不可大于当前日期';
                }
                if (_this.carInfoData.transferDate!='') {
                    let b = _this.carInfoData.transferDate.replace(/\-/g,'') * 1;
                    if (b<a) {
                        alertHtml = '注册日期不可大于过户日期';
                    }
                    if (b>n) {
                        alertHtml = '过户日期不可大于当前日期';
                    }
                }
            } else {
                if (_this.carInfoData.transferDate!='') {
                    let b = _this.carInfoData.transferDate.replace(/\-/g,'') * 1;
                    if (b<a) {
                        alertHtml = '注册日期不可大于过户日期';
                    }
                    if (b>n) {
                        alertHtml = '过户日期不可大于当前日期';
                    }
                }
            }
            if (_this.carInfoData.brand!='' && _this.carInfoData.carNum!='') {
                if (!_this.carError) {
                    if (alertHtml == '') {
                            Dialog.confirm({
                                title: this.type == '1'?'确定要修改车辆信息吗？':'确定要新增车辆信息吗？',
                                message: ''
                            }).then(() => {
                                _this.trueBtn();
                            }).catch(() => {
                                _this.falseBtn();
                            });
                    } else {
                        Toast(alertHtml);
                    }
                } else {
                    Toast('车牌号格式错误');
                }
            } else {
                Toast('带 * 为必填项');
            }
        },
         /*
        * 点击取消 
        */
        falseBtn: function () {
            this.alertisShow = false;
        },
        /*
        * 点击确定
        */
       trueBtn: function () {
            this.alertisShow = false;
            let _this = this;
            let carSendInfo = {};
            if (_this.clientId!='') {
                carSendInfo.clientId = _this.clientId;
            };
            if (_this.carInfoData.carNum!='') {
                carSendInfo.carNum = _this.carInfoData.carNum;
            };
            if (_this.carInfoData.viNum!='') {
                carSendInfo.viNum = _this.carInfoData.viNum;
            };
            if (_this.carInfoData.brand!='') {
                carSendInfo.brand = _this.carInfoData.brand;
            };
            if (_this.carInfoData.engineNum!='') {
                carSendInfo.engineNum = _this.carInfoData.engineNum;
            };
            if (_this.carInfoData.carTypeCode!='') {
                carSendInfo.carTypeCode = _this.carInfoData.carTypeCode;
            };
            if (_this.carInfoData.applicationDate!='') {
                carSendInfo.applicationDate = _this.carInfoData.applicationDate;
            };
            if (_this.carInfoData.isTransfer!='') {
                carSendInfo.isTransfer = _this.carInfoData.isTransfer;
            };
            if (_this.carInfoData.transferDate!='') {
                carSendInfo.transferDate = _this.carInfoData.transferDate;
            };
            if (_this.carInfoData.carSeating!='') {
                carSendInfo.carSeating = _this.carInfoData.carSeating;
            };
            if (_this.carInfoData.remark!='') {
                carSendInfo.remark = _this.carInfoData.remark;
            };
            if (this.type == 1) { // 修改
                this.$axios.get('updateCarInfo.do',{
                    params:carSendInfo
                }) 
                .then(res=>{
                    if (res.data.code == 0) {
                        Toast.success('修改车辆信息成功');
                        setTimeout(function () {
                            _this.$router.push({
                                path: './shequhuokeCarInfo',
                                query: {
                                    clientId: _this.clientId,
                                    address: _this.address
                                }
                            })
                        }, 2000)
                    }
                   
                }).catch(function(res){
                    console.error(res)
                })
            } else {
                this.$axios.get('addCarInfo.do',{
                    params:carSendInfo
                }) 
                .then(res=>{
                   if (res.data.code == 0) {
                        Toast.success('添加车辆信息成功');
                        setTimeout(function () {
                            _this.$router.push({
                                path: './shequhuokeCarInfo',
                                query: {
                                    clientId: _this.clientId,
                                    address: _this.address
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
        this.clientId = this.$route.query.clientId; // 接受参数
        this.type = this.$route.query.type;
        this.chooseIndex = this.$route.query.chooseIndex;
        this.address = this.$route.query.address;
        if (this.type == 1) {
            this.getcarData();
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
        position: relative;
        box-sizing: border-box;
        // padding-bottom: .3rem;
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
            text-align: center;
            line-height: 0.8rem;
            font-size: 0.34rem;
        }
    }
    .main {
        width: 100%;
        flex:1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        .main_info_box {
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            .carNum {
                width: 100%;
                height: auto;
                 background: #fff;
                .main_ipt {
                    display: flex;
                    width: 100%;
                    height: .8rem;
                    margin-top: .1rem;
                    justify-content: space-between;
                    align-items: center;
                    box-sizing: border-box;
                    padding: 0 .3rem 0 .3rem;
                    .desc {
                        font-size: .34rem;
                        i {
                            color: #ff2a00;
                        }
                    }
                    .carNumbox {
                        font-size: .32rem;
                        color: #ff2a00;
                    }
                    .ipt {
                        flex:1;
                        height: 100%;
                        border: none;
                        outline: none;
                        margin-left: .3rem;
                        font-size: .32rem;
                        text-align: right;
                        // color: #777;
                    }  
                }
                .errorMsg {
                    font-size: .28rem;
                    line-height: .5rem;
                    height: .5rem;
                    color: red;
                    box-sizing: border-box;
                    padding-left: .3rem;
                }
            }
            .userCard {
                width: 100%;
                height: auto;
                background: #fff;
                margin-top: .1rem;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                padding: 0 .3rem 0 .3rem;
                margin-top: .3rem;
                .userCardList {
                    width: 100%;
                    height:auto;
                    .userCardDesc {
                        width: 100%;
                        height: .7rem;
                        line-height: .7rem;
                        color: #24c3c5;
                        font-size: .35rem;
                    }
                    .listLi {
                        width: 100%;
                        height: .83rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-bottom: 1px solid #f7f7f7;
                        .desc {
                            font-size: .34rem;
                            i {
                                color: red;
                            }
                        }
                        .carNumbox {
                            font-size: .32rem;
                            color: #ff2a00;
                            flex: 1;
                            text-align: right;
                        }
                        .ipt {
                            flex:1;
                            height: 100%;
                            border: none;
                            outline: none;
                            margin-left: .3rem;
                            font-size: .32rem;
                            text-align: right;
                            // color: #777;
                        }
                        .noUserSelect {
                            -webkit-user-select :none;
                        }
                    }
                    .listLiNum {
                        width: 100%;
                        height: auto;
                        border-bottom: 1px solid #f7f7f7;
                        .main_ipt {
                            width: 100%;
                            height: .83rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            i {
                                color: #ff2a00;
                            }
                            .carNumbox {
                                font-size: .32rem;
                                color: #ff2a00;
                                flex: 1;
                                text-align: right;
                            }
                            .ipt {
                                flex:1;
                                height: 100%;
                                border: none;
                                outline: none;
                                margin-left: .3rem;
                                font-size: .32rem;
                                text-align: right;
                                color: #ff2a00;
                            }
                            .noUserSelect {
                                -webkit-user-select :none;
                            }
                        }
                        .errorMsg {
                            font-size: .28rem;
                            line-height: .5rem;
                            height: .5rem;
                            color: red;
                        }
                    }
                    .listLi:last-child {
                        border-bottom: none;
                    }
                }
            }
            .userCard_1 {
                .userCardList {
                    height: auto;
                    .textBox {
                        width: 100%;
                        height: auto;
                        padding-bottom: .2rem;
                        p {
                            width: 100%;
                            height: .8rem;
                            line-height: .8rem;
                            font-size: .34rem;
                        }
                        textarea {
                            width: 100%;
                            height: 1.5rem;
                            box-sizing: border-box;
                            padding: .1rem;
                            font-size: .32rem;
                            border: 1px solid #777;
                            outline: none;
                        }
                    }
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
        .saveBtn {
            width: 100%;
            height: .85rem;
            text-align: center;
            line-height: .85rem;
            font-size: .34rem;
            background: #24c3c5;
            // border: 1px solid #24c3c5;
            border-radius: .1rem;
            color: #fff;
        }
    }
</style>
