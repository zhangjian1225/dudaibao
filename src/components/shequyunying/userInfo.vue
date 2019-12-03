<template>
    <div class="container" id="pdfDom">
        <div class="header">
            <div class="back">
                <router-link :to="{ path: '/wodemengyoukehu',query:{partnerStoreNo:partnerStoreNo}}" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">客户信息</div>
        </div>
        <div class="main">
            <div class="mainBox">
                <div class="mainInfo">
                    <div class="img_name">
                        <div class="img">
                            <img  v-if="headImage" :src="headImage"/>
                            <img src="../../assets/image/header.jpg" v-if="headImage == ''"/>
                        </div>
                        <div class="name" v-html="clientInfo.clientName"></div>
                    </div>
                    <div class="tagBox">
                        <span class="tagList" v-for="(item, index) in tag" v-html="item"></span>
                    </div>
                </div>
            </div>
            <ul class="ulListBox">
                <li class="telBox">
                    <div class="tel_addree">
                        <p class="tel" v-html="clientInfo.phone"></p>
                        <p class="address" v-html="clientInfo.address"></p>
                    </div>
                    <div class="telIcon">
                        <a :href="'tel:'+clientInfo.phone"></a>
                    </div>
                </li>
                <li class="initInfo">
                    <router-link :to="{ path: '/initInfo',query:{partnerStoreNo:partnerStoreNo,clientId:clientId}}">
                        <span class="title">基本信息</span>
                        <span class="icon iconfont">&#xe61b;</span>
                    </router-link>
                </li>
                <li class="initInfo">
                    <router-link :to="{ path: '/familyInfo',query:{partnerStoreNo:partnerStoreNo,clientId:clientId}}">
                        <span class="title">家庭信息</span>
                        <span class="icon iconfont">&#xe61b;</span>
                    </router-link>
                </li>
                <li class="initInfo">
                    <router-link :to="{ path: '/carInfo',query:{partnerStoreNo:partnerStoreNo,clientId:clientId}}">
                        <span class="title">车辆信息</span>
                        <span class="icon iconfont">&#xe61b;</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "carInfo",
    data() {
        return {
            partnerStoreNo: '',
            clientId: '',
            clientInfo:{},
            headImage:'',
            tag: [] // 标签
        };
    },
    methods: {
        
    },
    mounted() {
        this.partnerStoreNo = this.$route.query.partnerStoreNo; // 接受参数
        this.clientId = this.$route.query.clientId; // 接受参数
        let _this =this;
        this.$axios.get('getClientMainInfo.do',{
            params: {
               clientId: _this.clientId
            }
        }) 
        .then(res=>{
            if (res.data.data.clientInfo.headImage) {
                
                _this.headImage = res.data.data.clientInfo.headImage;
            }
            _this.clientInfo = res.data.data.clientInfo;
            _this.tag = res.data.data.tag.tag
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
    .main {
        width: 100%;
        flex: 1;
        margin-top: .5rem;
        overflow: hidden;
        overflow-y: auto;
        .mainBox {
            display: flex;
            flex-direction: column;
            background: #fff;
        }
        .mainInfo {
            width: 100%;
            box-sizing: border-box;
            padding-left: .3rem;
            padding-right: .3rem;
            .img_name {
                width: 100%;
                height: 1.85rem;
                display: flex;
                align-items: center;
                .img {
                    height: 1.5rem;
                    width: 1.5rem;
                    border-radius: .75rem;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: .75rem;
                    }
                }
                .name {
                    font-size: .42rem;
                    font-weight: bold;
                    margin-left: .3rem;
                }
            }
            .tagBox {
                width: 100%;
                height: auto;
                margin-top: .1rem;
                padding-bottom: .3rem;
                display: flex;
                flex-wrap: wrap;
                .tagList {
                    height: .45rem;
                    border: 1px solid #02bfae;
                    color: #02bfae;
                    line-height: .45rem;
                    font-size: .32rem;
                    padding:  0 .15rem 0 .15rem;
                    margin-left: .2rem;
                    margin-top: .2rem;
                    border-radius: .1rem;
                }
            }
        } 
        .ulListBox {
            width: 100%;
            box-sizing: border-box;
            padding-left: .3rem;
            padding-right: .3rem;
            .telBox {
                width: 100%;
                height: 1.8rem;
                display: flex;
                border-bottom: 1px solid #e5e5e5;
                .tel_addree {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .tel {
                        width: 100%;
                        height: .4rem;
                        font-size: .43rem;
                        margin-top: .3rem;
                    }
                    .address {
                        width: 100%;
                        height: auto;
                        line-height: .4rem;
                        font-size: .34rem;
                        color: #666;
                        margin-top: .2rem;
                    }
                }
                .telIcon {
                    height: 100%;
                    width: .6rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    a {
                        width: 100%;
                        height: .6rem;
                        background: url(./images/8.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            .initInfo {
                width: 100%;
                height: .9rem;
                border-bottom: 1px solid #e5e5e5;
                a {
                    width: 100%;
                    height: .9rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .title {
                    flex: 1;
                    font-size: .34rem;
                }
                .icon {
                    width: .3rem;
                    font-size: .3rem;
                    font-weight: bold;
                }
            }
        }

    }

</style>
