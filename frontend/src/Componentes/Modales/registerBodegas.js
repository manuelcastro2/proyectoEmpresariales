import React, { useState, useEffect } from 'react';
import axios from 'axios';

const endpoint = 'http://localhost:3333/bodegas/'

const RegisterUsuario = ({ Actualizar }) => {

    const [Id, setId] = useState("")
    const [nombre, setNombre] = useState("")
    const [direccion, setDireccion] = useState("")
    const [Accion, setAccion] = useState("")
    const [EstadoAlertAccion, setEstadoAlertAccion] = useState(false)

    const Save = async (e) => {
        e.preventDefault();
        if (Actualizar === undefined) {
            const response = await axios.post(endpoint, {
                nombre: nombre,
                direccion: direccion
            })
            if (response.data !== undefined) {
                setAccion("guardo")
                setNombre("")
                setDireccion("")
            }
        } else {
            const response = await axios.patch(endpoint, {
                _id:Id,
                nombre: nombre,
                direccion: direccion
            })
            if (response.data !== undefined) {
                setNombre("")
                setDireccion("")
                setAccion("actualizo")
            }
        }
        setEstadoAlertAccion(!EstadoAlertAccion)
    }

    useEffect(() => {
        if (Actualizar != undefined) {
            console.log(Actualizar);
            const getIdBodega = async () => {
                await axios.get(`${endpoint}${Actualizar}`).then(response => {
                    response.data.bodegas.forEach((item) => {
                        setId(item._id)
                        setNombre(item.nombre)
                        setDireccion(item.direccion)
                    })
                })

            }
            getIdBodega()
        }

    }, [])

    return (
        <div className='container-RegistroTercero2'>
            <h1 className='container-titulo'>
                Registrar bodega
            </h1>
            <form onSubmit={Save}>
                <div className='container-interno-Tercero2 field'>
                    <div className='container-Input separacion'>
                        <input className='Input-text' type="text"
                            name="Nombre"
                            placeholder='Nombre'
                            id='Name'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)} />
                        <label className='label-tercero' for="">Nombre</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="Direccion"
                            placeholder='Direccion'
                            id='Direccion'
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)} />
                        <label className='label-tercero' for="">Apellido</label>
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
                                <span>Se {Accion} la bodega</span>
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