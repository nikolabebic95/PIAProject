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
    Company: Company,
    CompanyId: number
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
    Company: Company,
    CompanyId: number
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

type PackageItem = {
    Id: number,
    Name: string,
    Description: string,
}

type Package = {
    Id: number,
    Name: string,
    Value: number,
    Duration: number,
    MaxNumCompaniesYearly: number,
    ShowName: boolean,
    ShowLogo: boolean
    PackageItems: PackageItem[]
}

type ContractStatus = {
    Id: number,
    Name: string,
}

type Contract = {
    Id: number,
    StartDate: string,
    EndDate: string,
    Comment: string,
    IsActive: boolean,
    CompanyId: number,
    Company: Company,
    PackageId: number,
    Package: Package,
    ContractStatus: ContractStatus,
    StatusId: number
}

type MoneyContract = {
    Value: number,
    IsBillSent: boolean,
    PaymentDate: string,
    Contract: Contract,
    ContractId: number
}

type DonorContract = {
    EstimatedValue: number,
    Description: string,
    Amount: number,
    DeliveryDate: string,
    Contract: Contract,
    ContractId: number
}
