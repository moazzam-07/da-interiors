export interface HomeConfiguration {
  id: string;
  name: string;
  label: string;
  category: 'compact-residential' | 'mid-residential' | 'large-residential' | 'villa' | 'commercial';
  defaultSqft: number;
  minSqft: number;
  maxSqft: number;
  sqftStep: number;
  sqftPresets: number[];
  description: string;
}

export interface ScopeOfWork {
  id: string;
  name: string;
  factor: number;
  description: string;
  popular?: boolean;
}

export interface MaterialTier {
  id: string;
  name: string;
  tagline: string;
  minRatePerSqft: number;
  maxRatePerSqft: number;
  coreMaterial: string;
  surfaceFinish: string;
  hardware: string;
  lighting: string;
  highlights: string[];
  badge?: string;
  commercialHighlights?: string[];
}

export const HOME_CONFIGURATIONS: HomeConfiguration[] = [
  {
    id: 'studio',
    name: 'Studio Apartment',
    label: 'Compact Luxury Studio',
    category: 'compact-residential',
    defaultSqft: 450,
    minSqft: 250,
    maxSqft: 850,
    sqftStep: 25,
    sqftPresets: [350, 450, 550, 700],
    description: 'Open-plan living & kitchenette, multi-functional partitions, custom sleeping alcove & bath',
  },
  {
    id: '1bhk',
    name: '1 BHK',
    label: 'Efficient 1-Bedroom Residence',
    category: 'compact-residential',
    defaultSqft: 600,
    minSqft: 350,
    maxSqft: 1100,
    sqftStep: 25,
    sqftPresets: [450, 550, 650, 850],
    description: 'Master bedroom suite, living-dining pavilion, compact modular kitchen & bath',
  },
  {
    id: '2bhk',
    name: '2 BHK',
    label: 'Standard 2-Bedroom Residence',
    category: 'mid-residential',
    defaultSqft: 1050,
    minSqft: 650,
    maxSqft: 1800,
    sqftStep: 50,
    sqftPresets: [850, 1050, 1250, 1450],
    description: 'Master bedroom, guest/child room, living-dining pavilion & modern kitchen',
  },
  {
    id: '3bhk',
    name: '3 BHK',
    label: 'Spacious 3-Bedroom Residence',
    category: 'mid-residential',
    defaultSqft: 1650,
    minSqft: 1100,
    maxSqft: 2800,
    sqftStep: 50,
    sqftPresets: [1350, 1650, 1950, 2300],
    description: '3 bedrooms, expansive formal living, balcony deck & modern modular kitchen',
  },
  {
    id: '4bhk',
    name: '4+ BHK Luxury Apartment',
    label: 'Grand Multi-Bedroom Residence',
    category: 'large-residential',
    defaultSqft: 2600,
    minSqft: 1800,
    maxSqft: 4800,
    sqftStep: 50,
    sqftPresets: [2200, 2600, 3200, 4000],
    description: '4+ expansive bedroom suites, formal & family lounges, servant suite & utility',
  },
  {
    id: 'penthouse',
    name: 'Duplex / Penthouse',
    label: 'Sky Sanctuary Residence',
    category: 'large-residential',
    defaultSqft: 3400,
    minSqft: 2200,
    maxSqft: 7000,
    sqftStep: 100,
    sqftPresets: [2800, 3400, 4200, 5500],
    description: 'Double-height glazing, panoramic terrace lounge & bespoke structural finishes',
  },
  {
    id: 'villa',
    name: 'Luxury Villa / Bungalow',
    label: 'Independent Multi-Level Estate',
    category: 'villa',
    defaultSqft: 4200,
    minSqft: 2500,
    maxSqft: 10000,
    sqftStep: 100,
    sqftPresets: [3200, 4200, 5500, 7500],
    description: 'Multi-floor architectural estate, private terrace, courtyard, gardens & high ceilings',
  },
  {
    id: 'commercial',
    name: 'Commercial / Office / Retail',
    label: 'Corporate, Retail & Executive Spaces',
    category: 'commercial',
    defaultSqft: 2000,
    minSqft: 400,
    maxSqft: 15000,
    sqftStep: 100,
    sqftPresets: [600, 1200, 2500, 5000, 8000],
    description: 'Corporate headquarters, boutique retail showroom, executive boardrooms or hospitality space',
  },
];

export const ALL_SCOPES_MAP: Record<string, ScopeOfWork[]> = {
  commercial: [
    {
      id: 'comm-turnkey',
      name: 'Full Commercial Turnkey Fit-Out',
      factor: 1.0,
      description: 'End-to-end office/retail execution: civil, MEP, glass partitions, flooring, ceiling, HVAC & white-glove handover',
      popular: true,
    },
    {
      id: 'comm-executive',
      name: 'Executive Director & Boardroom Suites',
      factor: 0.40,
      description: 'C-suite cabins, boardrooms, acoustic veneer wall paneling, conference AV & bespoke executive desks',
    },
    {
      id: 'comm-workstations',
      name: 'Workstations, Open Office & Collaborative Zones',
      factor: 0.38,
      description: 'Modular linear desking, acoustic ceiling baffles, cable raceways, collaborative pods & task lighting',
    },
    {
      id: 'comm-reception',
      name: 'Reception, Client Lounge & Experience Center',
      factor: 0.32,
      description: 'Monolithic stone reception desk, branded architectural feature wall, visitor lounge & atmospheric lighting',
    },
    {
      id: 'comm-retail',
      name: 'Boutique Retail / Showroom Display Front',
      factor: 0.45,
      description: 'Specialized merchandise display millwork, integrated track lighting, billing counter & storefront architecture',
    },
  ],
  villa: [
    {
      id: 'villa-turnkey',
      name: 'Full Villa Architectural Turnkey',
      factor: 1.0,
      description: 'Multi-level architectural overhaul, double-height atrium, staircases, master suites & terrace lounge',
      popular: true,
    },
    {
      id: 'villa-master-wing',
      name: 'Master Wing & Private Floor Sanctum',
      factor: 0.38,
      description: 'Expansive master bedroom, walk-in dressing gallery with tinted glass, private study & spa ensuite',
    },
    {
      id: 'villa-grand-living',
      name: 'Double-Height Living, Dining & Atrium',
      factor: 0.35,
      description: 'Grand drawing room, 10-seater dining pavilion, statement lighting framing & double-height marble feature wall',
    },
    {
      id: 'villa-twin-kitchen',
      name: "Chef's Gourmet & Wet Prep Kitchen",
      factor: 0.35,
      description: 'Dual kitchen architecture (show island kitchen + heavy wet prep area), walk-in pantry & built-in appliances',
    },
    {
      id: 'villa-leisure',
      name: 'Private Cinema, Bar & Entertainment Deck',
      factor: 0.30,
      description: 'Dedicated acoustic home cinema lounge, terrace deck pergola, indoor bar counter & custom lounge millwork',
    },
  ],
  'compact-residential': [
    {
      id: 'compact-turnkey',
      name: 'Full Compact Turnkey',
      factor: 1.0,
      description: 'Space-saving architectural transformation, smart modular joinery, false ceiling, lighting & concealed storage',
      popular: true,
    },
    {
      id: 'compact-kitchen-dining',
      name: 'Modular Kitchenette & Breakfast Nook',
      factor: 0.35,
      description: 'High-efficiency modular kitchen, quartz counter, hydraulic overhead cabinets & breakfast ledge',
    },
    {
      id: 'compact-living-partition',
      name: 'Living Lounge & Smart Partition',
      factor: 0.32,
      description: 'Multi-functional TV wall unit, concealed storage, fluted glass/timber divider & warm ceiling lighting',
    },
    {
      id: 'compact-wardrobe-bed',
      name: 'Bedroom Wardrobes & Storage Beds',
      factor: 0.38,
      description: 'Floor-to-ceiling sliding wardrobe, hydraulic storage bed, study ledge & integrated headboard lighting',
    },
  ],
  'mid-residential': [
    {
      id: 'mid-turnkey',
      name: 'Full Home Turnkey',
      factor: 1.0,
      description: 'Complete interior architecture, modular joinery, false ceiling, lighting, civil work & wall treatments across all rooms',
      popular: true,
    },
    {
      id: 'mid-kitchen-dining',
      name: "Chef's Kitchen & Dining Pavilion",
      factor: 0.35,
      description: 'Bespoke modular kitchen, stone island counter, pantry storage & dining cabinetry',
    },
    {
      id: 'mid-living-lounge',
      name: 'Living, Lounge & Entertainment',
      factor: 0.32,
      description: 'Acoustic TV wall paneling, ceiling cove lighting, foyer partition & formal seating layout',
    },
    {
      id: 'mid-wardrobes',
      name: 'Bedrooms & Master Dressing Suites',
      factor: 0.38,
      description: 'Floor-to-ceiling wardrobes, walk-in closets, upholstered headboards & study stations',
    },
  ],
  'large-residential': [
    {
      id: 'large-turnkey',
      name: 'Full Penthouse / Estate Turnkey',
      factor: 1.0,
      description: 'Comprehensive architectural design, structural alterations, double-height features, luxury joinery & white-glove handover',
      popular: true,
    },
    {
      id: 'large-primary-suite',
      name: 'Primary Suite & Walk-In Wardrobe Gallery',
      factor: 0.38,
      description: 'Expansive master suite with island bed, tinted glass walk-in wardrobe, vanity lounge & acoustic wall slats',
    },
    {
      id: 'large-formal-living',
      name: 'Formal Salon & Double-Height Living',
      factor: 0.34,
      description: 'Bookmatched marble feature wall, cove ceiling lighting, dining buffet credenza & entertainer bar counter',
    },
    {
      id: 'large-kitchen-butler',
      name: "Chef's Island Kitchen & Butler's Pantry",
      factor: 0.36,
      description: 'Monolithic stone island, concealed pantry, integrated German appliances & custom breakfast banquette',
    },
  ],
};

export function getScopesForConfig(configId: string): ScopeOfWork[] {
  const config = HOME_CONFIGURATIONS.find((c) => c.id === configId) || HOME_CONFIGURATIONS[3];
  return ALL_SCOPES_MAP[config.category] || ALL_SCOPES_MAP['mid-residential'];
}

export const ALL_SCOPES_FLAT: ScopeOfWork[] = Object.values(ALL_SCOPES_MAP).flat();
export const SCOPES_OF_WORK: ScopeOfWork[] = getScopesForConfig('3bhk');

export const MATERIAL_TIERS: MaterialTier[] = [
  {
    id: 'essential',
    name: 'Essential Premium',
    tagline: 'Refined durability and precision engineering',
    minRatePerSqft: 1550,
    maxRatePerSqft: 1950,
    coreMaterial: 'Commercial & Marine Grade BWR Plywood (IS 303)',
    surfaceFinish: 'Greenlam / Century 1mm Matte Anti-Scratch Laminate',
    hardware: 'Hafele / Hettich Soft-Close Hinges & Quad Ball Runners',
    lighting: 'Concealed 3000K Warm LED Strips & Magnetic Trimless Downlights',
    highlights: [
      '10-Year Flat Material Warranty',
      'Termite & Borer Proof Core Plywood',
      'Soft-Close German Mechanism Hinges',
      'Modular Factory-Pressed Precision Edging',
    ],
    commercialHighlights: [
      'Heavy-Duty Commercial Grade Laminate Surfaces',
      '10-Year High-Traffic Structural Warranty',
      'German Soft-Close & Heavy Weight Mechanisms',
      'Integrated Concealed Electrical Wire Conduits',
    ],
  },
  {
    id: 'signature',
    name: 'Signature Luxury',
    tagline: 'Modern architectural elegance with imported finishes',
    minRatePerSqft: 2350,
    maxRatePerSqft: 3100,
    coreMaterial: 'Action TESA HDHMR / BWP Marine Ply (IS 710)',
    surfaceFinish: 'High-Gloss Anti-Fingerprint Acrylic & Fluted Wood Paneling',
    hardware: 'Blum Tandembox Drawers & Aventos Bi-Fold Lift-Up Systems',
    lighting: 'Circadian 2400K Ambient Lighting & Architectural Recessed Channels',
    badge: 'Most Popular',
    highlights: [
      'Zero-Joint Laser Edge-Banded Shutters',
      'Quartz Counter / Island with 45° Mitred Edge',
      'Full Blum Motion Ergonomic Runners',
      'Acoustic Felt & Fluted Charcoal Wall Accents',
    ],
    commercialHighlights: [
      'Acoustic Wall Slat Cladding & Sound Dampening',
      'Anti-Fingerprint High-Pressure Acrylic / Metal Edging',
      'Full Blum Motion Commercial Grade Hardware',
      'Executive Solid Quartz Reception / Conference Tops',
    ],
  },
  {
    id: 'ultra-luxe',
    name: 'Ultra-Luxe Bespoke',
    tagline: 'Museum-grade European veneers & bookmatched Italian stone',
    minRatePerSqft: 3700,
    maxRatePerSqft: 5200,
    coreMaterial: '100% Calibrated Gurjan Marine Plywood (IS 710)',
    surfaceFinish: 'Handcrafted European Smoked Oak Natural Veneer & High-PU Polish',
    hardware: 'Blum Servo-Drive Electrical Touch-Open Systems & Concealed Pivots',
    lighting: 'Bespoke DALI-Automated Architectural Scene Lighting & Solid Brass Profiles',
    badge: 'Artisan Grade',
    highlights: [
      'Bookmatched Italian Roman Travertine & Calacatta Marble',
      'Millimeter-Tolerance Zero-Shadow Wall Joinery',
      'Electrical Sensor Touch-to-Open Drawers',
      'Walk-In Dressing Suite with Tinted Glass & Integrated LED',
    ],
    commercialHighlights: [
      'Bookmatched Italian Marble Statement Lobby & Boardroom',
      'Handcrafted European Smoked Oak Executive Desking',
      'Automated DALI Architectural Scene & Task Lighting',
      'Precision Zero-Tolerance Concealed Pivot Doors',
    ],
  },
];

export const KOLKATA_LOCALITIES = [
  'Alipore',
  'Ballygunge',
  'New Town / Rajarhat',
  'Salt Lake (Sector 1-5)',
  'EM Bypass / Silver Spring / Urbana',
  'Park Street / Loudon Street',
  'Southern Avenue / Lake Gardens',
  'Behala / Taratala',
  'Howrah / Foreshore Road',
  'Other Kolkata Locality',
];

export const TIMELINE_OPTIONS = [
  'Immediate (Within 30 Days)',
  '1 to 3 Months (Possession Soon)',
  '3 to 6 Months',
  'Planning Ahead (6+ Months)',
];

export interface EstimationResult {
  minCostLakhs: number;
  maxCostLakhs: number;
  averageCostLakhs: number;
  breakdown: {
    joineryPercent: number;
    surfacesPercent: number;
    lightingPercent: number;
    hardwareSupervisionPercent: number;
  };
}

export function calculateEstimate(
  carpetAreaSqft: number,
  scopeId: string,
  tierId: string
): EstimationResult {
  const scope = ALL_SCOPES_FLAT.find((s) => s.id === scopeId) || ALL_SCOPES_FLAT[0];
  const tier = MATERIAL_TIERS.find((t) => t.id === tierId) || MATERIAL_TIERS[1];

  const rawMin = carpetAreaSqft * tier.minRatePerSqft * scope.factor;
  const rawMax = carpetAreaSqft * tier.maxRatePerSqft * scope.factor;

  const minCostLakhs = Number((rawMin / 100000).toFixed(2));
  const maxCostLakhs = Number((rawMax / 100000).toFixed(2));
  const averageCostLakhs = Number(((minCostLakhs + maxCostLakhs) / 2).toFixed(2));

  return {
    minCostLakhs,
    maxCostLakhs,
    averageCostLakhs,
    breakdown: {
      joineryPercent: 42,
      surfacesPercent: 28,
      lightingPercent: 15,
      hardwareSupervisionPercent: 15,
    },
  };
}

export function formatINR(lakhs: number): string {
  return `₹${lakhs.toFixed(2)} Lakhs`;
}

export interface LeadSubmissionData {
  name: string;
  phone: string;
  locality: string;
  timeline: string;
  config: string;
  scope: string;
  tier: string;
  sqft: number;
  minLakhs: number;
  maxLakhs: number;
}

export function buildWhatsAppEstimateUrl(
  data: LeadSubmissionData,
  ownerPhone: string = '919830000000'
): string {
  const cleanPhone = ownerPhone.replace(/[^0-9]/g, '');

  const message = [
    `✨ *DA INTERIORS — NEW PROJECT ESTIMATE REQUEST* ✨`,
    ``,
    `👤 *Client Name:* ${data.name.trim()}`,
    `📱 *WhatsApp:* ${data.phone.trim()}`,
    `📍 *Project Location:* ${data.locality}, Kolkata`,
    `⏳ *Target Timeline:* ${data.timeline}`,
    ``,
    `🏡 *CONFIGURED SPECIFICATIONS:*`,
    `• *Typology:* ${data.config}`,
    `• *Carpet Area:* ~${data.sqft.toLocaleString('en-IN')} sq.ft`,
    `• *Scope of Work:* ${data.scope}`,
    `• *Material & Finish Tier:* ${data.tier}`,
    ``,
    `💰 *CALCULATED INVESTMENT ESTIMATE:*`,
    `👉 *₹${data.minLakhs} Lakhs – ₹${data.maxLakhs} Lakhs*`,
    ``,
    `_Note: Generated via DA Interiors Instant Cost Estimator._`,
    `Hello DA Interiors team! I would like to schedule an architectural consultation and discuss our floor plan.`,
  ].join('\n');

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
