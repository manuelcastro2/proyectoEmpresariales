import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../../Estilos/EstiloVisualizar.css'
import PantallaCarga from '../general/PantallaCarga';
import { ActualizarBodega, AgregarBodegas, ConsultarNombreBodega } from '../../apis/ApiBodegas'
import { ConsultarProductos } from '../../apis/ApiProductos'

const RegisterUsuario = ({ Actualizar }) => {

    const [Id, setId] = useState("")
    const [productos, setProductos] = useState([])
    const [Accion, setAccion] = useState("")
    const [EstadoAlertAccion, setEstadoAlertAccion] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [TodosProductos, setTodosProductos] = useState([])
    const arreglo = []

    const Save = async (e) => {
        e.preventDefault();
        const producto = {
            _id: Id,
            productos: arreglo
        }
        const response = ActualizarBodega(producto)
        if (response !== undefined) {
            setAccion("agrego")
        }
        setEstadoAlertAccion(!EstadoAlertAccion)
    }

    useEffect(() => {

        if (productos != []) {
            setLoading(true)
        }

        if (Actualizar != undefined) {
            getIdBodega()
        }


    }, [])

    const getIdBodega = async () => {
        const response = ConsultarNombreBodega(Actualizar)

        response.then(datos => {
            datos.bodegas.forEach((item) => {
                setId(item._id)
                setProductos(item.productos);
                setLoading(false)
            })
        })

    }

    const getAllProductos = async () => {
        setLoading2(true)
        const response = ConsultarProductos()
        response.then(response => {
            setTodosProductos(response.products)
            setLoading2(false)
        })
    }


    return (
        <div>
            {loading ? (
                <div className='container-RegistroTercero3'>
                    <PantallaCarga>

                    </PantallaCarga>
                </div>
            ) : (
                <div className='container-RegistroTercero3'>
                    <h1 className='container-titulo-productos'>
                        Productos
                    </h1>
                    <div className='container-button-agregar'>
                        <button type="submit" className='button-agregar'>Traslado</button>
                    </div>
                    <div className='container-informacion'>
                        <table className='container-tabla'>
                            <tr>
                                <th>
                                    nombre
                                </th>
                                <th>
                                    tipoProducto
                                </th>
                                <th>
                                    unidadMedida
                                </th>
                                <th>
                                    valorUnitario
                                </th>
                                <th>
                                    Existencias
                                </th>
                                <th>
                                    porcentajeIva
                                </th>
                            </tr>
                            {productos.map((item) => (
                                <tr >
                                    <td>
                                        {item.nombre}
                                    </td>
                                    <td>
                                        {item.tipoProducto}
                                    </td>
                                    <td>
                                        {item.unidadMedida}
                                    </td>
                                    <td>
                                        {item.valorUnitario}
                                    </td>
                                    <td>
                                        {item.existencias}
                                    </td>
                                    <td>
                                        {item.porcentaje}
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            )}
            {EstadoAlertAccion &&
                <div className='container-Fondo'>
                    <div className='Container-Alert'>
                        <div className='Container-Alert-interno'>
                            <p className='Text-Alert'>
                                <span>Se {Accion} un producto o varios productos a bodega</span>
                                <button className='button-Alert' type="submit" onClick={() => {
                                    getIdBodega()
                                    setEstadoAlertAccion(!EstadoAlertAccion)
                                }}>Volver</button>
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RegisterUsuario