// 引入token库
const jwt = require('jsonwebtoken')
const keys = require('./key');
const User = require('../models/Users.js')

// 用于解析token，其他路由需要有token才能进入,中间件
const auth = async (req, res, next) => {
  // 获取token
  const raw = String(req.headers.authorization).split(' ').pop()
  // const tokenData = jwt.verify(raw, keys.secretOrKey)
  // console.log(tokenData);
  if (raw) {
    const {
      id
    } = jwt.verify(raw, keys.secretOrKey)
    req.user = await User.findById(id)
    next()
  } else {
    res.json({
      msg: 'token验证失败，请重新登录'
    })
  }
}

module.exports = auth