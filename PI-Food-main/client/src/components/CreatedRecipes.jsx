import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CREATED_RECIPE_URL, RECIPE_URL } from './enviroment'
import { Card } from './Card';
import { NavbarCardDetail } from './NavbarCardDetail';
import {GiKnifeFork} from 'react-icons/gi';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './Loader';
import styleCreatedRecipes from './styles/CreatedRecipes.module.css';


export function CreatedRecipes() {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader)

    const navigate = useNavigate();

    const [recipes, setRecipes] = useState();

    useEffect(() => {
        dispatch({
            type: 'LOADER'
        })

        axios.get(CREATED_RECIPE_URL)
            .then(res => {
                setRecipes(res.data);
                dispatch({
                    type: 'LOADER'
                })
            });
    },[]);

    function handleOnClick(e) {
        console.log(e.target.id);
        axios.delete(RECIPE_URL + `/${e.target.id}`)
             .then(res => {
                alert('Receta borrada correctamente');
                navigate('/home/1')
             });
    }

    return !loader ? (
        <div>
            <NavbarCardDetail/>

            <div className={styleCreatedRecipes.contenedor}>
                {recipes && recipes.map(recipe => (
                    <div style={{ width: '30%' }}>
                        <div className={styleCreatedRecipes.deleteButtonContainer}>
                            <button id={recipe.id} onClick={handleOnClick} className={styleCreatedRecipes.deleteButton}>
                                <GiKnifeFork id={recipe.id} onClick={handleOnClick}/>
                            </button>
                        </div>
                        <Card id={recipe.id}
                            name={recipe.title || recipe.name}
                            diets={recipe.diets}
                            image={recipe.image}
                            score={recipe.spoonacularScore || recipe.rate}
                            healthScore={recipe.healthScore || recipe.healthRate} />
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <Loader/>
    )
}