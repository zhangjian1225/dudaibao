<template>
    <div class="container">
        <div class="header">
            <div class="back">
                <router-link to="/projectShow" class="icon iconfont">&#xe611;</router-link>
            </div>
            <div class="title">产品详情</div>
        </div>
        <div class="nav">
            <p class="listEver" v-for="(item, index) in info" :class="index==thisIndex?'hover':''" v-html="item.productDesc" @click="changeList(index)"></p>
        </div>
        <div class="main">
            <div class="scrool">
                <img ref="img" v-if="info[thisIndex].productUrl!=''" :src="info[thisIndex].productUrl" alt="" @load="loadEndFn">
                <p v-if="!info[thisIndex].productUrl">没有产品图片</p>
            </div>
        </div>
        <div class="footer">
            <div class="btn" @click="getPlanFn">生成计划书</div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    name: "projectMore",
    data() {
        return {
            productCode:'',
            info: [{productUrl:'', productDesc:'' }],
            thisIndex: 0,
            productId:''
        };
    },
    methods: {
        loadEndFn: function () {
            Toast.clear();
        },
        getPlanFn: function () {
            let _this = this;
            this.$router.push({
                path: '/planBook',
                query: {
                    productCode: _this.productCode,
                    productId: _this.productId
                }
            })
        },
        // 切换选项卡
        changeList: function (index) {
            let imgSrc = this.$refs['img'].src;
            if (imgSrc != this.info[index].productUrl) {
                Toast.loading({
                    duration: '0',
                    mask: true,
                    message: '加载中...'
                });
            }
            this.thisIndex = index;
        }
    },
    mounted () {
        this.productCode = this.$route.query.productCode;
        this.productId = this.$route.query.productId;
        let _this = this;
        this.$axios.get('/getProductInfo.do',{
            params: {	
                productCode: _this.productCode
            }
        }) 
        .then(res=>{
            _this.info = res.data.data.ProductImageInfo.productImages;
            Toast.loading({
                duration: '0',
                mask: true,
                message: '加载中...'
            });
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
            margin-left: 0.1rem;
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
            margin-right: 0.3rem;
            text-align: center;
            line-height: 0.8rem;
            font-size: 0.34rem;
        }
    }
    .nav {
        width: 100%;
        height: .8rem;
        display: flex;
        margin-bottom: .1rem;
        .listEver {
            height: 100%;
            flex: 1;
            text-align: center;
            line-height: .8rem;
            font-size: .34rem;
            position: relative;
        }
        .hover:after{
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0rem;
            width: .3rem;
            height: .05rem;
            background:#24c3c5; 
            margin-left: -.15rem;
            z-index: 1;
        }
    }
    .main {
        width: 100%;
        flex: 1;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        .scrool {
            width: 100%;
            height: auto;
            img {
                width: 100%;
                height: auto;
            }
            p {
                width: 100%;
                height: 1rem;
                line-height: 1rem;
                font-size: .3rem;
                text-align: center;
                font-size: #999;
            }
        }
    }
    .footer {
        width: 100%;
        height: 1.4rem;
        background: #fff;
        position: relative;
        .btn {
            width: 7rem;
            height: .8rem;
            background: #24c3c5;
            color: #fff;
            text-align: center;
            line-height: .8rem;
            border-radius: .1rem;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -3.5rem;
            margin-top: -.4rem;
        }
    }
</style>
