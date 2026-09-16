const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/branding');
const downloadsDir = 'C:\\Users\\MOAZZAM\\Downloads\\DA_Interiors_Visiting_Card_Assets';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// 1. Horizontal Logo - Dark Text on Transparent (for White/Light Cards)
const svgHorizontalDark = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 240" width="3000" height="720" fill="none">
  <defs>
    <linearGradient id="gold_grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D8B583" />
      <stop offset="50%" stop-color="#C29D6D" />
      <stop offset="100%" stop-color="#A67C47" />
    </linearGradient>
  </defs>

  <!-- Emblem Monogram Badge -->
  <g transform="translate(40, 20)">
    <rect
      x="0"
      y="0"
      width="200"
      height="200"
      rx="44"
      fill="none"
      stroke="url(#gold_grad)"
      stroke-width="7"
    />
    <!-- Letter D (Rich Espresso/Charcoal) -->
    <path
      d="M45 44V156M45 44H84C114 44 134 66 134 100C134 134 114 156 84 156H45"
      fill="none"
      stroke="#1C1917"
      stroke-width="16"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Letter A (Champagne Gold) -->
    <path
      d="M102 156L140 44L178 156"
      fill="none"
      stroke="url(#gold_grad)"
      stroke-width="16"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Crossbar of A -->
    <path
      d="M117 122H163"
      fill="none"
      stroke="url(#gold_grad)"
      stroke-width="12"
      stroke-linecap="round"
    />
  </g>

  <!-- Brand Typography -->
  <g transform="translate(280, 0)">
    <text
      x="0"
      y="126"
      fill="#1C1917"
      font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
      font-weight="900"
      font-size="76"
      letter-spacing="14"
    >DA INTERIORS</text>
    <text
      x="6"
      y="178"
      fill="#C29D6D"
      font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
      font-weight="700"
      font-size="24"
      letter-spacing="18"
    >ARCHITECTURE &amp; LIVING</text>
  </g>
</svg>
`;

// 2. Horizontal Logo - Light Text on Transparent (for Dark/Black Cards)
const svgHorizontalLight = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 240" width="3000" height="720" fill="none">
  <defs>
    <linearGradient id="gold_grad_light" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8CEAA" />
      <stop offset="50%" stop-color="#C29D6D" />
      <stop offset="100%" stop-color="#AD8553" />
    </linearGradient>
  </defs>

  <!-- Emblem Monogram Badge -->
  <g transform="translate(40, 20)">
    <rect
      x="0"
      y="0"
      width="200"
      height="200"
      rx="44"
      fill="none"
      stroke="url(#gold_grad_light)"
      stroke-width="7"
    />
    <!-- Letter D (Crisp Platinum White) -->
    <path
      d="M45 44V156M45 44H84C114 44 134 66 134 100C134 134 114 156 84 156H45"
      fill="none"
      stroke="#FFFFFF"
      stroke-width="16"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Letter A (Champagne Gold) -->
    <path
      d="M102 156L140 44L178 156"
      fill="none"
      stroke="url(#gold_grad_light)"
      stroke-width="16"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Crossbar of A -->
    <path
      d="M117 122H163"
      fill="none"
      stroke="url(#gold_grad_light)"
      stroke-width="12"
      stroke-linecap="round"
    />
  </g>

  <!-- Brand Typography -->
  <g transform="translate(280, 0)">
    <text
      x="0"
      y="126"
      fill="#FFFFFF"
      font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
      font-weight="900"
      font-size="76"
      letter-spacing="14"
    >DA INTERIORS</text>
    <text
      x="6"
      y="178"
      fill="#C29D6D"
      font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
      font-weight="700"
      font-size="24"
      letter-spacing="18"
    >ARCHITECTURE &amp; LIVING</text>
  </g>
</svg>
`;

// 3. Print JPG - Crisp White Background (300 DPI 3000x1200)
const svgWhiteCardBg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" width="3000" height="1200" fill="none">
  <defs>
    <linearGradient id="gold_grad_white" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D8B583" />
      <stop offset="50%" stop-color="#C29D6D" />
      <stop offset="100%" stop-color="#A67C47" />
    </linearGradient>
  </defs>

  <rect width="1000" height="400" fill="#FFFFFF" />

  <g transform="translate(70, 100)">
    <g transform="translate(0, 0)">
      <rect
        x="0"
        y="0"
        width="200"
        height="200"
        rx="44"
        fill="#FAF8F5"
        stroke="url(#gold_grad_white)"
        stroke-width="7"
      />
      <path
        d="M45 44V156M45 44H84C114 44 134 66 134 100C134 134 114 156 84 156H45"
        fill="none"
        stroke="#1C1917"
        stroke-width="16"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M102 156L140 44L178 156"
        fill="none"
        stroke="url(#gold_grad_white)"
        stroke-width="16"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M117 122H163"
        fill="none"
        stroke="url(#gold_grad_white)"
        stroke-width="12"
        stroke-linecap="round"
      />
    </g>

    <g transform="translate(250, 0)">
      <text
        x="0"
        y="114"
        fill="#1C1917"
        font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
        font-weight="900"
        font-size="74"
        letter-spacing="14"
      >DA INTERIORS</text>
      <text
        x="6"
        y="164"
        fill="#C29D6D"
        font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
        font-weight="700"
        font-size="23"
        letter-spacing="18"
      >ARCHITECTURE &amp; LIVING</text>
    </g>
  </g>
</svg>
`;

// 4. Print JPG - Luxury Obsidian Matte Black Background (300 DPI 3000x1200)
const svgDarkCardBg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" width="3000" height="1200" fill="none">
  <defs>
    <linearGradient id="gold_grad_dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8CEAA" />
      <stop offset="50%" stop-color="#C29D6D" />
      <stop offset="100%" stop-color="#AD8553" />
    </linearGradient>
    <linearGradient id="card_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A1714" />
      <stop offset="100%" stop-color="#100E0C" />
    </linearGradient>
  </defs>

  <rect width="1000" height="400" fill="url(#card_bg)" />

  <g transform="translate(70, 100)">
    <g transform="translate(0, 0)">
      <rect
        x="0"
        y="0"
        width="200"
        height="200"
        rx="44"
        fill="#221E1A"
        stroke="url(#gold_grad_dark)"
        stroke-width="7"
      />
      <path
        d="M45 44V156M45 44H84C114 44 134 66 134 100C134 134 114 156 84 156H45"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="16"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M102 156L140 44L178 156"
        fill="none"
        stroke="url(#gold_grad_dark)"
        stroke-width="16"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M117 122H163"
        fill="none"
        stroke="url(#gold_grad_dark)"
        stroke-width="12"
        stroke-linecap="round"
      />
    </g>

    <g transform="translate(250, 0)">
      <text
        x="0"
        y="114"
        fill="#FFFFFF"
        font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
        font-weight="900"
        font-size="74"
        letter-spacing="14"
      >DA INTERIORS</text>
      <text
        x="6"
        y="164"
        fill="#C29D6D"
        font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
        font-weight="700"
        font-size="23"
        letter-spacing="18"
      >ARCHITECTURE &amp; LIVING</text>
    </g>
  </g>
</svg>
`;

// 5. Monogram Emblem Icon Only (2000x2000)
const svgEmblemSquare = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="2000" height="2000" fill="none">
  <defs>
    <linearGradient id="gold_grad_sq" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8CEAA" />
      <stop offset="50%" stop-color="#C29D6D" />
      <stop offset="100%" stop-color="#AD8553" />
    </linearGradient>
    <linearGradient id="sq_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A1714" />
      <stop offset="100%" stop-color="#100E0C" />
    </linearGradient>
  </defs>

  <rect
    x="25"
    y="25"
    width="250"
    height="250"
    rx="55"
    fill="url(#sq_bg)"
    stroke="url(#gold_grad_sq)"
    stroke-width="9"
  />
  <path
    d="M80 80V220M80 80H128C166 80 190 108 190 150C190 192 166 220 128 220H80"
    fill="none"
    stroke="#FFFFFF"
    stroke-width="20"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M152 220L198 80L244 220"
    fill="none"
    stroke="url(#gold_grad_sq)"
    stroke-width="20"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M170 178H226"
    fill="none"
    stroke="url(#gold_grad_sq)"
    stroke-width="15"
    stroke-linecap="round"
  />
</svg>
`;

// 6. Complete Visiting Card Design (Front: 2100x1200 - Standard 3.5" x 2" ratio at 300 DPI)
const svgVisitingCardFront = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1050 600" width="2100" height="1200" fill="none">
  <defs>
    <linearGradient id="card_bg_front" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1C1814" />
      <stop offset="50%" stop-color="#14110E" />
      <stop offset="100%" stop-color="#0D0B09" />
    </linearGradient>
    <linearGradient id="gold_metallic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3E2C9" />
      <stop offset="40%" stop-color="#C29D6D" />
      <stop offset="70%" stop-color="#DFCA9F" />
      <stop offset="100%" stop-color="#9E7643" />
    </linearGradient>
  </defs>

  <!-- Background with subtle luxury border -->
  <rect width="1050" height="600" fill="url(#card_bg_front)" />
  <rect x="25" y="25" width="1000" height="550" fill="none" stroke="#C29D6D" stroke-opacity="0.3" stroke-width="1.5" />

  <!-- Center Logo Lockup -->
  <g transform="translate(200, 200)">
    <!-- Badge -->
    <g transform="translate(0, 0)">
      <rect
        x="0"
        y="0"
        width="200"
        height="200"
        rx="44"
        fill="#221D18"
        stroke="url(#gold_metallic)"
        stroke-width="6"
      />
      <path
        d="M45 44V156M45 44H84C114 44 134 66 134 100C134 134 114 156 84 156H45"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="16"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M102 156L140 44L178 156"
        fill="none"
        stroke="url(#gold_metallic)"
        stroke-width="16"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M117 122H163"
        fill="none"
        stroke="url(#gold_metallic)"
        stroke-width="12"
        stroke-linecap="round"
      />
    </g>

    <!-- Typography -->
    <g transform="translate(245, 0)">
      <text
        x="0"
        y="114"
        fill="#FFFFFF"
        font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
        font-weight="900"
        font-size="64"
        letter-spacing="12"
      >DA INTERIORS</text>
      <text
        x="5"
        y="160"
        fill="#C29D6D"
        font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
        font-weight="700"
        font-size="20"
        letter-spacing="16"
      >ARCHITECTURE &amp; LIVING</text>
    </g>
  </g>
</svg>
`;

// 7. Complete Visiting Card Design (Back: 2100x1200)
const svgVisitingCardBack = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1050 600" width="2100" height="1200" fill="none">
  <defs>
    <linearGradient id="card_bg_back" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCFAF6" />
      <stop offset="100%" stop-color="#F4EFE6" />
    </linearGradient>
    <linearGradient id="gold_grad_back" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D8B583" />
      <stop offset="50%" stop-color="#C29D6D" />
      <stop offset="100%" stop-color="#A67C47" />
    </linearGradient>
  </defs>

  <rect width="1050" height="600" fill="url(#card_bg_back)" />
  <rect x="25" y="25" width="1000" height="550" fill="none" stroke="#C29D6D" stroke-opacity="0.3" stroke-width="1.5" />

  <!-- Left Header -->
  <g transform="translate(70, 90)">
    <g transform="translate(0, 0)">
      <rect
        x="0"
        y="0"
        width="80"
        height="80"
        rx="18"
        fill="#FFFFFF"
        stroke="url(#gold_grad_back)"
        stroke-width="3.5"
      />
      <path
        d="M18 18V62M18 18H34C46 18 54 27 54 40C54 53 46 62 34 62H18"
        fill="none"
        stroke="#1C1917"
        stroke-width="6.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M41 62L56 18L71 62"
        fill="none"
        stroke="url(#gold_grad_back)"
        stroke-width="6.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M47 48H65"
        fill="none"
        stroke="url(#gold_grad_back)"
        stroke-width="5"
        stroke-linecap="round"
      />
    </g>

    <g transform="translate(100, 0)">
      <text
        x="0"
        y="46"
        fill="#1C1917"
        font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
        font-weight="900"
        font-size="36"
        letter-spacing="6"
      >DA INTERIORS</text>
      <text
        x="2"
        y="72"
        fill="#C29D6D"
        font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
        font-weight="700"
        font-size="13"
        letter-spacing="8"
      >D A INTERIOR DESIGN DSID</text>
    </g>
  </g>

  <!-- Right/Center Details Grid -->
  <g transform="translate(70, 240)">
    <!-- Services Tagline -->
    <text
      x="0"
      y="0"
      fill="#736B63"
      font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
      font-size="18"
      font-weight="600"
      letter-spacing="2"
    >Bespoke Turnkey Residential &amp; Commercial Interior Architecture</text>

    <!-- Divider -->
    <line x1="0" y1="24" x2="910" y2="24" stroke="#E6DFD3" stroke-width="1.5" />

    <!-- Contact Info Columns -->
    <g transform="translate(0, 60)">
      <!-- Col 1: Phone & WhatsApp -->
      <g transform="translate(0, 0)">
        <text x="0" y="0" fill="#C29D6D" font-family="'Segoe UI', Arial" font-size="12" font-weight="700" letter-spacing="3">DIRECT CALL / WHATSAPP</text>
        <text x="0" y="32" fill="#1C1917" font-family="'Segoe UI', Arial" font-size="22" font-weight="800">+91 79036 24701</text>
        <text x="0" y="58" fill="#736B63" font-family="'Segoe UI', Arial" font-size="14" font-weight="500">Available 9:00 AM – 10:00 PM</text>
      </g>

      <!-- Col 2: Studio Address -->
      <g transform="translate(340, 0)">
        <text x="0" y="0" fill="#C29D6D" font-family="'Segoe UI', Arial" font-size="12" font-weight="700" letter-spacing="3">KOLKATA STUDIO</text>
        <text x="0" y="32" fill="#1C1917" font-family="'Segoe UI', Arial" font-size="16" font-weight="700">93/2, Topsia Rd, near Kohinoor Market</text>
        <text x="0" y="58" fill="#736B63" font-family="'Segoe UI', Arial" font-size="14" font-weight="500">Topsia, Kolkata, West Bengal 700039</text>
      </g>

      <!-- Col 3: Portfolio & Rating -->
      <g transform="translate(680, 0)">
        <text x="0" y="0" fill="#C29D6D" font-family="'Segoe UI', Arial" font-size="12" font-weight="700" letter-spacing="3">PORTFOLIO &amp; WEBSITE</text>
        <text x="0" y="32" fill="#1C1917" font-family="'Segoe UI', Arial" font-size="20" font-weight="800">dainteriors.in</text>
        <text x="0" y="58" fill="#10B981" font-family="'Segoe UI', Arial" font-size="14" font-weight="700">★ 4.9 Google Rating • 275+ Projects</text>
      </g>
    </g>
  </g>
</svg>
`;

async function renderAll() {
  console.log('Generating High-Resolution DA Interiors Branding Assets for Visiting Card Printing...');

  const tasks = [
    // 1. Transparent PNG - Dark Text (3000 x 720)
    {
      svg: svgHorizontalDark,
      name: 'da-interiors-logo-horizontal-dark.png',
      format: 'png',
      options: {}
    },
    // 2. Transparent PNG - Light Text (3000 x 720)
    {
      svg: svgHorizontalLight,
      name: 'da-interiors-logo-horizontal-white.png',
      format: 'png',
      options: {}
    },
    // 3. Pristine White Background JPG (3000 x 1200, 100% Quality, 300 DPI)
    {
      svg: svgWhiteCardBg,
      name: 'da-interiors-logo-white-card-print.jpg',
      format: 'jpeg',
      options: { quality: 100 }
    },
    // 4. Luxury Dark Background JPG (3000 x 1200, 100% Quality, 300 DPI)
    {
      svg: svgDarkCardBg,
      name: 'da-interiors-logo-dark-luxury-print.jpg',
      format: 'jpeg',
      options: { quality: 100 }
    },
    // 5. Square Emblem Icon Only (2000 x 2000)
    {
      svg: svgEmblemSquare,
      name: 'da-interiors-emblem-square-2000px.png',
      format: 'png',
      options: {}
    },
    // 6. Complete Visiting Card Front Mockup (2100 x 1200 - 300 DPI)
    {
      svg: svgVisitingCardFront,
      name: 'da-interiors-visiting-card-FRONT-300dpi.jpg',
      format: 'jpeg',
      options: { quality: 100 }
    },
    // 7. Complete Visiting Card Back Mockup (2100 x 1200 - 300 DPI)
    {
      svg: svgVisitingCardBack,
      name: 'da-interiors-visiting-card-BACK-300dpi.jpg',
      format: 'jpeg',
      options: { quality: 100 }
    },
  ];

  for (const t of tasks) {
    const buffer = Buffer.from(t.svg);
    const outPub = path.join(outputDir, t.name);
    const outDown = path.join(downloadsDir, t.name);

    if (t.format === 'png') {
      await sharp(buffer).png(t.options).toFile(outPub);
      await sharp(buffer).png(t.options).toFile(outDown);
    } else {
      await sharp(buffer).jpeg(t.options).toFile(outPub);
      await sharp(buffer).jpeg(t.options).toFile(outDown);
    }
    console.log(`✓ Rendered: ${t.name}`);
  }

  // Also write the master SVG vector files
  fs.writeFileSync(path.join(outputDir, 'da-interiors-logo-vector.svg'), svgHorizontalDark);
  fs.writeFileSync(path.join(downloadsDir, 'da-interiors-logo-vector.svg'), svgHorizontalDark);
  console.log('✓ Saved master vector: da-interiors-logo-vector.svg');

  console.log('\\nAll high-res files successfully generated in:');
  console.log(`- Public Web: ${outputDir}`);
  console.log(`- Local Downloads (Ready to Send on WhatsApp): ${downloadsDir}`);
}

renderAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
