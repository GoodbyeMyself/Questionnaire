export default {
	name: 'test',
	path: 'test',
	component: r => require.ensure([], () => r(require('@/components/Test')), 'test')
};
