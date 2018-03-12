import { Router } from 'express'
import request from 'request'
import nuxtSchema from '../../db/nuxtserrver'
import Mock from 'mockjs'
let Random = Mock.Random
let nuxtlist = nuxtSchema.nuxtlist
let tslist = nuxtSchema.tslist

let router = Router()

// 接口转发测试
router.get('/getmsg', (req, res, next) => {
  request('http://10.10.1.191:3666/getall', function (error, response, body) {
    console.log('error:', error) // 返回错误信息
    console.log('statusCode:', response && response.statusCode) // 返回请求的状态码
    //console.log('body:', body) // 返回回来的数据
    res.json(body)
  });
})

// 获得分类
router.get('/gettitle', (req, res, next) => {
  let data2 = Mock.mock({
    'choose': [{
      'categoryName': '全部',
      'id': 'all'
    },{
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
    }]
  });
  res.json(data2)
  // console.log(data2)
})

// 获得商品
router.get('/getclass', (req, res, next) => {
  let data = Mock.mock({
    'all|1-10': [{
      'goodsName': Random.ctitle(3, 30),
      'salesPrice|+1': 71,
      'spellPrice|+1': 1,
      'marketPrice|+1': 1,
      'goodsPic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
    }],
    'cf|1-10': [{
      'goodsName': Random.ctitle(3, 30),
      'salesPrice|+1': 1,
      'spellPrice|+1': 1,
      'marketPrice|+1': 1,
      'goodsPic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
    }],
    'ct|1-10': [{
      'goodsName': Random.ctitle(3, 30),
      'salesPrice|+1': 11,
      'spellPrice|+1': 12,
      'marketPrice|+1': 13,
      'goodsPic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
    }],
    'yt|1-10': [{
      'goodsName': Random.ctitle(3, 30),
      'salesPrice|+1': 21,
      'spellPrice|+1': 22,
      'marketPrice|+1': 23,
      'goodsPic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
    }],
    'ys|1-10': [{
      'goodsName': Random.ctitle(3, 30),
      'salesPrice|+1': 31,
      'spellPrice|+1': 32,
      'marketPrice|+1': 33,
      'goodsPic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
    }],
    'et|1-10': [{
      'goodsName': Random.ctitle(3, 30),
      'salesPrice|+1': 41,
      'spellPrice|+1': 42,
      'marketPrice|+1': 43,
      'goodsPic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
    }],
    'sf|1-10': [{
      'goodsName': Random.ctitle(3, 30),
      'salesPrice|+1': 51,
      'spellPrice|+1': 52,
      'marketPrice|+1': 53,
      'goodsPic': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda')
    }],
    'content': Random.paragraph()
  })
  res.json(data)
  // console.log(data)
})

// 商品详情页
router.get('/getDetail', (req, res, next) => {
  let url = [];
  let timeId = setInterval(function () {
    let aa = Random.image('750x750', Random.color(), '#FFF', 'png', 'heheda');
    url.push(aa);
    if(url.length > 10){
      clearInterval(timeId);
      //第一个参数是数据  第二个不知道  第三个代表缩进多少
      url = JSON.stringify(url, null, 1);
      let data = Mock.mock({
        "date": [{
          "contentsPic": url,
          "goodsDetail": {
            "goodsName": Random.ctitle(3, 30),
            "headPrice": 100, //团长价
            "marketPrice": 300, //市场价
            "pics": Random.ctitle(3, 10),
            "spellPrice": 200 //拼团价
          },
          "isShowBuy": false,
          "showAttributeList": [{
            "attributeName": "颜色",
            "attributeOptionList": ["蓝色", "红色", "绿色"]
          }, {
            "attributeName": "抽屉",
            "attributeOptionList": ["一抽", "两抽", "三抽"]
          }, {
            "attributeName": "品牌",
            "attributeOptionList": ["好", "中", "坏"]
          }, {
            "attributeName": "几台",
            "attributeOptionList": ["一", "二", "三"]
          }, {
            "attributeName": "几台",
            "attributeOptionList": ["一", "二", "三"]
          }, {
            "attributeName": "几台",
            "attributeOptionList": ["一", "二", "三"]
          }, {
            "attributeName": "几台",
            "attributeOptionList": ["一", "二", "三"]
          }]
        }],
        "msg": "请求成功！",
        "state": 1
      })
      res.json(data)
    }
  },50);

  // console.log(JSON.stringify(data))
})

// 运费规则
router.get('/getRule', (req, res, next) => {
  let data = Mock.mock({
    "date": {
    "deliveryFreight": [
      {
        "deliveryArea": "四川省-成都市-青羊区:东坡街道,光华街道",
        "deliveryPrice": "0-10元运装费为0.2元;10.01-1000元运装费为0元;"
      }, {
        "deliveryArea": "四川省-成都市-青羊区:东坡街道,光华街道",
        "deliveryPrice": "0-10元运装费为0.2元;10.01-1000元运装费为0元;"
      }, {
        "deliveryArea": "四川省-成都市-青羊区:东坡街道,光华街道",
        "deliveryPrice": "0-10元运装费为0.2元;10.01-1000元运装费为0元;"
      }, {
        "deliveryArea": "四川省-成都市-青羊区:东坡街道,光华街道",
        "deliveryPrice": "0-10元运装费为0.2元;10.01-1000元运装费为0元;"
      }
    ],
      "sendDetail": "测试内容bf49"
  },
    "msg": "测试内容p1qv",
    "state": 35587
  })
  res.json(data)
})

// 获取参团列表
router.get('/getGroupList', (req, res, next) => {
  let data = Mock.mock({
    "data|1-5": [
      {
        "activityId": "测试内容o71t",// 活动id
        "headName": "测试内容42hd",// 团长名
        "joinId": "测试内容3e7q",// 组团id
        "joinSpellNum": 83820,// 参团人数
        "spellImg": Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda'),// 图片url
        "spellName": Random.ctitle(3, 30)// 团名称
      }
    ],
    "msg": "成功",
    "state": 73773
  })
  res.json(data)
})

router.get('/gettest', (req, res, next) => {
  let data = Mock.mock({
    "data" : [{
      "title" : Random.ctitle(3, 30)
    }, {
      "title" : Random.ctitle(3, 30)
    }, {
      "title" : Random.ctitle(3, 30)
    }, {
      "title" : Random.ctitle(3, 30)
    }]
  })
  res.json(data)
})

export default router
