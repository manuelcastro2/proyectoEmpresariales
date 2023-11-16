import React, { useState, useEffect } from 'react';
import './../../Estilos/EstiloMenu.css'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import RegistrarProducto from './registerProducto';
import Banner from './../general/Banner'
import Panel from './../general/Barra'
import AlertRequerimiento from './../general/AlertRequerimiento';
import PantallaCarga from './../general/PantallaCarga';
import { ConsultarCodigoProducto, ConsultarProductos, EliminarProducto } from '../../apis/ApiProductos'
//para invocar al backend en la parte de productos


//funcion general
const MenuTercero = () => {

    //metodo state y de estados de los datos del usuario del inicio de sesion
    //y los estados de mostrar y consultas y de los alert de que se guardo y elimino correctamente
    //y las diferentes acciones que se hacen en el menu
    const { state } = useLocation();
    const [DatosUsuario, setDatosUsuario] = useState("")
    const [DatosMostrar, setDatosMostrar] = useState([])
    const [EstadoRegistrarUsuario, setEstadoRegistrarUsuario] = useState(false)
    const [busqueda, setbusqueda] = useState("")
    const [EstadoSesion, SetEstadoSesion] = useState(false)
    const [EstadoAlertAccion, setEstadoAlertAccion] = useState(false)
    const [Accion, setAccion] = useState("")
    const [Dato, setDato] = useState("")
    const [Id, SetId] = useState(undefined)
    const [loading, setLoading] = useState(false)

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
        if (busqueda.trim() != "") {
            MostrarBusqueda()
        } else {
            MostrarTodo()
        }
    }

    //funcion de consulta todo
    const MostrarTodo = async () => {
        setLoading(true)
        const response = ConsultarProductos()
        response.then(datos => {
            setDatosMostrar(datos.products)
            setLoading(false)
        })

    }

    //funcion de consulta especifica
    const MostrarBusqueda = async () => {
        const response = ConsultarCodigoProducto(busqueda)
        response.then(response=>{
            setDatosMostrar(response.products)
        })
        
    }

    //funcion de eliminar productos
    const EliminarProducto = async (id) => {
        const response =EliminarProducto(id)
        setDato("Producto")
        setAccion("elimino")
        Vista()
        setEstadoAlertAccion(!EstadoAlertAccion)
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
                <div className='container-listado-vista2'>
                    {DatosMostrar.map((item) => (
                        <div className='caja-vista2'>
                            <div className='caja-vista-principal'>
                                <div className='caja-principal'>
                                    {item.codigoProducto}
                                </div>
                                <div className='caja-nombre'>
                                    {item.nombre}
                                </div>
                            </div>
                            <div className='caja-Datos' id="aumentar">
                                <div className='text-Mostrar2'>
                                    Descripcion: {item.descripcion}
                                </div>
                                <div className='text-Mostrar2'>
                                    Existencias: {item.existencias}
                                </div>
                                <div className='text-Mostrar'>
                                    Tipo producto: {item.tipoProducto}
                                </div>
                                <div className='text-Mostrar'>
                                    Unidad de medida: {item.unidadMedida}
                                </div>
                                <div className='text-Mostrar'>
                                    Porcentaje IVA: {item.porcentaje}
                                </div>
                                <div className='text-Mostrar'>
                                    Valor unitario: {item.valorUnitario}
                                </div>
                                <div className='text-Mostrar'>
                                    <button className='Button-acciones' onClick={() => {
                                        SetId(item.codigoProducto)
                                        setEstadoRegistrarUsuario(!EstadoRegistrarUsuario)
                                    }} type="submit">Actualizar</button>
                                    <button className='Button-acciones' onClick={() => EliminarProducto(item._id)} type="submit">Eliminar</button>
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
                        setEstadoRegistrarUsuario(!EstadoRegistrarUsuario)
                        SetId(undefined)
                    }} className='button-Agregar' type="submit"><p className='text-PANEL'>Agregar</p></button>
                </div>
                <div className='container-panel'>
                    <Panel panel="Lista Productos"></Panel>
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
                {EstadoRegistrarUsuario &&
                    <div className='container-Fondo'>
                        <RegistrarProducto Actualizar={Id}></RegistrarProducto>
                        <button onClick={() => {
                            Vista()
                            setEstadoRegistrarUsuario(!EstadoRegistrarUsuario)
                        }} className='Button-Exit' type="submit">X</button>
                    </div>
                }
                {EstadoAlertAccion &&
                    <div className='container-Fondo'>
                        <div className='Container-Alert'>
                            <div className='Container-Alert-interno'>
                                <p className='Text-Alert'>
                                    <p>Se {Accion} al {Dato}</p>
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