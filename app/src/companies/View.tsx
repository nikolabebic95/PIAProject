import * as React from "react"

type ViewCompanyState = {
    company: Company,
    logo: any
}

class ViewCompany extends React.Component<any, ViewCompanyState> {
    public constructor(props) {
        super(props);
        this.state = {
            company: null,
            logo: null
        }
    }

    public componentDidMount() {
        fetch("http://localhost:56871/api/Companies/" + this.props.match.params.id, {method: 'GET'})
            .then(result => result.json())
            .then(data => this.setState(() => {
                if (!/http:\/\//.test(data.Address)) data.Address = "http://" + data.Address;

                fetch("http://localhost:56871/api/Data/" + this.props.match.params.id + "?type=company", {method: 'GET'})
                    .then(result => result.json())
                    .then(logoData => this.setState({
                        company: data,
                        logo: atob(logoData)
                    }));
            }));
    }

    public render() {
        return (
            this.state.company != null ? (
                <div>
                    <table className="table text-center">
                        <tr>
                            <td className="align-middle">
                                <h1 className="well">
                                    <a href={this.state.company.Address}>{this.state.company.Name}</a>
                                </h1>
                            </td>
                            <td>
                                <a href={this.state.company.Address}>
                                    <img width="100px" height="100px" src={this.state.logo}/>
                                </a>
                            </td>
                        </tr>
                    </table>
                    <div className="container text-center">
                        <div className="row">
                            <div className="col-md-4">
                                City: <b>{this.state.company.City}</b>
                            </div>
                            <div className="col-md-4">
                                Zip Code: <b>{this.state.company.ZipCode}</b>
                            </div>
                            <div className="col-md-4">
                                Country: <b>{this.state.company.Country}</b>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                Bank Account: <b>{this.state.company.BankAccount}</b>
                            </div>
                            <div className="col-md-4">
                                Currency: <b>{this.state.company.Currency}</b>
                            </div>
                            <div className="col-md-4">
                                Tax Number: <b>{this.state.company.TaxNumber}</b>
                            </div>
                        </div>
                        <br />
                        {
                            this.state.company.PhoneNumbers.length > 0 ? (
                                <div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            Phones:
                                        </div>
                                    </div>
                                    {
                                        this.state.company.PhoneNumbers.map(item => {
                                            return (
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        {item.PhoneNumber1}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <br/>
                                </div>
                            ) : (<div/>)
                        }
                        {
                            this.state.company.Emails.length > 0 ? (
                                <div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            Emails:
                                        </div>
                                    </div>
                                    {
                                        this.state.company.Emails.map(item => {
                                            return (
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        {item.Email1}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <br/>
                                </div>
                            ) : (<div/>)
                        }
                        <div className="row">
                            <div className="col-md-12">
                                <h4>Contact</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                {this.state.company.ContactName}
                            </div>
                            <div className="col-md-4">
                                {this.state.company.ContactPhone}
                            </div>
                            <div className="col-md-4">
                                {this.state.company.ContactEmail}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="alert alert-info text-center">
                    Loading
                </div>
            )
        )
    }
}

export default ViewCompany