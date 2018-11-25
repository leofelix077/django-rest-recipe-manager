import React from "react"
import { Link } from "react-router-dom"

const RecipeItem = ({
    id,
    user,
    title,
    content,
    image_url,
    total_cost
}) => (
        <div>
            <li className='list-group-item row'>
                <div className='col-xs-2'>
                    <img id='image-recipe-small' className='rounded mx-auto d-block' src={image_url || 'https://www.digitalcitizen.life/sites/default/files/styles/lst_small/public/featured/2016-08/photo_gallery.jpg'} />
                </div>
                <div className='ingredient-area'>

                    <h2>{title}</h2>
                    <div className='col-xs-8'>
                        <h2> €{total_cost}</h2>
                    </div>
                    <div className='row'>
                    <div className='col-xs-6'>
                        <Link to={`/users/${user}/recipes/${id}/`} className='btn btn-info'>
                            Show More
                        </Link>
                    </div>
                    <div className='col-xs-6'>
                        <Link to={`/users/${user}/recipes/${id}/edit/`} className='btn btn-warning pull-right'>
                            Edit
                        </Link>
                    </div>
                    </div>
                </div>
                <blockquote className='blockquote recipe-content'>
                    <p className='text-left text-justify text-muted mb-0'>{content}</p>
                </blockquote>
            </li>
        </div>
    )

export default RecipeItem