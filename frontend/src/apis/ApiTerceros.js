import axios from "axios";

const endpoint = 'http://localhost:3333/terceros'

export async function ConsultarTodosTerceros() {
    const response = await axios.get(`${endpoint}/`)
    return response.data
}

export async function ConsultarTipoTercero(Tipo) {
    const response = await axios.get(`${endpoint}/${Tipo}`)
    return response.data
}

export async function ConsultarDocumentoTercero(documento) {
    const response = await axios.post(`${endpoint}/documento`, { documento: documento })
    return response.data
}

export async function AgregarTerceros(tercero) {
    const response = await axios.post(`${endpoint}/`, {
        nombre: tercero.nombre,
        tipoTercero: tercero.tipoTercero,
        tipoDocumento: tercero.tipoDocumento,
        documento: tercero.documento,
        direccion: tercero.direccion,
        telefono: tercero.telefono
    })
    return response.data
}

export async function ActualizarTercero(tercero) {
    const response = await axios.patch(`${endpoint}/`, {
        id: tercero.id,
        nombre: tercero.nombre,
        tipoTercero: tercero.tipoTercero,
        tipoDocumento: tercero.tipoDocumento,
        documento: tercero.documento,
        direccion: tercero.direccion,
        telefono: tercero.telefono
    })
    return response.data
}

export async function EliminarTercero(id) {
    const response = await axios.delete(`${endpoint}/${id}`)
    return response.data
}