import { FETCH_RECIPE_DETAILS } from "../actionTypes"

const recipeDetails = (state = null, action) => {
    switch (action.type) {
        case FETCH_RECIPE_DETAILS:
            return { ...action.recipeDetails }
        default:
            return state;
    }
}

export default recipeDetails