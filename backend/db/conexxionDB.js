const mongoose = require('mongoose')

let conexion = 'mongodb+srv://manu27:Manuel27_27@cluster0.9ii8xdm.mongodb.net/prueba'

mongoose.connect(conexion).then(event => console.log("conectado a mongo")).catch(error => console.log(error))

module.exports= mongoose