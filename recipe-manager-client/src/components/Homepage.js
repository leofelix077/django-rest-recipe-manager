import React from "react"
import { Link } from "react-router-dom"
import IngredientDashboard from './IngredientDashboard'

const renderHomepage = () => {
    return (
        <div className="home-hero">
            <h1><strong>Y</strong>our</h1>
            <h1><strong>R</strong>ecipe</h1>
            <h1><strong>M</strong>anager</h1>
            <Link to="/signup" className="btn btn-outline-primary">
                Sign Up
        </Link>
        </div>
    )
}

const Homepage = ({ currentUser }) => {
    if (!currentUser.isAuthenticated) {
        { return renderHomepage() }
    }
    return (
        <div>
            <IngredientDashboard />
        </div>
    )
}

export default Homepage