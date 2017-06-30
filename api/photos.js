const router = require('express').Router()
const ENV = require('../env')
const fs = require("fs");
const multiparty = require('connect-multiparty')
const mongoose = require('mongoose')
const PhotosSchema = require('./schema/photosSchema')
//const FilesSchema = require('./schema/filesSchema')
const Gridfs = require('gridfs-stream')
const gm = require('gm').subClass({imageMagick:true})

mongoose.Promise = global.Promise;
Gridfs.mongo = mongoose.mongo

//let dbFiles = mongoose.createConnection(ENV.MANGOOSE_CONN_STR,'files')
let dbVueWebpack = mongoose.createConnection(ENV.MANGOOSE_CONN_STR,'vue-webpack')
let PhotosModel = dbVueWebpack.model('photos',PhotosSchema,'photos')
//let FilesModel = dbFiles.model('fs.files',FilesSchema)

/* GET pictures list by type. */
router.get('/photos', (req, res, next) => {
  let defaultQuery = {
    page:1,
    pageSize:10,
    sort:0,
  }
  let query = Object.assign(defaultQuery,req.query)
  PhotosModel.find({"originType":"photo"},(err,docs) => {
    let totalPage = Math.ceil(docs.length / parseInt(query.pageSize))
    PhotosModel.find({"originType":"photo"}).skip((parseInt(query.page) - 1) * parseInt(query.pageSize)).limit(parseInt(query.pageSize)).exec((err,docs) => {
      res.json({totalPage:totalPage,photos:docs})
    })
  })

})

/* GET photo by ID. */
router.get('/photo/:id', (req, res, next) => {
  res.json({status:'ok'})
})

// 解析mutipart formdata的中间件
let multipartyMiddleware = multiparty()
router.post('/photos', multipartyMiddleware, (req, res, next) => {
  if (req.files.uploadFile){

    //let gfs = Gridfs(dbFiles.db)
    
    if (Object.prototype.toString.call(req.files.uploadFile) === '[object Array]'){
      // 多图上传
      for(let file of req.files.uploadFile){
        let path = file.path
        // let writeStream = gfs.createWriteStream({
        //   filename: file.name,
        //   content_type: file.type,
        //   metadata: {
        //     type:"photo"
        //   }
        // })
        let writeStream = fs.createWriteStream('./upload/images/' + file.name)
        gm(path).resize(500).stream().pipe(writeStream)
        writeStream.on('close',() => {
          // 记录图片业务关联信息
          let photo = {}
          photo.name = file.name
          photo.contentType = file.type
          photo.originType = "photo"
          let photosEntity = new PhotosModel(photo)
          photosEntity.save((err,photo) => {})
          //删除临时文件
          fs.unlink(path,(err) => {})
        })
      }
    } else {
      // 单图上传
      let file = req.files.uploadFile
      let path = file.path
      // let writeStream = gfs.createWriteStream({
      //   filename: file.name,
      //   content_type: file.type,
      //   metadata: {
      //     type:"photo"
      //   }
      // })
      let writeStream = fs.createWriteStream('./upload/images/' + file.name)
      gm(path).resize(400).stream().pipe(writeStream)
      writeStream.on('close',() => {
        // 记录图片业务关联信息
        let photo = {}
        photo.name = file.name
        photo.contentType = file.type
        photo.originType = "photo"
        let photosEntity = new PhotosModel(photo)
        photosEntity.save((err,photo) => {})
        //删除临时文件
        fs.unlink(path,(err) => {})
      })
    }
  }
  
  res.json({"status":"ok"})
})

module.exports = router
