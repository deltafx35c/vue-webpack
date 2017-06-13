<template>
	<div>
		<v-header showBackBtn="true" headTitle="hello world"></v-header>
		<div class="todoMsg">该组件还为完成</div>
        <v-footer></v-footer>
	</div>
</template>
<script>
	import vHeader from '../components/Header'
	import vFooter from '../components/Footer'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			vHeader,vFooter
		},
	}
</script>
<style scoped lang="scss">
	.todoMsg{position:fixed;top:40px;left:0;right:0;bottom:50px;}
</style>