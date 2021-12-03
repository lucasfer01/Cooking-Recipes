import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {Index} from './index'
import Home from './Home'
import {CardDetail} from './CardDetail'
import { PostForm } from './PostForm'
import { CreatedRecipes } from './CreatedRecipes'

function AppContainer() {
    return (
        <div>
            <Routes>
                <Route path="/" exact element={<Index/>} />
                <Route path='/home/:id' element={<Home/>} />
                <Route path='/recipe/:id' element={<CardDetail/>}/>
                <Route path='/newRecipe' element={<PostForm/>} />
                <Route path='/createdRecipes' element={<CreatedRecipes/>} />
            </Routes>
        </div>
    )
}

export default AppContainer
