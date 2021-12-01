import React from 'react'
import { Link } from 'react-router-dom'
import navbarStyle from './styles/Navbar.module.css'
import logo from '../images/logo-food.png';

export function NavbarCardDetail() {
    return (
        <div className={navbarStyle.navBar}>
           
                <Link to={'/home/1'}>
                    <img className={navbarStyle.logo} src={logo} alt='logo plato de comida' style={{ width: '140px', height: '80px', cursor: 'pointer' }} />
                </Link>
        </div>
    )
}