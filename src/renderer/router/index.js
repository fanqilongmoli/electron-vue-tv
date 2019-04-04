import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('@/components/home/HomeComponent').default
        },
        {
            path: '/play',
            name: 'play',
            component: require('@/components/play/PlayVideoComponent').default
        },
        {
            path: '/play2',
            name: 'play2',
            component: require('@/components/play/PlayVideoComponent2').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
