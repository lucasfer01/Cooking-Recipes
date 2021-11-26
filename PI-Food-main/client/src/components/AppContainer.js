import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import Navbar from './Navbar'
import Home from './Home'

function AppContainer() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Home/>} />
        </Routes>
        </>
    )
}

export default AppContainer
