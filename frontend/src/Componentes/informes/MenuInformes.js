import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { GenerarInforme } from './../general/GenerarFacturas';
import Banner from './../general/Banner'
import Panel from './../general/Barra'
import AlertRequerimiento from './../general/AlertRequerimiento';
import { ConsultaPorRango } from '../../apis/ApiFactura'

function MenuInformes() {

    const [EstadoSesion, SetEstadoSesion] = useState(false)
    const [DatosUsuario, setDatosUsuario] = useState("")
    const [fechaIncial, setFechaInicial] = useState([""])
    const [fechaFinal, setFechaFinal] = useState("")
    const [valoresInforme, setValoresInforme] = useState([])

    const { state } = useLocation();

    useEffect(() => {
        if (state && state.DatosUsuario) {
            setDatosUsuario(state.DatosUsuario);
        } else {
            SetEstadoSesion(true)
        }
    }, []);

    const CalcularInforme = async () => {
        if (fechaFinal != "" && fechaIncial != "") {
            ConsultaPorRango(fechaIncial, fechaFinal).then(datos => {
                let valorTotalCompra = 0
                let valorTotalVenta = 0
                let margen = 0
                let porcentaje = 0
                datos.facturas.forEach((item) => {
                    if (item.tipoFactura === "FacturaCompra") {
                        valorTotalCompra += item.totalOperacion
                    } else {
                        valorTotalVenta += item.totalOperacion
                    }
                })
                margen = valorTotalVenta - valorTotalCompra
                porcentaje = margen / valorTotalVenta
                setValoresInforme(preVenta => [
                    ...preVenta,
                    {
                        fechaIncial: fechaIncial,
                        fechaFinal: fechaFinal,
                        valorVenta: valorTotalVenta,
                        valorCompra: valorTotalCompra,
                        margen: margen,
                        porcentaje: (porcentaje * 100).toFixed(2)
                    }
                ])
            }).catch(error => {
                console.error(error);
            })
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
                    <button onClick={() => CalcularInforme()} className='button-Agregar' type="submit"><p className='text-PANEL'>Generar Informe</p></button>
                </div>
                <div className='container-panel'>
                    <Panel panel="Informe de ventas"></Panel>
                    <div className='container-info'>
                        <div className='container-listado'>
                            <div className='container-rango'>
                                <div className='container-fechas'>
                                    <div className='container-input-fechas'>
                                        <input className='Input-text'
                                            type="date"
                                            name="fechainicial"
                                            value={fechaIncial}
                                            onChange={(e) => setFechaInicial(e.target.value)} />
                                        <label className='label-tercero' for="">Fecha inicial</label>
                                    </div>
                                    <div className='container-input-fechas'>
                                        <input className='Input-text'
                                            type="date"
                                            name="fechafinal"
                                            value={fechaFinal}
                                            onChange={(e) => setFechaFinal(e.target.value)} />
                                        <label className='label-tercero' for="">Fecha inicial</label>
                                    </div>
                                    <div className='container-input-fechas'>
                                        <button
                                            className='Button-acciones'
                                            type="submit"
                                            onClick={() => { GenerarInforme(valoresInforme) }}
                                        >Generar pdf informe</button>
                                    </div>
                                </div>
                                <div className='container-informe'>
                                    <table className='tabla-informe'>
                                        <thead className='thead-informe'>
                                            <td className='td-informe'>
                                                Venta
                                            </td>
                                            <td className='td-informe'>
                                                Costo de venta
                                            </td>
                                            <td className='td-informe'>
                                                Margen de utilidad
                                            </td>
                                            <td className='td-informe'>
                                                Porcentaje
                                            </td>
                                        </thead>
                                        <tbody>
                                            {valoresInforme.map((item) => (
                                                <tr>
                                                    <td className='td-valor'>
                                                        ${item.valorVenta}
                                                    </td>
                                                    <td className='td-valor'>
                                                        ${item.valorCompra}
                                                    </td>
                                                    <td className='td-valor'>
                                                        ${item.margen}
                                                    </td>
                                                    <td className='td-valor'>
                                                        {item.porcentaje}%
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuInformes
