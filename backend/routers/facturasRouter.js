const express = require('express')
const facturas = require('../models/facturasModel')
const facturasRouter = express.Router()

facturasRouter.get('/', (req, res) => {
    facturas.find().then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
})

facturasRouter.post('/filtro', (req, res) => {
    const factura = req.body
    facturas.find({ nroFactura: factura.nroFactura }).then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
})

facturasRouter.post('/', (req, res) => {
    const factura = req.body
    factura.fecha = new Date(req.body.fecha)
    const facturaCompleta = new facturas(factura)
    facturaCompleta.save().then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
})

facturasRouter.patch('/', (req, res) => {
    const factura = req.body
    facturas.updateOne({ nroFactura: factura.nroFactura }, factura)
        .then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
})

facturasRouter.delete('/:id', (req, res) => {
    facturas.deleteOne({ _id: req.params.id })
        .then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
})

facturasRouter.get('/filtrofecha/:fechaInicio/:fechaFinal', (req, res) => {
    fechainicio = new Date(req.params.fechaInicio)
    fechafinal = new Date(req.params.fechaFinal)
    facturas.find({ fecha: { "$lte": fechafinal, "$gte": fechainicio } })
        .then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
})

module.exports = facturasRouter