import React, { Component } from "react"


class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const {onAuth, history, signUp} = this.props
        const { username, email, password } = this.state
        const authType = signUp ? "register/" : ''
        const loginData = signUp ? { username, email, password } : { username, password }
        onAuth(authType, loginData).then(() =>
            history.push('/')
        ).catch(() => {
            return;
        })
    }

    renderEmailOnSignUp = () => {
        const { email } = this.state
        if (this.props.signUp) {
            return (
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        id='email'
                        name='email'
                        className="form-control"
                        value={email}
                        onChange={this.handleChange}
                    />
                </div>
            )
        }
    }

    renderErrors = () => {
        if (this.props.errors.message) {
            return (
                <div className="alert alert-danger">
                    {this.props.errors.message}
                </div>
            )
        }
    }

    render() {
        const { username, password } = this.state
        const { heading, buttonText, history, removeError } = this.props

        history.listen(() => {
            removeError();
        })

        return (
            <div>
                <div className="row justify-content md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>

                            {this.renderErrors()}

                            {this.renderEmailOnSignUp()}

                            <label htmlFor='username'>Username</label>
                            <input
                                type="username"
                                id='username'
                                name='username'
                                className="form-control"
                                value={username}
                                onChange={this.handleChange}
                            />

                            <label htmlFor='password'>Password</label>
                            <input
                                type="password"
                                id='password'
                                name='password'
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                className="form-control"
                                value={password}
                                onChange={this.handleChange}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            />
                            <button className="btn btn-primary btn-block btn-lg">
                                {buttonText}
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        )
    }
}
export default AuthForm