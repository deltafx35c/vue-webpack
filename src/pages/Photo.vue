<template>
    <div id="photo">
        <v-header showBackBtn="true" headTitle="照片" :showMenu="showMenu" @onTapMenu="tapMenu">
            <ul class="photo-menu">
                <li>
                    <mt-button type="primary" @click="addPhoto">添加照片</mt-button>
                </li>
            </ul>
        </v-header>
        <div class="content">
            <v-paging class="paging" :totalPage="totalPage" :page="page" @changePage="changePage" ></v-paging>
            <div class="photoList">
                <div class="item" v-for="(photo,index) in photos" :key="index">
                    <img v-lazy.container="picsUrl + photo.name" ></img>
                </div>
            </div>
            <v-paging class="paging" :totalPage="totalPage" :page="page" @changePage="changePage" ></v-paging>
            <mt-popup v-model="popupVisible" position="left">
                <div class="popup-box">
                    <div class="upload-control">
                        <label class="select-image" for="image-input">选择图片</label>
                        <input id="image-input" type="file" ref="inputer" @change="onFileChange" multiple="multiple" accept=".jpg,.jpeg,.png,.gif">
                        <ul class="image-preview">
                            <li v-for="(image,index) in previewImages" :key="index">
                                <img :src="image.url"></img>
                            </li>
                        </ul>
                        <mt-button v-show="showUploadBtn" type="primary" @click="uploadPhotos">上 传</mt-button>
                        <mt-button v-show="showUploadBtn" type="primary" plain @click="clearPhotos">清 空</mt-button>
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
                showMenu : false,
                popupVisible:false,
                showUploadBtn:false,
                picsUrl : './upload/images/',
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
            addPhoto(){
                this.popupVisible = true
                this.showMenu = false
            },
            uploadPhotos(){
                let url = '/api/photos';
                this.$http.post(url,this.formdata).then((response) => {
                }, (response) => {
                    console.log('oops, data is error')
                })
            },
            clearPhotos(){
                //清除前一次上传文件的URL对象
                this.previewImages.forEach((v,i)=> {
                    URL.revokeObjectURL(v.url)
                })
                this.previewImages = []
                this.showUploadBtn = false
            },
            onFileChange(){
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
            },
            tapMenu(){
                this.showMenu = !this.showMenu
            }

        }
    }
</script>
<style scoped lang="scss">
    #photo{
        .photo-menu{width:100%;}
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
                .popup-box {width:200px;height:100%;background:#fff;text-align: center;
                    .upload-control{
                        padding-top:40px;
                        .select-image{position:relative;display:inline-block;padding:0 12px;background: #26a2ff;color:#fff;border-radius: 4px;border: 0;box-sizing: border-box;font-size: 18px;height: 41px;line-height:41px;}
                        #image-input{display:none;}
                    }
                    .image-preview {
                        width:100%;height:300px;margin:20px 0;padding:0 20px;box-sizing:border-box;overflow:auto;
                        li {
                            display:block;width:160px;
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
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }

</style>