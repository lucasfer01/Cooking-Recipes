import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import loaderStyle from './styles/Loader.module.css'
import foodLoader from '../images/loader.gif'

export function Loader() {
    const loader = useSelector(state => state.loader);

    useEffect(() => {

    },[loader])

    return loader ? (
        <div className={loaderStyle.loaderContainer}>
            <h1 className={loaderStyle.tituloH1}>Cargando recetas...</h1>
            <img src={foodLoader} alt="loader" />
        </div>
    ) : (
        <></>
    )
}