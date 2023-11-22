import React, { useState, useEffect } from 'react';
import './../../Estilos/EstiloVisualizar.css'
import { ConsultarProductos, ActualizarProducto } from './../../apis/ApiProductos'
import { ConsultarTipoTercero } from './../../apis/ApiTerceros'
import { AgregarFacturas } from './../../apis/ApiFactura'
import { ActualizarBodega, ConsultarBodegas } from './../../apis/ApiBodegas'

const RegisterFacturas = ({ Datos }) => {

    const [typeBill, settypeBill] = useState("")
    const [nroFacturas, setNroFactura] = useState("")
    const [date, setDate] = useState("")
    const [terceros, setTeceros] = useState([])
    const [Idtercero, setIdTeceros] = useState("")
    const [bodegas, setBodegas] = useState([])
    const [IdBodegas, setIdBodegas] = useState("")
    const [productos, setProductos] = useState([])
    const [totalOperation, settotalOperation] = useState(0)
    const [count, setcount] = useState({})
    const [EstadoAlertAccion, setEstadoAlertAccion] = useState(false)
    const [ArrayProductos, setArrayProductos] = useState([])
    const [ArrayBodegas, setArrayBodegas] = useState([])
    const [EstadoAgregarProductos, setEstadoAgregarProductos] = useState(false)
    const [ProductosBodega, setProductosBodega] = useState([])

    const Save = (e) => {
        e.preventDefault();

        // Validación de datos
        if (!typeBill || !nroFacturas || !date || !Idtercero || ArrayProductos.length === 0) {
            console.error("Por favor, complete todos los campos obligatorios.");
            // Puedes mostrar un mensaje al usuario indicando que algunos campos son obligatorios
            return;
        }
        const factura = {
            tipoFactura: typeBill,
            nroFactura: nroFacturas,
            totalOperacion: totalOperation,
            fecha: date,
            bodega: IdBodegas,
            tercero: Idtercero,
            elementos: ArrayProductos
        }
        const response = AgregarFacturas(factura).then(() => {
            const selectTipoFactura = document.getElementById("SelectTipoFactura")
            const selectTercero = document.getElementById("SelectTercero")
            const selectBodega = document.getElementById("SelectBodega")
            selectTipoFactura.selectedIndex = 0
            selectTercero.selectedIndex = 0
            selectBodega.selectedIndex = 0
            setNroFactura("")
            setDate("")
            settotalOperation("")
            setArrayProductos([])
        })

        ArrayProductos.forEach((item) => {
            ActualizarProducto({
                codigoProducto: item.codigoProducto,
                existencias: item.existencias
            })
        })
        let BodegasAgregar = {
            id: IdBodegas.id,
            productos: []
        }
        if (typeBill === "FacturaCompra") {
            const nuevosProductos = [];
            const ProductosActualizar = []
            ArrayBodegas.forEach((item1) => {
                const existeEnBodega = ProductosBodega.some((item2) => item1.codigoProducto === item2.codigoProducto);

                if (existeEnBodega) {
                    ProductosActualizar.push(item1)
                } else {
                    nuevosProductos.push(item1);
                }
            });

            BodegasAgregar = {
                id: IdBodegas.id,
                productos: [...ProductosActualizar, ...nuevosProductos]
            };
        } else {
            const productosEnBodega = ArrayProductos.filter((item1) =>
                ProductosBodega.some((item2) => item1.codigoProducto === item2.codigoProducto)
            );
            BodegasAgregar = {
                id: IdBodegas.id,
                productos: productosEnBodega
            };
        }
        console.log(BodegasAgregar);
        ActualizarBodega(BodegasAgregar).then(datos => {
            console.log(datos);
        }).catch(daatos => console.log(daatos))
        setEstadoAlertAccion(!EstadoAlertAccion);

    }

    useEffect(() => {
        BodegasAll()
        ProductosAll()
        TercerosAll()
        let total = 0;
        ArrayProductos.forEach((item) => {
            total += item.ValorProducto || 0;
        });
        if (total !== totalOperation) {
            settotalOperation(total);
        }
    }, [ArrayProductos, totalOperation])

    const TercerosAll = () => {
        if (typeBill == "FacturaVenta") {
            const response = ConsultarTipoTercero("cliente")
            response.then(datos => {
                setTeceros(datos.thirds)
            })
        } else if (typeBill == "FacturaCompra") {
            const response = ConsultarTipoTercero("proveedor")
            response.then(datos => {
                setTeceros(datos.thirds)
            })
        }
    }
    const ProductosAll = () => {
        const response = ConsultarProductos()
        response.then(datos => {
            setProductos(datos.products)
        })
    }

    const BodegasAll = () => {
        const Response = ConsultarBodegas()
        Response.then(datos => {
            setBodegas(datos.bodegas)
        })
    }

    const handleInputChange = (productId, value) => {
        setcount((prevent) => ({
            ...prevent,
            [productId]: value,
        }))
    };

    const handleCheckboxChange = (productId) => {
        const selectedProduct = productos.find(product => product._id === productId);
        if (selectedProduct) {
            if (typeBill === "FacturaVenta") {
                setArrayProductos(prevArray => [
                    ...prevArray,
                    {
                        codigoProducto: selectedProduct.codigoProducto,
                        tipoProducto: selectedProduct.tipoProducto,
                        nombre: selectedProduct.nombre,
                        unidadMedida: selectedProduct.unidadMedida,
                        cantidad: Number(count[productId]) || 0,
                        existencias: selectedProduct.existencias - Number(count[productId]),
                        valorUnitario: Number(selectedProduct.valorUnitario),
                        porcentaje: selectedProduct.porcentaje,
                        ValorProducto: Number(count[productId] * (selectedProduct.valorUnitario + (selectedProduct.valorUnitario * selectedProduct.porcentaje)))
                    }
                ]);
                setArrayBodegas(prevArray => [
                    ...prevArray,
                    {
                        codigoProducto: selectedProduct.codigoProducto,
                        tipoProducto: selectedProduct.tipoProducto,
                        nombre: selectedProduct.nombre,
                        unidadMedida: selectedProduct.unidadMedida,
                        existencias: Number(count[productId]),
                        valorUnitario: Number(selectedProduct.valorUnitario),
                        porcentaje: selectedProduct.porcentaje,
                        ValorProducto: Number(count[productId] * (selectedProduct.valorUnitario + (selectedProduct.valorUnitario * selectedProduct.porcentaje)))
                    }
                ]);
            } else {
                setArrayProductos(prevArray => [
                    ...prevArray,
                    {
                        codigoProducto: selectedProduct.codigoProducto,
                        nombre: selectedProduct.nombre,
                        tipoProducto: selectedProduct.tipoProducto,
                        unidadMedida: selectedProduct.unidadMedida,
                        cantidad: Number(count[productId]) || 0,
                        existencias: selectedProduct.existencias + Number(count[productId]),
                        valorUnitario: Number(selectedProduct.valorUnitario),
                        porcentaje: selectedProduct.porcentaje,
                        ValorProducto: Number(count[productId] * (selectedProduct.valorUnitario + (selectedProduct.valorUnitario * selectedProduct.porcentaje)))
                    }
                ]);
                setArrayBodegas(prevArray => [
                    ...prevArray,
                    {
                        codigoProducto: selectedProduct.codigoProducto,
                        tipoProducto: selectedProduct.tipoProducto,
                        nombre: selectedProduct.nombre,
                        unidadMedida: selectedProduct.unidadMedida,
                        existencias: Number(count[productId]) + selectedProduct.existencias,
                        valorUnitario: Number(selectedProduct.valorUnitario),
                        porcentaje: selectedProduct.porcentaje,
                        ValorProducto: Number(count[productId] * (selectedProduct.valorUnitario + (selectedProduct.valorUnitario * selectedProduct.porcentaje)))
                    }
                ]);
            }
        }
        terceros.forEach((item) => {
            if (item._id === Idtercero) {
                setIdTeceros({
                    nombre: item.nombre,
                    tipoTercero: item.tipoTercero,
                    documento: item.documento,
                    direccion: item.direccion,
                    telefono: item.telefono
                })
            }
        })

        bodegas.forEach((item) => {
            if (item._id === IdBodegas) {
                setIdBodegas({
                    id: item._id,
                    nombre: item.nombre,
                    direccion: item.direccion
                })
                setProductosBodega(item.productos)
            }
        })
    };

    return (
        <div className='container-RegistroTercero4'>
            <h1 className='container-titulo'>
                Registrar factura venta
            </h1>
            <div className='container-interno-Tercero4 field'>
                <div className='container-Input'>
                    <select className='Input-text'
                        value={typeBill}
                        id='SelectTipoFactura'
                        onClick={TercerosAll}
                        onChange={(e) => {
                            settypeBill(e.target.value)
                        }}
                    >
                        <option value="">Seleccione una opcion</option>
                        {Datos.rol === "ventas" || Datos.rol == "administrador" ? (
                            <option value="FacturaVenta">Factura venta</option>
                        ) : (
                            <div>

                            </div>
                        )}
                        {Datos.rol === "administrador" || Datos.rol == "bodegas" ? (
                            <option value="FacturaCompra">Factura compra</option>
                        ) : (
                            <div>

                            </div>
                        )}
                    </select>
                    <label className='label-tercero' for="">Tipo Factura</label>
                </div>
                <div className='container-Input'>
                    <input className='Input-text' type="text"
                        name="nroFactura"
                        placeholder='nroFactura'
                        id='nroFactura'
                        value={nroFacturas}
                        onChange={(e) => setNroFactura(e.target.value)} />
                    <label className='label-tercero' for="">Nro.Facturas</label>
                </div>
                <div className='container-Input'>
                    <input className='Input-text' type="date"
                        name="date"
                        placeholder='date'
                        id='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)} />
                    <label className='label-tercero' for="">Date</label>
                </div>
                <div className='container-Input'>
                    <select className=' Input-text'
                        id='SelectBodega'
                        onChange={(e) => {
                            setIdBodegas(e.target.value);
                        }}>
                        <option value="">Selecion una opcion</option>
                        {bodegas.map((items) => (
                            <option value={items._id}>{items.nombre}</option>
                        ))}
                    </select>
                    <label className='label-tercero' for="">Bodegas</label>
                </div>
                <div className='container-Input'>
                    <select className=' Input-text'
                        id='SelectTercero'
                        onChange={(e) => {
                            setIdTeceros(e.target.value)
                        }}>
                        <option value="">Selecion una opcion</option>
                        {terceros.map((items) => (
                            <option value={items._id}>{items.tipoTercero}: {items.nombre}</option>
                        ))}
                    </select>
                    <label className='label-tercero' for="">Tercero</label>
                </div>
                <div className='container-elementos'>
                    <div className='container-agregar'>
                        <label for="">Elementos</label>
                        <button type="submit"
                            className='Button-acciones'
                            onClick={() => setEstadoAgregarProductos(!EstadoAgregarProductos)}>
                            +
                        </button>
                    </div>
                    <div className='container-vista-producto'>
                        {ArrayProductos.map((item) => (
                            <div className='vista-producto'>
                                <div className='caja-elemento1'>
                                    {item.nombre}
                                </div>
                                <div className='caja-elemento2'>
                                    {item.unidadMedida}
                                </div>
                                <div className='caja-elemento3'>
                                    {item.cantidad}
                                </div>
                                <div className='caja-elemento4'>
                                    ${item.valorUnitario}
                                </div>
                                <div className='caja-elemento4'>
                                    ${item.ValorProducto}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='container-Input'>
                    <input className='Input-text' type="text"
                        name="nroFactura"
                        placeholder='nroFactura'
                        id='nroFactura'
                        value={totalOperation}
                        onChange={(e) => settotalOperation(e.target.value)} disabled />
                    <label className='label-tercero' for="">Total factura</label>
                </div>
                <div className='container-Input'>
                    <button className='Button-Entrar' type="submit"
                        onClick={Save}>Enviar</button>
                </div>
            </div>
            {EstadoAlertAccion &&
                <div className='container-Fondo'>
                    <div className='Container-Alert'>
                        <div className='Container-Alert-interno'>
                            <p className='Text-Alert'>
                                <span>Se genero factura</span>
                                <button className='button-Alert' type="submit" onClick={() => setEstadoAlertAccion(!EstadoAlertAccion)}>Volver</button>
                            </p>
                        </div>
                    </div>
                </div>
            }
            {EstadoAgregarProductos &&
                <div className='container-Fondo'>
                    <div className='container-RegistroTercero3'>
                        <button type="submit"
                            className='Button-Exit3'
                            onClick={() => setEstadoAgregarProductos(!EstadoAgregarProductos)}>X</button>
                        <div className='container-informe-agregar'>
                            <h1>Agregar Producto</h1>
                            <div className='caja-lista'>
                                {productos.map((item) => (
                                    <div className='listaProductos'>
                                        <div>
                                            Producto: {item.nombre}
                                        </div>
                                        <div>
                                            {item.unidadMedida}
                                        </div>
                                        <input type="text"
                                            key={item}
                                            id={item._id}
                                            value={count[item._id]}
                                            placeholder='cantidad'
                                            onChange={(e) => handleInputChange(item._id, e.target.value)}
                                            className='Input-texto' />
                                        <div>
                                            {item.valorUnitario}
                                        </div>
                                        <input type="checkbox"
                                            onChange={() => handleCheckboxChange(item._id)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='caja-button-agregar'>
                            <button type="submit"
                                className='Button-acciones'
                                onClick={() => {
                                    setEstadoAgregarProductos(!EstadoAgregarProductos)
                                }}
                            >agregar</button>
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}

export default RegisterFacturas