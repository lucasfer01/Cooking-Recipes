import React from 'react'

export function Card({name, diets, image, score}) {
    return (
        <>
            <span>{name}</span>
            <br/>
            <p>Tipo de dieta:{diets.length && diets.map( x => (
                <span id={x.id || x}>{x.name || x}</span>
            ))}</p>
            <span>Puntuacion: {score / 20}</span>
            <img src={image} alt='receta' />
        </>
    )
}


