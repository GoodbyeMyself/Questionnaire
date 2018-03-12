// 判断目标是否为对象
export const isObject = target => Object.prototype.toString.call(target).slice(8, -1) === 'Object';
// 判断是否为字符串
export const isString = target => typeof target === 'string';
// 判断是否为数值
export const isNumber = target => typeof target === 'number';
// 判断是否为null
export const isNull = target => Object.prototype.toString.call(target).slice(8, -1) === 'Null';
// 判断是否为undefined
export const isUndefined = target => Object.prototype.toString.call(target).slice(8, -1) === 'Undefined';
// 判断是否为数组
export const isArray = target => Object.prototype.toString.call(target).slice(8, -1) === 'Array';
// 判断是否为布尔值
export const isBool = target => Object.prototype.toString.call(target).slice(8, -1) === 'Boolean';
// 判断一个对象是否为空对象（即无可枚举的属性）
export const isEmpty = target => {
	if (isNull(target)) {
		return true;
	}
	return !Object.keys(target).length;
};

// 使用localStorage
export const storage = {
	set: (key, value) => {
		if (isObject(value) || isArray(value)) {
			value = JSON.stringify(value);
		};
		localStorage.setItem(key, value);
	},
	get: (key) => {
		return localStorage.getItem(key);
	},
	remove: (key) => {
		localStorage.removeItem(key);
	},
	clear: () => {
		localStorage.clear();
	},
	self: () => {
		return localStorage;
	}
};

// 使用sessionStorage
export const store = {
	set: (key, value) => {
		if (isObject(value) || isArray(value)) {
			value = JSON.stringify(value);
		};
		sessionStorage.setItem(key, value);
	},
	get: (key) => {
		return sessionStorage.getItem(key);
	},
	remove: (key) => {
		sessionStorage.removeItem(key);
	},
	clear: () => {
		sessionStorage.clear();
	},
	self: () => {
		return sessionStorage;
	}
};

/**
 * 将数值四舍五入后格式化.
 * @param num 数值(Number或者String)
 * @param cent 要保留的小数位(Number)
 * @param isThousand 是否需要千分位 0:不需要,1:需要  (数值类型);
 * @return 格式的字符串,如'1,234,567.45'
 * @type String
 */
export const formatNumber = (num, cent, isThousand) => {
	num = num.toString().replace(/\$|,/g, '');
	// 检查传入数值为数值类型
	if (isNaN(num)) {
		num = '0';
	}

	// 获取符号(正/负数)
	let sign = (num === (num = Math.abs(num)));

	num = Math.floor(num * Math.pow(10, cent) + 0.50000000001); // 把指定的小数位先转换成整数.多余的小数位四舍五入
	let cents = num % Math.pow(10, cent); // 求出小数位数值
	num = Math.floor(num / Math.pow(10, cent)).toString(); // 求出整数位数值
	cents = cents.toString(); // 把小数位转换成字符串,以便求小数位长度

	// 补足小数位到指定的位数
	while (cents.length < cent) {
		cents = '0' + cents;
	}

	if (isThousand) {
		// 对整数部分进行千分位格式化.
		for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
			num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
		}
	}

	if (cent > 0) {
		return (((sign) ? '' : '-') + num + '.' + cents);
	} else {
		return (((sign) ? '' : '-') + num);
	}
};

/**
 * @type String
 * 去除千分位/字符串类型转化为数字类型.
 * 如'1,234,567.45' 转化为 ‘1234567.45’
 * 如'1213444,444' 转化为 1213444,444’
 * @return 格式的数字类型,
 */
export const delcommafy = (num) => {
	if ((num + '').trim() === '') {
		return '';
	}
	return parseFloat(num.replace(/,/gi, ''));
};

/**
 * 补位字符串
 * @param {string}  str 需要补位的字符串
 * @param {number}  len 补位后字符串的长度（即你想补位后的字符串的长度，不是需要补位的长度）
 *                     比如 a -> aaaaa，补了4个a，但是len值应该为5，而不是4
 * @param {string}  location 在什么地方补位（前 或 后） before | after , 如果不传递默认在字符串后补位
 * @param {string}  value 用什么来补位字符串
 * @return {string}  补位后的字符串
 */
export const fillString = (str, len, value, location = 'after') => {
	if (!isString(str)) {
		str = String(str);
	}
	if (!len || !isNumber(len)) {
		throw new Error('补位后字符串的长度没有传递或类型不正确');
	}
	if (!isString(value)) {
		throw new Error('补位的字符必须是字符串类型');
	}
	if (location === 'after') {
		return str.padEnd(len, value);
	} else {
		return str.padStart(len, value);
	}
};

/**
 * 浮点值的运算-加法
 */
export const accAdd = (arg1, arg2) => {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split('.')[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split('.')[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
};

/**
 * 浮点值的运算-减法
 */
export const accSub = (arg1, arg2) => {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split('.')[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split('.')[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	// last modify by deeka
	// 动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
};

/**
 * 浮点值的运算-乘法
 */

export const accMul = (arg1, arg2) => {
	var m = 0;
	var s1 = arg1.toString();
	var s2 = arg2.toString();
	try {
		m += s1.split('.')[1].length;
	} catch (e) { }
	try {
		m += s2.split('.')[1].length;
	} catch (e) { }
	return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
};

/**
 * 浮点值的运算-除法
 */

export const accDiv = (arg1, arg2) => {
	var t1 = 0;
	var t2 = 0;
	var r1, r2;
	try {
		t1 = arg1.toString().split('.')[1].length;
	} catch (e) { }
	try {
		t2 = arg2.toString().split('.')[1].length;
	} catch (e) { }
	r1 = Number(arg1.toString().replace('.', ''));
	r2 = Number(arg2.toString().replace('.', ''));
	return (r1 / r2) * Math.pow(10, t2 - t1);
};

/**
 * 将一个字符串转换为千分位格式
 * @param {string} str 需要转换的字符串
 * @param {string}  currency 货币符号，默认为空
 * @return   {string}     转换后的值
 */

export const toThousand = (str, currency = '') => {
	if (!isString(str)) {
		throw new Error('需要转换的对象必须是字符串类型');
	}
	let reg = /(?=(?!(\b))(\d{3})+$)/g;
	str = currency + str.replace(reg, ',');
	return str;
};

/**
 * 将一个时间戳转换为可读的日期方式
 * @param    {number}  date 时间戳
 * @param    {string} type 默认既包含日期也包含时间 date_time, date, time
 * @param {string} character 格式化间隔符号 [-, /, false]如果传递false则返回xxxx年xx月xx日
 * @return   {string}       格式化后的日期  2018-01-31 15:01:02 || 2018-01-31 || 15:01:02
 */

export const formatDate = (timeStamp, type = 'date_time', character = '-') => {
	if (!isNumber(timeStamp) && String(timeStamp).length !== 13) {
		throw new Error('值不是一个正确的时间戳');
	}
	if ((['-', '/', false].indexOf(character) === -1)) {
		throw new Error('间隔符号不支持');
	}
	let group = {
		y: new Date(timeStamp).getFullYear(),
		m: fillString(new Date(timeStamp).getMonth() + 1, 2, '0', 'before'),
		d: fillString(new Date(timeStamp).getDate(), 2, '0', 'before'),
		h: fillString(new Date(timeStamp).getHours(), 2, '0', 'before'),
		mi: fillString(new Date(timeStamp).getMinutes(), 2, '0', 'before'),
		s: fillString(new Date(timeStamp).getSeconds(), 2, '0', 'before')
	};
	if (type === 'date_time') {
		return character ? `${group.y}${character}${group.m}${character}${group.d} ${group.h}:${group.mi}:${group.s}` : `${group.y}年${group.m}月${group.d}日 ${group.h}:${group.mi}:${group.s}`;
	} else if (type === 'date') {
		return character ? `${group.y}${character}${group.m}${character}${group.d}` : `${group.y}年${group.m}月${group.d}日`;
	} else if (type === 'time') {
		return `${group.h}:${group.mi}:${group.s}`;
	}
};

/**
 * 将手机号码中间替换为星号 *
 * @param    {string} phoneNumber 手机号码字符串
 * @return   {string} 替换后的手机号码
 */

export const formatPhone = phoneNumber => {
	phoneNumber = phoneNumber.toString().trim();
	let phone = Number(phoneNumber);
	if (isNaN(phone) || phoneNumber.length !== 11) {
		throw new Error('不是手机号码');
	}
	return String(phoneNumber).replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
};

/**
 * 将人民币金额转换为大写 同时支持小数、负数
 * @param    {string}  price 金额小写，不带人民币符号
 * @return   {string} 转换后的大写人民币
 */

export const convertPrice = price => {
	if (isNaN(Math.abs(price))) {
		throw new Error('你确定你传递的是金额？');
	}
	let fraction = ['角', '分'];
	let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	let unit = [
		['元', '万', '亿'],
		['', '拾', '佰', '仟']
	];
	let head = price < 0 ? '欠' : '';
	price = Math.abs(price);
	let s = '';
	for (let i = 0; i < fraction.length; i++) {
		s += (digit[Math.floor(price * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
	}
	s = s || '整';
	price = Math.floor(price);
	for (let i = 0; i < unit[0].length && price > 0; i++) {
		let p = '';
		for (let j = 0; j < unit[1].length && price > 0; j++) {
			p = digit[price % 10] + unit[1][j] + p;
			price = Math.floor(price / 10);
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	}
	return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
};

/**
 * 设置 cookie 值的函数
 */

export const setCookie = (cname, cvalue, exdays) => {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = 'expires=' + d.toGMTString();
	document.cookie = cname + '=' + encodeURIComponent(cvalue) + '; ' + expires;
};

/**
 * 获取 cookie 值的函数
 */
export const getCookie = (cname) => {
	var name = cname + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name) === 0) return decodeURIComponent(c.substring(name.length, c.length));
	}
	return '';
};
