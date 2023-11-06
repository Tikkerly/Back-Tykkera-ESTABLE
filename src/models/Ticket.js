const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Ticket', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        creation_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['Pending approval', 'Cancelled', 'Approved - In progress', 'Approved - Completed'],
            defaultValue: 'Pending approval',
            allowNull: false,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                esValorPermitido(value) {
                    if (![1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].includes(value)) {
                        throw new Error('El valor no está permitido');
                    }
                }
            },
        },
    },
        { timestamps: false }
    )
}