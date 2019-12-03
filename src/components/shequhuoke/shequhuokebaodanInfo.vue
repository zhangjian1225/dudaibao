<template>
    <div class="container" id="pdfDom">
        <div class="header">
            <div class="back">
                <router-link :to="{ path: '/shequhuokeUserInfo',query:{clientId:clientId, address: address}}" class="iconfont">&#xe611;</router-link>
            </div>
            <div class="title">保单分析</div>
        </div>
        <div class="main">
             <div class="familyBox">
                <div id="myFamilyChart_1"></div>
            </div>
            <div class="familyBox">
                <div id="myFamilyChart"></div>
            </div>
        </div>
        <div class="footer">
            <div class="addBtn" @click="clickFn">保单列表</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "shequhuokebaodanInfo",
    data() {
        return {
            clientId: '',
            clientPolicy:[],
            clientPolicyArr:[], // 成员名字
            clientPolicyArrObj:[],
            familyPolicy:[],
            personArr:[], // 成员名字
            personArrObj:[], // 成员列表对象
            address:''
        };
    },
    methods: {
        drawLine_1(){ // 自己
            let _this = this;
            var dom = document.getElementById("myFamilyChart_1");
            var myChart = this.$echarts.init(dom);
            var app = {};
            var option = null;
            app.title = '环形图';

            option = {
                title: {
                    text: '客户保障',
                    left: 'center',
                    top: '10',
                    fontSize: 15,
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} {d}%"
                },
                legend: {
                   show: true,
                    type: 'plain',
                    itemGap: 10,
                    bottom: '5%',
                    orient: 'horizontal',
                    itemWidth: 8,
                    itemHeight:8,
                    data: _this.clientPolicyArr
                },
                series: [
                    {
                        name:'现在信息',
                        type:'pie',
                        radius: ['40%', '60%'],
                        center: ['50%','47%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                formatter: "{b} {d}% ",
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: 10,
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: _this.clientPolicyArrObj
                    }
                ]
            };
            ;
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        },
        drawLine(){
            let _this = this;
            var dom = document.getElementById("myFamilyChart");
            var myChart = this.$echarts.init(dom);
            var app = {};
            var option = null;
            app.title = '环形图';

            option = {
                title: {
                    text: '家庭保障',
                    left: 'center',
                    top: '10',
                    fontSize: 15,
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} {d}%"
                },
                legend: {
                    show: true,
                    type: 'plain',
                    itemGap: 10,
                    bottom: '5%',
                    orient: 'horizontal',
                    itemWidth: 8,
                    itemHeight:8,
                    data: _this.personArr
                },
                series: [
                    {
                        name:'现在信息',
                        type:'pie',
                        radius: ['40%', '60%'],
                        center: ['50%','45%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                formatter: "{b} {d}% ",
                            },
                            emphasis: {
                                // show: true,
                                // formatter: _this.personArrObj,
                                textStyle: {
                                    fontSize: 10,
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: _this.personArrObj
                    }
                ]
            };
            ;
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        },
        clickFn: function () {
            let _this = this;
            _this.$router.push({
                path: '/baodanList',
                query: {
                    clientId: _this.clientId,
                    address: _this.address
                }
            });
        }
    },
    mounted() {
        this.clientId = this.$route.query.clientId; // 接受参数
        this.address = this.$route.query.address; // 接受参数
        let _this =this;
        this.$axios.get('getClientOwnerPolicy.do',{
            params: {
               clientId: _this.clientId
            }
        }) 
        .then(res=>{
           _this.clientPolicy = res.data.data.clientPolicy;
           for(let i = 0; i<_this.clientPolicy.length; i++) {
               _this.clientPolicyArr.push(_this.clientPolicy[i].productTypeDesc);
               _this.clientPolicyArrObj[i] = {
                   value: _this.clientPolicy[i].sumInsured,
                   name: _this.clientPolicy[i].productTypeDesc
               }
           }
           _this.drawLine_1()
        }).catch(function(res){
            console.error(res)
        })

        this.$axios.get('getFamilyPolicy.do',{
            params: {
               clientId: _this.clientId
            }
        }) 
        .then(res=>{
           _this.familyPolicy = res.data.data.familyPolicy;
            for(let i = 0; i<_this.familyPolicy.length; i++) {
                    _this.personArr.push(_this.familyPolicy[i].insName+"("+_this.familyPolicy[i].relationshipDesc+")");
                    _this.personArrObj[i] = {
                        value: _this.familyPolicy[i].sumInsured,
                        name: _this.familyPolicy[i].insName+"("+_this.familyPolicy[i].relationshipDesc+")"
                    }
            }
           _this.drawLine()
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
        position: relative;
        // padding-bottom: .25rem;
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
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        .familyBox {
            width: 100%;
            height: 5.5rem;
            background:#fff;
            margin-top: .2rem;
            #myFamilyChart_1 {
                width: 100%;
                height: 100%;
                canvas {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    margin: auto;
                }
            }
            #myFamilyChart {
                width: 100%;
                height: 100%;
                canvas {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    margin: auto;
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
        .addBtn {
            width: 100%;
            height: .86rem;
            text-align: center;
            line-height: .86rem;
            font-size: .34rem;
            color: #fff;
            background:  #24c3c5;
            border-radius: .1rem;
        }
    }
</style>
