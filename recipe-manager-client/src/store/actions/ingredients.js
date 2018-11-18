import apiCall from "../../services/api"
import { addError } from "./errors"
import { LOAD_INGREDIENTS, REMOVE_INGREDIENT, UPDATE_INGREDIENT_QUERY } from "../actionTypes"

export const loadIngredients = ingredients => ({
    type: LOAD_INGREDIENTS,
    ingredients
})

export const remove = id => ({
    type: REMOVE_INGREDIENT,
    id
})

export const updateQueryString = queryString => ({
    type: UPDATE_INGREDIENT_QUERY,
    queryString
})

export const removeIngredient = (ingredient_id) => {
    return dispatch => {
        return apiCall('delete', `/api/ingredients/${ingredient_id}`)
            .then(() => {
                remove(ingredient_id)
            })
            .catch(err => {
                dispatch(addError(err.detail || 'impossible to remove'))
            })
    }
}

export const fetchIngredients = (user_id, queryString) => {
    let query = queryString ? `?q=${queryString}` : ''
    return dispatch => {
        return apiCall("get", `/api/users/${user_id}/ingredients/${query}`)
            .then((res) => {
                dispatch(loadIngredients(res.results))
            })
            .catch(err => {
                dispatch(addError(err.detail || "Data not found"))
            })
    }
}
export const postNewIngredient = (data) => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.user_id
    const newData = { ...data, user: id }
    console.log(newData)
    return apiCall('post', `/api/users/${id}/ingredients/`, newData)
        .then((res) => {
        })
        .catch((err) => {
            dispatch(addError(err || "Not possible to post ingredient"))
        })
}

export const updateIngredient = (data) => (dispatch) => {
    console.log(data)
    return apiCall('put', `/api/ingredients/${data.id}/`, data)
        .then((res) => {
        })
        .catch((err) => {
            dispatch(addError(err || "Not possible to post ingredient"))
        })
}