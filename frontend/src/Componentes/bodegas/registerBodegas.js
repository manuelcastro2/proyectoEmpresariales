import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgregarBodegas, ActualizarBodega, ConsultarNombreBodega } from './../../apis/ApiBodegas'

const RegisterUsuario = ({ Actualizar }) => {

    const [Id, setId] = useState("")
    const [nombre, setNombre] = useState("")
    const [direccion, setDireccion] = useState("")
    const [Accion, setAccion] = useState("")
    const [EstadoAlertAccion, setEstadoAlertAccion] = useState(false)

    const Save = async (e) => {
        e.preventDefault();
        const Bodegas = {
            nombre: nombre,
            direccion: direccion
        }

        const BodegaActualizar = {
            id: Id,
            nombre: nombre,
            direccion: direccion
        }
        if (Actualizar === undefined) {
            const response = AgregarBodegas(Bodegas)
            if (response !== undefined) {
                setAccion("guardo")
                setNombre("")
                setDireccion("")
            }
        } else {
            const response = ActualizarBodega(BodegaActualizar)
            if (response !== undefined) {
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
                const response = ConsultarNombreBodega(Actualizar)
                response.then((item) => {
                    item.bodegas.forEach(dato => {
                        setId(dato._id)
                        setNombre(dato.nombre)
                        setDireccion(dato.direccion)
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
                        <label className='label-tercero' for="">Direccion</label>
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