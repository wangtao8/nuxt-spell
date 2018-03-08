// 链接 mongoose nuxt集合
var mongoose = require('mongoose')
var db = mongoose.createConnection('mongodb://localhost:27017/mynuxt')
// 链接错误
db.on('error', function (err) {
  console.log(err)
})
// Schema 结构
var Schema = mongoose.Schema
// 表 nuxt
var nuxtlistScheMa = new Schema({
  name: String,
  choose: String
})
// 表tishi
var tslistScheMa = new Schema({
  tishi: String
})
// 关联 nuxtlist -> nuxt 表
exports.nuxtlist = db.model('nuxt', nuxtlistScheMa, 'nuxt')
// 关联 tslistScheMa
exports.tslist = db.model('tishi', tslistScheMa, 'tishi')
exports.db = db
console.log('数据库启动成功！！！！')
