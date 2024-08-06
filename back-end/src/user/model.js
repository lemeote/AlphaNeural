import mongoose from 'mongoose';
import timeZone from "mongoose-timezone";
import bcrypt from 'bcrypt-nodejs';

/**
 * @author Lee Jin
 * @title User Model
 * @notice CRUD for user table
*/

const moment = require('moment-timezone');

// Define the model
const Schema = new mongoose.Schema({
    userName: 
    {
        type: String,
        required: [true, "Please add a user name"]
    },
    companyName: {
        type: String
    },
    emailAddress: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
    },
    password: {
        type: String,
        rquired: [true, "Please add a password"],
    },
    location: {
        type: String,
        // required: true
    },
    role: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        // required: true
    },
    checkProductUpdates: {
        type: Boolean,
        default: false
    },
    checkCommunityAnnouncementes: {
        type: Boolean,
        default: false
    },
    dataVerificationUpdates: {
        type: Boolean,
        default: false
    },
    accountNotification: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: () => moment().toDate(),
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    paymentMethod: {
        type: String,
        default: ""
    }
}, { timestamps: { updatedAt: 'updatedAt' } });

Schema.plugin(timeZone, { path: ['createdAt'] });

// This function will be called before save data
Schema.pre('save', function (next) {
    // get access to user model, then we can use user.email, user.password
    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err) }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err); }

            user.password = hash;
            next()
        })
    })
})

// Make use of methods for comparedPassword
Schema.methods.comparedPassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, good) {
        if (err) { return cb(err) }
        cb(null, good);
    })
}

// Export the model
export default mongoose.model('User', Schema);
