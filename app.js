const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
//header  - for CORS
const header = require('./utils/cors_header')

//routers
const productRouter = require('./routers/product_router')
const authRouter = require('./routers/auth_router')

//utils and helpers
const errorResponse = require('./utils/error_response')

const app = express()

//for CORS
app.use(header)
app.use(bodyParser.json())

//static paths
app.use('/images', express.static(path.join(__dirname, 'images')))

//routes

app.use(productRouter)
app.use(authRouter)

//errorHandler
app.use(errorResponse)

const uri =
  'mongodb+srv://eshan_admin:sample_mongo_pw@cluster0.xzbpzq0.mongodb.net/shop?retryWrites=true&w=majority'

mongoose
  .connect(uri)
  .then((r) => {
    //mongoose manage one connection behind the scene. it always provide same connection.
    //therefor we dont have to manage multiple connection creations
    app.listen(3000)
    console.log('mongoose connected')
  })
  .catch((e) => console.log(e))
