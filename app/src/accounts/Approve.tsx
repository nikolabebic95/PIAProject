import * as React from "react";

type ApproveUsersState = {
    users: UserTable[]
}

class ApproveUsers extends React.Component<any, ApproveUsersState> {
    public constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    private approve(index) {
        let user = this.state.users[index];

        fetch("http://localhost:56871/api/Approve", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user.Id)
        }).then(() => this.componentDidMount())
    }

    public componentDidMount() {
        fetch("http://localhost:56871/api/UserTables?newOnly=true", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState({
                users: items
            }));
    }

    public render() {
        return this.state.users.length > 0 ? (
            <div className="container text-center">
                <h1 className="well">
                    Approve users
                </h1>
                {
                    this.state.users.map((user, index) => {
                        return (
                            <div className="row">
                                <div className="col-md-3">
                                    {user.FirstName} {user.LastName}
                                </div>
                                <div className="col-md-3">
                                    {user.Username}
                                </div>
                                <div className="col-md-3">
                                    {user.Email}
                                </div>
                                <div className="col-md-3">
                                    <button type="button" className="btn btn-md btn-success"
                                            onClick={() => this.approve(index)}>
                                        Approve
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        ) : (
            <div className="container alert alert-info text-center">
                No data
            </div>
        )
    }
}

export default ApproveUsers