import { LOAD_INGREDIENTS, REMOVE_INGREDIENT } from "../actionTypes"

const ingredient = (state = [], action) => {
    switch (action.type) {
        case LOAD_INGREDIENTS:
            return [...action.ingredients]
        case REMOVE_INGREDIENT:
            return state.filter(ingredient => ingredient.id !== action.id)
        default:
            return state;
    }
}

export default ingredient