<template>
    <div class="container">
        <div class="header">
            <div class="back">
                <router-link :to="{ path: '/userInfo',query:{partnerStoreNo:partnerStoreNo,clientId:clientId}}" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">家庭信息</div>
        </div>
        <div class="main">
            <p class="tis" v-if="familyInfoList.length<=0">没有家庭信息</p>
            <ul class="familyList" v-for="(item, index) in familyInfoList">
                <li class="title">
                    <span class="user" v-html="'成员'+(index+1)"></span>
                    <div class="write" @click="updataFamilyFn(index)">编辑</div>
                </li>
                <li class="liList">
                    <span class="liTitle">关系</span>
                    <input class="noUserSelect" type="text" readonly="readonly" :placeholder="item.relationshipDesc?item.relationshipDesc:'未填'"/>
                </li>
                <li class="liList">
                    <span class="liTitle">姓名</span>
                    <input  class="noUserSelect" type="text" readonly="readonly" :placeholder="item.clientName?item.clientName:'未填'"/>
                </li>
                <li class="liList">
                    <span class="liTitle">手机号</span>
                    <input  class="noUserSelect" type="text" readonly="readonly" :placeholder="item.phone?item.phone:'未填'"/>
                </li>
                <li class="liList">
                    <span class="liTitle">邮箱</span>
                    <input  class="noUserSelect" type="text" readonly="readonly" :placeholder="item.email?item.email:'未填'"/>
                </li>
                <li class="liList">
                    <span class="liTitle">证件类型</span>
                    <input  class="noUserSelect" type="text" readonly="readonly" :placeholder="item.idTypeDesc?item.idTypeDesc:'未填'"/>
                </li>
                <li class="liList">
                    <span class="liTitle">证件号码</span>
                    <input  class="noUserSelect" type="text" readonly="readonly" :placeholder="item.idNo?item.idNo:'未填'"/>
                </li>
                <li class="liList">
                    <span class="liTitle">出生日期</span>
                    <input class="noUserSelect" type="text" readonly="readonly" :placeholder="item.birthday?item.birthday:'未填'"/>
                </li>
                <li class="liList">
                    <span class="liTitle">性别</span>
                    <input class="noUserSelect" type="text" readonly="readonly" :placeholder="item.gender?item.gender==1?'男':'女':'未填'"/>
                </li>
                <li class="liList">
                    <span class="liTitle">所在地区</span>
                    <input class="noUserSelect" type="text" readonly="readonly" :placeholder="item.provinceDesc!=''&&item.cityDesc!=''&&item.areaDesc!=''?item.provinceDesc+'-'+item.cityDesc+'-'+item.areaDesc:'未填'"/>
                </li>
                <li class="liList">
                    <span class="liTitle">详细地址</span>
                    <input  class="noUserSelect" type="text" readonly="readonly" :placeholder="item.address?item.address:'未填'"/>
                </li>
                <li class="liList">
                    <span class="liTitle">职业</span>
                    <input  class="noUserSelect" type="text" readonly="readonly" :placeholder="item.occupationCode?item.occupationCode:'未填'"/>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="addBtn" @click="addFamilyFn">添加家庭成员</div>
        </div>
    </div>
   
</template>

<script>
export default {
    name: "familyInfo",
    components: {
        
    },
    data() {
        return {
            partnerStoreNo:'',
            clientId:'',
            relationshipList:[], // 关系数据
            IDTypeList: [], // 证件类型列表
            familyInfoList: [], // 家庭信息
            familyId:''
        };
    },
    methods: {
        /**
         * 获取客户家庭信息
        */
        getFamilyData: function () {
            let _this = this;
            this.$axios.get('getClientFamilyInfo.do',{
                params: {
                    clientId: _this.clientId
                }
            }) 
            .then(res=>{
                _this.familyId = res.data.data.familyId;
                _this.familyInfoList = res.data.data.familyInfo;
                console.log(_this.familyInfoList)
                
            }).catch(function(res){
                console.error(res)
            })
        },
        /*
         * 编辑家庭成员
        */
        updataFamilyFn: function (index) {
            let _this = this;
            _this.$router.push({
                path: '/addFamilyInfo',
                query: {
                    type: 1, // 1修改 2 新增
                    clientId: _this.clientId,
                    partnerStoreNo: _this.partnerStoreNo,
                    addressUrl: 'familyInfo',
                    familyId: _this.familyId,
                    index: index,
                }
            });
        },
        /*
         * 添加家庭成员
        */
        addFamilyFn: function () {
            let _this = this;
            _this.$router.push({
                path: '/addFamilyInfo',
                query: {
                    type: 2, // 1修改 2 新增
                    clientId: _this.clientId,
                    partnerStoreNo: _this.partnerStoreNo,
                    addressUrl: 'familyInfo',
                    familyId: _this.familyId
                }
            });
        }
    },
    mounted() {
        this.partnerStoreNo = this.$route.query.partnerStoreNo; // 接受参数
        this.clientId = this.$route.query.clientId; // 接受参数
        this.getFamilyData();
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
        margin-top: .2rem;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        .tis {
            width: 100%;
            text-align: center;
            color: #999;
            line-height: 1rem;
            font-size: .28rem;
        }
        .familyList {
            width: 100%;
            height: 10.8rem;
            display: flex;
            flex-direction: column;
            margin-top: .2rem;
            background: #fff;
            box-sizing: border-box;
            padding-left: .25rem;
            padding-right: .25rem;
            .title {
                height: 100%;
                height: .8rem;
                color: #24c3c5;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .user {
                    font-size: .35rem;
                    color: #24c3c5;
                }
                .write {
                    font-size: .35rem;
                    color: #24c3c5;
                }
            }
            .liList {
                width: 100%;
                height: .9rem;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #f7f7f7;
                .liTitle {
                    font-size: .34rem;
                }
                input {
                    height: 100%;
                    flex: 1;
                    margin-left: .2rem;
                    border: none;
                    outline: none;
                    text-align: right;
                    font-size: .32rem;
                    color: #777;
                }
            }
            .liList:last-child {
                border-bottom: none;
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
        .addBtn {
            width: 100%;
            height: .85rem;
            text-align: center;
            line-height: .85rem;
            font-size: .34rem;
            color: #24c3c5;
            border: 1px solid #24c3c5;
            border-radius: .1rem;
        }
    }
</style>
