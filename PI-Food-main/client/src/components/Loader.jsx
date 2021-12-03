import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function Loader() {
    const loader = useSelector(state => state.loader);

    useEffect(() => {

    },[loader])

    return loader ? (
        <div style={{background: '#ffffffcc', width: '100%', height: '100vh'}}>
            <h1>Cargando recetas</h1>
        </div>
    ) : (
        <></>
    )
}