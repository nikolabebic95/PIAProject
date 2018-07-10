import * as React from "react"

class NotFound extends React.Component{
    public render() {
        return (
            <div className="container text-center">
                <h1 className="well">
                    Error 404 - The page that you're looking for does not exist.
                </h1>
                <div className="row">
                    <div className="col-md-12">
                        <a href="/" className="btn btn-lg btn-dark">Go back home</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound
