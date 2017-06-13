<template>
	<div class="circle-menu">
        <mt-palette-button content="+" mainButtonStyle="color:#fff;background-color:#26a2ff;" @expand="main_log('expand')"
			@expanded="main_log('expanded')" @collapse="main_log('collapse')" class="pb" ref="target_1" :offset="Math.PI / 12">
			<div class="indexicon iconfont" @click="jump(0)">&#xe6a8;</div>
			<div class="indexicon iconfont" @click="jump(1)">&#xe6b2;</div>
			<div class="indexicon iconfont" @click="jump(2)">&#xe6b8;</div>
			<div class="indexicon iconfont" @click="jump(3)">&#xe67c;</div>
			<div class="indexicon iconfont" @click="jump(4)">&#xe698;</div>
		</mt-palette-button>
		<v-touch class="handle-bar" @panstart="onPanStart" @panmove="onPanMove"  :pan-options="{threshold:100}"></v-touch>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				paths : ['todo','todo','home','todo','cart'],
				x : 100,
				y : 200
			}
		},
		created() {

		},
		methods: {
			main_log(val){
				//console.log('main-log',val)
			},
			jump(index){
				this.$refs.target_1.collapse()
				this.$router.push(this.paths[index])
			},
			_getCss(o,key){
				return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]
			},
			onPanStart(ev){
				let element = ev.target.parentNode
				this.x = parseInt(this.$options.methods._getCss(element,'left'))
				this.y = parseInt(this.$options.methods._getCss(element,'top'))
			},
			onPanMove(ev){
				let element = ev.target.parentNode
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
		position:fixed;left:100px;top:200px;
		.indexicon{width:30px;height:30px;line-height:30px;color:#fff;background-color:#26a2ff;border-radius:50%;}
		.handle-bar{width:20px;height:20px;top:-5px;right:-5px;position:absolute;border-top:#000 solid 1px;border-right:#000 solid 1px;
			&:before{position:absolute;content:'';width:12px;height:12px;left:4px;top:3px;border-top:#000 solid 1px;border-right:#000 solid 1px;}
			&:after{position:absolute;content:'';width:6px;height:6px;left:6px;top:7px;border-top:#000 solid 1px;border-right:#000 solid 1px;}
		}
	}
</style>