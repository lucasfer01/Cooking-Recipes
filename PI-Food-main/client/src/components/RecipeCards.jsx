import React, { useEffect } from 'react'
import RecipeCardsStyle from './styles/RecipeCards.module.css'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'
import axios from 'axios'
import { Card } from './Card';


export function RecipeCards() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    useEffect(() => {
        state.showedData && axios.get('http://localhost:3001/recipes')
            .then(res => {
                console.log('paso axios');
                dispatch({
                    type: 'GET_RECIPES',
                    payload: res.data
                })
            });
    },[])


    const { id } = useParams();
    // console.log('state',state.showedData.slice(((id-1) * 9), (((id-1) * 9) + 9)));

    return (
        <div id={id - 1} className={RecipeCardsStyle.container}>
            {state && state.showedData.slice(((id - 1) * 9), (((id - 1) * 9) + 9)).map(recipe => {
                // console.log(recipe);
                return (
                    <div id={recipe.id} style={{width:'30%'}}>
                        <Card id={recipe.id}
                            name={recipe.title || recipe.name}
                            diets={recipe.diets}
                            image={recipe.image}
                            score={recipe.spoonacularScore || recipe.rate} />
                    </div>
                )
            })}
        </div>
    )
}