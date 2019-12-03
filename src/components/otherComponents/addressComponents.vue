<template>
    <van-popup v-model="show" position="bottom">
        <van-area title="选择地址" :loading="loading" :area-list="areaList" :value="nowAreaCode"  @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
</template>

<script>
export default {
    name: "addressComponents",
    props:["provinceCode",'cityCode','districtCode','province','city','district', 'isShow'],
    data() {
        return {
            loading: true,
            areaList:{}, // 地区列表
            provinceValue:'', // 省份value
            nowProvinceCode:'',
            nowCityCode: "",
            cityValue: '', // 市value
            areaValue: "",
            nowAreaCode:'',
            show: true, // 是否显示
        };
    },
    watch: {
        show(val) {
            if (!val) {
                let _this = this;
                _this.$emit('areaChange',{
                    provinceValue:_this.provinceValue, // 省份value
                    provinceCode:_this.nowProvinceCode,
                    cityCode: _this.nowCityCode,
                    cityValue: _this.cityValue, // 市value
                    areaValue: _this.areaValue,
                    areaCode:_this.nowAreaCode,
                    show: _this.show // 是否显示
                });
            }
        }
    },
    methods: {
         // 点击确认
        onConfirm: function(value, index) {
            this.provinceValue = value[0].name;
            this.cityValue = value[1].name;
            this.areaValue = value[2].name;
            this.nowProvinceCode = value[0].code;
            this.nowCityCode = value[1].code;
            this.nowAreaCode = value[2].code;
            this.show = false;
        },
        // 点击取消
        onCancel: function (value) {
            this.show = false;
        },
    },
    mounted() {
        this.nowProvinceCode = this.provinceCode;
        this.nowCityCode = this.cityCode;
        this.nowAreaCode = this.districtCode;
        this.provinceValue = this.province;
        this.cityValue = this.city;
        this.areaValue = this.district;
        this.show = this.isShow;
        let _this = this;
        /**
         * 获取省信息
        */ 
        this.$axios.get('getLocation.do',{
            params: {
                noLoadMask: true
            }
        }) 
        .then(res=>{
            let dataInfo = {
                province_list: {},// 省
                city_list: {},// 区
                county_list: {}// 县
            };
            let provinceInfo = res.data.data.location.provinceList;
            let cityInfo = res.data.data.location.cityList;
            let areaInfo = res.data.data.location.areaList;
            for (let item in provinceInfo){
                for (let key in provinceInfo[item]){
                    dataInfo.province_list[key] = provinceInfo[item][key]
                }
            };
            for (let item in cityInfo){
                for (let key in cityInfo[item]){
                    dataInfo.city_list[key] = cityInfo[item][key]
                }
            };
            for (let item in areaInfo){
                for (let key in areaInfo[item]){
                    dataInfo.county_list[key] = areaInfo[item][key]
                }
            };
            _this.areaList = dataInfo;
            _this.loading = false;
        }).catch(function(res){
            console.error(res)
        })
    }
};
</script>
<style lang="scss" scoped>
    
</style>
