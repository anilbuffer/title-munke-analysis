export interface PAPropertyDetails {
  title: string;
  searchedOn: string;
  searchId: string;
  status: 'SUCCESS';
  location: string;
  lots: string;
  area: string;
  property: string;
  countyState: string;
  municipality: string;
  pinParcel: string;
  spanOfSearch: string;
  dateOfSearch: string;
  currentOwner: string;
  taxAssessment: string;
  titleDeed: string;
}

export interface PADocumentItem {
  srNo: number;
  documentType: string;
  dateRecorded: string;
}

export const MOCK_PA_PROPERTY_EXACT: PAPropertyDetails = {
  title: '6432 SCHOLLER RD, Lynn Township, PA, Lehigh County, Pennsylvania',
  searchedOn: 'November 12, 2026',
  searchId: 'c9c11275-7eb5-4a8d-94b8-52896d236472',
  status: 'SUCCESS',
  location: '6432 Scholler Rd, Kempton, Pennsylvania 19529',
  lots: '#91 (W 34 ft), #92 (all)',
  area: 'Allentown, Lehigh County',
  property: '6432 SCHOLLER RD, Lynn Township, PA',
  countyState: 'Lehigh County, Pennsylvania',
  municipality: 'Township of Lynn',
  pinParcel: '541808671290',
  spanOfSearch: '60 years',
  dateOfSearch: 'November 12, 2026',
  currentOwner: 'Jacob Singmaster',
  taxAssessment: '$289400',
  titleDeed:
    'Special Warranty Deed recorded on 05/13/2003 at 10:56:00 AM, Document ID 7085694',
};

export const MOCK_PA_DOCUMENTS_EXACT: PADocumentItem[] = [
  { srNo: 1, documentType: 'DOCUMENT 1', dateRecorded: '05/25/2010' },
  { srNo: 2, documentType: 'DOCUMENT 2', dateRecorded: '02/26/2013' },
  { srNo: 3, documentType: 'DOCUMENT 3', dateRecorded: '08/14/2015' },
  { srNo: 4, documentType: 'DOCUMENT 4', dateRecorded: '11/02/2018' },
  { srNo: 5, documentType: 'DOCUMENT 5', dateRecorded: '04/19/2021' },
  { srNo: 6, documentType: 'DOCUMENT 6', dateRecorded: '09/30/2023' },
  { srNo: 7, documentType: 'DOCUMENT 7', dateRecorded: '11/12/2026' },
];

// Backward-compatible exports
export interface PAPropertyOverview {
  address: string;
  subAddress: string;
  countyMunicipality: string;
  parcelPin: string;
  landUseCode: string;
  acreage: string;
  yearBuilt: string;
  livingArea: string;
  totalRooms: string;
  zoning: string;
  taxAssessment: string;
  cleanAndGreen: string;
  schoolDistrict: string;
  recordedOwner: string;
  status: 'SUCCESS';
  totalDocuments: number;
  lastDocumentRecorded: string;
  legalDescription: string;
  photoUrl: string;
  mapParcelUrl: string;
}

export interface PADocumentTransaction {
  id: string;
  documentId: string;
  recordedDate: string;
  docType: string;
  action: string;
  highlighted?: boolean;
}

export const MOCK_PA_PROPERTY_6432_SCHOLLER: PAPropertyOverview = {
  address: '6432 SCHOLLER RD, Lynn Township, PA',
  subAddress: '6432 Scholler Rd, New Tripoli, PA 18066',
  countyMunicipality: 'Lehigh County / Lynn Township',
  parcelPin: '541808671290',
  landUseCode: '110 - Single Family Residential',
  acreage: '12.45 Acres',
  yearBuilt: '1988',
  livingArea: '3,420 sq ft',
  totalRooms: '9 (4 Beds / 3 Baths)',
  zoning: 'A - Agricultural Preservation',
  taxAssessment: '$289400',
  cleanAndGreen: 'Enrolled (Act 319)',
  schoolDistrict: 'Northwestern Lehigh',
  recordedOwner: 'Jacob Singmaster',
  status: 'SUCCESS',
  totalDocuments: 14,
  lastDocumentRecorded: '11/12/2026 12:15 PM',
  legalDescription:
    'All that certain tract or piece of land situate in the Township of Lynn, County of Lehigh, Commonwealth of Pennsylvania, bounded and described according to a survey and plan thereof made by Lehigh County GIS & Assessment Division, Parcel ID 541808671290.',
  photoUrl:
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
  mapParcelUrl:
    'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
};

export const MOCK_PA_DOCUMENT_TRANSACTIONS: PADocumentTransaction[] = [
  {
    id: 'PA-TX-01',
    documentId: 'DOCUMENT 1',
    recordedDate: '05/25/2010',
    docType: 'Deed / Special Warranty',
    action: 'View',
  },
  {
    id: 'PA-TX-02',
    documentId: 'DOCUMENT 2',
    recordedDate: '02/26/2013',
    docType: 'Mortgage / Fulton Bank',
    action: 'View',
  },
  {
    id: 'PA-TX-03',
    documentId: 'DOCUMENT 3',
    recordedDate: '08/14/2015',
    docType: 'Satisfaction of Mortgage',
    action: 'View',
  },
  {
    id: 'PA-TX-04',
    documentId: 'DOCUMENT 4',
    recordedDate: '11/02/2018',
    docType: 'Agricultural Conservation Easement',
    action: 'View',
  },
  {
    id: 'PA-TX-05',
    documentId: 'DOCUMENT 5',
    recordedDate: '04/19/2021',
    docType: 'Right of Way Agreement',
    action: 'View',
  },
  {
    id: 'PA-TX-06',
    documentId: 'DOCUMENT 6',
    recordedDate: '09/30/2023',
    docType: 'Release of Encumbrance',
    action: 'View',
  },
  {
    id: 'PA-TX-07',
    documentId: 'DOCUMENT 7',
    recordedDate: '11/12/2026',
    docType: 'Title Certification',
    action: 'View',
  },
];
