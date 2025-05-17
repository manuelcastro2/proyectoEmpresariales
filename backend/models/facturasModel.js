const conexion = require('../db/conexxionDB')

const facturaShema = new conexion.Schema({
    nroFactura: {
        type: Number,
        unique: true,
        required: true
    },
    tipoFactura: { type: String },
    tercero: {
        nombre: { type: String },
        tipoTercero: { type: String },
        documento: { type: String },
        direccion: { type: String },
        telefono: { type: Number }
    },
    fecha: { type: Date },
    bodega: {
        _id: { type: String },
        nombre: { type: String },
        direccion: { type: String }
    },
    elementos: [{
        codigoProducto: { type: Number },
        nombre: { type: String },
        descripcion: { type: String },
        valorUnitario: { type: Number },
        porcentaje: { type: Number },
        unidadMedida: { type: String },
        cantidad: { type: Number }
    }],
    totalOperacion: { type: Number },
}, {
    collection: 'facturas',
    versionKey: false
})

const facturaModel = conexion.model('facturas', facturaShema)

module.exports = facturaModel