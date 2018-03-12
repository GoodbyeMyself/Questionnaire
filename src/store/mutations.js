import httpRequest from '../assets/js/ajax';

// 修改计数器
export const C_OUNT = (state, n) => {
	state.count = n;
};

// 获取教师端数据
export const GET_TEST = (state) => {
	httpRequest({
		url: '/api/initTest',
		method: 'get'
	}).then(res => {
		state.testData = res.result;
		console.log(res);
		C_OUNT(state, 8);
	});
};
