import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CodeSet from '../views/code_set.vue'
import Content from '../views/content.vue'

const routes = [
    {
        path: '/zzq',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: '/zzq/CodeSet',
                name: "CodeSet",
                component: CodeSet,
            },
            {
                path: '/zzq/Content/:code',
                name: "Content",
                component: Content,
            },
        ]
    },
    {
        path: '/Content/:code',
        name: 'Content',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/content')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
