import React, { Component } from "react";
import { Provider } from "react-redux"
import { configureStore } from "../store"
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from "./Navbar"
import Main from "./Main"
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";
import jwtDecode from 'jwt-decode'

const store = configureStore();

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken)
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
    } catch (error) {
        store.dispatch(setCurrentUser({}))
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <div className='onboarding navbar-fixed-top'>
                            <Navbar />
                        </div>
                        <div className='onboarding'>
                            <Main />
                        </div>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;