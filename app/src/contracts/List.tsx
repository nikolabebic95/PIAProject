import * as React from "react"

type ListContractsState = {
    company_name: string,
    list: Contract[],
    links: any[],
}

class ListContracts extends React.Component<any, ListContractsState> {
    public constructor(props) {
        super(props);
        this.state = {
            company_name: "",
            list: [],
            links: []
        };

        this.submitForm = this.submitForm.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    private submitForm(event) {
        event.preventDefault();

        fetch("http://localhost:56871/api/Contracts?companyName=" + this.state.company_name, {method: 'GET'})
            .then(result => result.json())
            .then(items => {
                let links = [];

                for (let i = 0; i < items.length; i++) {
                    if (!/http:\/\//.test(items[i].Company.Address)) items[i].Company.Address = "http://" + items[i].Company.Address;
                    items[i].Company.Logo = "";

                    if (links.length === 0) {
                        links.push({
                            id: items[i].Id,
                            name: items[i].Package.Name
                        })
                    } else if (links[links.length - 1].name !== items[i].Package.Name) {
                        links.push({
                            id: items[i].Id,
                            name: items[i].Package.Name
                        })
                    }
                }

                this.setState(prevState => {
                    return {
                        company_name: prevState.company_name,
                        list: items,
                        links: links
                    }
                });

                for (let i = 0; i < items.length; i++) {
                    fetch("http://localhost:56871/api/Data/" + items[i].CompanyId + "?type=company", {method: 'GET'})
                        .then(result => result.json())
                        .then(logoData => this.setState(prevState => {
                            let newList = prevState.list;
                            newList[i].Company.Logo = atob(logoData);

                            return {
                                company_name: prevState.company_name,
                                list: newList,
                                links: prevState.links
                            }
                        }));

                }
            });

        return false;
    }

    private onChange() {
        let company_name = document.getElementById("company_name") as HTMLInputElement;
        this.setState(prevState => {
            return {
                company_name: company_name.value,
                list: prevState.list,
                links: prevState.links
            }
        })
    }

    public render() {
        return (
            <div className="container text-center">
                <h1 className="well">Contracts</h1>
                <form className="form" role="form" onSubmit={this.submitForm} acceptCharset="UTF-8">
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label>Company name</label>
                            <input type="text" placeholder="Enter Company Name Here..." className="form-control"
                                   id="company_name" onChange={this.onChange}/>
                        </div>
                        <div className="col-md-6 form-group">
                            <button type="submit" className="btn btn-lg btn-dark">Search...</button>
                        </div>
                    </div>
                </form>
                <div className="container">
                    <div className="row">
                        {
                            this.state.links.map(link => {
                                return (
                                    <div className="col-md-4">
                                        <a href={"#" + link.id} className="btn btn-dark" >{link.name}</a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <br />
                    {
                        this.state.list.map(contract => {
                            return (
                                <div id={contract.Id + ""} className="row">
                                    <div className="col-md-4">
                                        {contract.Package.Name}
                                    </div>
                                    {
                                        contract.Package.ShowName ? (
                                            <div className="col-md-4">
                                                <a href={contract.Company.Address}>{contract.Company.Name}</a>
                                            </div>
                                        ) : (
                                            <div/>
                                        )
                                    }
                                    {
                                        contract.Package.ShowLogo && contract.Company.Logo !== "" ? (
                                            <div className="col-md-4">
                                                <a href={contract.Company.Address}>
                                                    <img height="100px" width="100px" src={contract.Company.Logo}/>
                                                </a>
                                            </div>
                                        ) : (
                                            <div/>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ListContracts
