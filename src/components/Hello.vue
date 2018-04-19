<template>
	<div>
		<h1>{{ msg }}</h1>
		<h2>测试页面1的内容</h2>
	</div>
</template>

<script>
export default {
	name: 'hello',

	data () {
		return {
			msg: '测试页面1'
		};
	},

	created () {
		
		this.httpRequest({
			url: '/api/initDemo',
			method: 'get'
		}).then(res => {
			console.log(res);
		});
	}

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
