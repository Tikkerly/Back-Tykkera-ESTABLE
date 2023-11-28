const { Schema, model } = require("mongoose");

const FinalClientSchema = Schema({
    username: {
        type: String,
        required: [true, 'Se requiere un nombre.']
    },
    email: {
        type: String,
        required: [true, 'Se requiere un email de contacto.']
    },
    document: {
        type: String,
        required: [true, 'Se requiere un documento de identificación.']
    },
    img: {
        type: String,
        default: "",
      },
    documentType: {
        type: String,
        required: [true, 'Se requiere especificar el tipo de documento.']
    },
    phone: {
        type: String,
        required: [true, 'Se requiere un número de celular.']
    },
    status: {
        type: Boolean,
        default: true,
    },
    address: {
        type: String,
        required: [true, 'Se requiere una dirección.']
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
})

FinalClientSchema.methods.toJSON = function () {
    const { __v, ...user } = this.toObject();
    return user;
};

module.exports = model("FinalClient", FinalClientSchema);