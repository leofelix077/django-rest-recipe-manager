import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import Homepage from "../components/Homepage"
import AuthForm from "../components/AuthForm"
import authUser from "../store/actions/auth"
import { removeError } from "../store/actions/errors"
import { fetchIngredients } from "../store/actions/ingredients"
import { fetchRecipes } from "../store/actions/recipes"
import  withAuth  from "../hocs/withAuth"
import  IngredientForm  from '../containers/IngredientForm'
import  RecipeForm  from './RecipeForm'
import  RecipePost  from './RecipePost'

const Main = props => {
    const { authUser, errors, removeError, currentUser } = props
    return (
        <div className="container">
            <Switch>
                <Route exact path='/' render={props => <Homepage currentUser={currentUser} {...props} />} />

                <Route exact path='/signin' render={props => {
                    return (
                        <AuthForm
                            errors={errors}
                            removeError={removeError}
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
                            errors={errors}
                            removeError={removeError}
                            signUp
                            buttonText="Sign Up"
                            onAuth={authUser}
                            heading="Start Managing Your Recipes"
                            {...props}
                        />
                    )
                }} />

                <Route exact path='/users/:id/ingredients/new' component={withAuth(IngredientForm)} />
                <Route exact path='/users/:id/ingredients/:ing_id/edit' component={withAuth(IngredientForm)} />

                <Route exact path='/users/:id/recipes/new' component={withAuth(RecipeForm)} />
                <Route exact path='/users/:id/recipes/:recipe_id/' component={withAuth(RecipePost)} />
                <Route exact path='/users/:id/recipes/:recipe_id/edit' component={withAuth(RecipeForm)} />

            </Switch>
        </div>
    )
}

function mapStateToProps(state) {
    const { currentUser, errors, queryString } = state
    return {
        currentUser,
        errors,
        queryString
    }
}

export default withRouter(connect(mapStateToProps, { authUser, removeError, fetchIngredients, fetchRecipes })(Main))