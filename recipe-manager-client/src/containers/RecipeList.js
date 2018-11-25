import React, { Component } from 'react'
import { connect } from "react-redux"
import { fetchRecipes, updateQueryString } from "../store/actions/recipes"
import RecipeItem from "../components/RecipeItem"

class IngredientList extends Component {

    componentDidMount() {
        const { user_id } = this.props.currentUser.user
        this.props.fetchRecipes(user_id, this.props.queryString);
    }

    handleUpdate = (e) => {
        const { user_id } = this.props.currentUser.user
        this.props.fetchRecipes(user_id, e.target.value)
    }

    renderRecipes = () => {
        const { recipes } = this.props;
        if (recipes[0]) {
            let recipeList = recipes.map(recipe => {
                return <RecipeItem
                    key={recipe.id}
                    id={recipe.id}
                    user={recipe.user}
                    title={recipe.title}
                    content={recipe.content}
                    image_url={recipe.image_url}
                    total_cost={recipe.total_cost}
                />
            })
            return recipeList
        }
        return (
            <div className='jumbotron'>
                <hr className="my-4" />
                <h1>No data</h1>
                <hr className="my-4" />
            </div>
        )
    }

    render() {

        return (
            <span className="col-sm-12">
                <label htmlFor='query'>Search Recipe</label>
                <input
                    type="text"
                    className='form-control'
                    name="query"
                    id="query"
                    placeholder='E.g: Cheese Cake'
                    value={this.props.queryString}
                    onChange={e => this.handleUpdate(e)}
                />
                <ul id='ingredients'>
                    {this.renderRecipes()}
                </ul>
            </span>
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

export default connect(mapStateToProps, { fetchRecipes, updateQueryString })(IngredientList)