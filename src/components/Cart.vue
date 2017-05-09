<template>
    <div>
        <v-header showBackBtn="true" headTitle="hello world"></v-header>
        <div>hello world</div>
        <v-footer></v-footer>
    </div>
</template>
<script>
import vHeader from '../components/Header'
import vFooter from '../components/Footer.vue'

export default {
    data() {
        return {

        }
    },
    components: {
        vHeader ,  vFooter
    },
    mounted() {

    }

}
</script>

<style scoped lang="scss">
    
</style>