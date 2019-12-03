<template>
    <div class="container" id="pdfDom">
        <div class="header">
            <div class="back">
                <router-link :to="{ path: 'heka',query:{clientId:clientId}}" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">我的贺卡</div>
        </div>
        <div class="main">
            <div class="birthdayBox">
                <p class="desc">生日贺卡</p>
                <ul class="cardList">
                    <li v-for="(item, index) in brithdayList">
                        <img :src="item.cardUrl"/>
                    </li>
                </ul>
            </div>
            <div class="otherBox">
                <p class="desc">节日贺卡</p>
                <ul class="cardList">
                    <li v-for="(item, index) in otherList">
                        <img :src="item.cardUrl"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "heka",
    data() {
        return {
            clientId: '',
            brithdayList:[],
            otherList: []
        };
    },
    methods: {
       
    },
    mounted() {
       this.clientId = this.$route.query.clientId;
       let _this = this;
        this.$axios.get('getMyCardInfo.do',{
            params: {
              
            }
        }) 
        .then(res=>{
            if (res.data.code == 0) {
                for(let i = 0; i<res.data.data.myCardList.length; i++) {
                    if (res.data.data.myCardList[i].cardType == '1') {
                        _this.brithdayList.push(res.data.data.myCardList[i]);
                    } else if (res.data.data.myCardList[i].cardType == '2') {
                        _this.otherList.push(res.data.data.myCardList[i]);
                    } 
                }
            }
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
        padding-bottom: .3rem;
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
        .myCard {
            font-size: .26rem;
            text-align: center;
            line-height: .8rem;
            height: 100%;
            margin-right: .3rem;
            color: #666;
        }
    }
    .main {
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        padding: 0 .3rem 0 .3rem;
        overflow: hidden;
        // display: flex;
        // flex-direction: column;
        .birthdayBox {
            width: 100%;
            height: 50%;
            display: flex;
            flex-direction: column;
            .desc {
                width: 100%;
                height: .9rem;
                line-height: .9rem;
                font-size: .3rem;
                color: #000;
            }
            .cardList {
                width: 100%;
                flex: 1;
                background: #fff;
                overflow: hidden;
                overflow-y: auto;
                display: flex;
                flex-wrap: wrap;
                li {
                    width: 1.92rem;
                    height: 3.02rem;
                    margin-top: .2rem;
                    margin-left: .2rem;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .otherBox {
            width: 100%;
            height: 50%;
            margin-top: .2rem;
            display: flex;
            flex-direction: column;
            .desc {
                width: 100%;
                height: .9rem;
                line-height: .9rem;
                font-size: .3rem;
                color: #000;
            }
            .cardList {
                width: 100%;
                flex: 1;
                background: #fff;
                overflow: hidden;
                overflow-y: auto;
                display: flex;
                flex-wrap: wrap;
                li {
                    width: 1.92rem;
                    height: 3.02rem;
                    margin-top: .2rem;
                    margin-left: .2rem;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
