const { User } = require('../models');
const bcrypt = require('bcrypt');
const { generateToken, excludeFields, checkCorrectPassword } = require('./middlewares');
const { ServiceResponse } = require('./../utils/serviceResponse');
const { ErrorHandling, handleUserNotFound } = require('../utils/errorHandling');



const register = async (req, res, next) => {
    try {
        const { email, password, passwordConfirm} = req.body;
        if(!email || !password || !passwordConfirm)
            throw new ErrorHandling('missing data', 401);


        if(password !== passwordConfirm)
            throw new ErrorHandling('password and passwordConfirm must be the same', 401);

        if(password.length < 8)
            throw new ErrorHandling('Password must contain at least 8 characters', 401);

        if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password))
            throw new ErrorHandling('Password must contain numbers and special characters', 401);


        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email,
            password: hashedPassword
        });

        const token = generateToken({id: email});
        excludeFields(newUser, 'password');

        const data = {...newUser.toJSON(), "token": token};
        res.status(201).json(new ServiceResponse('success', data));
    } catch(err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError')
            return next(err);

        if (!err.statusCode)   return next(new ErrorHandling(err.message, 400));
        next(err);
    }
}



const logIn = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) throw new ErrorHandling('missing email or password', 401);

        const user = await User.findByPk(email);
        if(!user)   throw new handleUserNotFound(`incorrect email or password`, 401);

        const isPasswordCorrect = await checkCorrectPassword(password, user.password);
        if(!isPasswordCorrect)   throw new handleUserNotFound(`incorrect email or password`, 401);

        const token = generateToken({id: user.email});
        excludeFields(user, 'password');

        const data = {...user.toJSON(), "token": token};
        res.status(200).json(new ServiceResponse('success', data));
    } catch(err) {
        // error already wrapped
        if(err.statusCode)  return next(err);
        next(new ErrorHandling(err.message, 400));
    }
}



const deleteUser = async (req, res, next) => {
    try {
        const email = req.user.email;
        const user = await User.findByPk(email);
        if(!user)  throw new ErrorHandling('user not found', 404);


        await user.destroy();
        res.status(204).json(new ServiceResponse('success'));
    } catch (err) {
        // error already wrapped
        if(err.statusCode)  return next(err);
        next(new ErrorHandling(err.message, 400));
    }
}


module.exports = {
    register,
    logIn,
    deleteUser
}