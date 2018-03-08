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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 1 */
/***/ function(module, exports) {

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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-default/index.css' }]
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
    }
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
  plugins: [{ src: './plugins/mint-ui', ssr: true }],
  css: ['assets/main.css']
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users__ = __webpack_require__(8);




var router = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Add USERS Routes
router.use(__WEBPACK_IMPORTED_MODULE_1__users__["a" /* default */]);

/* harmony default export */ exports["a"] = router;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("body-parser");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("cookie-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("express-session");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_request__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mockjs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mockjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mockjs__);


// import nuxtSchema from '../../db/nuxtserrver'


var Random = __WEBPACK_IMPORTED_MODULE_2_mockjs___default.a.Random;
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
  var data = {
    'data': {
      'activityId': '',
      'endTime': '2017-3-7 17:45:0',
      'homeBannerUrl': 'http://imagecs.quanyou.com.cn/group1/M00/00/52/rB4DMFp0TliACzt-AAA2BCwZngQ318.jpg'
    },
    'msg': '获取活动首页基本信息失败！',
    'state': 1
  };
  res.json(data);
});

// 获得分类
router.post('/gettitle', function (req, res, next) {
  var data2 = __WEBPACK_IMPORTED_MODULE_2_mockjs___default.a.mock({
    'data': [{
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
    }],
    msg: '失败o ！',
    state: 1
  });
  res.json(data2);
  // console.log(data2)
});

// 获得商品
router.post('/getclass', function (req, res, next) {
  // console.log('activityId:', req.body.activityId, 'categoryId:', req.body.categoryId, 'pageIndex:', req.body.pageIndex)
  var data = __WEBPACK_IMPORTED_MODULE_2_mockjs___default.a.mock({
    'data': {
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
    },
    msg: '成功！',
    state: 1
  });
  res.json(data);
  // console.log(data)
});

// 商品详情页
router.get('/getDetail', function (req, res, next) {
  // 存入session
  req.session.name = req.query.name;
  req.session.password = req.query.password;
  // console.log('name:', req.session)
  var url = [];
  var timeId = setInterval(function () {
    var aa = Random.image('750x750', Random.color(), '#FFF', 'png', 'heheda');
    url.push(aa);
    if (url.length > 10) {
      clearInterval(timeId);
      // 第一个参数是数据  第二个不知道  第三个代表缩进多少
      url = JSON.stringify(url, null, 1);
      var data = __WEBPACK_IMPORTED_MODULE_2_mockjs___default.a.mock({
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

  // console.log(JSON.stringify(data))
});

// 运费规则
router.get('/getRule', function (req, res, next) {
  var data = __WEBPACK_IMPORTED_MODULE_2_mockjs___default.a.mock({
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
  var data = __WEBPACK_IMPORTED_MODULE_2_mockjs___default.a.mock({
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

router.get('/gettest', function (req, res, next) {
  var data = __WEBPACK_IMPORTED_MODULE_2_mockjs___default.a.mock({
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
  // req.headers['content-type'] = "application/x-www-form-urlencoded"
  // console.log('333333333333:', req.body)
  res.send('1');
});

/* harmony default export */ exports["a"] = router;

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("mockjs");

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("request");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_2_node_modules_babel_runtime_regenerator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_2_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_E_2_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cookie_parser__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_session__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_express_session__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api__ = __webpack_require__(2);


// Start nuxt.js
var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_2_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
    var config, nuxt;
    return __WEBPACK_IMPORTED_MODULE_0_E_2_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Import and Set Nuxt.js options
            config = __webpack_require__(1);

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
  secret: '12345',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: true
}));

app.set('port', port);

// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_6__api__["a" /* default */]);

start();

/***/ }
/******/ ]);
//# sourceMappingURL=main.map