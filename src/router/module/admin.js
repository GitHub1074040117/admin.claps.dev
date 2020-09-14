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
        component: () => import('../../views/admin/item/Item.vue')
    },
];

export default adminRouter;
