import axios from "axios";

const endpoint = process.env.VITE_BACKEND_URL || 'http://localhost:3333';
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
    const response = await axios.delete(`${endpoint}/${id}`)
    return response.data
}

export async function InicioUsuarios(cedula,clave){
    const response = await axios.get(`${endpoint}/inicio/${cedula}/${clave}`)
    return response.data
}