import React, { useState, useEffect } from 'react';
import './../../Estilos/EstiloMenu.css'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { GenerarPdf } from './../general/GenerarFacturas'
import Banner from './../general/Banner'
import Panel from './../general/Barra'
import AlertRequerimiento from './../general/AlertRequerimiento';
import PantallaCarga from './../general/PantallaCarga';
import RegisterFactura from './registerFacturas'
import ActualizarFacturas from './ActualizarFacturas'
import { ConsultarFacturas, ConsultarCodigoFacturas, EliminarFactura } from '../../apis/ApiFactura'

const MenuTercero = () => {

    const { state } = useLocation();
    const [DatosUsuario, setDatosUsuario] = useState("")
    const [DatosMostrar, setDatosMostrar] = useState([])
    const [EstadoRegistrarUsuario, setEstadoRegistrarUsuario] = useState(false)
    const [EstadoActualizarFactura, setEstadoActulizarFactura] = useState(false)
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
        } else {
            MostrarTodo()
        }

    }

    const MostrarTodo = async () => {
        setLoading(true)
        const response = ConsultarFacturas()
        response.then(datos => {
            setDatosMostrar(datos.facturas)
            setLoading(false)
        })


    }

    const EliminarFacturas = async (id) => {
        const response = EliminarFactura(id)
        setDato("la factura")
        setAccion("Se elimino")
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
                <div className='container-listado-vista'>
                    {DatosMostrar.map((item) => (
                        <div className='caja-vista'>
                            <div className='caja-vista-principal'>
                                <div className='caja-principal'>
                                    {item.nroFactura}
                                </div>
                                <div className='caja-nombre'>
                                    {item.tipoFactura}
                                </div>
                            </div>
                            <div className='caja-Datos' id="aumentar">
                                <div className='text-Mostrar'>
                                    Tercero: {item.tercero.nombre}
                                </div>
                                <div className='text-Mostrar'>
                                    Tipo tercero: {item.tercero.tipoTercero}
                                </div>
                                <div className='text-Mostrar'>
                                    Bodega: {item.bodega.nombre}
                                </div>
                                <div className='text-Mostrar'>
                                    Fecha: {item.fecha}
                                </div>
                                <div className='caja-elementos'>
                                    Elementos:
                                    <div className='barra'>
                                        <div className='datos'>
                                            Nombre
                                        </div>
                                        <div className='datos'>
                                            Cantidad
                                        </div>
                                        <div className='datos'>
                                            Valor unitario
                                        </div>
                                    </div>
                                    {item.elementos.map((item) => (
                                        <div className='elementos'>
                                            <div className='datos'>
                                                {item.nombre}
                                            </div>
                                            <div className='datos'>
                                                {item.cantidad}
                                            </div>
                                            <div className='datos'>
                                                {item.valorUnitario}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='text-Mostrar'>
                                    ValorTotal: {item.totalOperacion}
                                </div>
                                <div className='text-Mostrar'>
                                    <button className='Button-acciones'
                                        type="submit"
                                        onClick={() => {
                                            GenerarPdf({
                                                nroFactura: item.nroFactura,
                                                tipofactura: item.tipoFactura,
                                                nombreCliente: item.tercero.nombre,
                                                documento: item.tercero.documento,
                                                bodegaNombre: item.bodega.nombre,
                                                direccionBodega: item.bodega.direccion,
                                                fecha: item.fecha,
                                                elementos: item.elementos,
                                                valor: item.totalOperacion
                                            })
                                        }}
                                    >Ver factura</button>
                                    {DatosUsuario.rol == "administrador" ? (
                                        <div>
                                            <button className='Button-acciones' onClick={() => {
                                                SetId(item.nroFactura)
                                                setEstadoActulizarFactura(!EstadoActualizarFactura)
                                            }} type="submit">Actualizar</button>
                                            <button className='Button-acciones' onClick={() => EliminarFacturas(item._id)} type="submit">Eliminar</button>
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
                    <button onClick={() => {
                        setEstadoRegistrarUsuario(!EstadoRegistrarUsuario)
                        SetId(undefined)
                    }} className='button-Agregar' type="submit"><p className='text-PANEL'>Agregar</p></button>
                </div>
                <div className='container-panel'>
                    <Panel panel="Lista facturas venta"></Panel>
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
                        <RegisterFactura Datos={DatosUsuario} ></RegisterFactura>
                        <button onClick={() => {
                            Vista()
                            setEstadoRegistrarUsuario(!EstadoRegistrarUsuario)
                        }} className='Button-Exit' type="submit">X</button>
                    </div>
                }
                {EstadoActualizarFactura &&
                    <div className='container-Fondo'>
                        <ActualizarFacturas Datos={DatosUsuario} Actualizar={Id} ></ActualizarFacturas>
                        <button onClick={() => {
                            Vista()
                            setEstadoActulizarFactura(!EstadoActualizarFactura)
                        }} className='Button-Exit' type="submit">X</button>
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