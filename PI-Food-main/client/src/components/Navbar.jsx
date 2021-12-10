import React from 'react';
import {Searchbar} from './Searchbar';
import logo from '../images/logo-food.png';
import {Link} from 'react-router-dom';
import navbarStyle from './styles/Navbar.module.css'
import { Buttons } from './Buttons';

export function Navbar() {

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