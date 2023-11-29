import axios from "axios";

const endpoint = 'https://backend-proyecto-5rkk.onrender.com';
const usuariosEndpoint = `${endpoint}/usuarios`;

export async function ConsultarTodosUsuarios() {
    const response = await axios.get(`${usuariosEndpoint}/`)
    return response.data
}

export async function ConsultarRolUsuario(Rol) {
    const response = await axios.get(`${usuariosEndpoint}/${Rol}`)
    return response.data
}

export async function ConsultarDocumentoUsuarios(documento) {
    const response = await axios.post(`${endpoint}/documento`, { cedula: documento })
    return response.data
}

export async function AgregarUsuarios(usuario) {
    const response = await axios.post(`${usuariosEndpoint}/`, {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        cedula: usuario.cedula,
        rol: usuario.rol,
        clave: usuario.clave
    })
    return response.data
}

export async function ActualizarUsuarios(usuario) {
    const response = await axios.patch(`${usuariosEndpoint}/`, {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        cedula: usuario.cedula,
        rol: usuario.rol,
        clave: usuario.clave
    })
    return response.data
}

export async function EliminarUsuarios(id) {
    const response = await axios.delete(`${usuariosEndpoint}/${id}`)
    return response.data
}

export async function InicioUsuarios(cedula,clave){
    const response = await axios.get(`${usuariosEndpoint}/inicio/${cedula}/${clave}`)
    return response.data
}