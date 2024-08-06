import validator from 'validator';
import passwordValidator from 'password-validator';
import { check, oneOf, validationResult } from 'express-validator';
/**
 * @author Lee Jin
 * @title User Validate Utility
 * @notice Validate authentication datas
 * @dev validate request params such as email address, password etc
 */


/**
     * @notice Validates username
     * @dev IsEmpty function checks user name is null or string
     * @dev matches regexp handling
     * @param userName user name string
     */
const userNameCheck = (userName) => {
    if(validator.isEmpty(userName)) {
        // console.log('Username not provided');
        return {
            flag: false,
            error: "userNmae is not provided"
        }
    } else if (!validator.matches(userName.replaceAll(' ', ''), "^[a-zA-Z0-9_\.\-]*$")) {
        // console.log('Username not valid');
        return {
            flag: false,
            error: "userNmae is not valid"
        }
    } else {
        // console.log('Good Username!');
        return {
            flag: true,
            error: ""
        }
    }
};

/**
 * @notice Use password validator
 * @dev min, max, lowercase, digits, spaces, can add blacklist
 * @param password password string
 * @param min Minimum length
 * @param max Maximum length
 * @param uppercase Must have uppercase letters
 * @param lowercase Must have lowercase letters
 * @param digits Must have at least n digits
 * @param symbols Must have at least n sysmbols
 * @param spaces Spaces is needed or not
 * @param blackist add blacklist passwors such as Password123, 123456789
 */
const isStrongPassword = (password, min, max, uppercase, lowercase, digits, symbols, spaces, blacklist) => {
    
    // Create a schema
    var schema = new passwordValidator();

    schema
    .is().min(min)                                  // Minimum length 8
    .is().max(max)                                  // Maximum length 100
    .has().digits(digits)
    .has().symbols(symbols)                         // Must have at least 2 digits
    .is().not().oneOf(blacklist);                   // Blacklist these values

    if(uppercase) {
        schema.has().uppercase()                    // Must have uppercase letters
    }

    if(lowercase) {
        schema.has().lowercase()                    // Must have lowercase letters
    }
    if(spaces) {
        schema.has().not().spaces()                 // Should not have spaces
    }        

    var validationData = schema.validate(password, { details: true });
    if(validationData.length == 0) {
        return {
            flag: true,
            error: ""
        }
    } else {
        return {
            flag: false,
            error: validationData[0].message
        }
    }
};

/**
     * @notice Validates Email
     * @dev Validate email address using validator.isEmail
     * @param emailAddress user's email address
     */
const userEmailAddressCheck = (emailAddress) => {
    if(!validator.isEmail(emailAddress)) {
        return {
            flag: false,
            error: "emailAddress is invalid"
        };
    }

    // email is validated
    return {
        flag: true,
        error: ""
    }
};

export default {

    /**
     * @notice Validates all signup request params
     * @dev password validate, emailaddress validate
     * @param {*} userName full user name
     * @param {*} companyName company name is optional
     * @param {*} emailAddress email address
     * @param {*} password password
     * @param {*} confirmPassword confirm password
     */
    signUpCheck: (userName, companyName, emailAddress, password, confirmPassword) => {

        //userName validate
        var checkedData = {};
        checkedData = userNameCheck(userName);

        // console.log("user name check", checkedData);

        if(checkedData.flag == false) {
            return checkedData;
        }

        const blacklist = [
            "validPASS123$$",
            "P@ssw0rd",
            "Password123@"
        ];
        // password, min, max, uppercase, lowercase, digits, symbols, spaces, blacklist
        checkedData = isStrongPassword(password, 8, 50, true, true, 1, 1, false, blacklist);

        if(checkedData.flag == false) {
            return checkedData;
        }

        // console.log("password check", checkedData);

        if (password !== confirmPassword) {
            return {
                flag: false,
                error: "confirmPassword is different than password"
            }
        }

        checkedData = userEmailAddressCheck(emailAddress);
        // console.log("emailAddress check", checkedData);

        return checkedData;
    }
}
