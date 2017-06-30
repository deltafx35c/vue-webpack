const router = require('express').Router()
const ENV = require('../env')
const fs = require("fs");
const multiparty = require('connect-multiparty')
const mongoose = require('mongoose')
const ResourcesSchema = require('./schema/resourcesSchema')
const Gridfs = require('gridfs-stream')

mongoose.Promise = global.Promise;
Gridfs.mongo = mongoose.mongo

let dbFiles = mongoose.createConnection(ENV.MANGOOSE_CONN_STR,'files')
let dbVueWebpack = mongoose.createConnection(ENV.MANGOOSE_CONN_STR,'vue-webpack')
let ResourcesModel = dbVueWebpack.model('resources',ResourcesSchema,'resources')

/* GET pictures list by type. */
router.get('/resources', (req, res, next) => {
  let defaultQuery = {
    page:1,
    pageSize:10,
    sort:0,
  }
  let query = Object.assign(defaultQuery,req.query)
  ResourcesModel.find({"originType":"resource"},(err,docs) => {
    let totalPage = Math.ceil(docs.length / parseInt(query.pageSize))
    ResourcesModel.find({"originType":"resource"}).skip((parseInt(query.page) - 1) * parseInt(query.pageSize)).limit(parseInt(query.pageSize)).exec((err,docs) => {
      res.json({totalPage:totalPage,resources:docs})
    })
  })
})

/* GET photo by ID. */
router.get('/resource/:id', (req, res, next) => {
  res.json({status:'ok'})
})

// 解析mutipart formdata的中间件
let multipartyMiddleware = multiparty()
router.post('/resource', multipartyMiddleware, (req, res, next) => {
  if (req.files.uploadFile){
    let gfs = Gridfs(dbFiles.db)
    let file = req.files.uploadFile
    let path = file.path
    let writeStream = gfs.createWriteStream({
      filename: file.name,
      content_type: file.type,
      metadata: {
        origin:"vue-webpack",
        type:"resource"
      }
    })
    fs.createReadStream(path).pipe(writeStream)
    writeStream.on('close',(gridfsFile) => {
      // 记录图片业务关联信息
      let resource = {}
      resource.name = gridfsFile.filename
      resource.contentType = file.type
      resource.originType = "resource"
      resource.gridfsID = gridfsFile._id.toString()
      let resourcesEntity = new ResourcesModel(resource)
      resourcesEntity.save((err,resource) => {})
      //删除临时文件
      fs.unlink(path,(err) => {})
    })
  }
  
  res.json({"status":"ok"})
})

module.exports = router
