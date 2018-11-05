
import axios from 'axios';
import qs from 'qs';
import { getUser } from './user'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.token=getUser().user.token;
// axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;
// 请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log(config)
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, function (error) {
    return Promise.reject(error);
})
// 响应拦截器
axios.interceptors.response.use(function (response) {

    if(response.data.code=='1098'){
        location.href='/login'
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
})

export default {
    //get请求
    get(url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: param
            }).then(res => {
                resolve(res)
            })
        })
    },
    //post请求
    post(url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: param,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                resolve(res)
            })
        })
    },
    ajax(config) {
        if (config.method.toLowerCase() == 'get') {
            return this.get(config.url, config.data);
        } else {
            return this.post(config.url, config.data);
        }

    }
}
