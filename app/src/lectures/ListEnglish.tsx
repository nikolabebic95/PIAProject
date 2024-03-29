import * as React from "react"
import {FacebookShareButton, TwitterShareButton} from "react-share";

type ListLecturesState = {
    future: Lecture[],
    past: Lecture[]
}

class ListLectures extends React.Component<any, ListLecturesState> {
    public constructor(props) {
        super(props);
        this.state = {
            future: [],
            past: []
        };
    }

    public componentDidMount() {
        fetch("http://localhost:56871/api/Lectures?time=future", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState(prevState => {
                return {
                    future: items,
                    past: prevState.past
                }
            }));

        fetch("http://localhost:56871/api/Lectures?time=past&limit=20", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState(prevState => {
                return {
                    future: prevState.future,
                    past: items
                }
            }))
    }

    public render() {
        return this.state.future.length ? (
            <div className="container">
                <div className="row table-responsive">
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
                            Date and time
                        </th>
                        <th>
                            Lecturer
                        </th>
                        <th>
                            Bio
                        </th>
                        <th>
                        </th>
                        </thead>
                        <tbody>
                        {
                            this.state.future.map(item => {
                                return (
                                    <tr>
                                        <td>
                                            {item.TitleEnglish.trim()}
                                        </td>
                                        <td>
                                            {item.Company.Name.trim()}
                                        </td>
                                        <td>
                                            {item.DescriptionEnglish.trim()}
                                        </td>
                                        <td>
                                            {new Date(item.DateTime).toLocaleDateString()} {new Date(item.DateTime).toLocaleTimeString()}
                                        </td>
                                        <td>
                                            {item.LecturerName.trim()}
                                        </td>
                                        <td>
                                            {item.LecturerBio.trim()}
                                        </td>
                                        <td>
                                            <FacebookShareButton
                                                className="btn btn-sm btn-dark"
                                                url={"www.etf.rs"}
                                                quote={item.TitleEnglish.trim() + " - " + item.DescriptionEnglish.trim()}
                                                hashtag={"#" + item.Company.Name}
                                            >Share on Facebook</FacebookShareButton>
                                            <br />
                                            <TwitterShareButton
                                                className="btn btn-sm btn-dark"
                                                url={"www.etf.rs"}
                                                title={item.TitleEnglish.trim() + " - " + item.DescriptionEnglish.trim()}
                                                hashtags={[item.Company.Name, "Lecture"]}
                                            >Share on Twitter</TwitterShareButton>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                {
                    this.state.past.length ? (
                        <div className="row table-responsive">
                            <div className="alert alert-info text-center">Archive</div>
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
                                    Date and time
                                </th>
                                <th>
                                    Lecturer
                                </th>
                                <th>
                                    Bio
                                </th>
                                </thead>
                                <tbody>
                                {
                                    this.state.past.map(item => {
                                        return (
                                            <tr>
                                                <td>
                                                    {item.TitleEnglish.trim()}
                                                </td>
                                                <td>
                                                    {item.Company.Name.trim()}
                                                </td>
                                                <td>
                                                    {item.DescriptionEnglish.trim()}
                                                </td>
                                                <td>
                                                    {new Date(item.DateTime).toLocaleDateString()} {new Date(item.DateTime).toLocaleTimeString()}
                                                </td>
                                                <td>
                                                    {item.LecturerName.trim()}
                                                </td>
                                                <td>
                                                    {item.LecturerBio.trim()}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    ) : (<div />)
                }
                <a href="/lectures/list">Ili pogledajte ovu stranicu na srpskom</a>
            </div>
        ) : (
            <div className="container alert alert-info text-center">
                Loading...
            </div>
        );
    }
}

export default ListLectures