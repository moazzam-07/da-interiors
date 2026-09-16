export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface MaterialItem {
  category: string;
  name: string;
  origin: string;
  description: string;
}

export interface CaseStudyGalleryImage {
  src: string;
  alt: string;
  caption: string;
  room: string;
}

export interface CaseStudySeo {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  focusNeighborhood: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: "Penthouse" | "Heritage Villa" | "Luxury Duplex" | "Contemporary Condo" | "Smart Residence";
  location: string;
  neighborhood: string;
  city: "Kolkata";
  areaSqFt: number;
  timelineWeeks: number;
  yearCompleted: number;
  featured: boolean;
  heroImage: string;
  summary: string;
  clientBrief: string;
  architecturalChallenge: string;
  designIntervention: string;
  metrics: CaseStudyMetric[];
  materials: MaterialItem[];
  gallery: CaseStudyGalleryImage[];
  clientTestimonial: {
    quote: string;
    clientName: string;
    role: string;
  };
  seo: CaseStudySeo;
  nextSlug?: string;
  prevSlug?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "urbana-sky-penthouse-anandapur",
    title: "The Urbana Sky Villa: 4 BHK Minimalist Penthouse",
    subtitle: "A 3,600 sq.ft private aerie over Anandapur, Kolkata featuring monolithic travertine, fluted oak, and panoramic vistas.",
    tagline: "4 BHK Turnkey Penthouse • Anandapur, Kolkata",
    category: "Penthouse",
    location: "Urbana Towers, Anandapur, Kolkata",
    neighborhood: "Anandapur",
    city: "Kolkata",
    areaSqFt: 3600,
    timelineWeeks: 16,
    yearCompleted: 2024,
    featured: true,
    heroImage: "/images/da/user_uploads/upload_15.jpeg",
    summary: "Complete spatial reconfiguration of a high-floor raw penthouse at Urbana Towers into an open-concept architectural sanctuary with concealed circadian lighting and bookmatched natural stone.",
    clientBrief: "The homeowners, a senior corporate executive and an avid art collector, desired an uncluttered living environment that maximized expansive 38th-floor city views while creating quiet, acoustically dampened spaces for contemplation and intimate evening entertaining.",
    architecturalChallenge: "The developer's default layout featured multiple heavy partition walls and low false-ceiling bulkheads that severed natural light penetration. Deep HVAC conduits compromised the available 3.4-meter ceiling height, while standard builder-grade doors disrupted sightlines.",
    designIntervention: "We removed three non-loadbearing masonry partitions to unify the living, formal dining, and reading lounge into a singular flowing volume. Air conditioning channels were rerouted through sub-floor plenums and bespoke fluted wall joinery, preserving uninterrupted ceiling heights. Custom 2.8m floor-to-ceiling pivot portals were installed to frame the sky horizon.",
    metrics: [
      { label: "Carpet Area", value: "3,600 sq.ft" },
      { label: "Configuration", value: "4 BHK + Lounge" },
      { label: "Execution Time", value: "16 Weeks" },
      { label: "Joinery Tolerance", value: "0.5 mm" },
    ],
    materials: [
      { category: "Natural Stone", name: "Navona Travertine", origin: "Tivoli, Italy", description: "Honed, unfilled linear slabs cladding the primary media hearth wall." },
      { category: "Architectural Timber", name: "Smoked French Oak", origin: "Burgundy, France", description: "Micro-slatted acoustic wall paneling with integrated brass reveals." },
      { category: "Kitchen Surfaces", name: "Nero Marquina Quartzite", origin: "Basque Country, Spain", description: "Monolithic 3.2m island with waterfall edges and concealed induction." },
      { category: "Textiles", name: "Belgian Raw Linen & Bouclé", origin: "Flanders, Belgium", description: "Custom motorized drapery and tactile sculptural seating upholstery." },
    ],
    gallery: [
      {
        src: "/images/da/user_uploads/upload_15.jpeg",
        alt: "Open-concept panoramic living lounge at Urbana Towers Kolkata",
        caption: "Main living salon with custom curved seating and vein-cut travertine media feature.",
        room: "Living Salon",
      },
      {
        src: "/images/da/user_uploads/upload_04.jpg",
        alt: "Monolithic modular chef kitchen at Urbana Penthouse Kolkata",
        caption: "State-of-the-art modular kitchen with textured stone fronts and concealed Miele appliances.",
        room: "Culinary Pavilion",
      },
      {
        src: "/images/da/user_uploads/upload_07.jpeg",
        alt: "Primary master bedroom suite with bouclé headboard Urbana Kolkata",
        caption: "Serene primary suite with acoustic wall paneling and 2400K circadian night scenes.",
        room: "Master Suite",
      },
      {
        src: "/images/da/user_uploads/upload_20.jpeg",
        alt: "Open-plan dining and entertainment salon Urbana Towers Kolkata",
        caption: "Seamless transition between formal dining and private reading lounge.",
        room: "Dining Lounge",
      },
    ],
    clientTestimonial: {
      quote: "DA Interiors transformed our blank shell at Urbana into a true architectural work of art. The quality of stone craftsmanship and zero-defect handover exceeded every expectation.",
      clientName: "R. Chatterjee",
      role: "Homeowner, Urbana Towers",
    },
    seo: {
      metaTitle: "Urbana Penthouse Interior Design Kolkata | 4 BHK Case Study — DA Interiors",
      metaDescription: "Explore DA Interiors' 4 BHK luxury penthouse transformation at Urbana Towers, Anandapur, Kolkata. 3,600 sq.ft turnkey interior architecture featuring Italian travertine and bespoke millwork.",
      keywords: [
        "urbana kolkata interior design",
        "penthouse interior designer kolkata",
        "4 bhk luxury interior anandapur",
        "best interior designers in urbana kolkata",
        "turnkey interior designer kolkata"
      ],
      focusNeighborhood: "Anandapur / Urbana",
    },
    nextSlug: "ballygunge-heritage-colonial-villa",
    prevSlug: "new-town-futuristic-minimalist-suite",
  },
  {
    slug: "ballygunge-heritage-colonial-villa",
    title: "The Ballygunge Colonial Residence: Heritage Reimagined",
    subtitle: "A 4,800 sq.ft conservation restoration in Queens Park, Kolkata harmonizing historic 4.2m arched ceilings with Italian minimalism.",
    tagline: "Heritage Villa Restoration • Queens Park, Ballygunge",
    category: "Heritage Villa",
    location: "Queens Park, Ballygunge, Kolkata",
    neighborhood: "Ballygunge",
    city: "Kolkata",
    areaSqFt: 4800,
    timelineWeeks: 24,
    yearCompleted: 2024,
    featured: true,
    heroImage: "/images/da/user_uploads/upload_08.jpeg",
    summary: "Meticulous structural restoration and interior modernization of a multi-generational Ballygunge estate, introducing double-height foyer architecture and artisanal European joinery.",
    clientBrief: "The family inherited a legendary 1920s residence and wanted to honor its ancestral soul—soaring Corinthian arches and Burma teak joists—while eliminating dampness, introducing central climate automation, and creating modern entertainment zones.",
    architecturalChallenge: "Century-old surkhi brick walls suffered from tropical moisture entrapment, and previous contractors had damaged historical moldings. Introducing modern plumbing, ducted VRV HVAC, and automated smart lighting without marring historic plaster required forensic architectural engineering.",
    designIntervention: "We utilized breathable hydraulic lime mortars to stabilize the building envelope. Modern services were concealed within bespoke architectural joinery chases and sub-floor plenums. A sculptural double-height foyer was established, pairing the historic brick with a cantilevered floating staircase and brushed bronze accents.",
    metrics: [
      { label: "Restored Area", value: "4,800 sq.ft" },
      { label: "Building Era", value: "Circa 1926" },
      { label: "Restoration Timeline", value: "24 Weeks" },
      { label: "Ceiling Height", value: "4.2 Meters" },
    ],
    materials: [
      { category: "Flooring", name: "Hand-Poured Terrazzo & Nero Marquina", origin: "Local Bengal Artisans & Spain", description: "Restored traditional brass-inlaid terrazzo borders with polished black marble." },
      { category: "Joinery", name: "Seasoned Reclaimed Burma Teak", origin: "Heritage Sourcing, Kolkata", description: "Refurbished original structural timbers and crafted custom library shelving." },
      { category: "Metals", name: "Hand-Patinated Architectural Bronze", origin: "Artisan Foundry, Milan", description: "Bespoke portal frames, cabinet hardware, and decorative screens." },
      { category: "Illumination", name: "Mouth-blown Amber Glass Chandeliers", origin: "Murano, Italy", description: "Sculptural pendant lighting casting warm atmospheric glow across grand salons." },
    ],
    gallery: [
      {
        src: "/images/da/user_uploads/upload_08.jpeg",
        alt: "Double-height entrance foyer with floating staircase Ballygunge Kolkata",
        caption: "The restored grand entrance hall connecting heritage proportions with modern minimalism.",
        room: "Grand Foyer",
      },
      {
        src: "/images/da/user_uploads/upload_22.jpeg",
        alt: "Formal dining salon with bespoke chandelier Ballygunge Kolkata",
        caption: "Formal 10-seater dining salon featuring dark marble accents and custom Murano illumination.",
        room: "Dining Salon",
      },
      {
        src: "/images/da/user_uploads/upload_12.jpeg",
        alt: "Fluted timber media library lounge Ballygunge Kolkata",
        caption: "Intimate family media lounge clad in acoustic smoked oak and fluted paneling.",
        room: "Media Library",
      },
      {
        src: "/images/da/user_uploads/upload_13.jpeg",
        alt: "Formal sitting room with high ceilings Ballygunge Kolkata",
        caption: "Restored high-ceiling salon with low-profile Italian seating and sheer drapery.",
        room: "Grand Salon",
      },
    ],
    clientTestimonial: {
      quote: "DA Interiors understood the emotional weight of our family home. They preserved the grandeur of our grandparents' era while making it deeply comfortable for modern family living.",
      clientName: "A. & S. Mukherjee",
      role: "Queens Park, Ballygunge",
    },
    seo: {
      metaTitle: "Ballygunge Villa Interior Design Kolkata | Heritage Restoration Case Study",
      metaDescription: "Explore DA Interiors' heritage colonial villa renovation in Queens Park, Ballygunge, Kolkata. 4,800 sq.ft architectural restoration blending 1920s architecture with quiet European luxury.",
      keywords: [
        "ballygunge interior designer kolkata",
        "heritage home renovation kolkata",
        "luxury villa interior design ballygunge",
        "colonial architecture restoration kolkata",
        "queens park kolkata interior architect"
      ],
      focusNeighborhood: "Ballygunge / Queens Park",
    },
    nextSlug: "alipore-duplex-travertine-sanctuary",
    prevSlug: "urbana-sky-penthouse-anandapur",
  },
  {
    slug: "alipore-duplex-travertine-sanctuary",
    title: "The Alipore Duplex: Monolithic Travertine Sanctuary",
    subtitle: "A 3,200 sq.ft private duplex residence in Alipore Park Road showcasing unpolished stone, tactile textiles, and restorative spa suites.",
    tagline: "Luxury Duplex Architecture • Alipore Park Road, Kolkata",
    category: "Luxury Duplex",
    location: "Alipore Park Road, Alipore, Kolkata",
    neighborhood: "Alipore",
    city: "Kolkata",
    areaSqFt: 3200,
    timelineWeeks: 14,
    yearCompleted: 2024,
    featured: true,
    heroImage: "/images/da/user_uploads/upload_05.jpeg",
    summary: "Architectural gut remodel of a duplex in Kolkata's most prestigious postal code, designed around tactile natural limestone, curved organic furniture, and private thermal spa wet zones.",
    clientBrief: "The client, a prominent South Kolkata industrialist, sought a calm oasis removed from the bustling city—an interior defined by 'quiet luxury', natural textures, and a master bathroom reminiscent of European thermal spas.",
    architecturalChallenge: "The existing property was fragmented into small, disjointed rooms with poor ventilation in the primary bath suites. Visual clutter from exposed electrical distribution panels and uneven floor transitions detracted from the spaciousness.",
    designIntervention: "We established a continuous material palette of honed Roman travertine flooring throughout the lower reception level. Partition walls were replaced with acoustic timber louvers to promote cross-ventilation. In the primary bath, we carved a monolithic double-vanity and installed a zero-threshold walk-in rain shower with a freestanding soaking tub.",
    metrics: [
      { label: "Built-Up Area", value: "3,200 sq.ft" },
      { label: "Levels", value: "2 Floors (Duplex)" },
      { label: "Turnkey Period", value: "14 Weeks" },
      { label: "Bathrooms Created", value: "4 Ensuite Spas" },
    ],
    materials: [
      { category: "Primary Flooring", name: "Silver Travertine", origin: "Rapolano Terme, Italy", description: "Cross-cut, hand-brushed matte stone slabs spanning the entire ground salon." },
      { category: "Master Bath", name: "Arabescato Corchia Marble", origin: "Carrara, Italy", description: "Bookmatched gray and white marble with anti-slip micro-textured shower floor." },
      { category: "Cabinetry", name: "Canaletto Walnut", origin: "Northern Italy", description: "Vertical bookmatched veneer with touch-latch zero-hardware hardware." },
      { category: "Sanitaryware", name: "Brushed Platinum Dornbracht", origin: "Iserlohn, Germany", description: "Concealed wall-mount fixtures with calibrated laminar water flow." },
    ],
    gallery: [
      {
        src: "/images/da/user_uploads/upload_05.jpeg",
        alt: "Modern media lounge with terracotta curved sofa Alipore Kolkata",
        caption: "Main lounge with custom terracotta curved sectional and fireplace hearth wall.",
        room: "Media Lounge",
      },
      {
        src: "/images/da/user_uploads/upload_16.jpeg",
        alt: "Master wellness spa bathroom with freestanding tub Alipore Kolkata",
        caption: "Primary spa bathroom with illuminated vanity arch and freestanding soaking tub.",
        room: "Master Ensuite Spa",
      },
      {
        src: "/images/da/user_uploads/upload_21.jpeg",
        alt: "Spacious private living lounge with ceiling coves Alipore Kolkata",
        caption: "Upper level sitting room with multi-tiered warm 2400K architectural cove illumination.",
        room: "Upper Salon",
      },
      {
        src: "/images/da/user_uploads/upload_23.jpeg",
        alt: "Luxury powder room with stone basin Alipore Kolkata",
        caption: "Architectural powder room featuring floating granite vanity and designer pendant.",
        room: "Powder Room",
      },
    ],
    clientTestimonial: {
      quote: "Living here feels like staying at an Aman resort every single day. The master bath and the living room stone details are executed to absolute perfection.",
      clientName: "V. Goenka",
      role: "Alipore Park Road",
    },
    seo: {
      metaTitle: "Alipore Luxury Interior Design Kolkata | Duplex Case Study — DA Interiors",
      metaDescription: "Discover how DA Interiors delivered a 3,200 sq.ft luxury duplex on Alipore Park Road, Kolkata. Minimalist travertine architecture, spa bathrooms, and turnkey European joinery.",
      keywords: [
        "alipore interior designer kolkata",
        "luxury duplex interior design alipore",
        "best interior designers in alipore",
        "spa bathroom interior designer kolkata",
        "travertine marble interior kolkata"
      ],
      focusNeighborhood: "Alipore / Alipore Park Road",
    },
    nextSlug: "silver-spring-em-bypass-condo",
    prevSlug: "ballygunge-heritage-colonial-villa",
  },
  {
    slug: "silver-spring-em-bypass-condo",
    title: "The Silver Spring Contemporary Residence: Fast-Track Turnkey",
    subtitle: "A 2,400 sq.ft 3 BHK high-rise condominium on EM Bypass transformed in 10 weeks with turnkey modular kitchen and living curation.",
    tagline: "Contemporary 3 BHK Turnkey • EM Bypass, Kolkata",
    category: "Contemporary Condo",
    location: "Silver Spring, EM Bypass, Kolkata",
    neighborhood: "EM Bypass",
    city: "Kolkata",
    areaSqFt: 2400,
    timelineWeeks: 10,
    yearCompleted: 2024,
    featured: false,
    heroImage: "/images/da/user_uploads/upload_06.jpeg",
    summary: "Precision turnkey interior execution for an NRI family returning to Kolkata, featuring custom modular kitchen cabinetry, space-optimizing wardrobes, and cozy living lounges.",
    clientBrief: "The clients required a rapid, turnkey interior completion within 10 weeks before their international relocation. They wanted warm contemporary aesthetics, ergonomic modular storage, and zero contractor coordination hassles.",
    architecturalChallenge: "Rigid residential complex renovation working hours (10 AM to 5 PM) and strict acoustic noise guidelines made wet masonry construction impossible. Pre-engineered off-site fabrication was mandatory.",
    designIntervention: "We laser-scanned the apartment to a 0.2mm tolerance and prefabricated all modular kitchen cabinets, bedroom wardrobes, and wall paneling off-site in our studio workshop. On-site assembly took just 21 days with zero messy wet masonry work.",
    metrics: [
      { label: "Carpet Area", value: "2,400 sq.ft" },
      { label: "Turnkey Delivery", value: "10 Weeks Flat" },
      { label: "On-Site Assembly", value: "21 Days" },
      { label: "Off-Site Precision", value: "100% Prefabricated" },
    ],
    materials: [
      { category: "Kitchen Cabinetry", name: "Matte Slate & Champagne Gold", origin: "Hafele / Blum European Hardware", description: "Scratch-resistant anti-fingerprint acrylic fronts with integrated LED strip pulls." },
      { category: "Countertops", name: "White Calacatta Quartz", origin: "Silestone, Spain", description: "Non-porous stain-resistant countertop with integrated undermount sink." },
      { category: "Flooring", name: "Glazed Vitrified Marble Tile", origin: "Simpolo Master Collection", description: "High-gloss large format 1200x2400mm slabs for continuous floor plane." },
    ],
    gallery: [
      {
        src: "/images/da/user_uploads/upload_06.jpeg",
        alt: "Warm contemporary living room Silver Spring EM Bypass Kolkata",
        caption: "Living room with hanging swing chair, TV console wall, and comfortable beige fabric sofas.",
        room: "Living Area",
      },
      {
        src: "/images/da/user_uploads/upload_02.jpeg",
        alt: "Modular L-shaped kitchen with gold accents Silver Spring Kolkata",
        caption: "Sleek contemporary modular kitchen with glossy lower units and diamond tile backsplash.",
        room: "Modular Kitchen",
      },
      {
        src: "/images/da/user_uploads/upload_26.jpeg",
        alt: "Master bedroom with geometric headboard Silver Spring Kolkata",
        caption: "Master bedroom suite with dark accent wall, channel tufting, and sunburst brass mirror.",
        room: "Master Bedroom",
      },
      {
        src: "/images/da/user_uploads/upload_03.jpeg",
        alt: "Secondary kitchen bar and pantry Silver Spring Kolkata",
        caption: "Deep charcoal cabinetry and integrated built-in appliances.",
        room: "Pantry & Bar",
      },
    ],
    clientTestimonial: {
      quote: "Being based overseas in Singapore, we trusted DA Interiors completely. They finished on the exact day promised, on budget, and the apartment was spotless when we landed.",
      clientName: "K. & P. Singhania",
      role: "Silver Spring, EM Bypass",
    },
    seo: {
      metaTitle: "EM Bypass Interior Design Kolkata | Silver Spring 3 BHK Case Study",
      metaDescription: "Read how DA Interiors executed a 2,400 sq.ft 3 BHK turnkey interior at Silver Spring, EM Bypass, Kolkata in just 10 weeks. Fast-track modular kitchens and luxury living rooms.",
      keywords: [
        "em bypass interior designer kolkata",
        "silver spring kolkata interior design",
        "3 bhk interior design cost kolkata",
        "modular kitchen topsia em bypass",
        "turnkey apartment interior kolkata"
      ],
      focusNeighborhood: "EM Bypass / Topsia",
    },
    nextSlug: "new-town-futuristic-minimalist-suite",
    prevSlug: "alipore-duplex-travertine-sanctuary",
  },
  {
    slug: "new-town-futuristic-minimalist-suite",
    title: "The New Town Smart Suite: Japandi Woodcraft & Automation",
    subtitle: "A 1,950 sq.ft smart home in Action Area II, New Town Kolkata combining Scandinavian simplicity with Japanese timber warmth.",
    tagline: "Smart Minimalist Interior • Action Area II, New Town",
    category: "Smart Residence",
    location: "Action Area II, New Town, Kolkata",
    neighborhood: "New Town",
    city: "Kolkata",
    areaSqFt: 1950,
    timelineWeeks: 12,
    yearCompleted: 2024,
    featured: false,
    heroImage: "/images/da/user_uploads/upload_27.jpg",
    summary: "A light-filled technology executive residence in New Town Kolkata featuring intelligent Lutron automation, custom concealed dressing rooms, and restorative Japandi bedrooms.",
    clientBrief: "A tech founder couple wanted a clutter-free, highly automated residence with intuitive lighting scenes (Focus, Entertain, Sleep), natural wood textures, and plenty of discreet storage for books and devices.",
    architecturalChallenge: "Standard builder rooms felt cramped with poorly positioned doors that limited furniture layouts. Visual clutter from wires, routers, and switches contradicted the desired minimalist serenity.",
    designIntervention: "We incorporated concealed magnetic pivot doors flush with wood wall paneling to eliminate visual interruptions. A centralized smart automation rack eliminated all wall clutter, replacing bulky switchboards with micro-etched smart keypads. Bedroom walls were finished in warm muted tones paired with acoustic timber slats.",
    metrics: [
      { label: "Apartment Size", value: "1,950 sq.ft" },
      { label: "Smart Automation", value: "100% Lutron / KNX" },
      { label: "Execution Time", value: "12 Weeks" },
      { label: "Storage Capacity", value: "+40% Optimized" },
    ],
    materials: [
      { category: "Wall Paneling", name: "White European Ash", origin: "Germany", description: "Vertical slats paired with acoustic insulation for noise-free video conferences." },
      { category: "Flooring", name: "Honed Nordic Birch Parquet", origin: "Scandinavia", description: "Matte polyurethane protected timber floor with radiant warmth." },
      { category: "Wardrobes", name: "Smoked Glass & Aluminum", origin: "Salice, Italy", description: "Walk-in wardrobe with automatic sensor-activated internal illumination." },
    ],
    gallery: [
      {
        src: "/images/da/user_uploads/upload_27.jpg",
        alt: "Japandi master bedroom with curved bed New Town Kolkata",
        caption: "Minimalist master suite with warm timber paneling and scenic wall mural sliding doors.",
        room: "Master Bedroom",
      },
      {
        src: "/images/da/user_uploads/upload_28.jpeg",
        alt: "Guest bedroom with arched grid window New Town Kolkata",
        caption: "Bright bedroom flooded with natural light through high-arch framing.",
        room: "Guest Bedroom",
      },
      {
        src: "/images/da/user_uploads/upload_18.jpeg",
        alt: "Modern luxury kitchen with wood grain upper cabinets New Town Kolkata",
        caption: "Kitchen island with fluted breakfast bar and warm under-counter lighting.",
        room: "Kitchen Island",
      },
      {
        src: "/images/da/user_uploads/upload_29.jpeg",
        alt: "Monochrome executive bedroom New Town Kolkata",
        caption: "Charcoal wainscoting and gloss sliding wardrobe doors for modern executive feel.",
        room: "Executive Suite",
      },
    ],
    clientTestimonial: {
      quote: "The clean lines and smart lighting scenes completely changed how we experience our home after long work hours. DA Interiors is the gold standard for modern design in Kolkata.",
      clientName: "T. Sengupta",
      role: "Tech Founder, Action Area II, New Town",
    },
    seo: {
      metaTitle: "New Town Interior Designer Kolkata | Smart Home 3 BHK Case Study",
      metaDescription: "See DA Interiors' 1,950 sq.ft Japandi smart home in New Town Action Area II, Kolkata. Integrated lighting automation, custom woodcraft joinery, and minimalist bedroom sanctuaries.",
      keywords: [
        "new town interior designer kolkata",
        "action area 2 interior design",
        "smart home interior kolkata",
        "japandi interior design kolkata",
        "minimalist apartment interior new town"
      ],
      focusNeighborhood: "New Town / Action Area II",
    },
    nextSlug: "urbana-sky-penthouse-anandapur",
    prevSlug: "silver-spring-em-bypass-condo",
  },
];

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES;
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((c) => c.featured);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((c) => c.slug);
}

export function getAllCategories(): string[] {
  const categories = new Set(CASE_STUDIES.map((c) => c.category));
  return ["All Projects", ...Array.from(categories)];
}

export function getAllNeighborhoods(): string[] {
  const neighborhoods = new Set(CASE_STUDIES.map((c) => c.neighborhood));
  return ["All Kolkata", ...Array.from(neighborhoods)];
}
