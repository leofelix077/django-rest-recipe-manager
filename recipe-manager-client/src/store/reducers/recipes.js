import { LOAD_RECIPES } from "../actionTypes"

const recipe = (state = [], action) => {
    switch (action.type) {
        case LOAD_RECIPES:
            return [...action.recipes]
        default:
            return state;
    }
}

export default recipe