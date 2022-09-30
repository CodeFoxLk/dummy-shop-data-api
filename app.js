import express from 'express'
import  bodyParser from 'body-parser'
import { connect } from 'mongoose'
import { dirname }  from 'path'
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

const uri =
  'mongodb+srv://eshan_admin:sample_mongo_pw@cluster0.xzbpzq0.mongodb.net/shop?retryWrites=true&w=majority'

connect(uri)
  .then((r) => {
    //mongoose manage one connection behind the scene. it always provide same connection.
    //therefor we dont have to manage multiple connection creations
    app.listen(3000)
    console.log('mongoose connected')
  })
  .catch((e) => console.log(e))
