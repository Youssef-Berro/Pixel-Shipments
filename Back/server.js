const app = require('./app');
const db = require('./models');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});


process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    process.exit(1);
})

const startServer = (port) => {
    app.listen(port, () => {
        console.log(`listening on port ${port}...`);
    });
};

const port = process.env.PORT || 3000;

// First, try to sync the database
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tables created or altered successfully!');
        startServer(port);
    })
    .catch(syncError => {        
        // If sync fails, try to authenticate
        db.sequelize.authenticate()
            .then(() => {
                console.log('Database connection successfully✅');
                startServer(port);
            })
            .catch(authError => {
                console.error('Unable to connect to the database:', authError);
                process.exit(1);
            });
    });



process.on('unhandledRejection', err => {
    console.log(err.name, err.message);

    // passing 1 => error, 0 => no error
    process.exit(1);
})