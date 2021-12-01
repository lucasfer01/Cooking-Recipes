import React from 'react'
import { Link } from 'react-router-dom'
import cardStyle from './styles/Card.module.css'

export function Card({name, diets, image, score, id}) {
    return (
        <div id={id} className={cardStyle.cardContainer}>
            <div className={cardStyle.cardContent}>
                <Link to={`/recipe/${id}`}>
                    <h2>{name}</h2>
                </Link>
                <br/>
                <p>Tipo de dieta:{diets.length && diets.map( x => (
                    <span id={x.id || x}>{x.name || x},</span>
                ))}</p>
                <span>Puntuacion: {score / 20}</span>
                <div className={cardStyle.imageContainer}>
                    <img src={image} alt='receta' />
                </div>
            </div>
        </div>
    )
}


