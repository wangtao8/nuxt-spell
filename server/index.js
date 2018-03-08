import Nuxt from 'nuxt'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'

import api from './api'

const app = express()
const host = process.env.HOST
const port = process.env.PORT || 3222

// 使用body 不然 req.body为undifined
app.use(bodyParser.json())

app.use(cookieParser())

app.use(session({
  secret: '12345',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: true
}))

app.set('port', port)

// Import API Routes
app.use('/api', api)

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

start()
