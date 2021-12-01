import React from 'react'

export function PostForm() {
    return (
        <div>
            <form>
                <input type="text" placeholder='Nombre de la receta...' />

                <br />

                <br />

                <textarea name="" id="" cols="30" rows="10" placeholder='Resumen del plato...' ></textarea>

                <br />

                <label htmlFor="number">Puntuacion de receta</label>
                <br />
                <input type="number" name="" id="number" />

                <br />

                <label htmlFor="numberHealth">Puntuacion saludable de receta</label>
                <br />
                <input type="number" name="" id="numberHealth" />

                <br />

                <textarea name="" id="" cols="30" rows="10" placeholder='Ingrese el paso a paso' ></textarea>
                <button>Agregar paso</button>
            </form>
        </div>
    )
}