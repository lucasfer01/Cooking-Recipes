import React, { useEffect } from 'react'
import RecipeCardsStyle from './styles/RecipeCards.module.css'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card } from './Card';
import { Loader } from './Loader';
import none from '../images/none.gif';

export function RecipeCards() {

    const dispatch = useDispatch();
    const state = useSelector(state => state);

    useEffect(() => {

        dispatch({
            type: 'LOADER'
        })

        axios.get('http://localhost:3001/recipes')
            .then(res => {
                dispatch({
                    type: 'GET_RECIPES',
                    payload: res.data
                });
            })
            .finally(() => {
                dispatch({
                    type: 'LOADER'
                })
            });
    }, [])


    const { id } = useParams();

    return !state.loader ? (
        <div className={RecipeCardsStyle.divContainer}>
            <div className={RecipeCardsStyle.buttonContainer}>
                <Link to='/createdRecipes'>
                    <button className={RecipeCardsStyle.button}>Recetas creadas</button>
                </Link>

                <Link to='/newRecipe'>
                    <button className={RecipeCardsStyle.button}>Crear recetas</button>
                </Link>
            </div>

            <div id={id - 1} className={RecipeCardsStyle.container}>

                {state.showedData.length ? state.showedData.slice(((id - 1) * 9), (((id - 1) * 9) + 9)).map(recipe => {
                    // console.log(recipe);
                    return (
                        <div id={recipe.id} style={{ width: '30%' }}>
                            <Card id={recipe.id}
                                name={recipe.title || recipe.name}
                                diets={recipe.diets}
                                image={recipe.image}
                                score={recipe.spoonacularScore || recipe.rate}
                                healthScore={recipe.healthScore || recipe.healthRate} />
                        </div>
                    )
                }) : <>
                        <img src={none} alt="" />
                    </>}
            </div>

        </div>

    ) : (
        <Loader />
    )
}