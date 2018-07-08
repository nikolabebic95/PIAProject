type Email = {
    Id: number,
    Email1: string,
}

type PhoneNumber = {
    Id: number,
    PhoneNumber1: string
}

type Company = {
    Id: number,
    Name: string,
    Address: string,
    City: string,
    ZipCode: string,
    Country: string,
    BankAccount: string,
    Currency: string,
    TaxNumber: string,
    ContactName: string,
    ContactPhone: string,
    ContactEmail: string,
    Logo: string,
    Emails: Email[],
    PhoneNumbers: PhoneNumber[]
}

type Announcement = {
    Id: number,
    Title: string,
    Description: string,
    IsInternship: boolean,
    IsJob: boolean,
    InputDateTime: string,
    Attachment: any,
    Deadline: string,
    Company: Company
}

type Lecture = {
    Id: number,
    Title: string,
    TitleEnglish: string,
    Description: string,
    DescriptionEnglish: string,
    DateTime: string,
    Room: string,
    LecturerName: string,
    LecturerBio: string,
    Attachment: any,
    Image: any,
    Company: Company
}

type UserTable = {
    Id: number,
    FirstName: string,
    LastName: string,
    Email: string,
    Organization: string,
    Username: string,
    Password: string,
    Gender: string,
    BirthDate: string,
    ProfilePicture: any,
    LinkedInAddress: string
}
