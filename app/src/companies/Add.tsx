import * as React from "react"

type AddCompanyState = {
    message: string
    company: Company,
    logo: any
}

class AddCompany extends React.Component<any, AddCompanyState> {
    public constructor(props) {
        super(props);
        this.state = {
            message: "",
            company: {
                Id: 0,
                Name: "",
                Address: "",
                City: "",
                ZipCode: "",
                Country: "",
                BankAccount: "",
                Currency: "",
                TaxNumber: "",
                ContactName: "",
                ContactPhone: "",
                ContactEmail: "",
                Logo: "",
                Emails: [
                    {
                        Id: 0,
                        Email1: ""
                    },
                    {
                        Id: 0,
                        Email1: ""
                    },
                    {
                        Id: 0,
                        Email1: ""
                    },
                    {
                        Id: 0,
                        Email1: ""
                    },
                    {
                        Id: 0,
                        Email1: ""
                    }
                ],
                PhoneNumbers: [
                    {
                        Id: 0,
                        PhoneNumber1: ""
                    },
                    {
                        Id: 0,
                        PhoneNumber1: ""
                    },
                    {
                        Id: 0,
                        PhoneNumber1: ""
                    },
                    {
                        Id: 0,
                        PhoneNumber1: ""
                    },
                    {
                        Id: 0,
                        PhoneNumber1: ""
                    }
                ]
            },
            logo: null
        };

        this.updateState = this.updateState.bind(this);
        this.updateLogo = this.updateLogo.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    private updateState() {
        let name = document.getElementById("name") as HTMLInputElement;
        let web_address = document.getElementById("web_address") as HTMLInputElement;
        let logo = document.getElementById("logo") as HTMLInputElement;
        let city = document.getElementById("city") as HTMLInputElement;
        let zip_code = document.getElementById("zip_code") as HTMLInputElement;
        let country = document.getElementById("country") as HTMLInputElement;
        let bank_account = document.getElementById("bank_account") as HTMLInputElement;
        let currency = document.getElementById("currency") as HTMLInputElement;
        let tax_number = document.getElementById("tax_number") as HTMLInputElement;

        let phone_1 = document.getElementById("phone_1") as HTMLInputElement;
        let phone_2 = document.getElementById("phone_2") as HTMLInputElement;
        let phone_3 = document.getElementById("phone_3") as HTMLInputElement;
        let phone_4 = document.getElementById("phone_4") as HTMLInputElement;
        let phone_5 = document.getElementById("phone_5") as HTMLInputElement;

        let email_1 = document.getElementById("email_1") as HTMLInputElement;
        let email_2 = document.getElementById("email_2") as HTMLInputElement;
        let email_3 = document.getElementById("email_3") as HTMLInputElement;
        let email_4 = document.getElementById("email_4") as HTMLInputElement;
        let email_5 = document.getElementById("email_5") as HTMLInputElement;

        let contact_name = document.getElementById("contact_name") as HTMLInputElement;
        let contact_phone = document.getElementById("contact_phone") as HTMLInputElement;
        let contact_email = document.getElementById("contact_email") as HTMLInputElement;

        this.setState(prevState => {
            return {
                message: "",
                company: {
                    Id: 0,
                    Name: name.value,
                    Address: web_address.value,
                    Logo: logo.value,
                    City: city.value,
                    ZipCode: zip_code.value,
                    Country: country.value,
                    BankAccount: bank_account.value,
                    Currency: currency.value,
                    TaxNumber: tax_number.value,
                    PhoneNumbers: [
                        {
                            Id: 0,
                            PhoneNumber1: phone_1.value
                        },
                        {
                            Id: 0,
                            PhoneNumber1: phone_2.value
                        },
                        {
                            Id: 0,
                            PhoneNumber1: phone_3.value
                        },
                        {
                            Id: 0,
                            PhoneNumber1: phone_4.value
                        },
                        {
                            Id: 0,
                            PhoneNumber1: phone_5.value
                        }
                    ],
                    Emails: [
                        {
                            Id: 0,
                            Email1: email_1.value
                        },
                        {
                            Id: 0,
                            Email1: email_2.value
                        },
                        {
                            Id: 0,
                            Email1: email_3.value
                        },
                        {
                            Id: 0,
                            Email1: email_4.value
                        },
                        {
                            Id: 0,
                            Email1: email_5.value
                        }
                    ],
                    ContactName: contact_name.value,
                    ContactPhone: contact_phone.value,
                    ContactEmail: contact_email.value
                },
                logo: prevState.logo
            }
        })
    }

    private submitForm(event) {
        let company = this.state.company;
        company.Emails = company.Emails.filter(email => email.Email1.length > 0);
        company.PhoneNumbers = company.PhoneNumbers.filter(number => number.PhoneNumber1.length > 0);
        company.Logo = company.Logo.split('\\').pop().split('/').pop();

        fetch("http://localhost:56871/api/Companies", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(company)
        }).then(result => result.json()).then(data => {
            let image_data = {
                Type: "company",
                Id: data.Id,
                Data: btoa(this.state.logo)
            };
            fetch("http://localhost:56871/api/Data", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(image_data)
            }).then(response => {
                // Do nothing
            })
        });
        this.props.history.push("/");
        return true;
    }

    private updateLogo() {
        this.updateState();

        let logo = document.getElementById("logo") as HTMLInputElement;
        let file = logo.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let result = reader.result;
            this.setState(prevState => {
                return {
                    message: prevState.message,
                    company: prevState.company,
                    logo: result
                }
            })
        };
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
                                   onChange={this.updateLogo}/>
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
                            <input type="text" placeholder="Enter Country Here..."
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
                                   className="form-control" id="currency" onChange={this.updateState}/>
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
