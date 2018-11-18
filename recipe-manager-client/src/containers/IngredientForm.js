import React, { Component } from "react"
import { connect } from "react-redux"
import { postNewIngredient, updateIngredient } from "../store/actions/ingredients"

class IngredientForm extends Component {
    constructor(props) {
        super(props);

        let editFormData = this.props.ingredients.filter(ingredient => {
            if (`${ingredient.id}` === `${this.props.match.params.ing_id}`)
                return ingredient
        })
        if (this.props.match.params.ing_id && editFormData.length !== 0) {
            this.state = { ...editFormData[0], editMode: true };
        }
        else {
            this.state = {
                title: '',
                article_number: '',
                cost_per_unit: '',
                unit_of_measure_amt: '',
                unit_of_measurement: 'cL',
            }
        }
    }

    handleIngredient = event => {
        if (!this.state.editMode) {
            this.handleNewIngredient(event)
        } else {
            this.handleUpdateIngredient(event)
        }
        this.props.history.push('/')
    }

    handleNewIngredient = event => {
        event.preventDefault()
        this.props.postNewIngredient(this.state)
        this.setState({
            title: '',
            article_number: '',
            cost_per_unit: '',
            unit_of_measure_amt: '',
            unit_of_measurement: 'cL'
        })
    }

    handleUpdateIngredient = event => {
        event.preventDefault()
        this.props.updateIngredient(this.state)
        this.setState({
            title: '',
            article_number: '',
            cost_per_unit: '',
            unit_of_measure_amt: '',
            unit_of_measurement: 'cL'
        })
    }

    render() {
        return (
            <form onSubmit={this.handleIngredient}>

                <label htmlFor='title'>Ingredient Name</label>
                <input
                    type="text"
                    className='form-control'
                    name="title"
                    id="title"
                    placeholder='E.g: Carrot'
                    defaultValue={this.state.title}
                    onChange={e => this.setState({ title: e.target.value })}
                />

                <label htmlFor='article_number'>Article Number</label>
                <input
                    type="text"
                    className='form-control'
                    name="article_number"
                    id="article_number"
                    placeholder='111 222 333 444'
                    value={this.state.article_number}
                    onChange={e => this.setState({ article_number: e.target.value })}
                />

                <label htmlFor='cost_per_unit'>Cost Per Unit (EUR)</label>
                <input
                    type="number"
                    className='form-control'
                    name="cost_per_unit"
                    id="cost_per_unit"
                    value={this.state.cost_per_unit}
                    onChange={e => this.setState({ cost_per_unit: e.target.value })}
                />
                <label htmlFor='unit_of_measure_amt'>Quantity</label>
                <div className="form-group row">
                    <div className="col-xs-2">
                        <input
                            type="number"
                            className='form-control'
                            name="unit_of_measure_amt"
                            id="unit_of_measure_amt"
                            value={this.state.unit_of_measure_amt}
                            onChange={e => this.setState({ unit_of_measure_amt: e.target.value })}
                        />
                    </div>
                    <div className="col-xs-2">
                        <select className='form-control' value={this.state.value} onChange={e => this.setState({ unit_of_measurement: e.target.value })}>
                            <option value="cL">Centiliters</option>
                            <option value="l">Liters</option>
                            <option value="g">Grams</option>
                            <option value="kg">Kilograms</option>
                        </select>
                    </div>
                </div>

                <button type='submit' className='btn btn-success pull-left'>
                    {this.state.editMode ? ('Update') : ('Submit')}
                </button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors,
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps, { postNewIngredient, updateIngredient })(IngredientForm)