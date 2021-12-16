import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CREATED_RECIPE_URL, RECIPE_URL } from './enviroment';
import { Card } from './Card';
import { GiKnifeFork } from 'react-icons/gi';
import { AiOutlineEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './Loader';
import styleCreatedRecipes from './styles/CreatedRecipes.module.css';
import { Link } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import postFormStyle from './styles/PostForm.module.css';


export function CreatedRecipes() {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader)

    const navigate = useNavigate();

    const [recipes, setRecipes] = useState({recipes: [], position: 0});

    useEffect(() => {
        dispatch({
            type: 'LOADER'
        })

        axios.get(CREATED_RECIPE_URL)
            .then(res => {
                setRecipes({
                    recipes: res.data,
                    position: 0
                });

                dispatch({
                    type: 'LOADER'
                })
            });
    }, []);

    function handleOnClick(e) {
        axios.delete(RECIPE_URL + `/${e.target.id}`)
            .then(res => {
                navigate('/home/1')
            });
    }

    function handleOnClickRecipe(e) {
        switch(e.target.name) {
            case '>':
                if(recipes.position >= recipes.recipes.length - 1) return;

                setRecipes({
                    ...recipes,
                    position: recipes.position + 1
                });

                break;
            
            case '<':
                if(recipes.position === 0) return;

                setRecipes({
                    ...recipes,
                    position: recipes.position - 1
                });

                break;

            default: break
        }
    }

    return !loader ? (
        <div className={styleCreatedRecipes.contentContainer}>
            {recipes.recipes.length ?

                <div className={styleCreatedRecipes.contenedor}>
                    <h1 className={styleCreatedRecipes.h1}>{recipes.recipes[recipes.position].name}</h1>

                    <div className={styleCreatedRecipes.scoreContainer}>
                        <div>
                            <h3 className={styleCreatedRecipes.h3}>Score</h3>

                            <span className={styleCreatedRecipes.span}>
                                ⭐{recipes.recipes[recipes.position].rate / 20}
                            </span>
                        </div>

                        <div>
                            <h3 className={styleCreatedRecipes.h3}>Health Score</h3>

                            <span className={styleCreatedRecipes.span}>
                                ⭐{recipes.recipes[recipes.position].healthRate / 20}
                            </span>
                        </div>
                    </div>

                    <div className={styleCreatedRecipes.fotoYDietas}>
                        <div className={styleCreatedRecipes.dietsContainer}>
                            <h3 className={styleCreatedRecipes.h3}>Tipo de dieta</h3>

                            <ul className={styleCreatedRecipes.ul}>
                                {recipes.recipes[recipes.position].diets.length ?
                                    recipes.recipes[recipes.position].diets.map(diet => {
                                        return (
                                            <li className={styleCreatedRecipes.li} id={diet.id}>{diet.name}</li>
                                        )
                                    })

                                    :

                                    <span>-</span>
                                }
                            </ul>

                        </div>
                        <div className={styleCreatedRecipes.imgContainer}>
                            <img className={styleCreatedRecipes.img} src={recipes.recipes[recipes.position].image || 'https://i0.wp.com/goula.lat/wp-content/uploads/2019/12/hamburguesa-beyond-meat-scaled-e1577396155298.jpg?fit=1600%2C1068&ssl=1'} alt="foto comida" />
                        </div>
                    </div>

                    <button className={styleCreatedRecipes.buttonAdelante} onClick={handleOnClickRecipe} name='>'>{'>'}</button>

                    <button className={styleCreatedRecipes.buttonAtras} onClick={handleOnClickRecipe} name='<'>{'<'}</button>

                    <div className={styleCreatedRecipes.deleteButton}>
                        <button className={styleCreatedRecipes.button} id={recipes.recipes[recipes.position].id} onClick={handleOnClick} >
                            <GiKnifeFork className={styleCreatedRecipes.icon} id={recipes.recipes[recipes.position].id} onClick={handleOnClick}/>
                        </button>
                    </div>

                    <div className={styleCreatedRecipes.editButton}>
                        <Link to={`/editRecipe/${recipes.recipes[recipes.position].id}`} className={styleCreatedRecipes.button2}>
                            <AiOutlineEdit className={styleCreatedRecipes.icon2}/>
                        </Link>
                    </div>

                </div>

                :

                <div>
                    <h1 style={{color:'#ffffffcc', lineHeight:'80px', fontSize:'3rem'}}>No <br /> hay <br /> recetas <br /> creadas</h1>
                </div>
            }

            <Link className={postFormStyle.Link} to='/home/1'>
                <BsFillArrowLeftCircleFill className={postFormStyle.atras} />
            </Link>
        </div>
    ) : (
        <Loader />
    )
}