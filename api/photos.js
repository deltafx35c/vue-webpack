const router = require('express').Router()
const ENV = require('../env')
const fs = require("fs");
const multiparty = require('connect-multiparty')
const mongoose = require('mongoose')
const PhotosSchema = require('./schema/photosSchema')
const FilesSchema = require('./schema/filesSchema')
const Gridfs = require('gridfs-stream')
const gm = require('gm').subClass({imageMagick:true})

mongoose.Promise = global.Promise;
Gridfs.mongo = mongoose.mongo

const users = [
  { name: 'Alexandre' },
  { name: 'Sébastien' },
  { name: 'Ludovic' }
]

//const conn = mongoose.createConnection(ENV.MANGOOSE_CONN_STR,'vue-webpack')
let dbFiles = mongoose.createConnection(ENV.MANGOOSE_CONN_STR,'files')
let dbVueWebpack = mongoose.createConnection(ENV.MANGOOSE_CONN_STR,'vue-webpack')
let PhotosModel = dbVueWebpack.model('Photos',PhotosSchema)
let FilesModel = dbFiles.model('fs.files',FilesSchema)

/* GET pictures list by type. */
router.get('/photos', (req, res, next) => {
  PhotosModel.find({"originType":"photo"},(err,docs) => {
    res.json(docs)
  })
})

/* GET user by ID. */
router.get('/photo/:id', (req, res, next) => {
  var id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})


let multipartyMiddleware = multiparty()
/* POST user pictures to mongo-gridfs*/
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
        let writeStream = fs.createWriteStream('./static/images/' + file.name)
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
      let writeStream = fs.createWriteStream('./static/images/' + file.name)
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
  }
  
  res.json({"status":"ok"})
})

module.exports = router
