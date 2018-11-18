import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logout } from "../store/actions/auth"

class Navbar extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
    }

    renderAuthenticatedRoutes = () => {
        return (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link
                        to={`/users/${this.props.currentUser.user.user_id}/recipes/new`}>
                        Add Recipe
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/users/${this.props.currentUser.user.user_id}/ingredients/new`}>
                        Add Ingredient
                    </Link>
                </li>
                <li>
                    <a onClick={this.logout}>Log out</a>
                </li>
            </ul>
        )
    }

    renderSignInAndSignUpRoutes = () => {
        return (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to="/signup">Sign up</Link>
                </li>
                <li>
                    <Link to="/signin">Log in</Link>
                </li>
            </ul>
        )
    }

    render() {
        return (
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">
                            <img src='https://cdn2.iconfinder.com/data/icons/cheficon/100/chef_cook_7-512.png' alt="Recipe Manager Home" />
                        </Link>
                    </div>
                    {this.props.currentUser.isAuthenticated ? (this.renderAuthenticatedRoutes()) : (this.renderSignInAndSignUpRoutes())}
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, { logout })(Navbar)