import React from "react"
import { Link } from "react-router-dom"

const RecipeItem = ({
    id,
    user,
    title,
    content
}) => (
        <div>
            <li className='list-group-item'>
                <div className='ingredient-area'>
                    <Link to={`/users/${user}/recipes/${id}/edit/`}><h2>{title}</h2></Link>
                    <div >
                        <p className='text-left text-justify'>{content}</p>
                    </div>
                </div>
            </li>
        </div>
    )

export default RecipeItem