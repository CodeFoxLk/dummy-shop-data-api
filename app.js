
import express from 'express'
import  bodyParser from 'body-parser'
import { connect } from 'mongoose'
import { dirname }  from 'path'

//environment variables configuratuiions
import {MONGODB , PORT}  from './config.js'


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

//for CORS
app.use(corsHeader)

app.use(bodyParser.json())

//static paths
app.use('/images', express.static(dirname('images')))

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
