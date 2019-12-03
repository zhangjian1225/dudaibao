<template>
    <div class="container">
        <div class="main">
            <div class="title">
                <span class="text">倍健康（2019）倍健康（2019）倍健康（2019）</span>
                <span class="close" @click="closeTem">
                    <van-icon name="cross" />
                </span>
            </div>
            <ul class="list">
                <li class="listEver">
                    <div class="text">倍健康（2019）</div>
                    <van-checkbox v-model="checked_1" checked-color="#24c3c5"></van-checkbox>
                </li>
                <li class="listEver">
                    <div class="text">保险期间</div>
                    <van-dropdown-menu active-color="#24c3c5">
                        <van-dropdown-item v-model="value_1" :options="option_1" />
                    </van-dropdown-menu>
                </li>
                <li class="listEver">
                    <div class="text">交费期间</div>
                    <van-dropdown-menu active-color="#24c3c5">
                        <van-dropdown-item v-model="value_2" :options="option_2" />
                    </van-dropdown-menu>
                </li>
                <li class="listEver">
                    <div class="text">投保方案</div>
                    <van-radio-group v-model="radio_1">
                        <van-radio name="1" checked-color="#24c3c5">基本</van-radio>
                        <van-radio name="2" checked-color="#24c3c5">基本+可选</van-radio>
                    </van-radio-group>
                </li>
                <li class="listEver">
                    <div class="text">附加保险期间</div>
                    <van-checkbox v-model="checked_2" checked-color="#24c3c5">不附加</van-checkbox>
                </li>
                <li class="listEver">
                    <div class="text">保额</div>
                    <div class="ipt">
                        <input type="number" v-model="iptVal" placeholder="请输入保额"/>
                    </div>
                    <div class="icon" v-if="showIcon" @click="clearVal">
                        <van-icon name="clear" color="#999"/>
                    </div>
                </li>
            </ul>
            <div class="saveBtn">确定</div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    name: "updataPlan",
    props:['status'], // 类型 对应的编码 内容  提示
    data() {
        return {
            checked_1: true,
            checked_2: true,
            value_1: 0,
            option_1: [
                { text: '终身', value: 0 },
                { text: '20', value: 1 }
            ],
            value_2: 0,
            option_2: [
                { text: '30年', value: 0 },
                { text: '一次', value: 1 }
            ],
            radio_1: '1',
            iptVal: '',
            showIcon: false,
            showTem: true
        };
    },
    watch: {
        iptVal (val) {
            if (val == '') {
                this.showIcon = false
            } else {
                this.showIcon = true
            }
        },
        showTem (val) {
            let _this = this;
            _this.$emit('updataPageStatusFn',{
                status:  _this.showTem 
            });
        }
    },
    methods: {
        clearVal: function () {
            this.iptVal = '';
        },
        closeTem: function () {
            this.showTem = false;
        }
    },
    mounted() {
        
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
        background: rgba(0, 0, 0, .5);
        position: relative;
    }
    .main {
        width: 100%;
        height: 9.2rem;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #fff;
        display: flex;
        flex-direction: column;
        .title {
            width: 100%;
            height: .9rem;
            display: flex;
            .text {
                display: block;
                height: 100%;
                flex: 1;
                text-align: center;
                line-height: .9rem;
                font-size: .34rem;
                font-weight: bold;
                margin-left: .5rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .close {
                width: .5rem;
                height: .9rem;
                text-align: center;
                line-height: .9rem;
                font-size: .4rem;
                margin-right: .1rem;
            }
        }
        .list {
            width: 100%;
            flex: 1;
            overflow: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling : touch;
            box-sizing: border-box;
            padding: 0 .3rem 0 .3rem;
            li {
                width: 100%;
                height: .9rem;
                font-size: .34rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #f7f7f7;
                .van-dropdown-menu {
                    height: 100%;
                }
                .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
                    border: none!important;
                }
                .van-radio-group {
                    flex: 1;
                    display: flex;
                    justify-content: flex-end;
                    .van-radio {
                        margin-left: .3rem;
                    }
                }
                .ipt {
                    height: 100%;
                    flex: 1;
                    margin-left: .5rem;
                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        outline: none;
                        text-align: right;
                        font-size: .3rem;
                    }
                }
                .icon {
                    margin-left: .3rem;
                }
            }
            li:last-child {
                border-bottom: none;
            }
        }
        .saveBtn {
            height: .85rem;
            background: #24c3c5;
            width: 6.88rem;
            margin: auto;
            color: #fff;
            text-align: center;
            line-height: .85rem;
            font-size: .3rem;
            border-radius: .1rem;
            margin-bottom: .3rem;
        }
    }
</style>
