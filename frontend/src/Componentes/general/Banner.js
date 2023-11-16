import React, { useState, useEffect } from 'react';
import './../../Estilos/EstiloMenu.css'
import { useNavigate, useLocation } from 'react-router-dom';

//funcion general donde pido un paramentro
const Banner = ({ DatosUsuario }) => {
    //metodo de navegacion
    const navigate = useNavigate()
    //Estado de la recolecion de datos mandados por el js de inicio de sesion
    const [Datos, setDatos] = useState("")
    useEffect(() => {
        setDatos(DatosUsuario)
    });

    //lo que voy a mostrar en pantalla
    //el boton tiene un metodo donde me va a reirecionar al menu principal
    // y tiene un json donde me trae los datos para despues volverlos a resibir
    return (
        <div>
            <div className='banner-bienvenido'>
                <p className='text-bienvenido'>BIENVENIDO</p>
                <p>{Datos.nombre + ' ' + Datos.apellido}</p>
                <p>{Datos.rol}</p>
            </div>
            <button onClick={() => {
                navigate('/menu',
                    {
                        state: {
                            DatosUsuario: {
                                nombre: Datos.nombre,
                                apellido: Datos.apellido,
                                rol: Datos.rol
                            }
                        }
                    }
                )
            }} className='button-INICIO'>
                INICIO
            </button>
        </div>

    )

}

export default Banner;