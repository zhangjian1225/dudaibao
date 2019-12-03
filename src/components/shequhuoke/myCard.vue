<template>
    <div class="container">
        <div class="header">
            <div class="back" v-if="showBtn">
                <a class="iconfont" @click="backFn">&#xe611;</a>
            </div>
            <div class="title" v-html="titleHtml"></div>
        </div>
        <div class="main">
            <div class="bgImg">
                <div class="infoBox">
                    <div class="infoBgBox">
                        <div class="imgBox">
                            <img v-if="headImg" :src="headImg"/>
                            <img  v-else src="../../assets/image/header.jpg"/>       
                        </div>
                        <div class="textBox">
                            <p class="user">
                                <span class="name" v-html='employe.empName'></span>
                                <span class="job" v-html="employe.agentGradeDesc"></span>
                            </p>
                            <p class="tel" v-html="employe.phone"></p>
                        </div>
                        <div class="codeBox"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer" v-if="showBtn">
            <div class="share" @click="shareFn">分享</div>
        </div>
        <div class="shareMask" v-if="shareMask" @click="closeMask"></div>
    </div>
   
</template>

<script>
export default {
    name: "myCard",
    components: {
        
    },
    data() {
        return {
            titleHtml:'我的名片',
            employe: {},
            headImg:'',
            empNo:'',
            showBtn: false,
            shareMask: false
        };
    },
    methods: {
        closeMask: function () {
            this.shareMask = false;
        },
        backFn: function () {
            this.$router.go(-1);
        },
        shareFn: function () {
            let _this = this;
            let link = window.location.href.split('/#')[0]+'?shareId=myCard&empNo='+this.empNo;
            this.wxInfo({
                title: '我的名片',
                desc: '我的名片',
                link: link
            });
            this.shareMask = true;
        }
    },
    mounted() {
        if (location.href.includes('shareId')) {
            this.empNo = this.$route.query.empNo;
            this.titleHtml = '名片';
            this.showBtn = false;
            let _this =this;
            this.$axios.get('getEmployeCard.do',{
                params: {
                    empNo: _this.empNo
                }
            }) 
            .then(res=>{
                _this.employe = res.data.data.employe;
                _this.headImg = _this.employe.headImage;
            }).catch(function(res){
                console.error(res)
            }) 
        } else {
            this.showBtn = true;
            let _this =this;
            this.$axios.get('getEmployeMainInfo.do',{
                params: {}
            }) 
            .then(res=>{
                _this.empNo = res.data.data.employe.empNo;
                _this.employe = res.data.data.employe;
                _this.headImg = _this.employe.headImage;
            }).catch(function(res){
                console.error(res)
            })
        }
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
    .write {
        height: 100%;
        width: auto;
        margin-right: .2rem;
        line-height: 0.8rem;
        font-size: 0.3rem;
        color: #666;
    }
}
.main {
    width: 100%;
    flex: 1;
    // background: red;
    // position: relative;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling : touch;
    .bgImg {
        width: 100%;
        height: 10.36rem;
        background: url(./images/3.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
        .infoBox {
            position: absolute;
            left: 0;
            bottom: 2rem;
            width: 100%;
            height: 1.7rem;
            box-sizing: border-box;
            padding: 0 .3rem 0 .3rem;
            .infoBgBox {
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, .5);
                display: flex;
                align-items: center;
                .imgBox {
                    height: 1.3rem;
                    width: 1.3rem;
                    border-radius: .65rem;
                    overflow: hidden;
                    margin-left: .4rem;
                    img {
                        height: 1.3rem;
                        width: 1.3rem;
                        border-radius: .65rem;
                    }
                }
                .textBox {
                    height: 100%;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-left: .3rem;
                    .user {
                        display: flex;
                        align-items: flex-end;
                        .name {
                            font-size: .42rem;
                            color: #fff;
                        }
                        .job {
                            font-size: .32rem;
                            color: #fff;
                            margin-left: .2rem;
                        }
                    }
                    .tel {
                        font-size: .34rem;
                        color: #fff;
                        margin-top: .1rem;
                    }
                }
            }
        }
    }
}
.footer {
    width: 100%;
    height: 1.4rem;
    box-sizing: border-box;
    padding-right: .25rem;
    padding-left: .25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .share {
        width: 100%;
        height: .85rem;
        text-align: center;
        line-height: .85rem;
        font-size: .34rem;
        background: #24c3c5;
        // border: 1px solid #24c3c5;
        border-radius: .1rem;
        color: #fff;
    }
}
 .shareMask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(../../assets/image/share.png) no-repeat;
    background-size: 100% 100%;
    left: 0;
    top: 0;
    z-index: 999;
  }
</style>
