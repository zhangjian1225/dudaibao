<template>
    <div class="container">
        <div class="header">
            <div class="back">
                <router-link to="/login" class="icon iconfont">&#xe611;</router-link>
            </div>
            <div class="title">注册</div>
        </div>
        <div class="main">
            <div class="userNameBox">
                <input type="number" class="userName" placeholder="请输入手机号码" v-model="userName" oninput="if(value.length>11) value=value.slice(0,11)"/>
            </div>
            <div class="passwordBox">
                <input type="password" class="password" placeholder="请输入密码" v-model="password"/>
            </div>
            <div class="rePasswordBox">
                <input type="password" class="rePassword" placeholder="请重复密码" v-model="password"/>
            </div>
            <div class="testCodeBox">
                <input type="text" class="testCode" placeholder="请输入验证码" v-model="password"/>
                <span class="getTestCode">获取验证码</span>
            </div>
            <div class="loginBtn" @click="loginFn">注册</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            userName: '',
            password: ''
        };
    },
    methods: {
        loginFn: function () {
            if (this.userName=='' || this.password =='') {
                // Message.error({
                //     message: '手机号码或密码未填写'
                // })
            } else {
                this.$axios.get('judgeLogin.do') // 请求微信分享的数据
                    .then(res=>{
                        console.log(res)//返回请求的结果
                    })
            }
        }
    },
    mounted() {
    
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
        background: #fff;
        box-sizing: border-box;
        padding-bottom: .25rem;
    }
    .header {
        position: relative;
        height: 0.8rem;
        width: 100%;
        background: #fff;
        // display: flex;
        // align-items: center;
        border-bottom: 1px solid #f7f7f7;
        .back {
            position: absolute;
            height: 100%;
            width: auto;
            line-height: 0.8rem;
            left: 0.05rem;
            font-size: 0.3rem;
            z-index: 1;
            margin-left: 0.1rem;
            a {
            list-style: none;
            color: #000;
            text-decoration: none;
            font-size: .3rem;
            font-weight: bold;
            }
        }
        .title {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 0.8rem;
            font-size: 0.34rem;
            margin-right: .3rem;
        }
    }
    .main {
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        padding-left: .3rem;
        padding-right: .3rem;
        display: flex;
        flex-direction: column;
        position: relative;
        .userNameBox {
            width: 100%;
            height: 1rem;
            border-bottom: 1px solid #f7f7f7;
            display: flex;
            margin-top: .7rem;
            align-items: center;
            .userName {
                height: .6rem;
                width: 100%;
                border: none;
                outline: none;
                font-size: .32rem;
            }
        }
        .passwordBox {
            width: 100%;
            height: 1rem;
            border-bottom: 1px solid #f7f7f7;
            display: flex;
            align-items: center;
            .password {
                height: .6rem;
                width: 100%;
                border: none;
                outline: none;
                font-size: .32rem;
            }
        }
        .rePasswordBox {
            width: 100%;
            height: 1rem;
            border-bottom: 1px solid #f7f7f7;
            display: flex;
            align-items: center;
            .rePassword {
                height: .6rem;
                width: 100%;
                border: none;
                outline: none;
                font-size: .32rem;
            }
        }
        .testCodeBox {
            width: 100%;
            height: 1rem;
            border-bottom: 1px solid #f7f7f7;
            display: flex;
            align-items: center;
            .testCode {
                height: .6rem;
                width: 100%;
                border: none;
                outline: none;
                font-size: .32rem;
            }
            .getTestCode {
                display: block;
                width: 2.4rem;
                height: .7rem;
                border-radius: .35rem;
                border: 1px solid #24c3c5;
                color: #24c3c5;
                font-size: .3rem;
                text-align: center;
                line-height: .7rem;
            }
        }
        .loginBtn {
            position: absolute;
            bottom: .3rem;
            left: 50%;
            margin-left: -3.45rem;
            width: 6.9rem;
            height: .8rem;
            background: #24c3c5;
            text-align: center;
            line-height: .8rem;
            color: #fff;
            font-size: .34rem;
            border-radius: .1rem;
        }
    }
</style>
