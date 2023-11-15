const conexion = require('../db/conexxionDB')

const bodegasShema = new conexion.Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    direccion: { type: String },
    productos: [{
        codigo:{type:Number},
        nombre: { type: String },
        tipoProducto: { type: String },
        unidadMedida: { type: String },
        valorUnitario: { type: Number },
        Existencias: { type: Number },
        PorcentajeIva: { type: Number },
    }]
},{
    collection: 'bodegas',
    versionKey: false
})

const bodegaModel = conexion.model('bodegas', bodegasShema)

module.exports = bodegaModel