import { FETCH_SELECTED_RECIPE } from "../actionTypes"
import apiCall from "../../services/api"
import { addError } from "./errors"

export const fetchSelectedRecipe = selectedRecipe => ({
    type: FETCH_SELECTED_RECIPE,
    selectedRecipe
})

export const fetchRecipe = (recipe_id) => {
    return dispatch => {
        return apiCall("get", `/api/recipes/${recipe_id}`)
            .then((res) => {
                dispatch(fetchSelectedRecipe(res))
                return res
            })
            .catch(err => {
                dispatch(addError(err.detail || "Data not found"))
            })
    }
}