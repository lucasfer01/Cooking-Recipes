import React, { useEffect, useState } from 'react';
import styleEditCards from './styles/EditCards.module.css';
import axios from 'axios';
import { RECIPE_URL } from './enviroment';
import { useNavigate, useParams } from 'react-router';

export function EditCards() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: '',
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

    axios.put(RECIPE_URL + `/${id}`, {
      name: inputs.name,
      summary: inputs.summary,
      rate: inputs.score,
      healthRate: inputs.healthScore,
      image: inputs.image,
      steps: inputs.steps
    }).then(response => {
      navigate('/home/1')
    });
  }

  function handleOnChangeSteps(e) {
    const temp = inputs.steps;

    temp[e.target.id].step = e.target.value;

    setInputs({
      ...inputs,
      [e.target.name]: temp
    })
  }


  return (
    <div className={styleEditCards.contenedor}>

      <form onSubmit={handleOnSubmit} className={styleEditCards.form}>

        <h1 className={styleEditCards.h1}>Editar Receta</h1>

        <div className={styleEditCards.contenedorInputs}>
          <div>
            <div>
              <h3 className={styleEditCards.h3}>Nombre:</h3>

              <input type="text" name='name' onChange={handleOnChange} value={inputs.name} />
            </div>

            <div className={styleEditCards.contenedorScore}>
              <div>
                <h3 className={styleEditCards.h3}>score</h3>

                <input className={styleEditCards.scoreInput} type="number" name="score" value={inputs.score} onChange={handleOnChange} />

              </div>

              <div>
                <h3 className={styleEditCards.h3}>Health Score</h3>

                <input className={styleEditCards.scoreInput} type="number" name="healthScore" onChange={handleOnChange} value={inputs.healthScore} />
              </div>
            </div>

            <div>
              <h3 className={styleEditCards.h3}>Image</h3>

              <input type="text" name='image' onChange={handleOnChange} value={inputs.image} />
            </div>
          </div>

          <div>
            <h3 className={styleEditCards.h3}>Resumen:</h3>

            <textarea name="summary" cols="30" rows="10" value={inputs.summary} onChange={handleOnChange}></textarea>
          </div>
        </div>

        <div >
          {inputs.steps.length &&
            <>
              <h3 className={styleEditCards.h3}>Pasos a seguir</h3>
              <div className={styleEditCards.stepsContainer} >

                {inputs.steps.map(step => {
                  // console.log('test', inputs.steps[step.number - 1]);

                  return (
                    <div id={step.number}>
                      <h4>Paso {step.number}</h4>

                      <textarea name="steps" id={step.number - 1} onChange={handleOnChangeSteps} value={inputs.steps[step.number - 1].step}></textarea>
                    </div>
                  )
                })}
              </div>
            </>

          }
        </div>

        <button type="submit">Actualizar Receta</button>
      </form>
    </div>
  )
}