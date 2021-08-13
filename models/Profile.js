// 用于在数据库中，存储用户信息的集合（表）
const mongoose = require('mongoose')
// 引入Schema
const Schema = mongoose.Schema
// 创建Schema约束对象
const ProfileSchema = new Schema({
  type: {
    type: String
  },
  describe: {
    type: String
  },
  income: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  },
  data: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)