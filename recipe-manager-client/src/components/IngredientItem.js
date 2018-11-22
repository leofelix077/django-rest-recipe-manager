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
                    <Link to={`/users/${user}/ingredients/${id}/edit/`}><h2>{title}</h2></Link>
                    <div>
                        {article_number && (<h4>Article Number: {article_number}</h4>)}
                    </div>
                    <div>
                        <h4>€{cost_per_unit} per {unit_of_measure_amt} {unit_of_measurement}  </h4>
                    </div>
                </div>
            </li>
        </div>
    )

export default IngredientItem