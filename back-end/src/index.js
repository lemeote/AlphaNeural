/**
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   #                                #     #                                          #    ###                                                                     
  # #   #      #####  #    #   ##   ##    # ###### #    # #####    ##   #           # #    #       ##   #####  #####  #      #  ####    ##   ##### #  ####  #    #  
 #   #  #      #    # #    #  #  #  # #   # #      #    # #    #  #  #  #          #   #   #      #  #  #    # #    # #      # #    #  #  #    #   # #    # ##   #
#     # #      #    # ###### #    # #  #  # #####  #    # #    # #    # #         #     #  #     #    # #    # #    # #      # #      #    #   #   # #    # # #  #
####### #      #####  #    # ###### #   # # #      #    # #####  ###### #         #######  #     ###### #####  #####  #      # #      ######   #   # #    # #  # #
#     # #      #      #    # #    # #    ## #      #    # #   #  #    # #         #     #  #     #    # #      #      #      # #    # #    #   #   # #    # #   ##
#     # ###### #      #    # #    # #     # ######  ####  #    # #    # ######    #     # ###    #    # #      #      ###### #  ####  #    #   #   #  ####  #    #

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */


/**
 * @notice module from online
 */
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import moment from 'moment-timezone';
// const hbs = require('hbs')
// const path = require('path')
// import cookieParser from 'cookie-parser';
// const moment = require('moment-timezone');

/**
 * @notice module from user defined
 */
import logger from './utils/logger';
import config from './constant/config';
import routes from './routes/routes';
import { connectDatabase } from "./utils/dblink";
import constant from "./constant/constant";
/**
 * @author Lee Jin
 * @title AlphaNeural AI application.
 * @notice Implement a secure login system with JWT (JSON Web Tokens) or OAuth for user authentication and role-based access control.
*/

/**
 * @notice
        Express is a popular web application framework that simplifies the process of building robust and scalable web applications and APIs. 
        It provides a set of features and tools for handling HTTP requests, routing, middleware integration, and view rendering.
        Express allows developers to define routes, which are used to map specific URLs to corresponding actions or resource handlers. 
        It supports various HTTP methods such as GET, POST, PUT, and DELETE, enabling the creation of RESTful APIs.
        With Express, you can easily handle request and response objects, set headers, handle cookies, and handle query parameters. 
        It also enables the use of middleware functions for tasks such as logging, authentication, handling errors, and more. 
        Middleware functions in Express have access to the request and response objects, allowing you to modify them or perform additional operations.
        The flexibility and simplicity of Express make it a popular choice among Node.js developers for building web applications and APIs.
 */ 
const app = express();

/**
 * @notice it is needed to set jwe secret in .env file. if dont set, if uses default secret. i.e unsafe_jwt_secret
 * @dev get config from exported module in config.js, if case is true, warn message will be displayed in console.
 */

if (config.jwt_secret == 'unsafe_jwt_secret') {
    const err = new Error('No JWT_SECRET in env variable');
    logger.warn(err.message);
}

/**
 * @notice CORS (Cross-Origin Resource Sharing) is used in Node.js (as well as other server-side frameworks) to handle cross-origin HTTP requests.
 * @param origin it refers to the domain (including the protocol and port) from which a cross-origin request is being made.
 * @param credentials: default = true
 */
app.use(cors({
    origin: '*',
    // credentials: true
}));

/**
 * @notice 
        The Morgan module is a popular logging middleware for Node.js web applications.
        It provides a simple and customizable way to log HTTP requests and responses. 
        You can use it to track useful information such as request method, URL, status code, response time, and more.
 * @param string
 */
app.use(morgan('dev'));

app.use(express.json())
// app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

/**
 * @notice html handling in node js
 */
// app.set('view engine', hbs)

/**
 * @notice All reuest are handled in routes.
 * @dev get and post requests are handled in routes module.
 */
app.use('/', routes)

/**
 * @notice We need to track log for debugging
 * @dev extract log for errors
 */
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(constant.STATUS_INTERNAL_SERVER_ERROR).json(err.message);
});

/**
 * @notice Main function
 */
function main() {
    connectDatabase();
    // timevar = setTimeout(timeBetting, timeout);
}
  
main();

/**
 * @notice sever starts with port
 * @dev listening requests and handle response
 */
app.listen(config.port, () => {
    logger.info(`Server listening on: ${config.port}`)
});
