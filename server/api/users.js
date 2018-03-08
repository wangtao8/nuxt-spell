import { Router } from 'express'
import request from 'request'
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
  let data = {
    'data': {
      'activityId': '',
      'endTime': '2017-3-7 17:45:0',
      'homeBannerUrl': 'http://imagecs.quanyou.com.cn/group1/M00/00/52/rB4DMFp0TliACzt-AAA2BCwZngQ318.jpg'
    },
    'msg': '获取活动首页基本信息失败！',
    'state': 1
  }
  res.json(data)
})

// 获得分类
router.post('/gettitle', (req, res, next) => {
  let data2 = Mock.mock({
    'data': [
      {
        'categoryName': '全部',
        'id': 'all'
      }, {
        'categoryName': '厨房',
        'id': 'cf'
      }, {
        'categoryName': '餐厅',
        'id': 'ct'
      }, {
        'categoryName': '阳台/卫生间',
        'id': 'yt'
      }, {
        'categoryName': '浴室',
        'id': 'ys'
      }, {
        'categoryName': '儿童房',
        'id': 'et'
      }, {
        'categoryName': '书房',
        'id': 'sf'
      }
    ],
    msg: '失败o ！',
    state: 1
  })
  res.json(data2)
  // console.log(data2)
})

// 获得商品
router.post('/getclass', (req, res, next) => {
  // console.log('activityId:', req.body.activityId, 'categoryId:', req.body.categoryId, 'pageIndex:', req.body.pageIndex)
  let data = Mock.mock({
    'data': ({
      content: [{
        'all|3': [{
          'goodsName': Random.ctitle(3, 30),
          'headPrice|+1': 71,
          'memberPrice|+1': 1,
          'marketPrice|+1': 1,
          'pic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
        }],
        'cf|3': [{
          'goodsName': Random.ctitle(3, 30),
          'headPrice|+1': 1,
          'memberPrice|+1': 1,
          'marketPrice|+1': 1,
          'pic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
        }],
        'ct|3': [{
          'goodsName': Random.ctitle(3, 30),
          'headPrice|+1': 11,
          'memberPrice|+1': 12,
          'marketPrice|+1': 13,
          'pic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
        }],
        'yt|3': [{
          'goodsName': Random.ctitle(3, 30),
          'headPrice|+1': 21,
          'memberPrice|+1': 22,
          'marketPrice|+1': 23,
          'pic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
        }],
        'ys|3': [{
          'goodsName': Random.ctitle(3, 30),
          'headPrice|+1': 31,
          'memberPrice|+1': 32,
          'marketPrice|+1': 33,
          'pic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
        }],
        'et|3': [{
          'goodsName': Random.ctitle(3, 30),
          'headPrice|+1': 41,
          'memberPrice|+1': 42,
          'marketPrice|+1': 43,
          'pic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
        }],
        'sf|3': [{
          'goodsName': Random.ctitle(3, 30),
          'headPrice|+1': 51,
          'memberPrice|+1': 52,
          'marketPrice|+1': 53,
          'pic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
        }]
      }]
    }),
    msg: '成功！',
    state: 1
  })
  res.json(data)
  // console.log(data)
})

// 商品详情页
router.get('/getDetail', (req, res, next) => {
  // 存入session
  req.session.name = req.query.name
  req.session.password = req.query.password
  // console.log('name:', req.session)
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

  // console.log(JSON.stringify(data))
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

router.get('/gettest', (req, res, next) => {
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
  // req.headers['content-type'] = "application/x-www-form-urlencoded"
  // console.log('333333333333:', req.body)
  res.send('1')
})

export default router
