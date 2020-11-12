/* eslint-disable no-console */
const express = require('express')
const morgan = require('morgan')
var path = require('path');

const { PORT } = require('./config')

const { Instance, Timer, Proxy } = require('./domain')

// Create Express Server
const app = express()

app.use(express.static('public'));
app.use(morgan('dev'))

app.use(
  '',
  Instance.Service.getInstanceMiddleware,
  Instance.Service.getInstanceBasedOnCookieMiddleware,
  Timer.Service.timersMiddleware,
  Proxy.Service.proxyMiddleware
)

app.use((err, req,res,next) => {  
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

// Start the Proxy
app.listen(PORT, () => {
  console.log(`Starting Proxy at: ${PORT}`)
})
