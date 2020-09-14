import request from '../utils/request';

// 为项目添加成员
const addMembers = (projectName, members) => {
    return request.post('project/' + projectName + '/addMembers', {members})
};

export default {
    addMembers,
};
