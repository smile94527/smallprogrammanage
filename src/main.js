import Vue from 'vue'
import ElementUI from 'element-ui';
import html2canvas from 'html2canvas';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/assets/icon/iconfont.css'
import App from './App.vue'
import router from './router'
import store from './store'
// import Print from 'vue-print-nb'
import Print from './assets/plugs/print.js'
// import htmlToPdf from './assets/js/htmlToImg'
// import htmlToPdf from './assets/js/htmlToImg'
//plugs/print'
// Vue.use(Print) // 注册
// import commonUI from './common'
Vue.use(ElementUI);
Vue.use(Print); //注册 
Vue.use(html2canvas);
// Vue.use(commonUI);

// Vue.prototype.$center = new Vue;
// Vue.config.productionTip = false

// new Vue({
//     router,
//     store,
// render: h => h(App),
// }).$mount('#app')

Vue.prototype.$center = new Vue;
Vue.config.productionTip = false

new Vue({
    router,
    store,
    // htmlToPdf,
    render: h => h(App)
}).$mount('#app')