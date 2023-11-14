const conexion = require('../db/conexxionDB')

const productosShema = new conexion.Schema({
    codigoProducto: {
        type: Number,
        unique: true,
        required: true
    },
    nombre: { type: String },
    descripcion: { type: String },
    tipoProducto: { type: String },
    existencias: { type: Number },
    unidadMedida: { type: String },
    valorUnitario: { type: Number },
    porcentaje: { type: Number }
}, {
    collection: 'productos',
    versionKey: false
})

const productoModel = conexion.model('productos', productosShema)

module.exports = productoModel