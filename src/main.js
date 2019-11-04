import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import routes from './routes';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Buefy)

const router = new VueRouter({mode: 'history',routes});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');