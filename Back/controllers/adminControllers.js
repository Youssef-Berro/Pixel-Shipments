const { User, Shipment } = require('../models');
const { Op, fn, col } = require('sequelize');
const { ServiceResponse } = require('./../utils/serviceResponse');
const { ErrorHandling } = require('../utils/errorHandling');



const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            where: {
                role: {
                    [Op.ne]: 'admin'
                }
            },
            attributes: ['email', [fn('COUNT', col('Shipments.waybill')), 'shipmentCount']],
            include: [{
                model: Shipment,
                attributes: []
            }],
            group: ['User.email']
        })

        res.status(200).json(new ServiceResponse('success', users));
    }catch(err) {
        // error already wrapped
        if(err.statusCode)   return next(err);
        next(new ErrorHandling(err.message, 400));
    }
}


const getUserShipments = async (req, res, next) => {
    try {
        const {email} = req.params;
        const userData = await Shipment.findAll({
            where: {
                userEmail: email
            }
        })

        res.status(200).json(new ServiceResponse('success', userData));
    }catch(err) {
        // error already wrapped
        if(err.statusCode)   return next(err);
        next(new ErrorHandling(err.message, 400));
    }
}

module.exports = {
    getAllUsers,
    getUserShipments
}