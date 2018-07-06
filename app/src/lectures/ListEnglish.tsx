import * as React from "react"

type ListLecturesState = {
    items: Lecture[]
}

class ListLecturesEnglish extends React.Component<any, ListLecturesState> {
    public constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    public componentDidMount() {
        fetch("http://localhost:56871/api/Lectures", {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState({items: items}))
    }

    public render() {
        return this.state.items.length ? (
            <div>
                <div className="table-responsive">
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
                            this.state.items.map(item => {
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
                <a href="/lectures/list">Or see this page in Serbian</a>
            </div>
        ) : (
            <div className="container alert alert-info text-center">
                Loading...
            </div>
        );
    }
}

export default ListLecturesEnglish