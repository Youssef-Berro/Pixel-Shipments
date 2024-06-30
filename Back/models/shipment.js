const defineShipmentModel = (sequelize, DataTypes) => {
    const Shipment = sequelize.define('Shipment', {
    waybill: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Users',
            key: 'email'
        }
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerNb: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, 8],
                msg: "Customer number must be exactly 8 characters long"
            }
        }
    }
});

    Shipment.associate = (models) => {
        Shipment.belongsTo(models.User, { foreignKey: 'userEmail' });
    };

    return Shipment;
};

module.exports = defineShipmentModel;
