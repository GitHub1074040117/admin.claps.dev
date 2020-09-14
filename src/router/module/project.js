const projectRouter = [
    {
        path: '/project',
        name: 'project',
        meta: {
            auth: true,
        },
        component: () => import('../../views/project/Project.vue')
    },
    {
        path: '/project/:name',
        name: 'project/detail',
        meta: {
            auth: true,
        },
        component: () => import('../../views/project/detail/Detail.vue')
    },
    {
        path: '/project/:name/add-repository',
        name: 'add-repository',
        meta: {
            auth: true,
        },
        component: () => import('../../views/project/detail/Add-repository.vue')
    },
    {
        path: '/project/:name/add-member',
        name: 'add-member',
        meta: {
            auth: true,
        },
        component: () => import('../../views/project/detail/Add-member.vue')
    },
    {
        path: '/project/:name/addMember',
        name: 'addMember',
        meta: {
            auth: true,
        },
        component: () => import('../../views/project/AddMember.vue')
    },
    {
        path: '/project/:name/addRepository',
        name: 'addRepository',
        meta: {
            auth: true,
        },
        component: () => import('../../views/project/AddRepository.vue')
    },

    {
        path: '/projects/item',
        name: 'projects/item',
        meta: {
            auth: true,
        },
        component: () => import('../../views/project/item/Item.vue')
    },
    {
        path: '/projects/addProject',
        name: 'addProject',
        meta: {
            auth: true,
        },
        component: () => import('../../views/project/AddProject.vue')
    },
];

export default projectRouter;
