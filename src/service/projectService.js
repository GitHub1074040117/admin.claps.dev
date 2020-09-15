import request from '../utils/request';

// 发送要要添加的项目信息
const sendNewProjectInfo = ({projectName, description, members, repoName, repoUrl, repoType, distribution}) => {
    return request.post('projects/add', {projectName, description, members, repoName, repoUrl, repoType, distribution});
};

// 请求项目表信息
const getProjectTable = () => {
    return request.get('projects/table');
};

// 根据项目id获取某个项目
const getProjectById = (projectId) => {
    return request.post('project/info', {projectId});
};

const getProjectByName = (projectName) => {
    return request.get('project/' + projectName + '/info');
};

const getProjectByUserName = (userName) => {
    return request.post('project/' + userName + '/user');
};

// 根据项目id删除项目
const deleteProject = (projectName) => {
    return request.post('project/' + projectName + '/delete');
};

export default {
    sendNewProjectInfo,
    getProjectTable,
    getProjectById,
    getProjectByName,
    getProjectByUserName,
    deleteProject,
};
