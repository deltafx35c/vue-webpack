const mongoose = require('mongoose')

let ResourcesSchema = new mongoose.Schema({
  name:{type:String,default:''},
  contentType:{type:String,default:''},
  originType:{type:String,default:''},
  gridfsID:{type:String,default:''},
  createDate:{type:Date,default:new Date()}
})

module.exports = ResourcesSchema;