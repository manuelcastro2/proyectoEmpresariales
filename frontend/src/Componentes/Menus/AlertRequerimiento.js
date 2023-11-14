import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';

//funcion general
const AlertRequerimiento = () => {
    //metodo de navegacion
    const navigate = useNavigate()

    //funcion de navegacion
    function AlertSesion() {
        navigate('/')
    }
    
    //aqui es lo que lanzo para mmostrar en pantalla
    return (
        <div className='container-principal'>
            <form onSubmit={AlertSesion}>
                <div className='Container-Alert'>
                    <div className='Container-Alert-interno'>
                        <p className='Text-Alert'>
                            <p>ES REQUERIDO INICIAR SESION</p>
                            <button className='button-Alert' type="submit" >Volver</button>
                        </p>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default AlertRequerimiento