import * as React from "react"

type AddCompanyState = {
    message: string
}

class AddCompany extends React.Component<any, AddCompanyState> {
    public constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
    }

    private updateState() {

    }

    private submitForm(event) {

    }

    public render() {
        return (
            <div className="container text-center">
                <h1 className="well">Add a partner company</h1>
                {
                    this.state.message.length ? (
                        <div className="alert alert-danger">
                            {this.state.message}
                        </div>
                    ) : (<div/>)
                }
                <form className="form" role="form" onSubmit={this.submitForm} acceptCharset="UTF-8">
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <label>Name <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Enter Name Here..."
                                   className="form-control" id="name" onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-4 form-group">
                            <label>Web Address <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Enter Web Address Here..."
                                   className="form-control" id="web_address" onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-4 form-group">
                            <label>Logo <span style={{color: "red"}}>*</span></label>
                            <input type="file" accept="image/*" className="form-control" id="logo"
                                   onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <label>City <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Enter City Here..."
                                   className="form-control" id="city" onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-4 form-group">
                            <label>Zip Code <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Enter Zip Code Here..."
                                   className="form-control" id="zip_code" onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-4 form-group">
                            <label>Country <span style={{color: "red"}}>*</span></label>
                            <input type="email" placeholder="Enter Country Here..."
                                   className="form-control" id="country" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <label>Bank Account <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Enter Bank Account Here..."
                                   className="form-control" id="bank_account" onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-4 form-group">
                            <label>Currency <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Enter Currency Here..."
                                   className="form-control" id="password" onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-4 form-group">
                            <label>Tax Number <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Enter Tax Number Here..."
                                   className="form-control" id="tax_number" onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 form-group">
                            <label>Phone numbers:</label>
                        </div>
                        <div className="col-sm-2 form-group">
                            <input type="tel" placeholder="Phone 1" className="form-control" id="phone_1"
                                   onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-2 form-group">
                            <input type="tel" placeholder="Phone 2" className="form-control" id="phone_2"
                                   onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-2 form-group">
                            <input type="tel" placeholder="Phone 3" className="form-control" id="phone_3"
                                   onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-2 form-group">
                            <input type="tel" placeholder="Phone 4" className="form-control" id="phone_4"
                                   onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-2 form-group">
                            <input type="tel" placeholder="Phone 5" className="form-control" id="phone_5"
                                   onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2 form-group">
                            <label>Emails:</label>
                        </div>
                        <div className="col-sm-2 form-group">
                            <input type="tel" placeholder="Email 1" className="form-control" id="email_1"
                                   onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-2 form-group">
                            <input type="tel" placeholder="Email 2" className="form-control" id="email_2"
                                   onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-2 form-group">
                            <input type="tel" placeholder="Email 3" className="form-control" id="email_3"
                                   onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-2 form-group">
                            <input type="tel" placeholder="Email 4" className="form-control" id="email_4"
                                   onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-2 form-group">
                            <input type="tel" placeholder="Email 5" className="form-control" id="email_5"
                                   onChange={this.updateState}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <label>Contact Name <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Enter Contact Name Here..."
                                   className="form-control" id="contact_name" onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-4 form-group">
                            <label>Contact Phone <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Enter Contact Phone Here..."
                                   className="form-control" id="contact_phone" onChange={this.updateState}/>
                        </div>
                        <div className="col-sm-4 form-group">
                            <label>Contact Email <span style={{color: "red"}}>*</span></label>
                            <input type="text" placeholder="Enter Contact Email Here..."
                                   className="form-control" id="contact_email" onChange={this.updateState}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-lg btn-info">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddCompany
