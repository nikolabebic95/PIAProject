import * as React from "react"

type ListCompaniesState = {
    list: Company[]
    package_name: string,
    company_name: string,
    only_active: boolean
}

class ListCompanies extends React.Component<any, ListCompaniesState> {
    public constructor(props) {
        super(props);
        this.state = {
            list: [],
            package_name: "",
            company_name: "",
            only_active: false
        };

        this.submitForm = this.submitForm.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    private onChange() {
        this.setState(prevState => {
            return {
                list: prevState.list,
                package_name: (document.getElementById("package_name") as HTMLInputElement).value,
                company_name: (document.getElementById("company_name") as HTMLInputElement).value,
                only_active: (document.getElementById("active") as HTMLInputElement).checked
            }
        })
    }

    private submitForm(event) {
        event.preventDefault();

        fetch("http://localhost:56871/api/Companies?packageName=" + this.state.package_name + "&companyName=" + this.state.company_name + "&activeOnly=" + (this.state.only_active ? "true" : "false"), {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState(prevState => {
                return {
                    list: items,
                    package_name: prevState.package_name,
                    company_name: prevState.company_name,
                    only_active: prevState.only_active
                }
            }));

        return false;
    }

    public render() {
        return (
            <div className="container text-center">
                <h1 className="well">Search companies</h1>
                <form className="form" role="form" onSubmit={this.submitForm} acceptCharset="UTF-8">
                    <div className="row">
                        <div className="col-md-4 form-group">
                            <label>Package name</label>
                            <input type="text" placeholder="Enter Package Name Here..." className="form-control"
                                   id="package_name" onChange={this.onChange}/>
                        </div>
                        <div className="col-md-4 form-group">
                            <label>Company name</label>
                            <input type="text" placeholder="Enter Company Name Here..." className="form-control"
                                   id="company_name" onChange={this.onChange}/>
                        </div>
                        <div className="col-md-2 form-group">
                            <label>Active only</label>
                            <input type="checkbox" className="form-control" id="active"
                                   onChange={this.onChange}/>
                        </div>
                        <div className="col-md-2 form-group">
                            <button type="submit" className="btn btn-primary btn-block btn-dark">Search...</button>
                        </div>
                    </div>
                </form>
                <div className="container">
                    {
                        this.state.list.map(company => {
                            return (
                                <div className="row">
                                    <div className="col-md-12">
                                        <h4><a href={"/companies/view/" + company.Id}>{company.Name}</a></h4>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ListCompanies