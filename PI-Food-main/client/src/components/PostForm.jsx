import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TYPES_URL, BACK_URL } from './enviroment';
import { useNavigate } from 'react-router-dom';
import postFormStyle from './styles/PostForm.module.css'

export function PostForm() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        summary: '',
        rate: 50,
        healthRate: 50,
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

    function handleOnClickLess(e) {
        e.preventDefault();

        const temp = values.steps.slice(0,values.steps.length - 1);

        setValues({
            ...values,
            steps: temp,
            counter: values.counter - 1,
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
            const temp = { ...selectedDiets };

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
        <div className={postFormStyle.contenedorForm}>

            <form className={postFormStyle.form} onSubmit={handleOnSubmit}>

                <h1 className={postFormStyle.titulo}>AGREGAR RECETA</h1>

                <div className={postFormStyle.contenedorInputs}>
                    <div className={postFormStyle.contenedorInputsPrincipales}>
                        <input className={postFormStyle.inputName} type="text" name='name' max='100' min='1' onChange={handleOnChange} value={values.name} placeholder='Nombre de la receta...' />

                        <br />

                        <label className={postFormStyle.label} htmlFor="number">Puntuación</label>

                        <br />

                        <input className={postFormStyle.inputScore} type="number" name="rate" id="number" onChange={handleOnChange} value={values.rate} />

                        <br />

                        <label className={postFormStyle.label} htmlFor="numberHealth">Puntuación saludable</label>

                        <br />

                        <input className={postFormStyle.inputScore} type="number" name="healthRate" id="numberHealth" onChange={handleOnChange} value={values.healthRate} />

                        {diets && <h4 className={postFormStyle.tituloH4}>Agregar tipo de dieta</h4>}

                        <div className={postFormStyle.inputDietsContainer}>
                            {diets && diets.map(diet => (
                                <div className={postFormStyle.dieta}>
                                    <input type="checkbox" onChange={handleOnChangeInput} name={diet.name} id={diet.id} />
                                    <label htmlFor={diet.id}>{diet.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <br />

                    <br />

                    <div  className={postFormStyle.contenedorInputsSecundarios}>
                        <textarea className={postFormStyle.inputResumen} name="summary" onChange={handleOnChange} value={values.summary} placeholder='Resumen del plato...' ></textarea>

                        <br />


                        <br />

                        <textarea className={postFormStyle.inputPaso} name="tempStep" onChange={handleOnChange} value={values.tempStep} placeholder='Ingrese el paso a paso' ></textarea>

                        <br /><br />

                        <button className={postFormStyle.agregarPasoButton} onClick={handleOnClick}>➕</button>
                        <button className={postFormStyle.agregarPasoButton2} onClick={handleOnClickLess}>➖</button>

                        <div className={postFormStyle.contenedorSteps}>
                            {values.steps && values.steps.map(step => (
                                <span id={step.number} className={postFormStyle.step} >PASO {step.number}</span>
                            ))}
                        </div>
                    </div>



                    <br />
                    <br />


                    <br />
                    <br />

                    <button className={postFormStyle.buttonAgregar} type='submit'>Agregar receta</button>
                </div>

            </form>
        </div>
    )
}