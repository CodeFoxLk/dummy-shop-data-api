import express from 'express'
import deleteCartProduct from '../controllers/cart/delete_cart_item.js'
import getCart from '../controllers/cart/get_cart.js'
import updateCart from '../controllers/cart/update_cart.js'
import getProfile from '../controllers/user/get_profile.js'
import isAuth from '../middlewares/is_auth.js'



const router = express.Router()
router.get('/profile', isAuth, getProfile)

router.put('/update_cart', isAuth, updateCart)
router.get('/cart', isAuth ,getCart)
router.delete('/delete_cart_items',isAuth, deleteCartProduct)

export default router
