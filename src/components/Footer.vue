<template>
	<footer>
	    <ul class="tab-list">
	    	<li>
				<router-link to="/photo" :class=" pathName == navUrl[0] ? 'active' : ''">
		    		<i class="iconfont">&#xe67f;</i><span>照片</span>
		    	</router-link>
	    		<!--<a v-on:click="showNav()" :class=" pathName == navUrl[0] ? 'active' : ''">
	    			<i class="iconfont">&#xe6a8;</i>
	    			<span>景区</span>
	    		</a>
	    		<transition name="slide-fade">
					<ul v-show="isShow" class="sub-nav">
						<li><router-link to="/todo">景区服务</router-link></li>
						<li><router-link to="/todo">虚拟景区</router-link></li>
					</ul>
				</transition>-->
	    	</li>
	    	<li>
		    	<router-link to="/todo" :class=" pathName == navUrl[1] ? 'active' : ''">
		    		<i class="iconfont">&#xe69e;</i><span>资源</span>
		    	</router-link>
	    	</li>
	    	<li>
	    		<router-link to="/home" :class=" pathName == navUrl[2] ? 'active' : ''">
	    			<i class="iconfont">&#xe6ca;</i>
	    		</router-link>
	    	</li>
	    	<li>
				<router-link to="/todo" :class=" pathName == navUrl[3] ? 'active' : ''">
					<i class="iconfont">&#xe675;</i><span>微博</span>
				</router-link>
	    	</li>
	    	<li>
	    		<router-link to="/cart" :class=" pathName == navUrl[4] ? 'active' : ''">
	    			<i class="iconfont">&#xe668;</i><span>下载</span>
	    		</router-link>
	    	</li>
	    </ul>
	</footer>
</template>
<script>
	export default {
		data() {
			return {
                showEvent: undefined,
				isShow: false,
				pathName : 'home',
				navUrl : ['photo', 'todo', 'home', 'todo', 'cart']
			}
		},
		created() {
			this.pathName = this.$route.name;
		},
		methods: {
			showNav() {
                clearTimeout(this.$data.showEvent);
				this.$data.isShow = true;
                this.$data.showEvent = setTimeout(() => {
                    this.$data.isShow = false;
                },4000)
			}
		}
	}
</script>

<style scoped lang="scss">
	footer {
        .tab-list {
			text-align: center;
            display: block;
            width: 100%;
            height: 50px;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 100;
			background:#fff;
			box-shadow: 2px 0 5px 2px rgba(0, 0, 0, 0.3);
            & > li {
                display: block;
                position: relative;
                float: left;
                width: 20%;
				height:100%;
				padding:5px;
                box-sizing: border-box;
                .iconfont {
                    display: block;
                    font-size: 22px;
                }
				& > a {
					display: block;
                    width: 100%;
                    height: 100%;
                    font-size: 12px;
                    color: #5D656B;
                    text-align: center;
                    &.active {
                        & > i, & > span {
                            color: #E50012;
                        }
                    }
                }
				&:nth-child(3) {
					.iconfont {
						font-size:40px;
						line-height:40px;
					}
				}
                
            }
		}
		.sub-nav {
			display: block;
			position: absolute;
			left: 2px;
			bottom: 140%;
			width: 125%;
			border-radius: 5px;
			background: #fff;
			filter: drop-shadow(0px 0px 4px #333);
			& > li {
				display: block;
				width: 100%;
				height: 35px;
				line-height: 35px;
			}
			& > li:not(:last-child) {
				border-bottom: 1px solid #999;
			}
		}
		.sub-nav:after {
			position: absolute;
			content: '';
			left: 38%;
			bottom: -14%;
			border: 10px solid ;
			border-color: #fff transparent transparent transparent;
		}
		// 菜单栏选中点击样式
		.slide-fade-enter-active {
		  transition: all .3s ease;
		}
		.slide-fade-leave-active {
		  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}
		.slide-fade-enter, .slide-fade-leave-to {
		  transform: translate3d(0, 100%, 0);
		  opacity: 0;
		}
	
	}
</style>