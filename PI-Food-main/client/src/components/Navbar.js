import React from 'react';
import Searchbar from './Searchbar';
import logo from '../images/logo-food.png';
import {Link} from 'react-router-dom';

function Navbar() {
    ;
    return (
        <div>
            <Link to={'/home'}>
                <img src={logo} alt='logo plato de comida' style={{width: '140px', height: '80px', cursor: 'pointer'}} />
            </Link>
            <Searchbar/>
        </div>
    )
}

export default Navbar
