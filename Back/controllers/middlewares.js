const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ErrorHandling } = require('./../utils/errorHandling');
const { User, Shipment } = require('./../models');


const checkTokenValidity = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if(!token)  throw new ErrorHandling('you are not log in', 401);


        if(!token.startsWith('Bearer'))   throw new ErrorHandling('token must start with Bearer string', 403); 
        token = token.split(' ')[1];

        const decode = jwt.verify(token, process.env.SECRET_JWT);

        // jwt.verify verify 100% if the user exist or not but we do the next part because when
        // a user have been deleted, jwt.verify don't know, so we must recheck 
        const decodedUser = await User.findByPk(decode.id);
        if(!decodedUser)   throw new ErrorHandling('the user belonging to this token does no longer exist', 401)

        req.user = decodedUser;
        next();
    } catch(err) {
        // error already wrapped
        if(err.statusCode)  return next(err);

        // wrap the error by ErrorHandling class
        return next(new ErrorHandling(err.message, 400));
    }
}


const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_JWT, {expiresIn: `${process.env.JWT_EXPIRY}`});
}

// used to exclude fields for response security
function excludeFields(obj, ...fields) {
    fields.forEach(el => obj[el] = undefined);
}


async function checkCorrectPassword(password, userPassword) {
    return await bcrypt.compare(password, userPassword);
}


const deleteAllUserShipments = async (req, res, next) => {
    try {
        const userEmail = req.user.email;
        await Shipment.destroy({
            where: {
                userEmail: userEmail
            }
        });

        next();
    } catch(err) {
        // error already wrapped
        if(err.statusCode)  return next(err);
        next(new ErrorHandling(err.message, 400));
    }
}


const checkAdminRole = async (req, res, next) => {
    try {
        if(req.user.role !== 'admin')  throw new ErrorHandling("you don't have the access to this endpoint", 403);

        next();
    } catch(err) {
        next(err);
    }
}


module.exports = {
    checkTokenValidity,
    generateToken,
    excludeFields,
    checkCorrectPassword,
    deleteAllUserShipments,
    checkAdminRole
}