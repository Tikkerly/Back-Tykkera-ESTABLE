const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Technician', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isValidated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isBanned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        rol: {
            type: DataTypes.STRING,
            defaultValue: 'Technician',
            allowNull: false,
        }
    },
        { timestamps: false }
    )
}