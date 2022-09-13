const express = require("express")



//routers
const productRouter = require("./routers/product_router")

const app = express()
app.use(productRouter)


app.listen(3000)