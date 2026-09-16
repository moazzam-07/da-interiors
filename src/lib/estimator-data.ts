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
  subtitle: string;
  tagline: string;
  minRatePerSqft: number;
  maxRatePerSqft: number;
  highlights: string[];
  badge?: string;
}

export const HOME_CONFIGURATIONS: HomeConfiguration[] = [
  {
    id: 'studio',
    name: 'Studio Flat',
    label: 'Single Room Living',
    category: 'compact-residential',
    defaultSqft: 450,
    minSqft: 200,
    maxSqft: 850,
    sqftStep: 25,
    sqftPresets: [200, 350, 450, 600],
    description: 'Single room with kitchen and attached bathroom',
  },
  {
    id: '1bhk',
    name: '1 BHK Flat',
    label: '1 Bedroom + Hall + Kitchen',
    category: 'compact-residential',
    defaultSqft: 600,
    minSqft: 200,
    maxSqft: 1100,
    sqftStep: 25,
    sqftPresets: [200, 450, 650, 850],
    description: '1 bedroom, living-dining room, kitchen and bathroom',
  },
  {
    id: '2bhk',
    name: '2 BHK Flat',
    label: '2 Bedrooms + Hall + Kitchen',
    category: 'mid-residential',
    defaultSqft: 1050,
    minSqft: 500,
    maxSqft: 1800,
    sqftStep: 50,
    sqftPresets: [650, 850, 1050, 1400],
    description: 'Master bedroom, second bedroom, living room and kitchen',
  },
  {
    id: '3bhk',
    name: '3 BHK Flat',
    label: '3 Bedrooms + Hall + Kitchen',
    category: 'mid-residential',
    defaultSqft: 1650,
    minSqft: 800,
    maxSqft: 2800,
    sqftStep: 50,
    sqftPresets: [1100, 1450, 1650, 2200],
    description: '3 bedrooms, spacious living & dining hall, balcony and kitchen',
  },
  {
    id: '4bhk',
    name: '4+ BHK Flat',
    label: '4+ Bedrooms + Large Hall',
    category: 'large-residential',
    defaultSqft: 2600,
    minSqft: 1400,
    maxSqft: 4800,
    sqftStep: 50,
    sqftPresets: [1800, 2400, 3000, 4000],
    description: '4 or more bedrooms, large living hall, dining area and kitchen',
  },
  {
    id: 'penthouse',
    name: 'Duplex / Penthouse',
    label: 'Double-Floor Luxury Flat',
    category: 'large-residential',
    defaultSqft: 3400,
    minSqft: 1800,
    maxSqft: 7000,
    sqftStep: 100,
    sqftPresets: [2200, 3000, 4200, 5500],
    description: 'Two-floor apartment or top-floor home with private terrace',
  },
  {
    id: 'villa',
    name: 'Independent House / Villa',
    label: 'Bungalow or Villa',
    category: 'villa',
    defaultSqft: 4200,
    minSqft: 2000,
    maxSqft: 10000,
    sqftStep: 100,
    sqftPresets: [2500, 3500, 5000, 7500],
    description: 'Full private house with multiple floors, rooms and terrace',
  },
  {
    id: 'commercial',
    name: 'Office / Shop / Commercial',
    label: 'Commercial Space',
    category: 'commercial',
    defaultSqft: 1500,
    minSqft: 200,
    maxSqft: 15000,
    sqftStep: 50,
    sqftPresets: [200, 500, 1000, 2500, 5000, 8000],
    description: 'Office, retail shop, clinic, showroom or commercial space',
  },
];

export const ALL_SCOPES_MAP: Record<string, ScopeOfWork[]> = {
  commercial: [
    {
      id: 'comm-turnkey',
      name: 'Full Office / Shop Setup',
      factor: 1.0,
      description: 'Complete interior: cabins, staff desks, false ceiling, flooring, painting & lights',
      popular: true,
    },
    {
      id: 'comm-executive',
      name: 'Main Cabins & Meeting Room',
      factor: 0.40,
      description: 'Director / manager cabins, meeting room table & wall decorative paneling',
    },
    {
      id: 'comm-workstations',
      name: 'Staff Desks & Seating Area',
      factor: 0.38,
      description: 'Office computer tables, staff chairs, partition dividers & wiring setup',
    },
    {
      id: 'comm-reception',
      name: 'Reception & Visitor Waiting Area',
      factor: 0.32,
      description: 'Front reception desk, company logo wall & sofa seating area',
    },
    {
      id: 'comm-retail',
      name: 'Shop Display & Billing Counter',
      factor: 0.45,
      description: 'Product display racks, shelves, billing counter & focus lights',
    },
  ],
  villa: [
    {
      id: 'villa-turnkey',
      name: 'Full House Interior',
      factor: 1.0,
      description: 'Complete interior for all floors, bedrooms, hall, kitchen & lights',
      popular: true,
    },
    {
      id: 'villa-master-wing',
      name: 'Master Bedroom & Dressing Room',
      factor: 0.38,
      description: 'Main master bedroom, large walk-in wardrobe & dressing table',
    },
    {
      id: 'villa-grand-living',
      name: 'Living Room & Dining Hall',
      factor: 0.35,
      description: 'Main hall, TV unit wall, dining area & designer false ceiling',
    },
    {
      id: 'villa-twin-kitchen',
      name: 'Modular Kitchen & Storage',
      factor: 0.35,
      description: 'Modern modular kitchen, storage cabinets & island counter',
    },
    {
      id: 'villa-leisure',
      name: 'Terrace, Bar or TV Room',
      factor: 0.30,
      description: 'Private entertainment TV room, terrace sitting area or bar counter',
    },
  ],
  'compact-residential': [
    {
      id: 'compact-turnkey',
      name: 'Full Home Interior',
      factor: 1.0,
      description: 'Complete interior: modular kitchen, wardrobes, TV unit & ceiling lights',
      popular: true,
    },
    {
      id: 'compact-kitchen-dining',
      name: 'Kitchen & Dining Space',
      factor: 0.35,
      description: 'Space-saving modular kitchen, drawers & breakfast counter',
    },
    {
      id: 'compact-living-partition',
      name: 'Living Room & Partition',
      factor: 0.32,
      description: 'TV unit wall, decorative room partition & ceiling lights',
    },
    {
      id: 'compact-wardrobe-bed',
      name: 'Bedroom Wardrobes & Bed',
      factor: 0.38,
      description: 'Full-height wardrobe, storage bed & dressing mirror',
    },
  ],
  'mid-residential': [
    {
      id: 'mid-turnkey',
      name: 'Full Home Interior',
      factor: 1.0,
      description: 'Complete interior: kitchen, bedrooms, living hall, false ceiling & lights',
      popular: true,
    },
    {
      id: 'mid-kitchen-dining',
      name: 'Modular Kitchen & Dining',
      factor: 0.35,
      description: 'Full modular kitchen with chimney space, trolley baskets & dining storage',
    },
    {
      id: 'mid-living-lounge',
      name: 'Living Room & Hall',
      factor: 0.32,
      description: 'TV wall paneling, entrance partition, false ceiling & warm lights',
    },
    {
      id: 'mid-wardrobes',
      name: 'Bedrooms & Wardrobes',
      factor: 0.38,
      description: 'Full-height wardrobes in all bedrooms, bed back design & dressing units',
    },
  ],
  'large-residential': [
    {
      id: 'large-turnkey',
      name: 'Full Luxury Home Interior',
      factor: 1.0,
      description: 'Complete interior transformation across all bedrooms, halls & kitchen',
      popular: true,
    },
    {
      id: 'large-primary-suite',
      name: 'Master Bedroom & Walk-in Closet',
      factor: 0.38,
      description: 'Grand master bedroom with glass walk-in wardrobe & dressing room',
    },
    {
      id: 'large-formal-living',
      name: 'Drawing Room & Dining Hall',
      factor: 0.34,
      description: 'Formal guest living room, TV feature wall & large dining area',
    },
    {
      id: 'large-kitchen-butler',
      name: 'Large Modular Kitchen & Pantry',
      factor: 0.36,
      description: 'Luxury modular kitchen with center island counter & pantry storage',
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
    name: 'Standard Package',
    badge: 'Pocket Friendly',
    subtitle: 'Clean, durable & budget-friendly finish',
    tagline: 'Ideal for rental homes or simple, durable daily living',
    minRatePerSqft: 1550,
    maxRatePerSqft: 1950,
    highlights: [
      'Durable, termite-proof woodwork',
      'Modern scratch-resistant matte finish',
      'Smooth soft-close doors & drawers',
      'Complete 10-Year warranty',
    ],
  },
  {
    id: 'signature',
    name: 'Premium Package',
    badge: 'Most Popular',
    subtitle: 'Modern designer look with rich finish',
    tagline: 'Our most chosen package with stylish false ceiling & warm lights',
    minRatePerSqft: 2350,
    maxRatePerSqft: 3100,
    highlights: [
      'Glossy acrylic & decorative wooden wall slats',
      'Designer false ceiling with warm ambient lights',
      'Smooth heavy-duty hydraulic drawers',
      'Premium quartz kitchen / counter tops',
    ],
  },
  {
    id: 'ultra-luxe',
    name: 'Luxury Package',
    badge: 'Royal Finish',
    subtitle: 'Five-star hotel feel with royal finish',
    tagline: 'Top-end interior with natural Italian marble & imported wood finish',
    minRatePerSqft: 3700,
    maxRatePerSqft: 5200,
    highlights: [
      'Natural Italian marble & rich wood veneer finish',
      'Luxury tinted glass wardrobes with warm interior lighting',
      'Touch-to-open cabinets & designer imported fittings',
      'Full site supervision by Senior Architect',
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
  ownerPhone: string = '917903624701'
): string {
  const cleanPhone = ownerPhone.replace(/[^0-9]/g, '');

  const message = [
    `✨ *DA INTERIORS — COST ESTIMATE REQUEST* ✨`,
    ``,
    `👤 *Client Name:* ${data.name.trim()}`,
    `📱 *WhatsApp Number:* ${data.phone.trim()}`,
    `📍 *Location in Kolkata:* ${data.locality}`,
    `⏳ *Starting Plan:* ${data.timeline}`,
    ``,
    `🏡 *SELECTED REQUIREMENTS:*`,
    `• *Space Type:* ${data.config}`,
    `• *Approx Area:* ~${data.sqft.toLocaleString('en-IN')} sq.ft`,
    `• *Work Needed:* ${data.scope}`,
    `• *Quality Level:* ${data.tier}`,
    ``,
    `💰 *ESTIMATED BUDGET:*`,
    `👉 *₹${data.minLakhs} Lakhs – ₹${data.maxLakhs} Lakhs*`,
    ``,
    `Hello DA Interiors! I calculated this estimate on your website and would like to discuss my project.`,
  ].join('\n');

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
