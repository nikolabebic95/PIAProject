import * as React from "react"

type AddPackageState = {
    package: Package,
    message: string,
    package_items: PackageItem[]
}

class AddPackage extends React.Component<any, AddPackageState> {
    public constructor(props) {
        super(props);
        this.state = {
            package: {
                Id: 0,
                Name: "",
                Value: 0,
                Duration: 0,
                MaxNumCompaniesYearly: 0,
                ShowName: false,
                ShowLogo: false,
                PackageItems: []
            },
            message: "",
            package_items: [
                {
                    Id: 0,
                    Name: "",
                    Description: ""
                }
            ]
        };

        this.submitForm = this.submitForm.bind(this);
        this.updateState = this.updateState.bind(this);
        this.addRow = this.addRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

    public submitForm() {
        let pkg = this.state.package;
        pkg.PackageItems = this.state.package_items;
        console.log(JSON.stringify(pkg));

        fetch("http://localhost:56871/api/Packages", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pkg)
        }).then(result => result.json()).then(() => {
            // Do nothing
        });

        this.props.history.push("/");
        return true;
    }

    public updateState() {
        let name = document.getElementById("name") as HTMLInputElement;
        let value = document.getElementById("value") as HTMLInputElement;
        let duration = document.getElementById("duration") as HTMLInputElement;
        let number = document.getElementById("number") as HTMLInputElement;
        let show_name = document.getElementById("show_name") as HTMLInputElement;
        let show_logo = document.getElementById("show_logo") as HTMLInputElement;

        let package_items = this.state.package_items;

        for (let i = 0; i < package_items.length; i++) {
            let name_id = "item_name_" + i;
            let desc_id = "item_desc_" + i;
            let name_node = document.getElementById(name_id) as HTMLInputElement;
            let desc_node = document.getElementById(desc_id) as HTMLTextAreaElement;

            package_items[i].Name = name_node.value;
            package_items[i].Description = desc_node.value;
        }

        this.setState({
            package: {
                Id: 0,
                Name: name.value,
                Value: parseInt(value.value, 10),
                Duration: parseInt(duration.value, 10),
                MaxNumCompaniesYearly: parseInt(number.value, 10),
                ShowName: show_name.checked,
                ShowLogo: show_logo.checked,
                PackageItems: []
            },
            message: "",
            package_items: package_items
        })
    }

    public addRow() {
        this.setState(prevState => {
            let items = prevState.package_items;
            items.push({
                Id: 0,
                Name: "",
                Description: ""
            });

            return {
                package: prevState.package,
                message: "",
                package_items: items
            }
        })
    }

    public deleteRow(index: number) {
        this.setState(prevState => {
            let items = prevState.package_items;
            items.splice(index, 1);

            return {
                package: prevState.package,
                message: prevState.message,
                package_items: items
            }
        })
    }

    public render() {
        return (
            <div className="container text-center">
                <h1 className="well">Add a package</h1>
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
                            <label>Name</label>
                            <input type="text" placeholder="Enter Name Here..."
                                   className="form-control" id="name" onChange={this.updateState}/>
                        </div>
                        <div className="col-md-6">
                            <label>Value in &euro;</label>
                            <input type="number" placeholder="Enter Value Here..."
                                   className="form-control" id="value" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Duration in years</label>
                            <input type="number" placeholder="Enter Duration Here..."
                                   className="form-control" id="duration" onChange={this.updateState}/>
                        </div>
                        <div className="col-md-6">
                            <label>Number of companies yearly</label>
                            <input type="number" placeholder="Enter Number Here..."
                                   className="form-control" id="number" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Should show company name</label>
                            <input type="checkbox"
                                   className="form-control" id="show_name" onChange={this.updateState}/>
                        </div>
                        <div className="col-md-6">
                            <label>Should show company logo</label>
                            <input type="checkbox"
                                   className="form-control" id="show_logo" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h4 className="well">
                                Package items
                            </h4>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10">
                                <input type="text" placeholder="Enter Item Name Here..."
                                       className="form-control" id="item_name_0" onChange={this.updateState}/>
                            </div>
                            <div className="col-md-2">
                                <button type="button" className="btn btn-md btn-success" onClick={this.addRow}>
                                    Add row
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <textarea rows={2} placeholder="Enter Item Description Here..."
                                          className="form-control" id="item_desc_0" onChange={this.updateState}/>
                            </div>
                        </div>
                        <br/>
                        {
                            this.state.package_items.map((item, index) => {
                                if (index > 0) {
                                    return (
                                        <div>
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <input type="text" placeholder="Enter Item Name Here..."
                                                           value={this.state.package_items[index].Name}
                                                           className="form-control" id={"item_name_" + index}
                                                           onChange={this.updateState}/>
                                                </div>
                                                <div className="col-md-2">
                                                    <button type="button" className="btn btn-md btn-danger"
                                                            onClick={() => this.deleteRow(index)}>
                                                        Delete row
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <textarea rows={2} placeholder="Enter Item Description Here..."
                                                              className="form-control" id={"item_desc_" + index}
                                                              onChange={this.updateState}/>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    )
                                } else {
                                    return (<div/>)
                                }
                            })
                        }
                    </div>
                    <button type="submit" className="btn btn-lg btn-info">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddPackage
