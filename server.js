//引入express库
const express = require('express')
// 引入mongodb数据库
const mongoose = require('mongoose')
// 引入body-parser，来解析post的参数
const bodyParser = require('body-parser')
// 引入passport
// const passport = require('passport')
// 引入数据库配置
const db = require('./config/key.js').mongoURI
// 导入路由文件
const users = require('./router/api/users.js')
const profiles = require('./router/api/profiles.js')
// 创建实例
const app = express()
//加载body-parser中间件
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// 初始化passport，不然无法正常使用
// app.use(passport.initialize())
// require("./config/passport")(passport);
// 连接数据库
mongoose.connect(db).then(() => {
  console.log('数据库连接成功');
}).catch(err => {
  console.log(`数据库连接失败${err}`);
})
// 创建路由
// app.get('/', (req, res) => {
//   res.send('测试成功')
// })
// 通过中间件使用router
app.use('/api/users', users)
app.use('/api/profiles', profiles)
// 给定端口号
const port = process.env.PORT || 5000;
// 绑定端口号
app.listen(port, (err) => {
  if (err) console.log('服务器启动失败', err);
  else console.log('服务器启动成功');
})