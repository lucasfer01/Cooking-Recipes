import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import indexStyle from './styles/Index.module.css';
import imgButton from '../images/logo-food.png'
import {Searchbar} from './Searchbar';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export function Index() {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     axios.get('http://localhost:3001/recipes')
    //         .then(response => {

    //             dispatch({
    //                 type: 'GET_RECIPES',
    //                 payload: response.data
    //             });
    //         });
    // });

    return (
        <div className={indexStyle.container}>
            <Searchbar/>

            <div className={indexStyle.title}>
                <h1 className={indexStyle.h1}>+5000 recetas</h1>
                <span className={indexStyle.spanTitle}>al alcance de tu mano</span>
            </div>

            <button className={indexStyle.button}>
                <Link className={indexStyle.Link} to={'/home/1'}>
                    <img src={imgButton} alt='Plato boton' />
                    <span className={indexStyle.span}>RECETAS</span>
                </Link>
            </button>
        </div>
    )
}