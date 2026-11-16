export type Borough = 'Bronx' | 'Brooklyn' | 'Queens' | 'Manhattan' | 'Staten Island';

export interface SchematicPoint {
  x: number;
  y: number;
  islandIndex: number;
}

export interface AIOpportunityProperty {
  id: string;
  address: string;
  fullAddress: string;
  borough: Borough;
  propertyType: string;
  grossSqFt: number;
  lastRecordedSalePrice: number;
  lastRecordedSaleDate: string;
  bbl: string;
  buildingClass: string;
  yearBuilt: number;
  stories: number;
  totalUnits: number;
  zoning: string;
  maxFAR: number;
  actualFAR: number;
  opportunityScore: number; // 0 - 100
  estimatedMarketValue: number;
  equitySpread: number;
  equitySpreadPercent: number;
  pricePerSqFt: number;
  areaMedianPricePerSqFt: number;
  capRatePercent: number;
  grossYieldPercent: number;
  titleRisk: 'Low' | 'Moderate' | 'High';
  rationale: string;
  keyHighlights: string[];
  schematicPoint: SchematicPoint;
  lat: number;
  lng: number;
}
