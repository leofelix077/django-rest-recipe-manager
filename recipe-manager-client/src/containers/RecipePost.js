import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { postNewRecipe, updateRecipe } from "../store/actions/recipes"
import {
    fetchIngredients,
    postMapIngredientsToRecipes,
    updateMapIngredientsToRecipes,
    deleteUnusedRecipeIngredients
} from "../store/actions/ingredients"
import { fetchRecipe } from "../store/actions/selectedRecipe"
import { fetchRecipeDetails } from "../store/actions/recipeDetails"

class RecipePost extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="jumbotron">
                <h1 className="display-4">Recipe Name</h1>
                <hr className="my-4" />
                <p>Ingredient List</p>
                <div className="row">
                    <ul className='list-group col-xs-5'>
                        <img className='col-xs-12' src='https://cdn-image.myrecipes.com/sites/default/files/styles/medium_2x/public/pork-beef-bolognese-ck.jpg' />
                    </ul>

                    <ul className="list-group col-xs-5">
                        <li className="list-group-item">
                            Ingredient 1 - 150cL
                        </li>

                        <li className="list-group-item">
                            Ingredient 2
                        </li>

                        <li className="list-group-item">
                            Ingredient 3
                        </li>

                        <li className="list-group-item">
                            Ingredient 4
                        </li>
                    </ul>

                    <ul className="list-group col-xs-12">
                        <h2 className="display-4">Preparation</h2>
                        <li className="list-group-item text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam deserunt fugit odio error nesciunt aut, distinctio mollitia facere consequatur quibusdam quod totam quaerat tempora eum accusamus harum perspiciatis fuga repellat.
                        </li>
                    </ul>

                    <ul className="list-group col-xs-12">
                        <h2 className="display-4">Total Cost</h2>
                        <li className="list-group-item text-justify col-xs-2">
                            €5000,00
                        </li>
                    </ul>

                </div>
                <p className="row">
                    <Link to={this.props.match.url + 'edit'}>
                        <button className="btn btn-primary btn-lg pull-right" href="#" role="button">Edit this recipe</button>
                    </Link>
                    <Link to={`/`}>
                        <button className="btn btn-secondary btn-lg pull-left" href="#" role="button"> Return</button>
                    </Link>
                </p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        recipes: state.recipes,
        currentUser: state.currentUser,
        queryString: state.queryString
    }
}


export default connect(mapStateToProps, {})(RecipePost)