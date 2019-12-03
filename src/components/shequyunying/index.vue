<template>
    <div class="container" id="pdfDom">
        <div class="header">
            <div class="back">
                <router-link to="/homePage" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">社区运营</div>
        </div>
        <div class="nav">
            <div class="navList">
                <router-link to="/wodemengyou">
                    <div class="icon">
                        <img src="./images/1.png"/>
                    </div>
                    <div class="font">我的盟友</div>
                </router-link>
            </div>
            <div class="navList">
                <router-link to="/addmengyou">
                    <div class="icon">
                        <img src="./images/2.png"/>
                    </div>
                    <div class="font">新增盟友</div>
                </router-link>
            </div>
            <div class="navList" @click="saomaFn">
                <div class="icon">
                    <img src="./images/3.png"/>
                </div>
                <div class="font">扫码加盟</div>
            </div>
        </div>
        <div class="mainText">盟友动态</div>
        <div class="main">
            <ul class="ulList">
                <li class="liList" v-for="(item, index) in dataArr">
                    <div class="pos_date">
                        <span class="pos" v-html="item.partnerStoreName"></span>
                        <span class="date" v-html="item.date"></span>
                    </div>
                    <div class="text_time">
                        <span class="text" v-html="item.dynamic"></span>
                        <span class="time" v-html="item.time"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk';//引入微信sdk
export default {
    name: "",
    data() {
        return {
            dataArr: [],
            empNo:''
        };
    },
    methods: {
        saomaFn: function () {
            let _this = this;
            this.$router.push({
                path: '/getImgCode',
                query: {
                    partnerStoreNo: '',
                    addressBack:'shequyunying',
                    empNo: _this.empNo
                }
            })
        }
    },
    mounted() {
        let _this =this;
        this.$axios.get('partnerRecodeList.do',{
            params: {
               
            }
        }) 
        .then(res=>{
            _this.dataArr = res.data.data.RecodeList;
            _this.empNo = res.data.data.empNo;
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
                height: 1.35rem;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .pos_date {
                    width: 100%;
                    height: .67rem;
                    display: flex;
                    align-items: center;
                    .pos {
                        font-size: .34rem;
                        flex: 1;
                        line-height: .67rem;
                        color: #000;
                    }
                    .date {
                        font-size: .28rem;
                        flex: 1;
                        text-align: right;
                    }
                }
                .text_time {
                    width: 100%;
                    height: .67rem;
                    display: flex;
                    align-items: center;
                    .text {
                        font-size: .32rem;
                        flex: 1;
                        line-height: .67rem;
                    }
                    .itme {
                        font-size: .28rem;
                        flex: 1;
                        text-align: right;
                    }
                }
                span {
                    color: #666;
                }
            }
        }
    }

</style>
