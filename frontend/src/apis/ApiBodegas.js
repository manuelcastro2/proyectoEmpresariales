import axios from "axios";

const endpoint = process.env.VITE_BACKEND_URL;
const bodegasEndpoint = `${endpoint}/bodegas`;

export async function ConsultarBodegas() {
    const response = await axios.get(`${bodegasEndpoint}/`)
    return response.data
}

export async function ConsultarNombreBodega(nombre) {
    const response = await axios.get(`${bodegasEndpoint}/${nombre}`)
    return response.data
}

export async function AgregarBodegas(bodega) {
    const response = await axios.post(`${bodegasEndpoint}/`, {
        nombre: bodega.nombre,
        direccion: bodega.direccion
    })
    return response.data
}

export async function ActualizarBodega(bodega) {
    console.log(bodega);
    const response = await axios.patch(`${bodegasEndpoint}/`, {
        _id: bodega.id,
        nombre: bodega.nombre,
        direccion: bodega.direccion,
        productos: bodega.productos
    })
    return response.data
}


export async function EliminarBodega(id) {
    const response = await axios.delete(`${bodegasEndpoint}/${id}`)
    return response.data
}