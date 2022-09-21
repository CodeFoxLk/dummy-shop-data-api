import { Router } from "express"
import {signUp, signupValidations} from "../controllers/auth/sign_up.js"
import { login, loginValidations } from "../controllers/auth/log_in.js"


const authRouter = Router()

authRouter.post('/signup', signupValidations, signUp)
authRouter.post('/login', loginValidations, login)

export default authRouter