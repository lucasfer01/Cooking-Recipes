import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import SearchbarStyle from './styles/Searchbar.module.css';
import eggIcon from '../images/egg-icon.png';

function Searchbar() {
    const [inputValue, setInputValue] = useState({searchInput: ''});

    const handleOnChange = (e) => {
        if(e.target.value.length < 60) {
            setInputValue({
                ...inputValue,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // setInputValue({searchInput: ''});
    }

    return (
        <form onSubmit={handleOnSubmit} className={SearchbarStyle.searchContainer}>
            <input onChange={handleOnChange} value={inputValue.searchInput} name='searchInput' autoComplete='off' spellCheck='false' placeholder='Buscar por nombre...' className={SearchbarStyle.input} type='text' />
            <div className={SearchbarStyle.buttonContainer}>
                <img className={SearchbarStyle.buttonImage} onClick={handleOnSubmit} src={eggIcon} alt='egg icon' />
                <button className={SearchbarStyle.button} type='submit'><FaSearch/></button>
            </div>
        </form>
    )
}

export default Searchbar
