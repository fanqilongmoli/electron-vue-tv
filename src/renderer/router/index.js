import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            // name: 'landing-page',
            component: require('@/components/play/PlayVideoComponent').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
