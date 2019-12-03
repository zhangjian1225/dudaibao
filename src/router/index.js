import Vue from 'vue'
import Router from 'vue-router'
import reset from '@/components/reset' // 重定向
import login from '@/components/loginSignin/login' // 登录
import signin from '@/components/loginSignin/signin' // 注册
import forgetPassword from '@/components/loginSignin/forgetPassword' // 忘记密码

import homePage from '@/components/home/homePage' // 我得页面

import storeActive from '@/components/storeActive/index' // 活动页面
import activeMore from '@/components/storeActive/activeMore' // 活动详情页面
import addActive from '@/components/storeActive/addActive' // 活动添加
import playActive from '@/components/storeActive/playActive' // 报名活动


import mySelfMessage from '@/components/mySelfMessage/index' // 个人信息
import mySelfMsg from '@/components/mySelfMessage/mySelfMsg' // 个人信息认证
import zizhirenzheng from '@/components/mySelfMessage/zizhirenzheng' // 资质认证
import myBankCard from '@/components/mySelfMessage/myBankCard' // 我的银行卡
import accountKeepe from '@/components/accountKeepe/index' // 账户
import tixianmingxi from '@/components/accountKeepe/tixianmingxi' // 提现明细
import tixian from '@/components/accountKeepe/tixian' // 提现
import daishengxiao from '@/components/accountKeepe/daishengxiao' // 待生效
import duanxian from '@/components/accountKeepe/duanxian' // 短险
import shouxian from '@/components/accountKeepe/shouxian' // 寿险

import projectShow from '@/components/projectShow/index' // 产品展示
import search from '@/components/projectShow/search' // 搜索记录
import projectMore from '@/components/projectShow/projectMore' // 产品详情
import planBook from '@/components/projectShow/planBook' // 计划书
import updataPlan from '@/components/projectShow/updataPlan' // 修改计划书

import todayOrder from '@/components/order/todayOrder' // 今日订单
import jinriyushou from '@/components/order/jinriyushou' // 今日预收

import shequyunying from '@/components/shequyunying/index' // 异业联盟
import wodemengyou from '@/components/shequyunying/wodemengyou' // 我的盟友
import wodemengyoukehu from '@/components/shequyunying/wodemengyoukehu' // 我的盟友客户
import addmengyou from '@/components/shequyunying/addmengyou' // 新增盟友客户
import getImgCode from '@/components/shequyunying/getImgCode' // 生成二维码
import userInfo from '@/components/shequyunying/userInfo' // 盟友客户信息
import initInfo from '@/components/shequyunying/initInfo' // 基本信息
import addInitInfo from '@/components/shequyunying/addInitInfo' // 添加基本信息
import familyInfo from '@/components/shequyunying/familyInfo' // 家庭信息
import addFamilyInfo from '@/components/shequyunying/addFamilyInfo' // 家庭信息

import mengyouxiangxi from '@/components/shequyunying/mengyouxiangxi' // 盟友详细信息
import updataMengyou from '@/components/shequyunying/updataMengyou' // 盟友信息修改

import carInfo from '@/components/shequyunying/carInfo' // 汽车详细信息
import addCarInfo from '@/components/shequyunying/addCarInfo' // 添加汽车详细信息

import shequhuoke from '@/components/shequhuoke/index' // 社区获客
import kehudongtai from '@/components/shequhuoke/kehudongtai' // 客户动态
import goutongjilu from '@/components/shequhuoke/goutongjilu' // 沟通记录
import tianjiajilu from '@/components/shequhuoke/tianjiajilu' // 添加
import shequhuokeUserInfo from '@/components/shequhuoke/shequhuokeUserInfo' // 客户信息
import shequhuokeInitInfo from '@/components/shequhuoke/shequhuokeInitInfo' // 基本信息
import shequhuokeAddInitInfo from '@/components/shequhuoke/shequhuokeAddInitInfo' // 添加基本信息
import shequhuokeFamilyInfo from '@/components/shequhuoke/shequhuokeFamilyInfo' // 家庭信息
import shequhuokeAddFamilyInfo from '@/components/shequhuoke/shequhuokeAddFamilyInfo' // 添加家庭信息
import shequhuokeCarInfo from '@/components/shequhuoke/shequhuokeCarInfo' // 家庭信息
import shequhuokeAddCarInfo from '@/components/shequhuoke/shequhuokeAddCarInfo' // 添加家庭信息
import shequhuokebaodanInfo from '@/components/shequhuoke/shequhuokebaodanInfo' // 添加baodan信息
import baodanList from '@/components/shequhuoke/baodanList' // 保单列表
import addbaodan from '@/components/shequhuoke/addbaodan' // 新增保单
import myCard from '@/components/shequhuoke/myCard' // 我的名片
import wodekehu from '@/components/shequhuoke/wodekehu' // 我的客户
import heka from '@/components/shequhuoke/heka' // 贺卡
import wodeheka from '@/components/shequhuoke/wodeheka' // 我的贺卡
import huokeAddInitInfo from '@/components/shequhuoke/huokeAddInitInfo' // 添加成员
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'reset',
      component: reset
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
    {
      path: '/mySelfMessage',
      name: 'mySelfMessage',
      component: mySelfMessage
    },
    {
      path: '/mySelfMsg',
      name: 'mySelfMsg',
      component: mySelfMsg
    },
    {
      path: '/zizhirenzheng',
      name: 'zizhirenzheng',
      component: zizhirenzheng
    },
    {
      path: '/myBankCard',
      name: 'myBankCard',
      component: myBankCard
    },
    {
      path: '/accountKeepe',
      name: 'accountKeepe',
      component: accountKeepe
    },
    {
      path: '/tixianmingxi',
      name: 'tixianmingxi',
      component: tixianmingxi
    },
    {
      path: '/storeActive',
      name: 'storeActive',
      component: storeActive
    },{
      path: '/activeMore',
      name: 'activeMore',
      component: activeMore
    },{
      path: '/addActive',
      name: 'addActive',
      component: addActive
    },
    {
      path: '/playActive',
      name: 'playActive',
      component: playActive
    },
    {
      path: '/tixian',
      name: 'tixian',
      component: tixian
    },
    {
      path: '/daishengxiao',
      name: 'daishengxiao',
      component: daishengxiao
    },
    {
      path: '/duanxian',
      name: 'duanxian',
      component: duanxian
    },
    {
      path: '/shouxian',
      name: 'shouxian',
      component: shouxian
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/projectShow',
      name: 'projectShow',
      component: projectShow
    },
    {
      path: '/projectMore',
      name: 'projectMore',
      component: projectMore
    },
    {
      path: '/planBook',
      name: 'planBook',
      component: planBook
    },
    {
      path: '/updataPlan',
      name: 'updataPlan',
      component: updataPlan
    },
    {
      path: '/todayOrder',
      name: 'todayOrder',
      component: todayOrder
    },
    {
      path: '/jinriyushou',
      name: 'jinriyushou',
      component: jinriyushou
    },
    {
      path: '/shequyunying',
      name: 'shequyunying',
      component: shequyunying
    },
    {
      path: '/wodemengyou',
      name: 'wodemengyou',
      component: wodemengyou
    },
    {
      path: '/wodemengyoukehu',
      name: 'wodemengyoukehu',
      component: wodemengyoukehu
    },
    {
      path: '/addmengyou',
      name: 'addmengyou',
      component: addmengyou
    },
    {
      path: '/getImgCode',
      name: 'getImgCode',
      component: getImgCode
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/initInfo',
      name: 'initInfo',
      component: initInfo
    },
    {
      path: '/mengyouxiangxi',
      name: 'mengyouxiangxi',
      component: mengyouxiangxi
    },
    {
      path: '/updataMengyou',
      name: 'updataMengyou',
      component: updataMengyou
    },
    {
      path: '/addInitInfo',
      name: 'addInitInfo',
      component: addInitInfo
    },
    {
      path: '/familyInfo',
      name: 'familyInfo',
      component: familyInfo
    },
    {
      path: '/addFamilyInfo',
      name: 'addFamilyInfo',
      component: addFamilyInfo
    },
    {
      path: '/carInfo',
      name: 'carInfo',
      component: carInfo
    },
    {
      path: '/addCarInfo',
      name: 'addCarInfo',
      component: addCarInfo
    },
    {
      path: '/shequhuoke',
      name: 'shequhuoke',
      component: shequhuoke
    },
    {
      path: '/kehudongtai',
      name: 'kehudongtai',
      component: kehudongtai
    },
    {
      path: '/goutongjilu',
      name: 'goutongjilu',
      component: goutongjilu
    },
    {
      path: '/tianjiajilu',
      name: 'tianjiajilu',
      component: tianjiajilu
    },
    {
      path: '/shequhuokeUserInfo',
      name: 'shequhuokeUserInfo',
      component: shequhuokeUserInfo
    },
    {
      path: '/shequhuokeInitInfo',
      name: 'shequhuokeInitInfo',
      component: shequhuokeInitInfo
    },
    {
      path: '/shequhuokeAddInitInfo',
      name: 'shequhuokeAddInitInfo',
      component: shequhuokeAddInitInfo
    },
    {
      path: '/shequhuokeFamilyInfo',
      name: 'shequhuokeFamilyInfo',
      component: shequhuokeFamilyInfo
    },
    {
      path: '/shequhuokeAddFamilyInfo',
      name: 'shequhuokeAddFamilyInfo',
      component: shequhuokeAddFamilyInfo
    },
    {
      path: '/shequhuokeCarInfo',
      name: 'shequhuokeCarInfo',
      component: shequhuokeCarInfo
    },
    {
      path: '/shequhuokeAddCarInfo',
      name: 'shequhuokeAddCarInfo',
      component: shequhuokeAddCarInfo
    },
    {
      path: '/shequhuokebaodanInfo',
      name: 'shequhuokebaodanInfo',
      component: shequhuokebaodanInfo
    },
    {
      path: '/baodanList',
      name: 'baodanList',
      component: baodanList
    },
    {
      path: '/addbaodan',
      name: 'addbaodan',
      component: addbaodan
    },
    {
      path: '/myCard',
      name: 'myCard',
      component: myCard
    },
    {
      path: '/wodekehu',
      name: 'wodekehu',
      component: wodekehu
    },
    {
      path: '/heka',
      name: 'heka',
      component: heka
    },
    {
      path: '/wodeheka',
      name: 'wodeheka',
      component: wodeheka
    },
    {
      path: '/huokeAddInitInfo',
      name: 'huokeAddInitInfo',
      component: huokeAddInitInfo
    }
  ]
})