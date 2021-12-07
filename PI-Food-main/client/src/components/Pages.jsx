import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import pagesStyles from './styles/Pages.module.css'

export function Pages({ page }) {

    const limit = Math.ceil(useSelector(state => state.showedData).length / 9);

    function handleOnClick() {

        window.scroll({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className={pagesStyles.contenedorPages}>
            {(parseInt(page) - 2 > 0) ?
                <Link className={pagesStyles.links} to={`/home/${parseInt(page) - 2}`}>
                    <span onClick={handleOnClick}>{parseInt(page) - 2}</span>
                </Link> : ''}

            {(parseInt(page) - 1 > 0) ?
                <Link className={pagesStyles.links} to={`/home/${parseInt(page) - 1}`}>
                    <span onClick={handleOnClick}>{parseInt(page) - 1}</span>
                </Link> : ''}

            <Link className={pagesStyles.links} to={`/home/${page}`}>
                <span onClick={handleOnClick} className={pagesStyles.active}>{page}</span>
            </Link>

            {parseInt(page) + 1 <= limit ? <Link className={pagesStyles.links} to={`/home/${parseInt(page) + 1}`}>
                <span onClick={handleOnClick}>{parseInt(page) + 1}</span>
            </Link> : ''}

            {parseInt(page) + 2 <= limit ? <Link className={pagesStyles.links} to={`/home/${parseInt(page) + 2}`}>
                <span onClick={handleOnClick}>{parseInt(page) + 2}</span>
            </Link> : ''}
        </div>
    )
}