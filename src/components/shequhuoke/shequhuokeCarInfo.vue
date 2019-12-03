<template>
    <div class="container">
        <div class="header">
            <div class="back">
                <router-link :to="{ path: '/shequhuokeUserInfo',query:{clientId:clientId, address:address}}" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">车辆信息</div>
        </div>
        <div class="main">
             <div class="carNumBox_1" v-if="datalength == 0">没有数据</div>
            <div class="nav" v-if="datalength != 0">
                <div class="carNumBox" v-for="(item,index) in carInfoData" :class="chooseIndex == index?'carNumBoxHove':''" @click="chooseFn(index)" v-html="'车辆'+(index*1+1)"></div>
            </div>
            <div class="main_info_box" v-if="datalength != 0">
                <div class="userCard">
                    <ul class="userCardList">
                        <li class="listLi">
                            <span class="desc">车牌号</span>
                            <span class="carNumbox" v-html="carInfoData[chooseIndex].carNum"></span>
                        </li>
                        <li class="listLi">
                            <span class="desc">品牌类型</span>
                            <input class="ipt noUserSelect" type="text" readonly="readonly" :placeholder="carInfoData[chooseIndex].brand?carInfoData[chooseIndex].brandDesc:'未填'"/>
                        </li>
                    </ul>
                </div>
                <div class="userCard">
                    <ul class="userCardList">
                        <li class="userCardDesc">行驶证信息</li>
                        <li class="listLi">
                            <span class="desc">车辆识别码</span>
                            <input class="ipt noUserSelect" type="text" readonly="readonly" :placeholder="carInfoData[chooseIndex].viNum?carInfoData[chooseIndex].viNum:'未填'"/>
                        </li>
                        <li class="listLi">
                            <span class="desc">发动机型号</span>
                            <input class="ipt noUserSelect" type="text" readonly="readonly" :placeholder="carInfoData[chooseIndex].engineNum?carInfoData[chooseIndex].engineNum:'未填'"/>
                        </li>
                        <li class="listLi">
                            <span class="desc">座位数</span>
                            <input class="ipt noUserSelect" type="text" readonly="readonly" :placeholder="carInfoData[chooseIndex].carTypeCode?carInfoData[chooseIndex].carSeating:'未填'"/>
                        </li>
                        <li class="listLi">
                            <span class="desc">注册日期</span>
                            <input class="ipt noUserSelect" type="text" readonly="readonly" :placeholder="carInfoData[chooseIndex].applicationDate?carInfoData[chooseIndex].applicationDate:'未填'"/>
                        </li>
                        <li class="listLi listLi_1">
                            <span class="desc">车辆类型</span>
                            <input class="ipt noUserSelect" type="text" readonly="readonly" :placeholder="carInfoData[chooseIndex].carTypeDesc"/>
                        </li>
                    </ul>
                </div>
                <div class="userCard userCard_1">
                    <ul class="userCardList">
                        <li class="userCardDesc">过户</li>
                        <li class="listLi">
                            <span class="desc">是否过户</span>
                            <input class="ipt noUserSelect" readonly="readonly" :placeholder="carInfoData[chooseIndex].applicationDate?carInfoData[chooseIndex].isTransfer =='Y'?'是':'否':'未填'"/>
                        </li>
                        <li class="listLi listLi_1" v-if="carInfoData[chooseIndex].isTransfer =='Y'">
                            <span class="desc">日期</span>
                            <input class="ipt noUserSelect"  readonly="readonly" :placeholder="carInfoData[chooseIndex].transferDate?carInfoData[chooseIndex].transferDate:'未填'"/>
                        </li>
                        <li class="textBox">
                            <p>备注</p>
                            <textarea class="noUserSelect" readonly="readonly" :placeholder="carInfoData[chooseIndex].remark?carInfoData[chooseIndex].remark:'未填'"></textarea>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="addBtn" @click="addCarFn">添加车辆</div>
            <div class="write" @click="writeFn">编辑</div>
        </div>
    </div>
   
</template>

<script>
import {Toast} from 'vant';
export default {
    name: "shequhuokeCarInfo",
    components: {
        
    },
    data() {
        return {
            clientId:'',
            carInfoData: [{
                applicationDate: '',
                brand: '',
                carNum: '',
                carTypeCode: '',
                clientId: '',
                carSeating:'',
                empNo: '',
                engineNum: '',
                isTransfer: '',
                transferDate: '',
                viNum: ''
            }],
            address:'',
            chooseIndex: 0,
            datalength:0
        };
    },
    methods: {
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
                if (res.data.data.carList.length>0) {
                    _this.carInfoData = res.data.data.carList;
                    _this.datalength = _this.carInfoData.length;
                }
                
            }).catch(function(res){
                console.error(res)
            })
        },
        // 切换车辆信息
        chooseFn: function (index) {
            this.chooseIndex = index;
        },
        // 添加车辆
        addCarFn: function () {
            let _this = this;
             _this.$router.push({
                path: '/shequhuokeAddCarInfo',
                query: {
                    type: 2, // 1修改 2 新增
                    clientId: _this.clientId,
                    chooseIndex: _this.chooseIndex,
                    address: _this.address
                }
            });
        },
        // 编辑
        writeFn: function () {
            let _this = this;
            if (this.datalength>0) {
                _this.$router.push({
                    path: '/shequhuokeAddCarInfo',
                    query: {
                        type: 1, // 1修改 2 新增
                        clientId: _this.clientId,
                        chooseIndex: _this.chooseIndex,
                        address: _this.address
                    }
                });
            } else {
                Toast('没有没有可编辑车辆');
            }
        }
    },
    mounted() {
        this.clientId = this.$route.query.clientId; // 接受参数
        this.address = this.$route.query.address; // 接受参数
        this.getcarData();
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
        // padding-bottom: .1rem;
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
        .write {
            height: 100%;
            width: auto;
            margin-right: .2rem;
            line-height: 0.8rem;
            font-size: 0.34rem;
            color: #666;
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
        .carNumBox_1 {
            width: 100%;
            height: 1rem;
            text-align: center;
            line-height: 1rem;
            color: #777;
            font-size: .3rem;
        }
        .nav {
            width: 100%;
            height: .7rem;
            display: flex;
            .carNumBox {
                flex: 1;
                height: 100%;
                text-align: center;
                line-height: .7rem;
                font-size: .34rem;
                position: relative;
            }
            .carNumBoxHove{
                color: #24c3c5;
            }
            .carNumBoxHove::after {
                content: "";
                position: absolute;
                height: 2px;
                width: .3rem;
                background: #24c3c5;
                bottom: 0;
                left: 50%;
                margin-left: -.15rem;
                border-radius: .1rem;
            }
        }
        .main_info_box {
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            overflow-y: auto;
            .userCard {
                width: 100%;
                height: auto;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                padding: 0 .3rem 0 .3rem;
                background: #fff;
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
                            color: #777;
                        }
                        .noUserSelect {
                            -webkit-user-select :none;
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
        height: 2.5rem;
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
            color: #24c3c5;
            border: 1px solid #24c3c5;
            border-radius: .1rem;
        }
        .write {
            width: 100%;
            height: .86rem;
            text-align: center;
            line-height: .86rem;
            font-size: .34rem;
            color: #fff;
            background:  #24c3c5;
            margin-top: .1rem;
            border-radius: .1rem;
        }
    }
</style>
