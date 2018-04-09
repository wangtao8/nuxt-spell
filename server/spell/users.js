import { Router } from 'express'
import request from 'request'
import takeManager from '../tokenManager'
// import nuxtSchema from '../../db/nuxtserrver'
import Mock from 'mockjs'

let Random = Mock.Random
// let nuxtlist = nuxtSchema.nuxtlist
// let tslist = nuxtSchema.tslist

let router = Router()
// 接口转发测试
router.get('/getmsg', (req, res, next) => {
  request('http://10.10.1.191:3666/getall', function (error, response, body) {
    console.log('error:', error) // 返回错误信息
    console.log('statusCode:', response && response.statusCode) // 返回请求的状态码
    // console.log('body:', body)  返回回来的数据
    res.json(body)
  })
})

// 获得头部信息
router.post('/gethead', (req, res, next) => {
  let shopId = req.body.shopId
  let storeId = req.body.storeId
  let activityId = req.body.activityId
  let token = takeManager.getToken()
  let timestamp = (new Date()).getTime()
  let appId = req.query.appId
  // console.log('appid:', req.session)
  request.post('http://emcs.quanyou.com.cn/spellapi/spell/getSpellHomeInfo?token=' + token + '&timestamp=' + timestamp + '&appId=' + appId,{json:{shopId:shopId, storeId:storeId, activityId:activityId}}, function (err, response, body) {
    if (err) {
      res.json(body)
    } else {
      res.json(body)
    }
  })
})

// 获得分类
router.post('/gettitle', (req, res, next) => {
  // 接收到数据后 请求活动首页接口
  let shopId = req.body.shopId
  let storeId = req.body.storeId
  let token = takeManager.getToken()
  let timestamp = (new Date()).getTime()
  request.post('http://emcs.quanyou.com.cn/spellapi/spell/getSpellCategory?token=' + token + '&timestamp=' + timestamp,{json:{shopId:shopId, storeId:storeId}}, function (err, response, body) {
    // console.log('我在打印body信息tttttttttttttttttttttttt:', body)
    res.json(body)
  })
})

// 获得商品
router.post('/getclass', (req, res, next) => {
  let shopId = req.body.shopId
  let storeId = req.body.storeId
  let activityId = req.body.activityId
  let categoryId = req.body.categoryId
  let pageIndex = req.body.pageIndex
  let pageSize = req.body.pageSize
  let token = takeManager.getToken()
  let timestamp = (new Date()).getTime()
  request.post('http://emcs.quanyou.com.cn/spellapi/spell/getSpellGoods?token=' + token + '&timestamp=' + timestamp,
    {json:{shopId:shopId, storeId:storeId, activityId:activityId, categoryId:categoryId, pageIndex:pageIndex, pageSize:pageSize}},
    function (err, response, body) {
      if (err) {
        res.json(body)
      } else {
        // console.log('class:', body)
        res.json(body)
      }
    })
})

// 我的团信息获取
router.post('/getGroupInfo', (req, res, next) => {
  let shopId = req.body.shopId
  let storeId = req.body.storeId
  let activityId = req.body.activityId
  let buyerId = req.body.buyerId
  let teamId = req.body.teamId
  let token = takeManager.getToken()
  let timestamp = (new Date()).getTime()
  request.post('http://emcs.quanyou.com.cn/spellapi/spell/getTeamInfo?token='+token+'&timestamp='+timestamp,
    {json: {shopId: shopId, storeId: storeId, activityId: activityId, buyerId: buyerId, teamId: teamId}},
    function (err, response, body) {
      res.json(body)
    })
})

// 获得已开团列表（除自己）
router.post('/getHasBeenGroup', (req, res, next) => {
  let shopId = req.body.shopId
  let storeId = req.body.storeId
  let activityId = req.body.activityId
  let buyerId = req.body.buyerId
  let pageIndex = req.body.pageIndex
  let pageSize = req.body.pageSize
  let token = takeManager.getToken()
  let timestamp = (new Date()).getTime()
  request.post('http://emcs.quanyou.com.cn/spellapi/spell/getTeamList?token='+token+'&timestamp='+timestamp,
    {json:{shopId:shopId, storeId:storeId, activityId:activityId, buyerId:buyerId, pageIndex:pageIndex, pageSize:pageSize}},
    function (err, response, body) {
      if (err) {
        res.json(body)
      } else {
        res.json(body)
      }
    })
})

// 去开团
router.post('/openGroup', (req, res, next) => {
  let activityId = req.body.activityId
  let buyerId = req.body.buyerId
  let nickName = req.body.nickName
  let photo = req.body.photo
  let shopId = req.body.shopId
  let storeId = req.body.storeId
  let token = takeManager.getToken()
  let timestamp = (new Date()).getTime()
  request.post('http://emcs.quanyou.com.cn/spellapi/spell/createSpellTeam?token='+token+'&timestamp='+timestamp,
    {json:{activityId:activityId,buyerId:buyerId,nickName:nickName,photo:photo,shopId:shopId,storeId:storeId}},
    function (err, response, body) {
      if (err) {
        res.json(body)
      } else {
        res.json(body)
      }
    })
})

router.post('/toAuth', (req, res, next) => {
  req.session.sessionInfo = req.body
console.log('sessionInfo:', req.session.sessionInfo)
  res.send("1")
})

router.get('/testss', (req, res, next) => {
  request.get('http://192.168.79.8:9090/spellapi/spell/getTest',{},function (err, response, body) {
    // 对象中包含特殊符号的取值办法response.headers['set-cookie']
    // response.headers['cookie'] = response.headers['set-cookie']
    // req.headers['cookie'] = response.headers['set-cookie']
    // response.headers['set-cookie'] = response.headers['set-cookie']
    // console.log(response.headers['set-cookie'][0])
    res.send("2222")
  })
})

//去参团
router.post('/goGroup', (req, res, next) => {
  let teamId = req.body.teamId
  let buyerId = req.body.buyerId
  let nickName = req.body.nickName
  let photo = req.body.photo
  let shopId = req.body.shopId
  let storeId = req.body.storeId
  let token = takeManager.getToken()
  let timestamp = (new Date()).getTime()
  request.post('http://emcs.quanyou.com.cn/spellapi/spell/joinTeam?token='+token+'&timestamp='+timestamp,
    {json:{teamId:teamId,buyerId:buyerId,nickName:nickName,photo:photo,shopId:shopId,storeId:storeId}},
    function (err, response, body) {
      if (err) {
        res.send(body)
      } else {
        res.send(body)
      }
    })
})

// 获取用户信息
router.post('/getUserInfo', (req, res, next) => {
  let shopId = req.body.shopId
  let storeId = req.body.storeId
  let openId = req.body.openId
  request.post('https://emcs.quanyou.com.cn/emallwap/buyer/auth/' + storeId + '/' + shopId + '/' + openId, function (err, response, body) {
    res.send(body)
  })
})

// 获得用户token  没用
router.post('/getToken', (req, res, next) => {
  request.post('http://emcs.quanyou.com.cn/spellapi/auth/getToken',{json:{"userName":"ApiActivity_2018", "password":"qy_api_#365!2018"}},
    function (err, response, body) {
      res.send(body)
    })
})


// 商品详情页
router.get('/getDetail', (req, res, next) => {
  // req.session.name = req.qeury.name
  console.log('req.session.name:', req.session)
  let url = []
  let timeId = setInterval(function () {
    let aa = Random.image('750x750', Random.color(), '#FFF', 'png', 'heheda')
    url.push(aa)
    if (url.length > 10) {
      clearInterval(timeId)
      // 第一个参数是数据  第二个不知道  第三个代表缩进多少
      url = JSON.stringify(url, null, 1)
      let data = Mock.mock({
        'date': [{
          'contentsPic': url,
          'goodsDetail': {
            'goodsName': Random.ctitle(3, 30),
            'headPrice': 100, // 团长价
            'marketPrice': 300, // 市场价
            'pics': Random.ctitle(3, 10),
            'spellPrice': 200 // 拼团价
          },
          'isShowBuy': false,
          'showAttributeList': [{
            'attributeName': '颜色',
            'attributeOptionList': ['一', '二', '三']
          }, {
            'attributeName': '抽屉',
            'attributeOptionList': ['一', '二', '三']
          }, {
            'attributeName': '品牌',
            'attributeOptionList': ['一', '二', '三']
          }]
        }],
        'msg': '请求成功！',
        'state': 1
      })
      res.json(data)
    }
  }, 50)

})

// 运费规则
router.get('/getRule', (req, res, next) => {
  let data = Mock.mock({
    'date': {
      'deliveryFreight': [
        {
          'deliveryArea': '四川省-成都市-青羊区:东坡街道,光华街道',
          'deliveryPrice': '0-10元运装费为0.2元;10.01-1000元运装费为0元;'
        }, {
          'deliveryArea': '四川省-成都市-青羊区:东坡街道,光华街道',
          'deliveryPrice': '0-10元运装费为0.2元;10.01-1000元运装费为0元;'
        }, {
          'deliveryArea': '四川省-成都市-青羊区:东坡街道,光华街道',
          'deliveryPrice': '0-10元运装费为0.2元;10.01-1000元运装费为0元;'
        }, {
          'deliveryArea': '四川省-成都市-青羊区:东坡街道,光华街道',
          'deliveryPrice': '0-10元运装费为0.2元;10.01-1000元运装费为0元;'
        }
      ],
      'sendDetail': '测试内容bf49'
    },
    'msg': '测试内容p1qv',
    'state': 35587
  })
  res.json(data)
})

// 获取参团列表
router.get('/getGroupList', (req, res, next) => {

  console.log('4444444:', req.session)
  let data = Mock.mock({
    'data|1-5': [
      {
        'activityId': '测试内容o71t', // 活动id
        'headName': '测试内容42hd', // 团长名
        'joinId': '测试内容3e7q', // 组团id
        'joinSpellNum': 83820, // 参团人数
        'spellImg': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda'), // 图片url
        'spellName': Random.ctitle(3, 30)// 团名称
      }
    ],
    'msg': '成功',
    'state': 73773
  })
  res.json(data)
})

router.post('/gettest', (req, res, next) => {
  console.log('222222:', req.session)
  let token = req.query.token
  let nowTime = req.query.nowTime
  let endTime = req.query.endTime
  let data = Mock.mock({
    'data': [{
      'title': Random.ctitle(3, 30)
    }, {
      'title': Random.ctitle(3, 30)
    }, {
      'title': Random.ctitle(3, 30)
    }, {
      'title': Random.ctitle(3, 30)
    }]
  })
  res.json(data)
})

router.post('/posttest', (req, res, next) => {
  req.session.name = req.body.name
  req.session.password = req.body.password
  console.log('333333:', req.session)
  // req.headers['content-type'] = "application/x-www-form-urlencoded"
  res.send('1')
})


// 我的拼团
router.post('/myGroups', (req, res, next) => {
  let data={state :req.body.state,shopId:req.body.shopId,storeId:req.body.storeId,buyerId:req.body.buyerId,pageIndex:req.body.pageIndex,pageSize:req.body.pageSize}
  let token = takeManager.getToken()
  let timestamp = (new Date()).getTime()
  request(
    {
      url:'http://emcs.quanyou.com.cn/spellapi/spell/getMyCreate?token='+token+'&timestamp='+timestamp,
      method: "POST",
      json:data
    },
    function (error, response, body) {
      if (error) {
        return console.error(error);
      }else {
        res.send(body)
      }
    })

})

// 我的参团
router.post('/myOffered', (req, res, next) => {
  let state = req.body.state
  let shopId = req.body.shopId
  let storeId = req.body.storeId
  let buyerId = req.body.buyerId
  let pageIndex = req.body.pageIndex
  let pageSize = req.body.pageSize
  let token = takeManager.getToken()
  let timestamp = (new Date()).getTime()
  request(
    {
      url:'http://emcs.quanyou.com.cn/spellapi/spell/getMyJoin?token='+token+'&timestamp='+timestamp,
      method: "POST",
      json:{state:state, shopId:shopId, storeId:storeId, buyerId:buyerId, pageIndex:pageIndex, pageSize:pageSize}
    },
    function (error, response, body) {
      if (error) {
        return console.error(error);
      }else {
        res.send(body)
      }
    })

})


//活动首页head请求转发
router.post('/activityDetails', (req, res, next) => {
  // 接收到数据后 请求活动首页接口
  let shopId = req.body.shopId
  let storeId = req.body.storeId
  // request post请求带参写法
  request.post('http://172.30.3.40:9086/mockjsdata/5/spell/getSpellCategory',{json:{shopId: shopId,storeId: storeId}}, function (error, response, body) {
    if (error) {
      res.send('0')
    } else {
      res.send(body)
    }
  })
})

//用于测试request  post转发过来的参数是否为空的接口  地址为http://127.0.0.1:3222/spell/testgg
router.post('/testgg', (req, res, next) => {
  res.send('222')
})

router.get('/postTest', (req, res, next) => {
  let shopId = req.query.shopId
  let storeId = req.query.storeId
  request.post('http://172.30.3.40:9090/spellapi/getSpellCategory',{json:{shopId: shopId,storeId: storeId}}, function (err, response, body) {
    res.send(body)
  })
})

//是否关注
router.post('/isAttention', (req, res, next) => {
  // console.log('我正在查询是否关注')
  let Inquire = req.body
  // console.log(Inquire)
  // request.post('http://emcs.quanyou.com.cn/emall/wxBuyer/isAttention',{json:{data: Inquire}}, function (err, response, body) {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     res.send(body)
  //   }
  // })
  res.send(Inquire)
})

//是否有顾问
router.post('/consultant', (req, res, next) => {
  // console.log('我正在查询是否有导购')
  let Inquire = req.body
  // console.log(Inquire)
  request.post('http://emcs.quanyou.com.cn/emall/wxBuyer/haveGuWen',{json:{data: Inquire}}, function (err, response, body) {
    if (err) {
      res.send(err)
    } else {
      res.send(body)
    }
  })
})

export default router
