const { Types } = require("mongoose");

/**
 * @author Lee Jin
 * @title To Object Type
 * @notice 
        ...
 */

const toObjId = (id) => {
    return Types.ObjectId(id);
};

export default toObjId;