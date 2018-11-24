import { FETCH_SELECTED_INGREDIENT } from "../actionTypes"

const selectedIngredient = (state = null, action) => {
    switch (action.type) {
        case FETCH_SELECTED_INGREDIENT:
            return { ...action.selectedIngredient }
        default:
            return state;
    }
}

export default selectedIngredient