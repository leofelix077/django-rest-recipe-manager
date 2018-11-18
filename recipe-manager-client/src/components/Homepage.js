import React from "react"
import { Link } from "react-router-dom"

const Homepage = () => (
    <div className="home-hero">
        <h1><strong>Y</strong>our</h1>
        <h1><strong>R</strong>ecipe</h1>
        <h1><strong>M</strong>anager</h1>
        <Link to="/signup" className="btn btn-outline-primary">
            Sign Up
        </Link>
    </div>
)

export default Homepage