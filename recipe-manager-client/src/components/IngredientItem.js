import React from "react"
import { Link } from "react-router-dom"

const IngredientItem = ({
    id,
    user,
    title,
    article_number,
    cost_per_unit,
    unit_of_measurement,
    unit_of_measure_amt,
}) => (
        <div>
            <li className='list-group-item'>
                <div className='ingredient-area'>
                    <div className='col-xs-12'>
                        <div className='col-xs-8'>
                            <h2>{title}</h2>
                        </div>
                        <div className='col-xs-4'>
                            <Link to={`/users/${user}/ingredients/${id}/edit/`} className='btn btn-warning'>
                                Edit
                            </Link>
                        </div>
                    </div>
                    <div className='col-xs-12'>
                        {article_number && (<h4>Article Number: {article_number}</h4>)}
                        <h4>€{cost_per_unit} per {unit_of_measure_amt} {unit_of_measurement}  </h4>
                    </div>
                    <div className='row'>
                    </div>
                </div>
            </li>
        </div>
    )

export default IngredientItem