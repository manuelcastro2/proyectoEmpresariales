import React, { useState, useEffect } from 'react';
import './../../Estilos/EstiloMenu.css'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import RegistrarBodegas from './registerBodegas'
import AgregarProductos from './VerProductosBodegas'
//importacion de iconos
import Banner from './../general/Banner'
import Panel from './../general/Barra'
import AlertRequerimiento from './../general/AlertRequerimiento';
import PantallaCarga from './../general/PantallaCarga';
import { ConsultarBodegas, EliminarBodega, ConsultarNombreBodega } from './../../apis/ApiBodegas'

//para invocar al backend en la parte de usuarios
const MenuTercero = () => {

    //metodo state y de estados de los datos del usuario del inicio de sesion
    //y los estados de mostrar y consultas y de los alert de que se guardo y elimino correctamente
    //y las diferentes acciones que se hacen en el menu
    const { state } = useLocation();
    const [DatosUsuario, setDatosUsuario] = useState("")
    const [DatosMostrar, setDatosMostrar] = useState([])
    const [EstadoRegistrarBodegas, setEstadoRegistrarBodegas] = useState(false)
    const [EstadoAgregarProductos, setEstadoAgregarProductos] = useState(false)
    const [busqueda, setbusqueda] = useState("")
    const [EstadoSesion, SetEstadoSesion] = useState(false)
    const [EstadoAlertAccion, setEstadoAlertAccion] = useState(false)
    const [loading, setLoading] = useState(false)
    const [Accion, setAccion] = useState("")
    const [Dato, setDato] = useState("")
    const [Id, SetId] = useState(undefined)

    useEffect(() => {
        if (state && state.DatosUsuario) {
            setDatosUsuario(state.DatosUsuario);
            console.log(state.DatosUsuario);
            Vista()
        } else {
            SetEstadoSesion(true)
        }
    }, []);

    const Vista = () => {
        if (busqueda.trim() != "") {
            MostrarBusqueda()
        } else {
            MostrarTodo()
        }
    }

    const MostrarTodo = async () => {
        setLoading(true)
        const Response = ConsultarBodegas()
        Response.then(datos => {
            setDatosMostrar(datos.bodegas)
            setLoading(false)
        })
    }

    const MostrarBusqueda = async () => {
        const response = ConsultarNombreBodega(busqueda)
        response.then(datos => {
            setDatosMostrar(datos.bodegas)
        })
    }

    const EliminarBodegas = async (id) => {
        if (DatosUsuario.id != id) {
            EliminarBodega(id)
            setDato("la bodega")
            setAccion("Se elimino")
            Vista()
            setEstadoAlertAccion(!EstadoAlertAccion)
        } else {
            setDato("a la bodega")
            setAccion("No se peude eliminar")
            setEstadoAlertAccion(!EstadoAlertAccion)
        }
    }

    const MostrarInfo = () => {
        if (loading) {
            return (
                <div className='container-listado'>
                    <PantallaCarga />
                </div>
            )
        } else {
            return (
                <div className='container-listado-vista'>
                    {DatosMostrar.map((item) => (
                        <div className='caja-vista'>
                            <div className='caja-vista-principal'>
                                <div className='caja-principal'>
                                    {item.nombre}
                                </div>
                                <div className='caja-nombre'>
                                    {item.direccion}
                                </div>
                            </div>
                            <div className='caja-Datos' id="aumentar">
                                <div className='text-Mostrar'>
                                    <button className='Button-acciones' onClick={() => {
                                        SetId(item.nombre)
                                        setEstadoAgregarProductos(!EstadoAgregarProductos)
                                    }} type="submit">Productos</button>
                                    {DatosUsuario.rol != "ventas" ? (
                                        <div>
                                            <button className='Button-acciones' onClick={() => {
                                                SetId(item.nombre)
                                                setEstadoRegistrarBodegas(!EstadoRegistrarBodegas)
                                            }} type="submit">Actualizar</button>
                                            <button className='Button-acciones' onClick={() => EliminarBodegas(item._id)} type="submit">Eliminar</button>
                                        </div>
                                    ) : (
                                        <div>

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            )
        }
    }

    if (EstadoSesion) {
        return (
            <AlertRequerimiento />
        )
    } else {

        return (
            <div className='container-principal'>
                <div className='container-menu'>
                    <Banner DatosUsuario={DatosUsuario}></Banner>
                    {DatosUsuario.rol != "ventas" ? (
                        <button onClick={() => {
                            setEstadoRegistrarBodegas(!EstadoRegistrarBodegas)
                            SetId(undefined)
                        }} className='button-Agregar' type="submit"><p className='text-PANEL'>Agregar</p></button>
                    ) : (
                        <div>

                        </div>
                    )}
                </div>
                <div className='container-panel'>
                    <Panel panel="Lista Bodegas"></Panel>
                    <div className='container-info'>
                        <div className='container-busqueda'>
                            <div className='container-busqueda-input'>
                                <input className='Input-text' type="text" placeholder='Filtrar'
                                    value={busqueda}
                                    onChange={(event) => setbusqueda(event.target.value)} />
                                <label className='label-tercero' for="">Busqueda</label>
                                <button className='Button-Entrar' type="submit"
                                    onClick={() => Vista()}
                                >Buscar</button>
                            </div>
                        </div>
                        <div className='container-listado'>
                            {MostrarInfo()}
                        </div>
                    </div>
                </div>
                {EstadoRegistrarBodegas &&
                    <div className='container-Fondo'>
                        <RegistrarBodegas Actualizar={Id}></RegistrarBodegas>
                        <button onClick={() => {
                            Vista()
                            setEstadoRegistrarBodegas(!EstadoRegistrarBodegas)
                        }} className='Button-Exit2' type="submit">X</button>
                    </div>
                }
                {EstadoAgregarProductos &&
                    <div className='container-Fondo'>
                        <AgregarProductos Actualizar={Id}></AgregarProductos>
                        <button onClick={() => {
                            Vista()
                            setEstadoAgregarProductos(!EstadoAgregarProductos)
                        }} className='Button-Exit3' type="submit">X</button>
                    </div>
                }
                {EstadoAlertAccion &&
                    <div className='container-Fondo'>
                        <div className='Container-Alert'>
                            <div className='Container-Alert-interno'>
                                <p className='Text-Alert'>
                                    <p>{Accion} {Dato}</p>
                                    <button className='button-Alert' type="submit" onClick={() => {
                                        setEstadoAlertAccion(!EstadoAlertAccion)
                                        Vista()
                                    }}>Cerrar</button>
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default MenuTercero