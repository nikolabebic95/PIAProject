import * as React from "react"

class Footer extends React.Component<any, any> {
    public constructor(props) {
        super(props);
    }

    public render() {
        return (
            <nav className="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <div className="navbar-brand">
                        Copyright &copy; ETF 2018
                    </div>
                </div>
                <div className="container">
                    <div />
                    <div className="navbar-brand navbar-right">
                        Author: Nikola Bebić
                    </div>
                </div>
            </nav>
        )
    }
}

export default Footer
