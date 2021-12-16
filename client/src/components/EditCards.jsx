import React, { useEffect, useState } from 'react';
import styleEditCards from './styles/EditCards.module.css';
import axios from 'axios';
import { RECIPE_URL, TYPES_URL, BACK_URL } from './enviroment';
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

  const [dietas, setDiets] = useState({
    dietas: []
  });

  const [selectedDiets, setSelectedDiets] = useState()

  useEffect(() => {
    const recipePromise = axios.get(RECIPE_URL + `/${id}`);
    const dietPromise = axios.get(TYPES_URL);

    Promise.all([recipePromise, dietPromise])
      .then(response => {
        const [recipe, diets] = response;

        setInputs({
          name: recipe.data.name,
          summary: recipe.data.summary,
          score: recipe.data.rate,
          healthScore: recipe.data.healthRate,
          steps: recipe.data.steps,
          image: recipe.data.image,
          diets: recipe.data.diets
        });

        setDiets({ dietas: diets.data });

        setSelectedDiets(recipe.data.diets);
      });
  }, [id]);

  function handleOnChange(e) {
    if(e.target.name === 'healthScore' || e.target.name === 'score') {
      if(e.target.value >= 100) {
        return setInputs({
          ...inputs,
          [e.target.name]: 100
        })
      } else if (e.target.value <= 1) {
        return setInputs({
          ...inputs,
          [e.target.name]: 1
        })
      }
    }

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    const promiseRecipe = axios.put(RECIPE_URL + `/${id}`, {
      name: inputs.name,
      summary: inputs.summary,
      rate: inputs.score,
      healthRate: inputs.healthScore,
      image: inputs.image,
      steps: inputs.steps
    });

    const dietsId = selectedDiets.map(diet => diet.id);
    console.log(selectedDiets.diets);
    const dietsPromise = axios.put(BACK_URL + `/${id}`, dietsId);

    Promise.all([promiseRecipe, dietsPromise])
      .then(response => {
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

  function handleOnClick(e) {
    e.preventDefault();

    const dietsFilter = selectedDiets.filter(x => x.id === e.target.id);
    
    if(dietsFilter.length) {
      const filter = selectedDiets.filter(diet => diet.id !== e.target.id);

      setSelectedDiets(filter);
    } else {
      setSelectedDiets([...selectedDiets, {id: e.target.id, name: e.target.name}])
    }
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

        {dietas && dietas.dietas.map(diet => {
          return (
            <>
              <button onClick={handleOnClick} id={diet.id} name={diet.name}>{diet.name}</button>
            </>
          )
        })}

        <ul>
          {selectedDiets && selectedDiets.map(dieta => {
            return (
              <div>
                <li style={{color:'white', textAlign:'left'}} id={dieta.id}>{dieta.name}</li>
              </div>
            )
          })}
        </ul>

        <br />
        <br />

        <button type="submit">Actualizar Receta</button>
      </form>
    </div>
  )
}