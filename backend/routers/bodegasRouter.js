//promesa de llamados
const express = require('express');
const bodegas = require('./../models/bodegasModel')
const bodegasRouter = express.Router()

//promesa de consulta todas las bodegas
bodegasRouter.get('/', (req, res) => {
    bodegas.find().then(datos => res.json({ bodegas: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de consulta de bodegas con el nombre
bodegasRouter.get('/:nombre', (req, res) => {
    bodegas.find({ nombre: req.params.nombre })
        .then(datos => res.json({ bodegas: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de guardar bodegas
bodegasRouter.post('/', (req, res) => {
    const bodega = new bodegas(req.body)
    bodega.save().then(datos => res.json({ bodegas: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de actualizar las bodegas
bodegasRouter.patch('/', (req, res) => {
    const winerie = req.body
    bodegas.updateOne({ _id: winerie._id }, winerie)
        .then(datos => res.json({ bodegas: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de eliminar bodegas
bodegasRouter.delete('/:id', (req, res) => {
    bodegas.deleteOne({ _id: req.params.id })
        .then(datos => res.json({ bodegas: datos })).catch(error => res.json({ mensaje: error }))
})

module.exports = bodegasRouter