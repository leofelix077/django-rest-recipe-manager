import { FETCH_SELECTED_INGREDIENT } from "../actionTypes"

const INITIAL_STATE = {
    selectedIngredient: []
}

const selectedIngredient = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_SELECTED_INGREDIENT:
            return {
                selectedIngredient: [...state.selectedIngredient.concat(action.selectedIngredient)]
            }

        default:
            return state;
    }
}

export default selectedIngredient