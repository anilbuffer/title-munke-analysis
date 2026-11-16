export type NYCPropertyEligibility = 'ELIGIBLE' | 'EXCLUDED_CONDO' | 'EXCLUDED_COOP' | 'INSUFFICIENT_DATA';

export type ValuationConfidenceLevel = 'HIGH_CONFIDENCE' | 'LOWER_CONFIDENCE_FALLBACK';

export interface PLUTOBuildingInfo {
  bbl: string;
  borough: string;
  block: string;
  lot: string;
  address: string;
  buildingClass: string;
  buildingClassDescription: string;
  grossSqFt: number;
  lotAreaSqFt: number;
  yearBuilt: number;
  stories: number;
  totalUnits: number;
  residentialUnits: number;
  commercialUnits: number;
  zoning: string;
  maxFAR: number;
  actualFAR: number;
  currentOwner: string;
  taxClass: string;
  assessedValue: number;
  fullMarketTaxValue: number;
  coopCondoStatus?: 'CONDO' | 'COOP' | 'FEE_SIMPLE';
}

export interface RollingSaleComp {
  id: string;
  address: string;
  borough: string;
  neighborhood: string;
  bbl: string;
  salePrice: number;
  saleDate: string;
  grossSqFt: number;
  pricePerSqFt: number;
  buildingClass: string;
  distanceMiles: number;
  similarityScore: number; // 0 - 100%
  plutoZoning: string;
  yearBuilt: number;
  conditionAdjFactor: string; // e.g. "+3% updated HVAC", "-2% older roof"
  source: 'NYC Rolling Sales (DOF)' | 'PLUTO Verified Deed';
}

export interface ScenarioPriceTarget {
  horizonYears: 1 | 3 | 5;
  conservativeValue: number;
  conservativeAnnualGrowth: number;
  expectedValue: number;
  expectedAnnualGrowth: number;
  optimisticValue: number;
  optimisticAnnualGrowth: number;
  marketRationale: string;
}

export interface NeighborhoodPricingBenchmark {
  neighborhoodName: string;
  boroughName: string;
  medianSalePrice: number;
  averagePricePerSqFt: number;
  twelveMonthSalesVolume: number;
  medianDaysOnMarket: number;
  annualAppreciationRate: number;
  propertyPricePremiumPercent: number; // e.g. +14.8% higher or -5.2% lower
  propertySqFtPremiumPercent: number;
}

export interface HistoricalPricePoint {
  year: number;
  date: string;
  estimatedValue: number;
  eventDescription: string;
  isArmLengthSale: boolean;
  source: string;
}

export interface InternetFallbackSource {
  title: string;
  domain: string;
  sourceType: 'Public Portal Index' | 'Municipal Deed Gazette' | 'Market Real-Time API' | 'Commercial Aggregator';
  retrievalDate: string;
  url: string;
  confidenceWeight: number; // 0 - 100
  notes: string;
}

export interface AIValuationExplanation {
  headlineSummary: string;
  keyDriversWhyHigherOrLower: {
    factor: string;
    impact: 'INCREASES_VALUE' | 'DECREASES_VALUE' | 'NEUTRAL';
    magnitude: 'HIGH' | 'MODERATE' | 'LOW';
    detail: string;
  }[];
  plainLanguageNarrative: string;
  validationCheckPassed: boolean;
  groundingModel: string;
  backendFormulasVerified: boolean;
}

export interface AIValuationRecord {
  id: string;
  propertyAddress: string;
  bbl: string;
  eligibility: NYCPropertyEligibility;
  ineligibilityReason?: string;
  confidenceLevel: ValuationConfidenceLevel;
  dataSource: 'INTERNAL_DATABASE' | 'INTERNET_FALLBACK';
  reviewTrackingId?: string; // US-06: Saved for review tracking ID
  reviewStatus?: 'PENDING_UNDERWRITING_REVIEW' | 'FLAGGED_UNVERIFIED_DATA' | 'APPROVED';
  
  // US-01 & PLUTO Data
  plutoData: PLUTOBuildingInfo;

  // US-03 Valuation figures
  estimatedMarketValue: number;
  lowEstimatedPrice: number;
  highEstimatedPrice: number;
  pricePerSqFt: number;
  medianNeighborhoodPricePerSqFt: number;

  // Outlook Chart scenarios (1, 3, 5-Year)
  priceOutlookScenarios: {
    oneYear: ScenarioPriceTarget;
    threeYear: ScenarioPriceTarget;
    fiveYear: ScenarioPriceTarget;
  };
  annualizedSalesGrowthRate: number;

  // US-02 Comparable sales
  comparables: RollingSaleComp[];
  sufficientCompsAvailable: boolean;
  compDataLimitationNote?: string;

  // US-04 Neighborhood comparison
  neighborhoodBenchmark: NeighborhoodPricingBenchmark;

  // US-03 & US-04 AI Plain-Language Explanations
  aiExplanation: AIValuationExplanation;

  // US-05 Historical price movement
  historicalPrices: HistoricalPricePoint[];
  sufficientHistoricalData: boolean;
  historicalDataLimitationNote?: string;

  // US-06 Internet fallback sources
  internetFallbackSources?: InternetFallbackSource[];
}
