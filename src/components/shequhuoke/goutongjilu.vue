<template>
    <div class="container" id="pdfDom">
        <div class="header">
            <div class="back">
                <router-link :to="{path:'/'+addressBack,query:{clientId:clientId, address: address}}" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">沟通记录</div>
            <div class="add" @click="addFn"></div>
        </div>
        <div class="noInfo" v-if="communicationList.length<=0">没有沟通数据</div>
        <ul class="communicationList" v-if="communicationList.length>0">
            <li v-for="(item, index) in communicationList">
                <p class="data_desc">
                    <span class="desc" v-html="item.content"></span>
                    <span class="date" v-html="item.date"></span>
                </p>
                <p class="text" v-html="item.result">销售面谈销售面谈销售面谈</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "goutongjilu",
    data() {
        return {
            communicationList: [], // 沟通信息
            clientId:'',
            address:'',
            addressBack:''
            
        };
    },
    methods: {
        addFn: function () {
            let _this = this;
            _this.$router.push({
                path: '/tianjiajilu',
                query: {
                    clientId: _this.clientId,
                    addressBack: _this.addressBack,
                    address: _this.address
                }
            });
        }
    },
    mounted() {
        let _this =this;
        this.clientId = this.$route.query.clientId;
        this.address = this.$route.query.address;
        this.addressBack = this.$route.query.addressBack;
        this.$axios.get('getCommunicationList.do',{
            params: {
               clientId: _this.clientId
            }
        }) 
        .then(res=>{
            this.communicationList = res.data.data.communicationList;
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
            text-align: center;
            line-height: 0.8rem;
            font-size: 0.34rem;
        }
        .add {
            width: .4rem;
            height: .4rem;
            background: url(./images/add1.png) no-repeat;
            background-size: 100% 100%;
            margin-right: .2rem;
        }
    }
    .noInfo {
        width: 100%;
        height: .8rem;
        font-size: .32rem;
        color: #777;
        text-align: center;
        line-height: .8rem;
    }
    .communicationList {
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        padding: 0 .2rem 0 .2rem;
        overflow: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling : touch;
        li {
            width: 100%;
            min-height: 1.2rem;
            margin-top: .1rem;
            box-shadow: 0rem 0rem 0.1rem rgba(0, 0, 0, 0.1);
            background: #fff;
            box-sizing: border-box;
            padding: 0.2rem .2rem .2rem .2rem;
            border-radius: .1rem;
            .data_desc {
                display: flex;
                justify-content: space-between;
                .desc {
                    font-size: .34rem;
                }
                .date {
                    font-size: .32rem;
                    color: #666;
                }
            }
            .text {
                font-size: .32rem;
                color: #666;
                margin-top: .15rem;
                line-height: .36rem;
                padding-bottom: .1rem;
            }
        }
    }
</style>
