<template>
	<header>
		<span class="head-goback" v-if="showBackBtn" @click="$router.go(-1)">
			<i title="返回" class="iconfont">&#xe720;</i>
        </span>
        <span class="title" v-if="headTitle">{{headTitle}}</span>
		<div class="right-box">
			<i class="iconfont" v-on:click="onTapMenu">&#xe696;</i>
		</div>
        <transition name="fade">
			<div class="menu-box" v-show="showMenu">
				<slot>
					<div>该页面没有可选菜单</div>
				</slot>
			</div>
		</transition>
	</header>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		props: ['showBackBtn', 'headTitle','showMenu'],
		methods: {
			onTapMenu(){
				this.$emit('onTapMenu')
            },
		}
	}
</script>
<style scoped lang="scss">
	header {
		position: fixed;left: 0;top: 0;z-index: 100;width: 100%;height: 40px;line-height: 40px;color: #595757;background: #fff ;text-align: center;box-shadow: 0 2px 5px 2px rgba(0, 0, 0, .3);box-sizing: border-box;
		.title {
			font-size: 18px;font-weight: bold;
		}
		.head-goback {
			position: absolute;left: 4%;top: 50%;transform: translateY(-50%);
		}
		.right-box {
			position: absolute;right: 6%;top: 50%;transform: translateY(-50%);
		}
		.menu-box {
			 position:absolute;top:40px;right:0;padding:10px 20px;box-shadow: 0 2px 5px rgba(0, 0, 0, .3);background:#fff;
			 //transform: translateY(0);
		}
		.fade-enter-active, .fade-leave-active {
			transition: opacity .5s
		}
		.fade-enter, .fade-leave-to {
			opacity: 0
		}
	}
</style>