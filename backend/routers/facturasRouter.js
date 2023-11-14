//promesa de llamado
const express = require('express')
const facturas = require('../models/facturasModel')
const facturasRouter = express.Router()

//promesa de consultar todas las facturas
facturasRouter.get('/', (req, res) => {
    facturas.find().then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de diferentes con consultas
facturasRouter.post('/filtro', (req, res) => {
    const factura = req.body

    if (factura.tipoFactura != null && factura.nroFactura != null) {
        facturas.find({
            tipoFactura: factura.tipoFactura,
            nroFactura: factura.nroFactura
        }).then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
    } else if (factura.tipoFactura != null) {
        facturas.find({ tipoFactura: factura.tipoFactura }).then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
    } else if (factura.nroFactura != null) {
        facturas.find({ nroFactura: factura.nroFactura }).then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
    }
})

//promesa de guardar facturas
facturasRouter.post('/', (req, res) => {
    const factura = req.body
    let valorTotal = 0
    factura.elementos.forEach((item) => {
        valorTotal += (Number(item.valorUnitario) + (Number(item.valorUnitario) * Number(item.porcentajeIva))) * Number(item.cantidad)
    })
    factura.totalOperacion = valorTotal
    factura.fecha = new Date(req.body.fecha)
    const facturaCompleta = new facturas(factura)
    facturaCompleta.save().then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de actualizar la factura
facturasRouter.patch('/', (req, res) => {
    const factura = req.body
    facturas.updateOne({ nroFactura: factura.nroFactura }, factura)
        .then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de eliminar facturas
facturasRouter.delete('/:id', (req, res) => {
    facturas.deleteOne({ _id: req.params.id })
        .then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de consultas facturas en un rango de fechas para el calculo de informes
facturasRouter.get('/filtrofecha/:fechaInicio/:fechaFinal', (req, res) => {
    fechainicio = new Date(req.params.fechaInicio)
    fechafinal = new Date(req.params.fechaFinal)
    facturas.find({ fecha: { "$lte": fechafinal, "$gte": fechainicio } })
        .then(datos => res.json({ facturas: datos })).catch(error => res.json({ mensaje: error }))
})

module.exports = facturasRouter