const mongoose = require('mongoose')

let ScheduleSchema = new mongoose.Schema({
  year:{type:String,default:''},
  month:{type:String,default:''},
  date:{type:String,default:''},
  content:{type:String,default:''}
})

module.exports = ScheduleSchema;