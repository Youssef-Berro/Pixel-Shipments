const express = require('express');
const shipmentControllers = require('./../controllers/shipmentControllers');
const middlewares = require("./../controllers/middlewares");
const router = express.Router();

router.use(middlewares.checkTokenValidity);

router.get('/get-shipment-by-waybill/:waybill', shipmentControllers.getSingleShipment);
router.get('/get-user-shipments', shipmentControllers.getUserShipments);
router.post('/create-shipment', shipmentControllers.createShipment);
router.patch('/update-shipment/:waybill', shipmentControllers.updateShipment);
router.delete('/delete-shipment/:waybill', shipmentControllers.deleteShipment);

module.exports = router;