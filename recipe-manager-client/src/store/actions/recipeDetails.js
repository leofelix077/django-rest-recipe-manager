import { FETCH_RECIPE_DETAILS } from "../actionTypes"
import apiCall from "../../services/api"
import { addError } from "./errors"

export const loadRecipeDetails = recipeDetails => ({
    type: FETCH_RECIPE_DETAILS,
    recipeDetails
})

export const fetchRecipeDetails = (user_id, recipe_id) => {
    return dispatch => {
        return apiCall("get", `/api/users/${user_id}/recipe_details/${recipe_id}`)
            .then((res) => {
                return res.results
            })
            .catch(err => {
                dispatch(addError(err.detail || "Data not found"))
            })
    }
}