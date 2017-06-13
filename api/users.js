const router = require('express').Router()
const ENV = require('../env')

const users = [
  { name: 'Alexandre' },
  { name: 'Sébastien' },
  { name: 'Ludovic' }
]

const MongoClient = require('mongodb').MongoClient
const redis = require('redis')
const client = redis.createClient(6379,'127.0.0.1',{})

client.on('error', (err) => console.log('Error' + err))

/* GET users listing. */
router.get('/users', (req, res, next) => {
  client.set('key1', 'redis value 1', redis.print)
  client.get('key1',(error,res) => {
    console.log(res)
  })

  let selectData = (db,callback) => {
    let collection = db.collection('users')
    collection.find().toArray((err,result) => {
      if(err){
        console.log('Error:' + err)
        return
      }
      callback(result)
    })
  }

  MongoClient.connect(ENV.MANGODB_CONN_STR,(err,db)=>{
    console.log('mongodb is connected')
    selectData(db,(result)=>{
      res.json(result)
      db.close()
    })
  })
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

module.exports = router
