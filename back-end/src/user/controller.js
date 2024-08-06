import UserModel from './model';
import token from '../utils/token';
import constant from "../constant/constant";
/**
 * @author Lee Jin
 * @title User controller
 * @notice CRUD for user table
*/

export default {

    /**
     * @notice insert a new user to database
     * @dev insert a new record to a user table
     * @param { * } req request param
     * @param { * } res response param
     * @param { * } next next function
     */
    insertNewUser: (req, res, next) => {
        const { userName, companyName, emailAddress, password } = req.body;

        //if the user exists already, return error
        UserModel
            .findOne({
                emailAddress: emailAddress
            }, (err, existingUser) => {

                // Database connection error
                if (err) return res.status(constant.STATUS_DATABASE_ERROR).send(err);
                // console.log('we are here', existingUser)
                if (existingUser) {
                    return res
                        .status(constant.STATUS_VALIDATE_ERROR)
                        .send({ error: 'Registered user' });
                }
                
                //Create user data model for inserting
                const user = new UserModel({
                    userName: userName.toLowerCase(),
                    emailAddress: emailAddress,
                    password: password,
                    companyName: companyName
                })
                
                //Insert the user to the user table and send the jwt token to the client
                user.save((err, savedUser) => {
                    if (err) {
                        return next(err)
                    }
                    res.json({
                        success: true,
                        token: token.generateToken(savedUser)
                    })
                })
            })
    },

    /**
     * @notice Get a user by id
     * @dev get a user record by a user id
     * @param {*} userId user id of record
     */
    getUserById: (req, res, next, userId) => {
        UserModel.findById(userId)
        .exec((err, user) => {
          if (err || !user) {
            return res.status(constant.STATUS_VALIDATE_ERROR).send(err || {
              error: 'middleware User not found!!!'
            });
          }
          delete user.password;
          req.user = user;
          next();
        })
    },

    /**
     * @notice Sign In handling
     * @dev get a user record by a user's email address
     * @param {*} req rquest param
     * @param {*} res res param
     * @param {*} next next function
     */
    signIn: (req, res, next) => {
        const emailAddress = req.body.emailAddress;
        const password = req.body.password;
        console.log("email address", emailAddress);
        // const emailAddress = (id) => {
        //     return Types.ObjectId(id);
        // };
        UserModel
            .findOne({
                emailAddress: emailAddress
            }, (err, existingUser) => {
                // console.log(err);
                if (err || !existingUser || existingUser.deletedAt) {
                    return res.status(constant.STATUS_VALIDATE_ERROR).send({ error: "User Not Found" })
                }
                // if user exists, compare password from request to password from database 
                if (existingUser) {
                    // console.log('PASSWORD=', password);
                    // console.log(existingUser.password);
                    existingUser.comparedPassword(password, function (err, good) {
                        // console.log('===================2=');
                        // console.log(err);
                        // console.log(good);
                        // console.log('===================1=');
                        if (err || !good) {
                            return res.status(constant.STATUS_VALIDATE_ERROR).send(err || { error: "Your password is not correct" })
                        }
                        // if (!existingUser.approve) {
                        //     return res.status(404).send("Please wait until you are approved.")
                        // }
                        // Make a cookie for expire time
                        res.cookie('name', 'value', { maxAge: 86400 });
                        res.send({
                            user: existingUser,
                            token: token.generateToken(existingUser)
                        })
                    })
                }
            })
    },

    updateProfile: (req, res, next) => {
        req.user.comparedPassword(req.body.password, (err, good) => {
            if (err || !good) return res.status(401).send(err || 'Incorrect Password')
            const userId = req.user._id;
            const newProfile = {
                name: {
                    first: req.body.firstName, 
                    last: req.body.lastName
                }
            };
            delete newProfile.password;
            
            UserModel.findByIdAndUpdate(userId, newProfile, {new: true})
            .then(() => res.sendStatus(200))
            .catch(next)
        })
    }
    
}
