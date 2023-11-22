import axios from "axios";

const endpoint = 'http://localhost:3333/usuarios'

export async function ConsultarTodosUsuarios() {
    const response = await axios.get(`${endpoint}/`)
    return response.data
}

export async function ConsultarRolUsuario(Rol) {
    const response = await axios.get(`${endpoint}/${Rol}`)
    return response.data
}

export async function ConsultarDocumentoUsuarios(documento) {
    const response = await axios.post(`${endpoint}/documento`, { cedula: documento })
    return response.data
}

export async function AgregarUsuarios(usuario) {
    const response = await axios.post(`${endpoint}/`, {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        cedula: usuario.cedula,
        rol: usuario.rol,
        clave: usuario.clave
    })
    return response.data
}

export async function ActualizarUsuarios(usuario) {
    const response = await axios.patch(`${endpoint}/`, {
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