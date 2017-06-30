const router = require('express').Router()
const ENV = require('../env')
const fs = require("fs");
const mongoose = require('mongoose')
const ScheduleSchema = require('./schema/scheduleSchema')

mongoose.Promise = global.Promise;

let dbVueWebpack = mongoose.createConnection(ENV.MANGOOSE_CONN_STR,'vue-webpack')
let ScheduleModel = dbVueWebpack.model('schedule',ScheduleSchema,'schedule')

/* GET pictures list by type. */
router.get('/schedule', (req, res, next) => {
  let query = req.query
  ScheduleModel.find({year:query.year,month:query.month,date:query.date},(err,docs) => {
    res.json({schedule:docs})
  })
})


module.exports = router
