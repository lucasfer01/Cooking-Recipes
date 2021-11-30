import React from 'react';
import {Searchbar} from './Searchbar';
import logo from '../images/logo-food.png';
import {Link} from 'react-router-dom';
import navbarStyle from './styles/Navbar.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Buttons } from './Buttons';

export function Navbar() {
    // const state = useSelector(state => state.recipes);
    // const dispatch =  useDispatch();

    // const handleOnClick = () => {
    //     dispatch({
    //         type: 'GET_FILTER',
    //         payload: state
    //     })
    // }

    return (
        <div className={navbarStyle.navBar}>
            <div className={navbarStyle.container}>
                <Link to={'/home/1'}>
                    <img className={navbarStyle.logo} src={logo} alt='logo plato de comida' style={{width: '140px', height: '80px', cursor: 'pointer'}} />
                </Link>
                <Buttons/>
                <Searchbar/>
            </div>
        </div>
    )
}