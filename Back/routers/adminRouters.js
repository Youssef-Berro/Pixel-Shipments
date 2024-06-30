const express = require('express');
const adminControllers = require('../controllers/adminControllers');
const middlewares = require('./../controllers/middlewares');
const router = express.Router();


router.use(middlewares.checkTokenValidity);
router.use(middlewares.checkAdminRole);

router.get('/get-all-users', adminControllers.getAllUsers);
router.get('/get-user-data/:email', adminControllers.getUserShipments);
module.exports = router;