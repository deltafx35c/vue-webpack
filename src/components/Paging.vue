<template>
	<div id="paging" v-show="this.$props.totalPage > 1">
		<a class="page-link" v-show="showFirstLink" @click="onPageClick(1)"><<</a>
		<a class="page-link" v-show="showPrevLink" @click="onPageClick(page - 1)"><</a>
		<span class="page-ellipsis" v-show="showFrontEllipsis">...</span>
		<a :class="['page-link',{current:page.current}]" v-for="page in pages" :key="page.page"  v-text="page.page" @click="onPageClick(page.page)"></a>
		<span class="page-ellipsis" v-show="showEndEllipsis">...</span>
		<a class="page-link" v-show="showNextLink" @click="onPageClick(page + 1)">></a>
		<a class="page-link" v-show="showLastLink" @click="onPageClick(totalPage)">>></a>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				extendPageCount : 2
			}
		},
		props: ['totalPage', 'page'],
		computed:{
			pages(){
				let arr = []
				let page = parseInt(this.$props.page)
				let totalPage = parseInt(this.$props.totalPage)
				let flen = page - 1
				let elen = totalPage - page
				let fcount,ecount
				let extendPageCount = this.extendPageCount
				if (flen < extendPageCount) {
					fcount = flen
					ecount = Math.min(extendPageCount * 2 - flen,elen)
				} else if(elen < extendPageCount){
					ecount = elen
					fcount = Math.min(extendPageCount * 2 - elen,flen)
				} else {
					fcount = extendPageCount
					ecount = extendPageCount
				}
				for (let i=fcount;i>0;i--){
					arr.push({page:page - i})
				}
				arr.push({page:page,current:true})
				for (let i=1;i<=ecount;i++){
					arr.push({page:page + i})
				}
				return arr
			},
			showFrontEllipsis(){
				return this.$props.totalPage > this.extendPageCount * 2 + 1 && this.$props.page - this.extendPageCount > 1
			},
			showEndEllipsis(){
				return this.$props.totalPage > this.extendPageCount * 2 + 1 && this.$props.totalPage - this.extendPageCount > this.$props.page
			},
			showFirstLink(){
				return this.$props.page != 1
			},
			showPrevLink(){
				return this.$props.page != 1
			},
			showNextLink(){
				return this.$props.page != this.$props.totalPage
			},
			showLastLink(){
				return this.$props.page != this.$props.totalPage
			}
		},
		created() {

		},
		methods: {
			onPageClick(newPage){
				this.$emit('changePage',newPage)
			}
		}
	}
</script>

<style scoped lang="scss">
	#paging {
		margin-bottom:20px;
		.page-link,.page-ellipsis{padding:0 5px;color:#26a2ff;font-size:18px;}
		.current{color:red;}
	}
</style>