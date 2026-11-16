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
  satelliteMapUrl: string;
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
  streetViewUrl: '/ny-briggs-streetview-hd.jpg',
  mapUrl: '/ny-briggs-map-hd.jpg',
  satelliteMapUrl: '/ny-briggs-satellite-hd.jpg',
};

export function getNYPropertyDetails(address?: string): NYPropertyDetailsExact {
  if (!address) return MOCK_NY_PROPERTY_3010_BRIGGS;

  const addrUpper = address.toUpperCase();

  if (
    addrUpper.includes('WEST 2') ||
    addrUpper.includes('WEST 2ND') ||
    addrUpper.includes('2612') ||
    addrUpper.includes('2611')
  ) {
    return {
      title: '2612 WEST 2 STREET, Brooklyn, New York',
      bbl: '3071850024',
      status: 'SUCCESS',
      property: '2612 WEST 2 STREET',
      countyState: 'Kings (Brooklyn), NY',
      municipality: 'New York City',
      blockLot: 'Block 7185, Lot 24',
      zipCode: '11223',
      currentOwner: 'GRAVESEND RESIDENTIAL REALTY LLC',
      dateOfSearch: '10/12/2026',
      type: 'C1 - Multi-Family Walkup',
      yearBuilt: '1962',
      floors: '4',
      units: '16',
      lotArea: '14,200 sq ft',
      bblNumber: '3071850024',
      zoning: 'R6',
      taxAssessment: '$2,460,000',
      streetViewUrl: '/ny-2612-west2.jpg',
      mapUrl: '/ny-briggs-map-hd.jpg',
      satelliteMapUrl: '/ny-briggs-satellite-hd.jpg',
    };
  }

  if (
    addrUpper.includes('7 AVENUE') ||
    addrUpper.includes('AMERICAS') ||
    addrUpper.includes('BROADWAY') ||
    addrUpper.includes('5 AVENUE') ||
    addrUpper.includes('1 AVENUE') ||
    addrUpper.includes('3 AVENUE') ||
    addrUpper.includes('9 AVENUE') ||
    addrUpper.includes('6TH') ||
    addrUpper.includes('EAST 6')
  ) {
    return {
      title: `${address}, New York`,
      bbl: '1008010045',
      status: 'SUCCESS',
      property: address.split(',')[0],
      countyState: 'New York (Manhattan), NY',
      municipality: 'New York City',
      blockLot: 'Block 801, Lot 45',
      zipCode: '10001',
      currentOwner: 'MIDTOWN MANHATTAN HOLDINGS LLC',
      dateOfSearch: '11/16/2026',
      type: 'O4 - Commercial Office',
      yearBuilt: '1974',
      floors: '28',
      units: '82',
      lotArea: '48,000 sq ft',
      bblNumber: '1008010045',
      zoning: 'C6-4',
      taxAssessment: '$42,500,000',
      streetViewUrl: '/ny-manhattan-commercial.jpg',
      mapUrl: '/ny-briggs-map-hd.jpg',
      satelliteMapUrl: '/ny-briggs-satellite-hd.jpg',
    };
  }

  if (
    addrUpper.includes('AVENUE I') ||
    addrUpper.includes('174') ||
    addrUpper.includes('BEDFORD') ||
    addrUpper.includes('KINGS HIGHWAY') ||
    addrUpper.includes('HUDSON')
  ) {
    return {
      title: `${address}, New York`,
      bbl: '3076120018',
      status: 'SUCCESS',
      property: address.split(',')[0],
      countyState: address.includes('Queens')
        ? 'Queens, NY'
        : address.includes('Bronx')
        ? 'Bronx, NY'
        : 'Kings (Brooklyn), NY',
      municipality: 'New York City',
      blockLot: 'Block 7612, Lot 18',
      zipCode: '11210',
      currentOwner: 'NEW YORK METRO PROPERTIES TRUST',
      dateOfSearch: '11/12/2026',
      type: 'B2 - Two-Family Dwelling',
      yearBuilt: '1954',
      floors: '2',
      units: '2',
      lotArea: '3,800 sq ft',
      bblNumber: '3076120018',
      zoning: 'R4',
      taxAssessment: '$1,180,000',
      streetViewUrl: '/ny-brooklyn-residential.jpg',
      mapUrl: '/ny-briggs-map-hd.jpg',
      satelliteMapUrl: '/ny-briggs-satellite-hd.jpg',
    };
  }

  // Default: 3010 Briggs
  return {
    ...MOCK_NY_PROPERTY_3010_BRIGGS,
    title: address.includes('New York') ? address : `${address}, New York City`,
    property: address.split(',')[0],
    streetViewUrl: '/ny-briggs-streetview-hd.jpg',
  };
}

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
