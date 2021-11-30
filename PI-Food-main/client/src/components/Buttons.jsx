import React, { useEffect, useState } from 'react'
import {AiOutlineReload} from 'react-icons/ai'
import {SiBetfair} from 'react-icons/si'
import {IoOptions} from 'react-icons/io5'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

export function Buttons() {
    const [dietas, setDietas] = useState();
    const [option, setOption] = useState({value: ''});
    const [mayor, setMayor] = useState(true)

    useEffect(() => {
        if(!dietas) {
            axios.get('http://localhost:3001/types')
                .then(response => {
                    setDietas(response.data);
                    // console.log(dietas);
            });

        }
    },[dietas])

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
                type: 'GET_RECIPES',
                payload: state.original
            })
            const order = state.recipes.sort(function(a, b){return (a.spoonacularScore || a.score) - (b.spoonacularScore || b.score)});
            dispatch({
                type: 'GET_RECIPES',
                payload: order
            });
            setMayor(!mayor)
        } else {
            dispatch({
                type: 'GET_RECIPES',
                payload: state.original
            })
            const order = state.recipes.sort(function(a, b){return (a.spoonacularScore || a.score) - (b.spoonacularScore || b.score)}).reverse();
            console.log(order);
            dispatch({
                type: 'GET_RECIPES',
                payload: order
            });
            setMayor(!mayor)
        }
    }
    
    function handleOnRestart() {
        
        
        dispatch({
            type: 'GET_RECIPES',
            payload: state.original
        })
    }

    return (
        <>
            <div>
                <IoOptions/>
                Tipo de dieta
                <select value={option.value} onChange={handleOnChange} name="diets">
                    {dietas && dietas.map(diet => {
                        return (
                            <option id={diet.name || diet}>{diet.name || diet}</option>
                        )
                    })}
                </select>
            </div>

            <button onClick={handleOnOrder}>
                <SiBetfair/>
                <br/>
                Ordenar
            </button>

            <button onClick={handleOnRestart}>
                <AiOutlineReload/>
                <br/>
                Restablecer
            </button>
        </>
    )
}