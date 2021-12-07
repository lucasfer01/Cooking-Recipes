import React, { useEffect, useState } from 'react';
import styleEditCards from './styles/EditCards.module.css';
import axios from 'axios';
import { RECIPE_URL } from './enviroment';
import { useNavigate, useParams } from 'react-router';

export function EditCards() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({ name: '',
                                           summary: '',
                                           score: 50,
                                           healthScore: 50,
                                           steps: [],
                                           image: '',
                                           diets: []
                                        });

    useEffect(() => {
        axios.get(RECIPE_URL + `/${id}`)
            .then(response => {
                setInputs({
                    name: response.data.name,
                    summary: response.data.summary,
                    score: response.data.rate,
                    healthScore: response.data.healthRate,
                    steps: response.data.steps,
                    image: response.data.image,
                    diets: response.data.diets
                })
            })
    }, [id]);

    function handleOnChange(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    function handleOnSubmit(e) {
        e.preventDefault();

        axios.put(RECIPE_URL + `/${id}`, {name: inputs.name,
                                          summary: inputs.summary,
                                          rate: inputs.score,
                                          healthRate: inputs.healthScore,
                                          image: inputs.image,
        }).then(response => {
            navigate('/home/1')
        });
    }


    return (
        <div className={styleEditCards.contenedor}>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label htmlFor="name">Nombre:</label>

                    <input type="text" name='name' onChange={handleOnChange} value={inputs.name} />
                </div>

                <div>
                    <label htmlFor="summary">Resumen:</label>

                    <textarea name="summary" cols="30" rows="10" value={inputs.summary} onChange={handleOnChange}></textarea>
                </div>

                <div>
                    <label htmlFor="score">score</label>

                    <input type="number" name="score" value={inputs.score} onChange={handleOnChange} />
                </div>

                <div>
                    <label htmlFor="healthScore">Health Score</label>

                    <input type="number" name="healthScore" onChange={handleOnChange} value={inputs.healthScore} />
                </div>

                <div>
                    <label htmlFor="image">Image</label>

                    <input type="text" name='image' onChange={handleOnChange} value={inputs.image}/>
                </div>

                <button type="submit">Actualizar Receta</button>
            </form>
        </div>
    )
}