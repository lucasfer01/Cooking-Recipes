import React from 'react'
import { Link } from 'react-router-dom'
import cardStyle from './styles/Card.module.css'

export function Card({name, diets, image, score, id, healthScore}) {
    return (
        <div id={id} className={cardStyle.cardContainer}>
            <div className={cardStyle.cardContent}>

                <Link className={cardStyle.linkTitulo} to={`/recipe/${id}`}>
                    <h2 className={cardStyle.tituloH2}>{name}</h2>
                </Link>

                <div className={cardStyle.contenedorDetail}>
                    <div className={cardStyle.detail}>
                        <h4 className={cardStyle.tituloH4}>Tipo de dieta:</h4>
                        
                        <ul className={cardStyle.spanDietContainer}>
                            {diets.length ? diets.map( x => (
                                <li className={cardStyle.spanDiet} id={x.name || x}>{(x.name || x)[0].toUpperCase() + (x.name || x).slice(1)} <br /></li>
                            )) : <span className={cardStyle.dietDefaultSpan}>-</span>}
                        </ul>
                    </div>

                    <div className={cardStyle.detail}>
                        <div>
                            <h4 style={{marginBottom: '15px'}} className={cardStyle.linkTitulo}>Puntuacion</h4>

                            <span className={cardStyle.score}>⭐ {score / 20}</span>
                        </div>

                        <div style={{paddingTop: '30px'}}>
                            <h4 className={cardStyle.linkTitulo} style={{marginBottom: '15px'}}>Puntuacion <br /> Saludable:</h4>

                            <span className={cardStyle.score} >⭐ {healthScore / 20}</span>
                        </div>

                    </div>
                </div>

                <div className={cardStyle.imageContainer}>
                    <img src={image} alt='receta' />
                </div>
            </div>
        </div>
    )
}


