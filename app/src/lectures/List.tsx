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
                        <th>
                        </th>
                        </thead>
                        <tbody>
                        {
                            this.state.future.map(item => {
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
                                        <td>
                                            <FacebookShareButton
                                                className="btn btn-sm btn-dark"
                                                url={"www.etf.rs"}
                                                quote={item.Title.trim() + " - " + item.Description.trim()}
                                                hashtag={"#" + item.Company.Name}
                                            >Share on Facebook</FacebookShareButton>
                                            <br />
                                            <TwitterShareButton
                                                className="btn btn-sm btn-dark"
                                                url={"www.etf.rs"}
                                                title={item.Title.trim() + " - " + item.Description.trim()}
                                                hashtags={[item.Company.Name, "Predavanje"]}
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
                            <div className="alert alert-info text-center">Stara predavanja</div>
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
                                    this.state.past.map(item => {
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
                    ) : (<div />)
                }
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