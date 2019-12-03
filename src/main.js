// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import htmlToPdf from '@/util/htmlToPdf.js' // 生成pdf
import "@/util/fit.js" // 自适应
import wxInfo from '@/util/wx.js' // 微信分享
import '@/util/http.js' // 数据拦截
import {chineseToPinYin, ucfirst} from '@/util/pingyin.js' // 拼音库
import '@/assets/fontIcon/iconfont.css' // 字体图标库
import echarts from 'echarts' // 图表
import wx from 'weixin-js-sdk';//引入微信sdk
import Vant from 'vant';
import 'vant/lib/index.css';

import Vconsole from 'vconsole'
let vConsole = new Vconsole();
Vue.use(vConsole)

Vue.prototype.$echarts = echarts 
Vue.prototype.$axios = Axios;
Vue.prototype.CHToPY = function (data) {
  return ucfirst(chineseToPinYin(data)).slice(0,1);
};
// 手机号码校验
Vue.prototype.checkPhone = function (data) {
  let reg = /^1[3456789]\d{9}$/;
  return (reg.test(data));
};
// 邮箱验证
Vue.prototype.checkEmail= function (data) {
  let reg =/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  return (reg.test(data));
};
// 身份证验证
Vue.prototype.checkIdNo= function (data) {
  let reg =  /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
  return (reg.test(data));
};
// 车牌号验证 
Vue.prototype.checkCarNum = function (data) {
  let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
  return (reg.test(data));
};
Vue.use(Vant);
Vue.use(htmlToPdf);
Vue.use(wxInfo);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>'
})
