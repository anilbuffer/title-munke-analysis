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
  address: '450 7 AVENUE, MN, New York City',
  subAddress: '450 7th Ave, New York, NY 10123',
  borough: 'Manhattan',
  blockLot: '784 / 44',
  buildingClass: 'Office with Comm (O4)',
  grossSqFt: '553,000 sq ft',
  yearBuilt: '1930',
  residentialUnits: '0',
  totalUnits: '32',
  zoning: 'C6-6',
  taxClass: '4',
  stories: '31',
  lotSize: '98.75 x 197.5 ft',
  buildingDepth: '197.5 ft',
  buildingFrontage: '98.75 ft',
  corner: 'SW',
  owner: 'Nelson Tower LLC',
  status: 'SUCCESS',
  totalDocuments: 78,
  lastDocumentRecorded: '11/12/2026 12:15 PM',
  legalDescription:
    'All that certain plot, piece or parcel of land, with the buildings and improvements thereon erected, situate, lying and being in the Borough of Manhattan, City, County and State of New York, Block 784, Lot 44. Recorded and verified against NYC Department of Finance ACRIS Database.',
  streetViewUrl:
    'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
  mapParcelUrl:
    'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
};

const DOC_TYPES = [
  'Satisfaction of Mortgage',
  'Agreement',
  'Mortgage',
  'Assignment of Leases and Rents',
  'UCC Financing Statement',
  'Deed',
  'Subordination Agreement',
  'UCC Continuation',
  'Release of Mortgage',
  'Lease',
  'Modification of Mortgage',
  'Sundry / Miscellaneous',
];

const DATES: string[] = [
  '11/12/2026 12:15 PM', '11/11/2026 04:27 PM', '11/11/2026 01:00 PM', '11/11/2026 11:52 AM',
  '11/11/2026 11:26 AM', '11/11/2026 10:21 AM', '11/06/2026 03:09 PM', '11/06/2026 12:33 PM',
  '11/06/2026 12:27 PM', '11/05/2026 07:02 PM', '11/05/2026 05:59 PM', '11/04/2026 04:05 PM',
  '11/03/2026 10:21 AM', '10/14/2026 10:32 AM', '09/28/2026 02:15 PM', '09/15/2026 11:30 AM',
  '08/21/2026 04:10 PM', '08/04/2026 09:45 AM', '07/19/2026 03:20 PM', '06/28/2026 01:15 PM',
  '06/15/2026 10:00 AM', '05/30/2026 02:45 PM', '05/12/2026 11:10 AM', '04/25/2026 04:30 PM',
  '04/08/2026 09:20 AM', '03/22/2026 01:50 PM', '03/05/2026 11:05 AM', '02/18/2026 03:40 PM',
  '02/02/2026 10:15 AM', '01/17/2026 02:25 PM', '01/05/2026 09:50 AM', '12/19/2025 04:15 PM',
  '12/04/2025 11:30 AM', '11/18/2025 02:00 PM', '11/02/2025 10:45 AM', '10/15/2025 03:15 PM',
  '09/29/2025 01:25 PM', '09/12/2025 10:50 AM', '08/26/2025 04:00 PM', '08/10/2025 11:15 AM',
  '07/24/2025 02:30 PM', '07/08/2025 09:40 AM', '06/20/2025 03:50 PM', '06/05/2025 11:20 AM',
  '05/19/2025 01:45 PM', '05/02/2025 10:10 AM', '04/16/2025 04:20 PM', '03/30/2025 11:35 AM',
  '03/14/2025 02:10 PM', '02/26/2025 09:25 AM', '02/10/2025 03:30 PM', '01/22/2025 11:00 AM',
  '01/06/2025 01:15 PM', '12/18/2024 04:45 PM', '12/02/2024 10:30 AM', '11/15/2024 02:50 PM',
  '10/28/2024 11:15 AM', '10/10/2024 03:20 PM', '09/23/2024 01:05 PM', '09/05/2024 09:40 AM',
  '08/19/2024 04:10 PM', '08/01/2024 10:25 AM', '07/15/2024 02:35 PM', '06/27/2024 11:50 AM',
  '06/10/2024 01:20 PM', '05/22/2024 09:15 AM', '05/04/2024 03:45 PM', '04/17/2024 10:30 AM',
  '03/29/2024 02:00 PM', '03/11/2024 11:40 AM', '02/21/2024 04:15 PM', '02/05/2024 09:55 AM',
  '01/18/2024 01:30 PM', '01/02/2024 10:10 AM', '11/15/2023 03:20 PM', '06/28/2023 11:00 AM',
  '01/15/2020 02:30 PM', '01/15/2019 10:30 AM'
];

export const MOCK_NY_DOCUMENT_TRANSACTIONS: NYDocumentTransaction[] = DATES.map((date, idx) => {
  const isLast = idx === DATES.length - 1;
  const year = date.split(' ')[0].split('/')[2];
  const crfnSeed = 200000000000 + (parseInt(year) * 100000) + (78 - idx) * 317;
  const docType = isLast ? 'Certified Title Deed' : DOC_TYPES[idx % DOC_TYPES.length];

  return {
    id: `NY-TX-${String(idx + 1).padStart(2, '0')}`,
    documentId: isLast ? '2019000123456' : String(crfnSeed),
    recordedDate: date,
    docType: docType,
    action: 'View',
    highlighted: isLast,
  };
});


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

export const MOCK_ACRIS_RECORDED_DOCS: ACRISRecordedDocument[] = MOCK_NY_DOCUMENT_TRANSACTIONS.map((tx) => ({
  id: tx.id,
  crfn: tx.documentId,
  docDate: tx.recordedDate.split(' ')[0],
  recordedDate: tx.recordedDate,
  docType: tx.docType,
  docTypeDesc: tx.docType,
  party1: '450 SEVENTH AVENUE REALTY LLC',
  party2: 'Lender / Grantee of Record',
  docAmount: '$0.00',
  status: 'Verified',
}));
