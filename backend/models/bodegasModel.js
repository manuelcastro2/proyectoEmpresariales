const conexion = require('../db/conexxionDB')

const bodegasShema = new conexion.Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    direccion: { type: String },
    productos: [{
        codigoProducto:{type:Number},
        nombre: { type: String },
        tipoProducto: { type: String },
        unidadMedida: { type: String },
        valorUnitario: { type: Number },
        existencias: { type: Number },
        porcentaje: { type: Number },
    }]
},{
    collection: 'bodegas',
    versionKey: false
})

const bodegaModel = conexion.model('bodegas', bodegasShema)

module.exports = bodegaModel