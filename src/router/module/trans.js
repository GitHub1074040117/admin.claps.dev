const transRouter = [
    {
        path: '/trans',
        name: 'trans',
        meta: {
            auth: true,
        },
        component: () => import('../../views/trans/Trans.vue'),
    },
    {
        path: '/transact/:name',
        name: 'transact',
        meta: {
            auth: true,
        },
        component: () => import('../../views/trans/transact/Transact.vue'),
    },
    {
        path: '/transactions',
        name: "transactions",
        meta: {
            auth: true,
        },
        component: () => import('../../views/trans/Transactions.vue'),
    },
    {
        path: '/transfers',
        name: "transfers",
        meta: {
            auth: true,
        },
        component: () => import('../../views/trans/Transfers.vue'),
    },
    {
        path: '/transfer/:name',
        name: 'transfer',
        meta: {
            auth: true,
        },
        component: () => import('../../views/trans/transfer/Transfer.vue'),
    },
];

export default transRouter;
