import Axios from 'axios'
import { Toast } from 'vant';
import router from "../router";
const apiUrl = 'http://www.fundsales.cn/dudaibao/';//测试域名，自己改成自己的
// const apiUrl = 'http://www.i-agent.cn/dudaibao/';
// const apiUrl = 'http://www.dudaibao.cn/dudaibao/';//线上域名，自己改成自己的
/*
* 超时时间
*/
Axios.defaults.timeout = 20000;
Axios.defaults.baseURL = apiUrl
/*
* http请求拦截器
*/

var loadinginstace;
Axios.interceptors.request.use(config => {
    // 获取token
    let token = window.localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = '_TOKEN_ '+ `${token}`;
    }
    if(config.params) {
        if (config.params.noLoadMask) {

        } else {
            Toast.loading({
                duration: '0',
                mask: true,
                message: '加载中...'
            });
        }
    }
    return config
}, error => {
    Toast.clear();
    Toast.fail('请求失败');
    return Promise.reject(error)
});

/*
* http响应拦截器
*/
Axios.interceptors.response.use(data => {
    // 响应成功关闭loading
    Toast.clear();
    const code = data.data.code;
    const msg = data.data.msg;
    if (code == '999') { //未登录
        window.localStorage.removeItem('token');
        let url = window.location.href;
        Toast('未登录，请先登录');
        setTimeout(function () {
            router.push({
                path:'/login',
                query:url
            });
        }, 0)
    } else if (code == 0) {
        if (data.data.data.token) {
            window.localStorage.setItem('token',data.data.data.token);
        }
    } else {
        Toast.fail(msg);
    } 
    return data;
}, error => {
    Toast.clear();
    Toast.fail('请求失败');
    return Promise.reject(error);
})
