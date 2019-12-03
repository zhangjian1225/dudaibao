<template>
    <div class="container" id="pdfDom">
        <div class="header">
            <div class="back">
                <router-link :to="{path:'/projectMore', query: {productId: productId, productCode: productCode}}" class="icon iconfont">&#xe611;</router-link>
            </div>
            <div class="title">计划书</div>
            <div class="iconBox" @click="wxInfo()"></div>
        </div>
        <div class="main">
            <!-- 被保人信息 -->
            <div class="personInfoBox">
                <div class="paddingBox">
                    <p class="desc">被保人信息</p>
                    <div class="radioBox">
                        <span class="sex">性别</span>
                        <div class="chooseBox">
                            <van-radio-group v-model="gender" @change="onChange">
                                <van-radio checked-color="#02bfae" name="1">男</van-radio>
                                <van-radio checked-color="#02bfae" name="2">女</van-radio>
                            </van-radio-group>
                        </div>
                    </div>
                    <div class="ageBox">
                        <span class="age">年龄</span>
                        <p class="iptBox">
                            <span class="everBox" @click="brithdayChooseFn">
                                <div class="descBox" v-html="brithday==''?'生日(选填)':brithday"></div>
                                <van-icon name="play" />
                            </span>
                            <span class="everBox">
                                <div class="descBox" v-html="age==''?'年龄':age"></div>
                                <van-icon name="play" />
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <!-- 险种选择 -->
            <div class="productBox">
                <div class="paddingBox">
                    <div class="top">
                        <div class="left">
                            <p class="desc">险种选择</p>
                            <p class="title">倍健康（2019）</p>
                            <p class="money"><span class="text">首年保费：</span><span class="num"  v-html="allRate+'元'"></span></p>
                        </div>
                        <div class="right" @click="updataFn">修改</div>
                    </div>
                    <table>
                        <tr>
                            <th>险种</th>
                            <th>保额</th>
                            <th>保费</th>
                            <th>交费期</th>
                        </tr>
                        <tr v-for="(item, index) in getPremium">
                            <td align="center" v-html="item.productName"></td>
                            <td align="center" v-html="item.basicPrem"></td>
                            <td align="center" v-html="item.rate"></td>
                            <td align="center" v-html="item.premTerm"></td>
                        </tr>
                    </table>
                    <div class="addBox">
                        <div class="addMian" @click="openProductList"><van-icon name="plus" />添加主险/附加险</div>
                    </div>
                </div>
            </div>
            <!-- 封面信息 -->
            <div class="fengmianBox">
                <span class="title">封面信息</span>
                <van-checkbox v-model="checked" checked-color="#02bfae"></van-checkbox>
            </div>
            <!-- 产品信息 -->
            <ul class="productInfoBox">
                <li @click="productInfoFn(1)">
                    <p class="img">
                        <img src="./images/3.png"/>
                    </p>
                    <p class="text">产品条例</p>
                </li>
                <li @click="productInfoFn(2)">
                    <p class="img">
                        <img src="./images/4.png"/>
                    </p>
                    <p class="text">产品资料</p>
                </li>
                <!-- <li>
                    <p class="img">
                        <img src="./images/5.png"/>
                    </p>
                    <p class="text">产品对比</p>
                </li>
                <li>
                    <p class="img">
                        <img src="./images/6.png"/>
                    </p>
                    <p class="text">家庭计划书</p>
                </li> -->
            </ul>
        </div>
        <div class="totleMoney">首年总保费 <span class="red" v-html="allRate+'元'"></span></div>
        <van-popup v-model="showBrithday" position="bottom">
            <van-datetime-picker title= "出生日期" type="date" v-model="nowDate"  :min-date="mindate" :max-date="maxdate" @cancel="onBriCancel" @confirm="onBriConfirm"/>
        </van-popup>
        <div class="mask" v-show="productInfoShow">
            <div class="productInfoBox">
                <div class="close" @click="closeList"><van-icon name="cross"/></div>
                <ul class="productInfoList" v-for="(item, index) in productInfoList" v-if="!iframeStatus">
                    <li v-html="(index+1)+'、'+item.clausName" @click="getHtmlPage(item.clausUrl)"></li>
                </ul>
                <div class="ifr" v-if="iframeStatus">
                    <span class="icon iconfont" @click="callBackListFn">&#xe611;返回</span>
                    <div class="ifrBox">
                        <iframe id="iframe" :src="iframeSrc" @load="iframeLoadFn" scrolling='yes'></iframe>
                    </div>
                </div>
            </div>
        </div>
        <div class="mask_1" v-if="productListStatus">
            <div class="close" @click="closeFn">
                <van-icon name="close" />
            </div>
            <ul>
                <li v-for="(item, index) in productList">
                    <p v-html="item.productName">首年总保费首年总保费首年总保费首年总保费首年总保费首年总保费</p>
                    <span @click="addIdList(item.productId)" v-if="IdList.indexOf(item.productId)<0">+</span>
                    <span class="span" v-if="IdList.indexOf(item.productId)>=0">+</span>
                </li>
            </ul>
        </div>
        <div class="updataBox" v-if="updataPageStatus">
            <select-components v-if="updataPageStatus" :isShow="updataPageStatus"  @updataPageStatusFn="updataPageStatusFn"></select-components> 
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import updataPlan from './updataPlan';
export default {
    name: "homePage",
    components: {
        'select-components': updataPlan
    },
    data() {
        return {
            htmlTitle: '页面导出PDF文件名',
            productId:'', // 产品id
            productCode:'',
            showBrithday: false, // 是否显示生日
            productInfoShow: false, // 产品信息是否显示
            productListStatus: false, // 关闭添加产品
            iframeStatus: false, // 是否显示iframe
            iframeSrc:'',
            checked: false,
            gender: '1',
            mindate:new Date(),
            maxdate:new Date(),
            brithday:'',
            nowDate:'2019-04-27',
            age: '30', 
            info: {},
            IdList:[], // 保险id列表
            productList: [], // 产品列表
            productInfoList: [], // 产品信息
            getPremium: [], // 获取保费
            payPeriod: '3年交', //  交费期间
            coveragePeriod:'终身', //保障期间
            sumInsured:'300000', //保额
            allRate: '',// 总保费
            premiumData: {
                mainData: []
            },
            updataPageStatus: false // 修改保险
        };
    },
    methods: {
        // 修改
        updataFn: function () {
           this.updataPageStatus = true; 
        },
        // 关闭修改页面
        updataPageStatusFn: function (status) {
            this.updataPageStatus = false;
        },
        // 添加保险列表
        addIdList: function (id) {
            this.IdList.push(id);
        },
        // 关闭保险列表
        closeFn: function () {
            this.productListStatus = false;
        },
        // 打开保险列表
        openProductList: function () {
            this.productListStatus = true;
        },
        // 选择出生日期
        brithdayChooseFn: function () {
            this.showBrithday = true;
        },
        // 选择性别
        onChange(event) {
            // console.log(event.detail)
            // // this.setData({
            //     gender: event
            // // });
        },
        // 生日点击取消
        onBriCancel: function () {

        },
        // 生日点击确定
        onBriConfirm: function () {

        },
        // 点击产品信息
        productInfoFn: function (type) {
            if (type == '1') {
                let arr = [];
                arr.push(this.productId);
                let _this = this;
                this.$axios.post('/getClause.do',arr) 
                .then(res=>{
                    if (res.data.code == '0') {
                        _this.productInfoList = res.data.data;
                        _this.productInfoShow = true;
                    }
                }).catch(function(res){
                    console.error(res)
                })
            } else if (type == '2') {
                let arr = [];
                arr.push(this.productId);
                let _this = this;
                this.$axios.post('/getProductData.do',arr) 
                .then(res=>{
                    if (res.data.code == '0') {
                        _this.productInfoList = res.data.data.clause;
                        _this.productInfoShow = true;
                    }
                }).catch(function(res){
                    console.error(res)
                })
            }
        },
        // 关闭产品
        closeList: function () {
            Toast.clear();
            this.productInfoShow = false;
            this.iframeStatus = false;
        },
        // 产品对应的条例页面
        getHtmlPage: function (src) {
            Toast.loading({
                duration: '0',
                mask: false,
                message: '加载中...'
            });
            this.iframeSrc = src;
            this.iframeStatus = true;
        },
        iframeLoadFn: function () {
            Toast.clear();
             //解决iso系统iframe没有滚动条的bug
        },
        // 返回产品列表
        callBackListFn: function () {
            Toast.clear();
            this.iframeSrc = '';
            this.iframeStatus = false;
        },
        // 获取主险附加险
        getProduct: function () {
            let _this = this;
            this.$axios.get('/getPlanBookProduct/'+_this.productId+'.do',{
                params: {}
            }) 
            .then(res=>{
                if (res.data.code == '0') {
                    _this.productList = res.data.data.productAdds;
                }
            }).catch(function(res){
                console.error(res)
            })
        }
    },
    mounted() {
        this.productId = this.$route.query.productId;
        this.productCode = this.$route.query.productCode;
        this.IdList.push(this.productId);
        let _this = this;
        // let arr = [];
        // arr.push({
        //     productId: this.productId,
        //     gender: _this.gender == '1'?'男':'女', //性别
        //     age: _this.age, //年龄
        //     payPeriod: _this.payPeriod, //交费期间
        //     sumInsured: _this.sumInsured, //保额
        //     coveragePeriod:_this.coveragePeriod, //保障期间
        //     Premium:'', // 保费
        // });
        // 取保费
        let info = {
            productId: this.productId,
            gender: _this.gender == '1'?'男':'女', //性别
            age: _this.age, //年龄
            payPeriod: _this.payPeriod, //交费期间
            sumInsured: _this.sumInsured, //保额
            coveragePeriod:_this.coveragePeriod, //保障期间
            Premium:'', // 保费
        }
        this.$axios.get('/getRateInfo/'+_this.productId+'.do') 
        .then(res=>{
            if (res.data.code == '0') {
                _this.premiumData.mainData = res.data.data;
                for (let i = 0; i<_this.premiumData.mainData.length; i++) {
                    let item = _this.premiumData.mainData[i]
                    if (info.productId == item.productId && info.gender == item.gender && info.age == item.applicationAge && info.payPeriod == item.premTerm && info.coveragePeriod == item.coverDate) {
                        this.getPremium.push(item);
                        _this.allRate = item.rate;
                    }
                }
            }
        }).catch(function(res){
            console.error(res)
        })
        this.getProduct();
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
            text-align: center;
            line-height: 0.8rem;
            font-size: 0.34rem;
        }
        .iconBox {
            width: .4rem;
            height: .35rem;
            background: url(./images/9.png) no-repeat;
            background-size: 100% 100%;
            margin-right: .3rem;
        }
    }
    .main {
        width: 100%;
        flex: 1;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        margin-top: .3rem;
        .personInfoBox {
            width: 100%;
            height: auto;
            background: #fff; 
            .paddingBox {
                width: 100%;
                height: auto;
                box-sizing: border-box;
                padding: 0 .3rem 0 .3rem;
            }
            .desc {
                width: 100%;
                height: .5rem;
                line-height: .5rem;
                font-size: .35rem;
                color: #02bfae;
                padding-top: 0.2rem;
            }
            .radioBox {
                width: 100%;
                height: .9rem;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #f7f7f7;
                justify-content: space-between;
                .sex {
                    font-size: .34rem;
                }
                .van-radio-group {
                    display: flex;
                    .van-radio {
                        margin-left: .5rem;
                    }
                }
            }
            .ageBox {
                width: 100%;
                height: .9rem;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #f7f7f7;
                justify-content: space-between;
                .age {
                    font-size: .34rem;
                }
                .iptBox {
                    width: 4.5rem;
                    height: 100%;
                    display: flex;
                    .everBox {
                        display: flex;
                        flex:1;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        .descBox {
                            font-size: .32rem;
                            color: #777;
                        }
                        .van-icon::before {
                            top: 50%;
                            color: #777;
                            margin-top: -.1rem;
                            margin-left: .15rem;
                            font-size: .15rem;
                            position: absolute;
                            transform:rotate(90deg);
                        }
                    }
                }
            }
        }
        .productBox {
            width: 100%;
            height: auto;
            background: #fff; 
            margin-top: .3rem;
            .paddingBox {
                width: 100%;
                height: auto;
                box-sizing: border-box;
                padding: 0 .3rem 0 .3rem;
            }
            .desc {
                width: 100%;
                height: .5rem;
                line-height: .5rem;
                font-size: .35rem;
                color: #02bfae;
                padding-top: 0.2rem;
            }
            .top {
                width: 100%;
                height: auto;
                display: flex;
                align-items: center;
                padding-bottom: .1rem;
                .left {
                    height: auto;
                    flex: 1;
                    .title {
                        height: .6rem;
                        line-height: .6rem;
                        width: 100%;
                        font-size: .32rem;
                        // font-weight: bold;
                    }
                    .money {
                        height: .6rem;
                        line-height: .6rem;
                        width: 100%;
                        font-size: .32rem;
                        color: #777;
                    }
                }
                .right {
                    font-size: .32rem;
                    color: #02bfae;
                }
            }
            table {
                width: 100%;
                border-collapse: collapse;
                td, th {
                    border: 1px solid #777;
                    height: .6rem;
                    text-align: center;
                    max-width: 2rem;
                    box-sizing: border-box;
                    padding: .1rem;
                }
            }
            .addBox {
                width: 100%;
                height: 1.2rem;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .addMian  {
                    padding: .1rem .2rem .1rem .2rem;
                    font-size: .32rem;
                    background: #02bfae;
                    border-radius: .6rem;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    .van-icon {
                        margin-right: .2rem;
                    }
                }
            }
        }
        .fengmianBox {
            width: 100%;
            height: 1rem;
            background: #fff;
            display: flex;
            align-items: center;
            margin-top: .3rem;
            box-sizing: border-box;
            padding: 0 .3rem 0 .3rem;
            .title {
                font-size: .35rem;
                color: #02bfae;
                line-height: 1rem;
                flex: 1;
            }
        }
        .productInfoBox {
            width: 100%;
            padding: .3rem 0 .3rem 0;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: .3rem;
            li {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                .img {
                    width: .8rem;
                    height: .8rem;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .text {
                    font-size: .3rem;
                    margin-top: .15rem;
                }
            }
        }
    }
    .totleMoney {
        height: 1rem;
        width: 100%;
        box-sizing: border-box;
        padding: 0 .3rem 0 .3rem;
        line-height: 1rem;
        font-size: .34rem;
        background: #fff;
        margin-top: .3rem;
        .red {
            color: #ff3600;
        }
    }
    .mask {
        position:absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        box-sizing: border-box;
        padding: .3rem;
        z-index: 100;
        .close {
            position: absolute;
            width: .7rem;
            height: .7rem;
            background: #24c3c5;
            border-radius: .4rem;
            text-align: center;
            line-height: .75rem;
            color: #fff;
            font-size: .4rem;
            font-weight: bold;
            right: 0rem;
            top: 0;
        }
        .productInfoBox {
            width: 100%;
            height: 100%;
            overflow: hidden;
            overflow-y: auto;
            background: #fff;
            border-radius: .3rem;
            box-sizing: border-box;
            padding: .3rem;
            .productInfoList {
                width: 100%;
                height: auto;
                li {
                    width: 100%;
                    height: .7rem;
                    line-height: .7rem;
                    font-size: .34rem;
                    font-weight: bold;
                }
            }
            .ifr {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                .icon {
                    display: block;
                    height: .7rem;
                    line-height: .7rem;
                    font-size: .32rem;
                }
                .ifrBox {
                    width: 100%;
                    flex: 1;
                    overflow: auto;
                    -webkit-overflow-scrolling: touch;
                }
                #iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            }
        }
    }
    .mask_1 {
        position:absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        z-index: 100;
        .close {
            position: absolute;
            right: .3rem;
            top: .3rem;
            width: .6rem;
            height: .6rem;
            // border: 2px solid #fff;
            // border-radius: 50%;
            line-height: .6rem;
            text-align: center;
            color: #fff;
            font-size: .34rem;
            font-weight: bold;
            .van-icon {
                font-size: .6rem!important;
            }
        }
        ul {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 6rem;
            background:#fff;
            box-sizing: border-box;
            padding: .3rem;
            overflow: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling : touch;
            li {
                width: 100%;
                height: auto;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #f7f7f7;
                padding: .3rem 0 .3rem 0;
                p {
                    flex: 1;
                    height: auto;
                    font-size: .34rem;
                }
                span {
                    display: block;
                    height: .4rem;
                    width: .4rem;
                    background: #24c3c5;
                    font-size: .34rem;
                    text-align: center;
                    line-height: .4rem;
                    border-radius: 50%;
                    color: #fff;
                    font-weight: bold;
                    margin-left: .3rem;
                    line-height: .4rem;
                }
                .span {
                    display: block;
                    height: .4rem;
                    width: .4rem;
                    background: #999;
                    font-size: .34rem;
                    text-align: center;
                    line-height: .4rem;
                    border-radius: 50%;
                    color: #fff;
                    font-weight: bold;
                    margin-left: .3rem;
                    line-height: .4rem;
                }
            }
        }
    }
    .updataBox {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
</style>
