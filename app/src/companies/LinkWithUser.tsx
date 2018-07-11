import * as React from "react";

type LinkWithUserState = {
    users: UserTable[],
    companies: Company[],
    current_user: number,
    current_company: number
}

class LinkWithUser extends React.Component<any, LinkWithUserState> {
    public constructor(props) {
        super(props);
        this.state = {
            users: [],
            companies: [],
            current_user: 0,
            current_company: 0
        };

        this.submitForm = this.submitForm.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    public componentDidMount() {
        fetch("http://localhost:56871/api/UserTables", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState(prevState => {
                return {
                    users: items,
                    companies: prevState.companies,
                    current_user: items[0].Id,
                    current_company: prevState.current_company
                }
            }));

        fetch("http://localhost:56871/api/Companies", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState(prevState => {
                return {
                    users: prevState.users,
                    companies: items,
                    current_user: prevState.current_user,
                    current_company: items[0].Id
                }
            }));
    }

    private submitForm() {
        let entry = {
            UserTableId: this.state.current_user,
            CompanyId: this.state.current_company
        };

        fetch("http://localhost:56871/api/CooperatesWiths", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry)
        }).then(() => {
            // Do nothing
        });

        this.props.history.push("/");
        return true;
    }

    private updateState() {
        let user = document.getElementById("user") as HTMLSelectElement;
        let company = document.getElementById("company") as HTMLSelectElement;

        this.setState(prevState => {
            return {
                users: prevState.users,
                companies: prevState.companies,
                current_user: parseInt(user.options[user.selectedIndex].value, 10),
                current_company: parseInt(company.options[company.selectedIndex].value, 10)
            }
        })
    }

    public render() {
        return (
            <div className="container text-center">
                <h1 className="well">Link user with company</h1>
                <form className="form" role="form" onSubmit={this.submitForm} acceptCharset="UTF-8">
                    <div className="row">
                        <div className="col-md-6">
                            {
                                this.state.users.length ? (
                                    <div>
                                        <label>User</label>
                                        <select className="form-control" id="user" onChange={this.updateState}>
                                            {
                                                this.state.users.map(user => {
                                                    return (
                                                        <option value={user.Id}>{user.FirstName} {user.LastName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                ) : (
                                    <div className="alert alert-info">
                                        Loading...
                                    </div>

                                )
                            }
                        </div>
                        <div className="col-md-6">
                            {
                                this.state.companies.length ? (
                                    <div>
                                        <label>Company</label>
                                        <select className="form-control" id="company" onChange={this.updateState}>
                                            {
                                                this.state.companies.map(company => {
                                                    return (
                                                        <option value={company.Id}>{company.Name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                ) : (
                                    <div className="alert alert-info">
                                        Loading...
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-lg btn-info">Submit</button>
                </form>
            </div>
        )
    }
}

export default LinkWithUser;
