import { SET_CURRENT_USER, UPDATE_INGREDIENT_QUERY } from "../actionTypes"

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {},
    queryString: ''

}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            }
        case UPDATE_INGREDIENT_QUERY:
            return { ...state, queryString: action.queryString }
        default:
            return state;
    }
}