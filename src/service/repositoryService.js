import request from '../utils/request';

// 为项目添加成员
const addRepository = (projectName, {description, repoName, repoType, repoUrl}) => {
    return request.post('project/' + projectName + '/addRepository', {description, repoName, repoType, repoUrl})
};

export default {
    addRepository,
};
