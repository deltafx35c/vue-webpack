const mongoose = require('mongoose')

let PicsSchema = new mongoose.Schema({
  _id:{type:String,default:''},
  filename:{type:String,default:''},
  contentType:{type:String,default:''},
  length:{type:String,default:''}
})

module.exports = PicsSchema;