import axios from 'axios'
import { message } from 'antd'

/**
 * 能发送异步ajax请求的函数模块
 * 封装axios库
 * 函数的返回值是promise对象
 */

//ajax的三个参数，url，data，type
export default function ajax(url, data = {}, type = 'GET') {


    return new Promise((resolve, reject) => {
        let promise
        //判断传入的是什么请求就发送异步请求
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data
            })
            //post请求
        } else {
            promise = axios.post(url, data)
        }
        //判断是否成功
        promise.then(response => {
            resolve(response)
        }).catch(error => {
            message.error('请求出错了' + error.message)
        })
    })



}


