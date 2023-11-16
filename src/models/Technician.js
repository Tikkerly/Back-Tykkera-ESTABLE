const { Schema, model } = require("mongoose");

const TechnicianSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido.'],
    },
    email: {
        type: String,
        required: [true, 'Se requiere un email de contacto.']
    },
    document: {
        type: String,
        required: [true, 'Se requiere un número de documento de identificación.']
    },
    documentType: {
        type: String,
        required: [true, 'Se requiere especificar el tipo de documento.']
    },
    phone: {
        type: String,
        required: [true, 'Se requiere un número de contacto.']
    },
    img: {
        type: String,
        default: '',
    },
    serviceTypes: {
        type: String,
        required: [true, 'Se requiere añadir los servicios que ofrece el técnico.']
    },
    paymentMethods: {
        type: String,
        required: [true, 'Se requiere añadir métodos de pago que recibe el técnico.']
    },
    accountNumber: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'Se requiere específicar la dirección del técnico.']
    },
    status: {
        type: Boolean,
        default: true,
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Es obligatorio asignar la compañía.']
    },
    serviceClient_id: {
        type: Schema.Types.ObjectId,
        ref: "ServiceAgent",
        required: [true, 'Es obligatorio asignar un cliente de servicio.']
    }
});

TechnicianSchema.methods.toJSON = function () {
    const { __v, ...user } = this.toObject();
    return user;
};

module.exports = model("Technician", TechnicianSchema);