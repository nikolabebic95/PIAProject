import * as React from "react"
import Login from "../accounts/Login";
import LocalStorageUtility from "./LocalStorageUtility";

type HeaderState = {
    loggedIn: boolean
}

class Header extends React.Component<any, HeaderState> {
    public constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };

        this.logOut = this.logOut.bind(this);

        setInterval(() => {
            this.setState({
                loggedIn: LocalStorageUtility.hasRole("u")
            })
        }, 0)
    }

    private logOut() {
        LocalStorageUtility.logOut();
    }

    public render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">ETF packages manager</a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse"
                            data-target="#navbar" aria-expanded="false" aria-controls="navbar"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="navbar-collapse collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item"><a href="#" className="nav-link">Partners</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Packages</a></li>
                        </ul>
                        {
                            this.state.loggedIn ? (
                                <ul className="navbar-nav navbar-right">
                                    <a href="#" onClick={this.logOut} className="nav-link">
                                        Logout
                                    </a>
                                </ul>
                            ) : (
                                <ul className="navbar-nav navbar-right">
                                    <li className="dropdown" id="login_dropdown">
                                        <a href="/" className="nav-link dropdown-toggle btn btn-default" data-toggle="dropdown">
                                            Log in
                                            <span className="caret" />
                                        </a>
                                        <ul id="login-dp" className="dropdown-menu">
                                            <li>
                                                <Login/>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/accounts/signup" className="nav-link">
                                            Register
                                        </a>
                                    </li>
                                </ul>
                            )
                        }
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header
