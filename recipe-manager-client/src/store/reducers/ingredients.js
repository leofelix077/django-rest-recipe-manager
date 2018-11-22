import { LOAD_INGREDIENTS } from "../actionTypes"

const ingredient = (state = [], action) => {
    switch (action.type) {
        case LOAD_INGREDIENTS:
            return [...action.ingredients]
        default:
            return state;
    }
}

export default ingredient