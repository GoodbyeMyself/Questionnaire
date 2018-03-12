export default {
	name: 'error',
	path: '*',
	component: r => require.ensure([], () => r(require('@/components/common/Error')), 'error')
};
