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


export const deleteUnusedRecipeIngredients = (recipe_ingredient_id) => (dispatch) => {
    return apiCall('delete', `/api/recipe_details/${recipe_ingredient_id}`)
        .then((res) => { })
        .catch((err) => {
            dispatch(addError(err || "Not possible to post ingredient"))
        })
}

export const postMapIngredientsToRecipes = (data, recipe) => (dispatch, getState) => {
    let { currentUser } = getState();
    const user = currentUser.user.user_id
    const { id, unit_of_measure_amt, unit_of_measurement } = data
    const newData = { ingredient: id, ingredient_amount: unit_of_measure_amt, unit_of_measurement, user, recipe }
    return apiCall('post', `/api/recipe_details/`, newData)
        .then((res) => { })
        .catch((err) => {
            dispatch(addError(err || "Not possible to post ingredient"))
        })
}

export const updateMapIngredientsToRecipes = (data) => (dispatch) => {
    return apiCall('put', `/api/recipe_details/${data.id}/`, data)
        .then((res) => { })
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
        .then(() => { })
        .catch((err) => {
            dispatch(addError(err || "Not possible to post ingredient"))
        })
}

export const updateIngredient = (data) => (dispatch) => {
    return apiCall('put', `/api/ingredients/${data.id}/`, data)
        .then(() => { })
        .catch((err) => {
            dispatch(addError(err || "Not possible to post ingredient"))
        })
}