import React, { useEffect, useState } from 'react'
import RecipeCardsStyle from './styles/RecipeCards.module.css'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card } from './Card';
import { Loader } from './Loader'

export function RecipeCards() {
    // const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();
    const state = useSelector(state => state);

    useEffect(() => {
        // setLoader(true);
        dispatch({
            type: 'LOADER'
        })

        console.log('pasoo');

        state.showedData && axios.get('http://localhost:3001/recipes')
            .then(res => {
                dispatch({
                    type: 'GET_RECIPES',
                    payload: res.data
                });

                dispatch({
                    type: 'LOADER'
                })
                // setLoader(false);
            });
    },[])


    const { id } = useParams();
    // console.log('state',state.showedData.slice(((id-1) * 9), (((id-1) * 9) + 9)));

    return !state.loader ? (
        <>
        
            <Link to='/createdRecipes'>
                <button>Recetas creadas</button>
            </Link>

            <Link to='/newRecipe'>
                <button>Crear recetas</button>
            </Link>
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
                
        </>
        
    ) : (
        <Loader/>
    )
}