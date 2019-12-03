<template>
    <div class="container" id="pdfDom">
        <div class="header">
            <div class="back">
                <router-link to="/shequhuoke" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">我的客户</div>
        </div>
        <div class="nav">
            <div class="searchB">
                <div class="searchBox">
                    <span class="iconfont">&#xe61c;</span>
                    <input type="text" v-model="searchDesc" placeholder="请输入关键字"/>
                </div>
                <div class="falseBtn" @click="searchFn">搜索</div>
            </div>
            <div class="main_nav">
                <span :class="chooseIndex == '0'?'span':''" @click="changeListFn(0)">全部</span>
                <span :class="chooseIndex == '1'?'span':''" @click="changeListFn(1)">已成交</span>
                <span :class="chooseIndex == '2'?'span':''" @click="changeListFn(2)">未成交</span>
                <span :class="chooseIndex == '3'?'span':''" @click="changeListFn(3)">即将生日</span>
            </div>
        </div>
        <div class="main">
            <ul class="ulList">
                <li class="A_Z_box" v-for="(item, i) in nowDataObj" v-if='item.length>0'>
                    <div class="A_Z" v-html="i"></div>
                    <div class="liList" v-for="(items, j) in item" @click="routerFn(items.clientId)">
                        <div class="msgBox">
                            <div class="msg">
                                <div class="name" v-html="items.clientName"></div>
                                <div class="phone" v-html="items.phone"></div>
                            </div>
                            <div class="descBox" v-if="items.isBirthday =='Y'" @click.stop="sendFn">送祝福</div>
                            <div class="icon iconfont">&#xe61b;</div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="addBox"><router-link :to="{path:'/huokeAddInitInfo',query:{clientId: clientId,addressUrl:'wodekehu'}}"></router-link></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "wodekehu",
    data() {
        return {
            dataObj: [],
            nowArr:[],
            nowDataObj:{},
            chooseIndex: 0,
            isBirthday: '',
            clientId:'',
            searchDesc:''
        };
    },
    methods: {
        // 切换列表
        changeListFn: function (index) {
            this.chooseIndex = index;
            if (this.chooseIndex == 0) {
                this.nowArr = this.dataObj;
            } else if (this.chooseIndex == 1) {
                this.nowArr = [];
                for(let i = 0; i<this.dataObj.length; i++) {
                    if (this.dataObj[i].isDeal == 'Y') {
                        this.nowArr.push(this.dataObj[i]);
                    }
                };
            } else if (this.chooseIndex == 2) {
                this.nowArr = [];
                for(let i = 0; i<this.dataObj.length; i++) {
                    if (this.dataObj[i].isDeal == 'N') {
                        this.nowArr.push(this.dataObj[i]);
                    }
                };
            } else if (this.chooseIndex == 3) {
                this.nowArr = [];
                for(let i = 0; i<this.dataObj.length; i++) {
                    if (this.dataObj[i].isBirthday == 'Y') {
                        this.nowArr.push(this.dataObj[i]);
                    }
                };
            }
            this.flitDataFn(this.nowArr);
        },
        // 送祝福
        sendFn: function () {
            let _this = this;
            this.$router.push({
                path: '/heka',
                query: {
                    clientId: _this.clientId,
                }
            });
        },
        // 跳转
        routerFn: function (clientId) {
            this.$router.push({
                path: '/shequhuokeUserInfo',
                query: {
                    clientId: clientId,
                    address:'wodekehu'
                }
            });
        },
        // 筛选
        flitDataFn: function (resData) {
            let _this = this;
            let a_z = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'];
            let re = /^[A-Za-z\u4e00-\u9fa5]+$/;
            for (let i = 0; i<a_z.length; i++) {
                _this.nowDataObj[a_z[i]] = [];
            };
            for (let i = 0; i<resData.length; i++) {
                 let str = resData[i].clientName.slice(0,1);
                let r = re.test(str);
                let name = r?_this.CHToPY(str):'#'; // 获取首字母
                _this.nowDataObj[name].push(resData[i]);
            };
            _this.nowDataObj = JSON.parse(JSON.stringify(_this.nowDataObj));
        },
        searchFn: function  () {
            this.getInfoFn();
        },
        getInfoFn: function () {
            let _this =this;
            this.$axios.get('getClientList.do',{
                params: {
                search: _this.searchDesc
                }
            }) 
            .then(res=>{
                if (res.data.code == 0) {
                    let resData = res.data.data.clientList;
                    let _this = this;
                    _this.dataObj = resData;
                    // console.log(resData)
                    _this.flitDataFn(resData);
                }
            }).catch(function(res){
                console.error(res)
            })
        }
    },
    mounted() {
        this.clientId = this.$route.query.clientId;
        this.getInfoFn();
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
    .nav {
        width: 100%;
        height: 2rem;
        background: #fff;
        margin-top: 1px;
        display: flex;
        flex-direction: column;
        padding-bottom: .1rem;
        .searchB {
            width: 100%;
            height: 1.2rem;
            background: #fff;
            margin-top: 1px;
            display: flex;
            align-items: center;
            .searchBox {
                height: .7rem;
                flex: 1;
                display: flex;
                background: #f7f7f7;
                align-items: center;
                margin-left: .25rem;
                margin-right: .25rem;
                border-radius: .35rem;
                overflow: hidden;
                .iconfont {
                    display: block;
                    width: .4rem;
                    height: .4rem;
                    margin-left: .25rem;
                    margin-right: .25rem;
                    color: #999;
                    font-size: .4rem;
                }
                input {
                    flex: 1;
                    height: 100%;
                    background: #f7f7f7;
                    border: none;
                    outline: none;
                    border-radius:  0 .35rem .35rem 0;
                    font-size: .32rem;
                    line-height: .9rem;
                }
            }
            .falseBtn {
                font-size: .34rem;
                margin-right: .25rem;
            }
        }
        .main_nav {
            width: 100%;
            height: .8rem;
            box-sizing: border-box;
            padding: 0 .3rem 0 .3rem;
            display: flex;
            align-items: center;
            span {
                display: block;
                flex: 1;
                height: 100%;
                line-height: .8rem;
                font-size: .34rem;
                color: #777;
                text-align: center;
                position: relative;
            }
            .span {
                color: #000;
            }
            .span::after {
                content:'';
                position: absolute;
                width: 20%;
                height: 2px;
                background: #24c3c5;
                bottom: 0;
                left: 40%;
                border-radius: .1rem;
            }
        }
    }
    .main {
        width: 100%;
        flex: 1;
        position: relative;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        .ulList {
            width: 100%;
            padding-bottom: 1rem;
            .A_Z {
                width: 100%;
                height: .6rem;
                color: #666;
                font-size: .35rem;
                box-sizing: border-box;
                padding-left: .3rem;
                line-height: .6rem;
            }
            .liList {
                width: 100%;
                height: 1.4rem;
                background: #fff;
                box-sizing: border-box;
                padding-left: .3rem;
                padding-right: .3rem;
                a {
                    display: block;
                    width: 100%;
                    height: 1.4rem;
                }
                .msgBox {
                    width: 100%;
                    height: 1.4rem;
                    position: relative;
                    display: flex;
                    box-sizing: border-box;
                    border-bottom: 2px solid #f7f7f7;
                    align-items: center;
                    .msg {
                        color: #666;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        .name {
                            width: 100%;
                            box-sizing: border-box;
                            color: #666;
                            font-size: .34rem;
                        }
                        .phone {
                            width: 100%;
                            box-sizing: border-box;
                            color: #666;
                            font-size: .32rem;
                            margin-top: .15rem;
                        }
                    }
                    .descBox {
                        height: .6rem;
                        width:1.45rem;
                        border: 1px solid #ff796b;
                        border-radius: .15rem;
                        text-align: center;
                        line-height: .6rem;
                        color: #ff796b;
                        font-size: .3rem;
                        margin-right: .3rem;
                    }
                    .icon {
                        height: 100%;
                        line-height: 1.4rem;
                        color: #666;
                        font-size: .3rem;
                        font-weight: bold;
                    }
                }
            }
            .liList:last-child {
                .msgBox {
                    border-bottom: none;
                }
            }
        }
        .addBox {
            position: fixed;
            left: 50%;
            bottom: .1rem;
            width: 1.2rem;
            height: 1.2rem;
            background: #24c3c5;
            border-radius: .6rem;
            margin-left: -.6rem;
            background: url(./images/5.png) no-repeat;
            background-size: 100% 100%;
            a {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }

</style>
