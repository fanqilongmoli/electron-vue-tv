import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueVideoPlayer from 'vue-video-player-videojs-7'
import 'video.js/dist/video-js.css'
import db from './db/datastore'

Vue.use(Element);
Vue.use(VueVideoPlayer);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
// 挂载 db
Vue.db = Vue.prototype.$db = db;
Vue.config.productionTip = false;

const errorHandler = (error, vm) => {
    this.$notify({
        title: '抛出全局异常',
        message: error,
        duration: 0
    });

};

Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error) => errorHandler(error, this);

/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    store,
    template: '<App/>'
}).$mount('#app');
