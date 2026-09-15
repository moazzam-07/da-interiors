export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface BlogSection {
  id?: string;
  heading?: string;
  subheading?: string;
  paragraphs: string[];
  quote?: {
    text: string;
    citation?: string;
  };
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  keyTakeaways?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: 
    | "Materiality"
    | "Lighting Design"
    | "Spatial Harmony"
    | "Architectural Joinery"
    | "Heritage Restoration"
    | "Wellness & Sanctuaries";
  publishedAt: string;
  formattedDate: string;
  readTime: string;
  featured?: boolean;
  heroImage: string;
  author: BlogAuthor;
  tags: string[];
  tableOfContents: { id: string; label: string }[];
  sections: BlogSection[];
  conclusion: {
    heading: string;
    text: string;
  };
  relatedSlugs: string[];
}

export const AUTHORS: Record<string, BlogAuthor> = {
  arjun: {
    name: "Arjun Devraj",
    role: "Founding Principal & Architectural Director",
    avatar: "/images/da/hero1.jpg",
    bio: "Arjun leads architectural masterplanning at DA Interiors. Trained in London and Milan, his work interrogates the intersection of monolithic stone geometry and contemplative natural light.",
  },
  meera: {
    name: "Meera Sen-Gupta",
    role: "Head of Interior Architecture & Heritage Curation",
    avatar: "/images/da/living1.jpg",
    bio: "Specializing in historic conservation and tactile material palettes, Meera oversees residential restorations across Kolkata, South Delhi, and European private estates.",
  },
  vikram: {
    name: "Vikramaditya Roy",
    role: "Director of Master Joinery & Lighting",
    avatar: "/images/da/project2.jpg",
    bio: "With two decades collaborating with Italian stone ateliers and Bavarian woodcraft guilds, Vikram directs custom millimeter-tolerance millwork and ambient lighting design.",
  },
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-enduring-poetry-of-roman-travertine",
    title: "The Enduring Poetry of Roman Travertine in Contemporary Living",
    subtitle: "Why unpolished, porous natural stone grounds contemporary residential architecture in timeless permanence.",
    excerpt: "Exploring the geological memory of Roman travertine, the distinction between vein-cut and cross-cut slabs, and how raw stone patinates across decades of daily life.",
    category: "Materiality",
    publishedAt: "2025-02-14",
    formattedDate: "February 14, 2025",
    readTime: "7 min read",
    featured: true,
    heroImage: "/images/da/user_uploads/upload_15.jpeg",
    author: AUTHORS.arjun,
    tags: ["Travertine", "Natural Stone", "Material Purity", "Italian Quarries", "Living Architecture"],
    tableOfContents: [
      { id: "geological-memory", label: "The Geological Memory of Sedimentary Stone" },
      { id: "vein-cut-vs-cross-cut", label: "Vein-Cut vs. Cross-Cut: The Art of Direction" },
      { id: "tactile-counterpoint", label: "Tactile Counterpoints: Pairing Stone with Warm Oak" },
      { id: "the-patina-of-time", label: "Living with Unfilled Stone: Aging with Grace" },
    ],
    sections: [
      {
        id: "geological-memory",
        heading: "The Geological Memory of Sedimentary Stone",
        paragraphs: [
          "In an era where synthetic surfacing and hyper-polished ceramics dominate industrial interior fit-outs, natural Roman travertine offers an almost meditative counter-narrative. Formed through rapid mineral precipitation from geothermal hot springs over tens of thousands of years, travertine bears literal geological history within its open pores and calcite ribbons.",
          "When we specify travertine for our private residential commissions in Kolkata and international penthouses, we reject the conventional impulse to fill every cavity with synthetic resins. Left in its tactile, honest state—merely honed or brushed by hand—travertine softens daylight, cools the foot, and absorbs acoustic harshness.",
        ],
        quote: {
          text: "Travertine does not demand attention; it quietly commands reverence through weight, temperature, and quiet geological cadence.",
          citation: "Arjun Devraj, Founding Principal",
        },
      },
      {
        id: "vein-cut-vs-cross-cut",
        heading: "Vein-Cut vs. Cross-Cut: The Art of Direction",
        paragraphs: [
          "A single quarry block of Roman travertine can yield two entirely divergent architectural expressions depending strictly on the sawing orientation.",
          "A vein-cut (taglio contro falda) slices parallel to the sedimentary bedding planes, revealing linear stratifications that elongate spatial perspective and impart directional velocity to gallery corridors and monolithic kitchen islands. Conversely, a cross-cut (taglio a falda) slices across the strata, presenting clouded, painterly swirls reminiscent of ancient Roman piazza flagstones.",
          "In our recent Bellevue Penthouse commission, we employed vein-cut Roman Navona slabs on the primary hearth wall to draw the eye upward toward the 4.2-meter double-height glazing, while transitioning to cross-cut floor tiles to evoke a grounded, grounding courtyard feeling indoors.",
        ],
        image: {
          src: "/images/da/user_uploads/upload_20.jpeg",
          alt: "Bespoke travertine living sanctuary with sculptural furniture",
          caption: "Custom Navona travertine hearth wall paired with hand-loomed wool textiles and brushed bronze fixtures.",
        },
      },
      {
        id: "tactile-counterpoint",
        heading: "Tactile Counterpoints: Pairing Stone with Warm Oak",
        paragraphs: [
          "Stone without warmth risks feeling institutional. The architectural secret to serene minimalism lies in deliberate tactile friction: placing the cool, monolithic density of natural limestone directly against warm, open-grained French smoked oak or hand-planed walnut.",
          "When cold mineral surfaces meet warm timber joinery, each material elevates the other. The eye perceives stability in the stone, while the hand seeks comfort in the oil-finished wood.",
        ],
        keyTakeaways: [
          "Avoid synthetic poly-fills; embrace micro-honed matte finishes that celebrate open mineral pores.",
          "Use vein-cut travertine to establish architectural axes and cross-cut travertine for expansive, tranquil planes.",
          "Balance massive stone volumes with organic textiles—bouclé, raw Belgian linen, and smoked timber millwork.",
        ],
      },
      {
        id: "the-patina-of-time",
        heading: "The Patina of Time: Living with Noble Materials",
        paragraphs: [
          "Luxury architecture should not fear age; it should welcome it. A travertine threshold buffed smooth by decades of footsteps carries an emotional resonance that factory-sealed quartz can never emulate.",
          "By specifying noble materials that patinate rather than deteriorate, DA Interiors designs homes meant to be lived in deeply, celebrated across generations, and handed down as enduring architectural heirlooms.",
        ],
      },
    ],
    conclusion: {
      heading: "A Material for the Centuries",
      text: "As residential design turns away from fleeting visual trends toward grounded serenity, Roman travertine remains the definitive foundation of modern architectural living.",
    },
    relatedSlugs: [
      "architectural-restraint-the-power-of-negative-space",
      "sourcing-rare-stone-carrara-to-makrana",
      "millimeter-tolerance-bespoke-architectural-millwork",
    ],
  },
  {
    slug: "sculpting-space-with-light-2400k-ambient-philosophy",
    title: "Sculpting Space with Light: The 2400K Ambient Philosophy",
    subtitle: "How indirect architectural illumination, warm cove details, and shadow play cultivate nocturnal calm in luxury homes.",
    excerpt: "Why overhead downlights destroy emotional serenity, and how engineered 2400K warm circadian illumination transforms private residences into tranquil twilight sanctuaries.",
    category: "Lighting Design",
    publishedAt: "2025-01-28",
    formattedDate: "January 28, 2025",
    readTime: "6 min read",
    heroImage: "/images/da/user_uploads/upload_21.jpeg",
    author: AUTHORS.vikram,
    tags: ["Architectural Lighting", "2400K Coves", "Circadian Design", "Shadow Play", "Quiet Luxury"],
    tableOfContents: [
      { id: "the-downlight-trap", label: "The Downlight Trap: Eliminating Ceiling Glare" },
      { id: "the-2400k-spectrum", label: "The 2400K Color Temperature: Simulating Candlelight" },
      { id: "indirect-revelation", label: "Revealing Materiality Through Indirect Grazing" },
      { id: "nocturnal-rituals", label: "Automating Calm: Circadian Lighting Scenes" },
    ],
    sections: [
      {
        id: "the-downlight-trap",
        heading: "The Downlight Trap: Eliminating Ceiling Glare",
        paragraphs: [
          "The most common flaw in modern luxury residential design is the Swiss-cheese ceiling: grids of high-powered recessed downlights punching glare directly into human eyes. When illumination rains straight downward, it casts unflattering shadows beneath cheekbones and eye sockets, while flattening the texture of walls and artisanal millwork.",
          "At DA Interiors, our lighting manifesto begins with a foundational principle: light the room by illuminating surfaces, never by pointing bare light sources at people.",
        ],
      },
      {
        id: "the-2400k-spectrum",
        heading: "The 2400K Color Temperature: Simulating Candlelight",
        paragraphs: [
          "Standard architectural warm white is 2700K or 3000K—adequate for culinary preparation and reading, but still biologically stimulating when the evening unwinds.",
          "Our twilight scenes step down to 2400K and even 2200K dim-to-warm illumination. At this precise spectral wavelength, the blue light spectrum is virtually eliminated, mimicking the amber warmth of firelight and wood embers. The brain interprets this as a subconscious signal that the day has concluded, transitioning the home into an oasis of biological restorative calm.",
        ],
        quote: {
          text: "True architectural illumination is not about the fixtures you see, but the emotional shadows and textures you feel.",
          citation: "Vikramaditya Roy, Director of Lighting",
        },
      },
      {
        id: "indirect-revelation",
        heading: "Revealing Materiality Through Indirect Grazing",
        paragraphs: [
          "Light must have something tactile to embrace. By concealing high-CRI (98+) micro-linear LED profiles behind suspended ceiling bulkheads, behind floating headboards, and underneath cantilevered travertine bathroom vanities, the light grazes the material surface.",
          "Suddenly, the fluting on a walnut wall reveals its micro-shadows; the honed travertine glows from within; and the architectural envelope feels expansive, airy, and warm without a single bulb visible to the naked eye.",
        ],
        image: {
          src: "/images/da/user_uploads/upload_25.jpeg",
          alt: "Architectural dining salon with warm walnut millwork and ambient cove lighting",
          caption: "Concealed 2400K cove details wash the ceiling plane, providing glare-free spatial glow for formal dining.",
        },
        keyTakeaways: [
          "Never illuminate a space with direct downlights; utilize cove grazing, low-level floor washes, and perimeter reveals.",
          "Employ 2400K dim-to-warm technology with 95+ Color Rendering Index (CRI) for true skin and wood tone reproduction.",
          "Incorporate multi-circuit scene control: Morning Awakening, Afternoon Clarity, Evening Repose, and Late Night Nocturne.",
        ],
      },
      {
        id: "nocturnal-rituals",
        heading: "Automating Calm: Circadian Lighting Scenes",
        paragraphs: [
          "Our turnkey automation systems transition smoothly throughout the day. As the sun dips below the Kolkata skyline, the home automatically dims its overhead washes, transferring primary illumination to floor-grazing step lights, artwork picture lights, and perimeter warm coves.",
          "Walking through your residence at night should feel like navigating a moonlit gallery, serene and entirely restorative.",
        ],
      },
    ],
    conclusion: {
      heading: "Mastering the Shadow",
      text: "Light creates space, but shadow creates soul. By orchestrating both with discipline, we turn modern houses into sanctuary homes.",
    },
    relatedSlugs: [
      "the-enduring-poetry-of-roman-travertine",
      "crafting-wellness-sanctuaries-luxury-bathrooms",
      "architectural-restraint-the-power-of-negative-space",
    ],
  },
  {
    slug: "architectural-restraint-the-power-of-negative-space",
    title: "Architectural Restraint: The Power of Negative Space",
    subtitle: "Why quiet luxury isn't about filling rooms with furniture, but giving extraordinary materials the breathing room they deserve.",
    excerpt: "A study in spatial discipline: how editing out decorative clutter allows noble stones, hand-finished timbers, and architectural proportions to resonate with emotive power.",
    category: "Spatial Harmony",
    publishedAt: "2025-01-10",
    formattedDate: "January 10, 2025",
    readTime: "8 min read",
    heroImage: "/images/da/user_uploads/upload_06.jpeg",
    author: AUTHORS.meera,
    tags: ["Negative Space", "Quiet Luxury", "Spatial Discipline", "Minimalism", "High-End Residential"],
    tableOfContents: [
      { id: "the-fear-of-emptiness", label: "The Fear of Emptiness: Overcoming Visual Anxiety" },
      { id: "the-pause-between-notes", label: "Architecture as Music: The Pause Between Notes" },
      { id: "sightlines-and-proportions", label: "Unbroken Sightlines: Framing the Horizon" },
      { id: "curating-singular-moments", label: "Fewer, Greater Moments: The Curated Philosophy" },
    ],
    sections: [
      {
        id: "the-fear-of-emptiness",
        heading: "The Fear of Emptiness: Overcoming Visual Anxiety",
        paragraphs: [
          "In luxury interior design, the instinct to fill every alcove with a console, every wall with gallery frames, and every floor with heavy rugs is ubiquitous. It stems from a subtle anxiety that unoccupied space equates to an unfinished home.",
          "Yet true architectural sophistication operates in reverse. In classical Japanese aesthetics (Ma) and monastic European minimalism, emptiness is not absence—it is a tangible, potent medium. It is what allows the eye to rest and the mind to decompress.",
        ],
      },
      {
        id: "the-pause-between-notes",
        heading: "Architecture as Music: The Pause Between Notes",
        paragraphs: [
          "Debussy famously observed that music is the silence between the notes. Architecture functions precisely the same way. When a 6-meter expanse of smooth lime-washed plaster is left unbroken by small decorative objects, the monolithic block of travertine fireplace sitting at its terminus achieves monumental significance.",
          "If the wall were cluttered with shelving, picture frames, and wall sconces, the stone would lose its sculptural presence. Restraint is the vehicle that grants materials their voice.",
        ],
        quote: {
          text: "Luxury is not the accumulation of beautiful things. It is the privilege of living among noble materials that have enough space to breathe.",
          citation: "Meera Sen-Gupta, Head of Interior Architecture",
        },
      },
      {
        id: "sightlines-and-proportions",
        heading: "Unbroken Sightlines: Framing the Horizon",
        paragraphs: [
          "When designing the spatial layout of high-floor penthouses or sprawling private villas, our first architectural intervention is often subtraction. We remove non-structural partition walls, raise door lintels to the ceiling line (creating 2.8m to 3.2m flush pivot portals), and eliminate visual stumbling blocks.",
          "Standing at the entrance of a DA Interiors residence, you immediately perceive the horizon line, the play of daylight on natural stone flooring, and the uninterrupted rhythm of timber millwork.",
        ],
        image: {
          src: "/images/da/user_uploads/upload_05.jpeg",
          alt: "Sun-drenched luxury lounge with textured bouclé textiles and generous spatial rhythm",
          caption: "Generous spatial pacing creates an atmosphere of unhurried elegance in this private penthouse residence.",
        },
        keyTakeaways: [
          "Treat empty space as an intentional architectural material, not a void awaiting decorative fill.",
          "Raise door headers to full ceiling height to preserve continuous volumetric flow across adjoining salons.",
          "Select singular sculptural furniture pieces rather than crowded seating suites.",
        ],
      },
      {
        id: "curating-singular-moments",
        heading: "Fewer, Greater Moments: The Curated Philosophy",
        paragraphs: [
          "Rather than fifteen small decorative moments scattered across a living salon, we design three heroic, unforgettable moments: a monolithic stone hearth, a singular hand-carved Pierre Jeanneret dining table, and an expansive floor-to-ceiling glass vista.",
          "The result is a home that feels peaceful the instant you step across the threshold—a refuge from the relentless velocity of the outside world.",
        ],
      },
    ],
    conclusion: {
      heading: "The Art of Knowing When to Stop",
      text: "The greatest discipline in design is not knowing what to add, but knowing what to leave untouched.",
    },
    relatedSlugs: [
      "the-enduring-poetry-of-roman-travertine",
      "sculpting-space-with-light-2400k-ambient-philosophy",
      "millimeter-tolerance-bespoke-architectural-millwork",
    ],
  },
  {
    slug: "millimeter-tolerance-bespoke-architectural-millwork",
    title: "Millimeter Tolerance: The Art of Bespoke Architectural Millwork",
    subtitle: "How custom joinery, concealed flush pivot doors, and acoustic wall paneling define the boundary of true high-end living.",
    excerpt: "A masterclass in precision joinery: zero-shadow gaps, concealed European magnetic pivots, integrated acoustic insulation, and hand-selected French smoked oak paneling.",
    category: "Architectural Joinery",
    publishedAt: "2024-12-18",
    formattedDate: "December 18, 2024",
    readTime: "7 min read",
    heroImage: "/images/da/user_uploads/upload_12.jpeg",
    author: AUTHORS.vikram,
    tags: ["Custom Millwork", "Joinery", "Pivot Doors", "Smoked Oak", "Architectural Detailing"],
    tableOfContents: [
      { id: "the-problem-with-off-the-shelf", label: "The Limits of Prefabrication" },
      { id: "concealed-architecture", label: "Concealed Architecture: Zero-Trim Flush Doors" },
      { id: "acoustic-timber", label: "Acoustic Insulation Hidden Within Wood Paneling" },
      { id: "the-craft-of-matching-grain", label: "Bookmatched & Slipmatched Grain Alignment" },
    ],
    sections: [
      {
        id: "the-problem-with-off-the-shelf",
        heading: "The Limits of Prefabrication",
        paragraphs: [
          "Standard retail cabinetry and off-the-shelf doors invariably rely on filler strips, visible trim moldings, and surface-mounted hinges to conceal construction imperfections. In a truly bespoke luxury residence, these compromises shatter the illusion of architectural purity.",
          "Our dedicated master joiners fabricate every built-in wardrobe, library wall, and concealed door to a 0.5mm tolerance. Every vertical reveal line aligns with the floor stone grout joints, ceiling coves, and window mullions.",
        ],
      },
      {
        id: "concealed-architecture",
        heading: "Concealed Architecture: Zero-Trim Flush Doors",
        paragraphs: [
          "One of the hallmarks of a DA Interiors residence is the invisible passage. Utilizing heavy-duty concealed floor-and-ceiling magnetic pivots (engineered to support up to 250kg of solid timber and acoustic dampening core), our doors sit entirely flush with the adjacent wall paneling.",
          "When closed, the door disappears into the fluted walnut or smoked oak rhythm, transforming a busy transitional corridor into a serene, sculptural gallery wall.",
        ],
        quote: {
          text: "When millwork is executed with millimeter precision, the boundary between furniture and architecture completely dissolves.",
          citation: "Vikramaditya Roy, Director of Master Joinery",
        },
      },
      {
        id: "acoustic-timber",
        heading: "Acoustic Insulation Hidden Within Wood Paneling",
        paragraphs: [
          "Bespoke wall paneling is not merely decorative veneer; it is an acoustic instrument. Behind our micro-perforated timber slats and French oak paneling, we integrate high-density mineral wool and acoustic decoupling clips.",
          "The result is a library, media suite, or primary bedroom with near-monastic acoustic quietude—attenuating urban traffic noise and mechanical resonance to create a cocoon of silence.",
        ],
        image: {
          src: "/images/da/user_uploads/upload_14.jpeg",
          alt: "Warm minimalist residence featuring custom joinery and integrated architectural doors",
          caption: "Seamless floor-to-ceiling timber joinery with concealed acoustic dampening and integrated brass reveals.",
        },
        keyTakeaways: [
          "Demand concealed floor-and-ceiling pivot hardware over conventional face-frame butt hinges.",
          "Require full-height door leaves that terminate flush with the ceiling plane without header architraves.",
          "Integrate acoustic absorption directly within architectural wall paneling to eliminate sound flutter.",
        ],
      },
      {
        id: "the-craft-of-matching-grain",
        heading: "Bookmatched & Slipmatched Grain Alignment",
        paragraphs: [
          "We inspect full timber flitches directly at the veneer mill. For consecutive cabinet doors across a 6-meter wardrobe run, the grain flows continuously across every seam without visual interruption. This level of craftsmanship cannot be mass-produced; it requires time, patience, and master artisans.",
        ],
      },
    ],
    conclusion: {
      heading: "The Soul of the House",
      text: "Doors that close with a muffled, weighted whisper; drawers that glide silently on hydraulic dampers; surfaces that invite the hand—this is where luxury is felt every single day.",
    },
    relatedSlugs: [
      "the-enduring-poetry-of-roman-travertine",
      "architectural-restraint-the-power-of-negative-space",
      "heritage-restoration-kolkata-estates",
    ],
  },
  {
    slug: "crafting-wellness-sanctuaries-luxury-bathrooms",
    title: "Crafting Wellness Sanctuaries: The Modern Master Bath",
    subtitle: "Transitioning the primary ensuite from utilitarian washroom into a restorative private thermal spa.",
    excerpt: "Monolithic stone basins, concealed micro-channel drainage, Dornbracht brushed brassware, ambient thermal showers, and the acoustic solitude of the modern residential spa.",
    category: "Wellness & Sanctuaries",
    publishedAt: "2024-11-30",
    formattedDate: "November 30, 2024",
    readTime: "6 min read",
    heroImage: "/images/da/user_uploads/upload_16.jpeg",
    author: AUTHORS.arjun,
    tags: ["Master Bath", "Spa Sanctuary", "Monolithic Basins", "Calacatta Marble", "Wellness Architecture"],
    tableOfContents: [
      { id: "the-spa-as-ritual", label: "The Bath as a Daily Cleansing Ritual" },
      { id: "monolithic-stone-carving", label: "Monolithic Stone: Sinks Carved from Solid Blocks" },
      { id: "concealed-water-engineering", label: "Invisible Water Engineering: Concealed Drains" },
      { id: "tactile-steam-and-heat", label: "Integrated Steam, Heated Stone, and Tactile Warmth" },
    ],
    sections: [
      {
        id: "the-spa-as-ritual",
        heading: "The Bath as a Daily Cleansing Ritual",
        paragraphs: [
          "The modern master bathroom is no longer designed as a secondary utility room. In contemporary luxury living, it has become the most emotionally significant threshold in the home: the sanctuary where the day begins with intention and concludes with restoration.",
          "We approach the master bath with the reverence of Roman thermal baths or Japanese onsens, choreographing daylight, warm water flow, and massive stone surfaces into a multisensory wellness journey.",
        ],
      },
      {
        id: "monolithic-stone-carving",
        heading: "Monolithic Stone: Sinks Carved from Solid Blocks",
        paragraphs: [
          "Rather than under-mount porcelain sinks dropped into vanity tops, our master bath commissions feature monolithic vanity troughs milled from single blocks of Italian Calacatta Viola, Greek Volakas, or honed silver travertine.",
          "The water glides over sloped stone planes into perimeter slot drains, eliminating visible chrome strainers and maintaining unbroken marble veining across the entire horizontal volume.",
        ],
        quote: {
          text: "When water cascades over hand-honed stone, it transforms a mundane morning routine into a meditative architectural ceremony.",
          citation: "Arjun Devraj, Founding Principal",
        },
      },
      {
        id: "concealed-water-engineering",
        heading: "Invisible Water Engineering: Concealed Drains",
        paragraphs: [
          "True elegance is the art of concealment. By engineering zero-threshold walk-in shower suites with sub-floor linear channel drains tucked beneath floating stone floor slabs, the shower floor matches the primary bathroom floor continuously without curbs, metal trims, or bulky grates.",
          "Frameless 12mm low-iron glass enclosures recessed into the ceiling slab allow the spatial envelope to feel boundless and weightless.",
        ],
        image: {
          src: "/images/da/user_uploads/upload_23.jpeg",
          alt: "Bespoke stone craftsmanship and architectural bathroom sanctuary",
          caption: "Continuous marble slab flooring flows seamlessly into the curb-free walk-in rain shower suite.",
        },
        keyTakeaways: [
          "Eliminate shower curbs and visible floor drains by utilizing sub-slab perimeter channel drainage.",
          "Commission monolithic custom-milled stone basins to maintain continuous horizontal vein continuity.",
          "Install radiant floor heating extending beneath both dry vanities and wet shower slabs for absolute winter comfort.",
        ],
      },
      {
        id: "tactile-steam-and-heat",
        heading: "Integrated Steam, Heated Stone, and Tactile Warmth",
        paragraphs: [
          "Stepping onto cold stone in December shatters peace. We integrate hydronic radiant underfloor heating across every square inch of stone flooring—including the shower floor and built-in floating stone benches.",
          "Combined with concealed aromatherapy steam generators, rainfall shower plates calibrated to emulate tropical rain, and ambient 2200K cove illumination, the home becomes your private five-star wellness retreat.",
        ],
      },
    ],
    conclusion: {
      heading: "Restoration as Architecture",
      text: "A well-crafted bath does not merely cleanse the body; it restores the spirit through tactile honesty, temperature, and quiet.",
    },
    relatedSlugs: [
      "the-enduring-poetry-of-roman-travertine",
      "sculpting-space-with-light-2400k-ambient-philosophy",
      "sourcing-rare-stone-carrara-to-makrana",
    ],
  },
  {
    slug: "heritage-restoration-kolkata-estates",
    title: "Heritage Reimagined: Restoring Historic Bengal & Kolkata Estates",
    subtitle: "Preserving soaring arched colonnades and century-old brickwork while infusing contemporary European minimalism.",
    excerpt: "How DA Interiors breathes new life into historic colonial residences, zamindari estates, and heritage bungalows in Alipore, Ballygunge, and central Kolkata.",
    category: "Heritage Restoration",
    publishedAt: "2024-11-12",
    formattedDate: "November 12, 2024",
    readTime: "9 min read",
    heroImage: "/images/da/user_uploads/upload_08.jpeg",
    author: AUTHORS.meera,
    tags: ["Kolkata Heritage", "Colonial Architecture", "Restoration", "Alipore Estates", "Ballygunge Residences"],
    tableOfContents: [
      { id: "kolkatas-architectural-legacy", label: "The Golden Age of Bengal Residential Architecture" },
      { id: "structural-forensics", label: "Structural Forensics: Lime Mortar & Teak Beams" },
      { id: "concealed-modernity", label: "Concealed Modernity: Integrating Climate & Smart Tech" },
      { id: "dialogue-of-eras", label: "The Dialogue of Eras: Arches Meet Italian Minimalism" },
    ],
    sections: [
      {
        id: "kolkatas-architectural-legacy",
        heading: "The Golden Age of Bengal Residential Architecture",
        paragraphs: [
          "Kolkata possesses an architectural heritage unmatched anywhere on the subcontinent. From the stately neoclassical mansions of Ballygunge to the leafy colonial compounds of Alipore and Queens Park, these residences feature 4.5-meter ceilings, deep louvered verandahs (khorkhori), Corinthian pilasters, and cast-iron balustrades.",
          "However, decades of tropical monsoons, ad-hoc utility routing, and aggressive modern alterations have left many of these storied residences structurally compromised or visually fractured. Our studio was founded with a deep commitment to honoring and revitalizing this extraordinary architectural patrimony.",
        ],
      },
      {
        id: "structural-forensics",
        heading: "Structural Forensics: Lime Mortar & Teak Beams",
        paragraphs: [
          "Restoring a century-old Kolkata estate cannot be approached with commercial concrete techniques. Portland cement traps moisture inside traditional surkhi (crushed brick) and slaked lime walls, leading to catastrophic spalling and damp bloom.",
          "We employ heritage conservation masonry: traditional hydraulic lime formulas, handmade brick restoration, and non-destructive ultrasonic testing of ancient Burma teak structural beams. Where timber has suffered insect damage, we splice in seasoned reclaimed teak, preserving the historical integrity of the floor joists.",
        ],
        quote: {
          text: "Heritage restoration is not about freezing a home in the 19th century as a museum; it is about liberating its soul so it thrives across the 21st century.",
          citation: "Meera Sen-Gupta, Head of Heritage Curation",
        },
      },
      {
        id: "concealed-modernity",
        heading: "Concealed Modernity: Integrating Climate & Smart Tech",
        paragraphs: [
          "The most challenging engineering feat in heritage residential renovation is introducing high-performance VRV air conditioning, mechanical ventilation, automated lighting, and structured data without chasing deep conduits through historic lime plaster walls or dropping ceiling heights with cheap drywall bulkheads.",
          "We route high-efficiency VRV air conduits through sub-floor plenums, bespoke architectural millwork chases, and restore original louvered transom vents to serve as architectural return-air grilles.",
        ],
        image: {
          src: "/images/da/user_uploads/upload_13.jpeg",
          alt: "Heritage townhouse restoration with contemporary interior lines and restored proportions",
          caption: "Restored 4.2-meter high ceilings and arched colonnades in Ballygunge paired with contemporary bronze millwork.",
        },
        keyTakeaways: [
          "Never introduce impermeable Portland cement to historic brick walls; preserve breathability with hydraulic lime mortar.",
          "Conceal modern HVAC and automation infrastructure within custom joinery plenums rather than lowering historical ceiling heights.",
          "Create intentional material contrast: allow aged brick and historic moldings to frame sharp, modern Italian furniture.",
        ],
      },
      {
        id: "dialogue-of-eras",
        heading: "The Dialogue of Eras: Arches Meet Italian Minimalism",
        paragraphs: [
          "We don't believe in pastiche reproduction. When we restore a grand arched salon in Kolkata, we celebrate the historic moldings and hand-poured terrazzo floors, but we pair them with razor-sharp Italian kitchen islands, low-slung B&B Italia sofas, and sculptural Flos lighting.",
          "This dynamic juxtaposition between 19th-century grandeur and 21st-century restraint creates an electric, deeply poetic living environment that honors Kolkata's past while looking boldly to the future.",
        ],
      },
    ],
    conclusion: {
      heading: "A Living Legacy",
      text: "To live in a restored heritage home is to be a custodian of history. It is our greatest honor to shepherd these legendary Kolkata residences into their next century of glory.",
    },
    relatedSlugs: [
      "the-enduring-poetry-of-roman-travertine",
      "millimeter-tolerance-bespoke-architectural-millwork",
      "architectural-restraint-the-power-of-negative-space",
    ],
  },
  {
    slug: "biophilic-luxury-indoor-atrium-architecture",
    title: "Biophilic Architecture: Private Atriums & Living Courtyards",
    subtitle: "Choreographing daylight shafts, reflecting pools, and indoor botanical gardens into the heart of luxury urban residences.",
    excerpt: "How internal courtyards, sculptural olive trees, and natural light wells dissolve the threshold between indoor sanctuary and outdoor wilderness in high-density cities.",
    category: "Spatial Harmony",
    publishedAt: "2024-10-24",
    formattedDate: "October 24, 2024",
    readTime: "7 min read",
    heroImage: "/images/da/user_uploads/upload_28.jpeg",
    author: AUTHORS.arjun,
    tags: ["Biophilic Design", "Internal Courtyard", "Atrium Architecture", "Natural Light", "Indoor Gardens"],
    tableOfContents: [
      { id: "nature-as-spatial-anchor", label: "Nature as the Spiritual Anchor of the Home" },
      { id: "sculpting-the-lightwell", label: "Sculpting the Light Well: Passive Daylight Harvest" },
      { id: "water-and-acoustic-calm", label: "Indoor Water Architecture: Mitigating City Noise" },
      { id: "flora-selection", label: "Botanical Curation: Living Sculptures Indoors" },
    ],
    sections: [
      {
        id: "nature-as-spatial-anchor",
        heading: "Nature as the Spiritual Anchor of the Home",
        paragraphs: [
          "In high-density metropolitan centers like Kolkata, Mumbai, or London, urban life is characterized by acoustic chaos, artificial light, and visual clutter. When returning home, the human nervous system requires an immediate sensory recalibration.",
          "Biophilic architecture does not mean placing potted plants in corners. It means organizing the entire floor plan around a central open-air or glass-enclosed botanical atrium—a living lung at the very heart of the residence.",
        ],
      },
      {
        id: "sculpting-the-lightwell",
        heading: "Sculpting the Light Well: Passive Daylight Harvest",
        paragraphs: [
          "By cutting double-height architectural light shafts through the core of deep residential floor plates, we channel natural sunlight down into spaces that would otherwise remain dark and dependent on artificial light.",
          "As the sun tracks across the sky from dawn to dusk, the interior walls register moving patterns of leaf shadows and golden rays, connecting residents to the seasonal rhythms of the natural world.",
        ],
        quote: {
          text: "When a house wraps itself around a garden, every daily step—from bedroom to breakfast table—becomes a walk in nature.",
          citation: "Arjun Devraj, Founding Principal",
        },
      },
      {
        id: "water-and-acoustic-calm",
        heading: "Indoor Water Architecture: Mitigating City Noise",
        paragraphs: [
          "Sound is as critical to interior architecture as sight. We frequently integrate minimalist black granite reflecting rills and gently cascading water walls within internal courtyards.",
          "The white-noise frequency of softly moving water acts as a natural acoustic shield, masking exterior street noise and instilling a profound auditory calm throughout the living and dining wings.",
        ],
        image: {
          src: "/images/da/user_uploads/upload_29.jpeg",
          alt: "Private villa atrium featuring natural stone and architectural lighting",
          caption: "A central glass-encased courtyard brings daylight and botanical tranquility deep into the living spaces.",
        },
        keyTakeaways: [
          "Design floor plans around an internal light well to bring natural illumination to landlocked rooms.",
          "Incorporate moving water features to naturally mask urban auditory pollution with gentle white noise.",
          "Select architectural specimen flora with distinct sculptural branching—such as Japanese maples or mature ficus bonsai.",
        ],
      },
      {
        id: "flora-selection",
        heading: "Botanical Curation: Living Sculptures Indoors",
        paragraphs: [
          "We collaborate with master landscape botanists to select specimen trees with architectural character—a century-old gnarled olive tree, a delicate Japanese maple, or sculptural fiddle-leaf figs. Integrated sub-surface irrigation and calibrated full-spectrum horticultural grow lights ensure the indoor garden flourishes year-round.",
        ],
      },
    ],
    conclusion: {
      heading: "Living with the Earth",
      text: "Biophilic architecture reminds us that we are not separate from nature; we are part of it. When our homes reflect this truth, our lives become infinitely more peaceful.",
    },
    relatedSlugs: [
      "architectural-restraint-the-power-of-negative-space",
      "sculpting-space-with-light-2400k-ambient-philosophy",
      "the-enduring-poetry-of-roman-travertine",
    ],
  },
  {
    slug: "sourcing-rare-stone-carrara-to-makrana",
    title: "Noble Quarry Sourcing: From Carrara to Makrana",
    subtitle: "The extraordinary journey from geological quarry faces to hand-bookmatched architectural marble installations.",
    excerpt: "An insider look into our private quarry expeditions across Tuscany and Rajasthan, hand-selecting unrepeatable marble blocks for discerning private homeowners.",
    category: "Materiality",
    publishedAt: "2024-10-02",
    formattedDate: "October 2, 2024",
    readTime: "8 min read",
    heroImage: "/images/da/user_uploads/upload_04.jpg",
    author: AUTHORS.arjun,
    tags: ["Carrara Marble", "Makrana White", "Stone Sourcing", "Bookmatching", "Master Masonry"],
    tableOfContents: [
      { id: "at-the-quarry-face", label: "Standing at the Quarry Face: Geological Selection" },
      { id: "the-geometry-of-bookmatching", label: "The Mathematics of Bookmatched Slabs" },
      { id: "makrana-the-white-gold", label: "Makrana Marble: The Indestructible Heritage Stone" },
      { id: "precision-dry-laying", label: "The Dry-Lay Protocol: Inspecting Before Installation" },
    ],
    sections: [
      {
        id: "at-the-quarry-face",
        heading: "Standing at the Quarry Face: Geological Selection",
        paragraphs: [
          "True luxury interior architecture does not begin in a showroom or on a computer screen; it begins inside the mountain. Twice a year, our principals travel directly to the Apuan Alps of Carrara and the ancient marble hills of Makrana in Rajasthan to inspect newly excavated blocks.",
          "We touch the raw stone, wet the face with water to reveal the latent crystal density and vein direction, and select single monolithic blocks reserved exclusively for our clients' residences.",
        ],
      },
      {
        id: "the-geometry-of-bookmatching",
        heading: "The Mathematics of Bookmatched Slabs",
        paragraphs: [
          "When a single block of highly veined marble—such as Calacatta Viola or Statuario Altissimo—is sliced into consecutive slabs, consecutive pairs can be mirrored along their adjoining edges like an opened book. This technique, known as bookmatching (macchia aperta), turns natural geological turbulence into symmetrical fine art.",
          "In our bespoke penthouse projects, bookmatched hearths and powder room walls create breathtaking focal points that no synthetic or man-made material could ever replicate.",
        ],
        quote: {
          text: "Every slab of marble is a 50-million-year-old painting. Our role as architects is simply to present its geological majesty without distortion.",
          citation: "Arjun Devraj, Founding Principal",
        },
      },
      {
        id: "makrana-the-white-gold",
        heading: "Makrana Marble: The Indestructible Heritage Stone",
        paragraphs: [
          "While Italian marbles are globally celebrated for their dramatic violet and grey veining, India's own Makrana white marble holds an unmatched position in architectural durability. Composed of 98% pure crystalline calcium carbonate with zero porosity, Makrana does not stain, crack, or yellow.",
          "It is the very stone from which the Taj Mahal and Victoria Memorial were erected. When we integrate honed Makrana into contemporary Kolkata villas, it bridges classical imperial history with modern minimalist purity.",
        ],
        image: {
          src: "/images/da/user_uploads/upload_03.jpeg",
          alt: "Bespoke stone craftsmanship and noble quarry marble installation",
          caption: "Hand-selected Calacatta marble dry-laid and numbered prior to final on-site installation.",
        },
        keyTakeaways: [
          "Always inspect marble blocks at the quarry level or distributor yard before slicing; never rely on small catalog swatches.",
          "Implement a mandatory full-scale dry-lay session where all cut slabs are laid out horizontally for client approval.",
          "Celebrate natural fissures, crystalline pockets, and geological variations as proofs of authentic antiquity.",
        ],
      },
      {
        id: "precision-dry-laying",
        heading: "The Dry-Lay Protocol: Inspecting Before Installation",
        paragraphs: [
          "Before a single piece of marble is installed on a client's floor or wall, our master masons conduct a full-scale 'dry-lay' at our studio warehouse. Every slab is placed on the floor, numbered, rotated, and adjusted until the vein flow across the entire room achieves sublime harmony.",
          "Only when our clients and principals sign off on the dry-lay does the white-glove site installation commence.",
        ],
      },
    ],
    conclusion: {
      heading: "Permanence in a Disposable World",
      text: "In a culture of planned obsolescence, natural stone remains humanity's oldest testament to beauty, permanence, and reverence for the natural world.",
    },
    relatedSlugs: [
      "the-enduring-poetry-of-roman-travertine",
      "crafting-wellness-sanctuaries-luxury-bathrooms",
      "heritage-restoration-kolkata-estates",
    ],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getFeaturedBlogPost(): BlogPost {
  return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export function getRelatedPosts(currentSlug: string, category: string): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (current && current.relatedSlugs.length > 0) {
    const related = current.relatedSlugs
      .map((s) => getBlogPostBySlug(s))
      .filter((p): p is BlogPost => Boolean(p));
    if (related.length >= 3) return related.slice(0, 3);
  }
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug && p.category === category).slice(0, 3);
}

export function getAllCategories(): string[] {
  const categories = new Set(BLOG_POSTS.map((p) => p.category));
  return ["All", ...Array.from(categories)];
}
