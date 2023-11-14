const conexion = require('../db/conexxionDB')

const tercerosShema = new conexion.Schema({
    nombre: { type: String },
    tipoTercero: { type: String },
    tipoDocumento: { type: String },
    documento: {
        type: String,
        unique: true,
        required: true
    },
    direccion: { type: String },
    telefono: { type: Number }
},{
    collection: 'terceros',
    versionKey: false
})

const terceroModel = conexion.model('terceros', tercerosShema)

module.exports = terceroModel