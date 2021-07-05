import express from 'express'
import cors from 'cors'
import httpContext from 'express-http-context'
import {getRouter} from './router'
import {filterHeaders} from './utils/headers'
import {initEncryption} from "./crypto/crypto";

let app = express()

// Set content type GLOBALLY for any response.
app.use(function (req, res, next) {
  res.contentType('application/json')
  next()
})

app.use((req, res, next) => {
  res.setHeader('Cache-control', 'no-cache,no-store,must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  next()
})

app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send({
    text: 'Hello Human 🖖🖖🖖🖖🖖. You have arrived at the Jobsalrt BFF server !!'
  })
})

app.use(httpContext.middleware)
app.use((req, res, next) => {
  const headers = filterHeaders(req.headers)
  httpContext.set('headers', headers)
  next()
})

app.use(initEncryption)

app.use(cors())
app.use('/api', getRouter())

app.disable('x-powered-by')

export default app

