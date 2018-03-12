<template>
	<div>
		<Header></Header>
		<router-view></router-view>
        <Footer></Footer>
	</div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
export default {
	name: 'el-main',
	data () {
		return {
			msg: '主页'
		};
	},
	components: { Header, Footer }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

</style>
