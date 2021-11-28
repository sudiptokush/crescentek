export interface CustomerModel {
    id: number;
    customerName: string;
    contactPerson: string;
    phoneNo: string;
    emailAddress: string;
    noOfSites: number;
    status: string;
    isBusiness: string;
    sites: SiteModel[];
    
}

export interface SiteModel {
    id: number;
    siteName: string;
    firstAddress: string;
    street: string;
    city: string;
    zipcode: string;
    country: string;
    description: string;
    subsite: SubsiteModel[];
}

export interface SubsiteModel {
    id: number;
    label: string;
    floor: string;
    status: string;
    description: string;
}