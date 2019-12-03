import wx from 'weixin-js-sdk';//引入微信sdk
import Axios from 'axios'
import Router from 'vue-router'
export default{
    install (Vue, options) {
        Vue.prototype.wxInfo = function (info) {
            // 请求微信分享的数据
            let thisUrl = window.location.href.split('#')[0];
            Axios.get('wxshare.do',{
                params:{
                    url: thisUrl,
                    empNo: window.localStorage.getItem('empNo'),
                    subject: info.title,
                    noLoadMask: true
                }
            })
            .then(res=>{
                wxInit(res.data.data);
            })
            .catch(err=>{
                console.log(err)
            })
             // 微信分享
            function wxInit (res) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
                    appId: res.appId, // 必填，公众号的唯一标识
                    timestamp: res.timestamp,// 必填，生成签名的时间戳
                    nonceStr: res.noncestr,// 必填，生成签名的随机串
                    signature: res.signature,// 必填，签名，
                    jsApiList: ['updateAppMessageShareData'] // 必填，需要使用的JS接口列表，
                });
                let share_config = {
                    "imgUrl": res.imgUrl,
                    "desc": info.desc,
                    "title": info.title,
                    "link": info.link,
                    "success": function () {
                        //设置成功后的回调函数
                    }
                };
                wx.ready(function (){
                    console.log(share_config)
                    wx.updateAppMessageShareData(share_config);
                })
                // 验证失败
                wx.error(function(err) {
                    // alert(JSON.stringify(err))
                });
            }
        }
    }
}