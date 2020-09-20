import request from '../utils/request';

// 用 loginService 来封装 axios 的方法

// 向后台申请第三方授权的Url
const getThirdAuthUrl = () => {
    return request.get('login/authUrl');
};

// 用户登录,将code传送给后端
const sendCode = ({Code}) => {
    return request.post('login/code', {Code})
};

// 获取用户信息
const getLoginInfo = () => {
    // 定义api，向后端发送请求
    return request.get('login/info');
};

// 验证Token有效性
const checkTokenAuth = () => {
    return request.get('login/authToken');
};

export default {
    getThirdAuthUrl,
    sendCode,
    getLoginInfo,
    checkTokenAuth,
};
