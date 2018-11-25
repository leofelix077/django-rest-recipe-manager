import React from "react"
import { Link } from "react-router-dom"

const RecipeItem = ({
    id,
    user,
    title,
    content,
    image_url
}) => (
        <div>
            <li className='list-group-item row'>
                <div className='col-xs-2'>
                    <img id='image-recipe-small' className='rounded mx-auto d-block' src={image_url || 'https://www.digitalcitizen.life/sites/default/files/styles/lst_small/public/featured/2016-08/photo_gallery.jpg'} />
                </div>
                <div className='ingredient-area'>

                    <h2>{title}</h2>
                    
                    <Link to={`/users/${user}/recipes/${id}/`}>
                        <button className='btn btn-info'>
                            Display
                        </button>
                    </Link>

                    <Link to={`/users/${user}/recipes/${id}/edit/`}>
                        <button className='btn btn-warning'>
                            Edit
                        </button>
                    </Link>


                </div>
                <blockquote className='blockquote'>
                    <p className='text-left text-justify text-muted mb-0'>{content}</p>
                </blockquote>
            </li>
        </div>
    )

export default RecipeItem