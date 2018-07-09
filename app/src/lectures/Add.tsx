import * as React from "react"
import {getTodayInputDateTimeString} from "../utils/utils";

type AddLectureState = {
    lecture: Lecture,
    message: string,
    companies: Company[],
    attachment: any
    image: any,
}

class AddLecture extends React.Component<any, AddLectureState> {
    public constructor(props) {
        super(props);
        this.state = {
            lecture: null,
            message: "",
            companies: [],
            attachment: null,
            image: null
        };

        this.updateState = this.updateState.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.uploadAttachment = this.uploadAttachment.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    public updateState() {
        let title = document.getElementById("title") as HTMLInputElement;
        let title_english = document.getElementById("company") as HTMLInputElement;
        let company = document.getElementById("company") as HTMLSelectElement;
        let description = document.getElementById("description") as HTMLInputElement;
        let description_english = document.getElementById("description_english") as HTMLInputElement;
        let lecturer = document.getElementById("lecturer") as HTMLInputElement;
        let room = document.getElementById("room") as HTMLInputElement;
        let datetime = document.getElementById("datetime") as HTMLInputElement;
        let attachment = document.getElementById("attachment") as HTMLInputElement;
        let image = document.getElementById("image") as HTMLInputElement;
        let bio = document.getElementById("bio") as HTMLInputElement;

        this.setState(prevState => {
            return {
                lecture: {
                    Id: 0,
                    Title: title.value,
                    TitleEnglish: title_english.value,
                    Description: description.value,
                    DescriptionEnglish: description_english.value,
                    DateTime: datetime.value,
                    Room: room.value,
                    LecturerName: lecturer.value,
                    LecturerBio: bio.value,
                    Attachment: attachment.value,
                    Image: image.value,
                    Company: null,
                    CompanyId: parseInt(company.options[company.selectedIndex].value, 10)
                },
                message: "",
                companies: prevState.companies,
                attachment: prevState.attachment,
                image: prevState.image
            }
        })
    }

    public submitForm() {
        let lecture = this.state.lecture;
        if (lecture.Attachment != null) lecture.Attachment = lecture.Attachment.split('\\').pop().split('/').pop();
        if (lecture.Image != null) lecture.Image = lecture.Image.split('\\').pop().split('/').pop();

        fetch("http://localhost:56871/api/Lectures", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lecture)
        }).then(result => result.json()).then(data => {
            if (this.state.lecture.Attachment && this.state.lecture.Attachment.length) {
                let attachment_data = {
                    Type: "lecture-attachment",
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

            if (this.state.lecture.Image && this.state.lecture.Image.length) {
                let attachment_data = {
                    Type: "lecture-image",
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

    public uploadAttachment() {
        this.updateState();

        let attachment = document.getElementById("attachment") as HTMLInputElement;
        let file = attachment.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let result = reader.result;
            this.setState(prevState => {
                return {
                    lecture: prevState.lecture,
                    message: prevState.message,
                    companies: prevState.companies,
                    attachment: result,
                    image: prevState.image
                }
            })
        };
    }

    public uploadImage() {
        this.updateState();

        let image = document.getElementById("image") as HTMLInputElement;
        let file = image.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let result = reader.result;
            this.setState(prevState => {
                return {
                    lecture: prevState.lecture,
                    message: prevState.message,
                    companies: prevState.companies,
                    attachment: prevState.attachment,
                    image: result
                }
            })
        };
    }

    public componentDidMount() {
        let username = "nikola"; // TODO: Get current user username
        fetch("http://localhost:56871/api/Companies?username=" + username, {method: 'GET'})
            .then(result => result.json())
            .then(items => this.setState(prevState => {
                return {
                    lecture: prevState.lecture,
                    message: prevState.message,
                    companies: items,
                }
            }));
    }

    public render() {
        return (
            <div className="container text-center">
                <h1 className="well">Add a company lecture</h1>
                {
                    this.state.message.length ? (
                        <div className="alert alert-danger">
                            {this.state.message}
                        </div>
                    ) : (<div/>)
                }
                <form className="form" role="form" onSubmit={this.submitForm} acceptCharset="UTF-8">
                    <div className="row">
                        <div className="col-md-5">
                            <input type="text" placeholder="Enter Lecture Serbian Title Here..."
                                   className="form-control" id="title" onChange={this.updateState}/>
                        </div>
                        <div className="col-md-5">
                            <input type="text" placeholder="Enter Lecture Title Here..."
                                   className="form-control" id="title_english" onChange={this.updateState}/>
                        </div>
                        <div className="col-md-2">
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
                                Description
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <textarea rows={5} placeholder="Enter Lecture Serbian Description Here..."
                                      className="form-control" id="description" onChange={this.updateState}/>
                        </div>
                        <div className="col-md-6">
                            <textarea rows={5} placeholder="Enter Lecture Description Here..."
                                      className="form-control" id="description_english" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Lecturer</label>
                            <input type="text" placeholder="Enter Lecturer Name Here..." className="form-control"
                                   id="lecturer" onChange={this.updateState}/>
                        </div>
                        <div className="col-md-4">
                            <label>Room</label>
                            <input type="text" placeholder="Enter Room Number Here..." className="form-control"
                                   id="room" onChange={this.updateState}/>
                        </div>
                        <div className="col-md-4">
                            <label>Date</label>
                            <input type="datetime-local" defaultValue={getTodayInputDateTimeString()}
                                   className="form-control" id="datetime" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Attachment</label>
                            <input type="file" className="form-control" id="attachment"
                                   onChange={this.updateState}/>
                        </div>
                        <div className="col-md-6">
                            <label>Image</label>
                            <input type="file" className="form-control" id="image"
                                   onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Lecturer Bio</label>
                            <textarea rows={2} placeholder="Enter Lecturer Bio Here..."
                                      className="form-control" id="bio" onChange={this.updateState}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-lg btn-info">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddLecture
