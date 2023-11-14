//llamados
const express = require('express');
const terceros = require('../models/tercerosModel')
const tercerosRouter = express.Router()

//promesa de consulta de todos los terceros
tercerosRouter.get('/', (req, res) => {
    terceros.find().then(datos => res.json({ thirds: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de consulta de terceros por tipo
tercerosRouter.get('/:type', (req, res) => {
    terceros.find({tipoTercero: req.params.type}).then(datos => res.json({ thirds: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de consulta de terceros por documento
tercerosRouter.post('/documento', (req, res) => {
    terceros.find({ documento: req.body.documento }).then(datos => res.json({ thirds: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de guardar producto
tercerosRouter.post('/', (req, res) => {
    const third = new terceros(req.body)
    third.save().then(datos => res.json({ thirds: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de actualizar producto
tercerosRouter.patch('/', (req, res) => {
    const third = req.body
    terceros.updateOne({ documento: third.documento }, third)
        .then(datos => res.json({ thirds: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de eliminar un producto
tercerosRouter.delete('/:id', (req, res) => {
    terceros.deleteOne({ _id: req.params.id })
        .then(datos => res.json({ thirds: datos })).catch(error => res.json({ mensaje: error }))
})

module.exports = tercerosRouter