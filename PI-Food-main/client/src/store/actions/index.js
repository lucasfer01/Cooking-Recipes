import axios from 'axios';

export function getRecipes() {
    return async function(dispatch) {
        try {
                const data = await axios.get('http://localhost:3001/recipes').data;
                
                dispatch({
                    type: 'GET_RECIPES',
                    payload: data
                });
            } catch(e) {
                console.log(e)
            }
    }
}