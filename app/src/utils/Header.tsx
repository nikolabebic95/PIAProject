import * as React from "react"

type HeaderState = {
    loginMenu: boolean;
}

// TODO: Implement actual header
class Header extends React.Component<void, HeaderState> {
    public render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">ETF packages manager</a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse"
                            data-target="#navbar" aria-expanded="false" aria-controls="navbar"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item"><a href="#" className="nav-link">Partners</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Packages</a></li>
                        </ul>
                        <ul className="navbar-nav navbar-right">
                            <li className="dropdown open">
                                <a href="#" className="nav-link dropdown-toggle btn btn-default" data-toggle="dropdown"
                                   aria-expanded="true">
                                    Log in
                                    <span className="caret"></span>
                                </a>
                                <ul id="login-dp" className="dropdown-menu">
                                    <li>
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <form className="form" role="form" method="post" action="login"
                                                          accept-charset="UTF-8" id="login-nav">
                                                        <div className="form-group">
                                                            <label className="sr-only" htmlFor="exampleInputEmail2">
                                                                Email address
                                                            </label>
                                                            <input type="email" className="form-control"
                                                                   placeholder="Email address" required />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="sr-only"
                                                                   htmlFor="exampleInputPassword2">Password</label>
                                                            <input type="password" className="form-control"
                                                                   placeholder="Password" required />
                                                            <div className="help-block text-right">
                                                                <a href="#">Forgot password ?</a>
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
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href="#" data-toggle="modal" data-target="#modalRegister" className="nav-link">
                                    Register
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header
