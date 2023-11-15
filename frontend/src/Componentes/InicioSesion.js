import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './../Estilos/InicioSesion.css'
import './../Estilos/EstiloRegistroTercero.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList, faCircleRight } from '@fortawesome/free-regular-svg-icons'
import PantallaCarga from './Menus/PantallaCarga';

const endpoint = 'http://localhost:3333/usuarios'

function SingUp() {

    const [cedula, setCedula] = useState('')
    const [clave, setClave] = useState('')
    const [loading, setLoading] = useState(false)
    const [FalloSesion, setFalloSesion] = useState(false)

    const navigate = useNavigate()

    const Datos = async () => {
        if (cedula != '' && clave != '') {
            setLoading(true)
            console.log(clave);
            console.log(cedula);
            await axios.get(`${endpoint}/inicio/${cedula}/${clave}`).then(datos => {
                setLoading(false)
                datos.data.users.forEach((item) => {
                    navigate('/menu', {
                        state: {
                            DatosUsuario: {
                                nombre: item.nombre,
                                apellido: item.apellido,
                                rol: item.rol,
                                id: item._id
                            }
                        }
                    })
                })
            })
        } else {
            setFalloSesion(true)
        }
    }

    const recibiendoCedula = (event) => {
        setCedula(event.target.value)
    }

    const recibiendoClave = (event) => {
        setClave(event.target.value)
    }

    const MandarDatos = (event) => {
        event.preventDefault();
        Datos()
    }


    if (loading) {
        return (
            <div className='container-principal'>
                <PantallaCarga />
            </div>
        )
    } else {
        return (
            <div>
                <form onSubmit={MandarDatos}>
                    <div className='container-Inicio'>
                        <h1>INVCONTROL</h1>
                        <div className='container-Inputs'>
                            <FontAwesomeIcon className='icon' icon={faRectangleList} />
                            <div className='container-Input'>
                                <input type="text"
                                    className='Input-text'
                                    name="cedula"
                                    placeholder='Cedula'
                                    id='cedula'
                                    value={cedula}
                                    onChange={recibiendoCedula} />
                                <label className='label-tercero' for="">Cedula</label>
                            </div>
                            <div className='container-Input Input-center'>
                                <input type="password"
                                    className='Input-text'
                                    name="clave"
                                    placeholder='Clave'
                                    id='clave'
                                    value={clave}
                                    onChange={recibiendoClave} />
                                <label className='label-tercero' for="">Clave</label>
                            </div>
                        </div>
                        <button className='Button-Entrar' type="submit">
                            <FontAwesomeIcon className='icon-Next' icon={faCircleRight} />
                        </button>
                    </div>
                </form>
                {FalloSesion &&
                    <div className='container-Fondo'>
                        <div className='Container-Alert'>
                            <div className='Container-Alert-interno'>
                                <p className='Text-Alert'>
                                    <p>Sesion no iniciada, clave o usuario incorrectos</p>
                                    <button className='button-Alert' type="submit" onClick={() => {
                                        setFalloSesion(false)
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

export default SingUp