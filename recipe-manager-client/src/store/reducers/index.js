import {combineReducers} from "redux"
import currentUser from "./currentUser"
import errors from "./errors"
import ingredients from "./ingredients"
import recipes from "./recipes"


const rootReducer = combineReducers({
    currentUser,
    errors,
    ingredients,
    recipes
})

export default rootReducer