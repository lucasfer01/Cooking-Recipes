import React, {useEffect} from 'react'
import {Navbar} from './Navbar'
import {RecipeCards} from './RecipeCards'
import {useDispatch} from 'react-redux'
import axios from 'axios'

function Home() {
    

    return (
        <>
            <Navbar/>
            <RecipeCards/>
        </>
    )
}

export default Home
