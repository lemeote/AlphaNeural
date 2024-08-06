/**
 * @notice module from online
 */
import express from "express";

/**
 * @notice module from online
 */
import Middlewares from '../api/middlewares'
import Authentication from '../api/authentication'
import UserRouter from '../user/router'

/**
 * @author Lee Jin
 * @title Application Routes
 * @notice Handle Get and Post request.
*/

const router = express.Router()

/** 
 * @notice Application Routes
 * @notice Get and Post methods are available
 * @param0 request
 * @param1 response
*/
/**
 * @notice For testing that sever is connected
 * @dev if user send ping message to the sever, the sever response pong message to the client
 */
router.get('/ping', (req, res) => res.send('pong'))
// app.get('/', (req, res) => res.json({ 'source': 'https://github.com/mymiracle0118' }))
/**
 * @notice signup handling
 * @dev call Authentication.signup function
 */
router.post('/signUp', Authentication.signup)
/**
 * @notice login handling
 * @dev call Authentication.signin function
 */
router.post('/login', Authentication.signin)
/**
 * @notice login handling
 * @dev call Authentication.signin function
 */
router.post('/resetpassword', Authentication.resetPassword)

module.exports = router
