const { Schema, model } = require("mongoose");

const ServiceAgentSchema = Schema({
    username: {
        type: String,
        required: [true, 'Se requiere un nombre de usuario.'],
    },
    email: {
        type: String,
        required: [true, 'Se requiere un email.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Se requiere una contraseña.']
    },
    NIT: {
        type: String,
        required: [true, 'Se requiere un NIT.'],
    },
    document: {
        type: String,
        required: [true, 'Se requiere un documento de identificación.']
    },
    phone: {
        type: String,
        required: [true, 'Se requiere un número de contacto.']
    },
    status: {
        type: Boolean,
        default: true,
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Es obligatorio asignar la compañía.']
    }
})

ServiceAgentSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
};

module.exports = model("ServiceAgent", ServiceAgentSchema);