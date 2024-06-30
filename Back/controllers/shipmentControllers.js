const { Shipment } = require('./../models');
const { Op } = require('sequelize');
const { ServiceResponse } = require('./../utils/serviceResponse');
const { ErrorHandling } = require('../utils/errorHandling');

const getSingleShipment = async (req, res, next) => {
    try {
        const {waybill} = req.params;
        const userEmail = req.user.email;

        // if we do findAll instead of findOne, and there is no shipments => empty array
        const shipment = await Shipment.findOne({
            where: {
                waybill : waybill,
                userEmail: userEmail
            }
        });

        if(!shipment) 
            throw new ErrorHandling(`${userEmail} doesn't have shipment with waybill ${waybill}`, 404);


        res.status(200).json(new ServiceResponse('success', shipment));
    } catch(err) {
        // error already wrapped
        if(err.statusCode)  return next(err);
        next(new ErrorHandling(err.message, 400));
    }
}


const getUserShipments = async (req, res, next) => {
    try {
        const userEmail = req.user.email;
        const { waybill, customerNb, customerAddress, customerName } = req.query;
        const filters = { userEmail };


        if (waybill)   filters.waybill = parseInt(waybill, 10);
        if (customerNb) filters.customerNb = parseInt(customerNb, 10);
        if (customerAddress)  filters.customerAddress = { [Op.like]: `%${customerAddress}%` }
        if (customerName) filters.customerName = { [Op.like]: `%${customerName}%` }

        const shipments = await Shipment.findAll({
            where: filters
        })

        res.status(200).json(new ServiceResponse('success', shipments));
    } catch(err) {
        // error already wrapped
        if(err.statusCode)  return next(err);
        next(new ErrorHandling(err.message, 400));
    }
}


const createShipment = async (req, res, next) => {
    try {
        const {waybill, customerAddress, customerName, customerNb} = req.body;
        if(!waybill || !customerAddress || !customerName || !customerNb)
            throw new ErrorHandling('missing data', 401);


        const userEmail = req.user.email;
        const shipment = await Shipment.create({
            waybill,
            customerAddress,
            customerName,
            customerNb,
            userEmail
        });

        res.status(201).json(new ServiceResponse('success', shipment));
    } catch(err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError')
            return next(err);

        if (!err.statusCode)   return next(new ErrorHandling(err.message, 400));
        next(err);
    }
}


const updateShipment = async (req, res, next) => {
    try {
        const {waybill} = req.params;
        const { customerName, customerAddress, customerNb} = req.body;
        if(!customerName && !customerAddress && !customerNb)
            throw new ErrorHandling("there is nothing from your data can be updated", 401);


        const userEmail = req.user.email;
        const shipment = await Shipment.findOne({
            where: {
                waybill : waybill,
                userEmail: userEmail
            }
        });

        if(!shipment)   throw new ErrorHandling('shipment not found', 404);
        if(customerName)    shipment.customerName = customerName;
        if(customerAddress)    shipment.customerAddress = customerAddress;
        if(customerNb)    shipment.customerNb = customerNb;

        await shipment.save();
        res.status(200).json(new ServiceResponse('success', shipment));
    } catch(err) {
        // error already wrapped
        if(err.statusCode)  return next(err);
        next(new ErrorHandling(err.message, 400));
    }
}


const deleteShipment = async (req, res, next) => {
    try {
        const { waybill } = req.params;
        const userEmail = req.user.email;
        const shipment = await Shipment.findOne({
            where: {
                waybill : waybill,
                userEmail: userEmail
            }
        })

        if(!shipment)
            throw new ErrorHandling(`${userEmail} doesn't have shipment with waybill ${waybill}`, 404);


        await shipment.destroy();
        res.status(204).json(new ServiceResponse('success'));
    } catch(err) {
        // error already wrapped
        if(err.statusCode)  return next(err);
        next(new ErrorHandling(err.message, 400));
    }
}


module.exports = {
    getSingleShipment,
    getUserShipments,
    createShipment,
    updateShipment,
    deleteShipment
}