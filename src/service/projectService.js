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

// 请求项目成员信息
const getProjectMember = (projectName) => {
    return request.get('project/' + projectName + '/member');
};

// 请求项目仓库信息
const getProjectRepo = (projectName) => {
    return request.get('project/' + projectName + '/repo');
};


const getProjectByUserName = (userName) => {
    return request.post('project/' + userName + '/user');
};

// 根据项目id删除项目
const deleteProject = (projectName) => {
    return request.post('project/' + projectName + '/delete');
};

// 为项目添加一个成员
const addMemberByEmail = (projectName, memberEmail) => {
    return request.post('project/' + projectName + '/memberAdd', {memberEmail})
};

// 为项目添加一个成员
const addMemberByMixinId = (projectName, mixinId) => {
    return request.post('project/' + projectName + '/memberAdd', {mixinId})
};

// 根据成员id删除成员
const deleteProjectMember = (projectName, userId) => {
    return request.post('project/' + projectName + '/memberDelete', {userId})
};

// 为项目添加一个仓库
const addProjectRepo = ({projectId, description, slug, name, type}) => {
    return request.post('projects/repoAdd', {projectId, description, slug, name, type})
};

const deleteProjectRepo = (repoId) => {
    return request.post('projects/repoDelete', {repoId})
};

export default {
    sendNewProjectInfo,
    getProjectTable,
    getProjectById,
    getProjectByName,
    getProjectMember,
    getProjectRepo,
    getProjectByUserName,
    deleteProject,
    addMemberByEmail,
    addMemberByMixinId,
    deleteProjectMember,
    addProjectRepo,
    deleteProjectRepo,
};
