import { FETCH_SELECTED_RECIPE } from "../actionTypes"

const selectedRecipe = (state = null, action) => {
    switch (action.type) {
        case FETCH_SELECTED_RECIPE:
            return { ...action.selectedRecipe }
        default:
            return state;
    }
}

export default selectedRecipe