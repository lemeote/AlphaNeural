import token from '../utils/token';
import UserModel from '../user/model';
import UserController from '../user/controller';
import bcrypt from 'bcrypt-nodejs';
import ValidateData from './validate';
import constant from "../constant/constant";

/**
 * @author Lee Jin
 * @title Application Authenticaton
 * @notice User Signup, Login, Profile management
*/

const { Types } = require("mongoose");

export default {
    /**
     * @notice Sever accepts signUp request and Generate JWT token and send it to the client
     * @dev validate signUp request params and find user from user table.
            if user exists in user table, return false.
            if user doesn't exist from table, add record user's record and return jwt token.
     * @param {*} req singUp user info(userName, companyName, emailAddress, password, confirmPassword)
     * @param {*} res 
     * @param {*} next 
     * @returns signUp flag, error string if exist and jwt token
     */
    signup: (req, res, next) => {

        const { userName, companyName, emailAddress, password, confirmPassword } = req.body;

        const checkedData = ValidateData.signUpCheck(userName, companyName, emailAddress, password, confirmPassword);
        // console.log("validate", checkedData);
        if(!checkedData.flag) {
            return res.status(constant.STATUS_VALIDATE_ERROR).send(checkedData.error);
        }

        UserController.insertNewUser(req, res, next);
    },

    /**
     * @notice User login handling
     * @dev find a user from user table by email address and compare password.
     * @param {*} res 
     * @param {*} next 
     * @returns signUp flag, error string if exist and jwt token
     */
    signin: (req, res, next) => {
        // console.log(req.body);
        const emailAddress = req.body.emailAddress;
        const password = req.body.password;

        // console.log("+++++++++++++++++++++Login Attempt++++++++++", emailAddress, password)

        // console.log('==========we meet the user============')
        // validate emailAddress and password
        if (!emailAddress || !password) {
            return res
                .status(constant.STATUS_VALIDATE_ERROR)
                .send({ error: 'You must provide username and password.' });
        }
        UserController.signIn(req, res, next);
    },

    resetPassword: async (req, res, next) => {

        const { userId, values } = req.body
        const toObjId = (id) => {
            return Types.ObjectId(id);
        };

        try {

            const user = await UserModel.findById(toObjId(userId))

            // Check if the user exists and the old password is correct
            if (user && user.comparedPassword(values.password, user.password)) {
                if (err || !good) {
                    return res.status(401).send(err || 'User not found')
                }

                // Generate hash for the new password
                const newHashedPassword = bcrypt.hashSync(new_password, 10);

                // Update the password
                user.password = newHashedPassword;
                await user.save();
                return res.json({ message: 'Password changed successfully' });
            }
        }
        catch (err) {
            console.log(err)
            res.status(401).send(err || 'User not found')
        }
    }
}
