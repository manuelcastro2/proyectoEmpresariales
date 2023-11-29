import axios from "axios";

const endpoint = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333';
const productosEndpoint = `${endpoint}/productos`;

export async function ConsultarProductos() {
    const response = await axios.get(`${productosEndpoint}/`)
    return response.data
}

export async function ConsultarCodigoProducto(codigo) {
    const response = await axios.post(`${productosEndpoint}/codigoProducto`, {
        codigoProducto: codigo
    })
    return response.data
}

export async function AgregarProductos(producto) {
    const response = await axios.post(`${productosEndpoint}/`, {
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
    const response = await axios.patch(`${productosEndpoint}/`, {
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
    const response = await axios.delete(`${productosEndpoint}/${id}`)
    return response.data
}