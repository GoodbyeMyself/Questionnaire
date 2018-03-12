import Vue from 'vue';
import { isNumber } from './utils';
/**
 * 货币格式化
 * currencyType 货币符号
 */
Vue.filter('formatPrice', function (value = '0', currencyType = '') {
	let res;
	if (value.toString().indexOf('.') === -1) {
		res = (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.00';
	} else {
		let prev = value.toString().split('.')[0];
		let next = value.toString().split('.')[1] < 10 ? value.toString().split('.')[1] + '0' : value.toString().split('.')[1];
		res = (prev || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + next;
	}
	return currencyType + res;
});

Vue.filter('toThousand', (value) => (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));

Vue.filter('numToDouble', function (index) {
	index = (index + 1 > 9) ? index + 1 : '0' + (index + 1);
	return index;
});

/**
 * 时间格式化
 * opera 时间间隔符 默认为-
 */
Vue.filter('formatTime', (value, opera = '-') => {
	if (!value) {
		return false;
	}

	if (!isNumber(value)) {
		throw new Error('时间戳只能为数字类型');
	}

	if (String(value).trim().length !== 13) {
		throw new Error('不是一个正确的时间戳');
	}

	return new Date(value).getFullYear() + opera + (new Date(value).getMonth() + 1) + opera + new Date(value).getDate();
});

/**
 * 将手机号码中间四位替换为星号
 * 18810432931 -> 188****2931
 */
Vue.filter('hiddenPhone', (value) => {
	if (!value) {
		return false;
	}
	return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
});
