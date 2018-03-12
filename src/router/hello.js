export default {
	name: 'hello',
	path: 'hello',
	component: r => require.ensure([], () => r(require('@/components/Hello')), 'hello')
};
