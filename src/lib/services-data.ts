import {
  House, Sparkles, Droplet, Hammer, Camera,
  Lightbulb, Compass, Award, ShieldCheck, Ruler,
  Palette, Layers, CheckCircle2, Eye,
  type LucideIcon,
} from "lucide-react";

export interface ServiceInclusion {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ServicePackage {
  name: string;
  subtitle: string;
  price: string;
  unit: string;
  features: string[];
  featured: boolean;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  headline: string;
  heroDescription: string;
  startingPrice: string;
  icon: LucideIcon;
  heroImage: string;
  expertiseImage: string;
  expertiseTitle: string;
  expertiseDescription: string;
  expertiseStats: { value: string; label: string }[];
  inclusions: ServiceInclusion[];
  packages: ServicePackage[];
  faqs: ServiceFaq[];
  ctaTitle: string;
  ctaDescription: string;
}

export const allServices: ServiceData[] = [
  {
    slug: "residential-architecture",
    title: "Full-Residence Architecture & Renovation",
    shortTitle: "Residential Architecture",
    tagline: "Bespoke Spatial Transformations",
    headline: "Transforming Residences Into Architectural Sanctuaries.",
    heroDescription: "Complete architectural planning, structural restructuring, and luxury renovations for private penthouses, villas, and heritage residences.",
    startingPrice: "$5,000",
    icon: House,
    heroImage: "/images/da/user_uploads/upload_15.jpeg",
    expertiseImage: "/images/da/user_uploads/upload_20.jpeg",
    expertiseTitle: "Master Architectural Practice",
    expertiseDescription: "Our architectural practice bridges structural precision with intimate lifestyle tailoring. Every wall, opening, and sightline is engineered to maximize natural light and quiet flow.",
    expertiseStats: [
      { value: "275+", label: "Projects Delivered" },
      { value: "14", label: "Design Awards" },
      { value: "100%", label: "Turnkey Execution" },
      { value: "4.6★", label: "Google Rating (56 Reviews)" },
    ],
    inclusions: [
      { icon: Ruler, title: "Spatial Reconfiguration", desc: "Optimizing floor plans, open-concept transitions, and sightlines." },
      { icon: Palette, title: "Curated Material Palette", desc: "Hand-selected travertine, smoked French oak, and Belgian linens." },
      { icon: Layers, title: "Complete Technical Drawings", desc: "Electrical, plumbing, HVAC, and ceiling reflection plans." },
      { icon: CheckCircle2, title: "Statutory Approvals", desc: "Comprehensive building permit management and compliance." },
    ],
    packages: [
      {
        name: "Concept & Spatial Layout",
        subtitle: "For homeowners planning a renovation",
        price: "$4,500",
        unit: "per project",
        features: ["Initial lifestyle discovery session", "2D revised architectural layouts", "Mood boards & material tactile box", "Lighting & electrical schematic"],
        featured: false,
      },
      {
        name: "Complete Architectural Interior",
        subtitle: "Our signature full-service design suite",
        price: "$9,500",
        unit: "starting from",
        features: ["Full CAD architectural drawing set", "Photorealistic 3D renders of all rooms", "Custom joinery specifications", "Complete finishes schedule", "Contractor bidding guidance"],
        featured: true,
      },
      {
        name: "Turnkey White-Glove Architecture",
        subtitle: "From blueprint to final handover",
        price: "Custom",
        unit: "quote based",
        features: ["Dedicated lead architect on-site", "Artisan procurement & fabrication", "Weekly photoreal progress reviews", "White-glove styling & champagne reveal"],
        featured: false,
      },
    ],
    faqs: [
      { q: "What is your typical project timeline?", a: "Residential projects typically range between 6 to 16 weeks for design and 3 to 6 months for construction depending on scale." },
      { q: "Do you handle structural modifications?", a: "Yes. Our team works with certified structural engineers to safely move load-bearing elements and open spaces." },
      { q: "Can you manage the contractor bidding process?", a: "Absolutely. We prepare detailed technical tenders to ensure fair, transparent pricing from vetted luxury builders." },
    ],
    ctaTitle: "Begin Your Residential Transformation",
    ctaDescription: "Schedule a private discovery session with our principal architect to review your property.",
  },
  {
    slug: "bespoke-styling",
    title: "Bespoke Interior Styling & Curation",
    shortTitle: "Interior Styling",
    tagline: "Tactile Elegance & Curated Living",
    headline: "Tailored Furniture, Fine Art, & Spatial Harmony.",
    heroDescription: "Custom furniture commissions, fine art acquisition, tactile textiles, and styling for clients who appreciate timeless quiet luxury.",
    startingPrice: "$3,500",
    icon: Sparkles,
    heroImage: "/images/da/user_uploads/upload_06.jpeg",
    expertiseImage: "/images/da/user_uploads/upload_07.jpeg",
    expertiseTitle: "Sensory Materiality & Tactile Warmth",
    expertiseDescription: "We believe homes should feel as rich to touch as they are pleasing to behold. We curate custom bouclé, raw silks, natural stone, and handmade ceramics.",
    expertiseStats: [
      { value: "400+", label: "Bespoke Pieces Crafted" },
      { value: "50+", label: "Artisans & Mills" },
      { value: "100%", label: "Exclusive Curation" },
      { value: "5.0★", label: "Client Rating" },
    ],
    inclusions: [
      { icon: Palette, title: "Custom Furniture Design", desc: "One-of-a-kind seating, dining tables, and sculptural casegoods." },
      { icon: Eye, title: "Fine Art & Sculpture Advisory", desc: "Private gallery curation and collector acquisition." },
      { icon: Layers, title: "Textile & Rug Layering", desc: "Custom hand-knotted wool, linen drapery, and tactile upholstery." },
      { icon: CheckCircle2, title: "White-Glove Placement", desc: "Every decorative object and book styled to perfection." },
    ],
    packages: [
      {
        name: "Room Refresh & Curation",
        subtitle: "Single high-impact living or master space",
        price: "$3,200",
        unit: "per room",
        features: ["Complete furniture selection & layout", "Fabric & finish swatches delivered", "Lighting & accessory styling guide", "Trade discount procurement"],
        featured: false,
      },
      {
        name: "Full Residence Curation",
        subtitle: "Comprehensive cohesive home styling",
        price: "$7,500",
        unit: "starting from",
        features: ["Multi-room furniture design & curation", "Custom millwork & upholstery specs", "Art curation & framing coordination", "Turnkey installation day styling"],
        featured: true,
      },
      {
        name: "Collector Private Concierge",
        subtitle: "Rare materials, vintage & gallery commissions",
        price: "Custom",
        unit: "tailored",
        features: ["Auction & international gallery sourcing", "Custom artisan furniture commissions", "Exclusive fabric house access", "Direct principal designer oversight"],
        featured: false,
      },
    ],
    faqs: [
      { q: "Can we incorporate our existing furniture pieces?", a: "Yes. We often integrate cherished heirlooms and collector art into the new aesthetic seamlessly." },
      { q: "Do you receive trade discounts on furniture?", a: "Yes, we pass exclusive design trade pricing directly to our turnkey clients." },
    ],
    ctaTitle: "Elevate Your Home's Interior Aesthetic",
    ctaDescription: "Book a private styling consultation to discuss bespoke furnishings and material palettes.",
  },
  {
    slug: "kitchen-bath",
    title: "Luxury Kitchen & Master Bath Sanctuaries",
    shortTitle: "Kitchen & Bath Sanctuaries",
    tagline: "Master Stone & Bespoke Joinery",
    headline: "Crafting Culinary Theatres & Private Spa Sanctuaries.",
    heroDescription: "Bookmatched natural marble, fluted custom millwork, concealed high-performance appliances, and architectural wellness bathrooms.",
    startingPrice: "$4,500",
    icon: Droplet,
    heroImage: "/images/da/user_uploads/upload_04.jpg",
    expertiseImage: "/images/da/user_uploads/upload_16.jpeg",
    expertiseTitle: "Sculpted Stone & Precision Cabinetry",
    expertiseDescription: "The kitchen and master bath are the emotional anchors of luxury living. We merge ergonomic chef-grade utility with serene, tactile spa aesthetics.",
    expertiseStats: [
      { value: "120+", label: "Kitchens & Baths Delivered" },
      { value: "30+", label: "Marble Quarry Partnerships" },
      { value: "Zero", label: "Visible Compromise" },
      { value: "4.9★", label: "Client Satisfaction" },
    ],
    inclusions: [
      { icon: Layers, title: "Bookmatched Marble & Quartzite", desc: "Hand-inspected slabs from Carrara, Greece, and Portugal." },
      { icon: Hammer, title: "Integrated Joinery", desc: "Pocket doors, fluted fronts, and hidden appliance garages." },
      { icon: Droplet, title: "Wellness Plumbing Fixtures", desc: "Rainfall systems, steam showers, and sculptural freestanding tubs." },
      { icon: Lightbulb, title: "Circadian Mood Lighting", desc: "Warm recessed cove lights and under-cabinet glow." },
    ],
    packages: [
      {
        name: "Master Suite Bath Sanctuary",
        subtitle: "Private spa bathroom transformation",
        price: "$4,200",
        unit: "design fee",
        features: ["3D photoreal bathroom visualization", "Full marble & tile layout schedules", "Plumbing & fixture selection", "Custom vanity & mirror detailing"],
        featured: false,
      },
      {
        name: "Chef's Kitchen & Pantry",
        subtitle: "Architectural culinary statement",
        price: "$6,500",
        unit: "design fee",
        features: ["Island & cabinetry millwork drawings", "Concealed appliance integration plan", "Stone slab selection & dry-lay review", "Lighting & hardware schedule"],
        featured: true,
      },
      {
        name: "Combined Kitchen + Master Suite",
        subtitle: "Unified wet zone architectural package",
        price: "$9,800",
        unit: "starting from",
        features: ["Complete kitchen, scullery & powder room", "Master bathroom & dressing room", "Full technical drawing suite", "Contractor on-site liaison"],
        featured: false,
      },
    ],
    faqs: [
      { q: "How do you select natural stone slabs?", a: "We personally inspect each marble and quartzite block with you, approving veining and coloration prior to precision cutting." },
      { q: "Which appliance brands do you integrate?", a: "We frequently specify Sub-Zero, Wolf, Gaggenau, Miele, and bespoke La Cornue ranges." },
    ],
    ctaTitle: "Design Your Culinary & Spa Sanctuaries",
    ctaDescription: "Schedule a design audit with our kitchen and bath architectural specialists.",
  },
  {
    slug: "hospitality-commercial",
    title: "Boutique Hospitality & Commercial Spaces",
    shortTitle: "Hospitality & Commercial",
    tagline: "Experiential Brand Architecture",
    headline: "Immersive Spaces That Captivate & Endure.",
    heroDescription: "Interior architecture and curation for luxury boutique hotels, Michelin-starred restaurants, private clubs, and executive founder suites.",
    startingPrice: "$8,000",
    icon: Award,
    heroImage: "/images/da/user_uploads/upload_22.jpeg",
    expertiseImage: "/images/da/user_uploads/upload_11.jpeg",
    expertiseTitle: "Atmospheric Brand Storytelling",
    expertiseDescription: "Commercial interiors must evoke an unmistakable emotional resonance while withstanding heavy guest circulation through rigorous commercial detailing.",
    expertiseStats: [
      { value: "45+", label: "Venues Completed" },
      { value: "6", label: "Hospitality Awards" },
      { value: "100%", label: "Code & Accessibility" },
      { value: "35%", label: "Average Guest Dwell Lift" },
    ],
    inclusions: [
      { icon: Compass, title: "Experiential Spatial Planning", desc: "Guest arrival journeys, acoustic zoning, and atmospheric flow." },
      { icon: ShieldCheck, title: "Commercial-Grade Durability", desc: "Rub-count rated textiles, stain-resistant finishes, fire safety." },
      { icon: Lightbulb, title: "Dramatic Architectural Illumination", desc: "Nightlife, dining, and daylight automated scene controls." },
      { icon: CheckCircle2, title: "Brand Identity Integration", desc: "Custom bespoke elements that make the venue unforgettable." },
    ],
    packages: [
      {
        name: "Boutique Lounge / Dining",
        subtitle: "For restaurants, cafes & tasting rooms",
        price: "$8,500",
        unit: "starting from",
        features: ["Seating layout & circulation audit", "Custom bar & banquette millwork", "Atmospheric lighting scheme", "Full commercial finish specifications"],
        featured: true,
      },
      {
        name: "Executive Office Sanctuary",
        subtitle: "For founder suites & private offices",
        price: "$6,500",
        unit: "per suite",
        features: ["Boardroom acoustic panelling", "Bespoke executive desk & joinery", "Lounge & hospitality credenza", "Client presentation lighting scenes"],
        featured: false,
      },
    ],
    faqs: [
      { q: "Do you collaborate with commercial builders?", a: "Yes, we work alongside general contractors, MEP engineers, and brand agencies." },
    ],
    ctaTitle: "Craft An Unforgettable Destination",
    ctaDescription: "Discuss your upcoming hospitality or commercial venture with our creative directors.",
  },
  {
    slug: "custom-millwork",
    title: "Custom Millwork & Architectural Joinery",
    shortTitle: "Custom Millwork",
    tagline: "Artisan Joinery To The Millimeter",
    headline: "Seamless Integrated Cabinetry & Fluted Woodcraft.",
    heroDescription: "Bespoke walk-in dressing rooms, floating vanities, fluted architectural wall paneling, and concealed pivot doors.",
    startingPrice: "$3,000",
    icon: Hammer,
    heroImage: "/images/da/user_uploads/upload_12.jpeg",
    expertiseImage: "/images/da/user_uploads/upload_14.jpeg",
    expertiseTitle: "In-House Woodcraft Master Artisans",
    expertiseDescription: "Nothing elevates an interior faster than millwork designed specifically for the architecture. We eliminate visible hardware for a pure, seamless silhouette.",
    expertiseStats: [
      { value: "0.5mm", label: "Fabrication Tolerance" },
      { value: "20+", label: "Wood Species & Finishes" },
      { value: "10-Yr", label: "Joinery Workmanship Warranty" },
      { value: "100%", label: "Custom Made" },
    ],
    inclusions: [
      { icon: Ruler, title: "Precision Laser Site Audits", desc: "Laser scanning ensures zero gaps or alignment flaws." },
      { icon: Layers, title: "Exotic & Sustainable Veneers", desc: "European oak, American walnut, burl wood, and ebony finishes." },
      { icon: Lightbulb, title: "Concealed LED Details", desc: "Warm integrated lighting inside wardrobes and display niches." },
      { icon: CheckCircle2, title: "Master Carpenter Installation", desc: "Installed by dedicated master cabinetmakers." },
    ],
    packages: [
      {
        name: "Bespoke Dressing Suite",
        subtitle: "Walk-in wardrobe & boutique vanity",
        price: "$3,800",
        unit: "design fee",
        features: ["Accessory island & glass jewelry drawers", "Integrated LED wardrobe rails", "Smoked glass doors & velvet inserts", "Cabinetmaker shop drawings"],
        featured: true,
      },
      {
        name: "Architectural Wall Paneling & Media",
        subtitle: "Living room accent wall & concealed doors",
        price: "$2,900",
        unit: "design fee",
        features: ["Fluted oak or travertine wall cladding", "Concealed audio-visual integration", "Floating travertine hearth shelf", "Full millwork shop drawings"],
        featured: false,
      },
    ],
    faqs: [
      { q: "What woods and finishes do you offer?", a: "We work with rift-cut white oak, smoked oak, canaletto walnut, figured maple, and high-gloss lacquer." },
    ],
    ctaTitle: "Commission Bespoke Architectural Millwork",
    ctaDescription: "Consult with our joinery specialists to design custom built-ins tailored to your residence.",
  },
  {
    slug: "3d-visualization",
    title: "3D Photorealistic Pre-Visualization & VR",
    shortTitle: "3D Visualization",
    tagline: "Experience Spaces Before Construction",
    headline: "Hyper-Realistic Light & Material Renderings.",
    heroDescription: "Ultra-realistic 3D architectural renders, accurate daylight studies, and interactive VR walkthroughs so every detail is approved in advance.",
    startingPrice: "$2,000",
    icon: Camera,
    heroImage: "/images/da/user_uploads/upload_27.jpg",
    expertiseImage: "/images/da/user_uploads/upload_26.jpeg",
    expertiseTitle: "Photoreal Accuracy & Material Testing",
    expertiseDescription: "We build photoreal digital twins of your space, simulating exact sunlight angles at different times of day and testing material pairings before a single dollar is spent on construction.",
    expertiseStats: [
      { value: "8K", label: "Render Resolution" },
      { value: "100%", label: "Material Accuracy" },
      { value: "360°", label: "Virtual Reality Tours" },
      { value: "Zero", label: "Post-Build Regrets" },
    ],
    inclusions: [
      { icon: Camera, title: "High-Resolution Renderings", desc: "Magazine-quality perspective views showing exact finishes." },
      { icon: Lightbulb, title: "Sunlight & Lighting Simulation", desc: "Accurate illumination at dawn, midday, and twilight." },
      { icon: Eye, title: "Interactive 360° Panorama", desc: "View the proposed space on tablet, phone, or VR headset." },
      { icon: Layers, title: "Material Option Comparisons", desc: "A/B test different stone, wood, and color combinations." },
    ],
    packages: [
      {
        name: "Single Space Photoreal Suite",
        subtitle: "For key living or master bedroom spaces",
        price: "$1,800",
        unit: "per room",
        features: ["3 high-resolution 4K rendered views", "Daylight and evening lighting scenes", "1 revision round for materials", "360-degree panorama viewer link"],
        featured: false,
      },
      {
        name: "Complete Residence 3D Package",
        subtitle: "Full-home pre-visualization walkthrough",
        price: "$4,500",
        unit: "per residence",
        features: ["12+ high-resolution 8K rendered views", "Full home 360° VR interactive tour", "Material A/B comparison options", "Video walkthrough flythrough animation"],
        featured: true,
      },
    ],
    faqs: [
      { q: "How long does a 3D visualization take?", a: "Typically 7 to 10 business days for a complete suite of perspectives." },
    ],
    ctaTitle: "Visualize Your Future Sanctuary",
    ctaDescription: "Commission photoreal renderings to experience your design before breaking ground.",
  },
  {
    slug: "lighting-acoustics",
    title: "Architectural Lighting & Ambient Design",
    shortTitle: "Lighting Design",
    tagline: "Sculpting Space With Light",
    headline: "Warm Layered Illumination & Acoustic Warmth.",
    heroDescription: "Circadian lighting schemes, recessed cove details, sculptural artisan chandeliers, and architectural acoustic integration.",
    startingPrice: "$2,500",
    icon: Lightbulb,
    heroImage: "/images/da/user_uploads/upload_21.jpeg",
    expertiseImage: "/images/da/user_uploads/upload_25.jpeg",
    expertiseTitle: "The Science of Warm Illumination",
    expertiseDescription: "Great architecture fails without intentional light. We craft warm 2400K-2700K scenes that accentuate stone textures and create serene nocturnal sanctuaries.",
    expertiseStats: [
      { value: "2400K", label: "Golden Hour Color Temp" },
      { value: "98+", label: "Color Rendering Index (CRI)" },
      { value: "100%", label: "Glare-Free Engineering" },
      { value: "Smart", label: "Home Automation Ready" },
    ],
    inclusions: [
      { icon: Lightbulb, title: "Layered Lighting Schemes", desc: "Ambient, task, accent, and decorative balance." },
      { icon: Layers, title: "Cove & Architectural Details", desc: "Seamless indirect lighting details for ceilings and stone." },
      { icon: Eye, title: "Fixture Sourcing", desc: "Access to elite European and artisan lighting studios." },
      { icon: CheckCircle2, title: "Smart Scene Programming", desc: "Presets for Entertaining, Dinner, Relaxation, and Late Night." },
    ],
    packages: [
      {
        name: "Architectural Lighting Design",
        subtitle: "Comprehensive lighting plan for residences",
        price: "$2,800",
        unit: "starting from",
        features: ["CAD ceiling reflection plans", "Fixture schedule & beam spread specs", "Lux and glare calculations", "Scene programming guidelines"],
        featured: true,
      },
    ],
    faqs: [
      { q: "Do you work with smart home systems like Lutron or Crestron?", a: "Yes, our lighting schedules map directly into Lutron HomeWorks and other luxury automation systems." },
    ],
    ctaTitle: "Illuminate Your Residence Artfully",
    ctaDescription: "Consult with our lighting designers to craft bespoke atmospheric scenes.",
  },
  {
    slug: "turnkey-stewardship",
    title: "Turnkey Project Management & Procurement",
    shortTitle: "Turnkey Management",
    tagline: "White-Glove Execution From Sketch To Key",
    headline: "Flawless On-Time Delivery With Zero Client Stress.",
    heroDescription: "Complete contractor supervision, global material logistics, quality audits, and final white-glove champagne installation.",
    startingPrice: "$6,000",
    icon: Compass,
    heroImage: "/images/da/user_uploads/upload_08.jpeg",
    expertiseImage: "/images/da/user_uploads/upload_02.jpeg",
    expertiseTitle: "End-to-End Governance & Quality Oversight",
    expertiseDescription: "We act as your tireless advocate on-site, holding every tradesperson to the highest European craftsmanship standards.",
    expertiseStats: [
      { value: "100%", label: "On-Time Track Record" },
      { value: "Weekly", label: "Photoreal Status Reports" },
      { value: "Direct", label: "Trade Pricing Advantage" },
      { value: "Zero", label: "Client Headaches" },
    ],
    inclusions: [
      { icon: Compass, title: "Daily Site Supervision", desc: "Continuous inspections ensuring millimeter alignment." },
      { icon: ShieldCheck, title: "Quality & Material Audits", desc: "Rejecting inferior materials before they touch your home." },
      { icon: Layers, title: "Procurement & Customs Logistics", desc: "Handling imports of Italian stone, Belgian linen, and artisan lighting." },
      { icon: CheckCircle2, title: "White-Glove Styling & Handover", desc: "Fresh flowers, chilled champagne, and a flawless home reveal." },
    ],
    packages: [
      {
        name: "Turnkey Project Stewardship",
        subtitle: "Complete management of the build and installation",
        price: "Custom",
        unit: "percentage of build",
        features: ["Dedicated on-site project director", "Comprehensive timeline and budget controls", "Global material tracking and logistics", "Turnkey reveal styling"],
        featured: true,
      },
    ],
    faqs: [
      { q: "How often will I receive progress updates?", a: "You receive a structured digital dossier every Friday with high-resolution photos and milestone tracking." },
    ],
    ctaTitle: "Experience Seamless Interior Execution",
    ctaDescription: "Let us manage every aspect of your interior project from start to finish.",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return allServices.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return allServices.map((s) => s.slug);
}
