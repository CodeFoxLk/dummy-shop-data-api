import express from 'express'
import getRecentOrders from '../controllers/orders/get_orders.js'
import { purchaseProducts, purchaseValidations } from '../controllers/orders/purchase.js'
import isAuth from '../middlewares/is_auth.js'
const orderRouter = express.Router()


orderRouter.post('/purchase', isAuth, purchaseValidations, purchaseProducts)
orderRouter.get('/recent_orders', isAuth, getRecentOrders)


export default orderRouter