import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from './Loader'
import styleCardDetail from './styles/CardDetail.module.css'
import postFormStyle from './styles/PostForm.module.css'
import { Link } from 'react-router-dom';
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'


export function CardDetail() {
  const { id } = useParams();

  const [data, setData] = useState();

  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    dispatch({
      type: 'LOADER'
    });

    axios.get(`http://localhost:3001/recipes/${id}`)
      .then(response => {
        setData(response.data);

        dispatch({
          type: 'LOADER'
        });
      })
  }, [id]);

  return !state.loader ? (
    <div className={styleCardDetail.container} >

      {/* <NavbarCardDetail /> */}

      <div id={data && data.id} className={styleCardDetail.contentContainer}>

        {data &&
          <>
            <h1 className={styleCardDetail.tituloH1}>{data.title || data.name}</h1>

            <img src={data.image} alt={data.title || data.name} />

            <div className={styleCardDetail.detailContainer}>
              <div className={styleCardDetail.tipoDePlato}>
                <h2 className={styleCardDetail.tituloH2}>Tipo de plato:</h2>

                <ul>
                  {data.dishTypes ?
                    data.dishTypes.map(type => {
                      return (
                        <>
                          <li className={styleCardDetail.li} id={type}>{type[0].toUpperCase() + type.slice(1)}</li>

                          <br />
                        </>
                      )
                    }) : <span>-</span>}
                </ul>
              </div>

              <div className={styleCardDetail.tipoDeDieta}>
                <h2 className={styleCardDetail.tituloH2}>Tipo de Dieta</h2>

                <ul>
                  {data.diets.length ? data.diets.map(diet => (
                    <>
                      <li className={styleCardDetail.li} id={diet.name || diet}>{(diet.name || diet)[0].toUpperCase() + (diet.name || diet).slice(1)}</li>
                      <br />
                    </>
                  )) : <span>-</span>}
                </ul>

              </div>

              <div className={styleCardDetail.contenedorScore}>
                <h2 className={styleCardDetail.tituloH2}>Score</h2>

                <p className={styleCardDetail.puntajes}>⭐ {(data.spoonacularScore || data.rate) / 20}</p>
              </div>

              <div>
                <h2 className={styleCardDetail.tituloH2}>Health Score</h2>

                <p className={styleCardDetail.puntajes} >⭐ {(data.healthScore || data.healthRate) / 20}</p>
              </div>
            </div>

            <h2 className={styleCardDetail.tituloH2}>Resumen</h2>

            <p className={styleCardDetail.resumen} dangerouslySetInnerHTML={{ __html: data.summary }}></p>

            {(data.analyzedInstructions || data.steps.length) ?

              (<>
                {(data.steps || data.analyzedInstructions.length) ? <h2 style={{marginBottom:'0'}} className={styleCardDetail.tituloH2}>Pasos a seguir</h2> : ''}

                <div>
                  {(data.steps || (data.analyzedInstructions.length ? data.analyzedInstructions[0].steps : data.analyzedInstructions)) ? (data.steps || (data.analyzedInstructions.length ? data.analyzedInstructions[0].steps : data.analyzedInstructions)).map(step => (
                    <div className={styleCardDetail.paso}>
                      <h4>Paso {step.number}</h4>

                      <p>{step.step}</p>
                    </div>
                  )) : <span>-</span>}
                </div>

              </>) : ''}
          </>
        }
      </div>
      <Link className={postFormStyle.Link} to='/home/1'>
        <BsFillArrowLeftCircleFill className={postFormStyle.atras}/>
      </Link>
    </div>
  ) : (
    <Loader />
  )
}