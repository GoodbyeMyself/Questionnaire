import axios from 'axios';
import { Message } from 'element-ui';
import Loading from './loading';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:3000/';
let loading = null;
let count = 0;

const countDown = () => {
	count = count > 0 ? --count : count;
	if (count < 1) {
		if (loading) {
			loading.destroy();
			loading = null;
		}
	}
};

// post请求序列化参数
axios.interceptors.request.use(config => {
	if (!loading) {
		loading = new Loading({
			loadingText: '登录中...'
		});
		loading.render();
	}
	count++;
	// 序列化post请求参数 post请求参数一律被转form格式数据
	if (config.method.toLocaleLowerCase() === 'post') {
		let fd = new FormData();
		for (var key in config.data) {
			fd.append(key, config.data[key]);
		}
		config.data = fd;
	}

	// get请求添加时间戳，防止IE下缓存
	if (config.method.toLocaleLowerCase() === 'get') {
		config.params._t = new Date().getTime();
	}

	return config;
}, error => {
	return Promise.reject(error);
});

// 返回数据处理
axios.interceptors.response.use(response => {
	// 等到所有接口都请求完成再去关闭loading
	countDown();
	if (!response.data.success) {
		Message.error(response.data.message);
		return Promise.reject(response.data.message);
	} else {
		return response.data;
	}
});

const ajax = (options) => {
	options.method = options.method || 'get';
	if (options.method.toLocaleLowerCase() === 'get') {
		// get请求
		return new Promise((resolve, reject) => {
			axios.get(options.url, {
				params: options.params || {}
			}).then(response => {
				resolve(response);
			}).catch(error => {
				// 等到所有接口都请求完成再去关闭loading
				countDown();
				reject(error);
			});
		});
	} else {
		// post请求
		return new Promise((resolve, reject) => {
			axios.post(options.url, options.params || {}).then(response => {
				resolve(response);
			}).catch(error => {
				// 等到所有接口都请求完成再去关闭loading
				countDown();
				reject(error);
			});
		});
	}
};

export default ajax;
