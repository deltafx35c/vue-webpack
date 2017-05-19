<template>
	<div>
		<v-header showBackBtn="true" headTitle="hello world"></v-header>
		<p class="todoMsg">该组件还为完成</p>
		<v-menu></v-menu>
        <v-footer></v-footer>
	</div>
</template>
<script>
	import vHeader from '../components/Header'
	import vFooter from '../components/Footer'
	import vMenu from '../components/Menu'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			vHeader,vFooter,vMenu
		},
	}
</script>
<style scoped lang="scss">
	
</style>