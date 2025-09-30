import express from'express'
import { checkuser, getstudents, getTeachers, register } from '../Controllers/Auth.js'
import { login } from '../Controllers/Auth.js'
import { logout } from '../Controllers/Auth.js'
import { isuser } from '../MiddleWare/VerifyToken.js'

const AuthRoutes = express.Router()

AuthRoutes.post('/register',register)
AuthRoutes.post('/login',login)
AuthRoutes.post('/logout',logout)
AuthRoutes.get('/getteachers',getTeachers)
AuthRoutes.get('/getstudents',getstudents)
AuthRoutes.get('/checkuser',isuser,checkuser)

export default AuthRoutes