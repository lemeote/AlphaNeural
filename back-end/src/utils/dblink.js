import mongoose from 'mongoose';
import config from '../constant/config';
/**
 * @author Lee Jin
 * @title Database Conector
 * @notice 
        Mongoose is a popular Object Data Modeling (ODM) library for Node.js and MongoDB. 
        It provides a simple yet powerful way to interact with MongoDB databases by providing an abstraction layer over the MongoDB Node.js driver.
 */

/**
 * @notice connect monogodb database
 * @dev mongoose connect
 * @param url mongodb data base url
 * @param useNewUrlParser
 * @param useUnifiedTopology
 * @return nothing
 */
export const connectDatabase = async () => {
    try {
        mongoose.connect(config.database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log("Mongoose Connected"));
    } catch(error) {
        console.log(error);

    }
}