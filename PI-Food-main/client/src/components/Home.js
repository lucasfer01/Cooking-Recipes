import React from 'react';
import { Link } from 'react-router-dom';
import homeStyle from './styles/Home.module.css';
import imgButton from '../images/logo-food.png'
import Searchbar from './Searchbar';

function Home() {
    return (
        <div className={homeStyle.container}>
            <Searchbar/>

            <div className={homeStyle.title}>
                <h1 className={homeStyle.h1}>+5000 recetas</h1>
                <span className={homeStyle.spanTitle}>al alcance de tu mano</span>
            </div>

            <button className={homeStyle.button}>
                <Link className={homeStyle.Link} to={'/home'}>
                    <img src={imgButton} alt='Plato boton' />
                    <span className={homeStyle.span}>RECETAS</span>
                </Link>
                
            </button>
        </div>
    )
}

export default Home
