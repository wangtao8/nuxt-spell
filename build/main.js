require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_schedule__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_schedule___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_node_schedule__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);


var rule = new __WEBPACK_IMPORTED_MODULE_0_node_schedule___default.a.RecurrenceRule();
// rule.hour(时)  rule.minute(分)  rule.second(秒)
rule.hour = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];
rule.minute = 0;
rule.second = 0;
var token = "";
var invalidDate = "";
//初始化token invalidDate
var init = function init() {
  __WEBPACK_IMPORTED_MODULE_1_axios___default.a.post('http://emcs.quanyou.com.cn/spellapi/auth/getToken', { "userName": "ApiActivity_2018", "password": "qy_api_#365!2018" }).then(function (response) {
    console.log('查询token:', response.data.data);
    token = response.data.data.token;
    invalidDate = response.data.data.invalidDate;
  });

  // 定时器查询token是否失效
  __WEBPACK_IMPORTED_MODULE_0_node_schedule___default.a.scheduleJob(rule, function () {
    var nowTime = new Date().getTime();
    console.log(new Date());
    console.log('时间对比：', nowTime, invalidDate);
    if (nowTime > invalidDate) {
      __WEBPACK_IMPORTED_MODULE_1_axios___default.a.post('http://emcs.quanyou.com.cn/spellapi/auth/getToken', { "userName": "ApiActivity_2018", "password": "qy_api_#365!2018" }).then(function (response) {
        console.log('查询token:', response.data.data);
        token = response.data.data.token;
        invalidDate = response.data.data.invalidDate;
      });
    } else {
      console.log('token暂未失效，继续使用');
    }
  });
};

// 返回当前token
var getToken = function getToken() {
  return token;
};

// 导出方法
/* harmony default export */ exports["a"] = {
  init: init,
  getToken: getToken
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

module.exports = {
  /*
  ** Router config
  */
  /*
  ** Headers of the page
  */
  head: {
    title: 'mynuxt',
    meta: [{ charset: 'utf-8' }, { hid: 'description', name: 'viewport', content: 'width=750,user-scalable=no,target-densitydpi=device-dpi' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  render: {
    bundleRenderer: {
      cache: __webpack_require__(11)({
        max: 1,
        maxAge: 1000 * 6
      })
    }
  },
  cache: {
    max: 1,
    maxAge: 6000
  },
  build: {
    extend: function extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /()/
        });
      }
    },

    vendor: ['./assets/js/jweixin-1.2.0.js']
  },
  router: {
    base: '/spell/'
  },
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  vender: ['axios', 'mint-ui', './assets/js/base.js'],
  babel: {
    'plugins': [['component', [{
      'libraryName': 'mint-ui',
      'style': true
    }]]],
    comments: true
  },
  plugins: [{ src: './plugins/mint-ui', ssr: true
    // { src: '~/plugins/axios', ssr: false}
  }],
  css: ['assets/main.css']
};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users__ = __webpack_require__(9);




var router = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Add USERS Routes
router.use(__WEBPACK_IMPORTED_MODULE_1__users__["a" /* default */]);

/* harmony default export */ exports["a"] = router;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("body-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("cookie-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("express-session");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_request__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tokenManager__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mockjs__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mockjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_mockjs__);



// import nuxtSchema from '../../db/nuxtserrver'


var Random = __WEBPACK_IMPORTED_MODULE_3_mockjs___default.a.Random;
// let nuxtlist = nuxtSchema.nuxtlist
// let tslist = nuxtSchema.tslist

var router = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
// 接口转发测试
router.get('/getmsg', function (req, res, next) {
  __WEBPACK_IMPORTED_MODULE_1_request___default()('http://10.10.1.191:3666/getall', function (error, response, body) {
    console.log('error:', error); // 返回错误信息
    console.log('statusCode:', response && response.statusCode); // 返回请求的状态码
    // console.log('body:', body)  返回回来的数据
    res.json(body);
  });
});

// 获得头部信息
router.post('/gethead', function (req, res, next) {
  var shopId = req.body.shopId;
  var storeId = req.body.storeId;
  var activityId = req.body.activityId;
  var token = __WEBPACK_IMPORTED_MODULE_2__tokenManager__["a" /* default */].getToken();
  var timestamp = new Date().getTime();
  var appId = req.query.appId;
  __WEBPACK_IMPORTED_MODULE_1_request___default.a.post('http://emcs.quanyou.com.cn/spellapi/spell/getSpellHomeInfo?token=' + token + '&timestamp=' + timestamp + '&appId=' + appId, { json: { shopId: shopId, storeId: storeId, activityId: activityId } }, function (err, response, body) {
    if (err) {
      res.json(body);
    } else {
      res.json(body);
    }
  });
});

// 获得分类
router.post('/gettitle', function (req, res, next) {
  // 接收到数据后 请求活动首页接口
  var shopId = req.body.shopId;
  var storeId = req.body.storeId;
  var token = __WEBPACK_IMPORTED_MODULE_2__tokenManager__["a" /* default */].getToken();
  var timestamp = new Date().getTime();
  __WEBPACK_IMPORTED_MODULE_1_request___default.a.post('http://emcs.quanyou.com.cn/spellapi/spell/getSpellCategory?token=' + token + '&timestamp=' + timestamp, { json: { shopId: shopId, storeId: storeId } }, function (err, response, body) {
    // console.log('我在打印body信息tttttttttttttttttttttttt:', body)
    res.json(body);
  });
});

// 获得商品
router.post('/getclass', function (req, res, next) {
  var shopId = req.body.shopId;
  var storeId = req.body.storeId;
  var activityId = req.body.activityId;
  var categoryId = req.body.categoryId;
  var pageIndex = req.body.pageIndex;
  var pageSize = req.body.pageSize;
  var token = __WEBPACK_IMPORTED_MODULE_2__tokenManager__["a" /* default */].getToken();
  var timestamp = new Date().getTime();
  __WEBPACK_IMPORTED_MODULE_1_request___default.a.post('http://emcs.quanyou.com.cn/spellapi/spell/getSpellGoods?token=' + token + '&timestamp=' + timestamp, { json: { shopId: shopId, storeId: storeId, activityId: activityId, categoryId: categoryId, pageIndex: pageIndex, pageSize: pageSize } }, function (err, response, body) {
    if (err) {
      res.json(body);
    } else {
      // console.log('class:', body)
      console.log('我在打印body信息wwwwwwwwwwwwwwwwwwwwwwwww:', body);
      res.json(body);
    }
  });
});

// 我的团信息获取
router.post('/getGroupInfo', function (req, res, next) {
  var shopId = req.body.shopId;
  var storeId = req.body.storeId;
  var activityId = req.body.activityId;
  var buyerId = req.body.buyerId;
  var teamId = req.body.teamId;
  var token = __WEBPACK_IMPORTED_MODULE_2__tokenManager__["a" /* default */].getToken();
  var timestamp = new Date().getTime();
  __WEBPACK_IMPORTED_MODULE_1_request___default.a.post('http://emcs.quanyou.com.cn/spellapi/spell/getTeamInfo?token=' + token + '&timestamp=' + timestamp, { json: { shopId: shopId, storeId: storeId, activityId: activityId, buyerId: buyerId, teamId: teamId } }, function (err, response, body) {
    res.json(body);
  });
});

// 获得已开团列表（除自己）
router.post('/getHasBeenGroup', function (req, res, next) {
  var shopId = req.body.shopId;
  var storeId = req.body.storeId;
  var activityId = req.body.activityId;
  var buyerId = req.body.buyerId;
  var pageIndex = req.body.pageIndex;
  var pageSize = req.body.pageSize;
  var token = __WEBPACK_IMPORTED_MODULE_2__tokenManager__["a" /* default */].getToken();
  var timestamp = new Date().getTime();
  __WEBPACK_IMPORTED_MODULE_1_request___default.a.post('http://emcs.quanyou.com.cn/spellapi/spell/getTeamList?token=' + token + '&timestamp=' + timestamp, { json: { shopId: shopId, storeId: storeId, activityId: activityId, buyerId: buyerId, pageIndex: pageIndex, pageSize: pageSize } }, function (err, response, body) {
    if (err) {
      res.json(body);
    } else {
      res.json(body);
    }
  });
});

// 去开团
router.post('/openGroup', function (req, res, next) {
  var activityId = req.body.activityId;
  var buyerId = req.body.buyerId;
  var nickName = req.body.nickName;
  var photo = req.body.photo;
  var shopId = req.body.shopId;
  var storeId = req.body.storeId;
  var token = __WEBPACK_IMPORTED_MODULE_2__tokenManager__["a" /* default */].getToken();
  var timestamp = new Date().getTime();
  __WEBPACK_IMPORTED_MODULE_1_request___default.a.post('http://emcs.quanyou.com.cn/spellapi/spell/createSpellTeam?token=' + token + '&timestamp=' + timestamp, { json: { activityId: activityId, buyerId: buyerId, nickName: nickName, photo: photo, shopId: shopId, storeId: storeId } }, function (err, response, body) {
    if (err) {
      res.json(body);
    } else {
      res.json(body);
    }
  });
});

router.post('/toAuth', function (req, res, next) {
  req.session.sessionInfo = req.body;

  res.send("1");
});

router.get('/testss', function (req, res, next) {
  __WEBPACK_IMPORTED_MODULE_1_request___default.a.get('http://192.168.79.8:9090/spellapi/spell/getTest', {}, function (err, response, body) {
    // 对象中包含特殊符号的取值办法response.headers['set-cookie']
    // response.headers['cookie'] = response.headers['set-cookie']
    // req.headers['cookie'] = response.headers['set-cookie']
    // response.headers['set-cookie'] = response.headers['set-cookie']
    // console.log(response.headers['set-cookie'][0])
    res.send("2222");
  });
});

//去参团
router.post('/goGroup', function (req, res, next) {
  var teamId = req.body.teamId;
  var buyerId = req.body.buyerId;
  var nickName = req.body.nickName;
  var photo = req.body.photo;
  var shopId = req.body.shopId;
  var storeId = req.body.storeId;
  var token = __WEBPACK_IMPORTED_MODULE_2__tokenManager__["a" /* default */].getToken();
  var timestamp = new Date().getTime();
  __WEBPACK_IMPORTED_MODULE_1_request___default.a.post('http://emcs.quanyou.com.cn/spellapi/spell/joinTeam?token=' + token + '&timestamp=' + timestamp, { json: { teamId: teamId, buyerId: buyerId, nickName: nickName, photo: photo, shopId: shopId, storeId: storeId } }, function (err, response, body) {
    if (err) {
      res.send(body);
    } else {
      res.send(body);
    }
  });
});

// 获取用户信息
router.post('/getUserInfo', function (req, res, next) {
  var shopId = req.body.shopId;
  var storeId = req.body.storeId;
  var openId = req.body.openId;
  __WEBPACK_IMPORTED_MODULE_1_request___default.a.post('https://emcs.quanyou.com.cn/emallwap/buyer/auth/' + storeId + '/' + shopId + '/' + openId, function (err, response, body) {
    res.send(body);
  });
});

// 获得用户token  没用
router.post('/getToken', function (req, res, next) {
  __WEBPACK_IMPORTED_MODULE_1_request___default.a.post('http://emcs.quanyou.com.cn/spellapi/auth/getToken', { json: { "userName": "ApiActivity_2018", "password": "qy_api_#365!2018" } }, function (err, response, body) {
    res.send(body);
  });
});

// 商品详情页
router.get('/getDetail', function (req, res, next) {
  // req.session.name = req.qeury.name
  console.log('req.session.name:', req.session);
  var url = [];
  var timeId = setInterval(function () {
    var aa = Random.image('750x750', Random.color(), '#FFF', 'png', 'heheda');
    url.push(aa);
    if (url.length > 10) {
      clearInterval(timeId);
      // 第一个参数是数据  第二个不知道  第三个代表缩进多少
      url = JSON.stringify(url, null, 1);
      var data = __WEBPACK_IMPORTED_MODULE_3_mockjs___default.a.mock({
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
      });
      res.json(data);
    }
  }, 50);
});

// 运费规则
router.get('/getRule', function (req, res, next) {
  var data = __WEBPACK_IMPORTED_MODULE_3_mockjs___default.a.mock({
    'date': {
      'deliveryFreight': [{
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
      }],
      'sendDetail': '测试内容bf49'
    },
    'msg': '测试内容p1qv',
    'state': 35587
  });
  res.json(data);
});

// 获取参团列表
router.get('/getGroupList', function (req, res, next) {

  console.log('4444444:', req.session);
  var data = __WEBPACK_IMPORTED_MODULE_3_mockjs___default.a.mock({
    'data|1-5': [{
      'activityId': '测试内容o71t', // 活动id
      'headName': '测试内容42hd', // 团长名
      'joinId': '测试内容3e7q', // 组团id
      'joinSpellNum': 83820, // 参团人数
      'spellImg': Random.image('180x180', Random.color(), '#FFF', 'png', 'heheda'), // 图片url
      'spellName': Random.ctitle(3, 30) // 团名称
    }],
    'msg': '成功',
    'state': 73773
  });
  res.json(data);
});

router.post('/gettest', function (req, res, next) {
  console.log('222222:', req.session);
  var token = req.query.token;
  var nowTime = req.query.nowTime;
  var endTime = req.query.endTime;
  var data = __WEBPACK_IMPORTED_MODULE_3_mockjs___default.a.mock({
    'data': [{
      'title': Random.ctitle(3, 30)
    }, {
      'title': Random.ctitle(3, 30)
    }, {
      'title': Random.ctitle(3, 30)
    }, {
      'title': Random.ctitle(3, 30)
    }]
  });
  res.json(data);
});

router.post('/posttest', function (req, res, next) {
  req.session.name = req.body.name;
  req.session.password = req.body.password;
  console.log('333333:', req.session);
  // req.headers['content-type'] = "application/x-www-form-urlencoded"
  res.send('1');
});

// 我的拼团
router.post('/myGroups', function (req, res, next) {
  var data = { state: req.body.state, shopId: req.body.shopId, storeId: req.body.storeId, buyerId: req.body.buyerId, pageIndex: req.body.pageIndex, pageSize: req.body.pageSize };
  var token = __WEBPACK_IMPORTED_MODULE_2__tokenManager__["a" /* default */].getToken();
  var timestamp = new Date().getTime();
  __WEBPACK_IMPORTED_MODULE_1_request___default()({
    url: 'http://emcs.quanyou.com.cn/spellapi/spell/getMyCreate?token=' + token + '&timestamp=' + timestamp,
    method: "POST",
    json: data
  }, function (error, response, body) {
    if (error) {
      return console.error(error);
    } else {
      res.send(body);
    }
  });
});

// 我的参团
router.post('/myOffered', function (req, res, next) {
  var state = req.body.state;
  var shopId = req.body.shopId;
  var storeId = req.body.storeId;
  var buyerId = req.body.buyerId;
  var pageIndex = req.body.pageIndex;
  var pageSize = req.body.pageSize;
  var token = __WEBPACK_IMPORTED_MODULE_2__tokenManager__["a" /* default */].getToken();
  var timestamp = new Date().getTime();
  __WEBPACK_IMPORTED_MODULE_1_request___default()({
    url: 'http://emcs.quanyou.com.cn/spellapi/spell/getMyJoin?token=' + token + '&timestamp=' + timestamp,
    method: "POST",
    json: { state: state, shopId: shopId, storeId: storeId, buyerId: buyerId, pageIndex: pageIndex, pageSize: pageSize }
  }, function (error, response, body) {
    if (error) {
      return console.error(error);
    } else {
      res.send(body);
    }
  });
});

//活动首页head请求转发
router.post('/activityDetails', function (req, res, next) {
  // 接收到数据后 请求活动首页接口
  var shopId = req.body.shopId;
  var storeId = req.body.storeId;
  // request post请求带参写法
  __WEBPACK_IMPORTED_MODULE_1_request___default.a.post('http://172.30.3.40:9086/mockjsdata/5/spell/getSpellCategory', { json: { shopId: shopId, storeId: storeId } }, function (error, response, body) {
    if (error) {
      res.send('0');
    } else {
      res.send(body);
    }
  });
});

//用于测试request  post转发过来的参数是否为空的接口  地址为http://127.0.0.1:3222/spell/testgg
router.post('/testgg', function (req, res, next) {
  res.send('222');
});

router.get('/postTest', function (req, res, next) {
  var shopId = req.query.shopId;
  var storeId = req.query.storeId;
  __WEBPACK_IMPORTED_MODULE_1_request___default.a.post('http://172.30.3.40:9090/spellapi/getSpellCategory', { json: { shopId: shopId, storeId: storeId } }, function (err, response, body) {
    res.send(body);
  });
});

//是否关注
router.post('/isAttention', function (req, res, next) {
  // console.log('我正在查询是否关注')
  var Inquire = req.body;
  // console.log(Inquire)
  // request.post('http://emcs.quanyou.com.cn/emall/wxBuyer/isAttention',{json:{data: Inquire}}, function (err, response, body) {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     res.send(body)
  //   }
  // })
  res.send(Inquire);
});

//是否有顾问
router.post('/consultant', function (req, res, next) {
  // console.log('我正在查询是否有导购')
  var Inquire = req.body;
  // console.log(Inquire)
  __WEBPACK_IMPORTED_MODULE_1_request___default.a.post('http://emcs.quanyou.com.cn/emall/wxBuyer/haveGuWen', { json: { data: Inquire } }, function (err, response, body) {
    if (err) {
      res.send(err);
    } else {
      res.send(body);
    }
  });
});

/* harmony default export */ exports["a"] = router;

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("axios");

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("lru-cache");

/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports = require("mockjs");

/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = require("node-schedule");

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = require("request");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_F_02_nuxt_spell_node_modules_babel_runtime_regenerator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_F_02_nuxt_spell_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_F_02_nuxt_spell_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cookie_parser__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_session__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_express_session__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__spell__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tokenManager__ = __webpack_require__(1);


// app.use('${config.router.base}spell', spell)
// Start nuxt.js
var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_F_02_nuxt_spell_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
    var config, nuxt;
    return __WEBPACK_IMPORTED_MODULE_0_F_02_nuxt_spell_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Import and Set Nuxt.js options
            config = __webpack_require__(2);

            config.dev = !("development" === 'production');
            // Instanciate nuxt.js
            _context.next = 4;
            return new __WEBPACK_IMPORTED_MODULE_1_nuxt___default.a(config);

          case 4:
            nuxt = _context.sent;

            // Add nuxt.js middleware
            app.use(nuxt.render);
            // Build in development

            if (!config.dev) {
              _context.next = 16;
              break;
            }

            _context.prev = 7;
            _context.next = 10;
            return nuxt.build();

          case 10:
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](7);

            console.error(_context.t0); // eslint-disable-line no-console
            process.exit(1);

          case 16:
            // Listen the server
            app.listen(3222, host);
            console.log('Server listening on 192.168.79.12:3222'); // eslint-disable-line no-console

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[7, 12]]);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }









var app = __WEBPACK_IMPORTED_MODULE_2_express___default()();
var host = process.env.HOST;
var port = process.env.PORT || 3222;

// 使用body 不然 req.body为undifined
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json());

app.use(__WEBPACK_IMPORTED_MODULE_4_cookie_parser___default()());

app.use(__WEBPACK_IMPORTED_MODULE_5_express_session___default()({
  secret: '88888',
  cookie: { maxAge: 1 * 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: false
}));

app.use(function (req, res, next) {
  var url = req.url;
  var baseUrl = 'https://emcs.quanyou.com.cn';
  // let baseUrl = 'http://127.0.0.1:3222'
  // console.log(url,url.indexOf('/spell/test/toAuth'))
  if (url.indexOf('/spell/getHasBeenGroup') >= 0 || url.indexOf('/spell/myOffered') >= 0 || url.indexOf('/spell/myGroups') >= 0 || url.indexOf('/spell/gethead') >= 0 || url.indexOf('/spell/gettitle') >= 0 || url.indexOf('/spell/getclass') >= 0 || url.indexOf('/spell/test/toAuth') >= 0 || url.indexOf('/spell/_nuxt/') >= 0 || url.indexOf('__webpack_hmr') >= 0 || url.indexOf('/spell/toAuth') >= 0 || url.length == 1) {
    next();
  } else {
    // sessionInfo  用户信息
    var sessionInfo = req.session.sessionInfo;
    if (sessionInfo !== "" && sessionInfo !== undefined && sessionInfo !== 'undefined') {
      next();
    } else {
      // let storeId = url.split('storeId=')[1].split('&')[0]
      // console.log('服务器里面的storeId:', 'https://emcs.quanyou.com.cn/spell/test/toAuth?&url=' + baseUrl + url)
      return res.redirect(baseUrl + '/spell/test/toAuth?url=' + baseUrl + url);
    }
  }
});

app.set('port', port);

// Import API Routes
app.use('/spell', __WEBPACK_IMPORTED_MODULE_6__spell__["a" /* default */]);


__WEBPACK_IMPORTED_MODULE_7__tokenManager__["a" /* default */].init();

start();

/***/ }
/******/ ]);
//# sourceMappingURL=main.map