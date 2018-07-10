import * as React from "react"
import LocalStorageUtility from "./LocalStorageUtility";
import {Redirect} from "react-router"
import NotFound from "../misc/NotFound";

type PrivateRouteState = {
    shouldRender: boolean
}

class PrivateRoute extends React.Component<any, PrivateRouteState> {
    public constructor(props) {
        super(props);

        this.state = {
            shouldRender: false
        };

        setInterval(() => {
            this.setState({
                shouldRender: LocalStorageUtility.hasRole(this.props.role)
            })
        }, 10)
    }

    public render() {
        if (this.state.shouldRender) {
            return this.props.children
        } else {
            return <NotFound/>
        }
    }
}

export default PrivateRoute
