const initialState = {
    recipes: [],
    showedData: []
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_RECIPES':
            console.log('funcona');
            let paginatedData = [];

            for(let i=0; i<action.payload.length; i+=9) {
                paginatedData.push(action.payload.slice(i, i+9));
            }
        
            return {
                ...state,
                original: action.payload,
                recipes: action.payload,
                showedData: paginatedData
            }

        case 'GET_FILTER':
            // console.log('payload:',action.payload);
            let paginatedDataFilter = []

            for(let j=0; j<action.payload.length; j+=9) {
                paginatedDataFilter.push(action.payload.slice(j, j+9));
            }

            return {
                ...state,
                showedData: paginatedDataFilter
            }

            // case 'GET_ORDER':
            //     const orderedData = state.recipes.sort(function(a, b){return a.spoonacularScore || a.score - b.spoonacularScore || b.score});
            //     return {
            //         ...state,
            //         recipes: orderedData
            //     }

        default: return { ...state }
    }
}

export default reducer;