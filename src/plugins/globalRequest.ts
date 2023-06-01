/**
 * 定义全局的网络请求工具
 */
import {extend} from 'umi-request';
import {NOT_LOGIN, SUCCESS} from "@/constants";
import {history} from "@@/core/history";
import {message} from "antd";

/**
 * 配置request请求时的默认参数;同时区分不同的生产环境：后端的环境
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  prefix: process.env.NODE_ENV === 'production' ?'http://user-backend.ming.top':'http://localhost:8080',

});


/**
 * 所有的请求拦截器
 */

request.interceptors.request.use((url, options): any => {
  console.log(`do request url = ${url}`)
  return {
    url,
    options: {
      ...options,
      headers: {},
    },
  };
});


/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response): Promise<any> => {
  const res = await response.clone().json();
  if(res.code === SUCCESS){
    return res.data;
  }

  if(res.code === NOT_LOGIN ){
    message.error("请先登录");
    const { query } = history.location;
    history.push({
      pathname: '/user/login',
      query,
    });
  }else{
    message.error(res.desc)
  }
  return res.data;

});
export default request;

