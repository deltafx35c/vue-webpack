<template>
    <div id="resource">
        <v-header showBackBtn="true" headTitle="资源" :showMenu="showMenu" @onTapMenu="tapMenu">
            <ul class="resource-menu">
                <li>
                    <mt-button type="primary" @click="addResource">上传资源</mt-button>
                </li>
            </ul>
            <input id="upload-file" type="file" ref="uploadFile" @change="onFileChange">
        </v-header>
        <div class="content">
            <v-paging class="paging" :totalPage="totalPage" :page="page" @changePage="changePage" ></v-paging>
            <mt-cell-swipe v-for="(resource,index) in resources" :key="index" :title="resource.name" label="一个测试资源文件" :right="[{content:'<div style=\'color:red\'>delete</div>',style:{color:'#fff'},handler:onDeleteClick}]">
                <span>
                    <mt-button type="primary" @click="downloadFile(resource.name)"><i class="iconfont">&#xe668;</i></mt-button>
                </span>
            </mt-cell-swipe>
            <v-paging class="paging" :totalPage="totalPage" :page="page" @changePage="changePage" ></v-paging>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
import vHeader from '../components/Header'
import vFooter from '../components/Footer'
import vPaging from '../components/Paging'

export default {
    data() {
        return {
            showMenu : false,
            popupVisible:false,
            resources : [],
            page:1,
            totalPage:0
        }
    },
    components: {
        vHeader,vFooter,vPaging
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            let url = '/api/resources'
            this.$http.get(url,{params:{page:1}}).then((response) => {
                this.$data.resources = response.data.resources
                this.$data.totalPage = response.data.totalPage
            }, (response) => {
                console.log('oops, data is error')
            })
        },
        addResource(){
            this.$refs.uploadFile.click()
            this.showMenu = false
        },
        tapMenu(){
            this.showMenu = !this.showMenu
        },
        onFileChange(){
            let inputDOM = this.$refs.uploadFile
            let formdata = new FormData()
            formdata.append('uploadFile',inputDOM.files[0])
            let url = '/api/resource';
            this.$http.post(url,formdata).then((response) => {

            }, (response) => {
                console.log('oops, data is error')
            })
        },
        downloadFile(filename){
            let a = document.createElement('a');
            a.href = '/resources/' + filename;
            a.download = filename;
            a.click();
        },
        changePage(page){
            document.body.scrollTop = 0
            let url = '/api/resources'
            this.$http.get(url,{params:{page:1}}).then((response) => {
                this.$data.resources = response.data.resources
                this.$data.totalPage = response.data.totalPage
            }, (response) => {
                console.log('oops, data is error')
            })
        },
        onDeleteClick(){
            alert('can not delete')
        }
    }

}
</script>

<style scoped lang="scss">
    #resource{position:absolute;top:40px;right:0;bottom:60px;left:0;
        .resource-menu{width:100%;}
         #upload-file{display:none;}
        .content{padding:10px;
            .mint-cell{margin-bottom:10px;padding:10px 0;border:dotted 1px #26a2ff; border-radius:3px;}
        }
    }
    .popup-box{width:200px;height:100vh;top:0;right:0;bottom:0;background:#fff;text-align: center;}
</style>