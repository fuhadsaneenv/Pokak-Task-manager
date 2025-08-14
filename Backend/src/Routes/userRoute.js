import express from 'express'
import { login, logout, register } from '../Controller/UserController.js'

const UserRouter=express.Router()

UserRouter.post('/register',register)
UserRouter.post('/login',login)
UserRouter.post('/logOut',logout)




export default UserRouter