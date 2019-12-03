<template>
    <div class="container">
        <div class="header">
            <!-- <div class="back" @click="closeFn">
                <span class="iconfont">&#xe611;</span>
            </div> -->
            <div class="title">独代服务</div>
        </div>
        <div class="main_head">
          <div class="userInfoBox">
            <div class="userInfoUpBox">
              <div class="left">
                <div class="getStart">
                  <p class="name" v-if="employe.empName" v-html='employe.empName'></p>
                  <p class="start">
                    <van-rate v-if="employe.empName" v-model="employe.agentGrade*1" readonly />
                  </p>
                </div>
                <p class="userTitle" v-if="employe.empName" v-html="employe.agentGradeDesc"></p>
              </div>
              <div class="imgBox" @click="mySelfMessageFn">
                <div class="imgBox_1">
                  <img v-if="headImg" :src="headImg"/>
                  <img  v-else src="../../assets/image/header.jpg"/>
                </div>
              </div>
            </div>
            <div class="userInfoCenterBox">
              <ul class="list">
                <li class="li">
                  <span class="num">20</span>
                  <span class="desc">今日订单数</span>
                </li>
                <li class="li">
                  <span class="num">
                    <span class="icon">￥</span>
                    <span class="money">1000</span>
                  </span>
                  <span class="desc">今日预计收入</span>
                </li>
               <li>
                  <span class="num">
                    <span class="icon">￥</span>
                    <span class="money">1000.9999</span>
                  </span>
                  <span class="desc">累计收入</span>
                </li>
              </ul>
            </div>
            <!-- 社区运营-->
            <div class="userInfoDownBox">
              <p class="title">社区运营</p>
              <ul>
                <li class="proShow">
                  <router-link to="/projectShow">
                    <p class="icon_1"></p>
                    <p class="text">产品展示</p>
                  </router-link>
                </li>
                <li class="proShow proShow_1">
                  <router-link to="/shequyunying">
                    <p class="icon_2"></p>
                    <p class="text">异业联盟</p>
                  </router-link>
                </li>
                <li class="proShow">
                  <router-link :to="{path:'/storeActive',query:{status: '1'}}">
                    <p class="icon_3"></p>
                    <p class="text">社区活动</p>
                  </router-link>
                </li>
                <li class="proShow">
                  <router-link :to="{path:'/shequhuoke',query:{addressUrl: 'homePage'}}">
                    <p class="icon_4"></p>
                    <p class="text">社区获客</p>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="main_add_icon">
            <router-link :to="{path:'/huokeAddInitInfo',query:{addressUrl:''}}">
          </router-link>
          </div>
        </div>
        <!-- 主体 -->
        <div class="mainBox">
          <!-- 客户服务 -->
          <div class="userServer">
            <p class="title">客户服务</p>
            <ul>
              <li @click="noOnpenFn">
                <router-link to="">
                  <p class="icon">
                    <img src="./images/6.png"/>
                  </p>
                  <p class="text">
                    <span class="span_1">保单托管</span>
                    <span class="span_2">帮客户管理保单</span>
                  </p>
                </router-link>
              </li>
             <li @click="noOnpenFn">
                <router-link to="">
                  <p class="icon">
                    <img src="./images/7.png"/>
                  </p>
                  <p class="text">
                    <span class="span_1">理赔服务</span>
                    <span class="span_2">协助客户理赔</span>
                  </p>
                </router-link>
              </li>
              <li @click="noOnpenFn">
                <router-link to="">
                  <p class="icon">
                    <img src="./images/8.png"/>
                  </p>
                  <p class="text">
                    <span class="span_1">退保申请</span>
                    <span class="span_2">协助客户退保</span>
                  </p>
                </router-link>
              </li>
              <li @click="noOnpenFn">
                <router-link to="">
                  <p class="icon">
                    <img src="./images/9.png"/>
                  </p>
                  <p class="text">
                    <span class="span_1">健康服务</span>
                    <span class="span_2">守护客户健康</span>
                  </p>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 产品精选 -->
          <div class='productBox'>
            <p class="title">
              <span>产品精选</span>
              <van-switch v-model="isOpen" inactive-color="#f7f7f7" active-color="#24c3c5" size="20px"/>
            </p>
            <ul>
              <li>
                <img src="./images/test.png" />
                <div class="desc">
                  <p class="descTitle">富德生命长盈三号两全保险</p>
                  <p class="dateBox">
                    <span>投保年龄：</span>
                    <span>不限</span>
                    <span style="margin-left: .2rem;">保障期限：</span>
                    <span>三年</span>
                  </p>
                  <p class="moneyBox">
                    <span class="span_1">3000元起</span>
                    <span class="span_2">推广费：20%</span>
                  </p>
                </div>
              </li>
              <li>
                <img src="./images/test.png" />
                <div class="desc">
                  <p class="descTitle">富德生命长盈三号两全保险</p>
                  <p class="dateBox">
                    <span>投保年龄：</span>
                    <span>不限</span>
                    <span style="margin-left: .2rem;">保障期限：</span>
                    <span>三年</span>
                  </p>
                  <p class="moneyBox">
                    <span class="span_1">3000元起</span>
                    <span class="span_2">推广费：20%</span>
                  </p>
                </div>
              </li>
               <li>
                <img src="./images/test.png" />
                <div class="desc">
                  <p class="descTitle">富德生命长盈三号两全保险</p>
                  <p class="dateBox">
                    <span>投保年龄：</span>
                    <span>不限</span>
                    <span style="margin-left: .2rem;">保障期限：</span>
                    <span>三年</span>
                  </p>
                  <p class="moneyBox">
                    <span class="span_1">3000元起</span>
                    <span class="span_2">推广费：20%</span>
                  </p>
                </div>
              </li>
               <li>
                <img src="./images/test.png" />
                <div class="desc">
                  <p class="descTitle">富德生命长盈三号两全保险</p>
                  <p class="dateBox">
                    <span>投保年龄：</span>
                    <span>不限</span>
                    <span style="margin-left: .2rem;">保障期限：</span>
                    <span>三年</span>
                  </p>
                  <p class="moneyBox">
                    <span class="span_1">3000元起</span>
                    <span class="span_2">推广费：20%</span>
                  </p>
                </div>
              </li>
            </ul>
            <p class="allBox">
              <span class="all">全部产品</span>
            </p>
          </div>
          <!-- 品质管理 -->
          <div class="pinzhiBox">
            <p class="title">品质管理</p>
            <ul>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="" >
                  <p class="icon_1"></p>
                  <p class="text">继续率预警</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_2"></p>
                  <p class="text">店主继续率</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_3"></p>
                  <p class="text">店员继续率</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_4"></p>
                  <p class="text">门店继续率</p>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 营销 -->
          <div class="yingxiaoBox">
            <p class="title">营销支持</p>
            <ul>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="" >
                  <p class="icon_1"></p>
                  <p class="text">风险评估</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_2"></p>
                  <p class="text">我的名片</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_3"></p>
                  <p class="text">计划书</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_4"></p>
                  <p class="text">海报</p>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 业务 -->
          <div class="yewu">
            <p class="title">业务经营</p>
            <div class="yewuMain">
              <div class="proBox">
                <div class="num">
                  <span>0</span>
                  <span>500</span>
                  <span>1000</span>
                  <span>3000</span>
                </div>
                <div class="lineBox">
                  <div class="line">
                    <div class="icon"></div>
                    <div class="alertBox">
                      距1000元奖励还差3000元标保，加油！
                    </div>
                  </div>
                </div>
              </div>
              <ul>
                <li class="proShow" @click="noOnpenFn">
                  <router-link to="" >
                    <p class="icon_1"></p>
                    <p class="text">个人排行榜</p>
                  </router-link>
                </li>
                <li class="proShow" @click="noOnpenFn">
                  <router-link to="">
                    <p class="icon_2"></p>
                    <p class="text">方案奖励</p>
                  </router-link>
                </li>
                <li class="proShow" @click="noOnpenFn">
                  <router-link to="">
                    <p class="icon_3"></p>
                    <p class="text">业绩排行版</p>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <!-- 学院 -->
          <div class="xueyuanBox">
            <p class="title">独代学院</p>
            <ul>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="" >
                  <p class="icon_1"></p>
                  <p class="text">培训</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_2"></p>
                  <p class="text">会议</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_3"></p>
                  <p class="text">法律</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_4"></p>
                  <p class="text">社保</p>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 增值服务 -->
          <div class="zenzhiServer">
            <p class="title">增值服务</p>
            <ul>
              <li @click="noOnpenFn">
                <router-link to="">
                  <p class="icon">
                    <img src="./images/25.png"/>
                  </p>
                  <p class="text">
                    <span class="span_1">财务咨询</span>
                    <span class="span_2">财务咨询</span>
                  </p>
                </router-link>
              </li>
             <li @click="noOnpenFn">
                <router-link to="">
                  <p class="icon">
                    <img src="./images/26.png"/>
                  </p>
                  <p class="text">
                    <span class="span_1">税务咨询</span>
                    <span class="span_2">税务咨询</span>
                  </p>
                </router-link>
              </li>
              <li @click="noOnpenFn">
                <router-link to="">
                  <p class="icon">
                    <img src="./images/27.png"/>
                  </p>
                  <p class="text">
                    <span class="span_1">遗产传承</span>
                    <span class="span_2">遗产传承</span>
                  </p>
                </router-link>
              </li>
              <li @click="noOnpenFn">
                <router-link to="">
                  <p class="icon">
                    <img src="./images/28.png"/>
                  </p>
                  <p class="text">
                    <span class="span_1">健康服务</span>
                    <span class="span_2">守护客户健康</span>
                  </p>
                </router-link>
              </li>
              <li @click="noOnpenFn">
                <router-link to="">
                  <p class="icon">
                    <img src="./images/29.png"/>
                  </p>
                  <p class="text">
                    <span class="span_1">养老服务</span>
                    <span class="span_2">守护晚点生活</span>
                  </p>
                </router-link>
              </li>
             <li @click="noOnpenFn">
                <router-link to="">
                  <p class="icon">
                    <img src="./images/30.png"/>
                  </p>
                  <p class="text">
                    <span class="span_1">旅游服务</span>
                    <span class="span_2">旅游服务</span>
                  </p>
                </router-link>
              </li>
              <li @click="noOnpenFn">
                <router-link to="">
                  <p class="icon">
                    <img src="./images/31.png"/>
                  </p>
                  <p class="text">
                    <span class="span_1">教育留学</span>
                    <span class="span_2">教育留学</span>
                  </p>
                </router-link>
              </li>
              <li @click="noOnpenFn">
                <router-link to="">
                  <p class="icon">
                    <img src="./images/32.png"/>
                  </p>
                  <p class="text">
                    <span class="span_1">法律服务</span>
                    <span class="span_2">法律服务</span>
                  </p>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 管家 -->
          <div class="guanjiaBox">
            <p class="title">独代管家</p>
            <ul>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="" >
                  <p class="icon_1"></p>
                  <p class="text">我的OA</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_2"></p>
                  <p class="text">我的续期</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_3"></p>
                  <p class="text">我的预算</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_4"></p>
                  <p class="text">我的订单</p>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 督导 -->
          <div class="dudaoBox">
            <p class="title">独代管家</p>
            <ul>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="" >
                  <p class="icon_1"></p>
                  <p class="text">门店考核预警</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_2"></p>
                  <p class="text">门店基本法预警</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_3"></p>
                  <p class="text">荣誉榜</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_4"></p>
                  <p class="text">合伙人业绩督导</p>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 业务管理 -->
          <div class="guanliBox">
            <p class="title">业务管理</p>
            <ul>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="" >
                  <p class="icon_1"></p>
                  <p class="text">客户管理</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_2"></p>
                  <p class="text">保单管理</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_3"></p>
                  <p class="text">团队管理</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_4"></p>
                  <p class="text">资金管理</p>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 基础管理 -->
          <div class="jichuBox">
            <p class="title">基础管理</p>
            <ul>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="" >
                  <p class="icon_1"></p>
                  <p class="text">日常管理</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_2"></p>
                  <p class="text">财务管理</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_3"></p>
                  <p class="text">税务管理</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_4"></p>
                  <p class="text">资金管理</p>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 投资管理 -->
          <div class="touziBox">
            <p class="title">投资管理</p>
            <ul>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="" >
                  <p class="icon_1"></p>
                  <p class="text">利润分析</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_2"></p>
                  <p class="text">生命周期成长分析</p>
                </router-link>
              </li>
              <li class="proShow" @click="noOnpenFn">
                <router-link to="">
                  <p class="icon_3"></p>
                  <p class="text">估值分析</p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>

<script>
import { Rate, Toast, Switch } from 'vant';
export default {
    name: "",
    data() {
        return {
          employe: {},
          url:'http://www.i-agent.cn/dudaibao',
          headImg:'',
          isOpen: true, //是否代开产品精选
        };
    },
    methods: {
      // 个人中心
      mySelfMessageFn: function () {
        this.$router.push('/mySelfMessage')
      },
      // 还未开放
      noOnpenFn: function () {
        Toast('努力开发中');
      },
      // 关闭
      closeFn: function () {
        window.close();
      }
    },
    mounted() {
      let _this =this;
      this.$axios.get('/getEmployeMainInfo.do',{
          params: {
              
          }
      }) 
      .then(res=>{
        if (res.data.code == 0) {
          _this.employe = res.data.data.employe;
          _this.headImg = _this.employe.headImage;
          window.localStorage.setItem('empNo',_this.employe.empNo);
        }
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
        padding-bottom: .2rem;
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
            // margin-right: .3rem;
            text-align: center;
            line-height: 0.8rem;
            font-size: 0.34rem;
        }
    }
    // 社区运营
    .main_head {
      width: 100%;
      height: 5.3rem;
      background: url(./images/1.png) no-repeat;
      background-size: 100% 100%;
      box-sizing: border-box;
      padding-left: .3rem;
      padding-right: .3rem;
      position: relative;
      .main_add_icon {
        position: absolute;
        width: 1.34rem;
        height: 1.34rem;
        border-radius: .5rem;
        right: .5rem;
        bottom: -1rem;
        z-index: 8;
        a {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 99;
          background: url(./images/addBtn.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .userInfoBox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .userInfoUpBox {
          width: 100%;
          height: 1.5rem;
          margin-top: .3rem;
          display: flex;
          .left {
            height: 100%;
            flex:1;
            display: flex;
            flex-direction: column;
            .getStart {
              width: 100%;
              flex: 1;
              line-height: .75rem;
              display: flex;
              align-items: center;
              .name {
                font-size: .45rem;
                color: #fff;
              }
              .start {
                flex: 1;
                margin-top: .2rem;
                margin-left: .3rem;
              }
            }
            .userTitle {
              width: 100%;
              flex: 1;
              line-height: .75rem;
              color: #fff;
              font-size: .34rem;
            }
          }
          .imgBox {
            width: 1.4rem;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .imgBox_1 {
              width: 100%;
              height: 1.4rem;
              border-radius: .8rem;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                border-radius: .8rem;
              }
            }
          }
        }
        .userInfoCenterBox {
          width: 100%;
          height: 1.25rem;
          ul {
            width: 100%;
            height: 100%;
            margin-top: .2rem;
            display: flex;
            li {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              position: relative;
              .num {
                font-size: .35rem;
                width: 100%;
                text-align: center;
                color: #fff;
                .icon {
                  font-size: .24rem;
                }
                .money {
                  margin-left: -.1rem;
                }
              }
              .desc {
                margin-top: .1rem;
                font-size: .26rem;
                width: 100%;
                text-align: center;
                color: #fff;
              }
            }
            .li:after {
              content: '';
              position: absolute;
              right: 0;
              height: .6rem;
              width: 1px;
              background: #fff;
            }
          }
        }
        .userInfoDownBox {
          margin-top: .3rem;
          width: 100%;
          height: 2.8rem;
          background: #fff;
          border-radius: .15rem;
          box-shadow: 0 0 .15rem rgba(0, 0, 0, .2); 
          display: flex;
          flex-direction: column;
          .title {
            height: .3rem;
            width: 100%;
            margin-top: .1rem;
            height: .7rem;
            line-height: .7rem;
            font-size: .28rem;
            font-weight: bold;
            position: relative;
            box-sizing: border-box;
            padding-left: .4rem;
            border-bottom: 1px solid #f7f7f7;
          }
          .title::before {
            content: '';
            position: absolute;
            left: .2rem;
            top: .2rem;
            height: .3rem;
            width: 3px;
            background: #24c3c5;
            border-radius: 1px;
          }
          ul{
            width: 100%;
            flex: 1;
            display: flex;
            li {
              flex: 1;
              height: 100%;
              a {
                display: block;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .icon_1 {
                  width: .5rem;
                  height: .5rem;
                  background: url(./images/5.png) no-repeat;
                  background-size: 100% 100%;
                }
                .icon_2 {
                  width: .6rem;
                  height: .5rem;
                  background: url(./images/4.png) no-repeat;
                  background-size: 100% 100%;
                }
                .icon_3 {
                  width: .5rem;
                  height: .5rem;
                  background: url(./images/3.png) no-repeat;
                  background-size: 100% 100%;
                }
                .icon_4 {
                  width: .5rem;
                  height: .5rem;
                  background: url(./images/2.png) no-repeat;
                  background-size: 100% 100%;
                }
                .text {
                  font-size: .28rem;
                  margin-top: .1rem;
                }
              }
            }
          }
        }
      }
    }
    .mainBox {
      margin-top: .3rem;
      width: 100%;
      flex: 1;
      box-sizing: border-box;
      padding: 0 .3rem 0 .3rem;
      -webkit-overflow-scrolling : touch;
      overflow: hidden;
      overflow-y: auto;
      // 客户服务
      .userServer {
        width: 100%;
        height: auto;
        background: #fff;
        border-radius: .15rem;
        box-shadow: 0 0 .15rem rgba(0, 0, 0, .2); 
        display: flex;
        flex-direction: column;
        .title {
          height: .3rem;
          width: 100%;
          margin-top: .1rem;
          height: .7rem;
          line-height: .7rem;
          font-size: .28rem;
          font-weight: bold;
          position: relative;
          box-sizing: border-box;
          padding-left: .4rem;
          border-bottom: 1px solid #f7f7f7;
        }
        .title::before {
          content: '';
          position: absolute;
          left: .2rem;
          top: .2rem;
          height: .3rem;
          width: 3px;
          background: #24c3c5;
          border-radius: 1px;
        }
        ul {
          width: 100%;
          flex: 1;
          box-sizing: border-box;
          padding: 0 .2rem .2rem .2rem;
          display: flex;
          flex-wrap: wrap;
          li {
            width: 3.15rem;
            height: 1.4rem;
            background: #f7f7f7;
            margin-top: .2rem;
            border-radius: .1rem;
            a {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              .icon {
                width: .78rem;
                height: .72rem;
                margin-left: .2rem;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .text {
                height: .8rem;
                flex: 1;
                margin-left: .2rem;
                span {
                  display: block;
                  height: 50%;
                  width: 100%;
                  font-size: .26rem;
                  line-height: .4rem;
                }
                .span_1 {
                  color: #000;
                }
                .span_2 {
                  color: #777;
                }
              }
            }
          }
          li:nth-child(even) {
            margin-left: .2rem;
          }
        }
      }
      // 产品精选
      .productBox {
        width: 100%;
        min-height:7.8rem;
        height: auto;
        background: #fff;
        border-radius: .15rem;
        box-shadow: 0 0 .15rem rgba(0, 0, 0, .2); 
        margin-top: .3rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .title {
          height: .3rem;
          width: 100%;
          margin-top: .1rem;
          height: .7rem;
          line-height: .7rem;
          font-size: .28rem;
          font-weight: bold;
          position: relative;
          box-sizing: border-box;
          padding-left: .4rem;
          padding-right: .2rem;
          border-bottom: 1px solid #f7f7f7;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .title::before {
          content: '';
          position: absolute;
          left: .2rem;
          top: .2rem;
          height: .3rem;
          width: 3px;
          background: #24c3c5;
          border-radius: 1px;
        }
        ul {
          width: 100%;
          height: auto;
          box-sizing: border-box;
          padding: 0 .2rem 0rem .2rem;
          overflow: hidden;
          // overflow-y: auto;
          li {
            width: 100%;
            height: 2rem;
            border-bottom: 1px solid #f7f7f7;
            display: flex;
            align-items: center;
            img {
              width: 1.4rem;
              height: 1.4rem;
              border-radius: .1rem;
            }
            .desc {
              height: 1.4rem;
              flex: 1;
              margin-left: .3rem;
              .descTitle {
                color: #000;
                font-size: .3rem;
                margin-bottom: .1rem;
              }
              .dateBox {
                margin-bottom: .1rem;
              }
              .dateBox span {
                color: #777;
                font-size: .28rem;
              }
              .moneyBox {
                display: flex;
                justify-content: space-between;
                .span_1 {
                  color: #ff4800;
                  font-size: .3rem;
                }
                .span_2 {
                  color: #26a748;
                  font-size: .3rem;
                }
              }
            }
          }
          li:last-child {
            border-bottom: none;
          }
        }
        .allBox {
          width: 100%;
          height: 1.1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .all {
            display: block;
            height: .6rem;
            width: 2.05rem;
            text-align: center;
            line-height: .6rem;
            color: #24c3c5;
            font-size: .3rem;
            border: 1px solid #24c3c5;
            border-radius: .35rem;
          }
        }
      }
      // 品质管理
      .pinzhiBox  {
        margin-top: .3rem;
        width: 100%;
        height: 2.4rem;
        background: #fff;
        border-radius: .15rem;
        box-shadow: 0 0 .15rem rgba(0, 0, 0, .2); 
        display: flex;
        flex-direction: column;
        .title {
          height: .3rem;
          width: 100%;
          margin-top: .1rem;
          height: .7rem;
          line-height: .7rem;
          font-size: .28rem;
          font-weight: bold;
          position: relative;
          box-sizing: border-box;
          padding-left: .4rem;
          border-bottom: 1px solid #f7f7f7;
        }
        .title::before {
          content: '';
          position: absolute;
          left: .2rem;
          top: .2rem;
          height: .3rem;
          width: 3px;
          background: #24c3c5;
          border-radius: 1px;
        }
        ul{
          width: 100%;
          flex: 1;
          display: flex;
          li {
            flex: 1;
            height: 100%;
            a {
              display: block;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .icon_1 {
                width: .5rem;
                height: .5rem;
                background: url(./images/10.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_2 {
                width: .5rem;
                height: .5rem;
                background: url(./images/11.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_3 {
                width: .5rem;
                height: .5rem;
                background: url(./images/12.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_4 {
                width: .5rem;
                height: .5rem;
                background: url(./images/13.png) no-repeat;
                background-size: 100% 100%;
              }
              .text {
                font-size: .28rem;
                margin-top: .1rem;
              }
            }
          }
        }
      }
      // 营销
      .yingxiaoBox{
        margin-top: .3rem;
        width: 100%;
        height: 2.4rem;
        background: #fff;
        border-radius: .15rem;
        box-shadow: 0 0 .15rem rgba(0, 0, 0, .2); 
        display: flex;
        flex-direction: column;
        .title {
          height: .3rem;
          width: 100%;
          margin-top: .1rem;
          height: .7rem;
          line-height: .7rem;
          font-size: .28rem;
          font-weight: bold;
          position: relative;
          box-sizing: border-box;
          padding-left: .4rem;
          border-bottom: 1px solid #f7f7f7;
        }
        .title::before {
          content: '';
          position: absolute;
          left: .2rem;
          top: .2rem;
          height: .3rem;
          width: 3px;
          background: #24c3c5;
          border-radius: 1px;
        }
        ul{
          width: 100%;
          flex: 1;
          display: flex;
          li {
            flex: 1;
            height: 100%;
            a {
              display: block;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .icon_1 {
                width: .5rem;
                height: .5rem;
                background: url(./images/14.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_2 {
                width: .5rem;
                height: .5rem;
                background: url(./images/15.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_3 {
                width: .5rem;
                height: .5rem;
                background: url(./images/16.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_4 {
                width: .5rem;
                height: .5rem;
                background: url(./images/17.png) no-repeat;
                background-size: 100% 100%;
              }
              .text {
                font-size: .28rem;
                margin-top: .1rem;
              }
            }
          }
        }
      }
      // 业务
      .yewu{
        margin-top: .3rem;
        width: 100%;
        height: 4.5rem;
        background: #fff;
        border-radius: .15rem;
        box-shadow: 0 0 .15rem rgba(0, 0, 0, .2); 
        display: flex;
        flex-direction: column;
        .title {
          height: .3rem;
          width: 100%;
          margin-top: .1rem;
          height: .7rem;
          line-height: .7rem;
          font-size: .28rem;
          font-weight: bold;
          position: relative;
          box-sizing: border-box;
          padding-left: .4rem;
          border-bottom: 1px solid #f7f7f7;
        }
        .title::before {
          content: '';
          position: absolute;
          left: .2rem;
          top: .2rem;
          height: .3rem;
          width: 3px;
          background: #24c3c5;
          border-radius: 1px;
        }
        .yewuMain {
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          .proBox {
            width: 100%;
            height: 2rem;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding: 0 .2rem 0 .2rem;
            .num {
              width: 100%;
              display: flex;
              margin-top: .2rem;
              justify-content: space-between;
            }
            .lineBox {
              margin-top: .2rem;
              width: 100%;
              height: .12rem;
              border-radius: .06rem;
              background: #f7f7f7;
              position: relative;
              .icon {
                position: absolute;
                top: -.2rem;
                left: 25%;
                width: .5rem;
                height: .5rem;
                background: url(./images/true.png) no-repeat;
                background-size: 100% 100%;
                z-index: 1;
              }
              .line {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: #24c3c5;
                border-radius: .06rem;
                .alertBox {
                  position: absolute;
                  top: .4rem;
                  left: 50%;
                  width: 3rem;
                  height: 1rem;
                  border-radius: .1rem;
                  text-align: center;
                  box-sizing: border-box;
                  padding: .1rem;
                  background: #e9f9f9;
                  color: #24c3c5;
                  font-size: .28rem;
                }
              }
            }
          }
          ul{
            margin-top: .15rem;
            width: 100%;
            flex: 1;
            display: flex;
          li {
            flex: 1;
            height: 100%;
            a {
              display: block;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .icon_1 {
                width: .5rem;
                height: .5rem;
                background: url(./images/18.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_2 {
                width: .5rem;
                height: .5rem;
                background: url(./images/19.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_3 {
                width: .5rem;
                height: .5rem;
                background: url(./images/20.png) no-repeat;
                background-size: 100% 100%;
              }
              .text {
                font-size: .28rem;
                margin-top: .1rem;
              }
            }
          }
        }
        }
      }
      // 学院
      .xueyuanBox{
        margin-top: .3rem;
        width: 100%;
        height: 2.4rem;
        background: #fff;
        border-radius: .15rem;
        box-shadow: 0 0 .15rem rgba(0, 0, 0, .2); 
        display: flex;
        flex-direction: column;
        .title {
          height: .3rem;
          width: 100%;
          margin-top: .1rem;
          height: .7rem;
          line-height: .7rem;
          font-size: .28rem;
          font-weight: bold;
          position: relative;
          box-sizing: border-box;
          padding-left: .4rem;
          border-bottom: 1px solid #f7f7f7;
        }
        .title::before {
          content: '';
          position: absolute;
          left: .2rem;
          top: .2rem;
          height: .3rem;
          width: 3px;
          background: #24c3c5;
          border-radius: 1px;
        }
        ul{
          width: 100%;
          flex: 1;
          display: flex;
          li {
            flex: 1;
            height: 100%;
            a {
              display: block;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .icon_1 {
                width: .5rem;
                height: .5rem;
                background: url(./images/21.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_2 {
                width: .5rem;
                height: .5rem;
                background: url(./images/22.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_3 {
                width: .5rem;
                height: .5rem;
                background: url(./images/23.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_4 {
                width: .5rem;
                height: .5rem;
                background: url(./images/24.png) no-repeat;
                background-size: 100% 100%;
              }
              .text {
                font-size: .28rem;
                margin-top: .1rem;
              }
            }
          }
        }
      }
      // 增值
      .zenzhiServer{
        width: 100%;
        height: 7.8rem;
        background: #fff;
        border-radius: .15rem;
        box-shadow: 0 0 .15rem rgba(0, 0, 0, .2); 
        display: flex;
        flex-direction: column;
        margin-top: .3rem;
        .title {
          height: .3rem;
          width: 100%;
          margin-top: .1rem;
          height: .7rem;
          line-height: .7rem;
          font-size: .28rem;
          font-weight: bold;
          position: relative;
          box-sizing: border-box;
          padding-left: .4rem;
          border-bottom: 1px solid #f7f7f7;
        }
        .title::before {
          content: '';
          position: absolute;
          left: .2rem;
          top: .2rem;
          height: .3rem;
          width: 3px;
          background: #24c3c5;
          border-radius: 1px;
        }
        ul {
          width: 100%;
          flex: 1;
          box-sizing: border-box;
          padding: 0 .2rem .2rem .2rem;
          display: flex;
          flex-wrap: wrap;
          li {
            width: 3.15rem;
            height: 1.4rem;
            background: #f7f7f7;
            margin-top: .2rem;
            border-radius: .1rem;
            a {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              .icon {
                width: .78rem;
                height: .72rem;
                margin-left: .2rem;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .text {
                height: .8rem;
                flex: 1;
                margin-left: .2rem;
                span {
                  display: block;
                  height: 50%;
                  width: 100%;
                  font-size: .26rem;
                  line-height: .4rem;
                }
                .span_1 {
                  color: #000;
                }
                .span_2 {
                  color: #777;
                }
              }
            }
          }
          li:nth-child(even) {
            margin-left: .2rem;
          }
        }
      }
      // 管家
      .guanjiaBox {
        margin-top: .3rem;
        width: 100%;
        height: 2.4rem;
        background: #fff;
        border-radius: .15rem;
        box-shadow: 0 0 .15rem rgba(0, 0, 0, .2); 
        display: flex;
        flex-direction: column;
        .title {
          height: .3rem;
          width: 100%;
          margin-top: .1rem;
          height: .7rem;
          line-height: .7rem;
          font-size: .28rem;
          font-weight: bold;
          position: relative;
          box-sizing: border-box;
          padding-left: .4rem;
          border-bottom: 1px solid #f7f7f7;
        }
        .title::before {
          content: '';
          position: absolute;
          left: .2rem;
          top: .2rem;
          height: .3rem;
          width: 3px;
          background: #24c3c5;
          border-radius: 1px;
        }
        ul{
          width: 100%;
          flex: 1;
          display: flex;
          li {
            flex: 1;
            height: 100%;
            a {
              display: block;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .icon_1 {
                width: .5rem;
                height: .5rem;
                background: url(./images/33.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_2 {
                width: .5rem;
                height: .5rem;
                background: url(./images/34.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_3 {
                width: .5rem;
                height: .5rem;
                background: url(./images/35.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_4 {
                width: .5rem;
                height: .5rem;
                background: url(./images/36.png) no-repeat;
                background-size: 100% 100%;
              }
              .text {
                font-size: .28rem;
                margin-top: .1rem;
              }
            }
          }
        }
      }
       // 督导
      .dudaoBox {
        margin-top: .3rem;
        width: 100%;
        height: 2.7rem;
        background: #fff;
        border-radius: .15rem;
        box-shadow: 0 0 .15rem rgba(0, 0, 0, .2); 
        display: flex;
        flex-direction: column;
        .title {
          height: .3rem;
          width: 100%;
          margin-top: .1rem;
          height: .7rem;
          line-height: .7rem;
          font-size: .28rem;
          font-weight: bold;
          position: relative;
          box-sizing: border-box;
          padding-left: .4rem;
          border-bottom: 1px solid #f7f7f7;
        }
        .title::before {
          content: '';
          position: absolute;
          left: .2rem;
          top: .2rem;
          height: .3rem;
          width: 3px;
          background: #24c3c5;
          border-radius: 1px;
        }
        ul{
          width: 100%;
          flex: 1;
          display: flex;
          li {
            flex: 1;
            height: 100%;
            a {
              display: block;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .icon_1 {
                width: .5rem;
                height: .5rem;
                background: url(./images/37.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_2 {
                width: .5rem;
                height: .5rem;
                background: url(./images/38.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_3 {
                width: .5rem;
                height: .5rem;
                background: url(./images/39.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_4 {
                width: .5rem;
                height: .5rem;
                background: url(./images/40.png) no-repeat;
                background-size: 100% 100%;
              }
              .text {
                text-align: center;
                height: .56rem;
                width: 1.3rem;
                font-size: .28rem;
                margin-top: .1rem;
              }
            }
          }
        }
      }
      // 业务管理
      .guanliBox {
        margin-top: .3rem;
        width: 100%;
        height: 2.4rem;
        background: #fff;
        border-radius: .15rem;
        box-shadow: 0 0 .15rem rgba(0, 0, 0, .2); 
        display: flex;
        flex-direction: column;
        .title {
          height: .3rem;
          width: 100%;
          margin-top: .1rem;
          height: .7rem;
          line-height: .7rem;
          font-size: .28rem;
          font-weight: bold;
          position: relative;
          box-sizing: border-box;
          padding-left: .4rem;
          border-bottom: 1px solid #f7f7f7;
        }
        .title::before {
          content: '';
          position: absolute;
          left: .2rem;
          top: .2rem;
          height: .3rem;
          width: 3px;
          background: #24c3c5;
          border-radius: 1px;
        }
        ul{
          width: 100%;
          flex: 1;
          display: flex;
          li {
            flex: 1;
            height: 100%;
            a {
              display: block;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .icon_1 {
                width: .5rem;
                height: .5rem;
                background: url(./images/41.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_2 {
                width: .5rem;
                height: .5rem;
                background: url(./images/42.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_3 {
                width: .5rem;
                height: .5rem;
                background: url(./images/43.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_4 {
                width: .5rem;
                height: .5rem;
                background: url(./images/44.png) no-repeat;
                background-size: 100% 100%;
              }
              .text {
                font-size: .28rem;
                margin-top: .1rem;
              }
            }
          }
        }
      }
      // 基础管理
      .jichuBox {
        margin-top: .3rem;
        width: 100%;
        height: 2.4rem;
        background: #fff;
        border-radius: .15rem;
        box-shadow: 0 0 .15rem rgba(0, 0, 0, .2); 
        display: flex;
        flex-direction: column;
        .title {
          height: .3rem;
          width: 100%;
          margin-top: .1rem;
          height: .7rem;
          line-height: .7rem;
          font-size: .28rem;
          font-weight: bold;
          position: relative;
          box-sizing: border-box;
          padding-left: .4rem;
          border-bottom: 1px solid #f7f7f7;
        }
        .title::before {
          content: '';
          position: absolute;
          left: .2rem;
          top: .2rem;
          height: .3rem;
          width: 3px;
          background: #24c3c5;
          border-radius: 1px;
        }
        ul{
          width: 100%;
          flex: 1;
          display: flex;
          li {
            flex: 1;
            height: 100%;
            a {
              display: block;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .icon_1 {
                width: .5rem;
                height: .5rem;
                background: url(./images/45.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_2 {
                width: .5rem;
                height: .5rem;
                background: url(./images/46.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_3 {
                width: .5rem;
                height: .5rem;
                background: url(./images/47.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_4 {
                width: .5rem;
                height: .5rem;
                background: url(./images/48.png) no-repeat;
                background-size: 100% 100%;
              }
              .text {
                font-size: .28rem;
                margin-top: .1rem;
              }
            }
          }
        }
      }
      // 投资管理
      .touziBox {
        margin-top: .3rem;
        width: 100%;
        height: 2.4rem;
        background: #fff;
        border-radius: .15rem;
        box-shadow: 0 0 .15rem rgba(0, 0, 0, .2); 
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        .title {
          height: .3rem;
          width: 100%;
          margin-top: .1rem;
          height: .7rem;
          line-height: .7rem;
          font-size: .28rem;
          font-weight: bold;
          position: relative;
          box-sizing: border-box;
          padding-left: .4rem;
          border-bottom: 1px solid #f7f7f7;
        }
        .title::before {
          content: '';
          position: absolute;
          left: .2rem;
          top: .2rem;
          height: .3rem;
          width: 3px;
          background: #24c3c5;
          border-radius: 1px;
        }
        ul{
          width: 100%;
          flex: 1;
          display: flex;
          li {
            flex: 1;
            height: 100%;
            a {
              display: block;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .icon_1 {
                width: .5rem;
                height: .5rem;
                background: url(./images/49.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_2 {
                width: .5rem;
                height: .5rem;
                background: url(./images/50.png) no-repeat;
                background-size: 100% 100%;
              }
              .icon_3 {
                width: .5rem;
                height: .5rem;
                background: url(./images/51.png) no-repeat;
                background-size: 100% 100%;
              }
              .text {
                font-size: .28rem;
                margin-top: .1rem;
              }
            }
          }
        }
      }
    }
</style>
