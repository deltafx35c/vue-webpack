<template>
	<div class="circle-menu">
        <mt-palette-button content="+" mainButtonStyle="color:#fff;background-color:#26a2ff;" @expand="main_log('expand')"
			@expanded="main_log('expanded')" @collapse="main_log('collapse')" class="pb" ref="target_1" :offset="+0.6">
			<router-link to="/home" class="my-icon-button indexicon iconfont">&#xe6a8;</router-link>
			<router-link to="/home" class="my-icon-button indexicon iconfont">&#xe6b2;</router-link >
			<router-link to="/home" class="my-icon-button indexicon iconfont">&#xe6b8;</router-link >
			<router-link to="/home" class="my-icon-button indexicon iconfont">&#xe67c;</router-link >
			<router-link to="/cart" class="my-icon-button indexicon iconfont">&#xe698;</router-link >
		</mt-palette-button>
		<v-touch class="handle-bar" v-on:panstart="onPanStart" v-on:panmove="onPanMove"  v-bind:pan-options="{threshold:100}"></v-touch>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				x : 300,
				y : 400
			}
		},
		created() {

		},
		methods: {
			main_log(val){
				//console.log('main-log',val)
			},
			sub_log(val){
				//console.log('sub-log',val)
				this.$refs.target_1.collapse()
			},
			_getCss(o,key){
				return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]
			},
			onPanStart(ev){
				let element = ev.target.parentNode;
				this.x = parseInt(this.$options.methods._getCss(element,'left'))
				this.y = parseInt(this.$options.methods._getCss(element,'top'))
			},
			onPanMove(ev){
				let element = ev.target.parentNode;
				this.$nextTick(function(){
					let left = this.x + ev.deltaX
					let top = this.y + ev.deltaY
					//console.log('deltaX:' + ev.deltaX+ ' deltaY:' + ev.deltaY) 
					element.style.left = left + 'px'
					element.style.top = top + 'px'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.circle-menu {
		position:fixed;left:300px;top:400px;
		.indexicon{width:30px;height:30px;line-height:30px;color:#fff;background-color:#26a2ff;border-radius:50%;}
		.handle-bar{width:20px;height:20px;top:-5px;right:-5px;position:absolute;border-top:#000 solid 1px;border-right:#000 solid 1px;
			&:before{position:absolute;content:'';width:12px;height:12px;left:4px;top:3px;border-top:#000 solid 1px;border-right:#000 solid 1px;}
			&:after{position:absolute;content:'';width:6px;height:6px;left:6px;top:7px;border-top:#000 solid 1px;border-right:#000 solid 1px;}
		}
	}
</style>