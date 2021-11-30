import axios from 'axios';

export function getRecipes() {
    return function(dispatch) {
        return axios.get('http://localhost:3001/recipes')
            .then(response => {

                dispatch({
                    type: 'GET_RECIPES',
                    payload: response.data
                });
            });
    }
}