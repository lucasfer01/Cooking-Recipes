import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
import { NavbarCardDetail } from './NavbarCardDetail';


export function CardDetail() {
    const {id} = useParams();

    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3001/recipes/${id}`)
            .then(response => {
                setData(response.data);
                // console.log(response.data);
            })
    },[id]);

    return (
        <div style={{background:'#ffffffcc'}}>
            <NavbarCardDetail/>
            <div id={data && data.id}>
                {data &&
                <>
                    <h1>{data.title || data.name}</h1>
                    <img src={data.image} alt={data.title || data.name}/>
                    {data.dishTypes && <h2>Tipo de plato:</h2>}
                    {data.dishTypes && 
                        data.dishTypes.map(type => {
                            return (<><span id={type}>{type}</span>
                                    <br/></>)
                    })}

                    <h2>Tipo de Dieta</h2>
                    {data.diets.length && data.diets.map(diet => (
                        <>
                            <span id={diet.name || diet}>{diet.name || diet}</span>
                            <br/>
                        </>
                    ))}
                    
                    <h2>Resumen</h2>
                    <p dangerouslySetInnerHTML={{__html: data.summary}}></p>
                    <h2>Score</h2>
                    <p>{(data.spoonacularScore || data.rate) / 20}</p>
                    <h2>Health Score</h2>
                    <p>{(data.healthScore || data.healthRate) / 20}</p>
                </> 
                }
            </div>
        </div>
    )
}