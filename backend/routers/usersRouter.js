//se hacen todos los llamados
const express = require('express');
const usuarios = require('./../models/usuariosModel')
const usuarioRouter = express.Router()

//promesa de consulta de todos los usuarios
usuarioRouter.get('/', (req, res) => {
    usuarios.find().then(datos => res.json({ users: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de consulta de ususarios por rol
usuarioRouter.get('/:rol', (req, res) => {
    usuarios.find({ rol: req.params.rol }).then(datos => res.json({ users: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de consulta de ususarios por documento
usuarioRouter.post('/documento', (req, res) => {
    usuarios.find({ cedula: req.body.cedula }).then(datos => res.json({ users: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de guardar usuarios
usuarioRouter.post('/', (req, res) => {
    const usuario = new usuarios(req.body)
    usuario.save().then(datos => res.json({ users: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de actualizar usuarios
usuarioRouter.patch('/', (req, res) => {
    const user = req.body
    usuarios.updateOne({ cedula: user.cedula }, user)
        .then(datos => res.json({ users: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de eliminar usuarios
usuarioRouter.delete('/:id', (req, res) => {
    usuarios.deleteOne({ _id: req.params.id })
        .then(datos => res.json({ users: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de iniciar sesion
usuarioRouter.get('/inicio/:documento/:clave', (req, res) => {
    usuarios.find({
        cedula: req.params.documento,
        clave: req.params.clave
    }).then(datos => res.json({ users: datos })).catch(error => res.json({ mensaje: error }))
})

module.exports = usuarioRouter