export interface HomeConfiguration {
  id: string;
  name: string;
  label: string;
  defaultSqft: number;
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
}

export const HOME_CONFIGURATIONS: HomeConfiguration[] = [
  {
    id: '2bhk',
    name: '2 BHK',
    label: 'Compact Luxury Apartment',
    defaultSqft: 1050,
    description: 'Master bedroom, guest/child room, living-dining pavilion & kitchen',
  },
  {
    id: '3bhk',
    name: '3 BHK',
    label: 'Spacious Family Residence',
    defaultSqft: 1650,
    description: '3 bedrooms, expansive formal living, balcony deck & modern modular kitchen',
  },
  {
    id: '4bhk',
    name: '4 BHK',
    label: 'Grand Estate Apartment',
    defaultSqft: 2600,
    description: '4 expansive bedroom suites, formal & informal lounges, servant suite & utility',
  },
  {
    id: 'villa',
    name: 'Luxury Villa / Bungalow',
    label: 'Independent Multi-Level Estate',
    defaultSqft: 4200,
    description: 'Multi-floor architectural residence, private terrace, courtyard & high ceilings',
  },
  {
    id: 'penthouse',
    name: 'Duplex / Penthouse',
    label: 'Sky Sanctuary Residence',
    defaultSqft: 3400,
    description: 'Double-height glazing, panoramic terrace lounge & bespoke structural finishes',
  },
];

export const SCOPES_OF_WORK: ScopeOfWork[] = [
  {
    id: 'full-home',
    name: 'Full Home Turnkey',
    factor: 1.0,
    description: 'Complete interior architecture, modular joinery, false ceiling, lighting, civil work & wall treatments',
    popular: true,
  },
  {
    id: 'kitchen-dining',
    name: "Chef's Kitchen & Dining Pavilion",
    factor: 0.35,
    description: 'Bespoke modular kitchen, stone island counter, pantry storage & dining cabinetry',
  },
  {
    id: 'living-lounge',
    name: 'Living, Lounge & Entertainment',
    factor: 0.32,
    description: 'Acoustic TV wall paneling, ceiling cove lighting, foyer partition & formal seating layout',
  },
  {
    id: 'wardrobes-joinery',
    name: 'Bedrooms & Master Dressing Suites',
    factor: 0.38,
    description: 'Floor-to-ceiling wardrobes, walk-in closets, upholstered headboards & study stations',
  },
];

export const MATERIAL_TIERS: MaterialTier[] = [
  {
    id: 'essential',
    name: 'Essential Premium',
    tagline: 'Refined durability for contemporary living',
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
  },
  {
    id: 'signature',
    name: 'Signature Luxury',
    tagline: 'Modern architectural elegance with imported quartz',
    minRatePerSqft: 2350,
    maxRatePerSqft: 3100,
    coreMaterial: 'Action TESA HDHMR / BWP Marine Ply (IS 710)',
    surfaceFinish: 'High-Gloss Anti-Fingerprint Acrylic & Fluted Wood Paneling',
    hardware: 'Blum Tandembox Drawers & Aventos Bi-Fold Lift-Up Systems',
    lighting: 'Circadian 2400K Ambient Lighting & Architectural Recessed Channels',
    badge: 'Most Popular',
    highlights: [
      'Zero-Joint Laser Edge-Banded Shutters',
      'Quartz Kitchen Island with 45° Mitred Edge',
      'Full Blum Motion Ergonomic Runners',
      'Acoustic Felt & Fluted Charcoal Wall Accents',
    ],
  },
  {
    id: 'ultra-luxe',
    name: 'Ultra-Luxe Bespoke',
    tagline: 'Museum-grade European veneers & bookmatched Italian marble',
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
  const scope = SCOPES_OF_WORK.find((s) => s.id === scopeId) || SCOPES_OF_WORK[0];
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
    `• *Carpet Area:* ${data.sqft.toLocaleString('en-IN')} sq.ft`,
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
