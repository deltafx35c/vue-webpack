<template>
	<div>
		<v-header showBackBtn="true" headTitle="微博"></v-header>
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

</style>