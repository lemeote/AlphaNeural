/**
 * @author Lee Jin
 * @title Application Constant Variables
 * @notice All constants variables are here
*/

//Default Status
const STATUS_CONTINUE =                  100;
const STATUS_SWITCHING_PROTOCOLS =       101;
const STATUS_OK =                        200;
const STATUS_CREATED =                   201;
const STATUS_NO_CONTENT =                204;
const STATUS_MOVED_PERMANENTLY =         301;
const STATUS_FOUND =                     302;
const STATUS_NOT_MODIFIED =              304;
const STATUS_TEMPORARY_REDIRECT =        307;
const STATUS_BAD_REQUEST =               400;
const STATUS_UNAUTHORISED =              401;
const STATUS_FORBIDDEN =                 403;
const STATUS_NOT_FOUND =                 404;
const STATUS_MOTHOD_NOT_ALLOWED =        405;
const STATUS_CONFLICT =                  409;
const STATUS_TEAPOT =                    418;
const STATUS_INTERNAL_SERVER_ERROR =     500;

//User Defined Status
const STATUS_VALIDATE_ERROR =            420;
const STATUS_DATABASE_ERROR =            421;

module.exports = {

    // Default Status
    STATUS_CONTINUE,
    STATUS_SWITCHING_PROTOCOLS,
    STATUS_OK,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_CREATED,
    STATUS_NO_CONTENT,
    STATUS_MOVED_PERMANENTLY,
    STATUS_FOUND,
    STATUS_NOT_MODIFIED,
    STATUS_TEMPORARY_REDIRECT,
    STATUS_BAD_REQUEST,
    STATUS_UNAUTHORISED,
    STATUS_FORBIDDEN,
    STATUS_NOT_FOUND,
    STATUS_MOTHOD_NOT_ALLOWED,
    STATUS_CONFLICT,
    STATUS_TEAPOT,

    // User Defined Status
    STATUS_VALIDATE_ERROR,
    STATUS_DATABASE_ERROR,
}
