import schedule from 'node-schedule'
import axios from 'axios'
let rule = new schedule.RecurrenceRule()
// rule.hour(时)  rule.minute(分)  rule.second(秒)
rule.hour = [1,3,5,7,9,11,13,15,17,19,21,23]
rule.minute = 0
rule.second = 0
let token = ""
let invalidDate = ""
//初始化token invalidDate
let init = function(){
  axios.post('http://emcs.quanyou.com.cn/spellapi/auth/getToken',{"userName":"ApiActivity_2018", "password":"qy_api_#365!2018"})
    .then(function (response) {
      console.log('查询token:', response.data.data)
      token = response.data.data.token
      invalidDate = response.data.data.invalidDate
    })

  // 定时器查询token是否失效
  schedule.scheduleJob(rule, function() {
    let nowTime = (new Date()).getTime()
    console.log(new Date())
    console.log('时间对比：',nowTime, invalidDate)
    if (nowTime > invalidDate) {
      axios.post('http://emcs.quanyou.com.cn/spellapi/auth/getToken',{"userName":"ApiActivity_2018", "password":"qy_api_#365!2018"})
        .then(function (response) {
          console.log('查询token:', response.data.data)
          token = response.data.data.token
          invalidDate = response.data.data.invalidDate
        })
    } else {
      console.log('token暂未失效，继续使用')
    }
  })
}

// 返回当前token
let getToken = function(){
  return token
}

// 导出方法
export default {
  init,
  getToken
}
