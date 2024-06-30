const express = require('express');
const userControllers = require('../controllers/userControllers');
const middlewares = require('./../controllers/middlewares');
const router = express.Router();


router.post('/register', userControllers.register);
router.post('/log-in', userControllers.logIn);


router.delete('/delete-user', 
    middlewares.checkTokenValidity,
    middlewares.deleteAllUserShipments,
    userControllers.deleteUser);

module.exports = router;