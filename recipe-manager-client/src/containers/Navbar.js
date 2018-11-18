import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand">
                        <img src='https://image.flaticon.com/icons/svg/114/114968.svg' alt="Recipe Manager Home" />
                    </Link>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to='/signup'>Sign Up</Link>
                        </li>
                        <li>
                            <Link to='/signin'>Sign In</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, null)(Navbar)