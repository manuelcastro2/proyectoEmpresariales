import React, { useState, useEffect } from 'react';
import './../../Estilos/EstiloMenu.css'
import { useNavigate, useLocation } from 'react-router-dom';
//las importaciones de los js
import Panel from './Barra'
import Banner from './Banner'
import AlertRequerimiento from './AlertRequerimiento';

// funcion general
const MenuPrincipal = () => {

    //metodo state para mandar datos al banner
    const { state } = useLocation();
    //estados de los datos del inicio de sesion y del estado de sesion
    const [DatosUsuario, setDatosUsuario] = useState("")
    const [EstadoSesion, SetEstadoSesion] = useState(false)

    //metodo de navegacion
    const navigate = useNavigate()

    //metodo useEffect hook de react
    //aqui valido si los datos state existen y el manejo de estdo de sesion
    useEffect(() => {
        if (state && state.DatosUsuario) {
            setDatosUsuario(state.DatosUsuario);
            console.log(DatosUsuario);
        } else {
            SetEstadoSesion(true)
        }
    }, [state]);

    //funcion donde manejo el mostrado diferentes atravez de los roles
    function menuRol() {
        if (DatosUsuario && DatosUsuario.rol) {
            if (DatosUsuario.rol == "administrador") {
                //boton donde me redireciono al menu de usuario
                //bototn donde me redireciono al menu de ventas(ese falta crear)
                //bototn donde me redireciono al menu de pedidos(ese falta crear)
                return (
                    <div>
                        <button onClick={() => {
                            navigate('/menu/usuario',
                                {
                                    state: {
                                        DatosUsuario: {
                                            nombre: DatosUsuario.nombre,
                                            apellido: DatosUsuario.apellido,
                                            rol: DatosUsuario.rol,
                                            id: DatosUsuario.id
                                        }
                                    }
                                }
                            )
                        }} className='button-ESTANDAR'>
                            <p className='text-PANEL'>Usuarios</p>
                        </button>
                    </div>
                )
            }
        }
    }

    //condicion para mostrar el alert de que falta iniciar sesion
    if (EstadoSesion) {
        return (
            <AlertRequerimiento />
        )
    } else {
        //el visualizado completo del menu
        //con el llamado al banner
        return (
            <div className='container-principal'>
                <div className='container-menu'>
                    <Banner DatosUsuario={DatosUsuario}>
                    </Banner>
                    <button className='button-ESTANDAR' onClick={() => {
                        navigate('/menu/factura',
                            {
                                state: {
                                    DatosUsuario: {
                                        nombre: DatosUsuario.nombre,
                                        apellido: DatosUsuario.apellido,
                                        rol: DatosUsuario.rol,
                                        id: DatosUsuario.id
                                    }
                                }
                            }
                        )
                    }}>
                        <p className='text-PANEL' >Facturas</p>
                    </button>
                    {menuRol()}
                    <button onClick={() => {
                        navigate('/menu/bodega',
                            {
                                state: {
                                    DatosUsuario: {
                                        nombre: DatosUsuario.nombre,
                                        apellido: DatosUsuario.apellido,
                                        rol: DatosUsuario.rol,
                                        id: DatosUsuario.id
                                    }
                                }
                            }
                        )
                    }} className='button-ESTANDAR'>
                        <p className='text-PANEL'>Bodegas</p>
                    </button>
                    <button onClick={() => {
                        //boton donde me redireciono al menu de producto
                        navigate('/menu/producto',
                            {
                                state: {
                                    DatosUsuario: {
                                        nombre: DatosUsuario.nombre,
                                        apellido: DatosUsuario.apellido,
                                        rol: DatosUsuario.rol
                                    }
                                }
                            }
                        )
                    }} className='button-ESTANDAR'>
                        <p className='text-PANEL'>Productos</p>
                    </button>
                    <button onClick={() => {
                        //boton donde me redireciono al menu de terceros
                        navigate('/menu/tercero',
                            {
                                state: {
                                    DatosUsuario: {
                                        nombre: DatosUsuario.nombre,
                                        apellido: DatosUsuario.apellido,
                                        rol: DatosUsuario.rol
                                    }
                                }
                            }
                        )
                    }} className='button-ESTANDAR'>
                        <p className='text-PANEL'>Terceros</p>
                    </button>
                    <button className='button-ESTANDAR' onClick={() => {
                        navigate('/menu/informes',
                            {
                                state: {
                                    DatosUsuario: {
                                        nombre: DatosUsuario.nombre,
                                        apellido: DatosUsuario.apellido,
                                        rol: DatosUsuario.rol,
                                        id: DatosUsuario.id
                                    }
                                }
                            }
                        )
                    }}>
                        <p className='text-PANEL' >Informes</p>
                    </button>
                </div>
                <div className='container-panel'>
                    <Panel panel="Panel"></Panel>
                    <div className='container-info'>
                    </div>
                </div>
            </div>
        )
    }
}



export default MenuPrincipal