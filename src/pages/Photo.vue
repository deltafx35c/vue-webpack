<template>
    <div id="photo">
        <v-header showBackBtn="true" headTitle="照片"></v-header>
        <div class="content">
            <div class="photoList">
                <div class="item" v-for="photo in photos">
                    <img v-lazy.container="picsUrl + photo.filename" />
                </div>
            </div>
            <mt-button type="primary" v-on:click="onTap">添加图片</mt-button>
            <mt-popup v-model="popupVisible" position="left">
                <div class="popup-box">
                    <div class="upload-control">
                        <label for="file-input">选择文件</label>
                        <input id="file-input" type="file" ref="inputer" @change="onFileChange" multiple="multiple">
                        <mt-button type="primary" v-on:click="uploadPhotos">上 传</mt-button>
                    </div>
                </div>
            </mt-popup>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>

    import vHeader from '../components/Header'
    import vFooter from '../components/Footer'
    export default {
        data() {
            return {
                formdata : undefined,
                popupVisible:false,
                picsUrl : 'http://116.62.143.122/pics/',
                photos : []
            }
        },
        components: {
            vHeader,vFooter
        },
        mounted() {
            this.init();
        },
        methods: {
            init(){
                let url = '/api/pics';
                this.$http.get(url).then((response) => {
                    this.$data.photos = response.data
                }, (response) => {
                    console.log('oops, data is error');
                })
            },
            onTap(){
                this.popupVisible = true;
            },
            uploadPhotos(){
                let url = '/api/pics';
                this.$http.post(url,this.formdata).then((response) => {
                }, (response) => {
                    console.log('oops, data is error');
                })
            },
            onFileChange(){
                let inputDOM = this.$refs.inputer
                let formdata = new FormData()
                for (let i=0;i<inputDOM.files.length;i++){
                    formdata.append('uploadFile',inputDOM.files[i])
                }
                this.formdata = formdata
            }
        }
    }
</script>
<style scoped lang="scss">
    #photo{

        width:100%;height:100%;overflow:hidden;
        .content {
            position:absolute;left:0;right:0;top:40px;bottom:50px;overflow:auto;
            .photoList {
                width:100%;padding:30px;box-sizing:border-box;
                &>.item {
                    width:100%;margin-bottom:30px;
                    img {
                        width:100%;
                    }
                }
            }
            .mint-popup-left{
                height:100%;
                .popup-box {width:200px;height:100%;top:0;right:0;bottom:0;background:#fff;text-align: center;
                    .upload-control{
                        padding-top:100px;
                        #file-input{display:none;}
                    }
                }         
            }
            
        }
    }

    .router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
        opacity: 0;
    }
</style>