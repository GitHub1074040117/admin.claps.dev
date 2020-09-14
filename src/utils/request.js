import axios from 'axios';
import storageService from "../service/storageService";

const service = axios.create({
    // 读取api的环境变量
    baseURL: process.env.VUE_APP_BASE_URL,
    // 持续时间2分钟
    timeout: 1000 * 120,
    // token验证请求的有效性
    headers: { 'Authorization': `Bearer ${storageService.get(storageService.USER_TOKEN)}` },
});

export default service;
