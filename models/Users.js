// 用于在数据库中，存储用户信息的集合（表）
const mongoose = require('mongoose')
// 引入Schema
const Schema = mongoose.Schema
// 创建Schema约束对象
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  identify: {
    type: String
  },
  data: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('users', UserSchema)