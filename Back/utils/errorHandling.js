const { ServiceResponse } = require("./serviceResponse");

class ErrorHandling extends Error {

    constructor(msg, statusCode) {
        super(msg);

        // (error between 400 and 499) ? (status : fail) : (status : error)
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.statusCode = statusCode;
    }
}

// invalid param
class handleCastErrorDB extends ErrorHandling {

    constructor(statusCode, path, value) {
        super(`invalid ${path} : ${value}.`, statusCode);
    }
}


class handleDuplicateFieldsDB extends ErrorHandling {

    constructor(statusCode, key, value) {
        super(`${key} : ${value}, already exist. ${key} must be unique`, statusCode); 
    }
}



class handleUserNotFound extends ErrorHandling {
    constructor(msg, statusCode) {
        super(msg, statusCode);
        this.name = 'UserNotFound'
    }
}


const errorHandlingMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        const error = err.errors ? err.errors[0].message : err.message;
        err.statusCode = 400;
        err.status = 'fail';
        if (process.env.NODE_ENV === 'development') {
            return res.status(err.statusCode).json(new ServiceResponse(err.status, null, error));
        } else {
            return res.status(err.statusCode).json(new ServiceResponse(err.status, null, { msg: error, error: err }));
        }
    }

    if(process.env.NODE_ENV === 'development') 
        res.status(err.statusCode).json(new ServiceResponse(err.status, null, err.message));
    else
        res.status(err.statusCode).json(new ServiceResponse(err.status, null, {msg: err.message, error: err}));
}


module.exports = {
    ErrorHandling,
    handleCastErrorDB,
    handleDuplicateFieldsDB,
    handleUserNotFound,
    errorHandlingMiddleware
}