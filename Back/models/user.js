const defineUserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: {
            msg: "This email already used"
        },
        validate: {
            isEmail: {
                args: true,
                msg: "provide a valid email address"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8],
                msg: "Password must be at least 8 characters long"
            },
            is: {
                args: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
                msg: "Password must contain numbers and special characters"
            }
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: {
                args: [['user', 'admin']],
                msg: "Role must be either 'user' or 'admin'"
            }
        }
    }
});

    User.associate = (models) => {
        User.hasMany(models.Shipment, { foreignKey: 'userEmail' });
        };

    return User;
};

module.exports = defineUserModel;
