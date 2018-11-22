import React from "react"
import IngredientList from "../containers/IngredientList"
import RecipeList from "../containers/RecipeList"


const Dashboard = props => {
    return (
        <div className='row '>
            <div className="col-sm-6 flex-list">
                <IngredientList />
            </div>
            <div className="col-sm-6 flex-list">
                <RecipeList />
            </div>
        </div>
    )
}
export default Dashboard