import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ConsultarDocumentoUsuarios, AgregarUsuarios, ActualizarUsuarios } from './../../apis/ApiUsuarios'


const RegisterUsuario = ({ Actualizar }) => {

    const [Id, setId] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [cedula, setCedula] = useState("")
    const [rol, setRol] = useState("")
    const [clave, setClave] = useState("")
    const [Accion, setAccion] = useState("")
    const [EstadoAlertAccion, setEstadoAlertAccion] = useState(false)

    const Save = async (e) => {
        e.preventDefault();
        const usuario = {
            nombre: nombre,
            apellido: apellido,
            cedula: cedula,
            rol: rol,
            clave: clave
        }
        if (Actualizar === undefined) {
            const response = AgregarUsuarios(usuario)
            if (response.data !== undefined) {
                setAccion("guardo")
                setNombre("")
                setCedula("")
                setApellido("")
                setRol("")
                setClave("")
            }
        } else {
            const response = ActualizarUsuarios(usuario)
            if (response.data !== undefined) {
                setNombre("")
                setCedula("")
                setApellido("")
                setRol("")
                setClave("")
                setAccion("actualizo")
            }
        }
        setEstadoAlertAccion(!EstadoAlertAccion)
    }

    useEffect(() => {
        if (Actualizar != undefined) {
            const getIdUsuario = async () => {
                const Resultado = ConsultarDocumentoUsuarios(Actualizar)
                Resultado.data.users.forEach((item) => {
                    setId(item.id)
                    setNombre(item.nombre)
                    setCedula(item.cedula)
                    setApellido(item.apellido)
                    setRol(item.rol)
                    setClave(item.clave)
                })
            }
            getIdUsuario()
        }

    }, [])

    return (
        <div className='container-RegistroTercero'>
            <h1 className='container-titulo'>
                Registrar usuario
            </h1>
            <form onSubmit={Save}>
                <div className='container-interno-Tercero field'>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="Name"
                            placeholder='Name'
                            id='Name'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)} />
                        <label className='label-tercero' for="">Nombre</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="Apellido"
                            placeholder='Apellido'
                            id='Apellido'
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)} />
                        <label className='label-tercero' for="">Apellido</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="cedula"
                            placeholder='Cedula'
                            id='cedula'
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)} />
                        <label className='label-tercero' for="">Cedula</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="Rol"
                            placeholder='Rol'
                            id='rol'
                            value={rol}
                            onChange={(e) => setRol(e.target.value)} />
                        <label className='label-tercero' for="">Rol</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="Password"
                            placeholder='Password'
                            id='password'
                            value={clave}
                            onChange={(e) => setClave(e.target.value)} />
                        <label className='label-tercero' for="">Password</label>
                    </div>
                    <div className='container-Input'>
                        <button className='Button-Entrar' type="submit">Enviar</button>
                    </div>
                </div>
            </form>
            {EstadoAlertAccion &&
                <div className='container-Fondo'>
                    <div className='Container-Alert'>
                        <div className='Container-Alert-interno'>
                            <p className='Text-Alert'>
                                <span>Se {Accion} al usuario</span>
                                <button className='button-Alert' type="submit" onClick={() => setEstadoAlertAccion(!EstadoAlertAccion)}>Volver</button>
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RegisterUsuario