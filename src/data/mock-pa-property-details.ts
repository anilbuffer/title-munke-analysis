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
  streetViewUrl: string;
  mapUrl: string;
  satelliteMapUrl: string;
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
  streetViewUrl: '/pa-6432-scholler.jpg',
  mapUrl: '/pa-scholler-map-hd.jpg',
  satelliteMapUrl: '/pa-scholler-satellite-hd.jpg',
};

export function getPAPropertyDetails(address?: string): PAPropertyDetails {
  if (!address) return MOCK_PA_PROPERTY_EXACT;

  const addrUpper = address.toUpperCase();

  if (addrUpper.includes('CHEW') || addrUpper.includes('2830')) {
    return {
      title: '2830 W CHEW ST, Allentown City, PA, Lehigh County, Pennsylvania',
      searchedOn: 'November 06, 2026',
      searchId: 'a7b82140-5e3a-4932-b712-42196d884102',
      status: 'SUCCESS',
      location: '2830 W Chew St, Allentown, Pennsylvania 18104',
      lots: '#14 (all), #15 (E 20 ft)',
      area: 'West End, Allentown City',
      property: '2830 W CHEW ST, Allentown City, PA',
      countyState: 'Lehigh County, Pennsylvania',
      municipality: 'City of Allentown',
      pinParcel: '549742618901',
      spanOfSearch: '60 years',
      dateOfSearch: 'November 06, 2026',
      currentOwner: 'David M. & Sarah L. Miller',
      taxAssessment: '$342,800',
      titleDeed: 'Special Warranty Deed recorded on 06/18/2014 at 09:14:00 AM, Doc ID 8192301',
      streetViewUrl: '/pa-2830-chew.jpg',
      mapUrl: '/pa-scholler-map-hd.jpg',
      satelliteMapUrl: '/pa-scholler-satellite-hd.jpg',
    };
  }

  if (addrUpper.includes('HILL') || addrUpper.includes('5829')) {
    return {
      title: '5829 HILL DR, Upper Macungie Township, PA, Lehigh County, Pennsylvania',
      searchedOn: 'November 11, 2026',
      searchId: 'b9d31952-4fc8-4720-91a1-53102c892401',
      status: 'SUCCESS',
      location: '5829 Hill Dr, Breinigsville, Pennsylvania 18031',
      lots: '#42 (all)',
      area: 'Upper Macungie, Lehigh County',
      property: '5829 HILL DR, Upper Macungie Township, PA',
      countyState: 'Lehigh County, Pennsylvania',
      municipality: 'Township of Upper Macungie',
      pinParcel: '547619283740',
      spanOfSearch: '60 years',
      dateOfSearch: 'November 11, 2026',
      currentOwner: 'Robert & Emily Chen',
      taxAssessment: '$495,200',
      titleDeed: 'Special Warranty Deed recorded on 03/22/2018 at 11:30:00 AM, Doc ID 7543219',
      streetViewUrl: '/pa-5829-hill.jpg',
      mapUrl: '/pa-scholler-map-hd.jpg',
      satelliteMapUrl: '/pa-scholler-satellite-hd.jpg',
    };
  }

  if (addrUpper.includes('READING') || addrUpper.includes('2868')) {
    return {
      title: '2868 READING RD, Allentown City, PA, Lehigh County, Pennsylvania',
      searchedOn: 'November 11, 2026',
      searchId: 'f2c91834-1920-410a-8192-310948b20194',
      status: 'SUCCESS',
      location: '2868 Reading Rd, Allentown, Pennsylvania 18104',
      lots: '#8 (all)',
      area: 'Allentown City, Lehigh County',
      property: '2868 READING RD, Allentown City, PA',
      countyState: 'Lehigh County, Pennsylvania',
      municipality: 'City of Allentown',
      pinParcel: '549721039841',
      spanOfSearch: '60 years',
      dateOfSearch: 'November 11, 2026',
      currentOwner: 'Marcus A. Vance',
      taxAssessment: '$278,900',
      titleDeed: 'Special Warranty Deed recorded on 01/15/2016 at 10:20:00 AM, Doc ID 7819204',
      streetViewUrl: '/pa-2830-chew.jpg',
      mapUrl: '/pa-scholler-map-hd.jpg',
      satelliteMapUrl: '/pa-scholler-satellite-hd.jpg',
    };
  }

  if (
    addrUpper.includes('RHOADS') ||
    addrUpper.includes('DRESHER') ||
    addrUpper.includes('HEFFNER') ||
    addrUpper.includes('HOLSTEIN')
  ) {
    return {
      title: `${address}, Lehigh County, Pennsylvania`,
      searchedOn: 'November 11, 2026',
      searchId: 'c8f12093-8da2-4b31-901c-62948b109234',
      status: 'SUCCESS',
      location: `${address}, Pennsylvania`,
      lots: '#101 (Parcel A)',
      area: 'Northwestern Lehigh County',
      property: address,
      countyState: 'Lehigh County, Pennsylvania',
      municipality: address.includes('Weisenberg') ? 'Township of Weisenberg' : 'Township of Lynn',
      pinParcel: '541809271630',
      spanOfSearch: '60 years',
      dateOfSearch: 'November 11, 2026',
      currentOwner: 'Singmaster Family Trust',
      taxAssessment: '$412,500',
      titleDeed: 'Special Warranty Deed recorded on 09/14/2012 at 02:45:00 PM, Doc ID 6928103',
      streetViewUrl: '/pa-country-home.jpg',
      mapUrl: '/pa-scholler-map-hd.jpg',
      satelliteMapUrl: '/pa-scholler-satellite-hd.jpg',
    };
  }

  // Default: Scholler Rd
  return {
    ...MOCK_PA_PROPERTY_EXACT,
    title: `${address}, Lehigh County, Pennsylvania`,
    property: address,
    streetViewUrl: '/pa-6432-scholler.jpg',
  };
}

export const MOCK_PA_DOCUMENTS_EXACT: PADocumentItem[] = [
  { srNo: 1, documentType: 'DOCUMENT 1', dateRecorded: '05/25/2010' },
  { srNo: 2, documentType: 'DOCUMENT 2', dateRecorded: '02/26/2013' },
  { srNo: 3, documentType: 'DOCUMENT 3', dateRecorded: '08/14/2015' },
  { srNo: 4, documentType: 'DOCUMENT 4', dateRecorded: '11/02/2018' },
  { srNo: 5, documentType: 'DOCUMENT 5', dateRecorded: '04/19/2021' },
  { srNo: 6, documentType: 'DOCUMENT 6', dateRecorded: '09/30/2023' },
  { srNo: 7, documentType: 'DOCUMENT 7', dateRecorded: '11/12/2026' },
];

export const MOCK_PA_VALUATION_DATA = {
  state: 'PA' as const,
  propertyAddress: '6432 SCHOLLER RD, Lynn Township, PA',
  marketValue: 445000,
  lowRange: 425000,
  highRange: 465000,
  pricePerSqFt: 188,
  medianPricePerSqFt: 179,
  taxAssessment: 289400,
  assessmentRatio: 65.0,
  confidenceScore: 96.2,
  titleLiquidityScore: 99,
  yoyAppreciation: 5.4,
  comps: [
    {
      address: '6410 Scholler Rd, Lynn Township, PA',
      salePrice: '$430,000',
      saleDate: '08/20/2026',
      distance: '0.12 mi',
      similarity: 96,
    },
    {
      address: '5815 Hill Dr, Upper Macungie, PA',
      salePrice: '$495,000',
      saleDate: '06/15/2026',
      distance: '0.45 mi',
      similarity: 93,
    },
    {
      address: '7620 Dresher Rd, Lynn Township, PA',
      salePrice: '$460,000',
      saleDate: '04/10/2026',
      distance: '0.60 mi',
      similarity: 91,
    },
    {
      address: '4060 Rhoads Rd, Weisenberg Township, PA',
      salePrice: '$415,000',
      saleDate: '02/08/2026',
      distance: '0.78 mi',
      similarity: 89,
    },
  ],
};

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
