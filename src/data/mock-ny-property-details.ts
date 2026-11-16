export interface NYPropertyOverview {
  address: string;
  borough: string;
  city: string;
  state: string;
  zip: string;
  bbl: string;
  block: string;
  lot: string;
  buildingClass: string;
  propertyType: string;
  stories: number;
  yearBuilt: number;
  grossFloorArea: string;
  lotDimensions: string;
  zoning: string;
  taxClass: string;
  currentOwner: string;
  status: 'SUCCESS' | 'PENDING' | 'FLAGGED';
  totalDocsCount: number;
  streetViewUrl: string;
  mapParcelUrl: string;
}

export interface ACRISRecordedDocument {
  id: string;
  crfn: string;
  docDate: string;
  recordedDate: string;
  docType: 'DEED' | 'MTGE' | 'AGMT' | 'SAT' | 'UCC' | 'AL&R' | 'LEAS' | 'REL';
  docTypeDesc: string;
  party1: string; // Grantor / Mortgagor
  party2: string; // Grantee / Mortgagee
  docAmount: string;
  docPercent?: string;
  pdfUrl?: string;
  status: 'Recorded' | 'Verified' | 'Active';
}

export const MOCK_NY_PROPERTY_450_7TH_AVE: NYPropertyOverview = {
  address: '450 7 AVENUE',
  borough: 'Manhattan',
  city: 'New York City',
  state: 'NY',
  zip: '10123',
  bbl: '1-00784-0043',
  block: '784',
  lot: '43',
  buildingClass: 'O4 - Commercial / Office Buildings',
  propertyType: 'Office Tower (Nelson Tower)',
  stories: 46,
  yearBuilt: 1930,
  grossFloorArea: '518,000 sq ft',
  lotDimensions: '98.75 ft x 142.5 ft',
  zoning: 'C6-6 (Midtown Commercial District)',
  taxClass: 'Class 4 - Commercial',
  currentOwner: '450 SEVENTH AVENUE REALTY CORP.',
  status: 'SUCCESS',
  totalDocsCount: 78,
  streetViewUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
  mapParcelUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80',
};

export const MOCK_ACRIS_RECORDED_DOCS: ACRISRecordedDocument[] = [
  {
    id: 'DOC-01',
    crfn: '2024000189421',
    docDate: '10/24/2024',
    recordedDate: '11/02/2024',
    docType: 'AGMT',
    docTypeDesc: 'AGREEMENT / LEASE MODIFICATION',
    party1: '450 SEVENTH AVENUE REALTY LLC',
    party2: 'JPMORGAN CHASE BANK, N.A.',
    docAmount: '$0.00',
    status: 'Verified',
  },
  {
    id: 'DOC-02',
    crfn: '2023000412890',
    docDate: '06/15/2023',
    recordedDate: '06/28/2023',
    docType: 'MTGE',
    docTypeDesc: 'MORTGAGE / CONSOLIDATION',
    party1: '450 SEVENTH AVENUE REALTY LLC',
    party2: 'NEW YORK LIFE INSURANCE COMPANY',
    docAmount: '$135,000,000.00',
    status: 'Verified',
  },
  {
    id: 'DOC-03',
    crfn: '2023000412891',
    docDate: '06/15/2023',
    recordedDate: '06/28/2023',
    docType: 'AL&R',
    docTypeDesc: 'ASSIGNMENT OF LEASES AND RENTS',
    party1: '450 SEVENTH AVENUE REALTY LLC',
    party2: 'NEW YORK LIFE INSURANCE COMPANY',
    docAmount: '$0.00',
    status: 'Verified',
  },
  {
    id: 'DOC-04',
    crfn: '2023000412892',
    docDate: '06/15/2023',
    recordedDate: '06/28/2023',
    docType: 'SAT',
    docTypeDesc: 'SATISFACTION OF MORTGAGE',
    party1: 'CITIBANK, N.A. (TRUSTEE)',
    party2: '450 SEVENTH AVENUE REALTY LLC',
    docAmount: '$92,500,000.00',
    status: 'Verified',
  },
  {
    id: 'DOC-05',
    crfn: '2022000084320',
    docDate: '01/18/2022',
    recordedDate: '02/04/2022',
    docType: 'UCC',
    docTypeDesc: 'UCC FINANCING STATEMENT (FIXTURE FILING)',
    party1: '450 SEVENTH AVENUE REALTY LLC',
    party2: 'DEUTSCHE BANK TRUST COMPANY',
    docAmount: '$0.00',
    status: 'Verified',
  },
  {
    id: 'DOC-06',
    crfn: '2019000329104',
    docDate: '09/12/2019',
    recordedDate: '09/25/2019',
    docType: 'DEED',
    docTypeDesc: 'BARGAIN AND SALE DEED WITH COVENANT',
    party1: 'NELSON TOWER PROPERTIES LLC',
    party2: '450 SEVENTH AVENUE REALTY LLC',
    docAmount: '$210,000,000.00',
    status: 'Verified',
  },
  {
    id: 'DOC-07',
    crfn: '2019000329105',
    docDate: '09/12/2019',
    recordedDate: '09/25/2019',
    docType: 'MTGE',
    docTypeDesc: 'BUILDING LOAN MORTGAGE',
    party1: '450 SEVENTH AVENUE REALTY LLC',
    party2: 'CITIBANK, N.A.',
    docAmount: '$92,500,000.00',
    status: 'Verified',
  },
  {
    id: 'DOC-08',
    crfn: '2016000219430',
    docDate: '05/20/2016',
    recordedDate: '06/08/2016',
    docType: 'AGMT',
    docTypeDesc: 'SUBORDINATION, NON-DISTURBANCE AND ATTORNMENT',
    party1: 'NELSON TOWER PROPERTIES LLC',
    party2: 'WEWORK 450 7TH AVENUE TENANT LLC',
    docAmount: '$0.00',
    status: 'Verified',
  },
  {
    id: 'DOC-09',
    crfn: '2014000492100',
    docDate: '11/04/2014',
    recordedDate: '11/19/2014',
    docType: 'SAT',
    docTypeDesc: 'SATISFACTION OF MORTGAGE',
    party1: 'WELLS FARGO BANK, N.A.',
    party2: 'NELSON TOWER PROPERTIES LLC',
    docAmount: '$55,000,000.00',
    status: 'Verified',
  },
  {
    id: 'DOC-10',
    crfn: '2012000189042',
    docDate: '04/10/2012',
    recordedDate: '04/29/2012',
    docType: 'MTGE',
    docTypeDesc: 'FIRST LEASEHOLD MORTGAGE',
    party1: 'NELSON TOWER PROPERTIES LLC',
    party2: 'WELLS FARGO BANK, N.A.',
    docAmount: '$55,000,000.00',
    status: 'Verified',
  },
  {
    id: 'DOC-11',
    crfn: '2008000042188',
    docDate: '01/14/2008',
    recordedDate: '01/29/2008',
    docType: 'DEED',
    docTypeDesc: 'CONFIRMATORY DEED',
    party1: '450 SEVENTH ASSOCIATES L.P.',
    party2: 'NELSON TOWER PROPERTIES LLC',
    docAmount: '$0.00',
    status: 'Verified',
  },
  {
    id: 'DOC-12',
    crfn: '2004000674391',
    docDate: '08/22/2004',
    recordedDate: '09/05/2004',
    docType: 'REL',
    docTypeDesc: 'RELEASE OF TAX LIEN & ESCROW',
    party1: 'NEW YORK STATE DEPARTMENT OF TAXATION',
    party2: '450 SEVENTH ASSOCIATES L.P.',
    docAmount: '$0.00',
    status: 'Verified',
  },
];
