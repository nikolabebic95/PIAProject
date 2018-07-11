import * as React from "react"
import { withRouter } from "react-router-dom"
import LocalStorageUtility from "../utils/LocalStorageUtility";
const sha = require("crypto-js/sha256");

type LoginState = {
    username: string,
    password: string,
    message: string
}

// TODO: Implement actual login
class Login extends React.Component<any, LoginState> {
    public constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            message: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    private handleSubmit(event): boolean {
        let username = this.state.username;
        let password = JSON.stringify(sha(this.state.password));

        let loginRequest = {
            Username: username,
            Password: password
        };

        fetch("http://localhost:56871/api/Login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginRequest)
        }).then(result => result.json()).then(data => {
            if (data.Message) {
                this.setState(prevState => {
                    return {
                        username: prevState.username,
                        password: "",
                        message: data.Message
                    }
                })
            } else {
                LocalStorageUtility.logIn(data);
            }
        });

        event.preventDefault();
        return false;
    }

    private handleUsernameChange() {
        this.setState(prevState => {
            let username_input = document.getElementById("username_input") as HTMLInputElement;

            return {
                username: username_input.value,
                password: prevState.password,
                message: ""
            }
        })
    }

    private handlePasswordChange() {
        this.setState(prevState => {
            let password_input = document.getElementById("password_input") as HTMLInputElement;

            return {
                username: prevState.username,
                password: password_input.value,
                message: ""
            }
        })
    }

    public render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <form className="form" role="form" onSubmit={this.handleSubmit}
                              acceptCharset="UTF-8" id="login-nav">
                            <div className="form-group">
                                <label className="sr-only" htmlFor="exampleUsername12">
                                    Username
                                </label>
                                <input id="username_input" type="text" className="form-control"
                                       placeholder="Username" onChange={this.handleUsernameChange} required />
                            </div>
                            <div className="form-group">
                                <label className="sr-only"
                                       htmlFor="exampleInputPassword2">Password</label>
                                <input id="password_input" type="password" className="form-control"
                                       placeholder="Password" onChange={this.handlePasswordChange} required />
                                {
                                    this.state.message.length > 0 ? (
                                        <div className="alert alert-danger">
                                            {this.state.message}
                                        </div>
                                    ) : (<div />)
                                }
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)
