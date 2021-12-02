import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TYPES_URL, BACK_URL } from './enviroment';
import { useNavigate } from 'react-router-dom'

export function PostForm() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        summary: '',
        rate: 1,
        healthRate: 1,
        steps: [],
        tempStep: '',
        counter: 1
    });

    const [diets, setDiets] = useState();
    const [selectedDiets, setSelectedDiets] = useState();

    useEffect(() => {
        axios.get(TYPES_URL)
            .then(response => {
                setDiets(response.data);
            });
    }, [])

    function handleOnChange(e) {
        if (e.target.name === 'rate' || e.target.name === 'healthRate') {
            if (parseInt(e.target.value) > 100) {
                return setValues({
                    ...values,
                    rate: 100
                })
            } else if (parseInt(e.target.value) < 1) {
                return setValues({
                    ...values,
                    rate: 1
                })
            }
        }
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    function handleOnClick(e) {
        e.preventDefault();

        setValues({
            ...values,
            steps: [...values.steps, { number: values.counter, step: values.tempStep }],
            counter: values.counter + 1,
            tempStep: ''
        })
    }

    function handleOnSubmit(e) {
        e.preventDefault();

        axios.post('http://localhost:3001/recipe', {
            name: values.name,
            summary: values.summary,
            rate: values.rate,
            healthRate: values.healthRate,
            steps: values.steps
        })
            .then(res => {
                setValues({
                    name: '',
                    summary: '',
                    rate: 1,
                    healthRate: 1,
                    steps: [],
                    tempStep: '',
                    counter: 1
                })

                const dietPromises = Object.values(selectedDiets).map(dietId => {
                    return axios.post(BACK_URL + `/${res.data.id}/${dietId}`);
                });

                Promise.all(dietPromises)
                       .then(res => navigate('/home/1'))
            });
    }

    function handleOnChangeInput(e) {
        if (selectedDiets && selectedDiets[e.target.name]) {
            const temp = {...selectedDiets};
            
            delete temp[e.target.name];
            
            setSelectedDiets(temp);
        } else {
            setSelectedDiets({
                ...selectedDiets,
                [e.target.name]: e.target.id
            });
            
        }
        // console.log(selectedDiets);
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input type="text" name='name' max='100' min='1' onChange={handleOnChange} value={values.name} placeholder='Nombre de la receta...' />

                <br />

                <br />

                <textarea name="summary" onChange={handleOnChange} value={values.summary} placeholder='Resumen del plato...' ></textarea>

                <br />

                <label htmlFor="number">Puntuacion de receta</label>
                <br />
                <input type="number" name="rate" id="number" onChange={handleOnChange} value={values.rate} />

                <br />

                <label htmlFor="numberHealth">Puntuacion saludable de receta</label>
                <br />
                <input type="number" name="healthRate" id="numberHealth" onChange={handleOnChange} value={values.healthRate} />

                <br />

                <textarea name="tempStep" onChange={handleOnChange} value={values.tempStep} placeholder='Ingrese el paso a paso' ></textarea>

                <button onClick={handleOnClick}>Agregar paso</button>

                <br />
                <br />

                {diets && <h4>Agregar tipo de dieta</h4>}
                {diets && diets.map(diet => (
                    <>
                        <input type="checkbox" onChange={handleOnChangeInput} name={diet.name} id={diet.id} />
                        <label htmlFor={diet.id}>{diet.name}</label>
                    </>
                ))}

                    <br />
                    <br />

                <button type='submit'>Agregar receta</button>
            </form>
        </div>
    )
}