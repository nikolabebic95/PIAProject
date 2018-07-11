import * as React from "react"
const download = require("downloadjs");

type ListAnnouncementsState = {
    items: Announcement[]
}

class ListAnnouncements extends React.Component<any, ListAnnouncementsState> {
    public constructor(props) {
        super(props);
        this.state = {
            items: []
        };

        this.downloadAttachment = this.downloadAttachment.bind(this);
    }

    public componentDidMount() {
        fetch("http://localhost:56871/api/Announcements", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState({items: items}))
    }

    private downloadAttachment(index) {
        fetch("http://localhost:56871/api/Data/" + this.state.items[index].Id + "?type=announcement", {method: 'GET'})
            .then(result => result.json())
            .then(received => {
                download(received, this.state.items[index].Attachment.trim());
            });
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
                <th>
                    Attachment
                </th>
                </thead>
                <tbody>
                {
                    this.state.items.map((item, index) => {
                        return (
                            <tr>
                                <td>
                                    {item.Title.trim()}
                                </td>
                                <td>
                                    {item.Company.Name.trim()}
                                </td>
                                <td>
                                    {item.Description.trim()}
                                </td>
                                <td>
                                    {item.IsInternship ? "Yes" : "No"}
                                </td>
                                <td>
                                    {item.IsJob ? "Yes" : "No"}
                                </td>
                                <td>
                                    {new Date(item.Deadline).toLocaleDateString()}
                                </td>
                                <td>
                                    {
                                        item.Attachment && item.Attachment.length > 0 ? (
                                            <a href="#" onClick={() => this.downloadAttachment(index)}
                                               className="btn btn-dark">Download</a>
                                        ) : (
                                            <div/>
                                        )
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        ) : (
            <div className="container alert alert-info text-center">
                Loading...
            </div>
        );
    }
}

export default ListAnnouncements
