const mongoose = require('mongoose')

let PhotosSchema = new mongoose.Schema({
  id:{type:String,default:''},
  name:{type:String,default:''},
  contentType:{type:String,default:''},
  createDate:{type:Date,default:new Date()}
})

module.exports = PhotosSchema;