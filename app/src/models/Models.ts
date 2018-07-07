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
    LogoPath: string
    Emails: any[]
    PhoneNumbers: any[]
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
