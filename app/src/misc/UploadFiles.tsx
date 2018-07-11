import * as React from "react"
import {CSVToArray, fixDate} from "../utils/utils";

type UploadFilesState = {
    json: any,
    csv: any
}

class UploadFiles extends React.Component<any, UploadFilesState> {
    public constructor(props) {
        super(props);
        this.state = {
            json: null,
            csv: null
        };

        this.updateJson = this.updateJson.bind(this);
        this.submitJson = this.submitJson.bind(this);
        this.updateCsv = this.updateCsv.bind(this);
        this.submitCsv = this.submitCsv.bind(this);
    }

    private updateJson() {
        let input = document.getElementById("json") as HTMLInputElement;
        let file = input.files[0];

        let reader = new FileReader();
        reader.onload = () => {
            let result = reader.result;
            console.log(JSON.stringify(result));
            this.setState(prevState => {
                return {
                    json: result,
                    csv: prevState.csv
                }
            })
        };
        reader.onload = reader.onload.bind(this);
        reader.readAsText(file);
    }

    private updateCsv() {
        let input = document.getElementById("csv") as HTMLInputElement;
        let file = input.files[0];

        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            let result = reader.result;
            this.setState(prevState => {
                return {
                    json: prevState.json,
                    csv: result
                }
            })
        };
    }

    private submitJson() {
        if (this.state.json === null) return false;

        let json_file = JSON.parse(this.state.json);

        console.log(json_file);

        json_file.Oglasi.forEach(entry => {
            fetch("http://localhost:56871/api/Companies?companyName=" + entry.Kompanija, {method: 'GET'})
                .then(result => result.json())
                .then(items => {
                    if (items.length > 0) {
                        let company = items[0];
                        let announcement = {
                            Id: 0,
                            Title: entry.Kompanija,
                            Description: entry.Opis,
                            IsInternship: entry.Tip.indexOf("praksa") !== -1,
                            IsJob: entry.Tip.indexOf("posao") !== -1,
                            InputDateTime: new Date().toLocaleDateString(),
                            Attachment: null,
                            Deadline: fixDate(entry.RokPrijave),
                            Company: null,
                            CompanyId: company.Id
                        };

                        fetch("http://localhost:56871/api/Announcements", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(announcement)
                        }).then(() => {
                            // Do nothing
                        })
                    }
                });
        });

        return true;
    }

    private submitCsv() {
        if (this.state.csv === null) return false;

        let lines = CSVToArray(this.state.csv, ",");

        for (let i = 1; i < lines.length; i++) {
            let parts = lines[i];

            let start = parts[7].indexOf("(");
            let end = parts[7].indexOf(")");

            let lecturerName = parts[7].substr(0, start);
            let companyName = parts[7].substr(start + 1, end - start - 1);

            fetch("http://localhost:56871/api/Companies?companyName=" + companyName, {method: 'GET'})
                .then(result => result.json())
                .then(items => {
                    console.log("got here");
                    if (items.length > 0) {
                        console.log("also here");
                        let company = items[0];
                        let lecture = {
                            Id: 0,
                            Title: parts[0],
                            TitleEnglish: parts[1],
                            Description: parts[2],
                            DescriptionEnglish: parts[3],
                            DateTime: fixDate(parts[4]) + "T" + parts[5].substr(0, 5),
                            Room: parts[6],
                            LecturerName: lecturerName,
                            LecturerBio: "",
                            Attachment: null,
                            Image: null,
                            Company: null,
                            CompanyId: company.Id
                        };

                        fetch("http://localhost:56871/api/Lectures", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(lecture)
                        }).then(() => {
                            // Do nothing
                        })
                    }
                });
        }

        return true;
    }

    public render() {
        return (
            <div className="container text-center">
                <h1 className="well">Add files</h1>
                <form role="form" className="form" onSubmit={this.submitJson} acceptCharset="UTF-8">
                    <div className="row">
                        <div className="col-md-6">
                            <label>Add JSON announcement</label>
                            <input type="file" accept="application/json" className="form-control" id="json"
                                   onChange={this.updateJson}/>
                        </div>
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-dark">Submit JSON</button>
                        </div>
                    </div>
                </form>
                <br/>
                <form role="form" className="form" onSubmit={this.submitCsv} acceptCharset="UTF-8">
                    <div className="row">
                        <div className="col-md-6">
                            <label>Add CSV lecture</label>
                            <input type="file" accept="text/csv" className="form-control" id="csv"
                                   onChange={this.updateCsv}/>
                        </div>
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-dark">Submit CSV</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default UploadFiles;
