const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./routers/usersRouter')
const winerieRouter = require('./routers/bodegasRouter')
const thirdRouter = require('./routers/tercerosRouter')
const productRouter = require('./routers/productosRouter')
const facturaRouter = require('./routers/facturasRouter')
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/usuarios', userRouter);
app.use('/bodegas', winerieRouter);
app.use('/terceros', thirdRouter);
app.use('/productos', productRouter);
app.use('/facturas', facturaRouter);

module.exports=app