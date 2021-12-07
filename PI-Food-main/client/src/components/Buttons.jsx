import React, { useEffect, useState } from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import { SiBetfair } from 'react-icons/si'
import { IoOptions } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Diets } from './Diets'
import buttonsStyle from './styles/Button.module.css'

export function Buttons() {
    const [dietas, setDietas] = useState(false);
    const [option, setOption] = useState({ value: '' });
    const [mayor, setMayor] = useState(true)

    useEffect(() => {




    }, [])

    function handleOnChange(e) {
        setOption({
            ...option,
            value: e.target.value
        });
    }

    const dispatch = useDispatch();
    const state = useSelector(state => state);

    function handleOnOrder() {
        if (mayor) {
            dispatch({
                type: 'GET_ORDER_UP',
                payload: [...state.showedData]
            })

            setMayor(!mayor)
        } else {
            dispatch({
                type: 'GET_ORDER_DOWN',
                payload: [...state.showedData]
            })

            setMayor(!mayor)
        }
    }

    function handleOnRestart() {
        dispatch({
            type: 'RESTART',
            payload: [...state.recipes]
        })
    }

    function handleOnOrderAlf() {
        if (mayor) {
            dispatch({
                type: 'GET_ORDER_UP_ALF',
                payload: [...state.showedData]
            })

            setMayor(!mayor)
        } else {
            dispatch({
                type: 'GET_ORDER_DOWN_ALF',
                payload: [...state.showedData]
            })

            setMayor(!mayor)
        }
    }

    function handleOnClickFiltroDietas() {
        setDietas(!dietas);
    }

    return (
        <div className={buttonsStyle.contenedor}>
            <div className={buttonsStyle.buttonDiet}>
                <IoOptions />
                <br />
                <button className={buttonsStyle.buttonDietFilter} onClick={handleOnClickFiltroDietas}>
                    Dietas
                </button>
                {dietas && <Diets />}
            </div>

            <div className={buttonsStyle.contenedorBotones}>
                <div>
                    <SiBetfair />

                    {/* <h5 className={buttonsStyle.tituloH5}>Ordenar por:</h5> */}
                </div>

                <div className={buttonsStyle.contenedorBotonesSort}>

                    <Link to='/home/1'>
                        <button className={buttonsStyle.buttonSort} onClick={handleOnOrder}>
                            Score
                        </button>
                    </Link>

                    <br />

                    <Link to='/home/1'>
                        <button className={buttonsStyle.buttonSort} onClick={handleOnOrderAlf}>
                            Nombre
                        </button>
                    </Link>
                </div>
            </div>

            <div className={buttonsStyle.contenedorRestart}>
                <AiOutlineReload />

                <Link to='/home/1'>
                    <button className={buttonsStyle.restartButton} onClick={handleOnRestart}>
                        Restablecer
                    </button>
                </Link>
            </div>
        </div>
    )
}