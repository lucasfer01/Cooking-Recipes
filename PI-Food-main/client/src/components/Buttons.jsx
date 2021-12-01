import React, { useEffect, useState } from 'react'
import {AiOutlineReload} from 'react-icons/ai'
import {SiBetfair} from 'react-icons/si'
import {IoOptions} from 'react-icons/io5'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Diets } from './Diets'

export function Buttons() {
    const [dietas, setDietas] = useState(false);
    const [option, setOption] = useState({value: ''});
    const [mayor, setMayor] = useState(true)

    useEffect(() => {
        
            

        
    },[])

    function handleOnChange(e) {
        setOption({
            ...option,
            value: e.target.value
        });
    }
    
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    
    function handleOnOrder() {
        if(mayor) {
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
        if(mayor) {
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
        <>
            <div>
                <IoOptions/>
                <br/>
                <button onClick={handleOnClickFiltroDietas}>
                    filtras por dietas
                </button>
                {dietas && <Diets/>}
            </div>

            <Link to='/home/1'>
                    <SiBetfair/>
                    <br/>
                <button onClick={handleOnOrder}>
                    Ordenar por score
                </button>
                    <br/>
                <button onClick={handleOnOrderAlf}>
                    Ordenar alfabeticamente
                </button>

                
            </Link>

            <Link to='/home/1'>
                <button onClick={handleOnRestart}>
                    <AiOutlineReload/>
                    <br/>
                    Restablecer
                </button>
            </Link>
        </>
    )
}