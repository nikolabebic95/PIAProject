import * as React from "react"
import { withRouter } from "react-router-dom"

type LoginState = {
    username: string;
    password: string;
}

// TODO: Implement actual login
class Login extends React.Component<any, LoginState> {
    public constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    private handleSubmit(event): boolean {
        this.props.history.push("/");
        return true;
    }

    private handleUsernameChange(event) {
        this.setState(prevState => {
            let username_input = document.getElementById("username_input") as HTMLInputElement;

            return {
                username: username_input.value,
                password: prevState.password
            }
        })
    }

    private handlePasswordChange(event) {
        this.setState(prevState => {
            let password_input = document.getElementById("password_input") as HTMLInputElement;

            return {
                username: prevState.username,
                password: password_input.value
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
                                <div className="help-block text-right">
                                    <a href="/accounts/forgot_password">Forgot password ?</a>
                                </div>
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
