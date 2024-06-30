const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const xss = require('xss-clean');
const limiter = require('./utils/functions');
const userRouters = require('./routers/userRouters');
const shipmentRouters = require('./routers/shipmentRouters');
const adminRouters = require('./routers/adminRouters');
const {ErrorHandling, errorHandlingMiddleware} = require('./utils/errorHandling');


const app = express();
app.use(helmet()); // set security for HTTP headers
app.use(cors());
app.use('/api', limiter); // limit request for one single IP (execute for all routes start with /api)
app.use(express.json({limit : '10kb'})); // parsing data limit is 10kb
app.use(xss()); // data sanitization against html malicious data (xss)



// routers
app.use('/api/users', userRouters);
app.use('/api/shipments', shipmentRouters);
app.use('/api/admins', adminRouters);


// uncatched url's
app.all('*', (req, res, next) => {
    next(new ErrorHandling(`can't find ${req.originalUrl} in our server!`, 404))
})



app.use(errorHandlingMiddleware);
module.exports = app;