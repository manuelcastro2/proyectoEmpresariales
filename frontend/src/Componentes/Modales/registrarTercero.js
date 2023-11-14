import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../../Estilos/EstiloRegistroTercero.css'

const endpoint = 'http://localhost:3333/terceros/'

function RegistrarTercero({ Actualizar }) {

    const [name, setName] = useState("")
    const [tipoDoc, setTipoDoc] = useState("")
    const [cedula, setCedula] = useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [tipoTercero, setTipoTercero] = useState("")
    const [EstadoAlertAccion, setEstadoAlertAccion] = useState(false)
    const [Id, setId] = useState("")
    const [Accion, setAccion] = useState("")

    const Enviar = async (e) => {
        e.preventDefault();
        if (Actualizar === undefined) {
            const response = await axios.post(endpoint, {
                nombre: name,
                tipoDocumento: tipoDoc,
                documento: cedula,
                direccion: direccion,
                telefono: telefono,
                tipoTercero: tipoTercero
            })
            if (response.data !== undefined) {
                setAccion("guardo")
                setCedula("")
                setDireccion("")
                setName("")
                setTipoDoc("")
                setTelefono("")
                setTipoTercero("")
            }
        } else {
            const response = await axios.patch(`${endpoint}`, {
                _id: Id,
                nombre: name,
                tipoDocumento: tipoDoc,
                documento: cedula,
                direccion: direccion,
                telefono: telefono,
                tipoTercero: tipoTercero
            })
            if (response.data !== undefined) {
                setCedula("")
                setDireccion("")
                setName("")
                setTipoDoc("")
                setTelefono("")
                setTipoTercero("")
                setAccion("actualizo")
            }
        }
        setEstadoAlertAccion(!EstadoAlertAccion)
    }


    useEffect(() => {
        if (Actualizar != undefined) {
            const getIdTercero = async () => {
                const response = await axios.post(`${endpoint}documento`, { documento: Actualizar })
                console.log(response.data);
                response.data.thirds.forEach((item) => {
                    setId(item._id)
                    setName(item.nombre)
                    setTipoDoc(item.tipoDocumento)
                    setCedula(item.documento)
                    setDireccion(item.direccion)
                    setTelefono(item.telefono)
                    setTipoTercero(item.tipoTercero)
                })
            }
            getIdTercero()
        }
    }, [])

    console.log(Actualizar);

    return (
        <div className='container-RegistroTercero'>
            <h1 className='container-titulo'>
                Registrar tercero
            </h1>
            <form onSubmit={Enviar}>
                <div className='container-interno-Tercero field'>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="tipotercero"
                            placeholder='Tipotercero'
                            id='tipotercero'
                            value={tipoTercero}
                            onChange={(e) => setTipoTercero(e.target.value)} />
                        <label className='label-tercero' for="">Tipo tercero</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="Name"
                            placeholder='Name'
                            id='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <label className='label-tercero' for="">Nombre</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="tipoDoc"
                            placeholder='Tipo documento'
                            id='tipoDoc'
                            value={tipoDoc}
                            onChange={(e) => setTipoDoc(e.target.value)} />
                        <label className='label-tercero' for="">Tipo documento</label>
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
                            name="direccion"
                            placeholder='direccion'
                            id='direccion'
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)} />
                        <label className='label-tercero' for="">Direccion</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="telefono"
                            placeholder='Telefono'
                            id='telefono'
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)} />
                        <label className='label-tercero' for="">Telefono</label>
                    </div>
                    <button className='Button-Entrar' type="submit">Enviar</button>
                </div>
            </form>
            {EstadoAlertAccion &&
                <div className='container-Fondo'>
                    <div className='Container-Alert'>
                        <div className='Container-Alert-interno'>
                            <p className='Text-Alert'>
                                <span>Se {Accion} al tercero</span>
                                <button className='button-Alert' type="submit" onClick={() => setEstadoAlertAccion(!EstadoAlertAccion)}>Volver</button>
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default RegistrarTercero