<template>
	<div>
		<v-header showBackBtn="true" headTitle="动态"></v-header>
		<v-calendar :date="new Date()" @onTapDay="tapDay"></v-calendar>
		<mt-popup v-model="popupVisible" position="bottom">
			<div class="popup-box">
				<div class="list-box">
					<p>{{ymd}}：</p>
					<ul class="list">
						<li v-for="(item,index) in schedule" :key="index">{{item.content}}</li>
					</ul>
				</div>
			</div>
		</mt-popup>
        <v-footer></v-footer>
	</div>
</template>
<script>
	import vHeader from '../components/Header'
	import vFooter from '../components/Footer'
	import vCalendar from '../components/Calendar'
	export default {
		data() {
			return {
				ymd : '',
				popupVisible : false,
				schedule : []
			}
		},
		components: {
			vHeader,vFooter,vCalendar
		},
		methods: {
			tapDay(year,month,date){
				this.ymd = year + '年' + month + '月' + date + '日'
                this.popupVisible = true
				let url = '/api/schedule'
                this.$http.get(url,{params:{year:year,month:month,date:date}}).then((response) => {
                    this.$data.schedule = response.data.schedule
                }, (response) => {
                    console.log('oops, data is error')
                })
            }
		}
	}
</script>
<style scoped lang="scss">
	.list-box {
		width:100vw;padding:20px;box-sizing:border-box;max-height:50vh;overflow:auto;
		.list {
			
		}
	}
</style>