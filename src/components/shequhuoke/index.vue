<template>
    <div class="container" id="pdfDom">
        <div class="header">
            <div class="back">
                <router-link to="/homePage" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">获客</div>
        </div>
        <div class="nav">
            <div class="navList">
                <router-link to="/myCard">
                    <div class="icon">
                        <img src="./images/1.png"/>
                    </div>
                    <div class="font">我的名片</div>
                </router-link>
            </div>
            <div class="navList">
                <router-link to="/wodekehu">
                    <div class="icon">
                        <img src="./images/2.png"/>
                    </div>
                    <div class="font">我的客户</div>
                </router-link>
            </div>
        </div>
        <div class="mainText">获客动态</div>
        <div class="main">
            <ul class="ulList">
                <li class="liList" v-for="(item, index) in dataArr" @click="chooseLi(item.clientId)">
                    <div class="imgBox">
                        <img :src="item.headImage"/>
                    </div>
                    <div class="cotextBox">
                        <p class="name" v-html="item.clientName"></p>
                        <p class="infoBox">
                            <span class="desc" v-html="item.dynamic"></span>
                            <span class="date" v-html="item.date"></span>
                        </p>
                    </div>
                    <span class="icon iconfont">&#xe61b;</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            url:'http://www.i-agent.cn/dudaibao',
            dataArr: []
        };
    },
    methods: {
        chooseLi: function (clientId) { // 跳转客户动态
            let _this = this;
            this.$router.push({
                path: '/kehudongtai',
                query: {
                    clientId: clientId
                }
            })
        }
    },
    mounted() {
        let _this =this;
        this.$axios.get('getAllClientRecord.do',{
            params: {
               
            }
        }) 
        .then(res=>{
            _this.dataArr = res.data.data.allClientRecord;
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
    .nav {
        width: 100%;
        height: 1.6rem;
        background: #fff;
        margin-top: 1px;
        display: flex;
        .navList {
            height: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            a {
                display: inline-block;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .icon {
                width: .6rem;
                height: .6rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .font {
                font-size: .3rem;
                margin-top: .1rem;
                font-weight: bold;
            }
        }
    }
    .mainText {
        width: 100%;
        height: .8rem;
        box-sizing: border-box;
        padding-left:.25rem; 
        line-height: .8rem;
        font-size: .35rem;
        font-weight: bold;
        background: #fff;
        margin-top: .25rem;
    }
    .main {
        width: 100%;
        flex: 1;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        .ulList {
            width: 100%;
            height: auto;
            box-sizing: border-box;
            background: #fff;
            padding: 0 .25rem 0rem .25rem;
            .liList {
                width: 100%;
                height: 1.4rem;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                align-items: center;
                .imgBox {
                    width: 1rem;
                    height: 1rem;
                    border-radius: .2rem;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .cotextBox {
                    flex: 1;
                    height: 1rem;
                    display: flex;
                    flex-direction: column;
                    margin-left: .2rem;
                    p {
                        width: 100%;
                        flex: 1;
                        line-height: .5rem;
                    }
                    .name {
                        font-size: .34rem;
                        color: #000;
                    }
                    .infoBox {
                        display: flex;
                        justify-content: space-between;
                        span {
                            font-size: .32rem;
                            color: #888;
                        }
                    }
                }
                .icon {
                    display: block;
                    margin-left: .1rem;
                    font-weight: bold;
                    font-size: .3rem;
                    color: #777;
                }
            }
            .liList:last-child {
                border-bottom: none;
            }
        }
    }

</style>
