import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ActualizarProducto, AgregarProductos, ConsultarCodigoProducto } from './../../apis/ApiProductos'
//para invocar al backend en la parte de productos

const RegisterProducto = ({ Actualizar }) => {

    //los diferentes estados
    const [Id, setId] = useState("")
    const [codeProduct, setCodeProduct] = useState("")
    const [product, setProduct] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [tipoProducto, setTipoProducto] = useState("")
    const [unidad, setUnidad] = useState("")
    const [valorUnitario, setValorUnitario] = useState(0)
    const [porcentajeIva, setPorcentajeIva] = useState(0)
    const [Accion, setAccion] = useState("")
    const [EstadoAlertAccion, setEstadoAlertAccion] = useState(false)

    //funcion de guardado y actualizar con una condicion
    //para hacer funcionar la condicion se recibe de los menus para asi poder consultar al producto y asi
    //las acciones del usuario para crear o actualizar un producto
    const Save = async (e) => {
        e.preventDefault();
        const producto = {
            codigoProducto: codeProduct,
            nombre: product,
            descripcion: descripcion,
            tipoProducto: tipoProducto,
            unidadMedida: unidad,
            existencias: 0,
            valorUnitario: valorUnitario,
            porcentaje: porcentajeIva
        }
        if (Actualizar === undefined) {
            const response = AgregarProductos(producto)
            if (response !== undefined) {
                setAccion("guardo")
                setCodeProduct("")
                setProduct("")
                setDescripcion("")
                setTipoProducto("")
                setUnidad("")
                setValorUnitario("")
                setPorcentajeIva("")
            }
        } else {
            const response = ActualizarProducto(producto)
            if (response !== undefined) {
                setCodeProduct("")
                setProduct("")
                setDescripcion("")
                setTipoProducto("")
                setUnidad("")
                setValorUnitario("")
                setPorcentajeIva("")
                setAccion("actualizo")
            }

            setEstadoAlertAccion(!EstadoAlertAccion)
        }

    }

    //metodo de consulta de un solo producto para asi hacer la actualizacion
    useEffect(() => {
        if (Actualizar != undefined) {
            const getIdProducto = async () => {
                const response = ConsultarCodigoProducto(Actualizar)
                response.then(response => {
                    response.products.forEach((item) => {
                        setId(item._id)
                        setCodeProduct(item.codigoProducto)
                        setDescripcion(item.descripcion)
                        setProduct(item.nombre)
                        setTipoProducto(item.tipoProducto)
                        setUnidad(item.unidadMedida)
                        setPorcentajeIva(item.porcentaje)
                        setValorUnitario(item.valorUnitario)
                    })
                })

            }
            getIdProducto()
        }
        console.log(Actualizar);
    }, [])

    //lo que muestro en la pantalla
    return (
        <div className='container-RegistroTercero'>
            <h1 className='container-titulo'>
                Registrar producto
            </h1>
            <form onSubmit={Save}>
                <div className='container-interno-Tercero field'>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="codigoProducto"
                            placeholder='Codigo producto'
                            id='codigoProducto'
                            value={codeProduct}
                            onChange={(e) => setCodeProduct(e.target.value)} />
                        <label className='label-tercero' for="">Codigo producto</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="producto"
                            placeholder='Producto'
                            id='producto'
                            value={product}
                            onChange={(e) => setProduct(e.target.value)} />
                        <label className='label-tercero' for="">Producto</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="descripcion"
                            placeholder='Descripcion'
                            id='descripcion'
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)} />
                        <label className='label-tercero' for="">Descripcion</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="tipoProducto"
                            placeholder='Tipo producto'
                            id='tipoProducto'
                            value={tipoProducto}
                            onChange={(e) => setTipoProducto(e.target.value)} />
                        <label className='label-tercero' for="">Tipo producto</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="tipoUnidad"
                            placeholder='Tipo unidad'
                            id='tipoUnidad'
                            value={unidad}
                            onChange={(e) => setUnidad(e.target.value)} />
                        <label className='label-tercero' for="">Tipo Unidad</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="valorUnnitario"
                            placeholder='Valor unitario'
                            id='valorUnnitario'
                            value={valorUnitario}
                            onChange={(e) => setValorUnitario(e.target.value)} />
                        <label className='label-tercero' for="">Valor unitario</label>
                    </div>
                    <div className='container-Input'>
                        <input className='Input-text' type="text"
                            name="porcentajeIva"
                            placeholder='porcentajeIva'
                            id='porcentajeIva'
                            value={porcentajeIva}
                            onChange={(e) => setPorcentajeIva(e.target.value)} />
                        <label className='label-tercero' for="">Porcentaje IVA</label>
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
                                <span>Se {Accion} al producto</span>
                                <button className='button-Alert' type="submit" onClick={() => setEstadoAlertAccion(!EstadoAlertAccion)}>Volver</button>
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RegisterProducto