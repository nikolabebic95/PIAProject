import * as React from "react"
const download = require("downloadjs");
import {FacebookShareButton, TwitterShareButton} from "react-share";

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
                <th>
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
                                <td>
                                    <FacebookShareButton
                                        className="btn btn-sm btn-dark"
                                        url={"www.etf.rs"}
                                        quote={item.Title.trim() + " - " + item.Description.trim()}
                                        hashtag={item.IsInternship ? item.IsJob ? "#JobAndInternship" : "#Internship" : "#Job"}
                                    >Share on Facebook</FacebookShareButton>
                                    <br />
                                    <TwitterShareButton
                                        className="btn btn-sm btn-dark"
                                        url={"www.etf.rs"}
                                        title={item.Title.trim() + " - " + item.Description.trim()}
                                        hashtags={item.IsInternship ? item.IsJob ? ["Job", "Internship"] : ["Internship"] : ["Job"]}
                                    >Share on Twitter</TwitterShareButton>
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
