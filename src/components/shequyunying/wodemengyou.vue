<template>
    <div class="container" id="pdfDom">
        <div class="header">
            <div class="back">
                <router-link to="/shequyunying" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">异业联盟</div>
        </div>
        <div class="nav">
            <div class="searchBox">
                <img src="./images/4.png"/>
                <input type="text" v-model="searchDesc" placeholder="请输入关键字"/>
            </div>
            <div class="falseBtn" @click="searchFn">搜索</div>
        </div>
        <div class="main">
            <ul class="ulList">
                <li class="A_Z_box" v-for="(item, i) in dataObj" v-if='item.length>0'>
                    <div class="A_Z" v-html="i"></div>
                    <div class="liList" v-for="(items, j) in item">
                        <router-link :to="{ path: '/wodemengyoukehu',query:{partnerStoreNo:items.partnerStoreNo}}">
                            <div class="msgBox">
                                <div class="name" v-html="items.partnerStoreName"></div>
                                <div class="msg">
                                    <span class="type">类型：</span>
                                    <span class="typeName" v-html="items.partnerStoreTypeDesc"></span>
                                    <span class="proName">客户数：</span>
                                    <span class="num" v-html="items.clientCount+'人'"></span>
                                </div>
                                <span class="icon iconfont">&#xe61b;</span>
                            </div>
                        </router-link>
                    </div>
                </li>
            </ul>
            <div class="addBox"><router-link to="/addmengyou"></router-link></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "wodemengyou",
    data() {
        return {
            dataObj: {},
            searchDesc:''
        };
    },
    methods: {
        searchFn: function  () {
            this.getInfoFn();
        },
        getInfoFn: function () {
            let _this =this;
            let a_z = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'];
            let re = /^[A-Za-z\u4e00-\u9fa5]+$/;
            for (let i = 0; i<a_z.length; i++) {
                _this.dataObj[a_z[i]] = [];
            };
            this.$axios.get('partnerStoreList.do',{
                params: {
                search: _this.searchDesc
                }
            }) 
            .then(res=>{
                if (res.data.code == 0) {
                    let resData = res.data.data.paernerStoreList;
                    let _this = this;
                    for (let i = 0; i<resData.length; i++) {
                        let str = resData[i].partnerStoreName.slice(0,1);
                        let r = re.test(str);
                        let name = r?_this.CHToPY(str):'#'; // 获取首字母
                        _this.dataObj[name].push(resData[i]);
                    };
                    _this.dataObj = JSON.parse(JSON.stringify(_this.dataObj));
                }
            }).catch(function(res){
                console.error(res)
            })
        }
    },
    mounted() {
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
            img {
                width: .3rem;
                height: .3rem;
                margin-left: .25rem;
                margin-right: .25rem;
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
            font-size: .3rem;
            margin-right: .25rem;
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
                font-size: .32rem;
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
                        font-size: .34rem;
                    }
                    .msg {
                        color: #666;
                        font-size: .3rem;
                        flex: 1;
                        display: flex;
                        .proName {
                            margin-left: .6rem;
                        }
                        .num {
                            color: #ff6c58;
                        }
                    }
                    .icon {
                        position: absolute;
                        height: 100%;
                        right: 0;
                        top: 0;
                        line-height: 1.28rem;
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
