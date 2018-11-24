import apiCall from "../../services/api"
import { addError } from "./errors"
import { LOAD_INGREDIENTS, UPDATE_INGREDIENT_QUERY } from "../actionTypes"

export const loadIngredients = ingredients => ({
    type: LOAD_INGREDIENTS,
    ingredients
})


export const updateQueryString = queryString => ({
    type: UPDATE_INGREDIENT_QUERY,
    queryString
})

export const postMapIngredientsToRecipes = (data) => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.user_id
    const newData = { ...data, user: id }
    return apiCall('post', `/api/users/${id}/ingredients/`, newData)
        .then((res) => {
        })
        .catch((err) => {
            dispatch(addError(err || "Not possible to post ingredient"))
        })
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
    return apiCall('post', `/api/users/${id}/ingredients/`, newData)
        .then((res) => {
        })
        .catch((err) => {
            dispatch(addError(err || "Not possible to post ingredient"))
        })
}

export const updateIngredient = (data) => (dispatch) => {
    return apiCall('put', `/api/ingredients/${data.id}/`, data)
        .then((res) => {
        })
        .catch((err) => {
            dispatch(addError(err || "Not possible to post ingredient"))
        })
}