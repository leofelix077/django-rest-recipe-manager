import React, { Component } from "react"
import { connect } from "react-redux"
import { postNewRecipe, updateRecipe } from "../store/actions/recipes"

class RecipeForm extends Component {
    state = {
        title: '',
        unit_of_measure_amt: '',
        complexity: '1',
        content: '',
        image_url: '',
        total_kcal: '',
        editMode: false,
        ingredients: {

        },
        selectedIngredient: '',
    }

    constructor(props) {
        super(props);
        const editFormData = this.loadFormDataFromParams()
        if (this.props.match.params.recipe_id && editFormData.length !== 0) {
            this.state = { ...editFormData[0], editMode: true };
        }
        if (!this.state.editMode && this.props.match.path === "/users/:id/recipes/:recipe_id/edit") {
            this.props.history.push(`/users/${this.props.match.params.id}/recipes/new`)
        }
    }

    loadFormDataFromParams = () => {
        let formData = this.props.recipes.filter(recipe => {
            if (`${recipe.id}` === `${this.props.match.params.recipe_id}`)
                return recipe
        })
        return formData
    }

    handleRecipe = event => this.state.editMode ? this.handleUpdateRecipe(event) : this.handleNewRecipe(event)

    handleNewRecipe = event => {
        event.preventDefault()
        this.props.postNewRecipe(this.state).then(() => {
            this.resetState()
        })
    }

    handleUpdateRecipe = event => {
        event.preventDefault()
        this.props.updateRecipe(this.state).then(() => {
            this.resetState()
        })
    }

    resetState = () => {
        this.setState({
            title: '',
            article_number: '',
            cost_per_unit: '',
            unit_of_measure_amt: '',
            unit_of_measurement: 'cL'
        })
        this.props.history.push('/')
    }

    renderIngredients = event => {
        if (event) event.preventDefault()
        return this.props.ingredients.map(ingredient => {
           return  <option value={ingredient.id}>{ingredient.title}</option>
        })
    }

    render() {
        return (
            <form onSubmit={this.handleRecipe}>

                <label htmlFor='title'>Recipe Name</label>
                <input
                    type="text"
                    className='form-control'
                    name="title"
                    id="title"
                    placeholder='E.g: Carrot'
                    defaultValue={this.state.title}
                    onChange={e => this.setState({ title: e.target.value })}
                />

                <label htmlFor='unit_of_measure_amt'>Ingredients</label>
                <div className="form-group row">
                    <div className="col-xs-2">
                        <input
                            type="number"
                            className='form-control'
                            name="unit_of_measure_amt"
                            id="unit_of_measure_amt"
                            value={this.state.unit_of_measure_amt}
                            onChange={e => this.setState({ unit_of_measure_amt: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-xs-2">
                        <select className='form-control' value={this.state.value} onChange={e => this.setState({ selectedIngredient: e.target.value })}>
                            {this.renderIngredients()}
                        </select>
                    </div>
                </div>

                <button type='submit' className='btn btn-success pull-left'>
                    {this.state.editMode ? ('Update') : ('Create')}
                </button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.ingredients)
    return {
        errors: state.errors,
        recipes: state.recipes,
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps, { postNewRecipe, updateRecipe })(RecipeForm)