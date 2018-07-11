import * as React from "react"

type ListPackagesState = {
    packages: Package[]
}

class ListPackages extends React.Component<any, ListPackagesState> {
    public constructor(props) {
        super(props);
        this.state = {
            packages: []
        };

        this.sort = this.sort.bind(this);
    }

    public componentDidMount() {
        fetch("http://localhost:56871/api/Packages", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState({
                packages: items
            }));
    }

    private sort(option) {
        let packages = this.state.packages;
        let compare;
        switch (option) {
            case 0: compare = (lhs, rhs) => lhs.Name.toLowerCase().localeCompare(rhs.Name.toLowerCase()); break;
            case 1: compare = (lhs, rhs) => rhs.Name.toLowerCase().localeCompare(lhs.Name.toLowerCase()); break;
            case 2: compare = (lhs, rhs) => lhs.Value - rhs.Value; break;
            case 3: compare = (lhs, rhs) => rhs.Value - lhs.Value; break;
        }

        packages.sort(compare);
        this.setState({
            packages: packages
        });
    }

    public render() {
        return this.state.packages.length > 0 ? (
            <div className="container text-center">
                <h1 className="well">Packages</h1>
                <div className="row">
                    <div className="col-md-3">
                        <button className="btn btn-sm btn-dark" onClick={() => this.sort(0)}>Sort by name ascending</button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-sm btn-dark" onClick={() => this.sort(1)}>Sort by name descending</button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-sm btn-dark" onClick={() => this.sort(2)}>Sort by value ascending</button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-sm btn-dark" onClick={() => this.sort(3)}>Sort by value descending</button>
                    </div>
                </div>
                <br />
                {
                    this.state.packages.map(pkg => {
                        return (
                            <div>
                                <div className="row">
                                    <div className="col-md-3">
                                        Name: <b>{pkg.Name}</b>
                                    </div>
                                    <div className="col-md-3">
                                        Value: <b>{pkg.Value}</b>
                                    </div>
                                    <div className="col-md-3">
                                        Duration: <b>{pkg.Duration}</b> years
                                    </div>
                                    <div className="col-md-3">
                                        Companies yearly: <b>{pkg.MaxNumCompaniesYearly}</b>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5>Items</h5>
                                    </div>
                                </div>
                                {
                                    pkg.PackageItems.map(item => {
                                        return (
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <b>{item.Name}</b> - {item.Description}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <br />
                            </div>
                        )
                    })
                }
            </div>
        ) : (
            <div className="container alert alert-info text-center">
                Loading...
            </div>
        )
    }
}

export default ListPackages
