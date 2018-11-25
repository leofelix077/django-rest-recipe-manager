import apiCall from "../../services/api"
import { addError } from "./errors"
import { LOAD_RECIPES, UPDATE_RECIPE_QUERY } from "../actionTypes"

export const loadRecipes = recipes => ({
    type: LOAD_RECIPES,
    recipes
})

export const updateQueryString = queryString => ({
    type: UPDATE_RECIPE_QUERY,
    queryString
})


export const fetchRecipes = (user_id, queryString) => {
    let query = queryString ? `?q=${queryString}` : ''
    return dispatch => {
        return apiCall("get", `/api/users/${user_id}/recipes/${query}`)
            .then((res) => {
                dispatch(loadRecipes(res.results))
            })
            .catch(err => {
                dispatch(addError(err.detail || "Data not found"))
            })
    }
}
export const postNewRecipe = (data) => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.user_id
    const newData = { ...data, user: id }
    return apiCall('post', `/api/users/${id}/recipes/`, newData)
        .then((res) => {
            return res
        })
        .catch((err) => {
            dispatch(addError(err.detail || "Not possible to post recipe"))
        })
}

export const updateRecipe = (data) => (dispatch) => {
    debugger;
    return apiCall('put', `/api/recipes/${data.id}/`, data)
        .then((res) => {
        })
        .catch((err) => {
            dispatch(addError(err.detail || "Not possible to post recipe"))
        })
}