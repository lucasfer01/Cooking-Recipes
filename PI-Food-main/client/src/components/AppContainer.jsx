import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {Index} from './index'
import Home from './Home'

function AppContainer() {
    return (
        <>
            <Routes>
                <Route path="/" exact element={<Index/>} />
                <Route path='/home/:id' element={<Home/>} />
            </Routes>
        </>
    )
}

export default AppContainer
