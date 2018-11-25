import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchRecipe } from "../store/actions/selectedRecipe"
import { fetchIngredient } from "../store/actions/selectedIngredient"
import { fetchRecipeDetails } from "../store/actions/recipeDetails"

class RecipePost extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log(this.props.history)
        const { id, recipe_id } = this.props.match.params
        this.props.fetchRecipe(recipe_id)
        this.props.fetchRecipeDetails(id, recipe_id).then(() => {
            this.props.recipeDetails.map((selectedRecipeDetail => {
                this.props.fetchIngredient(selectedRecipeDetail.ingredient)
            }))
        })

    }

    renderIngredients = () => {
        if (this.props.recipeDetails) {
            return this.props.recipeDetails.map((recipeIngredient) => {
                let ingredient;
                if (this.props.selectedIngredient)
                    ingredient = this.props.selectedIngredient.selectedIngredient.find((ingredient) => ingredient.id === recipeIngredient.ingredient)
                return (
                    <li className="list-group-item">
                        {ingredient && (ingredient.title)} : {recipeIngredient.ingredient_amount} {ingredient && (ingredient.unit_of_measurement)}
                    </li>
                )
            })
        }
    }

    render() {
        return (
            <div className="jumbotron">
                <h1>{this.props.selectedRecipe && (this.props.selectedRecipe.title)}</h1>
                <hr className="my-4" />
                <p>Ingredient List</p>
                <div className="row">
                    <ul className='list-group col-xs-5'>
                        <img className='col-xs-12 recipe-detail-image' src={this.props.selectedRecipe && (this.props.selectedRecipe.image_url)} />
                    </ul>

                    <ul className="list-group col-xs-5">
                        {this.renderIngredients()}
                    </ul>

                    <ul className="list-group col-xs-12">
                        <hr className="my-4" />
                        <h2>Preparation</h2>
                        <pre className='text-justify list-group-item'>{this.props.selectedRecipe && (this.props.selectedRecipe.content)}</pre>
                    </ul>

                    <ul className="list-group col-xs-6 pull-right">
                        <h2>Summary</h2>

                        <li className="list-group-item text-justify col-xs-6">
                            <h3>Total Cost</h3>
                            <h2>€{this.props.selectedRecipe && (this.props.selectedRecipe.total_cost)}</h2>
                        </li>

                        <li className="list-group-item text-justify col-xs-6">
                            <h3>Total kCal</h3>
                            <h2>{this.props.selectedRecipe && (this.props.selectedRecipe.total_kcal)}</h2>
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
        currentUser: state.currentUser,
        recipeDetails: state.recipeDetails,
        selectedRecipe: state.selectedRecipe,
        selectedIngredient: state.selectedIngredient,
    }
}


export default connect(mapStateToProps, {
    fetchRecipe,
    fetchRecipeDetails,
    fetchIngredient
})(RecipePost)