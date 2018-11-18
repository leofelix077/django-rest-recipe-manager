import {combineReducers} from "redux"
import currentUser from "./currentUser"
import errors from "./errors"
import ingredients from "./ingredients"

const rootReducer = combineReducers({
    currentUser,
    errors,
    ingredients
})

export default rootReducer