import getLogger from 'loglevel-colored-level-prefix';

/**
 * @author Lee Jin
 * @title Get Logger
 * @notice 
        Trace logger while sever is running
 */

const options = {prefix: 'mern-server', level: 'trace'}
const logger = getLogger(options)

export default logger
