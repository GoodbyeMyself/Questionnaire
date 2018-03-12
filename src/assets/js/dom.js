import { isObject } from './utils';

/**
 * 判断一个元素是否包含某个类名
 * @param    {HTMLElement}    elem   元素对象
 * @param    {string}         className  待查找的类名
 * @return   {boolean}        true | false
 */
export const hasClass = (elem, className) => {
	if (!elem || !className) {
		throw new Error('缺少元素或类名');
	}
	if (className.indexOf(' ') !== -1) {
		throw new Error('要查找的类名中不能包含有空格');
	}
	if (elem.classList) {
		return elem.classList.contains(className);
	} else {
		return elem.className.trim().indexOf(className) > -1;
	}
};

/**
 * 向一个元素添加类名
 * @param    {HTMLElement}      elem      元素对象
 * @param    {string}           className 待添加的类名
 * @return   {undefined}
 */
export const addClass = (elem, className) => {
	if (!elem || !className) {
		throw new Error('缺少元素或类名');
	}
	let classNames = (className || '').split(' ');
	for (let i = 0, len = classNames.length; i < len; i++) {
		let cls = classNames[i];
		if (elem.classList) {
			elem.classList.add(cls);
		} else {
			elem.className += ' ' + cls;
		}
	}
};
/**
 * 从一个元素中删除类名
 * @param    {HTMLElement}                 elem     元素对象
 * @param    {string}                 className  要删除的类名
 * @return   {undefined}
 */
export const removeClass = (elem, className) => {
	if (!elem || !className) {
		throw new Error('缺少元素或类名');
	}
	let classNames = (className || '').split(' ');
	for (let i = 0, len = classNames.length; i < len; i++) {
		let cls = classNames[i];
		if (elem.classList) {
			elem.classList.remove(cls);
		} else if (hasClass(elem, cls)) {
			elem.className = elem.className.trim().replace(' ' + cls + ' ', ' ');
		}
	}
};
/**
 * 对一个元素添加样式
 * @param    {HTMLElement}                 elem   元素对象
 * @param    {Object}                 styles 样式 { color: #333; }
 * @return   {undefined}
 */
export const setStyle = (elem, styles) => {
	if (!elem) {
		throw new Error('缺少元素');
	}
	if (!isObject(styles)) {
		throw new Error('样式必须以对象的格式传递');
	}
	for (let key in styles) {
		elem.style[key] = styles[key];
	}
};
/**
 * 获取样式
 * @param    {HTMLElement}                 elem  元素对象
 * @param    {string}                 style 要获取的样式，比如：color、fontSize
 * @return   {[type]}                       [description]
 */
export const getStyle = (elem, style) => {
	if (!elem || !style) {
		throw new Error('缺少元素或样式名称');
	}
	try {
		let getComputed = document.defaultView.getComputedStyle(elem, '');
		return elem.style[style] || getComputed ? getComputed[style] : null;
	} catch (e) {
		return elem.style[style];
	}
};
