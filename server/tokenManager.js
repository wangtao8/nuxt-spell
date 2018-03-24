var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.second = 10;
var token = "0001";

//初始化定时器
exports.init = function(){
  console.log('init token');
  token="0002";
  var j = schedule.scheduleJob(rule, function(){
    token="0003";
    console.log('检查token是否失效');
    console.log(new Date());
  });
}

//获取token
exports.getToken = function(){
  return token;
}
