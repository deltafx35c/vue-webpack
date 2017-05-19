<template>
    <div id="cart">
        <v-header showBackBtn="true" headTitle="hello world"></v-header>
        <div>hello</div>
        <ul>
            <li v-for="item in items">
                {{item.name}}
            </li>
        </ul>
        <mt-button type="primary" v-on:click="onTap">click me</mt-button>
        <mt-popup v-model="popupVisible" position="left">
            <div class="popup-box">
                hello world
            </div>
        </mt-popup>
        <mt-cell title="去首页" value="hello" is-link to="/home">
            <i slot="icon" class="iconfont">&#xe6b8;</i>
        </mt-cell>
        <v-footer></v-footer>
    </div>
</template>
<script>
import vHeader from '../components/Header'
import vFooter from '../components/Footer.vue'

export default {
    data() {
        return {
            popupVisible:false,
            items : []
        }
    },
    components: {
        vHeader ,  vFooter
    },
    mounted() {
        let url = '/api/users';
        this.$http.get(url).then((response) => {
            this.$data.items = response.data
        }, (response) => {
            console.log('oops, data is error');
        })
    },
    methods: {
        onTap(){
            //this.$toast('hello world')
            this.popupVisible = true;
        }
    }

}
</script>

<style scoped lang="scss">
    #cart{position:absolute;top:40px;right:0;bottom:60px;left:0;text-align: center;}
    .popup-box{width:200px;height:100vh;top:0;right:0;bottom:0;background:#fff;text-align: center;}
</style>