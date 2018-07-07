import * as React from "react"

type SignupState = {
    user: UserTable;
    message: string,
    confirm_password: string,
    profile_picture: any
}

// TODO: Implement actual signup
class Signup extends React.Component<any, SignupState> {
    public constructor(props) {
        super(props);

        this.state = {
            user: {
                Id: 0,
                FirstName: "",
                LastName: "",
                Email: "",
                Organization: "",
                Username: "",
                Password: "",
                Gender: "",
                BirthDate: "",
                ProfilePicture: null,
                LinkedInAddress: ""
            },
            message: "",
            confirm_password: "",
            profile_picture: null
        };

        this.updateState = this.updateState.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.updateProfilePicture = this.updateProfilePicture.bind(this);
    }

    private checkPassword(): boolean {
        return this.state.user.Password === this.state.confirm_password;
    }

    private checkRequiredFields(): boolean {
        return this.state.user.FirstName.length > 0 &&
            this.state.user.LastName.length > 0 &&
            this.state.user.Email.length > 0 &&
            this.state.user.Username.length > 0 &&
            this.state.user.Password.length > 0;
    }

    private checkPasswordRules(): boolean {
        let pass = this.state.user.Password;
        return pass.length >= 8 && pass.length <= 12 &&
            /.*[A-Z].*/.test(pass) &&
            /.*[a-z].*[a-z].*[a-z].*/.test(pass) &&
            /.*[0-9].*/.test(pass) &&
            /.*[^A-Za-z0-9].*/.test(pass) &&
            /^[A-Za-z].*/.test(pass) &&
            !/(.)\1\1+/.test(pass);
    }

    private setErrorMessage(message: string): void {
        this.setState(prevState => {
            return {
                user: prevState.user,
                message: message,
                confirm_password: prevState.confirm_password,
                profile_picture: null
            }
        });
    }

    private raiseError(message: string, event): boolean {
        this.setErrorMessage(message);
        event.preventDefault();
        return false;
    }

    private submitForm(event) {
        if (!this.checkPassword()) {
            return this.raiseError("Passwords don't match!", event);
        }

        if (!this.checkRequiredFields()) {
            return this.raiseError("You must fill all required fields", event);
        }

        if (!this.checkPasswordRules()) {
            return this.raiseError("Password does not obey rules - It must have between 8 and 12 characters," +
                " it must have at least 1 uppercase and at least 3 lowercase letters, it must have at least 1 number" +
                " and at least 1 special character, it must begin with a letter, and the maximum number of same" +
                " adjacent characters is 2", event);
        }

        this.props.history.push("/");
        return true;
    }

    private updateState() {
        let first_name = document.getElementById("first_name") as HTMLInputElement;
        let last_name = document.getElementById("last_name") as HTMLInputElement;
        let email = document.getElementById("email") as HTMLInputElement;
        let organization = document.getElementById("organization") as HTMLInputElement;
        let username = document.getElementById("username") as HTMLInputElement;
        let password = document.getElementById("password") as HTMLInputElement;
        let confirm_password = document.getElementById("confirm_password") as HTMLInputElement;
        let birth_date = document.getElementById("birth_date") as HTMLInputElement;
        let profile_picture = document.getElementById("profile_picture") as HTMLInputElement;
        let linkedin = document.getElementById("linkedin") as HTMLInputElement;

        let male = document.getElementById("gender_male") as HTMLInputElement;
        let female = document.getElementById("gender_female") as HTMLInputElement;

        let gender = male.checked ? "M" : female.checked ? "F" : "N";

        this.setState(prevState => {
            return {
                user: {
                    Id: 0,
                    FirstName: first_name.value,
                    LastName: last_name.value,
                    Email: email.value,
                    Organization: organization.value,
                    Username: username.value,
                    Password: password.value,
                    Gender: gender,
                    BirthDate: birth_date.value,
                    ProfilePicture: profile_picture.value,
                    LinkedInAddress: linkedin.value
                },
                message: "",
                confirm_password: confirm_password.value,
                profile_picture: prevState.profile_picture
            }
        })
    }

    private updateProfilePicture() {
        this.updateState();

        let profile_picture = document.getElementById("profile_picture") as HTMLInputElement;
        let file = profile_picture.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let result = reader.result;
            this.setState(prevState => {
                return {
                    user: prevState.user,
                    message: prevState.message,
                    confirm_password: prevState.confirm_password,
                    profile_picture: result
                }
            })
        };
    }

    public render() {
        return (
            <div className="container text-center">
                <h1 className="well">Registration Form</h1>
                {
                    this.state.message.length ? (
                        <div className="alert alert-danger">
                            {this.state.message}
                        </div>
                    ) : (<div/>)
                }
                <form className="form" role="form" onSubmit={this.submitForm} acceptCharset="UTF-8">
                    <div className="row">
                        <div className="col-sm-6 form-group">
                            <label>First Name <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Enter First Name Here..."
                                   className="form-control" id="first_name" onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>Last Name <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Enter Last Name Here..."
                                   className="form-control" id="last_name" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 form-group">
                            <label>Email <span style={{color: "red"}}>*</span></label>
                            <input type="email" placeholder="Enter Email Here..."
                                   className="form-control" id="email" onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>Organization</label>
                            <input type="text" placeholder="Enter Organization Name Here..."
                                   className="form-control" id="organization" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <label>Username <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Choose Username Here..."
                                   className="form-control" id="username" onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-4 form-group">
                            <label>Password <span style={{color: "red"}}>*</span></label>
                            <input type="password" placeholder="Enter Password Here..."
                                   className="form-control" id="password" onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-4 form-group">
                            <label>Confirm password <span style={{color: "red"}}>*</span></label>
                            <input type="password" placeholder="Confirm Password Here..."
                                   className="form-control" id="confirm_password" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <label>Birth date</label>
                            <input type="date" className="form-control" defaultValue="1995-12-29" id="birth_date"
                                   onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-4 form-group">
                            <label>Profile picture</label>
                            <input type="file" accept="image/*" className="form-control" id="profile_picture"
                                   onChange={this.updateProfilePicture}/>
                        </div>
                        <div className="col-sm-4 form-group">
                            <label>LinkedIn Address</label>
                            <input type="text" className="form-control" placeholder="Enter LinkedIn Address Here..."
                                   id="linkedin" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-sm-12">
                            <label>Gender</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <div className="radio">
                                <label><input type="radio" name="gender_radio" id="gender_male"
                                              onChange={this.updateState}/> Male</label>
                            </div>
                        </div>
                        <div className="col-sm-4 form-group">
                            <div className="radio">
                                <label><input type="radio" name="gender_radio" id="gender_female"
                                              onChange={this.updateState}/> Female</label>
                            </div>
                        </div>
                        <div className="col-sm-4 form-group">
                            <div className="radio">
                                <label><input type="radio" defaultChecked name="gender_radio" id="gender_neutral"
                                              onChange={this.updateState}/> I prefer not to
                                    disclose</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-lg btn-info">Submit</button>
                </form>
            </div>
        )
    }
}

export default Signup
