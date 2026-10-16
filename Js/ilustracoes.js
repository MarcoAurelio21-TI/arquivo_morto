// ============================================================
// ARQUIVO MORTO v5.1 — ILUSTRAÇÕES SVG (CORRIGIDO)
// ============================================================

// ===== BANCO DE ILUSTRAÇÕES MANUAIS (mantém as 9 originais) =====
const ILUSTRACOES = {
  1: {
    titulo: "Galeria Vazia",
    svg: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-chao-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#2a1a1a"/><stop offset="100%" stop-color="#0a0505"/>
          </linearGradient>
          <radialGradient id="luz-1" cx="50%" cy="20%" r="60%">
            <stop offset="0%" stop-color="rgba(255,220,150,0.4)"/><stop offset="100%" stop-color="rgba(255,220,150,0)"/>
          </radialGradient>
        </defs>
        <rect width="800" height="400" fill="#0a0505"/>
        <rect x="100" y="50" width="600" height="250" fill="#1a0f0f"/>
        <rect x="100" y="50" width="600" height="250" fill="url(#luz-1)"/>
        <g stroke="#3a2a1a" stroke-width="2" fill="#0a0505">
          <rect x="150" y="100" width="80" height="100"/><rect x="260" y="100" width="80" height="100"/>
          <rect x="460" y="100" width="80" height="100"/><rect x="570" y="100" width="80" height="100"/>
        </g>
        <rect x="360" y="100" width="80" height="100" fill="#1a0505" stroke="#8b1a1a" stroke-width="3"/>
        <path d="M 0 300 L 800 300 L 800 400 L 0 400 Z" fill="url(#grad-chao-1)"/>
        <g transform="translate(400, 30)">
          <line x1="0" y1="-30" x2="0" y2="0" stroke="#3a2a1a" stroke-width="1"/>
          <ellipse cx="0" cy="5" rx="30" ry="8" fill="#3a2a1a" opacity="0.6"/>
          <circle cx="0" cy="5" r="3" fill="#ffcc66" opacity="0.8"><animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite"/></circle>
        </g>
        <ellipse cx="620" cy="360" rx="40" ry="4" fill="#000" opacity="0.5"/>
        <path d="M 600 360 L 610 300 Q 620 280 630 300 L 640 360 Z" fill="#0a0a0a" opacity="0.7"/>
        <circle cx="620" cy="275" r="15" fill="#0a0a0a" opacity="0.7"/>
      </svg>
    `
  },
  2: {
    titulo: "Teatro Municipal",
    svg: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="luz-palco-2" cx="50%" cy="0%" r="70%">
            <stop offset="0%" stop-color="rgba(255,240,200,0.5)"/><stop offset="100%" stop-color="rgba(255,240,200,0)"/>
          </radialGradient>
        </defs>
        <rect width="800" height="400" fill="#0a0505"/>
        <path d="M 0 0 L 200 0 L 200 400 L 0 400 Z" fill="#3a0a0a"/>
        <path d="M 600 0 L 800 0 L 800 400 L 600 400 Z" fill="#3a0a0a"/>
        <g stroke="#5a0a0a" stroke-width="1" opacity="0.6">
          <line x1="40" y1="0" x2="40" y2="400"/><line x1="80" y1="0" x2="80" y2="400"/>
          <line x1="120" y1="0" x2="120" y2="400"/><line x1="160" y1="0" x2="160" y2="400"/>
          <line x1="640" y1="0" x2="640" y2="400"/><line x1="680" y1="0" x2="680" y2="400"/>
          <line x1="720" y1="0" x2="720" y2="400"/><line x1="760" y1="0" x2="760" y2="400"/>
        </g>
        <rect x="200" y="50" width="400" height="300" fill="url(#luz-palco-2)"/>
        <path d="M 150 350 L 650 350 L 800 400 L 0 400 Z" fill="#1a0f0f"/>
        <g transform="translate(400, 260)">
          <ellipse cx="0" cy="40" rx="90" ry="20" fill="#1a0505"/>
          <path d="M -90 40 Q -100 -20 -60 -40 L 60 -40 Q 100 -20 90 40 Z" fill="#0a0a0a" stroke="#3a2a1a" stroke-width="1"/>
          <rect x="-30" y="-50" width="60" height="10" fill="#1a0a0a"/>
          <circle cx="0" cy="5" r="3" fill="#ffcc66" opacity="0.6"/>
        </g>
        <g transform="translate(320, 340) rotate(-15)">
          <rect width="50" height="60" fill="#e8dcc4" opacity="0.85"/>
          <line x1="5" y1="15" x2="45" y2="15" stroke="#1a1410" stroke-width="0.8"/>
          <line x1="5" y1="25" x2="45" y2="25" stroke="#1a1410" stroke-width="0.8"/>
          <line x1="5" y1="35" x2="45" y2="35" stroke="#1a1410" stroke-width="0.8"/>
          <line x1="5" y1="45" x2="35" y2="45" stroke="#1a1410" stroke-width="0.8"/>
        </g>
      </svg>
    `
  },
  3: {
    titulo: "Biblioteca Trancada",
    svg: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="luz-vela-3" cx="30%" cy="60%" r="40%">
            <stop offset="0%" stop-color="rgba(255,180,80,0.5)"/><stop offset="100%" stop-color="rgba(255,180,80,0)"/>
          </radialGradient>
        </defs>
        <rect width="800" height="400" fill="#0a0505"/>
        <rect x="50" y="50" width="180" height="280" fill="#1a0f05" stroke="#3a2a1a" stroke-width="1"/>
        <rect x="570" y="50" width="180" height="280" fill="#1a0f05" stroke="#3a2a1a" stroke-width="1"/>
        <g stroke="#3a2a1a" stroke-width="1">
          <line x1="50" y1="110" x2="230" y2="110"/><line x1="50" y1="170" x2="230" y2="170"/>
          <line x1="50" y1="230" x2="230" y2="230"/><line x1="50" y1="290" x2="230" y2="290"/>
          <line x1="570" y1="110" x2="750" y2="110"/><line x1="570" y1="170" x2="750" y2="170"/>
          <line x1="570" y1="230" x2="750" y2="230"/><line x1="570" y1="290" x2="750" y2="290"/>
        </g>
        <g opacity="0.7">
          <rect x="55" y="80" width="8" height="28" fill="#8b1a1a"/><rect x="65" y="75" width="6" height="33" fill="#3a5a3a"/>
          <rect x="73" y="82" width="7" height="26" fill="#5a3a1a"/><rect x="82" y="78" width="9" height="30" fill="#3a1a3a"/>
          <rect x="93" y="80" width="6" height="28" fill="#8b6a1a"/>
          <rect x="575" y="80" width="8" height="28" fill="#3a1a1a"/><rect x="585" y="75" width="6" height="33" fill="#1a3a5a"/>
          <rect x="593" y="82" width="7" height="26" fill="#5a1a1a"/>
        </g>
        <g transform="translate(400, 280)">
          <rect x="-80" y="-10" width="160" height="15" fill="#3a2a1a"/>
          <rect x="-70" y="5" width="10" height="60" fill="#2a1a0a"/>
          <rect x="60" y="5" width="10" height="60" fill="#2a1a0a"/>
        </g>
        <g transform="translate(400, 180)">
          <rect x="-35" y="-35" width="70" height="70" fill="#1a1a1a" stroke="#3a3a3a" stroke-width="2"/>
          <circle cx="0" cy="0" r="8" fill="#0a0a0a" stroke="#5a5a5a" stroke-width="1"/>
          <circle cx="0" cy="0" r="3" fill="#8b1a1a"/>
        </g>
        <g transform="translate(320, 250)">
          <rect x="-3" y="0" width="6" height="20" fill="#e8dcc4"/>
          <ellipse cx="0" cy="-3" rx="3" ry="5" fill="#ffcc66"><animate attributeName="ry" values="5;6;5" dur="0.5s" repeatCount="indefinite"/></ellipse>
          <ellipse cx="0" cy="-3" rx="15" ry="20" fill="url(#luz-vela-3)"/>
        </g>
        <path d="M 0 350 L 800 350 L 800 400 L 0 400 Z" fill="#1a0f05"/>
        <ellipse cx="400" cy="380" rx="200" ry="15" fill="#3a1a1a" opacity="0.6"/>
      </svg>
    `
  },
  4: {
    titulo: "Expresso da Meia-Noite",
    svg: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ceu-noite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0a0a2a"/><stop offset="100%" stop-color="#1a1a3a"/>
          </linearGradient>
        </defs>
        <rect width="800" height="400" fill="url(#ceu-noite)"/>
        <g fill="#fff" opacity="0.7">
          <circle cx="80" cy="40" r="1.5"><animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite"/></circle>
          <circle cx="200" cy="70" r="1"/><circle cx="350" cy="30" r="1.5"/>
          <circle cx="500" cy="55" r="1"/><circle cx="650" cy="35" r="1.5"/>
          <circle cx="720" cy="80" r="1"/><circle cx="150" cy="100" r="1"/><circle cx="600" cy="110" r="1"/>
        </g>
        <circle cx="680" cy="70" r="25" fill="#e8dcc4" opacity="0.9"/>
        <circle cx="690" cy="65" r="25" fill="url(#ceu-noite)"/>
        <g stroke="#3a3a3a" stroke-width="2">
          <line x1="0" y1="330" x2="800" y2="330"/><line x1="0" y1="345" x2="800" y2="345"/>
        </g>
        <g transform="translate(200, 200)">
          <rect x="0" y="0" width="400" height="120" fill="#1a0a0a" stroke="#3a2a2a" stroke-width="2"/>
          <rect x="0" y="40" width="400" height="8" fill="#8b1a1a"/>
          <rect x="30" y="15" width="60" height="60" fill="#3a2a1a" stroke="#5a4a3a" stroke-width="1"/>
          <rect x="110" y="15" width="60" height="60" fill="#3a2a1a" stroke="#5a4a3a" stroke-width="1"/>
          <rect x="190" y="15" width="60" height="60" fill="#ffcc66" opacity="0.8" stroke="#5a4a3a" stroke-width="1">
            <animate attributeName="opacity" values="0.8;0.5;0.8" dur="4s" repeatCount="indefinite"/>
          </rect>
          <rect x="270" y="15" width="60" height="60" fill="#3a2a1a" stroke="#5a4a3a" stroke-width="1"/>
          <rect x="330" y="15" width="50" height="60" fill="#3a2a1a" stroke="#5a4a3a" stroke-width="1"/>
          <path d="M 210 60 L 215 30 Q 220 25 225 30 L 230 60 Z" fill="#0a0a0a"/>
          <circle cx="220" cy="28" r="5" fill="#0a0a0a"/>
          <rect x="0" y="100" width="400" height="15" fill="#0a0a0a"/>
          <circle cx="60" cy="125" r="12" fill="#0a0a0a" stroke="#3a3a3a" stroke-width="2"/>
          <circle cx="180" cy="125" r="12" fill="#0a0a0a" stroke="#3a3a3a" stroke-width="2"/>
          <circle cx="300" cy="125" r="12" fill="#0a0a0a" stroke="#3a3a3a" stroke-width="2"/>
          <circle cx="400" cy="125" r="12" fill="#0a0a0a" stroke="#3a3a3a" stroke-width="2"/>
        </g>
        <rect x="0" y="360" width="800" height="40" fill="#0a0505"/>
      </svg>
    `
  },
  1001: {
    titulo: "Leilão de Elite",
    svg: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="luz-leilao" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stop-color="rgba(255,215,120,0.4)"/><stop offset="100%" stop-color="rgba(255,215,120,0)"/>
          </radialGradient>
        </defs>
        <rect width="800" height="400" fill="#0a0505"/>
        <rect x="200" y="50" width="400" height="250" fill="#1a0f05" stroke="#5a3a1a" stroke-width="2"/>
        <rect x="200" y="50" width="400" height="250" fill="url(#luz-leilao)"/>
        <g transform="translate(400, 200)">
          <rect x="-30" y="0" width="60" height="80" fill="#3a2a1a"/>
          <rect x="-40" y="-10" width="80" height="15" fill="#5a3a1a"/>
          <rect x="-5" y="-15" width="10" height="10" fill="#1a0a0a"/>
        </g>
        <g transform="translate(400, 130)">
          <rect x="-30" y="0" width="60" height="20" fill="#5a3a1a"/>
          <rect x="-5" y="20" width="10" height="40" fill="#3a2a1a"/>
        </g>
        <g transform="translate(200, 280)">
          <rect x="0" y="0" width="30" height="40" fill="#e8dcc4" transform="rotate(-10 15 20)" stroke="#1a1410"/>
          <text x="15" y="25" fill="#8b1a1a" font-size="14" text-anchor="middle" transform="rotate(-10 15 20)">A</text>
        </g>
        <g transform="translate(240, 290)">
          <rect x="0" y="0" width="30" height="40" fill="#e8dcc4" transform="rotate(5 15 20)" stroke="#1a1410"/>
          <text x="15" y="25" fill="#8b1a1a" font-size="14" text-anchor="middle" transform="rotate(5 15 20)">♠</text>
        </g>
        <g transform="translate(540, 295)">
          <rect x="0" y="0" width="30" height="40" fill="#e8dcc4" transform="rotate(-5 15 20)" stroke="#1a1410"/>
          <text x="15" y="25" fill="#8b1a1a" font-size="14" text-anchor="middle" transform="rotate(-5 15 20)">K</text>
        </g>
        <g transform="translate(650, 100)">
          <circle cx="0" cy="0" r="40" fill="#1a0a0a" stroke="#8b1a1a" stroke-width="2"/>
          <circle cx="0" cy="0" r="35" fill="none" stroke="#3a2a1a" stroke-width="1"/>
          <text x="0" y="8" fill="#c23b3b" font-size="18" text-anchor="middle" font-family="monospace" font-weight="bold">47s</text>
        </g>
        <path d="M 0 300 L 800 300 L 800 400 L 0 400 Z" fill="#0a0505"/>
      </svg>
    `
  },
  1002: {
    titulo: "A Teia da Aranha",
    svg: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="400" fill="#0a0505"/>
        <g stroke="#3a2a2a" stroke-width="1" fill="none" opacity="0.7">
          <g transform="translate(400, 200)">
            <line x1="0" y1="0" x2="0" y2="-180"/><line x1="0" y1="0" x2="150" y2="-100"/>
            <line x1="0" y1="0" x2="180" y2="0"/><line x1="0" y1="0" x2="150" y2="100"/>
            <line x1="0" y1="0" x2="0" y2="180"/><line x1="0" y1="0" x2="-150" y2="100"/>
            <line x1="0" y1="0" x2="-180" y2="0"/><line x1="0" y1="0" x2="-150" y2="-100"/>
            <circle cx="0" cy="0" r="30" stroke="#5a3a3a"/><circle cx="0" cy="0" r="60" stroke="#4a2a2a"/>
            <circle cx="0" cy="0" r="90" stroke="#3a1a1a"/><circle cx="0" cy="0" r="120" stroke="#2a0a0a"/>
            <circle cx="0" cy="0" r="150" stroke="#1a0505"/>
          </g>
        </g>
        <g transform="translate(400, 200)">
          <ellipse cx="0" cy="0" rx="12" ry="15" fill="#1a0a0a" stroke="#8b1a1a" stroke-width="1"/>
          <circle cx="0" cy="-10" r="6" fill="#1a0a0a" stroke="#8b1a1a" stroke-width="1"/>
          <circle cx="-3" cy="-12" r="1.2" fill="#c23b3b"/><circle cx="3" cy="-12" r="1.2" fill="#c23b3b"/>
          <g stroke="#1a0a0a" stroke-width="1.5" fill="none">
            <path d="M -8 -3 Q -25 -15 -35 -5"/><path d="M -8 2 Q -25 5 -35 15"/>
            <path d="M -6 6 Q -20 20 -30 30"/><path d="M -4 8 Q -12 28 -15 40"/>
            <path d="M 8 -3 Q 25 -15 35 -5"/><path d="M 8 2 Q 25 5 35 15"/>
            <path d="M 6 6 Q 20 20 30 30"/><path d="M 4 8 Q 12 28 15 40"/>
          </g>
        </g>
        <circle cx="400" cy="200" r="200" fill="#8b1a1a" opacity="0.05"/>
      </svg>
    `
  },
  1003: {
    titulo: "O Camaleão",
    svg: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ceu-camaleao" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1a1a2a"/><stop offset="100%" stop-color="#0a0505"/>
          </linearGradient>
        </defs>
        <rect width="800" height="400" fill="url(#ceu-camaleao)"/>
        <g opacity="0.3" fill="#1a1a2a">
          <rect x="20" y="180" width="40" height="220"/><rect x="70" y="150" width="50" height="250"/>
          <rect x="130" y="200" width="30" height="200"/><rect x="170" y="170" width="60" height="230"/>
          <rect x="240" y="220" width="40" height="180"/><rect x="290" y="160" width="50" height="240"/>
          <rect x="350" y="190" width="30" height="210"/><rect x="390" y="140" width="70" height="260"/>
          <rect x="470" y="200" width="40" height="200"/><rect x="520" y="170" width="55" height="230"/>
          <rect x="585" y="210" width="35" height="190"/><rect x="630" y="160" width="60" height="240"/>
          <rect x="700" y="190" width="40" height="210"/><rect x="750" y="150" width="40" height="250"/>
        </g>
        <g transform="translate(400, 150)">
          <ellipse cx="0" cy="0" rx="60" ry="30" fill="#0a0505" stroke="#8b1a1a" stroke-width="2"/>
          <ellipse cx="0" cy="0" rx="40" ry="20" fill="#3a0a0a"/>
          <circle cx="0" cy="0" r="12" fill="#c23b3b"/>
          <circle cx="0" cy="0" r="5" fill="#0a0505"/>
          <circle cx="3" cy="0" r="3" fill="#e8dcc4" opacity="0.5">
            <animate attributeName="cx" values="3;5;3;-3;3" dur="8s" repeatCount="indefinite"/>
          </circle>
        </g>
        <rect x="0" y="380" width="800" height="20" fill="#0a0505"/>
      </svg>
    `
  },
  1004: {
    titulo: "O Sindicato",
    svg: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="400" fill="#0a0505"/>
        <rect x="100" y="50" width="600" height="300" fill="#1a0a0a"/>
        <g stroke="#3a1a1a" stroke-width="1">
          <line x1="100" y1="100" x2="700" y2="100"/><line x1="100" y1="150" x2="700" y2="150"/>
          <line x1="100" y1="200" x2="700" y2="200"/><line x1="100" y1="250" x2="700" y2="250"/>
          <line x1="100" y1="300" x2="700" y2="300"/>
        </g>
        <g transform="translate(400, 200)">
          <rect x="-160" y="-120" width="320" height="240" fill="#0a0a0a" stroke="#3a3a3a" stroke-width="4"/>
          <rect x="-150" y="-110" width="300" height="220" fill="#1a1a1a" stroke="#2a2a2a" stroke-width="2"/>
          <g fill="#0a0a0a" stroke="#5a3a3a" stroke-width="1">
            <rect x="-130" y="-90" width="40" height="60"/><rect x="-80" y="-90" width="40" height="60"/>
            <rect x="-30" y="-90" width="40" height="60"/><rect x="20" y="-90" width="40" height="60"/>
            <rect x="70" y="-90" width="40" height="60"/>
            <rect x="-130" y="-20" width="40" height="60"/><rect x="-80" y="-20" width="40" height="60"/>
            <rect x="-30" y="-20" width="40" height="60"/><rect x="20" y="-20" width="40" height="60"/>
            <rect x="70" y="-20" width="40" height="60"/>
            <rect x="-130" y="50" width="40" height="60"/><rect x="-80" y="50" width="40" height="60"/>
            <rect x="-30" y="50" width="40" height="60"/><rect x="20" y="50" width="40" height="60"/>
            <rect x="70" y="50" width="40" height="60"/>
          </g>
          <circle cx="0" cy="0" r="50" fill="#1a1a1a" stroke="#5a3a3a" stroke-width="3"/>
          <circle cx="0" cy="0" r="40" fill="#0a0a0a" stroke="#8b1a1a" stroke-width="2"/>
          <g stroke="#8b1a1a" stroke-width="2">
            <line x1="0" y1="-35" x2="0" y2="35"/><line x1="-35" y1="0" x2="35" y2="0"/>
            <line x1="-25" y1="-25" x2="25" y2="25"/><line x1="-25" y1="25" x2="25" y2="-25"/>
          </g>
          <circle cx="0" cy="0" r="8" fill="#8b1a1a"/>
          <circle cx="0" cy="0" r="3" fill="#c23b3b">
            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
          </circle>
        </g>
        <rect x="0" y="350" width="800" height="50" fill="#0a0505"/>
      </svg>
    `
  },
  1005: {
    titulo: "O CÉREBRO",
    svg: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-final" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#3a0a0a"/><stop offset="100%" stop-color="#0a0505"/>
          </radialGradient>
          <radialGradient id="cerebro-luz" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="rgba(194,59,59,0.5)"/><stop offset="100%" stop-color="rgba(194,59,59,0)"/>
          </radialGradient>
        </defs>
        <rect width="800" height="400" fill="url(#grad-final)"/>
        <ellipse cx="400" cy="200" rx="250" ry="180" fill="url(#cerebro-luz)"/>
        <g transform="translate(400, 200)">
          <path d="M 0 0 Q -20 -60 -60 -70 Q -100 -75 -120 -50 Q -140 -30 -130 0 Q -145 20 -130 50 Q -110 70 -80 60 Q -60 80 -30 60 Q -10 40 0 0 Z" fill="#1a0a0a" stroke="#8b1a1a" stroke-width="2"/>
          <path d="M 0 0 Q 20 -60 60 -70 Q 100 -75 120 -50 Q 140 -30 130 0 Q 145 20 130 50 Q 110 70 80 60 Q 60 80 30 60 Q 10 40 0 0 Z" fill="#1a0a0a" stroke="#8b1a1a" stroke-width="2"/>
          <line x1="0" y1="-65" x2="0" y2="55" stroke="#c23b3b" stroke-width="1.5" opacity="0.6"/>
          <g stroke="#c23b3b" stroke-width="0.5" fill="none" opacity="0.7">
            <path d="M -40 -30 Q -20 -10 -10 5"/><path d="M -60 -10 Q -30 0 -15 15"/>
            <path d="M -50 30 Q -25 25 -10 30"/><path d="M -80 10 Q -40 5 -20 20"/>
            <path d="M 40 -30 Q 20 -10 10 5"/><path d="M 60 -10 Q 30 0 15 15"/>
            <path d="M 50 30 Q 25 25 10 30"/><path d="M 80 10 Q 40 5 20 20"/>
          </g>
          <g>
            <circle cx="-40" cy="-30" r="3" fill="#c23b3b"><animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/></circle>
            <circle cx="-60" cy="-10" r="2" fill="#c23b3b"><animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite"/></circle>
            <circle cx="-50" cy="30" r="3" fill="#c23b3b"><animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite"/></circle>
            <circle cx="40" cy="-30" r="3" fill="#c23b3b"><animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/></circle>
            <circle cx="60" cy="-10" r="2" fill="#c23b3b"><animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite"/></circle>
            <circle cx="50" cy="30" r="3" fill="#c23b3b"><animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite"/></circle>
          </g>
        </g>
        <g transform="translate(400, 350)" fill="#c23b3b" opacity="0.6" font-family="monospace" font-size="12" text-anchor="middle">
          <text>2 · 3 · 5 · 7 · 11 · 13 · 17 · 19 · 23</text>
        </g>
        <rect width="800" height="400" fill="url(#grad-final)" opacity="0.3"/>
      </svg>
    `
  }
};

// ===== DETECTOR DE TIPO DE CENÁRIO =====
// Analisa título e premissa para escolher o template procedural
function detectarTipoCenario(caso) {
  var texto = ((caso.titulo || '') + ' ' + (caso.premissa || '') + ' ' + (caso.resumo || '')).toLowerCase();

  if (/biblioteca|livro|manuscrito|acervo/.test(texto)) return 'biblioteca';
  if (/teatro|palco|ópera|opera|concerto|música|musica|sinfonia/.test(texto)) return 'teatro';
  if (/trem|estação|estacao|vagão|vagao|trilho|expresso/.test(texto)) return 'trem';
  if (/museu|galeria|quadro|pintura|exposição|exposicao|arte/.test(texto)) return 'galeria';
  if (/mansão|mansao|casa|residência|residencia|vila|castelo/.test(texto)) return 'mansao';
  if (/laboratório|laboratorio|cientista|química|quimica|fórmula|formula/.test(texto)) return 'laboratorio';
  if (/hotel|quarto|suite|hóspede|hospede/.test(texto)) return 'hotel';
  if (/restaurante|cozinha|chef|jantar|banquete/.test(texto)) return 'restaurante';
  if (/cemitério|cemiterio|túmulo|tumulo|cova|capela/.test(texto)) return 'cemiterio';
  if (/navio|barco|iate|mar|porto/.test(texto)) return 'navio';
  if (/hospital|clínica|clinica|médico|medico|cirurgia/.test(texto)) return 'hospital';
  if (/escola|universidade|faculdade|colégio|colegio|professor/.test(texto)) return 'escola';
  if (/escritório|escritorio|empresa|corporativo|advogado/.test(texto)) return 'escritorio';
  if (/jardim|botânico|botanico|floresta|parque/.test(texto)) return 'jardim';
  if (/castelo|fortaleza|palácio|palacio|reino|rei|rainha/.test(texto)) return 'castelo';

  return 'generico';
}

// ===== GERADOR DE SVG POR TEMPLATE =====
function gerarSVGPorTemplate(tipo) {
  var templates = {
    biblioteca: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="400" fill="#0a0505"/>
        <g stroke="#3a2a1a" stroke-width="2" fill="#1a0f05">
          <rect x="40" y="40" width="200" height="300"/><rect x="280" y="40" width="200" height="300"/>
          <rect x="520" y="40" width="200" height="300"/>
        </g>
        <g stroke="#5a3a1a" stroke-width="1">
          <line x1="40" y1="100" x2="240" y2="100"/><line x1="40" y1="160" x2="240" y2="160"/><line x1="40" y1="220" x2="240" y2="220"/><line x1="40" y1="280" x2="240" y2="280"/>
          <line x1="280" y1="100" x2="480" y2="100"/><line x1="280" y1="160" x2="480" y2="160"/><line x1="280" y1="220" x2="480" y2="220"/><line x1="280" y1="280" x2="480" y2="280"/>
          <line x1="520" y1="100" x2="720" y2="100"/><line x1="520" y1="160" x2="720" y2="160"/><line x1="520" y1="220" x2="720" y2="220"/><line x1="520" y1="280" x2="720" y2="280"/>
        </g>
        <g opacity="0.85">
          <rect x="50" y="70" width="8" height="28" fill="#8b1a1a"/><rect x="60" y="65" width="6" height="33" fill="#3a5a3a"/>
          <rect x="70" y="72" width="7" height="26" fill="#5a3a1a"/><rect x="80" y="68" width="9" height="30" fill="#3a1a3a"/>
          <rect x="290" y="70" width="8" height="28" fill="#3a1a1a"/><rect x="300" y="65" width="6" height="33" fill="#1a3a5a"/>
          <rect x="530" y="70" width="8" height="28" fill="#5a3a1a"/><rect x="540" y="65" width="6" height="33" fill="#8b6a1a"/>
        </g>
        <ellipse cx="400" cy="370" rx="180" ry="20" fill="#1a0505" opacity="0.6"/>
        <g transform="translate(400, 330)">
          <rect x="-60" y="-15" width="120" height="30" fill="#3a2a1a" stroke="#5a3a1a" stroke-width="1"/>
          <circle cx="0" cy="0" r="8" fill="#ffcc66" opacity="0.4"/>
        </g>
      </svg>
    `,
    teatro: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="luz-palco" cx="50%" cy="0%" r="70%">
            <stop offset="0%" stop-color="rgba(255,240,200,0.5)"/><stop offset="100%" stop-color="rgba(255,240,200,0)"/>
          </radialGradient>
        </defs>
        <rect width="800" height="400" fill="#0a0505"/>
        <path d="M 0 0 L 180 0 L 180 400 L 0 400 Z" fill="#3a0a0a"/>
        <path d="M 620 0 L 800 0 L 800 400 L 620 400 Z" fill="#3a0a0a"/>
        <rect x="180" y="40" width="440" height="320" fill="url(#luz-palco)"/>
        <path d="M 120 360 L 680 360 L 800 400 L 0 400 Z" fill="#1a0f0f"/>
        <g transform="translate(400, 250)">
          <ellipse cx="0" cy="40" rx="100" ry="20" fill="#1a0505"/>
          <path d="M -100 40 Q -110 -25 -65 -50 L 65 -50 Q 110 -25 100 40 Z" fill="#0a0a0a" stroke="#3a2a1a" stroke-width="1"/>
          <rect x="-35" y="-60" width="70" height="12" fill="#1a0a0a"/>
        </g>
      </svg>
    `,
    trem: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ceu-noite-trem" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0a0a2a"/><stop offset="100%" stop-color="#1a1a3a"/>
          </linearGradient>
        </defs>
        <rect width="800" height="400" fill="url(#ceu-noite-trem)"/>
        <g fill="#fff" opacity="0.6">
          <circle cx="80" cy="40" r="1.5"/><circle cx="200" cy="70" r="1"/><circle cx="350" cy="30" r="1.5"/>
          <circle cx="500" cy="55" r="1"/><circle cx="650" cy="35" r="1.5"/><circle cx="720" cy="80" r="1"/>
        </g>
        <circle cx="680" cy="70" r="25" fill="#e8dcc4" opacity="0.9"/>
        <g stroke="#3a3a3a" stroke-width="2">
          <line x1="0" y1="330" x2="800" y2="330"/><line x1="0" y1="345" x2="800" y2="345"/>
        </g>
        <g transform="translate(150, 200)">
          <rect x="0" y="0" width="500" height="120" fill="#1a0a0a" stroke="#3a2a2a" stroke-width="2"/>
          <rect x="0" y="40" width="500" height="8" fill="#8b1a1a"/>
          <rect x="30" y="15" width="60" height="60" fill="#3a2a1a" stroke="#5a4a3a"/>
          <rect x="120" y="15" width="60" height="60" fill="#ffcc66" opacity="0.8" stroke="#5a4a3a">
            <animate attributeName="opacity" values="0.8;0.5;0.8" dur="4s" repeatCount="indefinite"/>
          </rect>
          <rect x="210" y="15" width="60" height="60" fill="#3a2a1a" stroke="#5a4a3a"/>
          <rect x="300" y="15" width="60" height="60" fill="#3a2a1a" stroke="#5a4a3a"/>
          <rect x="390" y="15" width="80" height="60" fill="#3a2a1a" stroke="#5a4a3a"/>
          <path d="M 140 60 L 145 30 Q 150 25 155 30 L 160 60 Z" fill="#0a0a0a"/>
          <circle cx="150" cy="28" r="5" fill="#0a0a0a"/>
          <circle cx="80" cy="125" r="12" fill="#0a0a0a" stroke="#3a3a3a" stroke-width="2"/>
          <circle cx="220" cy="125" r="12" fill="#0a0a0a" stroke="#3a3a3a" stroke-width="2"/>
          <circle cx="360" cy="125" r="12" fill="#0a0a0a" stroke="#3a3a3a" stroke-width="2"/>
          <circle cx="480" cy="125" r="12" fill="#0a0a0a" stroke="#3a3a3a" stroke-width="2"/>
        </g>
        <rect x="0" y="360" width="800" height="40" fill="#0a0505"/>
      </svg>
    `,
    galeria: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="luz-galeria" cx="50%" cy="20%" r="60%">
            <stop offset="0%" stop-color="rgba(255,220,150,0.4)"/><stop offset="100%" stop-color="rgba(255,220,150,0)"/>
          </radialGradient>
        </defs>
        <rect width="800" height="400" fill="#0a0505"/>
        <rect x="60" y="40" width="680" height="280" fill="#1a0f0f"/>
        <rect x="60" y="40" width="680" height="280" fill="url(#luz-galeria)"/>
        <g stroke="#5a3a1a" stroke-width="3" fill="#0a0505">
          <rect x="100" y="80" width="120" height="160"/><rect x="250" y="80" width="120" height="160"/>
          <rect x="430" y="80" width="120" height="160"/><rect x="580" y="80" width="120" height="160"/>
        </g>
        <g fill="#3a1a1a">
          <rect x="105" y="85" width="110" height="150"/><rect x="255" y="85" width="110" height="150"/>
          <rect x="435" y="85" width="110" height="150"/>
        </g>
        <rect x="585" y="85" width="110" height="150" fill="#1a0505" stroke="#8b1a1a" stroke-width="2"/>
        <path d="M 0 320 L 800 320 L 800 400 L 0 400 Z" fill="#2a1a1a"/>
        <ellipse cx="400" cy="380" rx="300" ry="15" fill="#1a0505" opacity="0.8"/>
      </svg>
    `,
    mansao: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="400" fill="#0a0505"/>
        <rect x="100" y="100" width="600" height="250" fill="#1a0f05" stroke="#3a2a1a" stroke-width="2"/>
        <path d="M 80 100 L 400 40 L 720 100 Z" fill="#2a1a0a" stroke="#3a2a1a" stroke-width="2"/>
        <g stroke="#3a2a1a" stroke-width="1">
          <line x1="100" y1="180" x2="700" y2="180"/><line x1="100" y1="260" x2="700" y2="260"/>
        </g>
        <g fill="#ffcc66" opacity="0.6">
          <rect x="150" y="140" width="30" height="40"/><rect x="250" y="140" width="30" height="40"/>
          <rect x="520" y="140" width="30" height="40"/><rect x="620" y="140" width="30" height="40"/>
        </g>
        <rect x="350" y="270" width="100" height="80" fill="#0a0505" stroke="#5a3a1a" stroke-width="2"/>
        <path d="M 0 350 L 800 350 L 800 400 L 0 400 Z" fill="#0a0505"/>
      </svg>
    `,
    laboratorio: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="luz-lab" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="rgba(120,255,150,0.3)"/><stop offset="100%" stop-color="rgba(120,255,150,0)"/>
          </radialGradient>
        </defs>
        <rect width="800" height="400" fill="#0a0505"/>
        <rect x="100" y="50" width="600" height="300" fill="#0a1a0a"/>
        <rect x="100" y="50" width="600" height="300" fill="url(#luz-lab)"/>
        <g stroke="#3a5a3a" stroke-width="1">
          <line x1="100" y1="120" x2="700" y2="120"/><line x1="100" y1="200" x2="700" y2="200"/>
        </g>
        <g transform="translate(200, 180)">
          <rect x="-30" y="-60" width="60" height="120" fill="#1a2a1a" stroke="#5a8a5a" stroke-width="1"/>
          <rect x="-25" y="-50" width="50" height="100" fill="#4a8a5a" opacity="0.5"/>
        </g>
        <g transform="translate(400, 180)">
          <rect x="-30" y="-60" width="60" height="120" fill="#1a2a1a" stroke="#5a8a5a" stroke-width="1"/>
          <rect x="-25" y="-20" width="50" height="70" fill="#8a5a4a" opacity="0.5"/>
        </g>
        <g transform="translate(600, 180)">
          <rect x="-30" y="-60" width="60" height="120" fill="#1a2a1a" stroke="#5a8a5a" stroke-width="1"/>
          <rect x="-25" y="-40" width="50" height="90" fill="#4a5a8a" opacity="0.5"/>
        </g>
        <g transform="translate(400, 320)">
          <circle cx="0" cy="0" r="30" fill="#1a0a0a" stroke="#c23b3b" stroke-width="2"/>
          <circle cx="0" cy="0" r="20" fill="#3a0a0a"/>
          <circle cx="0" cy="0" r="8" fill="#c23b3b" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.5s" repeatCount="indefinite"/>
          </circle>
        </g>
      </svg>
    `,
    hotel: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="400" fill="#0a0505"/>
        <rect x="50" y="50" width="700" height="300" fill="#1a0f05"/>
        <g stroke="#3a2a1a" stroke-width="1">
          <line x1="50" y1="120" x2="750" y2="120"/><line x1="50" y1="200" x2="750" y2="200"/>
          <line x1="50" y1="280" x2="750" y2="280"/>
        </g>
        <g fill="#3a2a1a" stroke="#5a3a1a" stroke-width="1">
          <rect x="100" y="70" width="80" height="40"/><rect x="200" y="70" width="80" height="40"/>
          <rect x="300" y="70" width="80" height="40"/><rect x="400" y="70" width="80" height="40"/>
          <rect x="500" y="70" width="80" height="40"/><rect x="600" y="70" width="80" height="40"/>
        </g>
        <rect x="400" y="220" width="120" height="180" fill="#0a0505" stroke="#8b1a1a" stroke-width="2"/>
        <circle cx="500" cy="310" r="4" fill="#ffcc66"/>
        <g transform="translate(200, 260)">
          <rect x="0" y="0" width="100" height="60" fill="#3a1a1a" stroke="#5a3a1a" stroke-width="1"/>
          <ellipse cx="50" cy="5" rx="40" ry="8" fill="#5a2a1a"/>
        </g>
      </svg>
    `,
    restaurante: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="400" fill="#0a0505"/>
        <rect x="50" y="50" width="700" height="250" fill="#1a0f05"/>
        <g transform="translate(400, 200)">
          <ellipse cx="0" cy="40" rx="200" ry="30" fill="#3a2a1a"/>
          <rect x="-150" y="-30" width="300" height="80" fill="#2a1a0a" stroke="#3a2a1a"/>
          <circle cx="0" cy="-30" r="30" fill="#5a3a1a" stroke="#3a2a1a" stroke-width="2"/>
          <ellipse cx="0" cy="-30" rx="18" ry="10" fill="#8b6a3a"/>
          <g>
            <circle cx="-80" cy="-60" r="8" fill="#e8dcc4"/>
            <circle cx="0" cy="-60" r="8" fill="#e8dcc4"/>
            <circle cx="80" cy="-60" r="8" fill="#e8dcc4"/>
          </g>
        </g>
        <rect x="0" y="350" width="800" height="50" fill="#0a0505"/>
      </svg>
    `,
    cemiterio: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ceu-cem" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1a1a2a"/><stop offset="100%" stop-color="#0a0505"/>
          </linearGradient>
        </defs>
        <rect width="800" height="400" fill="url(#ceu-cem)"/>
        <g fill="#2a1a1a" stroke="#3a2a1a" stroke-width="1">
          <rect x="100" y="180" width="40" height="80"/>
          <rect x="200" y="150" width="50" height="110"/>
          <rect x="320" y="200" width="35" height="60"/>
          <rect x="420" y="170" width="45" height="90"/>
          <rect x="540" y="160" width="55" height="100"/>
          <rect x="660" y="190" width="40" height="70"/>
        </g>
        <g stroke="#5a3a1a" stroke-width="2" fill="none">
          <path d="M 120 180 L 120 140 L 130 130 L 140 140 L 140 180"/>
          <path d="M 220 150 L 220 110 L 235 100 L 250 110 L 250 150"/>
          <path d="M 440 170 L 440 130 L 455 120 L 470 130 L 470 170"/>
          <path d="M 560 160 L 560 120 L 575 110 L 590 120 L 590 160"/>
        </g>
        <rect x="0" y="260" width="800" height="140" fill="#1a0f05"/>
        <ellipse cx="400" cy="300" rx="400" ry="20" fill="#0a0505" opacity="0.6"/>
      </svg>
    `,
    navio: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ceu-mar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0a0a2a"/><stop offset="100%" stop-color="#1a1a3a"/>
          </linearGradient>
        </defs>
        <rect width="800" height="400" fill="url(#ceu-mar)"/>
        <circle cx="680" cy="70" r="30" fill="#e8dcc4" opacity="0.9"/>
        <g fill="#fff" opacity="0.6">
          <circle cx="100" cy="50" r="1.5"/><circle cx="250" cy="80" r="1"/><circle cx="450" cy="40" r="1.5"/>
        </g>
        <path d="M 0 280 Q 200 260 400 280 Q 600 300 800 280 L 800 400 L 0 400 Z" fill="#0a1a2a"/>
        <g transform="translate(400, 200)">
          <path d="M -200 60 L 200 60 L 180 100 L -180 100 Z" fill="#1a0a0a" stroke="#3a2a2a" stroke-width="2"/>
          <rect x="-160" y="-40" width="320" height="100" fill="#1a0a0a" stroke="#3a2a2a" stroke-width="2"/>
          <rect x="-160" y="0" width="320" height="6" fill="#8b1a1a"/>
          <g fill="#ffcc66" opacity="0.7">
            <rect x="-140" y="-30" width="40" height="25"/><rect x="-80" y="-30" width="40" height="25"/>
            <rect x="0" y="-30" width="40" height="25"/><rect x="80" y="-30" width="40" height="25"/>
          </g>
          <line x1="0" y1="-40" x2="0" y2="-100" stroke="#5a3a1a" stroke-width="3"/>
          <path d="M 0 -100 L 30 -80 L 0 -60 Z" fill="#e8dcc4" opacity="0.7"/>
        </g>
      </svg>
    `,
    hospital: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="400" fill="#0a0505"/>
        <rect x="50" y="50" width="700" height="300" fill="#e8f4f4" opacity="0.1"/>
        <rect x="50" y="50" width="700" height="300" fill="none" stroke="#3a5a5a" stroke-width="2"/>
        <g transform="translate(400, 200)">
          <rect x="-200" y="-40" width="400" height="100" fill="#1a0a0a" stroke="#3a5a5a" stroke-width="2"/>
          <rect x="-180" y="-30" width="80" height="80" fill="#2a1a1a"/>
          <rect x="-80" y="-30" width="80" height="80" fill="#2a1a1a"/>
          <rect x="20" y="-30" width="80" height="80" fill="#2a1a1a"/>
          <rect x="120" y="-30" width="80" height="80" fill="#2a1a1a"/>
          <circle cx="-140" cy="10" r="15" fill="#c23b3b" opacity="0.8"/>
          <circle cx="0" cy="10" r="15" fill="#c23b3b" opacity="0.8"/>
          <circle cx="160" cy="10" r="15" fill="#c23b3b" opacity="0.8"/>
        </g>
        <g transform="translate(400, 320)" fill="#5a8a5a" opacity="0.6">
          <text font-size="20" text-anchor="middle" font-family="monospace">+ + +</text>
        </g>
      </svg>
    `,
    escola: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="400" fill="#0a0505"/>
        <rect x="80" y="60" width="640" height="280" fill="#1a0f05" stroke="#3a2a1a" stroke-width="2"/>
        <g stroke="#3a2a1a" stroke-width="1">
          <line x1="80" y1="140" x2="720" y2="140"/><line x1="80" y1="220" x2="720" y2="220"/>
        </g>
        <g transform="translate(400, 200)">
          <rect x="-200" y="-20" width="400" height="60" fill="#2a1a0a" stroke="#3a2a1a"/>
          <rect x="-180" y="-10" width="60" height="40" fill="#1a0505"/>
          <rect x="-100" y="-10" width="60" height="40" fill="#1a0505"/>
          <rect x="100" y="-10" width="60" height="40" fill="#1a0505"/>
          <rect x="180" y="-10" width="20" height="40" fill="#1a0505"/>
        </g>
        <g fill="#3a2a1a" opacity="0.5">
          <rect x="140" y="160" width="30" height="40"/>
          <rect x="220" y="160" width="30" height="40"/>
          <rect x="540" y="160" width="30" height="40"/>
          <rect x="620" y="160" width="30" height="40"/>
        </g>
      </svg>
    `,
    escritorio: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="400" fill="#0a0505"/>
        <rect x="80" y="60" width="640" height="280" fill="#0f0f1a" stroke="#3a3a5a" stroke-width="2"/>
        <g stroke="#2a2a4a" stroke-width="1">
          <line x1="80" y1="140" x2="720" y2="140"/><line x1="80" y1="220" x2="720" y2="220"/>
        </g>
        <g transform="translate(400, 240)">
          <rect x="-180" y="-30" width="360" height="80" fill="#1a1a2a" stroke="#3a3a5a"/>
          <rect x="-100" y="-60" width="200" height="30" fill="#0a0a1a" stroke="#3a3a5a"/>
          <rect x="-90" y="-55" width="180" height="20" fill="#3a5a8a" opacity="0.6"/>
        </g>
        <g transform="translate(180, 200)">
          <rect x="-30" y="-40" width="60" height="80" fill="#1a1a2a" stroke="#3a3a5a"/>
          <circle cx="0" cy="0" r="15" fill="#3a5a8a" opacity="0.6"/>
        </g>
      </svg>
    `,
    jardim: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="luz-jardim" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stop-color="rgba(200,255,200,0.3)"/><stop offset="100%" stop-color="rgba(200,255,200,0)"/>
          </radialGradient>
        </defs>
        <rect width="800" height="400" fill="#0a0505"/>
        <rect x="0" y="0" width="800" height="300" fill="url(#luz-jardim)"/>
        <g fill="#1a2a1a" stroke="#2a4a2a" stroke-width="1">
          <path d="M 100 300 Q 80 200 120 150 Q 140 100 100 60 Q 150 100 140 160 Q 180 220 120 300 Z"/>
          <path d="M 300 300 Q 280 220 320 170 Q 340 120 300 80 Q 350 120 340 180 Q 380 240 320 300 Z"/>
          <path d="M 500 300 Q 480 220 520 170 Q 540 120 500 80 Q 550 120 540 180 Q 580 240 520 300 Z"/>
          <path d="M 700 300 Q 680 220 720 170 Q 740 120 700 80 Q 750 120 740 180 Q 780 240 720 300 Z"/>
        </g>
        <g fill="#3a5a3a">
          <circle cx="120" cy="200" r="25"/><circle cx="320" cy="220" r="30"/>
          <circle cx="520" cy="220" r="30"/><circle cx="720" cy="200" r="25"/>
        </g>
        <g fill="#8b1a1a" opacity="0.7">
          <circle cx="120" cy="195" r="8"/><circle cx="320" cy="215" r="10"/>
          <circle cx="520" cy="215" r="10"/><circle cx="720" cy="195" r="8"/>
        </g>
        <rect x="0" y="300" width="800" height="100" fill="#1a0f05"/>
        <ellipse cx="400" cy="350" rx="300" ry="20" fill="#2a1a0a" opacity="0.5"/>
      </svg>
    `,
    castelo: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ceu-castelo" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1a1a2a"/><stop offset="100%" stop-color="#0a0505"/>
          </linearGradient>
        </defs>
        <rect width="800" height="400" fill="url(#ceu-castelo)"/>
        <g fill="#1a0f05" stroke="#3a2a1a" stroke-width="2">
          <rect x="200" y="150" width="400" height="200"/>
          <rect x="180" y="120" width="60" height="230"/>
          <rect x="560" y="120" width="60" height="230"/>
          <rect x="350" y="80" width="100" height="270"/>
        </g>
        <g fill="#2a1a0a">
          <rect x="180" y="100" width="15" height="30"/><rect x="205" y="100" width="15" height="30"/><rect x="230" y="100" width="15" height="30"/>
          <rect x="555" y="100" width="15" height="30"/><rect x="580" y="100" width="15" height="30"/><rect x="605" y="100" width="15" height="30"/>
          <rect x="350" y="60" width="15" height="30"/><rect x="375" y="60" width="15" height="30"/>
          <rect x="400" y="60" width="15" height="30"/><rect x="425" y="60" width="15" height="30"/>
        </g>
        <g fill="#ffcc66" opacity="0.6">
          <rect x="230" y="180" width="20" height="30"/><rect x="250" y="180" width="20" height="30"/>
          <rect x="530" y="180" width="20" height="30"/><rect x="550" y="180" width="20" height="30"/>
          <rect x="380" y="150" width="20" height="30"/><rect x="400" y="150" width="20" height="30"/>
        </g>
        <rect x="380" y="270" width="40" height="80" fill="#0a0505" stroke="#5a3a1a"/>
        <rect x="0" y="350" width="800" height="50" fill="#0a0505"/>
      </svg>
    `,
    generico: `
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="generica-luz" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="rgba(139,26,26,0.3)"/><stop offset="100%" stop-color="rgba(139,26,26,0)"/>
          </radialGradient>
        </defs>
        <rect width="800" height="400" fill="#0a0505"/>
        <ellipse cx="400" cy="200" rx="300" ry="150" fill="url(#generica-luz)"/>
        <g transform="translate(400, 200)">
          <circle cx="0" cy="0" r="60" fill="none" stroke="#8b1a1a" stroke-width="4"/>
          <circle cx="0" cy="0" r="55" fill="#1a0a0a" opacity="0.5"/>
          <line x1="40" y1="40" x2="90" y2="90" stroke="#8b1a1a" stroke-width="6" stroke-linecap="round"/>
          <circle cx="-15" cy="-15" r="15" fill="#c23b3b" opacity="0.3"/>
        </g>
        <text x="400" y="340" fill="#8b1a1a" font-family="Special Elite, serif" font-size="16" text-anchor="middle" opacity="0.6" letter-spacing="8">
          CASO ARQUIVADO
        </text>
      </svg>
    `
  };

  return templates[tipo] || templates.generico;
}

// ===== OBTER ILUSTRAÇÃO =====
function getIlustracao(casoId) {
  // 1. Tenta manual
  if (ILUSTRACOES[casoId]) {
    return ILUSTRACOES[casoId].svg;
  }

  // 2. Tenta procedural por tipo de cenário
  if (typeof getCasoPorId === 'function') {
    var caso = getCasoPorId(casoId);
    if (caso) {
      var tipo = detectarTipoCenario(caso);
      return gerarSVGPorTemplate(tipo);
    }
  }

  // 3. Fallback genérico
  return gerarSVGPorTemplate('generico');
}

// ===== RENDERIZAR =====
function renderIlustracaoCaso(casoId) {
  const svg = getIlustracao(casoId);
  return `
    <div class="ilustracao-caso" id="ilustracao-caso">
      <div class="ilustracao-header">
        <span class="ilustracao-label">📸 CENA DO CRIME</span>
      </div>
      <div class="ilustracao-svg-wrapper">
        ${svg}
      </div>
    </div>
  `;
}

// ===== EXPORTAR =====
window.ILUSTRACOES = ILUSTRACOES;
window.getIlustracao = getIlustracao;
window.renderIlustracaoCaso = renderIlustracaoCaso;
window.detectarTipoCenario = detectarTipoCenario;
window.gerarSVGPorTemplate = gerarSVGPorTemplate;

console.log('✓ Ilustrações carregadas (v5.1 — procedural)');
console.log('  ' + Object.keys(ILUSTRACOES).length + ' manuais + 15 templates procedurais');