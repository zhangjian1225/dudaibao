<template>
    <div class="container">
        <div class="header">
            <div class="back">
                <router-link :to="{ path: '/shequhuokeUserInfo',query:{clientId:clientId, address: addressBack}}" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">客户信息</div>
        </div>
        <div class="main">
            <ul class="ulList">
                <li class="headImgBox">
                    <span class="name">头像</span>
                    <div class="headImg">
                        <img  v-if="headImage" :src="headImage"/>
                        <img src="../../assets/image/header.jpg" v-if="headImage == ''"/>
                    </div>
                </li>
                <li class="userName">
                    <span class="name">姓名</span>
                    <input class="noUserSelect" type="text" readonly="readonly" :placeholder="name?name:'未填'">
                </li>
                <li class="telName">
                    <span class="name">手机号</span>
                    <input class="noUserSelect" type="text" readonly="readonly" :placeholder="phone?phone:'未填'" >
                </li>
                <li class="emailName">
                    <span class="name">邮箱</span>
                    <input class="noUserSelect"  type="text" readonly="readonly" :placeholder="email?email:'未填'">
                </li>
                <li class="cardType">
                    <span class="name">证件类型</span>
                    <input class="noUserSelect"  type="text" readonly="readonly" :placeholder="cardId_name?cardId_name:'未填'"/>
                </li>
                <li class="cardNum">
                    <span class="name">证件号码</span>
                    <input class="noUserSelect"  type="text" readonly="readonly" :placeholder="cardId?cardId:'未填'">
                </li>
                <li class="briData">
                    <span class="name">出生日期</span>
                    <input class="noUserSelect"  type="text" readonly="readonly" :placeholder="birthday?birthday:'未填'">
                </li>
                <li class="sex">
                    <span class="name">性别</span>
                    <input class="noUserSelect"  type="text" readonly="readonly" :placeholder="sex?sex==1?'男':'女':'未填'"/>
                </li>
                <li class="address">
                    <span class="name">所在地区</span>
                    <input class="noUserSelect"  type="text" readonly="readonly" :placeholder="provinceDesc!=''&& cityDesc!=''&&areaDesc!=''?provinceDesc+'-'+cityDesc+'-'+areaDesc:'未填'"/>
                </li>
                <li class="moreAddress">
                    <span class="name">详细地址</span>
                    <input class="noUserSelect"  type="text" readonly="readonly" :placeholder="address?address:'未填'">
                </li>
                <li class="job">
                    <span class="name">职业</span>
                    <input class="noUserSelect"  type="text" readonly="readonly" :placeholder="occupationCode?occupationCode:'未填写'"/>
                </li>
                <li class="userFrom">
                    <span class="name">客户来源</span>
                    <input class="noUserSelect"  type="text" readonly="readonly" :placeholder="userFromName?userFromName:'未填'"/>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="write" @click="write">编辑</div>
        </div>
    </div>
   
</template>

<script>
export default {
    name: "initInfo",
    components: {
        
    },
    data() {
        return {
            clientId:'',
            userInfoData: {},
            cardTypeList:[], // 证件类型列表
            cardId_name:'', // 证件名字
            url:'',
            headImage:'',
            name:'',
            phone:'',
            email:'',
            cardType:'',
            cardId:'',
            birthday:'',
            sex:'',
            provinceCode: '',
            provinceDesc:'',   
            cityCode:'',
            cityDesc:'',
            areaCode: "",
            areaDesc: "",
            address:'',
            occupationCode:'', // 职业
            sourceType: '',// 客户来源id
            userFromList:[], // 客户来源列表
            userFromName:'',
            addressBack:''
        };
    },
    methods: {
        /**
         * 获取用户信息
        */
        getUserInfoFn: function () {
            let _this = this;
            this.$axios.get('getClientInfo.do',{
                params: {
                    clientId: _this.clientId
                }
            }) 
            .then(res=>{
                let data = res.data.data.clientInfo;
                _this.occupationCode = data.occupationCode;
                if (data.headImage) {
                    _this.headImage = _this.url+data.headImage;
                }
                _this.name = data.clientName;
                _this.phone = data.phone;
                _this.email = data.email;
                _this.cardType = data.idType;
                _this.cardId = data.idNo;
                _this.birthday = data.birthday;
                _this.sex = data.gender;
                _this.provinceCode = data.provinceCode;
                _this.provinceDesc = data.provinceDesc;   
                _this.cityCode = data.cityCode;
                _this.cityDesc = data.cityDesc;
                _this.areaCode = data.areaCode;
                _this.areaDesc = data.areaDesc;
                _this.address = data.address;
                _this.sourceType = data.sourceType;
                _this.userFromName = data.sourceDesc;
                _this.cardId_name = data.idTypeDesc;
            }).catch(function(res){
                console.error(res)
            })
        },
        /*
        * 编辑
        */
        write: function () {
            let _this = this;
            this.$router.push({
                path: '/shequhuokeAddInitInfo',
                query: {
                    type: 1, // 1修改 2 新增
                    clientId: _this.clientId,
                    addressUrl: 'shequhuokeInitInfo',
                    address:_this.addressBack
                }
            })
       }
    },
    mounted() {
        this.clientId = this.$route.query.clientId; // 接受参数
        this.addressBack = this.$route.query.address; // 接受参数
        this.getUserInfoFn();
        
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
    }
    .main {
        width: 100%;
        flex:1;
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
            input {
                color: #777;
            }
            .noUserSelect {
                -webkit-user-select :none;
            }
            .headImgBox {
                width: 100%;
                height: 1rem;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                .name {
                    height: 100%;
                    display: block;
                    line-height: 1rem;
                    font-size: .34rem;
                }
                .headImg {
                    height: 100%;
                    flex: 1;
                    height: .8rem;
                    margin-top: .1rem;
                    img {
                        height: 100%;
                        width: .8rem;
                        border-radius: .4rem;
                        float: right;
                    }
                }
                .icon {
                    height: 100%;
                    float: right;
                    height: 100%;
                    margin-left: .1rem;
                    line-height: 1rem;
                }
            } 
            .userName {
                width: 100%;
                height: .85rem;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                .name {
                    height: 100%;
                    display: block;
                    line-height: .85rem;
                    font-size: .34rem;
                }
                input {
                    height: 100%;
                    flex: 1;
                    outline: none;
                    border: none;
                    margin-left: .5rem;
                    text-align: right;
                    font-size: .34rem;
                }
            }
            .telName {
                width: 100%;
                height: .85rem;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                .name {
                    height: 100%;
                    display: block;
                    line-height: .85rem;
                    font-size: .34rem;
                }
                input {
                    height: 100%;
                    flex: 1;
                    outline: none;
                    border: none;
                    margin-left: .5rem;
                    text-align: right;
                    font-size: .34rem;
                }
            }
            .emailName {
                width: 100%;
                height: .85rem;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                .name {
                    height: 100%;
                    display: block;
                    line-height: .85rem;
                    font-size: .34rem;
                }
                input {
                    height: 100%;
                    flex: 1;
                    outline: none;
                    border: none;
                    margin-left: .5rem;
                    text-align: right;
                    font-size: .34rem;
                }
            }
            .cardType {
                width: 100%;
                height: auto;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                position: relative;
                .name {
                    height: .85rem;
                    display: block;
                    line-height: .85rem;
                    font-size: .34rem;
                }
                input {
                    height: .85rem;
                    flex: 1;
                    border: none;
                    outline: none;
                    margin-left: .5rem;
                    text-align: right;
                    font-size: .34rem;
                    color: #666;
                }
                .icon {
                    display: block;
                    height: .85rem;
                    line-height: .85rem;
                    margin-left: .2rem;
                    font-size: .24rem;
                    color: #999;
                }
            }
            .cardNum { 
                width: 100%;
                height: .85rem;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                .name {
                    height: 100%;
                    display: block;
                    line-height: .85rem;
                    font-size: .34rem;
                }
                input {
                    height: 100%;
                    flex: 1;
                    outline: none;
                    border: none;
                    margin-left: .5rem;
                    text-align: right;
                    font-size: .34rem;
                }
            }
            .briData { 
                width: 100%;
                height: .85rem;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                .name {
                    height: 100%;
                    display: block;
                    line-height: .85rem;
                    font-size: .34rem;
                }
                input {
                    height: 100%;
                    flex: 1;
                    outline: none;
                    border: none;
                    margin-left: .5rem;
                    text-align: right;
                    font-size: .34rem;
                }
            }
            .sex {
                width: 100%;
                height: auto;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                position: relative;
                .name {
                    height: .85rem;
                    display: block;
                    line-height: .85rem;
                    font-size: .34rem;
                }
                input {
                    height: .85rem;
                    flex: 1;
                    border: none;
                    outline: none;
                    margin-left: .5rem;
                    text-align: right;
                    font-size: .34rem;
                    color: #666;
                }
                .icon {
                    display: block;
                    height: .85rem;
                    line-height: .85rem;
                    margin-left: .2rem;
                    font-size: .24rem;
                    color: #999;
                }
            }
            .address {
                width: 100%;
                height: auto;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                position: relative;
                .name {
                    height: .85rem;
                    display: block;
                    line-height: .85rem;
                    font-size: .34rem;
                }
                input {
                    height: .85rem;
                    flex: 1;
                    border: none;
                    outline: none;
                    margin-left: .5rem;
                    text-align: right;
                    font-size: .34rem;
                    color: #666;
                }
                .icon {
                    display: block;
                    height: .85rem;
                    line-height: .85rem;
                    margin-left: .2rem;
                    font-size: .24rem;
                    color: #999;
                }
            }
            .moreAddress { 
                width: 100%;
                height: .85rem;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                .name {
                    height: 100%;
                    display: block;
                    line-height: .85rem;
                    font-size: .34rem;
                }
                input {
                    height: 100%;
                    flex: 1;
                    outline: none;
                    border: none;
                    margin-left: .5rem;
                    text-align: right;
                    font-size: .34rem;
                }
            }
            .job {
                width: 100%;
                height: auto;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                position: relative;
                .name {
                    height: .85rem;
                    display: block;
                    line-height: .85rem;
                    font-size: .34rem;
                }
                input {
                    height: .85rem;
                    flex: 1;
                    border: none;
                    outline: none;
                    margin-left: .5rem;
                    text-align: right;
                    font-size: .34rem;
                    color: #666;
                }
                .icon {
                    display: block;
                    height: .85rem;
                    line-height: .85rem;
                    margin-left: .2rem;
                    font-size: .24rem;
                    color: #999;
                }
            }
            .userFrom {
                width: 100%;
                height: auto;
                border-bottom: 1px solid #f7f7f7;
                display: flex;
                position: relative;
                .name {
                    height: .85rem;
                    display: block;
                    line-height: .85rem;
                    font-size: .34rem;
                }
                input {
                    height: .85rem;
                    flex: 1;
                    border: none;
                    outline: none;
                    margin-left: .5rem;
                    text-align: right;
                    font-size: .34rem;
                    color: #666;
                }
                .icon {
                    display: block;
                    height: .85rem;
                    line-height: .85rem;
                    margin-left: .2rem;
                    font-size: .24rem;
                    color: #999;
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
        .write {
            width: 100%;
            height: .85rem;
            text-align: center;
            line-height: .85rem;
            font-size: .34rem;
            color: #fff;
            background: #24c3c5;
            border-radius: .1rem;
        }
    }
</style>
