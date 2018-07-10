import * as React from "react"
import {findFirst, getDateFromString, getDatePlusYears, getStringFromDate, getTodayInputString} from "../utils/utils";

type AddMoneyContractState = {
    contract: MoneyContract,
    message: string,
    companies: Company[],
    packages: Package[],
    statuses: ContractStatus[],
    is_payment_made: boolean
}

class AddMoneyContract extends React.Component<any, AddMoneyContractState> {
    public constructor(props) {
        super(props);
        this.state = {
            contract: {
                Value: 0,
                IsBillSent: false,
                PaymentDate: getTodayInputString(),
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
        this.updatePayment = this.updatePayment.bind(this);
    }

    private submitForm() {
        let contract = this.state.contract;
        if (!this.state.is_payment_made) contract.PaymentDate = "";
        let pkg = findFirst(this.state.packages, pkg => pkg.Id === this.state.contract.Contract.PackageId);
        contract.Contract.EndDate = getStringFromDate(getDatePlusYears(getDateFromString(contract.Contract.StartDate), pkg.Duration));

        console.log(JSON.stringify(contract));

        fetch("http://localhost:56871/api/MoneyContracts", {
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
        let is_bill_sent = document.getElementById("is_bill_sent") as HTMLInputElement;
        let start_date = document.getElementById("date") as HTMLInputElement;
        let status = document.getElementById("status") as HTMLSelectElement;
        let is_payment_made = document.getElementById("is_payment_made") as HTMLInputElement;
        let payment_date = document.getElementById("payment_date") as HTMLInputElement;
        let comment = document.getElementById("comment") as HTMLTextAreaElement;

        this.setState(prevState => {
            return {
                contract: {
                    Value: parseInt(value.value, 10),
                    IsBillSent: is_bill_sent.checked,
                    PaymentDate: is_payment_made.checked ? payment_date.value : "",
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

    private updatePayment() {
        let is_payment_made = document.getElementById("is_payment_made") as HTMLInputElement;
        this.setState(prevState => {
            if (is_payment_made.checked) prevState.contract.PaymentDate = getTodayInputString();
            return {
                contract: prevState.contract,
                message: "",
                companies: prevState.companies,
                packages: prevState.packages,
                statuses: prevState.statuses,
                is_payment_made: is_payment_made.checked
            }
        });
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
                <h1 className="well">Add a money contract</h1>
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
                            <label>Value</label>
                            <input type="text" placeholder="Enter Value Here..."
                                   className="form-control" id="value" onChange={this.updateState}/>
                        </div>
                        <div className="col-md-4">
                            <label>Is bill sent?</label>
                            <input type="checkbox" className="form-control" id="is_bill_sent"
                                   onChange={this.updateState}/>
                        </div>
                        <div className="col-md-4">
                            <label>Start date</label>
                            <input type="date" defaultValue={getTodayInputString()}
                                   className="form-control" id="date" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
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
                        <div className="col-md-4">
                            <label>Is payment made?</label>
                            <input type="checkbox" className="form-control" id="is_payment_made"
                                   onChange={this.updatePayment}/>
                        </div>
                        {
                            this.state.is_payment_made ? (
                                <div className="col-md-4">
                                    <label>Payment date</label>
                                    <input type="date" defaultValue={getTodayInputString()}
                                           className="form-control" id="payment_date" onChange={this.updateState}/>
                                </div>
                            ) : (
                                <div />
                            )
                        }
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

export default AddMoneyContract
