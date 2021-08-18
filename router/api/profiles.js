// 数据接口
const express = require('express')
// 引入user模型
const Profile = require('../../models/Profile.js')
// 引入认证方式auth
const auth = require('../../config/auth.js')
// 创建路由对象
const route = express.Router()
// 创建get方法,路径：api/users/test
route.get('/test', (req, res) => {
  // 发送一个json数据
  res.json({
    "name": "szz"
  })
})

//$route post api/profile/add
//@desc 添加信息数据接口
//@access private
route.post('/add', auth, (req, res) => {
  const {
    type,
    describe,
    income,
    expend,
    cash,
    remark
  } = req.body
  // console.log(req.body);
  const profiles = {}
  if (type) profiles.type = type
  if (describe) profiles.describe = describe
  if (income) profiles.income = income
  if (expend) profiles.expend = expend
  if (cash) profiles.cash = cash
  if (remark) profiles.remark = remark

  new Profile(profiles).save().then(data => {
    res.json(data)
  })
  // 第二种添加方式
  // Profile.create({tyep,describe,income,expend,cash,remark}, (err, data) => {
  //   if (!err) res.json(data)
  //   else res.json('数据有错')
  // })
})

//$route post api/profile
//@desc 获取所有信息
//@access private
route.get('/', auth, (req, res) => {
  Profile.find().then(data => {
    if (!data) return res.status(404).json('没有任何数据')
    res.json(data)
  }).catch(err => {
    res.status(404).json(err)
  })
})

//$route post api/profile/:id
//@desc 获取指定id的数据
//@access private
route.get('/:id', auth, (req, res) => {
  Profile.findOne({
    _id: req.params.id
  }).then(data => {
    if (!data) return res.status(404).json('没有任何数据')
    res.json(data)
  }).catch(err => {
    res.status(404).json(err)
  })
})

//$route post api/profile/edit
//@desc 修改数据
//@access private
route.post('/edit/:id', auth, (req, res) => {
  const {
    type,
    describe,
    income,
    expend,
    cash,
    remark
  } = req.body
  const profiles = {}
  if (type) profiles.type = type
  if (describe) profiles.describe = describe
  if (income) profiles.income = income
  if (expend) profiles.expend = expend
  if (cash) profiles.cash = cash
  if (remark) profiles.remark = remark

  Profile.findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: profiles
  }, {
    new: true
  }).then(data => {
    res.json(data)
  })
  // 第二种方式
  // Profile.updateOne({
  //   _id: req.params.id
  // }, {
  //   $set: profiles
  // }, (err, data) => {
  //   if (!err) res.json(data)
  //   else return res.status(422).json('修改失败')
  // })
})

//$route post api/profile/delete
//@desc 删除数据
//@access private
route.delete('/delete/:id', auth, (req, res) => {
  // Profile.findOneAndRemove({
  //   _id: req.params.id
  // }).then(data => {
  //   data.save().then(data => res.json(data))
  // }).catch(err => {
  //   res.status(404).json('删除失败')
  // })
  Profile.remove({
    _id: req.params.id
  }, (err, data) => {
    if (!err) res.json(data)
    else return res.status(404).json('删除失败')
  })
})
module.exports = route