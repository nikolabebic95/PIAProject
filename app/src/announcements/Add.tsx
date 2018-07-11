import * as React from "react"
import {getTodayInputString} from "../utils/utils";
import LocalStorageUtility from "../utils/LocalStorageUtility";

type AddAnnouncementState = {
    announcement: Announcement,
    message: string,
    companies: Company[],
    attachment: any,
}

class AddAnnouncement extends React.Component<any, AddAnnouncementState> {
    public constructor(props) {
        super(props);
        this.state = {
            announcement: {
                Id: 0,
                Title: "",
                Description: "",
                IsInternship: false,
                IsJob: false,
                InputDateTime: "",
                Attachment: null,
                Deadline: "",
                Company: null,
                CompanyId: 0
            },
            message: "",
            companies: [],
            attachment: null
        };

        this.submitForm = this.submitForm.bind(this);
        this.updateState = this.updateState.bind(this);
        this.uploadAttachment = this.uploadAttachment.bind(this);
    }

    private setErrorMessage(message: string): void {
        this.setState(prevState => {
            return {
                announcement: prevState.announcement,
                message: message,
                companies: prevState.companies,
                attachment: prevState.attachment
            }
        });
    }

    private raiseError(message: string, event): boolean {
        this.setErrorMessage(message);
        event.preventDefault();
        return false;
    }

    private checkRequiredFields(): boolean {
        return this.state.announcement.Title.length > 0 &&
            this.state.announcement.Description.length > 0;
    }

    private checkInternshipJob(): boolean {
        return this.state.announcement.IsInternship || this.state.announcement.IsJob
    }

    private submitForm(event) {
        let announcement = this.state.announcement;
        if (announcement.Attachment != null) announcement.Attachment = announcement.Attachment.split('\\').pop().split('/').pop();

        if (!this.checkRequiredFields()) {
            return this.raiseError("You must fill all required fields", event);
        }

        if (!this.checkInternshipJob()) {
            return this.raiseError("You must specify either an internship or a job", event);
        }

        fetch("http://localhost:56871/api/Announcements", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(announcement)
        }).then(result => result.json()).then(data => {
            if (this.state.announcement.Attachment && this.state.announcement.Attachment.length) {
                let attachment_data = {
                    Type: "announcement",
                    Id: data.Id,
                    Data: btoa(this.state.attachment)
                };
                fetch("http://localhost:56871/api/Data", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(attachment_data)
                }).then(() => {
                    // Do nothing
                })
            }
        });
        this.props.history.push("/");
        return true;
    }

    private updateState() {
        let title = document.getElementById("title") as HTMLInputElement;
        let company = document.getElementById("company") as HTMLSelectElement;
        let description = document.getElementById("description") as HTMLInputElement;
        let attachment = document.getElementById("attachment") as HTMLInputElement;
        let is_internship = document.getElementById("is_internship") as HTMLInputElement;
        let is_job = document.getElementById("is_job") as HTMLInputElement;
        let deadline = document.getElementById("deadline") as HTMLInputElement;

        this.setState(prevState => {
            return {
                announcement: {
                    Id: 0,
                    Title: title.value,
                    Description: description.value,
                    IsInternship: is_internship.checked,
                    IsJob: is_job.checked,
                    InputDateTime: new Date().toDateString(),
                    Attachment: attachment.value,
                    Deadline: deadline.value,
                    Company: null,
                    CompanyId: parseInt(company.options[company.selectedIndex].value, 10)
                },
                message: "",
                companies: prevState.companies,
                attachment: prevState.attachment
            }
        })
    }

    private uploadAttachment() {
        this.updateState();

        let attachment = document.getElementById("attachment") as HTMLInputElement;
        let file = attachment.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let result = reader.result;
            this.setState(prevState => {
                return {
                    announcement: prevState.announcement,
                    message: prevState.message,
                    companies: prevState.companies,
                    attachment: result
                }
            })
        };
    }

    public componentDidMount() {
        let username = LocalStorageUtility.getUsername();
        fetch("http://localhost:56871/api/Companies?username=" + username, {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState(prevState => {
                let announcement = prevState.announcement;
                if (items.length) announcement.CompanyId = items[0].Id;

                return {
                    announcement: prevState.announcement,
                    message: prevState.message,
                    companies: items,
                }
            }));
    }

    public render() {
        return (
            <div className="container text-center">
                <h1 className="well">Add a company announcement</h1>
                {
                    this.state.message.length ? (
                        <div className="alert alert-danger">
                            {this.state.message}
                        </div>
                    ) : (<div/>)
                }
                <form className="form" role="form" onSubmit={this.submitForm} acceptCharset="UTF-8">
                    <div className="row">
                        <div className="col-md-6">
                            <label>Title <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Enter Announcement Title Here..."
                                   className="form-control" id="title" onChange={this.updateState}/>
                        </div>
                        <div className="col-md-6">
                            <label>Company <span style={{color: "red"}}>*</span></label>
                            {
                                this.state.companies.length ? (
                                    <select className="form-control" id="company" onChange={this.updateState}>
                                        {
                                            this.state.companies.map(company => {
                                                return (
                                                    <option value={company.Id}>{company.Name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                ) : (
                                    <div className="alert alert-info">
                                        Loading...
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h4 className="well">
                                Description <span style={{color: "red"}}>*</span>
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <textarea rows={5} placeholder="Enter Announcement Description Here..."
                                      className="form-control" id="description" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Attachment</label>
                            <input type="file" className="form-control" id="attachment"
                                   onChange={this.uploadAttachment}/>
                        </div>
                        <div className="col-md-2">
                            <label>Is Internship?</label>
                            <input type="checkbox" className="form-control" id="is_internship"
                                   onChange={this.updateState}/>
                        </div>
                        <div className="col-md-2">
                            <label>Is Job?</label>
                            <input type="checkbox" className="form-control" id="is_job"
                                   onChange={this.updateState}/>
                        </div>
                        <div className="col-md-4">
                            <label>Deadline <span style={{color: "red"}}>*</span></label>
                            <input type="date" defaultValue={getTodayInputString()}
                                   className="form-control" id="deadline" onChange={this.updateState}/>
                        </div>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary btn-block btn-dark">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddAnnouncement