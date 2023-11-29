import axios from "axios";

const endpoint = process.env.VITE_BACKEND_URL;
const facturasEndpoint = `${endpoint}/facturas`;

export async function ConsultarFacturas() {
    const response = await axios.get(`${facturasEndpoint}/`)
    return response.data
}

export async function ConsultaPorRango(fechainicio, fechafinal) {
    const response = await axios.get(`${facturasEndpoint}/filtrofecha/${fechainicio}/${fechafinal}`)
    return response.data
}

export async function ConsultarCodigoFacturas(codigo) {
    const response = await axios.post(`${facturasEndpoint}/filtro`, {
        nroFactura: codigo
    })
    return response.data
}

export async function AgregarFacturas(factura) {
    const response = await axios.post(`${facturasEndpoint}/`, {
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
    const response = await axios.patch(`${facturasEndpoint}/`, {
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
    const response = await axios.delete(`${facturasEndpoint}/${id}`)
    return response.data
}