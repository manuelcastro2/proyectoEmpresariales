//llamados de librerias
const express = require('express');
const productos = require('../models/productosModel')
const productosRouter = express.Router()

//promesa de consulta de todos productos 
productosRouter.get('/', (req, res) => {
    productos.find().then(datos => res.json({ products: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de consulta actravez de codigo de productos
productosRouter.post('/codigoProducto', (req, res) => {
    productos.find({ codigoProducto: req.body.codigoProducto }).then(datos => res.json({ products: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de guardado de productos
productosRouter.post('/', (req, res) => {
    const producto = new productos(req.body)
    producto.save().then(datos => res.json({ products: datos })).catch(error => res.json({ mensaje: error }))
})

//promesa de actualizar productos
productosRouter.patch('/', (req, res) => {
    const producto = req.body
    productos.updateOne({ codigoProducto: producto.codigoProducto }, producto)
        .then(datos => res.json({ products: datos })).catch(error => {
            res.json({ mensaje: error })
            console.log(error);
        })
})

//promesa de eliminar productos
productosRouter.delete('/:id', (req, res) => {
    productos.deleteOne({ _id: req.params.id })
        .then(datos => res.json({ products: datos })).catch(error => res.json({ mensaje: error }))
})

module.exports = productosRouter