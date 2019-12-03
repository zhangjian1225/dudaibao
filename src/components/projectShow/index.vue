<template>
    <div class="container">
        <div class="header">
            <div class="back">
                <router-link to="/homePage" class="icon iconfont">&#xe611;</router-link>
            </div>
            <div class="title">产品展示</div>
            <div class="searchBox">
                <router-link :to="{path:'/search', query:{search:search}}" class="iconfont">&#xe61a;</router-link>
            </div>
            <div class="find iconfont" v-if="isShowNum" @click="isShowEye(false)">&#xe618;</div>
            <div class="find_1 iconfont" v-if="!isShowNum" @click="isShowEye(true)"><van-icon name="closed-eye" /></div>
        </div>
        <ul class="navList">
            <li :class="chooseIndex == 0?'liChoose':''" @click="chooseFn(0,'')">全部</li>
            <li :class="chooseIndex == 1?'liChoose':''" @click="chooseFn(1,'03')">车险</li>
            <li :class="chooseIndex == 2?'liChoose':''" @click="chooseFn(2,'02')">团险</li>
            <li :class="chooseIndex == 3?'liChoose':''" @click="chooseFn(3,'01')">寿险</li>
        </ul>
        <div class="thisBox">
            <div class="conTable">
                <!-- listBar_choose 类名在index.html中声明-->
                <div class="listBar" :class="value != '01'?'listBar_choose':''">
                    <van-dropdown-menu active-color="#24c3c5">
                        <van-dropdown-item v-model="value" :options="option" @change="sortChange"/>
                    </van-dropdown-menu>
                </div>
                <div class="listBar" :class="value_1 != 'all'?'listBar_choose':''">
                    <van-dropdown-menu active-color="#24c3c5">
                        <van-dropdown-item v-model="value_1" :options="option_1" @change="areaChange"/>
                    </van-dropdown-menu>
                </div>
                <div class="listBar" :class="Boolean(value_2)?'listBar_choose':''">
                    <van-dropdown-menu active-color="#24c3c5">
                        <van-dropdown-item v-model="value_2" :options="option_2" @change="ageChange"/>
                    </van-dropdown-menu>
                </div>
                <div class="listBar" :class="Boolean(value_3)?'listBar_choose':''" >
                    <van-dropdown-menu active-color="#24c3c5">
                        <van-dropdown-item v-model="value_3" :options="option_3" @change="proChange"/>
                    </van-dropdown-menu>
                </div>
            </div>
            <div class="main">
                <div class="list">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了"  @load="onLoad" :offset="1" van-clearfix>
                        <div v-if="productList.length>0" v-for="(item, index) in productList" class="li_1" :class="(index+1)>=productList.length?'li_1_no':''" loading="加载中">
                            <router-link :to="{path:'/projectMore', query:{productCode: item.productCode, productId: item.productId}}">
                                <img v-if="item.productImage" :src="item.productImage" />
                                <div class="rightBox">
                                    <p class="title" v-html="item.productName"></p>
                                    <p class="text">
                                        <span class="age">
                                            <span>投保年龄：</span>
                                            <span v-html="item.applicationAge"></span>
                                        </span>
                                        <span class="year">
                                            <span>保障期限：</span>
                                            <span v-html="item.coverDate"></span>
                                        </span>
                                    </p>
                                    <p class="priceBox">
                                        <span class="price">
                                            <span class="num" v-html="(item.premStart*1).toFixed(2)"></span>
                                            <span class="font">元起</span>
                                        </span>
                                        <span class="pastPrice" v-if="isShowNum">
                                            <span class="font">推广费：</span>
                                            <span class="num" v-html="(item.commission*100).toFixed(2)+'%'"></span>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </div>
                    </van-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Toast} from 'vant';
export default {
    name: "homePage",
    data() {
        return {
            option: [
                {
                    value: '01',
                    text: '默认排序'
                },
                {
                    value: '02',
                    text: '销量排序'
                },
                {
                    value: '03',
                    text: '价格由高到低'
                },
                {
                    value: '04',
                    text: '价格由低到高'
                },
                {
                    value: '05',
                    text: '最新上架'
                }
            ],
            value: '01',
            option_1: [], // 区域
            value_1: 'all',
            option_2: [], // 年龄段
            value_2: '',
            option_3: [], // 产品
            value_3: '',
            loading: false, // 数据是否加载完
            finished: false, // 是否完成
            isCanLoad: true, // 是否可以加载
            isShowNum: true,  // 是否显示推广率
            type: '',
            chooseIndex: 0, // 列表
            orderById:'01', // 筛选id
            choiceProductClass:'', // 产品类型
            choiceCompany:'', // 选择公司
            choiceApplicationAgeCode:'01', // 投保年龄
            choiceArea:'', // 选择地区
            search:'', // 搜索名字
            page: 0, // 页码
            productList: []
        };
    },
    methods: {
        // 异步更新数据
        onLoad() {
            let _this = this;
            if (_this.isCanLoad) {
                _this.isCanLoad = false;
                _this.page++;
                this.loading = true;
                _this.getInfo();
            }
        },
        sortChange: function (value) {
            this.orderById = value;
            this.page = 0;
            this.productList = [];
            this.isCanLoad = true;
            this.loading = false;
            this.finished = false;
            this.onLoad();
        },
        areaChange: function (value) {
            this.choiceArea = value;
            this.page = 0;
            this.productList = [];
            this.isCanLoad = true;
            this.loading = false;
            this.finished = false;
            this.onLoad();
        },
        ageChange: function (value) {
            this.choiceApplicationAgeCode = value;
            this.page = 0;
            this.productList = [];
            this.isCanLoad = true;
            this.loading = false;
            this.finished = false;
            this.onLoad();
        },
        proChange: function (value) {
            this.choiceCompany = value;
            this.page = 0;
            this.productList = [];
            this.isCanLoad = true;
            this.loading = false;
            this.finished = false;
            this.onLoad();
        },
        // 切换导航栏
        chooseFn: function (status, code) {
            this.chooseIndex = status;
            this.choiceProductClass = code;
            this.page = 0;
            this.productList = [];
            this.isCanLoad = true;
            this.loading = false;
            this.finished = false;
            this.onLoad();
        },
        /**
         * 是否显示推广率
        */
        isShowEye: function (status) {
            this.isShowNum = status;
        },
        /**
         * 排序改变
        */
        pxchange: function () {
            this.getInfo();
        },
        /**
         * 获取数据
        */
        getInfo: function () {
            let _this = this;
            this.$axios.get('/getProductList.do',{
                params: {	
                    noLoadMask: _this.page=='1'?false:true,
                    choiceProductClass: _this.choiceProductClass,//选择产品类型 空 默认全部  01 寿险  02团险 03车险
                    orderBy: _this.orderById,//排序类型  01默认排序 02销量排序 03价格由高到低04价格由低到高05最新上架
                    choiceCompany: _this.choiceCompany,//选择公司
                    choiceApplicationAgeCode: _this.choiceApplicationAgeCode,//选择投保年龄范围默认01   01  0至18周岁  02  18至60周岁   03  60周以上
                    choiceArea: _this.choiceArea,//选择销售区域   默认无
                    page: _this.page, //页数传大于0 的数
                    search: _this.search // 搜索产品
                }
            }) 
            .then(res=>{
                _this.loading = false;
                let data = res.data.data.productList;
                if (data.length>0) {
                    for (let i = 0; i<data.length; i++) {
                        _this.productList.push(data[i]);
                    }
                    _this.isCanLoad = true;
                } else {
                    _this.isCanLoad = false;
                    _this.finished = true;
                    if (_this.page == '1') {
                        Toast('没有搜索到相关产品')
                    }
                }
            }).catch(function(res){
                console.error(res)
            })
        }
    },
    mounted () {
        this.type = this.$route.query.type; // 接受参数 1 初始化 2 搜索页
        let _this = this;
        this.search = this.$route.query.search;
        // if (this.type == 2) {
        //     this.search = this.$route.query.search;
        // }
        this.$axios.get('/getChoiceInfo.do',{
            params: {	
                noLoadMask: true
            }
        }) 
        .then(res=>{
            let data = res.data.data.choiceInfo;
            let age = [{
                value:'',
                text:'所有年龄段'
            }];
            let area = [];
            let pro = [{
                value:'',
                text:'所有产品'
            }];
            for (let i = 0; i<data.applicationAge.length; i++) {
                age.push({
                    value:data.applicationAge[i].applicationAgeCode,
                    text:data.applicationAge[i].applicationAgeDesc
                });
            };
            for (let i = 0; i<data.area.length; i++) {
                area.push({
                    value:data.area[i].areaCode,
                    text:data.area[i].areaDesc
                });
            };
            for (let i = 0; i<data.company.length; i++) {
                pro.push({
                    value:data.company[i].companyCode,
                    text:data.company[i].companyDesc
                });
            };
            _this.option_1 = area;
            _this.option_2 = age;
            _this.option_3 = pro;
        }).catch(function(res){
            console.error(res)
        })
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
        box-sizing: border-box;
        // padding-bottom: .2rem;
        font-size: 0.3rem;
    }
    .header {
        position: relative;
        height: 0.8rem;
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        .back {
            height: 100%;
            width: .5rem;
            line-height: 0.8rem;
            font-size: 0.3rem;
            font-weight: bold;
            a {
                width: 100%;
                height: 100%;
                display: block;
                list-style: none;
                margin-left: .1rem;
                text-decoration: none;
            }
        }
        .title {
            flex: 1;
            height: 100%;
            text-align: center;
            line-height: 0.8rem;
            font-size: 0.34rem;
            margin-left: .7rem;
        }
        .searchBox {
            width: .35rem;
            height: .35rem;
            margin-right: .3rem;
            a {
                display: block;
                width: 100%;
                height: 100%;
                line-height: .35rem;
                font-weight: bold;
                font-size: .38rem;
            }
        }
        .find {
            width: .4rem;
            height: .3rem;
            margin-right: .3rem;
            font-weight: bold;
            font-size: .5rem;
            line-height: .3rem;
        }
        .find_1 {
            width: .4rem;
            height: .3rem;
            margin-right: .3rem;
            font-weight: bold;
            font-size: .45rem;
            line-height: .2rem;
        }
    }
    .navList {
        width: 100%;
        height: .7rem;
        background: #fff;
        display: flex;
        li {
            flex: 1;
            height: 100%;
            text-align: center;
            line-height: .7rem;
            color: #747474;
            font-size: .3rem;
            position: relative;
        }
        .liChoose {
            color: #000;
            font-weight: bold;
        }
        .liChoose::after{
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0rem;
            width: .3rem;
            height: .05rem;
            background:#24c3c5; 
            margin-left: -.15rem;
            z-index: 1;
        }
    }
    .thisBox {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
        .conTable {
            width: 100%;
            height: .66rem;
            display: flex;
            background: #fff;
            margin-top: .2rem;
            position: relative;
            box-sizing: border-box;
            padding: 0 .3rem 0 .2rem;
            .listBar {
                height: 100%;
                flex: 1;
                box-sizing: border-box;
                padding: 0 .1rem 0 0rem;
                overflow: hidden;
                text-align: center;
                line-height: .66rem;
                position: relative;
                margin-left: .1rem;
                .van-dropdown-menu {
                    height: 100%;
                    width: 100%;
                    border: none;
                    .van-ellipsis {
                        font-size: .32rem;
                    }
                }
                .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
                    border: none!important;
                }
            }
        }
        .main {
            width: 100%;
            flex: 1;
            position: relative;
            margin-top: .2rem;
            box-sizing: border-box;
            overflow: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling : touch;
            padding: 0rem .2rem 0rem .2rem;
            border-radius: .3rem;
            .list {
                width: 100%;
                background: #fff;
                box-sizing: border-box;
                padding: .2rem .2rem 0 .2rem;
                .li_1 {
                    width: 100%;
                    height: auto;
                    border-bottom: 1px solid #e5e5e5;
                    padding-bottom: .2rem;
                    margin-bottom: .2rem;
                    a {
                        text-decoration: none;
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        color: #000;
                    }
                    img {
                        width: 1.62rem;
                        height: 1.43rem;
                        border-radius: .1rem;
                    }
                    .rightBox {
                        flex: 1;
                        height: 100%;
                        margin-left: .2rem;
                        .title {
                            width: 100%;
                            font-size: .34rem;
                        }
                        .text {
                            width: 100%;
                            .age {
                                display: block;
                                width: 100%;
                                span {
                                    font-size: .3rem;
                                    color: #999;
                                }
                                .span {
                                    margin-left: .3rem;
                                    color: #999;
                                }
                            }
                            .year {
                                width: 100%;
                                display: block;
                                span {
                                    font-size: .3rem;
                                    color: #999;
                                }
                                .span {
                                    margin-left: .3rem;
                                    color: #999;
                                }
                            }
                        }
                        .priceBox {
                            width: 100%;
                            display: flex;
                            margin-top: 0rem;
                            justify-content: space-between;
                            flex-wrap: wrap;
                        }
                        .price {
                            font-size: .3rem;
                            color: #ff4c26;
                        }
                        .pastPrice {
                            margin-right: .2rem;
                            font-size: .3rem;
                            color: #42ae5b;
                        }
                    }
                }
                .li_1_no {
                    border-bottom: none;
                }
            }
        }
    }
</style>
