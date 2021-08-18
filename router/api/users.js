// 用户登录和注册接口
const express = require('express')
// 引入user模型
const User = require('../../models/Users.js')
// 引入加密
const sha1 = require('sha1')
// 引入一个gravatar库，用于图片（需要在gravatar官网注册才有图片）
const gravatar = require('gravatar')
// 引入token库
const jwt = require('jsonwebtoken')
const keys = require('../../config/key');
// 引入认证方式auth
const auth = require('../../config/auth')
// const passport = require("passport"); //引入passport中间件
// 创建路由对象
const route = express.Router()
// 创建get方法,路径：api/users/test
route.get('/test', (req, res) => {
  // 发送一个json数据
  res.json({
    "name": "szz"
  })
})
// 注册接口
route.post('/register', (req, res) => {
  const {
    email,
    name,
    password,
    identify
  } = req.body
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  });
  // console.log(req.body);
  // 判断邮箱是否被注册
  User.findOne({
    email
  }).then((user) => {
    if (user) {
      return res.status(400).json(
        '邮箱已被注册'
      )
    } else {
      User.create({
        name,
        email,
        password: sha1(password),
        avatar,
        identify
      }).then(data => {
        // console.log('数据加载成功', data);
        res.json(data)
      }).catch(err => {
        console.log('数据加载失败', err);
      })
    }
  })
})
// 登录接口
route.post('/login', (req, res) => {
  const {
    email,
    password
  } = req.body
  User.findOne({
    email,
    password: sha1(password)
  }, (err, data) => {
    if (data) {
      // res.status(200).json({
      //   msg: '登录成功'
      // })
      // 设置token；jwt.sign('规则','加密','过期时间','箭头函数')
      const rule = {
        id: data._id,
        name: data.name,
        avatar: data.avatar,
        identify: data.identify
      }
      // console.log(rule);
      jwt.sign(rule, keys.secretOrKey, {
        expiresIn: 3600 * 24 * 7
      }, (err, token) => {
        if (err) throw err;
        res.json({
          msg: '登录成功',
          token: 'Bearer ' + token
        })
      })
    } else {
      res.status(404).json('邮箱或密码错误')
    }
  })
})

//$route GET api/users/current
//@desc return current user
//@access private
//验证token得到用户信息
//使用passport-jwt验证token
// route.get("/current", passport.authenticate("jwt", {
//   session: false
// }), (req, res) => {
//   res.json({
//     id: req.user.id,
//     name: req.user.name,
//     email: req.user.email
//   });
// })

route.get('/current', auth, async (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identify: req.user.identify
  })
})

module.exports = route