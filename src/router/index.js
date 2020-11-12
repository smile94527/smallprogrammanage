import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Index from '../components/index.vue'
// import aa from '../components/competition/pothunterPage.vue'
import Cookies from 'js-cookie'
Vue.use(Router);
const router = new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login,
        },
        {
            path: '/Index',
            name: 'Index',
            component: Index,
            meta: { title: '主页' },
            children: [{
                    path: '/teamPage',
                    name: 'teamPage',
                    component: resolve => require(['../components/Home.vue'], resolve),
                    meta: { title: '项目清单' }
                },
                {
                    path: '/pothunterPage',
                    name: 'pothunterPage',
                    component: resolve => require(['../components/competition/pothunterPage.vue'], resolve),
                    meta: { title: '人员清单' }
                },
                {
                    path: '/eventmanagePage',
                    name: 'eventmanagePage',
                    component: resolve => require(['../components/competition/eventManagement.vue'], resolve),
                    meta: { title: '赛事管理' }
                },
                {
                    path: '/competitionGroupsManagePage',
                    name: 'competitionGroupsManagePage',
                    component: resolve => require(['../components/competition/competitionGroupsManage.vue'], resolve),
                    meta: { title: '赛事组别管理' }
                },
                {
                    path: '/CostManagePage',
                    name: 'CostManagePage',
                    component: resolve => require(['../components/competition/CostManage.vue'], resolve),
                    meta: { title: '费用管理' }
                },
                {
                    path: '/HomePageManagemenPage',
                    name: 'HomePageManagemenPage',
                    component: resolve => require(['../components/SystemManage/HomePageManagemen.vue'], resolve),
                    meta: { title: '首页图片管理' }
                },
                //出行服务
                {
                    path: '/ProjectList',
                    name: 'ProjectList',
                    component: resolve => require(['../components/TravelService/ProjectList.vue'], resolve),
                    meta: { title: '项目清单' }
                },
                {
                    path: '/pothunterCXPage',
                    name: 'pothunterCXPage',
                    component: resolve => require(['../components/TravelService/pothunterPage.vue'], resolve),
                    meta: { title: '报名清单' }
                },
                {
                    path: '/eventmanageCXPage',
                    name: 'eventmanageCXPage',
                    component: resolve => require(['../components/TravelService/eventManagement.vue'], resolve),
                    meta: { title: '赛事管理' }
                },
                {
                    path: '/competitionGroupsManageCXPage',
                    name: 'competitionGroupsManageCXPage',
                    component: resolve => require(['../components/TravelService/competitionGroupsManage.vue'], resolve),
                    meta: { title: '赛事组别管理' }
                },
                {
                    path: '/CostManageCXPage',
                    name: 'CostManageCXPage',
                    component: resolve => require(['../components/TravelService/CostManage.vue'], resolve),
                    meta: { title: '费用管理' }
                },

                {
                    path: '/GameAttributeManagementPage',
                    name: 'GameAttributeManagementPage',
                    component: resolve => require(['../components/SystemManage/GameAttributeManagement.vue'], resolve),
                    meta: { title: '报名信息管理' }
                },

            ]
        },
        {
            path: '/PictureManagementPage',
            name: 'PictureManagementPage',
            component: resolve => require(['../components/competition/Picture_management.vue'], resolve),
            meta: { title: '赛事介绍' }
        },
        {
            path: '/PictureManagementCXPage',
            // path: '/PictureManagementPage',
            name: 'PictureManagementCXPage',
            component: resolve => require(['../components/TravelService/Picture_management.vue'], resolve),
            meta: { title: '出行服务介绍' }
        },
        {
            path: '/dictionaryPage',
            name: 'dictionaryPage',
            component: resolve => require(['../components/SystemManage/dictionary.vue'], resolve),
            meta: { title: '字典管理' }
        },
        // {
        //     path: '/Home',
        //     name: 'Home',
        //     meta: { title: '团队页面' },
        //     component: Home,

        // },

    ]
});
export default router;

router.beforeEach((to, from, next) => {
    const nextRoute = ['manage'];
    let _cookie = Cookies.get();
    if (nextRoute.indexOf(to.name) >= 0) { //判断该页面是否需要登陆
        if (!_cookie.TokenKey) { //判断登陆状态
            next({ name: 'Login' }) //如果未登录，则跳转到登录页
        } else {
            next() //如果已经登陆，那就可以跳转
        }
    } else { //其他的无需登陆的页面不做验证
        next()
    }
})