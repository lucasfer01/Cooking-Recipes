import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TYPES_URL, BACK_URL } from './enviroment';

export function FormDiets({idReceta}) {
    const [diets, setDiets] = useState();
    const [selectedDiets, setSelectedDiets] = useState([]);
    const [selectedDietsId, setSelectedDietsId] = useState({});

    useEffect(() => {
        axios.get(TYPES_URL)
            .then(response => {
                setDiets(response.data);
            });

        return () => {
            console.log(idReceta);
            if(idReceta) {
                const dietsPromises = selectedDiets.map(selectedDiet => {
                    return axios.post(BACK_URL + `/${idReceta}/${selectedDietsId[selectedDiet]}`)
                });
    
                Promise.all(dietsPromises)
                       .then(response => console.log('terminado'));
            }
        }
    },[])

    function handleOnChange(e) {
        const index = selectedDiets.indexOf(e.target.name);
        // console.log(index);

        if (index >= 0) {
            const temp = [...selectedDiets];
            temp.splice(index, 1);

            const tempObj = {...selectedDietsId};
            delete tempObj[e.target.name];

            setSelectedDietsId(tempObj)
            setSelectedDiets(temp);
            // console.log(selectedDiets);
        } else {
            setSelectedDiets([...selectedDiets, e.target.name]);
            setSelectedDietsId({
                ...selectedDietsId,
                [e.target.name]: e.target.id
            })
        }


    }

    return (
        <div>
            {diets && diets.map(x => {
                return (
                    <>
                        <input onClick={handleOnChange} id={x.id} type="checkbox" name={x.name.split('-').join(' ').toLowerCase()} />

                        <label id={x.id} htmlFor={x.id}>{x.name}</label>
                    </>
                )}
            )}
        </div>
    )
}