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


    render() {
        const { recipes } = this.props;
        let recipeList = recipes.map(recipe => {
            return <RecipeItem
                key={recipe.id}
                id={recipe.id}
                user={recipe.user}
                title={recipe.title}
                content={recipe.content}
            />
        })
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
                    {recipeList}
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