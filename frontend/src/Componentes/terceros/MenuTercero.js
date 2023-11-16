import React, { useState, useEffect } from 'react';
import './../../Estilos/EstiloMenu.css'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import RegistrarTercero from './registrarTercero'
//importacion de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import Banner from '../general/Banner'
import Panel from '../general/Barra'
import AlertRequerimiento from '../general/AlertRequerimiento';
import PantallaCarga from '../general/PantallaCarga';
import { ConsultarTodosTerceros, ConsultarDocumentoTercero, ConsultarTipoTercero, EliminarTercero } from './../../apis/ApiTerceros'

//para invocar al backend en la parte de productos
const endpoint = 'http://localhost:3333/terceros'

//funcion general
const MenuTercero = () => {

    //metodo state y de estados de los datos del usuario del inicio de sesion
    //y los estados de mostrar y consultas y de los alert de que se guardo y elimino correctamente
    //y las diferentes acciones que se hacen en el menu
    const { state } = useLocation();
    const [DatosUsuario, setDatosUsuario] = useState("")
    const [DatosMostrar, setDatosMostrar] = useState([])
    const [EstadoRegistrarTercero, setEstadoRegistrarTercero] = useState(false)
    const [Mostraropciones, setMostraropciones] = useState(false)
    const [busqueda, setbusqueda] = useState("")
    const [Mostrarcientes, setmostrarClientes] = useState(0)
    const [Mostrarproveedor, setmostrarProveedor] = useState(0)
    const [EstadoSesion, SetEstadoSesion] = useState(false)
    const [EstadoAlertAccion, setEstadoAlertAccion] = useState(false)
    const [Accion, setAccion] = useState("")
    const [Dato, setDato] = useState("")
    const [loading, setLoading] = useState(false)
    const [Id, SetId] = useState(undefined)

    //validadcion de datos
    useEffect(() => {
        if (state && state.DatosUsuario) {
            setDatosUsuario(state.DatosUsuario);
            Vista()
        } else {
            SetEstadoSesion(true)
        }
    }, []);

    //funcion de mostrar si es general o especifico
    const Vista = () => {
        if (Mostrarcientes === 1) {
            MostrarCliente()
        }

        if (Mostrarproveedor === 2) {
            MostrarProveedor()
        } else {
            if (busqueda.trim() != "") {
                MostrarBusqueda()
            } else {
                MostrarTodo()
            }
        }
    }

    //funcion de consulta todo
    const MostrarTodo = async () => {
        setLoading(true)
        const Resultado = ConsultarTodosTerceros()
        Resultado.then(datos => {
            setDatosMostrar(datos.thirds)
            setLoading(false)
        })
    }

    //funcion de consulta especifica
    const MostrarBusqueda = async () => {
        setLoading(true)
        const Resultado = ConsultarDocumentoTercero(busqueda)
        Resultado.then(datos => {
            setDatosMostrar(datos.thirds)
            console.log(DatosMostrar);
            setLoading(false)
        })
    }

    //funcion de consulta rol cliente
    const MostrarCliente = async () => {
        setLoading(true)
        const Resultado = ConsultarTipoTercero("cliente")
        Resultado.then(datos => {
            setDatosMostrar(datos.thirds)
            setLoading(false)
        })
    }

    //funcion de consulta rol proveedor
    const MostrarProveedor = async () => {
        setLoading(true)
        const Resultado = ConsultarTipoTercero("proveedor")
        Resultado.then(datos => {
            setDatosMostrar(datos.thirds)
            setLoading(false)
        })
    }
    //funcion de eliminar tercero
    const EliminarTerceros = async (id) => {
        const response = EliminarTercero(id)
        setDato("tercero")
        setAccion("elimino")
        setEstadoAlertAccion(!EstadoAlertAccion)
        Vista()
    }

    //funcion de mostrar y poder interatuar  con las funciones de consultas clientes y proveedores
    const MostrarOpciones = () => {
        if (Mostraropciones) {
            return (
                <div className='caja-opciones'>
                    <button className='button-opciones-cliente' id='boton-cliente' value="cliente" type="submit"
                        onClick={() => {
                            setmostrarClientes(1)
                            Vista()
                        }} >Cliente
                    </button>

                    <div className='division'>
                    </div>
                    <button className='button-opciones-proveedor' id="boton-proveedor" value="proveedor" type="submit"
                        onClick={() => {
                            setmostrarProveedor(2)
                            Vista()
                        }}>Proveedor
                    </button>
                </div>
            )
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
                                    {item.tipoTercero}
                                </div>
                                <div className='caja-nombre'>
                                    {item.nombre}
                                </div>
                            </div>
                            <div className='caja-Datos' id="aumentar">
                                <div className='text-Mostrar'>
                                    Tipo documento: {item.tipoDocumento}
                                </div>
                                <div className='text-Mostrar'>
                                    Documento: {item.documento}
                                </div>
                                <div className='text-Mostrar'>
                                    Direccion: {item.direccion}
                                </div>
                                <div className='text-Mostrar'>
                                    Telefono: {item.telefono}
                                </div>
                                <div className='text-Mostrar'>
                                    <button className='Button-acciones' onClick={() => {
                                        SetId(item.documento)
                                        setEstadoRegistrarTercero(!EstadoRegistrarTercero)
                                    }} type="submit">Actualizar</button>
                                    <button className='Button-acciones' onClick={() => EliminarTerceros(item._id)} type="submit">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    }

    //condicion de estado de sesion
    if (EstadoSesion) {
        return (
            <AlertRequerimiento />
        )
    } else {
        //todo esto es lo que retorno a la pantalla
        return (
            <div className='container-principal'>
                <div className='container-menu'>
                    <Banner DatosUsuario={DatosUsuario}></Banner>
                    <button onClick={() => {
                        SetId(undefined)
                        setEstadoRegistrarTercero(!EstadoRegistrarTercero)
                    }} className='button-Agregar' type="submit"><p className='text-PANEL'>Agregar</p></button>
                </div>
                <div className='container-panel'>
                    <Panel panel="Lista Terceros"></Panel>
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
                            <button className='Button-Filtro' type="submit" onClick={() => {
                                setmostrarClientes(0)
                                setmostrarProveedor(0)
                                setMostraropciones(!Mostraropciones)
                                Vista()
                            }}>
                                <FontAwesomeIcon icon={faFilter}>
                                </FontAwesomeIcon>
                            </button>
                            {MostrarOpciones()}
                        </div>
                        <div className='container-listado'>
                            {MostrarInfo()}
                        </div>
                    </div>
                </div>
                {EstadoRegistrarTercero &&
                    <div className='container-Fondo'>
                        <RegistrarTercero Actualizar={Id}></RegistrarTercero>
                        <button onClick={() => {
                            setEstadoRegistrarTercero(!EstadoRegistrarTercero)
                            Vista()
                        }} className='Button-Exit' type="submit">X</button>
                    </div>
                }
                {EstadoAlertAccion &&
                    <div className='container-Fondo'>
                        <div className='Container-Alert'>
                            <div className='Container-Alert-interno'>
                                <p className='Text-Alert'>
                                    <p>Se {Accion} al {Dato}</p>
                                    <button className='button-Alert' type="submit" onClick={() => setEstadoAlertAccion(!EstadoAlertAccion)}>Cerrar</button>
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