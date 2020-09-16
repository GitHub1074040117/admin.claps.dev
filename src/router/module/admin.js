const adminRouter = [
    {
        path: '/admin',
        name: 'admin',
        meta: {
            auth: true,
        },
        component: () => import('../../views/admin/Admin.vue')
    },

    {
        path: '/admin/item',
        name: 'admin/item',
        meta: {
            auth: true,
        },
        component: () => import('../../views/admin/Item.vue')
    },
    {
        path: '/addAdmin',
        name: 'addAdmin',
        meta: {
            auth: true,
        },
        component: () => import('../../views/admin/AddAdmin.vue')
    },
];

export default adminRouter;
