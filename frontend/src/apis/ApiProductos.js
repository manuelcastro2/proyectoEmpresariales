import axios from "axios";

const endpoint = 'http://localhost:3333/productos'

export async function ConsultarProductos() {
    const response = await axios.get(`${endpoint}/`)
    return response.data
}

export async function ConsultarCodigoProducto(codigo) {
    const response = await axios.post(`${endpoint}/codigoProducto`, {
        codigoProducto: codigo
    })
    return response.data
}

export async function AgregarProductos(producto) {
    const response = await axios.post(`${endpoint}/`, {
        codigoProducto: producto.codigoProducto,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        tipoProducto: producto.tipoProducto,
        existencias: producto.existencias,
        unidadMedida: producto.unidadMedida,
        valorUnitario: producto.valorUnitario,
        porcentaje: producto.porcentaje
    })
    return response.data
}

export async function ActualizarProducto(producto) {
    const response = await axios.patch(`${endpoint}/`, {
        codigoProducto: producto.codigoProducto,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        tipoProducto: producto.tipoProducto,
        existencias: producto.existencias,
        unidadMedida: producto.unidadMedida,
        valorUnitario: producto.valorUnitario,
        porcentaje: producto.porcentaje
    })
    return response.data
}


export async function EliminarProducto(id) {
    const response = await axios.delete(`${endpoint}/${id}`)
    return response.data
}