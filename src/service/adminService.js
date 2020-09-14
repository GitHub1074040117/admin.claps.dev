import request from '../utils/request';


// 获取管理员列表信息
const getAdminTable = () => {
    return request.get('admin/table');
};

// 发送要删除的管理员信息
const deleteAdmin = ({account}) => {
    return request.post('admin/delete', {account});
};

// 发送新创建的管理员信息
const addNewAdmin = ({name, account, role, avatarUrl}) => {
    return request.post('admin/add', {name, account, role, avatarUrl});
};

export default {
    getAdminTable,
    deleteAdmin,
    addNewAdmin,
};
