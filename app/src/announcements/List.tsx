import * as React from "react"

type ListAnnouncementsState = {
    items: Announcement[]
}

class ListAnnouncements extends React.Component<any, ListAnnouncementsState> {
    public constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    public componentDidMount() {
        fetch("http://localhost:56871/api/Announcements", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState({items: items}))
    }

    public render() {
        return this.state.items.length ? (
            <table className="table">
                <thead>
                <th>
                    Title
                </th>
                <th>
                    Company
                </th>
                <th>
                    Description
                </th>
                <th>
                    Internship
                </th>
                <th>
                    Job
                </th>
                <th>
                    Deadline
                </th>
                </thead>
                {
                    this.state.items.map(item => {
                        return (
                            <tr>
                                <td>
                                    {item.Title}
                                </td>
                                <td>
                                    {item.Company.Name}
                                </td>
                                <td>
                                    {item.Description}
                                </td>
                                <td>
                                    {item.IsInternship ? "Yes" : "No"}
                                </td>
                                <td>
                                    {item.IsJob ? "Yes" : "No"}
                                </td>
                                <td>
                                    {new Date(item.Deadline).toLocaleDateString()} {new Date(item.Deadline).toLocaleTimeString()}
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        ) : (
            <div className="container alert alert-info text-center">
                Loading...
            </div>
        );
    }
}

export default ListAnnouncements
