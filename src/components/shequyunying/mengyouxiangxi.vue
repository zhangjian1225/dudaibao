<template>
    <div class="container">
        <div class="header">
            <div class="back">
                <router-link :to="{ path: '/wodemengyoukehu',query:{partnerStoreNo:partnerStoreNo}}" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">我的盟友</div>
        </div>
        <div class="main">
            <ul class="ulList">
                <li class="li">
                    <span class="name">店铺名称</span>
                    <input  class="noUserSelect" type="text" readonly="readonly" :placeholder="dataObj.partnerStoreName!=''?dataObj.partnerStoreName:'未填'">
                </li>
                <li class="li">
                    <span class="name">店铺类型</span>
                    <input class="noUserSelect"  type="text" readonly="readonly" :placeholder="dataObj.partnerStoreTypeDesc!=''?dataObj.partnerStoreTypeDesc:'未填'">
                </li>
                <li class="li">
                    <span class="name">联系人姓名</span>
                    <input  class="noUserSelect" type="text" readonly="readonly" :placeholder="dataObj.principal!=''?dataObj.principal:'未填'">
                </li>
                <li class="li">
                    <span class="name">电话号码</span>
                    <input  class="noUserSelect" type="text" readonly="readonly" :placeholder="dataObj.phone!=''?dataObj.phone:'未填'">
                </li>
                <li class="li">
                    <span class="name">所在地区</span>
                    <input  class="noUserSelect" type="text" readonly="readonly" :placeholder="dataObj.provinceDes!='' && dataObj.cityDesc!='' && dataObj.areaDesc!=''?dataObj.provinceDesc+'-'+dataObj.cityDesc+'-'+dataObj.areaDesc:'未填'">
                </li>
                <li class="li">
                    <span class="name">详细地址</span>
                    <input  class="noUserSelect" type="text" readonly="readonly" :placeholder="dataObj.address!=''?dataObj.address:'未填'">
                </li>
                <li class="li">
                    <span class="name">利益分配</span>
                    <input  class="noUserSelect" type="text" readonly="readonly" :placeholder="dataObj.rate!=''?dataObj.rate*100+'%':'未填'">
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="codeImg"><router-link :to="{ path: '/getImgCode',query:{partnerStoreNo:partnerStoreNo, addressBack:'mengyouxiangxi'}}">异业联盟专属二维码</router-link></div>
            <div class="upData"><router-link :to="{ path: '/updataMengyou',query:{partnerStoreNo:partnerStoreNo}}">修改盟友信息</router-link></div>
        </div>
    </div>
   
</template>

<script>
export default {
    name: "mengyouxiangxi",
    components: {
        
    },
    data() {
        return {
            dataObj: {},
            partnerStoreNo:''
        };
    },
    methods: {
        
    },
    mounted() {
        this.partnerStoreNo = this.$route.query.partnerStoreNo;
        let _this = this;
        this.$axios.get('partnerStoreInfo.do',{
            params: {
               partnerStoreNo: _this.partnerStoreNo
            }
        }) 
        .then(res=>{
            this.dataObj = res.data.data.partnerStoreInfo;
        }).catch(function(res){
            console.error(res)
        })
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
        padding-bottom: .25rem;
        position: relative;
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
        flex:1;
        position: relative;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        .ulList {
            background: #fff;
            width: 100%;
            box-sizing: border-box;
            padding-left: .3rem;
            padding-right: .3rem;
            margin-top: .3rem;
            .li {
                width: 100%;
                height: .85rem;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                .name {
                    height: 100%;
                    display: block;
                    line-height: .86rem;
                    font-size: .34rem;
                }
                input {
                    height: 100%;
                    flex: 1;
                    outline: none;
                    border: none;
                    margin-left: .5rem;
                    text-align: right;
                    font-size: .32rem;
                }
                .icon {
                    display: block;
                    width: .3rem;
                    height: 100%;
                    line-height: .86rem;
                    font-size: .3rem;
                    font-weight: bold;
                    color: #666;
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
        .codeImg {
            width: 100%;
            height: .85rem;
            box-sizing: border-box;
            a {
                display: block;
                width: 100%;
                height: 100%;
                text-align: center;
                line-height: .85rem;
                font-size: .34rem;
                color: #fff;
                background: #24c3c5;
                border-radius: .1rem;
            }
        }
        .upData {
            margin-top: .3rem;
            width: 100%;
            height: .85rem;
            box-sizing: border-box;
            a {
                display: block;
                width: 100%;
                height: 100%;
                text-align: center;
                line-height: .85rem;
                font-size: .34rem;
                color: #24c3c5;
                border-radius: .1rem;
                border: 1px solid #24c3c5;
            }
        }
    }
</style>
