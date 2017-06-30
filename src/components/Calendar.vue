 <template>
	<div class="carlendar">
		<div class="controller">
			<a class="label">
				<p class="yyyy">{{ currentMonthObj.year }}年</p>
				<p class="mm">{{ currentMonthObj.month }}月</p>
			</a>
			<div class="to-mark"> ~ </div>
			<a class="label">
				<p class="yyyy">{{ nextMonthObj.year }}年</p>
				<p class="mm">{{ nextMonthObj.month }}月</p>
			</a>
			<a class="btn prev"  @click="changeMonth(-1)"></a>
			<a class="btn next"  @click="changeMonth(1)"></a>
		</div>
		<ul class="month title">
			<li>
				<p>SUN</p>
				<p>日</p>
			</li>
			<li>
				<p>MON</p>
				<p>一</p>
			</li>
			<li>
				<p>TUE</p>
				<p>二</p>
			</li>
			<li>
				<p>WED</p>
				<p>三</p>
			</li>
			<li>
				<p>THU</p>
				<p>四</p>
			</li>
			<li>
				<p>FRI</p>
				<p>五</p>
			</li>
			<li>
				<p>SAT</p>
				<p>六</p>
			</li>
		</ul>
		<ul class="month body">
			<li v-for="(n,index) in currentMonthObj.daysPrev" :key="index + '_CMDP'"></li>
			<li :class="{today: item.isToday}" v-for="(item,index) in currentMonthObj.items" :key="index + '_CMI'" @click="tapDay(currentMonthObj.year,currentMonthObj.month,item.date)">
				<p><span class="date">{{ item.date }}</span></p>
				<p :class="{'red-day': item.isRedDay}"><span class="lunar">{{item.lunar}}</span></p>
				<!--<p class="count expectation">{{ item.expectationCount }}</p>-->
				<p class="count current">{{ item.currentCount }}</p>
			</li>
			<li v-for="(n,index) in currentMonthObj.daysNext" :key="index + '_CMDN'"></li>
		</ul>
		<ul class="month body">
			<li v-for="(n,index) in nextMonthObj.daysPrev" :key="index + '_NMDP'"></li>
			<li :class="{today: item.isToday}" v-for="(item,index) in nextMonthObj.items" :key="index + '_NMI'" @click="tapDay(nextMonthObj.year,nextMonthObj.month,item.date)">
				<p><span class="date">{{ item.date }}</span></p>
				<p :class="{'red-day': item.isRedDay}"><span class="lunar">{{item.lunar}}</span></p>
				<!--<p class="count expectation">{{ item.expectationCount }}</p>-->
				<p class="count current">{{ item.currentCount }}</p>
			</li>
			<li v-for="(n,index) in nextMonthObj.daysNext" :key="index + '_NMDN'"></li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showDate : null,
				currentMonthObj : {},
				nextMonthObj : {}
			}
		},
		props: ['date'],
		created() {
			
		},
		mounted() {
            // 页面初始化时加载数据
            this.init();
        },
		methods: {
			init(){
				this.showDate = this.date || new Date();
				this.changeMonth(0);
			},
			getMonthObj(currentDate){
				let monthObj = {};
				let year = currentDate.getFullYear();
				let month = currentDate.getMonth();
				let day = currentDate.getDay();
				let d = new Date(year,month+1,1);
				d.setDate(d.getDate() - 1);
				let items = [];
				let today = new Date();
				for (let i=1;i<=d.getDate();i++){
					let item = {};
					item.date = i;
					// item.expectationCount = "-";
					item.currentCount = "-";
					item.isToday = false;
					if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()){
						item.date = "今";
						item.isToday = true;
					}
					let lunarInfo = this.$calendar.solarToLunar(year,month + 1,i);

					if (lunarInfo.Term){
						item.lunar = lunarInfo.Term
					} else {
						if( lunarInfo.IDayCn=="初一"){
							item.lunar = lunarInfo.IMonthCn
						} else {
							item.lunar = lunarInfo.IDayCn
						}
					}
					let day = new Date(year,month,i).getDay();
					item.isRedDay = false;
					if (day == 6 || day == 0){
						item.isRedDay = true;
					}
					items.push(item);
				}
				let fd = new Date(year,month,1);
				monthObj.year = year;
				monthObj.month = month + 1;
				monthObj.daysPrev = fd.getDay();
				monthObj.items = items;
				monthObj.daysNext = (7 - (monthObj.daysPrev + d.getDate()) % 7) % 7;
				
				return monthObj;
			},
			changeMonth(index){
				this.showDate.setDate(1);
				this.showDate.setMonth(this.showDate.getMonth() + index);
				let nextMonthDate = new Date(this.showDate.getFullYear(),this.showDate.getMonth() + 1,1);
				this.currentMonthObj = this.getMonthObj(this.showDate);
				this.nextMonthObj = this.getMonthObj(nextMonthDate);
				// let mm = '';
				// if (this.showDate.getMonth() + 1 < 10){
				// 	mm = '0' + (this.showDate.getMonth() + 1);
				// } else {
				// 	mm = this.showDate.getMonth() + 1;
				// }
				// let url = '/JSY_H5/h5/queryExpecte?expectedDate=' + this.showDate.getFullYear() + '-' + mm;
				// this.$http.get(url).then((response) => {
				// 	response.data.monthList.forEach((v,i) => {
				// 		let index = new Date(v.date).getDate();
				// 		this.currentMonthObj.items[index - 1].expectationCount = '预:' + v.expectationCount;
				// 		if (v.currentCount){
				// 			this.currentMonthObj.items[index - 1].currentCount = '实:' + v.currentCount;
				// 		}
				// 		if (v.dateType){
				// 			this.currentMonthObj.items[index - 1].isRedDay = v.dateType == 1 || 2;
				// 		}
				// 		if (v.dateType == 1 && v.festival){
				// 			this.currentMonthObj.items[index - 1].lunar = v.festival;
				// 		}
				// 	})
				// 	response.data.nextMonthList.forEach((v,i) => {
				// 		let index = new Date(v.date).getDate();
				// 		this.nextMonthObj.items[index - 1].expectationCount = '预:' + v.expectationCount;
				// 		if(v.currentCount){
				// 			this.nextMonthObj.items[index - 1].currentCount = '实:' + v.currentCount;
				// 		}
				// 		if (v.dateType){
				// 			this.nextMonthObj.items[index - 1].isRedDay = v.dateType == 1 || 2;
				// 		}
				// 		if (v.dateType == 1 && v.festival){
				// 			this.nextMonthObj.items[index - 1].lunar = v.festival;
				// 		}
				// 	})
				// }, (response) => {
				// 	console.log('oops, data is error');
				// });
			},
			tapDay(year,month,date){
				this.$emit('onTapDay',year,month,date)
			}
		}
	}
</script>

<style scoped lang="scss">
	.carlendar {
		width:100%;float:left;padding-top:40px;padding-bottom:50px;background:#fff;
		.controller {
			position:relative;width:60vw;margin:0 auto;height:60px;padding:10px;text-align:center;
			.label {
				display:block;float:left;width:25vw;height:60px;
				.yyyy {
					color:#ccc;
				}
				.mm {
					color:#666;font-size:30px;
				}
			}
			.to-mark {
				float:left;display:block;width:10vw;height:60px;line-height:60px;
			}
			.btn {
				display:block;position:absolute;height:40px;width:40px;top:20px;border:#999 2px solid;border-radius:50%;
				&.prev {
					left:-40px;
					&:before {
						display:block;width:16px;height:16px;content:"";margin-left:13px;margin-top:10px;border-left:#999 4px solid;border-bottom:#999 4px solid;transform:rotate(45deg);
					}
				}
				&.next {
					right:-40px;
					&:before {
						display:block;width:16px;height:16px;content:"";margin-left:7px;margin-top:10px;border-left:#999 4px solid;border-bottom:#999 4px solid;transform:rotate(225deg);
					}
				}
			}
		}
		.month {
			float:left;width:98%;border-right:#ccc solid 1px;border-bottom:#ccc solid 1px;font-size:12px;
			li {
				display:block;float:left;border-left:#ccc solid 1px;border-top:#ccc solid 1px;width:14vw;height:20vw;line-height:6vw;box-sizing:border-box;text-align: center;
				.red-day {
					color:red;
				}
				.date {
					text-align:center;
					font-size:20px;
					line-height:24px;
				}
				.count {
					text-align:center;
					&.expectation {
						color:orange;
					}
					&.current {
						color:blue;
					}
				}
				&.today {
					background:red;color:yellow;
					.red-day {
						color:yellow;
					}
					.count {
						color:yellow;
						&.expectation {
							color:yellow;
						}
						&.current {
							color:yellow;
						}
					}
				}
			}
			&.title li {
				height:50px;line-height:25px;text-align:center;
			}
		}
	}

	@media screen and (min-width: 1000px) {
		.carlendar {
			.controller {
				height:120px;padding:20px;
				.label {
					height:120px;
					.mm {
						font-size:50px;
					}
				}
				.to-mark {
					display:inline-block;height:120px;line-height:120px;
				}
				.btn {
					height:80px;width:80px;top:36px;border:#999 4px solid;
					&.prev {
						left:-80px;
						&:before {
							width:32px;height:32px;margin-left:28px;margin-top:20px;border-left:#999 8px solid;border-bottom:#999 8px solid;
						}
					}
					&.next {
						right:-80px;
						&:before {
							width:32px;height:32px;margin-left:14px;margin-top:20px;border-left:#999 8px solid;border-bottom:#999 8px solid;
						}
					}
				}
			}
			font-size:32px;
			.month {
				font-size:32px;
				&.title li {
					height:100px;line-height:50px;
				}
			}
		}
		
	}
</style>