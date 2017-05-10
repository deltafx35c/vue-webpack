<template>
    <div>
        <v-header showBackBtn="true" headTitle="hello world"></v-header>
        <div>hello</div>
        <ul>
            <li v-for="item in items">
                {{item.name}}
            </li>
        </ul>
        <v-footer></v-footer>
    </div>
</template>
<script>
import vHeader from '../components/Header'
import vFooter from '../components/Footer.vue'

export default {
    data() {
        return {
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
        });
    }

}
</script>

<style scoped lang="scss">
    
</style>