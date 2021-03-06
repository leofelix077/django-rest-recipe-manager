import {combineReducers} from "redux"
import currentUser from "./currentUser"
import errors from "./errors"
import ingredients from "./ingredients"
import recipes from "./recipes"
import selectedIngredient from "./selectedIngredient"
import selectedRecipe from "./selectedRecipe"
import recipeDetails from "./recipeDetails"


const rootReducer = combineReducers({
    currentUser,
    errors,
    ingredients,
    recipes,
    selectedIngredient,
    selectedRecipe,
    recipeDetails
})

export default rootReducer