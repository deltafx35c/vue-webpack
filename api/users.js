const router = require('express').Router()
const ENV = require('../env')

const users = [
  { name: 'Alexandre' },
  { name: 'Sébastien' },
  { name: 'Ludovic' }
]

const MongoClient = require('mongodb').MongoClient

/* GET users listing. */
router.get('/users', function (req, res, next) {
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
router.get('/users/:id', function (req, res, next) {
  var id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

module.exports = router
