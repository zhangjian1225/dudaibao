<template>
    <div class="container" id="pdfDom">
        <div class="header">
            <div class="back">
                <!-- <router-link :to="{path:'/'+addressBack, query:{partnerStoreNo:partnerStoreNo}}" class="iconfont">&#xe611;</router-link> -->
                <a class="iconfont" @click="backFn">&#xe611;</a>
            </div>
            <div class="title">盟友专属二维码</div>
        </div>
        <div class="main">
            <div class="qrcode">
                <vue-qr :logoSrc="logo" :text="value" :dot-scale="1" :size="250" :margin="0" :auto-color="true" :logoMargin="2" id="qrcode"></vue-qr>
            </div>
        </div>
    </div>
</template>

<script>
import vueQr from 'vue-qr' // 生成二维码插件
export default {
    name: "",
    data() {
        return {
            addressBack:'',
            partnerStoreNo:'',
            logo: require('./images/7.jpg'),
            value: '',
            empNo:''

        };
    },
    components: {
        vueQr
    },
    methods: {
        savePic () {
            const iconUrl = document.querySelector('.qrcode img').src;
            let a = document.createElement('a')
            a.download = name || 'pic'
            // 设置图片地址
            a.href = iconUrl;
            a.click();
        },
        backFn: function () {
            this.$router.go(-1)
        }
    },
    mounted() {
        this.partnerStoreNo = this.$route.query.partnerStoreNo;
        this.addressBack = this.$route.query.addressBack;
        this.empNo = this.$route.query.empNo;
        let _this =this;
        if (this.addressBack == 'shequyunying') {
            _this.value = window.location.href.split('#')[0]+'#/addmengyou?empNo='+this.emp;
        } else {
            this.$axios.get('partnerStoreQRcode.do',{
                params: {
                    partnerStoreNo: _this.partnerStoreNo
                }
            }) 
            .then(res=>{
                console.log( res.data.data.QRcode)
                _this.value = res.data.data.QRcode;
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
        flex: 1;
        box-sizing: border-box;
        padding-left: .3rem;
        padding-right: .3rem;
        .qrcode {
            width: 100%;
            height: 7.9rem;
            position: relative;
            img {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                margin: auto;
            }
        }
        .submitBtn {
            height: .85rem;
            display: block;
            background: #24c3c5;
            width: 6.9rem;
            margin: auto;
            color: #fff;
            text-align: center;
            line-height: .85rem;
            font-size: .35rem;
            border-radius: .1rem;
        }
    }
</style>
