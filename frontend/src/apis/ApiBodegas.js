import axios from "axios";

const endpoint = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3333';
const usuariosEndpoint = `${endpoint}/bodegas`;

export async function ConsultarBodegas() {
    const response = await axios.get(`${endpoint}/`)
    return response.data
}

export async function ConsultarNombreBodega(nombre) {
    const response = await axios.get(`${endpoint}/${nombre}`)
    return response.data
}

export async function AgregarBodegas(bodega) {
    const response = await axios.post(`${endpoint}/`, {
        nombre: bodega.nombre,
        direccion: bodega.direccion
    })
    return response.data
}

export async function ActualizarBodega(bodega) {
    console.log(bodega);
    const response = await axios.patch(`${endpoint}/`, {
        _id: bodega.id,
        nombre: bodega.nombre,
        direccion: bodega.direccion,
        productos: bodega.productos
    })
    return response.data
}


export async function EliminarBodega(id) {
    const response = await axios.delete(`${endpoint}/${id}`)
    return response.data
}