const conexion = require('../db/conexxionDB')

const usuariosShema = new conexion.Schema({
    nombre: { type: String },
    apellido: { type: String },
    cedula: {
        type: String,
        unique: true,
        required: true
    },
    rol: { type: String },
    clave: { type: String }
}, {
    collection: 'usuarios',
    versionKey: false
})

const usuariosModel = conexion.model('usuarios', usuariosShema)

module.exports = usuariosModel