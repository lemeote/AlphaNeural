import jwt from 'jwt-simple';
import config from '../constant/config';
// import constant from "../constant/constant";

/**
 * @author Lee Jin
 * @title Application JWT Token Generate & Verify
 * @notice generates jwt tokens and verify jwt tokens
 */

export default {
    /**
     * 
     * @param {*} user 
     * @returns jwt token
     */
    generateToken: function (user) {
        const timeStamp = new Date().getTime();
        const payload = {
            sub: user.id,
            iat: timeStamp
        }
        return jwt.encode(payload, config.jwt_secret);
    },

    /**
     * 
     * @param {*} token 
     * @param {*} cb 
     * @returns if token is not jwt token, return err or if yes, return payload
     */
    verifyToken: (token, cb) => {
        const decode = jwt.decode(token, config.jwt_secret)
        if (!decode) return cb(new Error('Token is not verified.'));
        cb(null, decode);
    }
}
