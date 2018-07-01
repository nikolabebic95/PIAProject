import * as React from "react"
import Header from "./Header";
import Footer from "./Footer";

class Layout extends React.Component {
    public render() {
        return (
            <div>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}

export default Layout
