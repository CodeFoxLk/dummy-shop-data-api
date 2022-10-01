import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
// import morgan from 'morgan'
// import fs from 'fs'
import { connect } from 'mongoose'
// import path from 'path'

//environment variables configuratuiions
import { MONGODB, PORT } from './config.js'

//header  - for CORS
import corsHeader from './utils/cors_header.js'

//routers
import productRouter from './routers/product_router.js'
import authRouter from './routers/auth_router.js'
import userRouter from './routers/user_router.js'
import orderRouter from './routers/order_router.js'

//utils and helpers
import errorResponse from './utils/error_handlers/error_response.js'

const app = express()

//for security
app.use(helmet())

//for CORS
app.use(corsHeader)

app.use(bodyParser.json())

//static paths
app.use('/images', express.static('images'))

//
//
// create a write stream (in append mode) for request logging
// var accessLogStream = fs.createWriteStream(
//   path.join(path.dirname('logs'), 'logs', 'log.log'),
//   {
//     flags: 'a'
//   }
// )
// setup the logger
//app.use(morgan('combined', { stream: accessLogStream }))

//
//
//routes

app.use(productRouter)
app.use(authRouter)
app.use(userRouter)
app.use(orderRouter)

//errorHandler
app.use(errorResponse)

const mongoURI = `${MONGODB}`

connect(mongoURI)
  .then((r) => {
    //mongoose manage one connection behind the scene. it always provide same connection.
    //therefor we dont have to manage multiple connection creations
    app.listen(PORT)
    console.log('mongoose connected')
  })
  .catch((e) => console.log(e))
