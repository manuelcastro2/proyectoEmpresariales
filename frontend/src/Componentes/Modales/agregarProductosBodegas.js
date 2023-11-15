import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../../Estilos/EstiloVisualizar.css'
import PantallaCarga from './../Menus/PantallaCarga';

const endpoint = 'http://localhost:3333/bodegas/'
const endpoint2 = 'http://localhost:3333/productos/'

const RegisterUsuario = ({ Actualizar }) => {

    const [Id, setId] = useState("")
    const [productos, setProductos] = useState([])
    const [Accion, setAccion] = useState("")
    const [EstadoAlertAccion, setEstadoAlertAccion] = useState(false)
    const [EstadoAlertAgregarProducto, setEstadoAlertAgregarProducto] = useState(false)
    const [loading, setLoading] = useState(false)
    const [TodosProductos, setTodosProductos] = useState([])
    const arreglo = []

    const Save = async (e) => {
        e.preventDefault();
        const response = await axios.patch(endpoint, {
            _id: Id,
            productos: arreglo
        })
        if (response.data !== undefined) {
            setAccion("agrego")
        }
        setEstadoAlertAccion(!EstadoAlertAccion)
    }

    useEffect(() => {
        if (Actualizar != undefined) {
            getIdBodega()
        }

    }, [])

    const getIdBodega = async () => {
        await axios.get(`${endpoint}${Actualizar}`).then(response => {
            response.data.bodegas.forEach((item) => {
                setId(item._id)
                setProductos(item.productos);
            })
        })

    }

    const getAllProductos = async () => {
        await axios.get(endpoint2).then(response => {
            setTodosProductos(response.data.products)
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
                    <h1 className='container-titulo'>
                        Productos
                    </h1>
                    <div className='container-button-agregar'>
                        <button type="submit" className='button-agregar'>Traslado</button>
                        <button type="submit"
                            className='button-agregar'
                            onClick={() => {
                                setEstadoAlertAgregarProducto(!EstadoAlertAgregarProducto)
                                getAllProductos()
                            }}>Agregar</button>
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
                                        {item.Existencias}
                                    </td>
                                    <td>
                                        {item.PorcentajeIva}
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            )}
            {EstadoAlertAgregarProducto &&
                <div className='container-Fondo'>
                    <div className='container-RegistroTercero3'>
                        <button type="submit"
                            className='Button-Exit3'
                            onClick={() => {
                                getIdBodega()
                                setEstadoAlertAgregarProducto(!EstadoAlertAgregarProducto)
                            }}>X</button>
                        <h1 id='titulo-producto'>
                            Agregar productos
                        </h1>
                        <form onSubmit={Save}>
                            <div className='container-informacion'>
                                {TodosProductos.map((item) => (
                                    <div className='container-productos'>
                                        <div className='caja-producto'>
                                            <div className='container-codigo'>
                                                <input type="text" name="" value={item.codigoProducto} disabled />
                                            </div>
                                            <div className='container-nombre'>
                                                {item.nombre}
                                            </div>
                                        </div>
                                        <div className='caja-contenido'>
                                            <div className='caja-elemento'>
                                                Tipo: {item.tipoProducto}
                                            </div>
                                            <div className='caja-elemento'>
                                                Unidad medida:{item.unidadMedida}
                                            </div>
                                            <div className='caja-elemento'>
                                                Valor unitario{item.valorUnitario}
                                            </div>
                                            <div className='caja-elemento'>
                                                Existencias: {item.existencias}
                                            </div>
                                            <div className='caja-elemento'>
                                                <label for=""><input type="checkbox" onChange={() => {
                                                    arreglo.push({
                                                        codigo: item.codigoProducto,
                                                        nombre: item.nombre,
                                                        tipoProducto: item.tipoProducto,
                                                        unidadMedida: item.unidadMedida,
                                                        valorUnitario: item.valorUnitario,
                                                        Existencias: item.existencias,
                                                        PorcentajeIva: item.porcentaje
                                                    })
                                                }} />Agregar</label>
                                            </div>
                                        </div>
                                    </div>
                                )
                                )
                                }
                            </div>
                            <button className='Button-acciones' type="submit">Agregar</button>
                        </form>
                    </div>
                </div>
            }
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