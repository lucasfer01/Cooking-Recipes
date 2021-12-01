
const initialState = {
    recipes: [],
    showedData: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                showedData: action.payload
            }

        case 'GET_FILTER':

            return {
                ...state,
                showedData: action.payload
            }

        case 'GET_ORDER_UP':

            return {
                ...state,
                showedData: action.payload.sort((a, b) => ((a.spoonacularScore || a.score) - (b.spoonacularScore || b.score)))
            }

        case 'GET_ORDER_DOWN':
            return {
                ...state,
                showedData: action.payload.sort((a, b) => ((a.spoonacularScore || a.score) - (b.spoonacularScore || b.score))).reverse()
            }
            
        case 'GET_ORDER_UP_ALF':
            return {
                ...state,
                showedData: action.payload.sort((a, b) => {
                    if((a.title || a.name) < (b.title || b.name)) {
                        return -1
                    } else {
                        return 1
                    }
                })
            }
        
        case 'GET_ORDER_DOWN_ALF':
            return {
                ...state,
                showedData: action.payload.sort((a, b) => {
                    if((a.title || a.name) < (b.title || b.name)) {
                        return 1
                    } else {
                        return -1
                    }
                })
            }

        case 'RESTART':
            return {
                ...state,
                showedData: action.payload
            }

        case 'FILTER_CATEGORIES': 
            return {
                ...state,
                showedData: action.payload
            }


        default: return { ...state }
    }
}

export default reducer;