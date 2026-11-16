export interface NYPropertyDetailsExact {
  title: string;
  bbl: string;
  status: 'SUCCESS';
  property: string;
  countyState: string;
  municipality: string;
  blockLot: string;
  zipCode: string;
  currentOwner: string;
  dateOfSearch: string;
  type: string;
  yearBuilt: string;
  floors: string;
  units: string;
  lotArea: string;
  bblNumber: string;
  zoning: string;
  taxAssessment: string;
  streetViewUrl: string;
  mapUrl: string;
}

export interface NYDocumentItemExact {
  srNo: number;
  documentType: string;
  dateRecorded: string;
}

export const MOCK_NY_PROPERTY_3010_BRIGGS: NYPropertyDetailsExact = {
  title: '3010 BRIGGS AVENUE, BX, New York City',
  bbl: '2032990060',
  status: 'SUCCESS',
  property: '3010 BRIGGS AVENUE',
  countyState: 'BX, NY',
  municipality: 'New York City',
  blockLot: 'Block 3299, Lot 60',
  zipCode: '10458',
  currentOwner: 'NYC DEPARTMENT OF PARKS AND RECREATION',
  dateOfSearch: '11/16/2026',
  type: 'W1',
  yearBuilt: '1957',
  floors: '2',
  units: '1',
  lotArea: '92000 sq ft',
  bblNumber: '2032990060',
  zoning: 'R8',
  taxAssessment: '$7,843,500',
  streetViewUrl: '/ny-briggs-streetview.jpg',
  mapUrl: '/ny-briggs-map.jpg',
};

export const MOCK_NY_DOCUMENTS_3010_BRIGGS: NYDocumentItemExact[] = [
  { srNo: 1, documentType: 'DOCUMENT 1', dateRecorded: '08/14/2007' },
  { srNo: 2, documentType: 'DOCUMENT 2', dateRecorded: '04/22/2012' },
  { srNo: 3, documentType: 'DOCUMENT 3', dateRecorded: '10/05/2015' },
  { srNo: 4, documentType: 'DOCUMENT 4', dateRecorded: '03/18/2018' },
  { srNo: 5, documentType: 'DOCUMENT 5', dateRecorded: '07/29/2021' },
  { srNo: 6, documentType: 'DOCUMENT 6', dateRecorded: '01/14/2024' },
  { srNo: 7, documentType: 'DOCUMENT 7', dateRecorded: '11/16/2026' },
];

export const MOCK_NY_VALUATION_DATA = {
  state: 'NY' as const,
  propertyAddress: '3010 BRIGGS AVENUE, BX, New York City',
  marketValue: 11250000,
  lowRange: 10800000,
  highRange: 11700000,
  pricePerSqFt: 122,
  medianPricePerSqFt: 115,
  taxAssessment: 7843500,
  assessmentRatio: 69.7,
  confidenceScore: 95.4,
  titleLiquidityScore: 98,
  yoyAppreciation: 6.8,
  comps: [
    {
      address: '3025 Briggs Ave, Bronx, NY',
      salePrice: '$1,280,000',
      saleDate: '09/14/2026',
      distance: '0.08 mi',
      similarity: 97,
    },
    {
      address: '2980 Grand Concourse, Bronx, NY',
      salePrice: '$2,150,000',
      saleDate: '07/22/2026',
      distance: '0.22 mi',
      similarity: 94,
    },
    {
      address: '280 E 198th St, Bronx, NY',
      salePrice: '$945,000',
      saleDate: '05/18/2026',
      distance: '0.18 mi',
      similarity: 92,
    },
    {
      address: '3050 Bainbridge Ave, Bronx, NY',
      salePrice: '$1,820,000',
      saleDate: '03/11/2026',
      distance: '0.35 mi',
      similarity: 90,
    },
  ],
};

// Backward-compatible exports
export interface NYPropertyOverview {
  address: string;
  subAddress: string;
  borough: string;
  blockLot: string;
  buildingClass: string;
  grossSqFt: string;
  yearBuilt: string;
  residentialUnits: string;
  totalUnits: string;
  zoning: string;
  taxClass: string;
  stories: string;
  lotSize: string;
  buildingDepth: string;
  buildingFrontage: string;
  corner: string;
  owner: string;
  status: 'SUCCESS';
  totalDocuments: number;
  lastDocumentRecorded: string;
  legalDescription: string;
  streetViewUrl: string;
  mapParcelUrl: string;
}

export interface NYDocumentTransaction {
  id: string;
  documentId: string;
  recordedDate: string;
  docType: string;
  action: string;
  highlighted?: boolean;
}

export const MOCK_NY_PROPERTY_450_7TH_AVE: NYPropertyOverview = {
  address: '3010 BRIGGS AVENUE, BX, New York City',
  subAddress: '3010 Briggs Ave, Bronx, NY 10458',
  borough: 'Bronx (BX)',
  blockLot: '3299 / 60',
  buildingClass: 'W1 - Educational / Recreational Facilities',
  grossSqFt: '92,000 sq ft',
  yearBuilt: '1957',
  residentialUnits: '0',
  totalUnits: '1',
  zoning: 'R8',
  taxClass: '4',
  stories: '2',
  lotSize: '200 x 460 ft',
  buildingDepth: '180 ft',
  buildingFrontage: '200 ft',
  corner: 'NE',
  owner: 'NYC DEPARTMENT OF PARKS AND RECREATION',
  status: 'SUCCESS',
  totalDocuments: 7,
  lastDocumentRecorded: '11/16/2026',
  legalDescription:
    'All that certain plot, piece or parcel of land, situate, lying and being in the Borough of Bronx, City and State of New York, designated as Block 3299, Lot 60.',
  streetViewUrl: '/ny-briggs-streetview.jpg',
  mapParcelUrl: '/ny-briggs-map.jpg',
};

export const MOCK_NY_DOCUMENT_TRANSACTIONS: NYDocumentTransaction[] = MOCK_NY_DOCUMENTS_3010_BRIGGS.map((doc) => ({
  id: `NY-TX-${doc.srNo}`,
  documentId: doc.documentType,
  recordedDate: doc.dateRecorded,
  docType: 'Deed / Municipal Conveyance',
  action: 'View',
}));

export interface ACRISRecordedDocument {
  id: string;
  crfn: string;
  docDate: string;
  recordedDate: string;
  docType: string;
  docTypeDesc: string;
  party1: string;
  party2: string;
  docAmount: string;
  status: string;
}

export const MOCK_ACRIS_RECORDED_DOCS: ACRISRecordedDocument[] = MOCK_NY_DOCUMENTS_3010_BRIGGS.map((doc) => ({
  id: `ACRIS-${doc.srNo}`,
  crfn: `2026000${doc.srNo}892`,
  docDate: doc.dateRecorded,
  recordedDate: doc.dateRecorded,
  docType: 'MUNICIPAL',
  docTypeDesc: doc.documentType,
  party1: 'CITY OF NEW YORK',
  party2: 'NYC DEPARTMENT OF PARKS AND RECREATION',
  docAmount: '$0.00',
  status: 'Verified',
}));
