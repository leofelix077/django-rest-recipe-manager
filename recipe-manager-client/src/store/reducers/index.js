import {combineReducers} from "redux"
import currentUser from "./currentUser"
import errors from "./errors"
import ingredients from "./ingredients"
import recipes from "./recipes"
import selectedIngredient from "./selectedIngredient"


const rootReducer = combineReducers({
    currentUser,
    errors,
    ingredients,
    recipes,
    selectedIngredient
})

export default rootReducer