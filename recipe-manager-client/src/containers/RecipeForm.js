import React, { Component } from "react"
import { connect } from "react-redux"
import { postNewRecipe, updateRecipe } from "../store/actions/recipes"
import { fetchIngredients, postMapIngredientsToRecipes } from "../store/actions/ingredients"

class RecipeForm extends Component {
    componentDidMount() {
        this.props.fetchIngredients(this.props.currentUser.user.user_id).then(() => {
            this.props.ingredients.map((ingredient, index) => {
                this.setState({ ingredients: [...this.state.ingredients, { ...ingredient, selected: false, unit_of_measure_amt: 0 }] })
            })
            this.setState({ selectedValue: '' })
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            complexity: '1',
            content: '',
            image_url: '',
            total_kcal: '',
            editMode: false,
            ingredients: [
            ],
        }
    }

    handleNewRecipe = event => {
        event.preventDefault()
        const { user, title, complexity, content, image_url, total_kcal } = this.state
        this.props.postNewRecipe({ user, title, complexity, content, image_url, total_kcal })
            .then((recipe) => {
                this.props.postMapIngredientsToRecipes(this.state, recipe.id)
                    .then(() => this.props.history.push('/'))

            })
    }

    handleIngredientSelection = (value) => {
        const ingredients = this.state.ingredients
        ingredients[value].selected = true
        this.setState({ ingredients })
    }

    handleIngredientAmountUpdate = (value, i) => {
        const ingredients = this.state.ingredients
        ingredients[i].unit_of_measure_amt = value
        this.setState({ ingredients })

    }

    handleIngredientRemoval = (index) => {
        let ingredients = this.state.ingredients
        ingredients[index].selected = false
        this.setState({ ingredients })
    }

    renderIngredientInput = () => {
        let items = []

        items.push(<label htmlFor='unit_of_measure_amt'>Ingredient</label>)
        for (let i = 0; i < this.state.ingredients.length; i++) {
            if (this.state.ingredients[i].selected)
                items.push(
                    <div>
                        <h5 className='col-xs-2 font-weight-bold' id='unit_of_measurement'>
                            {this.state.ingredients[i] && (this.state.ingredients[i].title)}
                        </h5>
                        <div className="form-group row">
                            <div className="col-xs-2">
                                <input
                                    type="number"
                                    className='form-control'
                                    name="unit_of_measure_amt"
                                    id="unit_of_measure_amt"
                                    value={this.state.ingredients[i].unit_of_measure_amt}
                                    onChange={e => this.handleIngredientAmountUpdate(e.target.value, i)}
                                    required
                                />
                            </div>
                            <h4 className='col-xs-1' id='unit_of_measurement'>{this.state.ingredients[i] && (this.state.ingredients[i].unit_of_measurement)}</h4>
                            <h4 className='col-xs-1' id='unit_of_measurement'>€{this.state.ingredients[i] && (
                                (this.state.ingredients[i].unit_of_measure_amt / this.state.ingredients[i].cost_per_unit).toFixed(2)
                            )}</h4>
                            <button type="button" className='btn btn-danger' onClick={e => this.handleIngredientRemoval(i)}>Delete</button>
                        </div>
                    </div>
                )
        }
        return items
    }

    renderIngredientSelectOption = event => {
        return (
            <select
                className='form-control'
                value={this.state.selectedValue}
                onChange={e => this.handleIngredientSelection(e.target.value)}
            >
                <option disabled selected value={this.state.selectedValue ? this.state.selectedValue : ''}> -- Select an ingredient -- </option>
                {this.state.ingredients.map((ingredient, index) => {
                    if (!ingredient.selected)
                        return <option key={index} value={index}>{ingredient.title}</option>
                }
                )}
            </select>
        )

    }

    renderTitle = () => {
        return (
            <span>
                <label htmlFor='title'>Recipe Name</label>
                <input
                    type="text"
                    className='form-control'
                    name="title"
                    id="title"
                    placeholder='E.g: Cheese Cake'
                    defaultValue={this.state.title}
                    onChange={e => this.setState({ title: e.target.value })}
                    required
                />
            </span>
        )
    }

    renderContent = () => {
        return (
            <div>
                <label htmlFor='content'>Description</label>
                <textarea
                    type="text"
                    className='form-control'
                    name="content"
                    id="content"
                    defaultValue={this.state.title}
                    onChange={e => this.setState({ content: e.target.value })}
                    required
                />
            </div>
        )
    }

    renderTotalKcal = () => {
        return (
            <div>
                <label htmlFor='total_kcal'>Total kCal</label>
                <input
                    type="number"
                    className='form-control'
                    name="total_kcal"
                    id="total_kcal"
                    defaultValue={this.state.total_kcal}
                    onChange={e => this.setState({ total_kcal: e.target.value })}
                    required
                />
            </div>
        )
    }

    renderImage = () => {
        return (
            <div>
                <label htmlFor='image_url'>Image URL</label>
                <input
                    type="text"
                    className='form-control'
                    name="image_url"
                    id="image_url"
                    defaultValue={this.state.image_url}
                    onChange={e => this.setState({ image_url: e.target.value })}
                    required
                />
                <img id='image-recipe' className='rounded mx-auto d-block' src={this.state.image_url} />
            </div>
        )
    }

    renderTotalCost = () => {
        let result = this.state.ingredients
            .map(ingredient => ingredient.unit_of_measure_amt / ingredient.cost_per_unit)
            .reduce((acc, value) => acc = acc + value, 0)
            .toFixed(2)

        return (
            <div className='col-xs-5'>
                <h4 id='total-cost'>Total Cost: {result}</h4>
            </div>
        )

    }

    render() {
        return (
            <form onSubmit={this.handleNewRecipe}>

                {this.renderTitle()}
                <div className='row'>
                    {this.renderIngredientInput()}
                    <div className='col-xs-2'>
                        {this.renderIngredientSelectOption()}

                    </div>
                </div>

                <div className='row'>
                    <div className='col-xs-5'>
                        {this.renderTotalKcal()}
                    </div>
                    <div className='col-xs-5'>
                        {this.renderTotalCost()}
                    </div>
                </div>

                <div className='row'>
                    {this.renderContent()}
                </div>

                <div className='row'>
                    {this.renderImage()}
                </div>

                <button type='submit' className='btn btn-success pull-left'>
                    {this.state.editMode ? ('Update') : ('Create')}
                </button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors,
        recipes: state.recipes,
        ingredients: state.ingredients,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, {
    postNewRecipe,
    updateRecipe,
    fetchIngredients,
    postMapIngredientsToRecipes
})(RecipeForm)