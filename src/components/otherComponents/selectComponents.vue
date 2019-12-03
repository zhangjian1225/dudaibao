<template>
    <van-popup v-model="show" position="bottom">
        <van-picker v-if="type!=4 && type!=10" show-toolbar :title= "title" :loading="loading" :defaultIndex="index" :columns="infoData" @cancel="onCancel" @confirm="onConfirm"/>
        <van-datetime-picker v-if="type==4" :title= "title" type="date" v-model="nowDate" :min-date="mindate" :max-date="maxdate" @cancel="onCancel" @confirm="onConfirm"/>
        <van-datetime-picker v-if="type==10" v-model="time" type="time" :min-hour="minHour" :max-hour="maxHour" @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
</template>

<script>
export default {
    name: "selectComponents",
    props:['type','passDescCode', 'passDesc', 'title', 'isShow','hasMyself','isMinDesc'], // 类型 对应的编码 内容  提示
    data() {
        return {
            nowDate: new Date(),
            mindate:new Date(),
            maxdate: new Date(),
            time:'12:00',
            minHour:0,
            maxHour: 23,
            loading: true,
            infoData:[], // 数据
            desc:'', // 展示的内容
            code:'', // 对应的编号
            show: true, // 是否显示
            index:0 // 选项对应的index
        };
    },
    watch: {
        show(val) {
            if (!val) {
                let _this = this;
                switch (_this.type) {
                    case '1' : 
                        _this.$emit('storeChange',{
                            desc: _this.desc, // 展示的内容
                            code: _this.code, // 对应的编号
                            show: _this.show // 是否显示    
                        }); break;
                    case '2' : 
                        _this.$emit('cardChange',{
                            desc: _this.desc, // 展示的内容
                            code: _this.code, // 对应的编号
                            show: _this.show // 是否显示    
                        }); break;
                    case '3' : 
                        _this.$emit('sexChange',{
                            desc: _this.desc, // 展示的内容
                            code: _this.code, // 对应的编号
                            show: _this.show // 是否显示    
                        }); break;
                    case '4' : 
                        _this.$emit('dateChange',{
                            desc: _this.desc, // 展示的内容
                            code: _this.code, // 对应的编号
                            show: _this.show // 是否显示    
                        }); break;
                    case '5' : 
                        _this.$emit('relationshipChange',{
                            desc: _this.desc, // 展示的内容
                            code: _this.code, // 对应的编号
                            show: _this.show // 是否显示    
                        }); break;
                    case '6' : 
                        _this.$emit('carTypeChange',{
                            desc: _this.desc, // 展示的内容
                            code: _this.code, // 对应的编号
                            show: _this.show // 是否显示    
                        }); break;
                    case '7' : 
                        _this.$emit('isTrueChange',{
                            desc: _this.desc, // 展示的内容
                            code: _this.code, // 对应的编号
                            show: _this.show // 是否显示    
                        }); break;
                    case '8' : 
                        _this.$emit('sortChange',{
                            desc: _this.desc, // 展示的内容
                            code: _this.code, // 对应的编号
                            show: _this.show // 是否显示    
                        }); break;
                    case '9' : 
                        _this.$emit('baoxianTypeChange',{
                            desc: _this.desc, // 展示的内容
                            code: _this.code, // 对应的编号
                            show: _this.show // 是否显示    
                        }); break;
                    case '10' : 
                        _this.$emit('timeChange',{
                            desc: _this.desc, // 展示的内容
                            code: _this.code, // 对应的编号
                            show: _this.show // 是否显示    
                        }); break;
                    case '11' : 
                        _this.$emit('sourceChange',{
                            desc: _this.desc, // 展示的内容
                            code: _this.code, // 对应的编号
                            show: _this.show // 是否显示    
                        }); break;
                    case '12' : 
                        _this.$emit('carCompanyChange',{
                            desc: _this.desc, // 展示的内容
                            code: _this.code, // 对应的编号
                            show: _this.show // 是否显示    
                        }); break;
                }
            }
        }
    },
    methods: {
        // 点击确认
        onConfirm: function(value, index) {
            if (this.type !='4' && this.type !='10') {
                this.desc = value.text;
                this.code = value.keyId;
            } else if (this.type =='4'){
                this.desc = this.timeFormat(value);
                this.code = this.timeFormat(value);
            } else {
                this.desc = value;
                this.code = value;
            }
            this.show = false;
        },
        // 点击取消
        onCancel: function (value) {
            this.show = false;
        },
        // 获取店铺类型数据
        getStoreData: function () {
            let _this = this;
            this.$axios.get('getStoreType.do',{
                params: {
                    noLoadMask: true
                }
            }) 
            .then(res=>{
                for (let i=0; i<res.data.data.storeType.length; i++) {
                    _this.infoData.push({
                        keyId: res.data.data.storeType[i].code,
                        text: res.data.data.storeType[i].desc
                    });
                };
                _this.loading = false;
                for (let i = 0; i<_this.infoData.length; i++) {
                    if (_this.infoData[i].keyId == _this.code) {
                        _this.index = i;
                        return;
                    }
                };
            }).catch(function(res){
                console.error(res)
            })
        },
        // 获取证件类型数据
        getCardData: function () {
            let _this = this;
            this.$axios.get('getIdType.do',{
                params: {
                    noLoadMask: true
                }
            }) 
            .then(res=>{
                for (let i=0; i<res.data.data.IDType.length; i++) {
                    _this.infoData.push({
                        keyId: res.data.data.IDType[i].idType,
                        text: res.data.data.IDType[i].idTypeDesc
                    });
                };
                _this.loading = false;
                for (let i = 0; i<_this.infoData.length; i++) {
                    if (_this.infoData[i].keyId == _this.code) {
                        _this.index = i;
                        return;
                    }
                };
            }).catch(function(res){
                console.error(res)
            })
        },
        // 选择性别
        getSex: function () {
            let _this = this;
            this.infoData.push({
                keyId: 1,
                text: '男'
            });
            this.infoData.push({
                keyId: 2,
                text: '女'
            });
            _this.loading = false;
            for (let i = 0; i<_this.infoData.length; i++) {
                if (_this.infoData[i].keyId == _this.code) {
                    _this.index = i;
                    return;
                }
            };
        },
        // 选择日期
        getDate: function () {
            let _this = this;
            let date = new Date();
            if (this.isMinDesc == 'true') {
                date.setFullYear(date.getFullYear());
            } else {
                date.setFullYear(date.getFullYear());
            }
            let date1 = new Date();
            date1.setFullYear(date1.getFullYear()+100);
            _this.mindate = date;
            _this.maxdate =  date1;
            if(_this.code) {
                _this.nowDate = new Date(_this.code); 
            } else {
                let date = new Date();
                let y = date.getFullYear();
                let m = date.getMonth()+1<10? '0'+(date.getMonth()+1):date.getMonth()+1;
                let d = date.getDate()<10?'0'+date.getDate():date.getDate();
                let str = y+'-'+m+'-'+d;
                _this.nowDate = new Date(str); 
            }
        },
        timeFormat(time) { // 时间格式化 2019-09-08
            let year = time.getFullYear();
            let month = time.getMonth()+1<10? '0'+(time.getMonth()+1):time.getMonth()+1;
            let day = time.getDate()<10?'0'+time.getDate():time.getDate();
            return year + '-' + month + '-' + day
        },
        // 选择关系
        getRelationshipData: function () {
            let _this =this; 
            this.$axios.get('getRelationship.do',{
                params: {
                    noLoadMask: true
                }
            }) 
            .then(res=>{
                for (let i=0; i<res.data.data.relationship.length; i++) {
                    if (this.hasMyself == '0') {
                        if (res.data.data.relationship[i].relationshipCode == '01') {
                            _this.infoData.push({
                                keyId: res.data.data.relationship[i].relationshipCode,
                                text: res.data.data.relationship[i].relationshipDesc,
                                disabled: true
                            });
                        } else {
                            _this.infoData.push({
                                keyId: res.data.data.relationship[i].relationshipCode,
                                text: res.data.data.relationship[i].relationshipDesc
                            });
                        }
                    } else {
                        _this.infoData.push({
                            keyId: res.data.data.relationship[i].relationshipCode,
                            text: res.data.data.relationship[i].relationshipDesc
                        });
                    }
                };
                _this.loading = false;
                for (let i = 0; i<_this.infoData.length; i++) {
                    if (_this.infoData[i].keyId == _this.code) {
                        _this.index = i;
                        return;
                    }
                };
            }).catch(function(res){
                console.error(res)
            })
        },
        // 车辆类型
        getcarTypeData: function () {
            let _this =this; 
            this.$axios.get('getCarType.do',{
                params: {
                    noLoadMask: true
                }
            }) 
            .then(res=>{
                for (let i=0; i<res.data.data.carType.length; i++) {
                    _this.infoData.push({
                        keyId: res.data.data.carType[i].carTypeCode,
                        text: res.data.data.carType[i].carTypeDesc
                    });
                };
                _this.loading = false;
                for (let i = 0; i<_this.infoData.length; i++) {
                    if (_this.infoData[i].keyId == _this.code) {
                        _this.index = i;
                        return;
                    }
                };
            }).catch(function(res){
                console.error(res)
            })
        },
        // 是否
        isTrue: function () {
            let _this = this;
            this.infoData.push({
                keyId: 'Y',
                text: '是'
            });
            this.infoData.push({
                keyId: 'N',
                text: '否'
            });
            _this.loading = false;
            for (let i = 0; i<_this.infoData.length; i++) {
                if (_this.infoData[i].keyId == _this.code) {
                    _this.index = i;
                    return;
                }
            };
        },
        // 排序
        sortData: function () {
            let _this = this; 
            this.infoData = [
                {
                    keyId: '01',
                    text: '默认排序'
                },
                {
                    keyId: '02',
                    text: '销量排序'
                },
                {
                    keyId: '03',
                    text: '价格由高到低'
                },
                {
                    keyId: '04',
                    text: '价格由低到高'
                },
                {
                    keyId: '05',
                    text: '最新上架'
                }
            ]
            _this.loading = false;
            for (let i = 0; i<_this.infoData.length; i++) {
                if (_this.infoData[i].keyId == _this.code) {
                    _this.index = i;
                    return;
                }
            };
        },
        // 保险类别
        baoxianTypeData: function () {
            let _this =this; 
            this.$axios.get('getProductType.do',{
                params: {
                    noLoadMask: true
                }
            }) 
            .then(res=>{
                for (let i=0; i<res.data.data.productType.length; i++) {
                    _this.infoData.push({
                        keyId: res.data.data.productType[i].producttype,
                        text: res.data.data.productType[i].productTypeDesc
                    });
                };
                _this.loading = false;
                for (let i = 0; i<_this.infoData.length; i++) {
                    if (_this.infoData[i].keyId == _this.code) {
                        _this.index = i;
                        return;
                    }
                };
            }).catch(function(res){
                console.error(res)
            })
        },
        // 时间
        timeData: function () {
            let _this = this;
            _this.time = _this.code;
        },
        // 客户来源
        sourceData: function () {
            let _this = this;
            this.$axios.get('getSourceType.do',{
                params: {
                    noLoadMask: true
                }
            }) 
            .then(res=>{
                for (let i=0; i<res.data.data.sourceType.length; i++) {
                    _this.infoData.push({
                        keyId: res.data.data.sourceType[i].sourceType,
                        text: res.data.data.sourceType[i].sourceDesc
                    });
                };
                _this.loading = false;
                for (let i = 0; i<_this.infoData.length; i++) {
                    if (_this.infoData[i].keyId == _this.code) {
                        _this.index = i;
                        return;
                    }
                };
                _this.loading = false;
            }).catch(function(res){
                console.error(res)
            })
        },
        // 车品牌
        getCarMakeCompanyData: function () {
            let _this = this;
            this.$axios.get('getBrandInfo.do',{
                params: {
                    noLoadMask: true
                }
            }) 
            .then(res=>{
                for (let i=0; i<res.data.data.brand.length; i++) {
                    _this.infoData.push({
                        keyId: res.data.data.brand[i].brandCode,
                        text: res.data.data.brand[i].brandDesc
                    });
                };
                _this.loading = false;
                for (let i = 0; i<_this.infoData.length; i++) {
                    if (_this.infoData[i].keyId == _this.code) {
                        _this.index = i;
                        return;
                    }
                };
                _this.loading = false;
            }).catch(function(res){
                console.error(res)
            })
        }
    },
    mounted() {
        let _this = this;
        this.show = this.isShow;
        this.code = this.passDescCode;
        this.desc = this.passDesc;
        switch (_this.type) {
            case '1' : _this.getStoreData(); break; // 商铺类型
            case '2' : _this.getCardData(); break; // 证件类型
            case '3' : _this.getSex(); break; //  性别
            case '4' : _this.getDate(); break; //  日期
            case '5' : _this.getRelationshipData(); break; // 关系类型
            case '6' : _this.getcarTypeData(); break; // 车类型
            case '7' : _this.isTrue(); break; //  是否
            case '8' : _this.sortData(); break; // 排序方式
            case '9' : _this.baoxianTypeData(); break;// 保险种类
            case '10' : _this.timeData(); break; // 时间
            case '11' : _this.sourceData(); break; // 客户来源
            case '12' : _this.getCarMakeCompanyData(); break; // 车品牌
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
