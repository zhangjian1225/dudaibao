<template>
    <div class="container" id="pdfDom">
        <div class="header">
            <div class="back">
                <router-link to="/wodemengyou" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">盟友客户</div>
        </div>
        <div class="main">
            <div class="titleBox">
                <router-link :to="{ path: '/mengyouxiangxi',query:{partnerStoreNo:partnerStoreNo}}">
                    <div class="title" v-html="title"></div>
                    <div class="type" v-html="'类型：'+type"></div>
                    <div class="moreInfo">详细信息<span class="iconfont" style="font-weight: bold;">&#xe61b;</span></div>
                </router-link>
            </div>
            <div class="listMain">
                <ul class="ulList">
                <li class="A_Z_box" v-for="(item, i) in dataObj" v-if='item.length>0'>
                    <div class="A_Z" v-html="i"></div>
                    <div class="liList" v-for="(items, j) in item">
                        <!-- type为1 没有保单记录 沟通记录 -->
                        <router-link :to="{ path: '/userInfo',query:{partnerStoreNo: partnerStoreNo,clientId: items.clientId,type:'1'}}">
                            <div class="msgBox">
                                <div class="name">
                                    <span class="userName" v-html="'姓名：'+items.clientName"></span>
                                    <span class="boyIcon iconfont" v-if="items.gender == 1">&#xe639;</span>
                                    <span class="girlIcon iconfont" v-if="items.gender == 2">&#xe6e3;</span>
                                </div>
                                <div class="msg">
                                    <span class="type">电话：</span>
                                    <span class="typeName" v-html="items.phone"></span>
                                    <span class="proName">年龄：</span>
                                    <span class="num" v-html="items.age+'周岁'"></span>
                                </div>
                                 <span class="icon iconfont">&#xe61b;</span>
                            </div>
                        </router-link>
                    </div>
                </li>
            </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "wodemengyoukehu",
    data() {
        return {
            partnerStoreNo:'', // 前页带过来的列表参数
            dataObj: {},
            title: '',
            type:'',
            clientId:''
        };
    },
    methods: {
        
    },
    mounted() {
        let _this =this;
        this.partnerStoreNo = this.$route.query.partnerStoreNo; // 接受参数
        let a_z = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        for (let i = 0; i<a_z.length; i++) {
            _this.dataObj[a_z[i]] = [];
        };
        /**
         * 获取异业联盟客户信息列表
        */
        this.$axios.get('partnerStoreClient.do',{
            params: {
               partnerStoreNo: _this.partnerStoreNo
            }
        }) 
        .then(res=>{
            let dataInfo = res.data.data.partnerStore;
            this.title = dataInfo.partnerStoreName;
            this.type = dataInfo.partnerStoreTypeDesc;
            let resData = res.data.data.partnerStoreClients;
            for (let i = 0; i<resData.length; i++) {
                let name = _this.CHToPY(resData[i].clientName); // 获取首字母
                _this.dataObj[name].push(resData[i]);
            };
            _this.dataObj = JSON.parse(JSON.stringify(_this.dataObj));
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
        // box-sizing: border-box;
        // padding-bottom: .25rem;
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
        flex: 1;
        display: flex;
        flex-direction: column;
        .titleBox {
            margin-top: 1px;
            height: 1.4rem;
            background: #fff;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding-left: .3rem;
            padding-right: .3rem;
            position: relative;
            a {
                width: 100%;
                height: 100%;
                 display: flex;
                flex-direction: column;
            }
            .title {
                width: 100%;
                margin-top: .4rem;
                height: .4rem;
                line-height: .4rem;
                font-size: .34rem;
                color: #000;
                // font-weight: bold
            }
            .type {
                width: 100%;
                height: .6rem;
                line-height: .6rem;
                font-size: .3rem;
                color: #999;
            }
            .moreInfo {
                position: absolute;
                height: 100%;
                right: .2rem;
                top: 0;
                line-height: 1.4rem;
                font-size: .32rem;
                color: #67d7d9;
            }
        }
        .listMain {
            width: 100%;
            flex: 1;
            position: relative;
            overflow: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling : touch;
            .ulList {
                width: 100%;
                .A_Z {
                    width: 100%;
                    height: .6rem;
                    color: #666;
                    font-size: .34rem;
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
                        flex-direction: column;
                        box-sizing: border-box;
                        border-bottom: 2px solid #f7f7f7;
                        .name {
                            width: 100%;
                            flex: 1;
                            box-sizing: border-box;
                            padding-top: .2rem;
                            color: #000;
                            display: flex;
                            justify-items: center;
                            .userName {
                                font-size: .34rem;
                                color: #000;
                            }
                            .boyIcon {
                                color: #61afff;
                                margin-left: .2rem;
                                font-size: .35rem;
                            }
                            .girlIcon {
                                color: #ff5959;
                                margin-left: .2rem;
                                font-size: .35rem;
                            }
                        }
                        .msg {
                            color: #666;
                            font-size: .32rem;
                            flex: 1;
                            display: flex;
                            align-items: center;
                            .proName {
                                margin-left: .6rem;
                            }
                            .num {
                                font-size: .32rem;
                                color: #666;
                            }
                        }
                        .icon {
                            position: absolute;
                            height: 100%;
                            right: 0;
                            top: 0;
                            line-height: 1.43rem;
                            z-index: 1;
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
                position: absolute;
                left: 50%;
                bottom: .1rem;
                width: 1.2rem;
                height: 1.2rem;
                background: #24c3c5;
                border-radius: .6rem;
                margin-left: -.6rem;
                background: url(./images/5.png) no-repeat;
                background-size: 100% 100%;
            }
        }
    }
    

</style>
