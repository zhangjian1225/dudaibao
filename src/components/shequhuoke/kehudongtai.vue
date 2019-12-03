<template>
    <div class="container" id="pdfDom">
        <div class="header">
            <div class="back">
                <router-link to="/shequhuoke" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">客户动态</div>
        </div>
        <div class="nav">
            <div class="imgBox">
                <img v-if="dataInfo.headImage" :src="dataInfo.headImage"/>
            </div>
            <div class="main_nav">
                <p class="name" v-html="dataInfo.clientName"></p>
                <p class="desc" v-html="'客户来源：'+dataInfo.sourceDesc"></p>
            </div>
            <div class="userMoreInfoDesc" @click="getMore">客户详细信息<span class="icon iconfont">&#xe61b;</span></div>
        </div>
        <div class="conHistoryDesc">
            <p class="desc">沟通记录</p>
            <p class="addBox" @click="addInfo(clientId)"></p>
        </div>
        <div class="conHistoryListBox">
            <ul class="conHistoryList">
                <li class="desc" v-if="!communication">没有沟通记录</li>
                <li class="listEver" v-if="communication"  @click="getMoreInfo(communication.clientId)">
                    <div class="scroll">
                        <span class="listEverDesc" v-html="communication.content"></span>
                    </div>
                    <span class="date" v-html="communication.date"></span>
                    <span class="icon iconfont">&#xe61b;</span>
                </li>
            </ul>
        </div>
        <div class="dongtaiDesc">客户动态</div>
        <div class="dongtaiListBox">
            <ul class="dongtaiList">
                <li class="desc" v-if="clientRecord.length<=0">没有客户动态</li>
                <li class="listEver" v-for="(item, index) in clientRecord" >
                    <span class="date" v-html="item.date"></span>
                    <p class="text" v-html="item.dynamic"></p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "kehudongtai",
    data() {
        return {
            url:'http://www.i-agent.cn/dudaibao',
            dataInfo: '', // 客户信息
            clientRecord: [], // 活动信息
            communication: {}, // 沟通信息
            clientId:'',
        };
    },
    methods: {
        goBack: function () {
            this.$router.go(-1);
        },
        getMore: function (clientId) {
            let _this = this;
            this.$router.push({
                path: '/shequhuokeUserInfo',
                query: {
                    clientId: _this.clientId,
                    address:'kehudongtai'
                }
            })
        },
        // 获取详细信息
        getMoreInfo: function (clientId) {
            let _this = this;
            this.$router.push({
                path: '/goutongjilu',
                query: {
                    clientId: _this.clientId,
                    addressBack: 'kehudongtai'
                }
            })
        },
        // 添加记录
        addInfo: function(clientId) {
            let _this = this;
            this.$router.push({
                path: '/tianjiajilu',
                query: {
                    clientId: clientId
                }
            })
        }
    },
    mounted() {
        let _this =this;
        this.clientId = this.$route.query.clientId;
        this.$axios.get('getClientBehavior.do',{
            params: {
               clientId: _this.clientId
            }
        }) 
        .then(res=>{
            _this.dataInfo = res.data.data.clientInfo;
            _this.communication = res.data.data.communication;
            _this.clientRecord = res.data.data.clientRecord;
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
        background: #fff;
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
        height: 1.7rem;
        margin-top: 1px;
        background: #fff;
        box-sizing: border-box;
        padding: 0 .3rem 0 .3rem;
        display: flex;
        align-items: center;
        .imgBox {
            width:1rem;
            height: 1rem;
            border-radius: .1rem;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
                border-radius: .1rem;
            }
        }
        .main_nav {
            flex: 1;
            margin-left: .2rem;
            .name {
                color: #000;
                font-size: .34rem;
            }
            .desc {
                font-size: .32rem;
                color: #666;
                margin-top: .1rem;
            }
        }
        .userMoreInfoDesc {
            font-size: .32rem;
            color: #67d7d9;
        }
    }
    .conHistoryDesc {
        width: 100%;
        height: 1rem;
        display: flex;
        box-sizing: border-box;
        padding: 0 .3rem 0 .3rem;
        justify-content: space-between;
        align-items: center;
        .desc {
            font-size: .34rem;
            font-weight: bold;
        }
        .addBox {
            width: .4rem;
            height: .4rem;
            background: url(./images/add1.png) no-repeat;
            background-size: 100% 100%;
            margin-right: .2rem;
        }
    }
    .conHistoryListBox {
        width: 100%;
        box-sizing: border-box;
        padding: 0 .3rem 0 .3rem;
        height: 1.5rem;
        overflow: hidden;
        .conHistoryList {
            width: 100%;
            height: auto;
            .desc {
                width: 100%;
                height: .5rem;
                color: #666;
                text-align: center;
                line-height: .5rem;
                font-size: .34rem;
            }
            .listEver {
                width: 100%;
                height: .9rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding: 0 .3rem 0 .3rem;
                margin-top: .1rem;
                background: #fff;
                .scroll {
                    flex: 1;
                    height: .9rem;
                    overflow: hidden;
                    overflow-y: auto;
                    .listEverDesc {
                        font-size: .34rem;
                        line-height: .9rem;
                        color: #000;
                    }
                }
                .date {
                    margin-left: .2rem;
                    font-size: .3rem;
                    color: #666;
                }
                .icon {
                    display: block;
                    height: .85rem;
                    line-height: .85rem;
                    margin-left: .2rem;
                    font-size: .3rem;
                    font-weight: bold;
                    color: #999;
                }
            }
        }
    }
    .dongtaiDesc {
        width: 100%;
        height: 1rem;
        box-sizing: border-box;
        padding: 0 .3rem 0 .3rem;
        font-size: .34rem;
        line-height: .8rem;
        font-weight: bold;
    }
    .dongtaiListBox {
        width: 100%;
        box-sizing: border-box;
        padding: 0 .3rem 0 .3rem;
        min-height: 1.2rem;
        flex: 1;
        overflow: hidden;
        overflow-y: auto;
        .dongtaiList {
            width: 100%;
            height: auto;
            .desc {
                width: 100%;
                height: .5rem;
                color: #666;
                text-align: center;
                line-height: .5rem;
                font-size: .34rem;
            }
            .listEver {
                width: 100%;
                min-height: 1.5rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                box-sizing: border-box;
                padding: 0 .3rem 0 .3rem;
                margin-top: .2rem;
                background: #fff;
                .text {
                    font-size: .32rem;
                    margin-top: .1rem;
                    color: #000;
                }
                .date {
                    font-size: .34rem;
                    color: #666;
                }
            }
        }
    }

</style>
