import React, { useEffect} from 'react'
import RecipeCardsStyle from  './styles/RecipeCards.module.css'
import { useParams } from 'react-router'
import {useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'
import axios from 'axios'
import { Card } from './Card';


export function RecipeCards() {
    const dispatch = useDispatch();
    
    const state = useSelector(state => state)
    useEffect(() => {
        if(!state.showedData.length) {
            axios.get('http://localhost:3001/recipes')
                .then(response => {
                dispatch({
                    type: 'GET_RECIPES',
                    payload: response.data
                })
        })}
        console.log('pasando')
    },[dispatch, state])
    
    
    const {id} = useParams();

    return (
        <div className={RecipeCardsStyle.container}>
           {state.showedData[id-1] && state.showedData[id-1].map(recipe => {
               return (
                   <div id={recipe.id} style={{width:'30%'}}>
                       <Card id={recipe.id}
                             name={recipe.title || recipe.name}
                             diets={recipe.diets} 
                             image={recipe.image}
                             score={recipe.spoonacularScore || recipe.score} />
                   </div>
               )
           })}
        </div>
    )
}