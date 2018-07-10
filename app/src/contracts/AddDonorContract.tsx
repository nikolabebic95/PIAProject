import * as React from "react"
import {findFirst, getDateFromString, getDatePlusYears, getStringFromDate, getTodayInputString} from "../utils/utils";

type AddDonorContractState = {
    contract: DonorContract,
    message: string,
    companies: Company[],
    packages: Package[],
    statuses: ContractStatus[],
    is_payment_made: boolean
}

class AddDonorContract extends React.Component<any, AddDonorContractState> {
    public constructor(props) {
        super(props);
        this.state = {
            contract: {
                EstimatedValue: 0,
                Description: "",
                Amount: 0,
                DeliveryDate: "",
                Contract: {
                    Id: 0,
                    StartDate: getTodayInputString(),
                    EndDate: "",
                    Comment: "",
                    IsActive: false,
                    CompanyId: 0,
                    Company: null,
                    PackageId: 0,
                    Package: null,
                    ContractStatus: null,
                    StatusId: 0
                },
                ContractId: 0
            },
            message: "",
            companies: [],
            packages: [],
            statuses: [],
            is_payment_made: false
        };

        this.submitForm = this.submitForm.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    private submitForm() {
        let contract = this.state.contract;
        let pkg = findFirst(this.state.packages, pkg => pkg.Id === this.state.contract.Contract.PackageId);
        contract.Contract.EndDate = getStringFromDate(getDatePlusYears(getDateFromString(contract.Contract.StartDate), pkg.Duration));

        fetch("http://localhost:56871/api/DonorContracts", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contract)
        }).then(result => result.json()).then(() => {
            // Do nothing
        });

        this.props.history.push("/");
        return true;
    }

    private updateState() {
        let company = document.getElementById("company") as HTMLSelectElement;
        let pkg = document.getElementById("package") as HTMLSelectElement;
        let value = document.getElementById("value") as HTMLInputElement;
        let amount = document.getElementById("amount") as HTMLInputElement;
        let start_date = document.getElementById("date") as HTMLInputElement;
        let status = document.getElementById("status") as HTMLSelectElement;
        let delivery_date = document.getElementById("delivery_date") as HTMLInputElement;
        let description = document.getElementById("description") as HTMLTextAreaElement;
        let comment = document.getElementById("comment") as HTMLTextAreaElement;

        this.setState(prevState => {
            return {
                contract: {
                    EstimatedValue: parseInt(value.value, 10),
                    Description: description.value,
                    Amount: parseInt(amount.value, 10),
                    DeliveryDate: delivery_date.value,
                    Contract: {
                        Id: 0,
                        StartDate: start_date.value,
                        EndDate: "",
                        Comment: comment.value,
                        IsActive: false,
                        CompanyId: parseInt(company.options[company.selectedIndex].value, 10),
                        Company: null,
                        PackageId: parseInt(pkg.options[pkg.selectedIndex].value, 10),
                        Package: null,
                        ContractStatus: null,
                        StatusId: parseInt(status.options[status.selectedIndex].value, 10)
                    },
                    ContractId: 0
                },
                message: "",
                companies: prevState.companies,
                packages: prevState.packages,
                statuses: prevState.statuses,
                is_payment_made: prevState.is_payment_made
            }
        })
    }

    public componentDidMount() {
        fetch("http://localhost:56871/api/Companies", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState(prevState => {
                return {
                    contract: prevState.contract,
                    message: prevState.message,
                    companies: items,
                    packages: prevState.packages,
                    statuses: prevState.statuses,
                    is_payment_made: prevState.is_payment_made
                }
            }));

        fetch("http://localhost:56871/api/Packages", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState(prevState => {
                return {
                    contract: prevState.contract,
                    message: prevState.message,
                    companies: prevState.companies,
                    packages: items,
                    statuses: prevState.statuses,
                    is_payment_made: prevState.is_payment_made
                }
            }));

        fetch("http://localhost:56871/api/ContractStatus", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState(prevState => {
                return {
                    contract: prevState.contract,
                    message: prevState.message,
                    companies: prevState.companies,
                    packages: prevState.packages,
                    statuses: items,
                    is_payment_made: prevState.is_payment_made
                }
            }));
    }

    public render() {
        return (
            <div className="container text-center">
                <h1 className="well">Add a donor contract</h1>
                {
                    this.state.message.length ? (
                        <div className="alert alert-danger">
                            {this.state.message}
                        </div>
                    ) : (<div/>)
                }
                <form className="form" role="form" onSubmit={this.submitForm} acceptCharset="UTF-8">
                    <div className="row">
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
                        <div className="col-md-6">
                            {
                                this.state.packages.length ? (
                                    <div>
                                        <label>Package</label>
                                        <select className="form-control" id="package" onChange={this.updateState}>
                                            {
                                                this.state.packages.map(pkg => {
                                                    return (
                                                        <option value={pkg.Id}>{pkg.Name}</option>
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
                    <div className="row">
                        <div className="col-md-4">
                            <label>Estimated value</label>
                            <input type="text" placeholder="Enter Estimated Value Here..."
                                   className="form-control" id="value" onChange={this.updateState}/>
                        </div>
                        <div className="col-md-4">
                            <label>Amount</label>
                            <input type="text" placeholder="Enter Amount Here..." className="form-control"
                                   id="amount" onChange={this.updateState}/>
                        </div>
                        <div className="col-md-4">
                            <label>Start date</label>
                            <input type="date" defaultValue={getTodayInputString()}
                                   className="form-control" id="date" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            {
                                this.state.statuses.length ? (
                                    <div>
                                        <label>Status</label>
                                        <select className="form-control" id="status" onChange={this.updateState}>
                                            {
                                                this.state.statuses.map(status => {
                                                    return (
                                                        <option value={status.Id}>{status.Name}</option>
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
                            <label>Delivery date</label>
                            <input type="date" defaultValue={getTodayInputString()}
                                   className="form-control" id="delivery_date" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Description</label>
                            <textarea rows={5} placeholder="Enter Description Here..."
                                      className="form-control" id="description" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Comment</label>
                            <textarea rows={2} placeholder="Enter Comment Here..."
                                      className="form-control" id="comment" onChange={this.updateState}/>
                        </div>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-lg btn-info">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddDonorContract
