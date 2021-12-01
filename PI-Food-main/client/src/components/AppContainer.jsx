import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {Index} from './index'
import Home from './Home'
import {CardDetail} from './CardDetail'
import { PostForm } from './PostForm'

function AppContainer() {
    return (
        <>
            <Routes>
                <Route path="/" exact element={<Index/>} />
                <Route path='/home/:id' element={<Home/>} />
                <Route path='/recipe/:id' element={<CardDetail/>}/>
                <Route path='/newRecipe' element={<PostForm/>} />
            </Routes>
        </>
    )
}

export default AppContainer
