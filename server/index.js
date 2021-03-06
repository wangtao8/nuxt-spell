import Nuxt from 'nuxt'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import axios from 'axios'

import api from './spell'

const app = express()
const host = process.env.HOST
const port = process.env.PORT || 3222

// 使用body 不然 req.body为undifined
app.use(bodyParser.json())

app.use(cookieParser())

app.use(session({
  secret: '88888',
  cookie: '',
  resave: true,
  saveUninitialized: false
}))
app.use(function (req, res, next) {
  let url = req.url
  if (new Date().getTime() >= takeManager.getIvaliDate()) {
    axios.post('http://emcs.quanyou.com.cn/spellapi/auth/getToken',{"userName":"ApiActivity_2018", "password":"qy_api_#365!2018"})
      .then(function (response) {
        global.token = response.data.data.token
        global.invalidDate = response.data.data.invalidDate
      })
  } else {
    global.token = takeManager.getToken()
    global.invalidDate = takeManager.getIvaliDate()
  }
  let baseUrl = 'https://emcs.quanyou.com.cn'
  if (url.indexOf('/spell/getGroupInfo') >= 0 || url.indexOf('/spell/getHasBeenGroup') >= 0 || url.indexOf('/spell/myOffered') >= 0 || url.indexOf('/spell/myGroups') >= 0 || url.indexOf('/spell/gethead') >= 0 || url.indexOf('/spell/gettitle') >= 0 || url.indexOf('/spell/getclass') >= 0 || url.indexOf('/spell/test/toAuth') >= 0 || url.indexOf('/spell/_nuxt/') >= 0 || url.indexOf('__webpack_hmr') >= 0 || url.indexOf('/spell/toAuth') >= 0 || url.length == 1) {
    next ()
  } else {
    // sessionInfo  用户信息
    let sessionInfo = req.session.sessionInfo
    // console.log('转发这里的session:', sessionInfo)
    // console.log('外面的url:', req.url)
    if (sessionInfo !== "" && sessionInfo !== undefined && sessionInfo !== 'undefined') {

      // console.log('判断我是否原来值有appId：', req.query.appId)

      if (!!req.query.appId && url.indexOf('/spell/boon') >= 0 || !!req.query.appId && url.indexOf('/spell/?') >= 0 ) {

          next ()

      } else if (url.indexOf('/spell/boon') >= 0 || url.indexOf('/spell/?') >= 0 ) {

          return res.redirect( baseUrl +req.url + '&appId=' + req.session.sessionInfo.appId )

      } else {

        next ()

      }
    } else {
      // console.log('url:', baseUrl +'/spell/test/toAuth?url=' + baseUrl + encodeURIComponent(url))
      return res.redirect( baseUrl +'/spell/test/toAuth?url=' + baseUrl + encodeURIComponent(url))
    }
  }
})

app.set('port', port)

// Import API Routes
app.use('/spell', api)
// app.use('${config.router.base}spell', spell)
// Start nuxt.js
async function start () {
  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(process.env.NODE_ENV === 'production')
  // Instanciate nuxt.js
  const nuxt = await new Nuxt(config)
  // Add nuxt.js middleware
  app.use(nuxt.render)
  // Build in development
  if (config.dev) {
    try {
      await nuxt.build()
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      process.exit(1)
    }
  }
  // Listen the server
  app.listen(3222, host)
  console.log('Server listening on 192.168.79.12:3222') // eslint-disable-line no-console
}

import takeManager from './tokenManager'
  takeManager.init()

start()
