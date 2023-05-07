import axios from 'axios';
// import { MessageBox } from 'element-ui';
// import store from '@/store';
import qs from 'qs';
import { getToken,removeToken } from '@/utils/auth';
// import { message } from '@/utils/resetMessage';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 2 * 1000, // request timeout
  credentials: true
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
      config.headers['Authorization'] = getToken();
    //   config.headers['X-Requested-With'] = 'XMLHttpRequest';
    // }
    // if (JSON.stringify(config.header) === '{}') { // header为空 ，默认请求头
    //     config.header = {
    //         "content-type": "application/x-www-form-urlencoded",
    //     }
    // }
    if (config.method === 'get') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      };
    }
    if (config.method === 'post' && Object.prototype.toString.call(config.data) !== '[object FormData]') {
      if (config.data) {
        if (config.headers['Content-Type'] === 'application/json') {
          config.data = JSON.stringify(config.data);
          return config;
        }
        for (var i in config.data) {
          if (config.data[i] === '') {
            delete config.data[i];
          }
        }
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    if (res.code !== 0) {
        // message({
        //     message: res.message || 'Error',
        //     type: 'error',
        //     duration: 5 * 1000
        // });
        
    }
    // if(res.code == "10101"){ // token 失效
    //   removeToken()
    // }
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 1) {
    //   message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   });
    //   if (res.code === '401') {
    //     // 未登录
    //     // window.open('http://120.24.78.29:8084/gps_web/d?c=logout', '_self');
    //     // window.open('http://47.108.106.234:8084/gps_web/d?c=logout', '_self');
    //     process.env.NODE_ENV === 'development' ? window.open('http://120.24.78.29:8084/gps_web/d?c=logout', '_self') : window.open(`${process.env.VUE_APP_BASE_API}d?c=logout`, '_self');
    //   }
    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 401) {
    //     // to re-login
    //     MessageBox.confirm('登录超时', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload();
    //       });
    //     });
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'));
    // } else {
    //   return res;
    // }
    return res
  },
  error => {
    console.log('err' + error); // for debug
    // message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // });
    return Promise.reject(error);
  }
);

export default service;
