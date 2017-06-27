<template>
    <div id="photo">
        <v-header showBackBtn="true" headTitle="照片"></v-header>
        <div class="content">
            <v-paging class="paging" :totalPage="totalPage" :page="page" @changePage="changePage" ></v-paging>
            <div class="photoList">
                <div class="item" v-for="photo in photos">
                    <img v-lazy.container="picsUrl + photo.name" />
                </div>
            </div>
            <v-paging class="paging" :totalPage="totalPage" :page="page" @changePage="changePage" ></v-paging>
            <mt-button type="primary" v-on:click="onTap">添加图片</mt-button>
            <mt-popup v-model="popupVisible" position="left">
                <div class="popup-box">
                    <div class="upload-control">
                        <label class="select-image" for="image-input">选择图片</label>
                        <input id="image-input" type="file" ref="inputer" @change="onFileChange" multiple="multiple" accept=".jpg,.jpeg,.png,.gif">
                        <mt-button v-show="showUploadBtn" type="primary" v-on:click="uploadPhotos">上 传</mt-button>
                        <ul class="image-preview">
                            <li v-for="image in previewImages">
                                <img :src="image.url" />
                            </li>
                        </ul>
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
    import vPaging from '../components/Paging'
    export default {
        data() {
            return {
                formdata : undefined,
                popupVisible:false,
                showUploadBtn:false,
                picsUrl : './static/images/',
                photos : [],
                previewImages: [],
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
                let url = '/api/photos'
                this.$http.get(url,{params:{page:1}}).then((response) => {
                    this.$data.photos = response.data.photos
                    this.$data.totalPage = response.data.totalPage
                }, (response) => {
                    console.log('oops, data is error')
                })
            },
            onTap(){
                this.popupVisible = true;
            },
            uploadPhotos(){
                let url = '/api/photos';
                this.$http.post(url,this.formdata).then((response) => {
                }, (response) => {
                    console.log('oops, data is error')
                })
            },
            onFileChange(){
                //清除前一次上传文件的URL对象
                this.previewImages.forEach((v,i)=> {
                    URL.revokeObjectURL(v.url)
                })
                this.previewImages = []
                let inputDOM = this.$refs.inputer
                let formdata = new FormData()
                for (let i=0;i<inputDOM.files.length;i++){
                    formdata.append('uploadFile',inputDOM.files[i])
                    this.previewImages.push({url:URL.createObjectURL(inputDOM.files[i])})
                }
                this.formdata = formdata
                this.showUploadBtn = inputDOM.files.length > 0 
            },
            changePage(page){
                document.body.scrollTop = 0
                let url = '/api/photos'
                this.$http.get(url,{params:{page:page}}).then((response) => {
                    this.$data.photos = response.data.photos
                    this.$data.page = page
                    this.$data.totalPage = response.data.totalPage
                }, (response) => {
                    console.log('oops, data is error')
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    #photo{
        .content {
            padding:70px 10px 80px;box-sizing:border-box;
            .photoList {
                width:100%;
                &>.item {
                    width:100%;margin-bottom:20px;
                    img {
                        width:100%;
                    }
                }
            }
            .paging{text-align: center;}
            .mint-popup-left{
                height:100%;
                .popup-box {width:200px;height:100%;top:0;right:0;bottom:0;background:#fff;text-align: center;
                    .upload-control{
                        padding-top:100px;
                        .select-image{position:relative;display:inline-block;padding:0 12px;background: #26a2ff;color:#fff;border-radius: 4px;border: 0;box-sizing: border-box;font-size: 18px;height: 41px;line-height:41px;}
                        #image-input{display:none;}
                    }
                    .image-preview {
                        width:100%;height:400px;margin-top:20px;padding:30px;box-sizing:border-box;overflow:auto;
                        li {
                            display:block;width:140px;
                            img {width:100%;}
                        }
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