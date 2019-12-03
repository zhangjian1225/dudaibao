<template>
    <div class="container">
            <div class="header">
                <div class="back"><router-link :to="{ path: '/shequhuokebaodanInfo',query:{clientId:clientId, address: address}}" class="iconfont">&#xe611;</router-link> </div>
                <div class="title">保单列表</div>
                <div class="add" @click="addFn"></div>
            </div>
            <div class="main">
                <ul class="ulList">
                    <li class="noData" v-if="dataInfo<=0">没有数据</li>
                    <li class="liList" v-for="(item, index) in dataInfo">
                        <p class="title">
                            <span class="icon"></span>
                            <span class="orderText">订单号：</span>
                            <span class="orderNumber" v-html="item.policyNo"></span>
                            <span class="getText" v-html="item.productTypeDesc"></span>
                        </p>
                        <p class="proName" v-html="item.productName"></p>
                        <p class="peopleBox">
                            <span class="tbr">投保人：</span>
                            <span class="people" v-html="item.appName"></span>
                            <span class="bbr">被保人：</span>
                            <span class="people"  v-html="item.insName"></span>
                        </p>
                        <p class="telBox">
                            <span class="telBox_1">
                                <span class="telText">保障期：</span>
                                <span class="telNum" v-html="item.coverStart +' 至 '+ item.coverEnd"></span>
                            </span>
                        </p>
                        <p class="getMoneyBox">
                            <span class="getMoneyText">保额：¥</span>
                            <span class="getMoneyNum" v-html="item.sumInsured"></span>
                            <span class="right">
                                <span class="getTime">保费：</span>
                                <span class="getTime_1" v-html="item.premium"></span>
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
    </div>
</template>

<script>
export default {
    name: 'baodanList',
    data () {
        return {
            clientId:'',
            dataInfo:[],
            address:''
        }
    },
    methods: {
        addFn: function () {
            let _this = this;
            _this.$router.push({
                path: '/addbaodan',
                query: {
                    clientId: _this.clientId,
                    address: _this.address
                }
            });
        }
    },
    mounted () {
        this.clientId = this.$route.query.clientId; // 接受参数
        this.address = this.$route.query.address; // 接受参数
        let _this =this;
        this.$axios.get('getClientPolicyList.do',{
            params: {
               clientId: _this.clientId
            }
        }) 
        .then(res=>{
           _this.dataInfo = res.data.data.clientPolicyList;
        }).catch(function(res){
            console.error(res)
        })
    }
}
</script>
<style lang="scss" scoped>
  .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #f7f7f7;
        font-size: .3rem;
        box-sizing: border-box;
        padding-bottom: .1rem;
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
        .add {
            width: .4rem;
            height: .4rem;
            background: url(./images/add1.png) no-repeat;
            background-size: 100% 100%;
            margin-right: .2rem;
        }
    }
    .main {
        width: 100%;
        flex: 1;
        margin-top: .2rem;
        box-sizing: border-box;
        padding-left: .2rem;
        padding-right: .2rem;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        .ulList {
            width: 100%;
            flex: 1;
            .noData {
                text-align: center;
                font-size: .3rem;
                color: #999;
            }
            .liList {
                width: 100%;
                height: 3.7rem;
                background: #fff;
                border-radius: .2rem;
                margin-bottom: .2rem;
                box-sizing: border-box;
                padding: 0 .25rem 0.25rem .25rem;
                .title {
                    width: 100%;
                    height: .8rem;
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                    padding: 0 .2rem 0 .2rem;
                    border-bottom: 1px solid #e6e6e6;
                    .icon {
                        width: .37rem;
                        height: .4rem;
                        background: url(./images/4.png) no-repeat;
                        background-size: 100% 100%;
                    }
                    .orderText {
                        font-size: .34rem;
                        color: #666666;
                        margin-left: .2rem;
                    }
                    .orderNumber {
                        font-size: .34rem;
                        color: #666666;
                        flex: 1;
                    }
                    .getText {
                        font-size: .34rem;
                        color: #0096ff;
                    }
                    // .getNum {
                    //     font-size: .28rem;
                    //     color: #fe9326;
                    //     margin-right: .2rem;
                    // }
                }
                .proName {
                    width: 100%;
                    box-sizing: border-box;
                    font-size: .32rem;
                    margin-bottom: .2rem;
                    margin-top: .2rem;
                }
                .peopleBox {
                    width: 100%;
                    box-sizing: border-box;
                    font-size: .32rem;
                    color: #666666;
                    .bbr {
                        margin-left: .6rem;
                    }
                }
                .telBox {
                    width: 100%;
                    box-sizing: border-box;
                    margin-top: .2rem;
                    .telBox_1 {
                        display: block;
                        width: 100%;
                        height: .6rem;
                        font-size: .32rem;
                        color: #666666;
                        border-bottom: 1px solid #e6e6e6;
                    }
                }
                .getMoneyBox {
                    width: 100%;
                    position: relative;
                    margin-top: .2rem;
                    .getMoneyText {
                        color: #fe8900;
                        font-size: .32rem;
                        line-height: .4rem;
                    }
                    .getMoneyNum {
                        color: #fe8900;
                        font-size: .32rem;
                        line-height: .4rem;
                    }
                    .right {
                        position: absolute;
                        right: 0.2rem;
                    }
                    .getTime {
                        color: #ff2a00;
                        font-size: .32rem;
                        line-height: .4rem;
                    }
                    .getTime_1 {
                        color: #ff2a00;
                        font-size: .32rem;
                        line-height: .4rem;
                    }
                }
                
            }
        }
    }
</style>
