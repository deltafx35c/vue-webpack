const router = require('express').Router()
const ENV = require('../env')
const mongoose = require('mongoose')
const Gridfs = require('gridfs-stream')
const fs = require("fs");
Gridfs.mongo = mongoose.mongo

const users = [
  { name: 'Alexandre' },
  { name: 'Sébastien' },
  { name: 'Ludovic' }
]

const MongoClient = require('mongodb').MongoClient

// const redis = require('redis')
// const client = redis.createClient(ENV.REDIS_CONN_PORT,ENV.REDIS_CONN_URL,{})
// client.on('error', (err) => console.log('Error' + err))

/* GET users listing. */
router.get('/users', (req, res, next) => {
  const conn = mongoose.createConnection(ENV.MANGOOSE_CONN_STR,'vue-webpack')
  let UsersSchema = new mongoose.Schema({
    name:{type:String,default:''}
  })
  let UsersModel = conn.model('Users',UsersSchema)
  UsersModel.find({},(err,docs) => {
    res.json(docs)
  })
  
  // client.set('key1', 'redis value 1', redis.print)
  // client.get('key1',(error,res) => {
  //   console.log(res)
  // })
})

/* GET user by ID. */
router.get('/users/:id', (req, res, next) => {
  var id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

/* POST user pictures to mongo-gridfs*/
// router.post('/pics', (req, res, next) => {
//   const conn = mongoose.createConnection(ENV.MANGOOSE_CONN_STR,'pics')
//   conn.on('error',() => {console.log('mongoose connect error')})
//   conn.once('open',() => {console.log('mongoose is connected')})
//   let gfs = Gridfs(conn.db)
//   let writeStream = gfs.createWriteStream({
//     filename:'nodeTestFile.jpg',
//     content_type:'jpg'
//   })
//   fs.createReadStream('./nodeTestFile.jpg').pipe(writeStream);
// })

module.exports = router
