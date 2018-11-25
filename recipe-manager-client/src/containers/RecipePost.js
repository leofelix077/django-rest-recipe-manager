import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchRecipe } from "../store/actions/selectedRecipe"
import { fetchIngredient } from "../store/actions/selectedIngredient"
import { fetchRecipeDetails } from "../store/actions/recipeDetails"

class RecipePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIngredient: [],
            selectedRecipeDetails: []
        }
    }

    componentDidMount() {
        const { id, recipe_id } = this.props.match.params
        this.props.fetchRecipe(recipe_id)
        this.props.fetchRecipeDetails(id, recipe_id).then(selectedRecipeDetails => {
            this.setState({ selectedRecipeDetails })
        }).then(() => this.fetchIngredientDetails())
    }

    fetchIngredientDetails = () => {
        this.state.selectedRecipeDetails.map((selectedRecipeDetail => {
            this.props.fetchIngredient(selectedRecipeDetail.ingredient).then((selectedIngredient) => {
                this.setState({ selectedIngredient: [...this.state.selectedIngredient, { ...selectedIngredient }] })
            })
        }))
    }

    componentDidUpdate() {
        console.log(this.props)
    }

    renderIngredients = () => {
        if (this.props.recipeDetails) {
            return this.props.recipeDetails.map((recipeIngredient) => {
                return (
                    <li className="list-group-item">
                        {recipeIngredient.id}:{recipeIngredient.ingredient_amount}
                    </li>
                )
            })
        }

    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">{this.props.selectedRecipe && (this.props.selectedRecipe.title)}</h1>
                <hr className="my-4" />
                <p>Ingredient List</p>
                <div className="row">
                    <ul className='list-group col-xs-5'>
                        <img className='col-xs-12' src={this.props.selectedRecipe && (this.props.selectedRecipe.image_url)} />
                    </ul>

                    <ul className="list-group col-xs-5">
                        {this.renderIngredients()}
                    </ul>

                    <ul className="list-group col-xs-12">
                        <hr className="my-4" />
                        <h2 className="display-4">Preparation</h2>
                        <li className="list-group-item text-justify">
                            {this.props.selectedRecipe && (this.props.selectedRecipe.content)}
                        </li>
                    </ul>

                    <ul className="list-group col-xs-12">
                        <h2 className="display-4">Total Cost</h2>
                        <li className="list-group-item text-justify col-xs-2">
                            €{this.props.selectedRecipe && (this.props.selectedRecipe.total_cost)}
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