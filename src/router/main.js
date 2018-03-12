import HelloRouter from './hello';
import TestRouter from './test';
import ErrorRouter from './error';
export default {
	name: 'main',
	path: '/',
	component: r => require.ensure([], () => r(require('@/components/common/Main')), 'main'),
	children: [
		HelloRouter,
		TestRouter,
		ErrorRouter
	]
};
