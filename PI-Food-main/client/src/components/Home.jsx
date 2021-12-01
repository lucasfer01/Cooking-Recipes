import React, {useEffect} from 'react'
import {Navbar} from './Navbar'
import {RecipeCards} from './RecipeCards'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { Pages } from './Pages'
import { useParams } from 'react-router'

function Home() {
    const {id} = useParams();

    return (
        <>
            <Navbar/>
            <RecipeCards/>
            <Pages page={id}/>
        </>
    )
}

export default Home
