import axios from "axios";

const endpoint = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3333';
const usuariosEndpoint = `${endpoint}/facturas`;

export async function ConsultarFacturas() {
    const response = await axios.get(`${endpoint}/`)
    return response.data
}

export async function ConsultaPorRango(fechainicio, fechafinal) {
    const response = await axios.get(`${endpoint}/filtrofecha/${fechainicio}/${fechafinal}`)
    return response.data
}

export async function ConsultarCodigoFacturas(codigo) {
    const response = await axios.post(`${endpoint}/filtro`, {
        nroFactura: codigo
    })
    return response.data
}

export async function AgregarFacturas(factura) {
    const response = await axios.post(`${endpoint}/`, {
        nroFactura: factura.nroFactura,
        tipoFactura: factura.tipoFactura,
        tercero: factura.tercero,
        fecha: factura.fecha,
        bodega: factura.bodega,
        elementos: factura.elementos,
        totalOperacion: factura.totalOperacion
    })
    return response.data
}

export async function ActualizarFactura(factura) {
    const response = await axios.patch(`${endpoint}/`, {
        _id: factura.id,
        nroFactura: factura.nroFactura,
        tipoFactura: factura.tipoFactura,
        tercero: factura.tercero,
        fecha: factura.fecha,
        bodega: factura.bodega,
        elementos: factura.elementos,
        totalOperacion: factura.totalOperacion
    })
    return response.data
}

export async function EliminarFactura(id) {
    const response = await axios.delete(`${endpoint}/${id}`)
    return response.data
}