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
  parcelPin: '5418-47-2849-1',
  landUseCode: '110 - Single Family Residential',
  acreage: '12.45 Acres',
  yearBuilt: '1988',
  livingArea: '3,420 sq ft',
  totalRooms: '9 (4 Beds / 3 Baths)',
  zoning: 'A - Agricultural Preservation',
  taxAssessment: '$348,500',
  cleanAndGreen: 'Enrolled (Act 319)',
  schoolDistrict: 'Northwestern Lehigh',
  recordedOwner: 'Scholler Homestead Trust',
  status: 'SUCCESS',
  totalDocuments: 14,
  lastDocumentRecorded: '11/12/2026 12:15 PM',
  legalDescription:
    'All that certain tract or piece of land situate in the Township of Lynn, County of Lehigh, Commonwealth of Pennsylvania, bounded and described according to a survey and plan thereof made by Lehigh County GIS & Assessment Division, Parcel ID 5418-47-2849-1.',
  photoUrl:
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
  mapParcelUrl:
    'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
};

export const MOCK_PA_DOCUMENT_TRANSACTIONS: PADocumentTransaction[] = [
  {
    id: 'PA-TX-01',
    documentId: '20260008492',
    recordedDate: '11/12/2026 12:15 PM',
    docType: 'Deed / Special Warranty',
    action: 'View',
  },
  {
    id: 'PA-TX-02',
    documentId: '20260007321',
    recordedDate: '11/11/2026 04:27 PM',
    docType: 'Mortgage / Fulton Bank',
    action: 'View',
  },
  {
    id: 'PA-TX-03',
    documentId: '20260006894',
    recordedDate: '11/11/2026 01:00 PM',
    docType: 'Satisfaction of Mortgage',
    action: 'View',
  },
  {
    id: 'PA-TX-04',
    documentId: '20260005118',
    recordedDate: '11/11/2026 11:52 AM',
    docType: 'Agricultural Conservation Easement',
    action: 'View',
  },
  {
    id: 'PA-TX-05',
    documentId: '20260004920',
    recordedDate: '11/11/2026 11:26 AM',
    docType: 'Right of Way Agreement',
    action: 'View',
  },
  {
    id: 'PA-TX-06',
    documentId: '20260003841',
    recordedDate: '11/11/2026 10:21 AM',
    docType: 'Release of Encumbrance',
    action: 'View',
  },
  {
    id: 'PA-TX-07',
    documentId: '20260002955',
    recordedDate: '11/06/2026 03:09 PM',
    docType: 'Assignment of Leases & Rents',
    action: 'View',
  },
  {
    id: 'PA-TX-08',
    documentId: '20260002104',
    recordedDate: '11/06/2026 12:33 PM',
    docType: 'Mortgage Modification Agreement',
    action: 'View',
  },
  {
    id: 'PA-TX-09',
    documentId: '20260001889',
    recordedDate: '11/06/2026 12:27 PM',
    docType: 'Satisfaction of Prior Lien',
    action: 'View',
  },
  {
    id: 'PA-TX-10',
    documentId: '20260001402',
    recordedDate: '11/05/2026 07:02 PM',
    docType: 'Clean and Green Act Covenant (Act 319)',
    action: 'View',
  },
  {
    id: 'PA-TX-11',
    documentId: '20260000918',
    recordedDate: '11/05/2026 05:59 PM',
    docType: 'Boundary Line Agreement',
    action: 'View',
  },
  {
    id: 'PA-TX-12',
    documentId: '20260000441',
    recordedDate: '11/04/2026 04:05 PM',
    docType: 'Subordination Agreement',
    action: 'View',
  },
  {
    id: 'PA-TX-13',
    documentId: '20260000120',
    recordedDate: '11/03/2026 10:21 AM',
    docType: 'Quitclaim Deed',
    action: 'View',
  },
  {
    id: 'PA-TX-14',
    documentId: '19940003189',
    recordedDate: '10/14/1994 10:32 AM',
    docType: 'Original Homestead Deed & Grant',
    action: 'View',
    highlighted: true,
  },
];
