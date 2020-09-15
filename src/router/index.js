import Vue from 'vue'
import VueRouter from 'vue-router'
import userRouter from "./module/user";
import store from '../store'
import transRouter from "./module/trans";
import projectRouter from "./module/project";
import adminRouter from "./module/admin";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'app',
        component: () => import('../views/login/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      // 元信息
      meta: {
        // true 代表这个路由需要认证
        auth: true,
      },
      component: () => import('../views/home/Home.vue')
    },

    ...projectRouter,
    ...userRouter,
    ...transRouter,
    ...adminRouter,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// to 代表要去的路由, from 代表从哪个路由过来
router.beforeEach((to, from, next) => {
  // 判断去的路由的auth 是否为真, 即是否需要认证

  if (to.meta.auth) {
    // 判断用户是否登录, token是否存在
    if (store.state.userModule.token) {
      next();
    } else {
      // 否则跳转登录
      alert("您还未登录！请先登录");
      router.push({name: "login"}).then(r => {
        console.log(r.meta)
      });
      next();
    }
  } else { // 不需要则通过
    next();
  }
});

export default router
