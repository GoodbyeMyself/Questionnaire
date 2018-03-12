// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/css/base.scss';
import './assets/css/common.scss';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import store from './store';
import httpRequest from './assets/js/ajax';

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.httpRequest = httpRequest;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
});
