const rateLimit = require('express-rate-limit');
const {ServiceResponse} = require('./serviceResponse');

const limiter = rateLimit({
    max: 1000, // when the server rerun the limit will reset for all IP's
    windowMs: 60 * 60 * 1000, // maximum 1000 request in 1 hr
    message: new ServiceResponse('fail', null, 'too many request in short time, try again later')
})


module.exports = limiter