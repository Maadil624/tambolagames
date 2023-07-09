import express from 'express'
import userController from '../controller/userController.js'
import { loginController } from '../controller/loginController.js'
import getanswers, {generateticket } from '../controller/ticketcontroller.js'

// initilize express withb pre defined method rooouter for routing
const route=express.Router()

route.post('/register',userController)
route.post('/login',loginController)
route.post('/generateticket',generateticket)
route.post('/getanswers',getanswers)
// route.post('/alltickets',alltickets)

export default route