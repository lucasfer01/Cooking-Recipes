import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CREATED_RECIPE_URL } from './enviroment'
import { Card } from './Card';
import { NavbarCardDetail } from './NavbarCardDetail';


export function CreatedRecipes() {
    const [recipes, setRecipes] = useState();

    useEffect(() => {
        axios.get(CREATED_RECIPE_URL)
            .then(res => {
                setRecipes(res.data)
            });
    }, [])

    return (
        <div>
            <NavbarCardDetail/>
            {recipes && recipes.map(recipe => (
                <div style={{ width: '30%' }}>
                    <Card id={recipe.id}
                        name={recipe.title || recipe.name}
                        diets={recipe.diets}
                        image={recipe.image}
                        score={recipe.spoonacularScore || recipe.rate} />
                </div>
            ))}
        </div>
    )
}