import React, { useState } from 'react';
import './../../Estilos/EstiloMenu.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

//funcion general pidiendo un dato para despues mostrarlo
const Barra = ({panel}) => {

    //metodo de navegacion
    const navigate = useNavigate()
    const [Cerrar, SetCerrar] = useState(false)

    //funcion para cerrar el alert de cerro sesion
    function CerrarSesion() {
        SetCerrar(!Cerrar)
    }

    //redirecionamiento hacia inicio de sesion
    function Salir() {
        navigate('/')
    }

    //aqui lanzo lo que voy a mostrar en pantalla
    return (
        <div>
            <div className='panel-barra'>
                <p className='text-PANEL'>{panel}</p>
                <div className='Panel-Opciones'>
                    <button type="submit" onClick={CerrarSesion}>
                        <FontAwesomeIcon className='Icon-Salir' icon={faArrowAltCircleLeft} />
                    </button>
                </div>
            </div>
            {Cerrar && <div>
                <form onSubmit={Salir}>
                    <div className='container-Fondo'>
                        <div className='Container-Alert'>
                            <div className='Container-Alert-interno'>
                                <p className='Text-Alert'>
                                    <p>SE CERRO LA SESION</p>
                                    <button className='button-Alert' type="submit" >Volver</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>}
        </div>
    )
}

export default Barra