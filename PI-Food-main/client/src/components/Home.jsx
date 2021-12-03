import React from 'react'
import {Navbar} from './Navbar'
import {RecipeCards} from './RecipeCards'
import { Pages } from './Pages'
import { useParams } from 'react-router'
import appContainerStyle from './styles/AppContainer.module.css'

function Home() {
    const {id} = useParams();

    return (
        <div className={appContainerStyle.contenedorApp}>
            <Navbar/>
            <RecipeCards/>
            <Pages page={id}/>
        </div>
    )
}

export default Home
