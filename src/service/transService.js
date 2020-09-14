import request from '../utils/request';

// 请求捐赠流水列表信息
const getTransactTable = () => {
    return request.get('trans/transactTable');
};

// 请求提现记录列表信息
const getTransferTable = () => {
    return request.get('trans/transferTable');
};

// 请求项目捐赠流水记录
const getTransactions = (projectName) => {
    return request.post('trans/' + projectName + '/transactions');
};

// 请求用户提现记录
const getTransfers = (userName) => {
    return request.post('trans/' + userName + '/transfers');
};

// 获取所有捐赠流水记录
const getAllTransactions = () => {
    return request.get('transactions/all');
};

// 获取所有提现记录
const getAllTransfers = () => {
    return request.get('transfers/all');
};

export default {
    getAllTransfers,
    getTransactTable,
    getTransferTable,
    getTransactions,
    getTransfers,
    getAllTransactions,
};
