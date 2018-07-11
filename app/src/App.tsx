import * as React from "react"
import Timer = NodeJS.Timer
import LocalStorageUtility from "./utils/LocalStorageUtility";

const logo = require("./logo.svg") as string;

type AppState = {
    date: Date;
}

class App extends React.Component<void, AppState> {
    private interval: Timer;

    public constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    private tick(): void {
        this.setState({date: new Date()});
    }

    public componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    public componentWillUnmount() {
        clearInterval(this.interval);
    }

    public render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Etf packages manager</h1>
                    <p>Manage ETF with ease</p>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <a href="/announcements/list" className="btn btn-primary btn-block btn-info">Announcements</a>
                    </div>
                    <div className="col-md-6">
                        <a href="/lectures/list" className="btn btn-primary btn-block btn-info">Lectures</a>
                    </div>
                </div>
                <br/>
                {
                    LocalStorageUtility.hasRole("u") ? (
                        <div>
                            <div className="row">
                                <div className="col-md-3">
                                    <a href="/companies/add"
                                       className="btn btn-primary btn-block btn-success">Add company</a>
                                </div>
                                <div className="col-md-3">
                                    <a href="/companies/list"
                                       className="btn btn-primary btn-block btn-success">Search companies</a>
                                </div>
                                <div className="col-md-3">
                                    <a href="/announcements/add"
                                       className="btn btn-primary btn-block btn-success">Add announcement</a>
                                </div>
                                <div className="col-md-3">
                                    <a href="/lectures/add"
                                       className="btn btn-primary btn-block btn-success">Add lecture</a>
                                </div>
                            </div>
                            <br />
                        </div>
                    ) : (
                        <div />
                    )
                }
                {
                    LocalStorageUtility.hasRole("m") ? (
                        <div>
                            <div className="row">
                                <div className="col-md-12">
                                    <a href="/misc/dashboard"
                                       className="btn btn-primary btn-block btn-warning">Dashboard</a>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-3">
                                    <a href="/misc/add_files"
                                       className="btn btn-primary btn-block btn-warning">Add files</a>
                                </div>
                                <div className="col-md-3">
                                    <a href="/companies/link"
                                       className="btn btn-primary btn-block btn-warning">Link company to user</a>
                                </div>
                                <div className="col-md-3">
                                    <a href="/contracts/add_donor"
                                       className="btn btn-primary btn-block btn-warning">Add donor contract</a>
                                </div>
                                <div className="col-md-3">
                                    <a href="/contracts/add_money"
                                       className="btn btn-primary btn-block btn-warning">Add money contract</a>
                                </div>
                            </div>
                            <br />
                        </div>
                    ) : (<div/>)
                }
                {
                    LocalStorageUtility.hasRole("a") ? (
                        <div className="row">
                            <div className="col-md-6">
                                <a href="/accounts/approve"
                                   className="btn btn-primary btn-block btn-danger">Approve new users</a>
                            </div>
                            <div className="col-md-6">
                                <a href="/packages/add"
                                   className="btn btn-primary btn-block btn-danger">Add new packages</a>
                            </div>
                        </div>
                    ) : (
                        <div />
                    )
                }
            </div>
        )
    }
}

export default App
