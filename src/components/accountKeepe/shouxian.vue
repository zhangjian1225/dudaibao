<template>
    <div class="container">
            <div class="header">
                <div class="back"><router-link to="/accountKeepe">〈 </router-link> </div>
                <div class="title">寿险收入明细</div>
            </div>
            <div class="timeBox">
                <div class="timeBox_1" @click="startTime()">
                    <span class="text">结算时间起</span>
                    <span class="text_1">
                        <input type="text" placeholder="请选择时间" :value="time1"  class="time noUserSelect" readonly="readonly"/>
                        <span class="icon">〉</span>
                        <el-date-picker ref="datePicker" v-model="time1" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </span>
                </div>
                <div class="timeBox_2" @click="startTime_1()">
                    <span class="text">结算时间起</span>
                    <span class="text_1">
                        <input type="text" placeholder="请选择时间" :value="time2"  class="time noUserSelect" readonly="readonly"/>
                        <span class="icon">〉</span>
                        <el-date-picker ref="datePicker_1" v-model="time2" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </span>
                </div>
            </div>
            <div class="typeBox">
                <div class="typeBox_1 typeBox_1_border" :class="isChoose?'typeBox_1_hover':''" @click="chooseFn(true)"><span class="text">已结算 ( </span><span class="num">100000</span><span class="text"> )</span></div>
                <div class="typeBox_1" :class="!isChoose?'typeBox_1_hover':''" @click="chooseFn(false)"><span class="text">已结算 ( </span><span class="num">100000</span><span class="text"> )</span></div>
            </div>
            <div class="main">
                <ul class="ulList">
                    <li class="liList">
                        <p class="title">
                            <span class="icon"></span>
                            <span class="orderText">订单号：</span>
                            <span class="orderNumber">000000000</span>
                            <span class="getText">收益：¥</span>
                            <span class="getNum">20000.00</span>
                        </p>
                        <p class="proName">富德生命长盈三号两全保险（万能型）</p>
                        <p class="peopleBox">
                            <span class="tbr">投保人：</span>
                            <span class="people">杨洋</span>
                            <span class="bbr">被保人：</span>
                            <span class="people">杨小阳</span>
                        </p>
                        <p class="telBox">
                            <span class="telBox_1">
                                <span class="telText">电话：</span>
                                <span class="telNum">15810219338</span>
                            </span>
                        </p>
                        <p class="getMoneyBox">
                            <span class="getMoneyText">保费：¥</span>
                            <span class="getMoneyNum">200</span>
                            <span class="right">
                                <span class="getTime">订单日期：</span>
                                <span class="getTime_1">2014-04-15</span>
                            </span>
                        </p>
                    </li>
                    <li class="liList">
                        <p class="title">
                            <span class="icon"></span>
                            <span class="orderText">订单号：</span>
                            <span class="orderNumber">000000000</span>
                            <span class="getText">收益：¥</span>
                            <span class="getNum">20000.00</span>
                        </p>
                        <p class="proName">富德生命长盈三号两全保险（万能型）</p>
                        <p class="peopleBox">
                            <span class="tbr">投保人：</span>
                            <span class="people">杨洋</span>
                            <span class="bbr">被保人：</span>
                            <span class="people">杨小阳</span>
                        </p>
                        <p class="telBox">
                            <span class="telBox_1">
                                <span class="telText">电话：</span>
                                <span class="telNum">15810219338</span>
                            </span>
                        </p>
                        <p class="getMoneyBox">
                            <span class="getMoneyText">保费：¥</span>
                            <span class="getMoneyNum">200</span>
                            <span class="right">
                                <span class="getTime">订单日期：</span>
                                <span class="getTime_1">2014-04-15</span>
                            </span>
                        </p>
                    </li>
                    <li class="liList">
                        <p class="title">
                            <span class="icon"></span>
                            <span class="orderText">订单号：</span>
                            <span class="orderNumber">000000000</span>
                            <span class="getText">收益：¥</span>
                            <span class="getNum">20000.00</span>
                        </p>
                        <p class="proName">富德生命长盈三号两全保险（万能型）</p>
                        <p class="peopleBox">
                            <span class="tbr">投保人：</span>
                            <span class="people">杨洋</span>
                            <span class="bbr">被保人：</span>
                            <span class="people">杨小阳</span>
                        </p>
                        <p class="telBox">
                            <span class="telBox_1">
                                <span class="telText">电话：</span>
                                <span class="telNum">15810219338</span>
                            </span>
                        </p>
                        <p class="getMoneyBox">
                            <span class="getMoneyText">保费：¥</span>
                            <span class="getMoneyNum">200</span>
                            <span class="right">
                                <span class="getTime">订单日期：</span>
                                <span class="getTime_1">2014-04-15</span>
                            </span>
                        </p>
                    </li>
                    <li class="liList">
                        <p class="title">
                            <span class="icon"></span>
                            <span class="orderText">订单号：</span>
                            <span class="orderNumber">000000000</span>
                            <span class="getText">收益：¥</span>
                            <span class="getNum">20000.00</span>
                        </p>
                        <p class="proName">富德生命长盈三号两全保险（万能型）</p>
                        <p class="peopleBox">
                            <span class="tbr">投保人：</span>
                            <span class="people">杨洋</span>
                            <span class="bbr">被保人：</span>
                            <span class="people">杨小阳</span>
                        </p>
                        <p class="telBox">
                            <span class="telBox_1">
                                <span class="telText">电话：</span>
                                <span class="telNum">15810219338</span>
                            </span>
                        </p>
                        <p class="getMoneyBox">
                            <span class="getMoneyText">保费：¥</span>
                            <span class="getMoneyNum">200</span>
                            <span class="right">
                                <span class="getTime">订单日期：</span>
                                <span class="getTime_1">2014-04-15</span>
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
    </div>
</template>

<script>
export default {
    name: 'homePage',
    data () {
        return {
            time1: '',
            time2: '',
            isChoose: true
        }
    },
    methods: {
        startTime: function () {
            this.$refs['datePicker'].focus();
        },
        startTime_1: function () {
            this.$refs['datePicker_1'].focus();
        },
        chooseFn: function (type) {
            this.isChoose = type;
        }
    }
}
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
        font-size: .3rem;
        box-sizing: border-box;
        padding-bottom: .3rem;
    }
    .header {
        position: relative;
        height: .8rem;
        width: 100%;
        background: #fff;
        .back {
            position: absolute;
            height: 100%;
            width: auto;
            line-height: .8rem;
            left: .05rem;
            font-size: .3rem;
            z-index: 1;
            a {
                list-style: none;
                text-decoration: none;
            }
        }
        .title {
            position: absolute;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: .8rem;
            font-size: .3rem;
        }
    }
    .timeBox {
        width: 100%;
        height: 1.8rem;
        background: #fff;
        margin-top: .2rem;
        box-sizing: border-box;
        padding: 0 .2rem 0 .2rem;
        .timeBox_1 {
            width: 100%;
            height: .88rem;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            .text {
                height: 100%;
                display: block;
                font-size: .28rem;
                line-height: .88rem;
            }
            .text_1 {
                height: 100%;
                display: block;
                flex: 1;
                font-size: .28rem;
                line-height: .88rem;
                color: #999;
                text-align: end;
                position: relative;
                .el-date-editor {
                    opacity: 0;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
                input {
                    border: none;
                    outline: none;
                    font-size: .28rem;
                    line-height: .88rem;
                    color: #999;
                    text-align: end;
                }
            }
        }
        .timeBox_2 {
            width: 100%;
            height: .88rem;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            .text {
                height: 100%;
                display: block;
                font-size: .28rem;
                line-height: .88rem;
            }
            .text_1 {
                height: 100%;
                display: block;
                flex: 1;
                font-size: .28rem;
                line-height: .88rem;
                color: #999;
                text-align: end;
                position: relative;
                .el-date-editor {
                    opacity: 0;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
                input {
                    border: none;
                    outline: none;
                    font-size: .28rem;
                    line-height: .88rem;
                    color: #999;
                    text-align: end;
                }
            }
        }
    }
    .typeBox {
        width: 100%;
        height: .34rem;
        display: flex;
        margin-top: .25rem;
        font-size: .24rem;
        font-weight: bold;
        .typeBox_1 {
            flex: 1;
            text-align: center;
            line-height: .34rem;
            color: #666;
            position: relative;
        }
        .typeBox_1_border {
            border-right: 1px solid #cccccc;
        }
        .typeBox_1_hover {
            color: #000;
            ::after {
                content: '';
                position: absolute;
                width: .5rem;
                height: .05rem;
                background: #24c3c5;
                bottom: -.2rem;
                left: 50%;
                margin-left: -.25rem;
            }
        }
    }
    .main {
        width: 100%;
        flex: 1;
        margin-top: .5rem;
        overflow: hidden;
        overflow-y: auto;
        .ulList {
            width: 100%;
            flex: 1;
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
                        width: .3rem;
                        height: .34rem;
                        background: url(./images/4.png) no-repeat;
                        background-size: 100% 100%;
                    }
                    .orderText {
                        font-size: .28rem;
                        color: #666666;
                        margin-left: .2rem;
                    }
                    .orderNumber {
                        font-size: .28rem;
                        color: #666666;
                        flex: 1;
                    }
                    .getText {
                        font-size: .28rem;
                        color: #fe9326;
                    }
                    .getNum {
                        font-size: .28rem;
                        color: #fe9326;
                        margin-right: .2rem;
                    }
                }
                .proName {
                    width: 100%;
                    box-sizing: border-box;
                    font-size: .3rem;
                    margin-bottom: .2rem;
                    margin-top: .2rem;
                }
                .peopleBox {
                    width: 100%;
                    box-sizing: border-box;
                    font-size: .28rem;
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
                        font-size: .28rem;
                        color: #666666;
                        border-bottom: 1px solid #e6e6e6;
                    }
                }
                .getMoneyBox {
                    width: 100%;
                    position: relative;
                    margin-top: .2rem;
                    .getMoneyText {
                        color: #ff2a00;
                        font-size: .32rem;
                    }
                    .getMoneyNum {
                        color: #ff2a00;
                        font-size: .32rem;
                    }
                    .right {
                        position: absolute;
                        right: 0.2rem;
                    }
                    .getTime {
                        color: #666;
                        font-size: .28rem;
                    }
                    .getTime_1 {
                        color: #666;
                        font-size: .28rem;
                    }
                }
                
            }
        }
    }
</style>
