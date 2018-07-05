import * as React from "react"

class Announcement {

}

class ListAnnouncements extends React.Component {
    public constructor(props) {
        super(props);
        this.state={items:[]};
    }

    public componentDidMount() {
        fetch("http://localhost:56871/api/Companies", {method: 'GET'})
            .then(result=>result.json())
            .then(items=>this.setState({items:items})).catch(e => {
                this.setState({items: [].push(e)});
        })
    }

    public render() {
        return (
            <ul>
                {this.state.items.length ?
                    this.state.items.map(item=><li key={item.Id}>{item.Name}</li>)
                    : <li>Loading...</li>
                }
            </ul>
        )
    }
}

export default ListAnnouncements
