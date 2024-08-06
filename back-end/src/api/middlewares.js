import UserModel from '../user/model';
import token from '../utils/token';
import UserController from '../user/controller';
import constant from "../constant/constant";

/**
 * @author Lee Jin
 * @title Application Middleware
 * @notice verfy JWT token when user signin or signup
 * @dev Authorization check first in header
 */

/**
 * @notice JWT token validate and extract user from JWT token
 * @dev splic http request and validate it and extract user info from user table.
 * @param req request from client
 * @param res res to client
 * @param next
 * @return error 401 or 404 response, return response user
 */
export default {
  loginRequired: (req, res, next) => {
    // Check header authorization
    if (!req.header('Authorization')) return res.status(constant.STATUS_UNAUTHORISED).send({ message: 'Please make sure your request has an Authorization header.' });
    // Validate jwt
    let try_token = req.header('Authorization').split(' ')[1];

    //VerifyToken
    token.verifyToken(try_token, (err, payload) => {
      if (err) return res.status(constant.STATUS_UNAUTHORISED).send(err);
      //Find a jwt token
      UserController.getUserById(req, res, next, payload.sub);
    })
  }
}
