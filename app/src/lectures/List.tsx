import * as React from "react"

type ListLecturesState = {
    items: Lecture[]
}

class ListLectures extends React.Component<any, ListLecturesState> {
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
                            Naslov
                        </th>
                        <th>
                            Kompanija
                        </th>
                        <th>
                            Opis
                        </th>
                        <th>
                            Datum i vreme
                        </th>
                        <th>
                            Predavač
                        </th>
                        <th>
                            Biografija
                        </th>
                        </thead>
                        <tbody>
                        {
                            this.state.items.map(item => {
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
                <a href="/lectures/list_english">Or see this page in English</a>
            </div>
        ) : (
            <div className="container alert alert-info text-center">
                Loading...
            </div>
        );
    }
}

export default ListLectures