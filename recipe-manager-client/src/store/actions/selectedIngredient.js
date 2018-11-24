import { FETCH_SELECTED_INGREDIENT } from "../actionTypes"
import apiCall from "../../services/api"
import { addError } from "./errors"

export const fetchSelectedIngredient = selectedIngredient => ({
    type: FETCH_SELECTED_INGREDIENT,
    selectedIngredient
})

export const fetchIngredient = (ingredient_id) => {
    return dispatch => {
        return apiCall("get", `/api/ingredients/${ingredient_id}`)
            .then((res) => {
                return res
            })
            .catch(err => {
                dispatch(addError(err.detail || "Data not found"))
            })
    }
}