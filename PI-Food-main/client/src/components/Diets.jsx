import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import dietsStyle from './styles/Diets.module.css'

export function Diets() {
    const [dietas, setDietas] = useState();
    const [selectedDiets, setSelectedDiets] = useState([]);

    const dispatch = useDispatch();
    const state = useSelector(state => state);

    useEffect(() => {
        axios.get('http://localhost:3001/types')
            .then(response => {
                setDietas(response.data);
            });
    }, []);

    function handleOnChange(e) {
        const index = selectedDiets.indexOf(e.target.name);
        // console.log(index);

        if (index >= 0) {
            const temp = [...selectedDiets];
            temp.splice(index, 1);

            setSelectedDiets(temp);
        } else {

            setSelectedDiets([...selectedDiets, e.target.name])

            const filterCategory = state.showedData.filter(x => {
                if (typeof x.diets[0] === 'object') {
                    for (let i = 0; i < x.diets.length; i++) {
                        if (x.diets[i].name.toLowerCase().includes(e.target.name)) {
                            return true;
                        }
                    }
                    return false;
                }

                return x.diets.includes(e.target.name);
            })


            dispatch({
                type: 'FILTER_CATEGORIES',
                payload: filterCategory

            })
        }


    }

    return (
        <div className={dietsStyle.contendorDiets}>
            {dietas && dietas.map(x => {
                return (
                    <div className={dietsStyle.diet}>
                        <input onClick={handleOnChange} id={x.id} type="checkbox" name={x.name.toLowerCase()} />

                        <label id={x.id} htmlFor={x.id}>{x.name}</label>
                    </div>
                )
            })}
            <br />
        </div>
    )
}