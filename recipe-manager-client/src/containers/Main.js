import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import Homepage from "../components/Homepage"
import AuthForm from "../components/AuthForm"
import authUser from "../store/actions/auth"

const Main = props => {
    const { authUser } = props
    return (
        <div className="container">
            <Switch>
                <Route exact path='/' render={props => <Homepage {...props} />} />
                <Route exact path='/signin' render={props => {
                    return (
                        <AuthForm
                            buttonText="Log In"
                            onAuth={authUser}
                            heading="Welcome Back"
                            {...props}
                        />
                    )
                }} />
                <Route exact path='/signup' render={props => {
                    return (
                        <AuthForm
                            signUp
                            buttonText="Sign Up"
                            onAuth={authUser}
                            heading="Start Managing Your Recipes"
                            {...props}
                        />
                    )
                }} />
            </Switch>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, { authUser })(Main))