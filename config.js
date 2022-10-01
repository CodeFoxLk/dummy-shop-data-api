import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

//console.log(process.env.NODE_ENV)
//dotenv.config({ path: process.env.NODE_ENV === 'production' ? './.env' : './dev.env' })
dotenv.config({  })

//export const NODE_ENV = process.env.NODE_ENV
//export const HOST = process.env.HOST 
export const PORT = process.env.PORT 
export const MONGODB = process.env.MONGODB
export const JWTSECRET = process.env.JWTSECRET
