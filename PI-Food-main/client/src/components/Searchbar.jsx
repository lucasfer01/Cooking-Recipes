import React, { useState } from 'react'
import SearchbarStyle from './styles/Searchbar.module.css';
import eggIcon from '../images/egg-icon.png';
import axios from 'axios';
import {useDispatch} from 'react-redux';

export function Searchbar() {
    const [inputValue, setInputValue] = useState({searchInput: '' });

    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        if (e.target.value.length < 60) {
            setInputValue({
                ...inputValue,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleOnSubmit =  (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3001/recipes?name=${inputValue.searchInput}`)
            .then(response => {
                console.log(response.data);
                dispatch({
                    type: 'GET_FILTER',
                    payload: response.data
                })
            })
        setInputValue({searchInput:''})
    }


    return (
        <form onSubmit={handleOnSubmit} className={SearchbarStyle.searchContainer}>

            <input onChange={handleOnChange} name='searchInput' autoComplete='off' spellCheck='false' placeholder='Buscar por nombre...' className={SearchbarStyle.input} value={inputValue.searchInput} type='text' />

            <div className={SearchbarStyle.buttonContainer}>
                <button className={SearchbarStyle.button} type='submit'>
                    <img className={SearchbarStyle.buttonImage}  src={eggIcon} alt='egg icon' />
                </button>
            </div>
        </form>
    )
}