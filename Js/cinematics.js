// ============================================================
// ARQUIVO MORTO v6.0 — CINEMATICS PREMIUM (ÁUDIO NOIR)
// ============================================================
// Novidades v6.0:
//   • Chuva em 3 camadas com modulação realista
//   • Trovões com eco convolutivo (reverb real)
//   • Trilha de sax noir sintetizada
//   • Sinos de mistério aleatórios
//   • Passos ecoando na chuva
//   • Piano melancólico de fundo
//   • Gotas pingando em metal
//   • Uivo distante na madrugada
//   • Sirene policial sutil
//   • Chiado de rádio AM entre cenas
// ============================================================

// ============================================================
// 1. CHUVA VISUAL DE FUNDO
// ============================================================
function criarChuvaIntro() {
  var fundo = document.getElementById('intro-fundo');
  if (!fundo) return;
  
  fundo.innerHTML = '<div class="relampago"></div>';
  
  for (var i = 0; i < 80; i++) {
    var gota = document.createElement('div');
    gota.className = 'chuva';
    gota.style.left = Math.random() * 100 + '%';
    gota.style.animationDuration = (0.5 + Math.random() * 0.9) + 's';
    gota.style.animationDelay = Math.random() * 2 + 's';
    gota.style.opacity = 0.25 + Math.random() * 0.5;
    gota.style.height = (80 + Math.random() * 80) + 'px';
    fundo.appendChild(gota);
  }
}

// ============================================================
// 2. ROTEIRO DAS CENAS
// ============================================================
const CENAS_INTRO = [
  { imagem: "🌧️", texto: "Chove forte naquela noite. Você dirige pela estrada vazia...", duracao: 5000 },
  { imagem: "📻", texto: "No rádio, uma notícia interrompe a música:\n\n\"...o quarto desaparecimento em três meses. A polícia ainda não tem pistas...\"", duracao: 7000 },
  { imagem: "🏚️", texto: "Você para em frente a uma casa antiga. Uma luz vermelha pisca na janela.\n\nVocê sabe o que isso significa.", duracao: 6500 },
  { imagem: "📁", texto: "Alguém deixou uma pasta na porta.\n\nEscrito à mão: \"ARQUIVO MORTO — NÃO ABRIR\"", duracao: 6000 },
  { imagem: "🔓", texto: "Você abre a pasta.\n\nDentro, dezenas de casos nunca resolvidos.\n\nCada um com uma história. Cada um com uma verdade escondida.", duracao: 7000 },
  { imagem: "🕵️", texto: "Você não é um policial.\n\nVocê não usa distintivo.\n\nMas quando a justiça falha...\n\nVocê é a última esperança.", duracao: 7000 },
  { imagem: "🔴", titulo: "ARQUIVO MORTO", texto: "Bem-vindo de volta, detetive.", duracao: 5500 }
];

// ============================================================
// 3. HISTÓRIA NARRATIVA
// ============================================================
const HISTORIA_INTRO = [
  { texto: "Meu nome não importa.\nO que importa é o que eu faço.", tempo: 4000 },
  { texto: "Fui detetive da polícia por 12 anos. Resolvi 87 casos. Prendi 42 criminosos.", tempo: 5000 },
  { texto: "Mas um caso mudou tudo.\n\nO caso da <span class='destaque'>Cidade Silenciosa</span>.\n\nNunca descobri a verdade.", tempo: 6000 },
  { texto: "Saí da corporação. Mas não parei.\n\nContinuo investigando por conta própria.\n\nE cada caso que resolvo me aproxima da verdade.", tempo: 6000 },
  { texto: "O Departamento de Casos Não Resolvidos me procurou.\n\nEles sabem quem eu sou.\n\nE eu sei o que preciso fazer.", tempo: 6000 },
  { texto: "São <span class='destaque'>54 casos</span>.\n\nCada um com uma vítima.\nCada um com uma mentira.\nCada um com uma verdade escondida.", tempo: 6000 },
  { texto: "Vou resolver todos eles.\n\nE então...\n\nEncontrarei a <span class='destaque'>Cidade Silenciosa</span>.", tempo: 5500 },
  { texto: "Vamos começar.\n\nBoa sorte, detetive.\n\nVocê vai precisar.", tempo: 5000 }
];

// ============================================================
// 4. ESTADO
// ============================================================
let cenaAtual = 0;
let introAtiva = false;
let timeoutCena = null;
let pularIntro = false;
let somIntroAtivo = false;

let audioIntro = {
  // Nós de áudio
  chuvaLeveNode: null,
  chuvaMediaNode: null,
  chuvaPesadaNode: null,
  chuvaLeveGain: null,
  chuvaMediaGain: null,
  chuvaPesadaGain: null,
  ventoNode: null,
  ventoGain: null,
  musicaGain: null,
  pianoGain: null,
  reverbNode: null,
  reverbGain: null,
  masterGain: null,
  // Timers
  trovaoTimer: null,
  musicaTimer: null,
  chuvaModTimer: null,
  sinoTimer: null,
  passosTimer: null,
  uivoTimer: null,
  sireneTimer: null,
  chiadoTimer: null,
  pianoTimer: null,
  gotasTimer: null,
  ativo: false
};

// ============================================================
// 5. ATIVAR ÁUDIO
// ============================================================
function ativarAudioIntro() {
  if (somIntroAtivo) return;
  
  if (typeof initAudio === 'function') initAudio();
  if (!window.audioCtx) return;
  
  if (window.audioCtx.state === 'suspended') window.audioCtx.resume();
  
  somIntroAtivo = true;
  console.log('🔊 Áudio da intro ativado');
  
  try {
    const osc = window.audioCtx.createOscillator();
    const gain = window.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(window.audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(660, window.audioCtx.currentTime);
    gain.gain.setValueAtTime(0.06, window.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, window.audioCtx.currentTime + 0.2);
    osc.start(window.audioCtx.currentTime);
    osc.stop(window.audioCtx.currentTime + 0.2);
  } catch(e) {}
}

// ============================================================
// 6. REVERB CONVOLUTIVO (ECO REALISTA)
// ============================================================
function criarReverb(duracao, decaimento) {
  const a = window.audioCtx;
  duracao = duracao || 4;
  decaimento = decaimento || 2.5;
  
  const taxa = a.sampleRate;
  const tamanho = taxa * duracao;
  const impulse = a.createBuffer(2, tamanho, taxa);
  
  for (let canal = 0; canal < 2; canal++) {
    const dados = impulse.getChannelData(canal);
    for (let i = 0; i < tamanho; i++) {
      // Decaimento exponencial + ruído
      dados[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / tamanho, decaimento);
    }
  }
  
  const convolver = a.createConvolver();
  convolver.buffer = impulse;
  
  const filtro = a.createBiquadFilter();
  filtro.type = 'lowpass';
  filtro.frequency.value = 2200;
  
  convolver.connect(filtro);
  return { node: convolver, filtro: filtro };
}

// ============================================================
// 7. MASTER + REVERB
// ============================================================
function criarMasterAudio() {
  const a = window.audioCtx;
  
  const master = a.createGain();
  master.gain.value = 0.0;
  master.gain.linearRampToValueAtTime(0.75, a.currentTime + 4);
  master.connect(a.destination);
  
  const reverb = criarReverb(4.5, 2.8);
  reverb.filtro.connect(master);
  
  audioIntro.masterGain = master;
  audioIntro.reverbNode = reverb.node;
  
  const reverbGain = a.createGain();
  reverbGain.gain.value = 0.35;
  reverbGain.connect(reverb.node);
  audioIntro.reverbGain = reverbGain;
}

// ============================================================
// 8. INICIAR AMBIENTE SONORO
// ============================================================
function iniciarAudioIntroAmbiente() {
  if (!window.audioCtx) {
    if (typeof initAudio === 'function') initAudio();
  }
  if (!window.audioCtx) return;
  if (window.audioCtx.state === 'suspended') window.audioCtx.resume();
  if (audioIntro.ativo) return;
  
  audioIntro.ativo = true;
  
  criarMasterAudio();
  
  // Chuva em 3 camadas
  criarChuvaLeve();
  criarChuvaMedia();
  criarChuvaPesada();
  
  // Vento
  criarVento();
  
  // Música + piano
  criarMusicaSuspense();
  criarPianoMelancolico();
  
  // Efeitos ambientes
  agendarTrovoes();
  agendarModulacaoChuva();
  agendarSinos();
  agendarPassos();
  agendarUivo();
  agendarSirene();
  agendarGotas();
  
  console.log('🌧️ Ambiente sonoro PREMIUM iniciado');
}

// ============================================================
// 9. CHUVA LEVE (fundo contínuo)
// ============================================================
function criarChuvaLeve() {
  const a = window.audioCtx;
  const bufferSize = a.sampleRate * 6;
  const buffer = a.createBuffer(1, bufferSize, a.sampleRate);
  const dados = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) dados[i] = Math.random() * 2 - 1;
  
  const chuva = a.createBufferSource();
  chuva.buffer = buffer;
  chuva.loop = true;
  
  const filtroHP = a.createBiquadFilter();
  filtroHP.type = 'highpass';
  filtroHP.frequency.value = 800;
  
  const filtroLP = a.createBiquadFilter();
  filtroLP.type = 'lowpass';
  filtroLP.frequency.value = 2500;
  filtroLP.Q.value = 0.5;
  
  const gain = a.createGain();
  gain.gain.value = 0.0;
  gain.gain.linearRampToValueAtTime(0.06, a.currentTime + 3);
  
  chuva.connect(filtroHP);
  filtroHP.connect(filtroLP);
  filtroLP.connect(gain);
  
  if (audioIntro.masterGain) gain.connect(audioIntro.masterGain);
  if (audioIntro.reverbGain) gain.connect(audioIntro.reverbGain);
  
  chuva.start();
  
  audioIntro.chuvaLeveNode = chuva;
  audioIntro.chuvaLeveGain = gain;
}

// ============================================================
// 10. CHUVA MÉDIA (corpo principal)
// ============================================================
function criarChuvaMedia() {
  const a = window.audioCtx;
  const bufferSize = a.sampleRate * 5;
  const buffer = a.createBuffer(1, bufferSize, a.sampleRate);
  const dados = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) dados[i] = Math.random() * 2 - 1;
  
  const chuva = a.createBufferSource();
  chuva.buffer = buffer;
  chuva.loop = true;
  
  const filtroHP = a.createBiquadFilter();
  filtroHP.type = 'highpass';
  filtroHP.frequency.value = 400;
  
  const filtroLP = a.createBiquadFilter();
  filtroLP.type = 'lowpass';
  filtroLP.frequency.value = 1500;
  filtroLP.Q.value = 0.7;
  
  const gain = a.createGain();
  gain.gain.value = 0.0;
  gain.gain.linearRampToValueAtTime(0.07, a.currentTime + 3.5);
  
  chuva.connect(filtroHP);
  filtroHP.connect(filtroLP);
  filtroLP.connect(gain);
  
  if (audioIntro.masterGain) gain.connect(audioIntro.masterGain);
  
  chuva.start();
  
  audioIntro.chuvaMediaNode = chuva;
  audioIntro.chuvaMediaGain = gain;
}

// ============================================================
// 11. CHUVA PESADA (impacto, grave)
// ============================================================
function criarChuvaPesada() {
  const a = window.audioCtx;
  const bufferSize = a.sampleRate * 4;
  const buffer = a.createBuffer(1, bufferSize, a.sampleRate);
  const dados = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) dados[i] = Math.random() * 2 - 1;
  
  const chuva = a.createBufferSource();
  chuva.buffer = buffer;
  chuva.loop = true;
  
  const filtroLP = a.createBiquadFilter();
  filtroLP.type = 'lowpass';
  filtroLP.frequency.value = 400;
  filtroLP.Q.value = 1.2;
  
  const gain = a.createGain();
  gain.gain.value = 0.0;
  gain.gain.linearRampToValueAtTime(0.05, a.currentTime + 4);
  
  chuva.connect(filtroLP);
  filtroLP.connect(gain);
  
  if (audioIntro.masterGain) gain.connect(audioIntro.masterGain);
  if (audioIntro.reverbGain) gain.connect(audioIntro.reverbGain);
  
  chuva.start();
  
  audioIntro.chuvaPesadaNode = chuva;
  audioIntro.chuvaPesadaGain = gain;
}

// ============================================================
// 12. VENTO
// ============================================================
function criarVento() {
  const a = window.audioCtx;
  const bufferSize = a.sampleRate * 10;
  const buffer = a.createBuffer(1, bufferSize, a.sampleRate);
  const dados = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    const t = i / a.sampleRate;
    const modulacao = 0.5 + 0.5 * Math.sin(t * 0.4) * Math.sin(t * 0.11);
    dados[i] = (Math.random() * 2 - 1) * modulacao;
  }
  
  const vento = a.createBufferSource();
  vento.buffer = buffer;
  vento.loop = true;
  
  const filtro = a.createBiquadFilter();
  filtro.type = 'lowpass';
  filtro.frequency.value = 220;
  filtro.Q.value = 0.8;
  
  const gain = a.createGain();
  gain.gain.value = 0.0;
  gain.gain.linearRampToValueAtTime(0.05, a.currentTime + 5);
  
  vento.connect(filtro);
  filtro.connect(gain);
  
  if (audioIntro.masterGain) gain.connect(audioIntro.masterGain);
  if (audioIntro.reverbGain) gain.connect(audioIntro.reverbGain);
  
  vento.start();
  
  audioIntro.ventoNode = vento;
  audioIntro.ventoGain = gain;
}

// ============================================================
// 13. MÚSICA SUSPENSE (SAX NOIR)
// ============================================================
function criarMusicaSuspense() {
  const a = window.audioCtx;
  
  const musicaGain = a.createGain();
  musicaGain.gain.value = 0.0;
  musicaGain.gain.linearRampToValueAtTime(0.07, a.currentTime + 6);
  
  if (audioIntro.masterGain) musicaGain.connect(audioIntro.masterGain);
  if (audioIntro.reverbGain) musicaGain.connect(audioIntro.reverbGain);
  
  audioIntro.musicaGain = musicaGain;
  tocarLoopMusica();
}

// ============================================================
// 14. LOOP DA MÚSICA (Am → F → Dm → E)
// ============================================================
function tocarLoopMusica() {
  if (!audioIntro.ativo || !window.audioCtx) return;
  if (!audioIntro.musicaGain) return;
  
  const a = window.audioCtx;
  const acordes = [
    { nome: 'Am', notas: [55.00, 65.41, 82.41, 110.00], dur: 5.0 },
    { nome: 'F',  notas: [43.65, 65.41, 87.31, 130.81], dur: 5.0 },
    { nome: 'Dm', notas: [73.42, 87.31, 110.00, 146.83], dur: 5.0 },
    { nome: 'E',  notas: [41.20, 61.74, 82.41, 123.47], dur: 5.0 }
  ];
  
  let tempoAtual = a.currentTime + 0.3;
  let duracaoTotal = 0;
  
  acordes.forEach(function(acorde) {
    duracaoTotal += acorde.dur;
    
    // Nota fundamental (grave)
    const oscFund = a.createOscillator();
    const gainFund = a.createGain();
    const filtroFund = a.createBiquadFilter();
    
    oscFund.type = 'sine';
    oscFund.frequency.value = acorde.notas[0];
    filtroFund.type = 'lowpass';
    filtroFund.frequency.value = 280;
    
    gainFund.gain.setValueAtTime(0.0, tempoAtual);
    gainFund.gain.linearRampToValueAtTime(1.0, tempoAtual + 1.5);
    gainFund.gain.linearRampToValueAtTime(0.7, tempoAtual + acorde.dur - 0.8);
    gainFund.gain.linearRampToValueAtTime(0.0, tempoAtual + acorde.dur);
    
    oscFund.connect(filtroFund);
    filtroFund.connect(gainFund);
    if (audioIntro.musicaGain) gainFund.connect(audioIntro.musicaGain);
    
    oscFund.start(tempoAtual);
    oscFund.stop(tempoAtual + acorde.dur);
    
    // Notas superiores (pad)
    acorde.notas.slice(1).forEach(function(freq, idx) {
      const osc = a.createOscillator();
      const gain = a.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      const offset = idx * 0.2;
      gain.gain.setValueAtTime(0.0, tempoAtual + offset);
      gain.gain.linearRampToValueAtTime(0.3, tempoAtual + 1.2 + offset);
      gain.gain.linearRampToValueAtTime(0.0, tempoAtual + acorde.dur);
      
      osc.connect(gain);
      if (audioIntro.musicaGain) gain.connect(audioIntro.musicaGain);
      
      osc.start(tempoAtual + offset);
      osc.stop(tempoAtual + acorde.dur);
    });
    
    // Tensão no acorde E
    if (acorde.nome === 'E') {
      const oscTensao = a.createOscillator();
      const gainTensao = a.createGain();
      oscTensao.type = 'sine';
      oscTensao.frequency.value = acorde.notas[0] * 1.06;
      
      gainTensao.gain.setValueAtTime(0.0, tempoAtual);
      gainTensao.gain.linearRampToValueAtTime(0.15, tempoAtual + 1.8);
      gainTensao.gain.linearRampToValueAtTime(0.0, tempoAtual + acorde.dur);
      
      oscTensao.connect(gainTensao);
      if (audioIntro.musicaGain) gainTensao.connect(audioIntro.musicaGain);
      
      oscTensao.start(tempoAtual);
      oscTensao.stop(tempoAtual + acorde.dur);
    }
    
    tempoAtual += acorde.dur;
  });
  
  audioIntro.musicaTimer = setTimeout(tocarLoopMusica, (duracaoTotal - 0.5) * 1000);
}

// ============================================================
// 15. PIANO MELANCÓLICO (notas aleatórias)
// ============================================================
function criarPianoMelancolico() {
  const a = window.audioCtx;
  
  const pianoGain = a.createGain();
  pianoGain.gain.value = 0.0;
  pianoGain.gain.linearRampToValueAtTime(0.04, a.currentTime + 8);
  
  if (audioIntro.masterGain) pianoGain.connect(audioIntro.masterGain);
  if (audioIntro.reverbGain) pianoGain.connect(audioIntro.reverbGain);
  
  audioIntro.pianoGain = pianoGain;
  
  // Notas em escala menor natural (A menor)
  const notas = [
    220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00,  // A3-G4
    440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99   // A4-G5
  ];
  
  function tocarNota() {
    if (!audioIntro.ativo || !window.audioCtx) return;
    
    const nota = notas[Math.floor(Math.random() * notas.length)];
    const agora = a.currentTime;
    const dur = 2 + Math.random() * 2;
    
    const osc = a.createOscillator();
    const gain = a.createGain();
    const filtro = a.createBiquadFilter();
    
    osc.type = 'sine';
    osc.frequency.value = nota;
    
    // Adiciona harmônica sutil (som de piano)
    const osc2 = a.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = nota * 2;
    
    filtro.type = 'lowpass';
    filtro.frequency.value = 2000;
    
    gain.gain.setValueAtTime(0.0, agora);
    gain.gain.linearRampToValueAtTime(0.4, agora + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, agora + dur);
    
    osc.connect(filtro);
    osc2.connect(filtro);
    filtro.connect(gain);
    if (audioIntro.pianoGain) gain.connect(audioIntro.pianoGain);
    
    osc.start(agora);
    osc.stop(agora + dur);
    osc2.start(agora);
    osc2.stop(agora + dur);
    
    // Próxima nota em 3-7s
    audioIntro.pianoTimer = setTimeout(tocarNota, 3000 + Math.random() * 4000);
  }
  
  setTimeout(tocarNota, 5000);
}

// ============================================================
// 16. AGENDAR TROVÕES
// ============================================================
function agendarTrovoes() {
  if (!audioIntro.ativo) return;
  
  const agendar = function() {
    if (!audioIntro.ativo) return;
    const delay = 6000 + Math.random() * 8000;
    
    audioIntro.trovaoTimer = setTimeout(function() {
      if (!audioIntro.ativo) return;
      const tipo = Math.random();
      if (tipo < 0.3) tocarTrovaoDistante();
      else if (tipo < 0.8) tocarTrovaoMedio();
      else tocarTrovaoProximo();
      agendar();
    }, delay);
  };
  
  audioIntro.trovaoTimer = setTimeout(function() {
    if (!audioIntro.ativo) return;
    tocarTrovaoMedio();
    agendar();
  }, 5000);
}

// ============================================================
// 17. TROVÃO DISTANTE (com eco longo)
// ============================================================
function tocarTrovaoDistante() {
  if (!window.audioCtx || !audioIntro.ativo) return;
  if (!audioIntro.masterGain) return;
  
  const a = window.audioCtx;
  const agora = a.currentTime;
  
  const bufferSize = a.sampleRate * 5;
  const buffer = a.createBuffer(1, bufferSize, a.sampleRate);
  const dados = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    const decaimento = Math.pow(1 - i / bufferSize, 2.5);
    dados[i] = (Math.random() * 2 - 1) * decaimento;
  }
  
  const trovao = a.createBufferSource();
  trovao.buffer = buffer;
  
  const filtro = a.createBiquadFilter();
  filtro.type = 'lowpass';
  filtro.frequency.setValueAtTime(180, agora);
  filtro.frequency.exponentialRampToValueAtTime(50, agora + 5);
  filtro.Q.value = 2;
  
  const gain = a.createGain();
  gain.gain.setValueAtTime(0.0, agora);
  gain.gain.linearRampToValueAtTime(0.15, agora + 0.4);
  gain.gain.exponentialRampToValueAtTime(0.001, agora + 5);
  
  trovao.connect(filtro);
  filtro.connect(gain);
  
  if (audioIntro.masterGain) gain.connect(audioIntro.masterGain);
  if (audioIntro.reverbGain) gain.connect(audioIntro.reverbGain);
  
  trovao.start(agora);
  trovao.stop(agora + 5);
}

// ============================================================
// 18. TROVÃO MÉDIO (com estalo + eco)
// ============================================================
function tocarTrovaoMedio() {
  if (!window.audioCtx || !audioIntro.ativo) return;
  if (!audioIntro.masterGain) return;
  
  const a = window.audioCtx;
  const agora = a.currentTime;
  
  // Estalo inicial
  tocarEstalo(agora, 0.20, 120, 30);
  
  const bufferSize = a.sampleRate * 4;
  const buffer = a.createBuffer(1, bufferSize, a.sampleRate);
  const dados = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    const decaimento = Math.pow(1 - i / bufferSize, 2);
    dados[i] = (Math.random() * 2 - 1) * decaimento;
  }
  
  const trovao = a.createBufferSource();
  trovao.buffer = buffer;
  
  const filtro = a.createBiquadFilter();
  filtro.type = 'lowpass';
  filtro.frequency.setValueAtTime(250, agora);
  filtro.frequency.exponentialRampToValueAtTime(70, agora + 4);
  filtro.Q.value = 1.5;
  
  const gain = a.createGain();
  gain.gain.setValueAtTime(0.0, agora);
  gain.gain.linearRampToValueAtTime(0.3, agora + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, agora + 4);
  
  trovao.connect(filtro);
  filtro.connect(gain);
  
  if (audioIntro.masterGain) gain.connect(audioIntro.masterGain);
  if (audioIntro.reverbGain) gain.connect(audioIntro.reverbGain);
  
  trovao.start(agora);
  trovao.stop(agora + 4);
  
  dispararRelampago(false);
  
  if (typeof window.vibrarSeguro === 'function') window.vibrarSeguro([25, 15, 50]);
  
  intensificarChuva(1.8);
}

// ============================================================
// 19. TROVÃO PRÓXIMO (com eco duplo)
// ============================================================
function tocarTrovaoProximo() {
  if (!window.audioCtx || !audioIntro.ativo) return;
  if (!audioIntro.masterGain) return;
  
  const a = window.audioCtx;
  const agora = a.currentTime;
  
  tocarEstalo(agora, 0.35, 140, 25);
  
  const bufferSize = a.sampleRate * 6;
  const buffer = a.createBuffer(1, bufferSize, a.sampleRate);
  const dados = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    const decaimento = Math.pow(1 - i / bufferSize, 1.5);
    dados[i] = (Math.random() * 2 - 1) * decaimento;
  }
  
  const trovao = a.createBufferSource();
  trovao.buffer = buffer;
  
  const filtro = a.createBiquadFilter();
  filtro.type = 'lowpass';
  filtro.frequency.setValueAtTime(320, agora + 0.1);
  filtro.frequency.exponentialRampToValueAtTime(60, agora + 6);
  filtro.Q.value = 1.8;
  
  const gain = a.createGain();
  gain.gain.setValueAtTime(0.0, agora + 0.05);
  gain.gain.linearRampToValueAtTime(0.45, agora + 0.18);
  gain.gain.exponentialRampToValueAtTime(0.001, agora + 6);
  
  trovao.connect(filtro);
  filtro.connect(gain);
  
  if (audioIntro.masterGain) gain.connect(audioIntro.masterGain);
  if (audioIntro.reverbGain) gain.connect(audioIntro.reverbGain);
  
  trovao.start(agora + 0.05);
  trovao.stop(agora + 6);
  
  // Eco 1
  setTimeout(function() {
    if (!audioIntro.ativo) return;
    const eco1 = a.createBufferSource();
    eco1.buffer = buffer;
    
    const ecoFiltro1 = a.createBiquadFilter();
    ecoFiltro1.type = 'lowpass';
    ecoFiltro1.frequency.value = 90;
    
    const ecoGain1 = a.createGain();
    ecoGain1.gain.setValueAtTime(0.0, a.currentTime);
    ecoGain1.gain.linearRampToValueAtTime(0.15, a.currentTime + 0.3);
    ecoGain1.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 3);
    
    eco1.connect(ecoFiltro1);
    ecoFiltro1.connect(ecoGain1);
    if (audioIntro.reverbGain) ecoGain1.connect(audioIntro.reverbGain);
    
    eco1.start(a.currentTime);
    eco1.stop(a.currentTime + 3);
  }, 1500);
  
  // Eco 2 (mais distante)
  setTimeout(function() {
    if (!audioIntro.ativo) return;
    const eco2 = a.createBufferSource();
    eco2.buffer = buffer;
    
    const ecoFiltro2 = a.createBiquadFilter();
    ecoFiltro2.type = 'lowpass';
    ecoFiltro2.frequency.value = 60;
    
    const ecoGain2 = a.createGain();
    ecoGain2.gain.setValueAtTime(0.0, a.currentTime);
    ecoGain2.gain.linearRampToValueAtTime(0.08, a.currentTime + 0.5);
    ecoGain2.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 3);
    
    eco2.connect(ecoFiltro2);
    ecoFiltro2.connect(ecoGain2);
    if (audioIntro.reverbGain) ecoGain2.connect(audioIntro.reverbGain);
    
    eco2.start(a.currentTime);
    eco2.stop(a.currentTime + 3);
  }, 3200);
  
  dispararRelampago(true);
  
   if (typeof window.vibrarSeguro === 'function') window.vibrarSeguro([50, 30, 80, 30, 100]);  
  intensificarChuva(2.5);
}

// ============================================================
// 20. ESTALO
// ============================================================
function tocarEstalo(agora, volume, freqInicial, freqFinal) {
  if (!window.audioCtx) return;
  if (!audioIntro.masterGain) return;
  
  const a = window.audioCtx;
  
  const osc = a.createOscillator();
  const gain = a.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(freqInicial, agora);
  osc.frequency.exponentialRampToValueAtTime(freqFinal, agora + 0.3);
  
  const filtro = a.createBiquadFilter();
  filtro.type = 'bandpass';
  filtro.frequency.value = 800;
  filtro.Q.value = 2;
  
  gain.gain.setValueAtTime(volume, agora);
  gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.4);
  
  osc.connect(filtro);
  filtro.connect(gain);
  
  if (audioIntro.masterGain) gain.connect(audioIntro.masterGain);
  
  osc.start(agora);
  osc.stop(agora + 0.4);
}

// ============================================================
// 21. FLASH VISUAL
// ============================================================
function dispararRelampago(forte) {
  const fundo = document.getElementById('intro-fundo');
  if (!fundo) return;
  
  const relampago = fundo.querySelector('.relampago');
  if (relampago) {
    relampago.style.animation = 'none';
    relampago.offsetHeight;
    relampago.style.animation = forte ? 'relampejar 0.4s' : 'relampejar 0.6s';
  }
  
  const flash = document.createElement('div');
  flash.style.cssText = 
    'position:fixed;inset:0;background:white;z-index:9999;pointer-events:none;' +
    'opacity:' + (forte ? 0.25 : 0.12) + ';transition:opacity 0.4s;';
  document.body.appendChild(flash);
  
  setTimeout(function() {
    flash.style.opacity = '0';
    setTimeout(function() { flash.remove(); }, 400);
  }, 50);
}

// ============================================================
// 22. MODULAÇÃO DA CHUVA
// ============================================================
function agendarModulacaoChuva() {
  if (!audioIntro.ativo) return;
  
  const modular = function() {
    if (!audioIntro.ativo) return;
    const delay = 4000 + Math.random() * 5000;
    
    audioIntro.chuvaModTimer = setTimeout(function() {
      if (!audioIntro.ativo) return;
      
      if (audioIntro.chuvaLeveGain && window.audioCtx) {
        const a = window.audioCtx;
        const variacao = 0.05 + Math.random() * 0.04;
        audioIntro.chuvaLeveGain.gain.cancelScheduledValues(a.currentTime);
        audioIntro.chuvaLeveGain.gain.linearRampToValueAtTime(variacao, a.currentTime + 2.5);
        
        if (audioIntro.chuvaMediaGain) {
          const varMedia = 0.06 + Math.random() * 0.03;
          audioIntro.chuvaMediaGain.gain.cancelScheduledValues(a.currentTime);
          audioIntro.chuvaMediaGain.gain.linearRampToValueAtTime(varMedia, a.currentTime + 2.5);
        }
      }
      modular();
    }, delay);
  };
  
  modular();
}

// ============================================================
// 23. INTENSIFICAR CHUVA
// ============================================================
function intensificarChuva(fator) {
  if (!window.audioCtx || !audioIntro.ativo) return;
  
  const a = window.audioCtx;
  const agora = a.currentTime;
  const f = fator || 1.5;
  
  try {
    if (audioIntro.chuvaLeveGain) {
      audioIntro.chuvaLeveGain.gain.cancelScheduledValues(agora);
      audioIntro.chuvaLeveGain.gain.linearRampToValueAtTime(0.06 * f, agora + 0.8);
      audioIntro.chuvaLeveGain.gain.linearRampToValueAtTime(0.06, agora + 4);
    }
    if (audioIntro.chuvaMediaGain) {
      audioIntro.chuvaMediaGain.gain.cancelScheduledValues(agora);
      audioIntro.chuvaMediaGain.gain.linearRampToValueAtTime(0.07 * f, agora + 0.8);
      audioIntro.chuvaMediaGain.gain.linearRampToValueAtTime(0.07, agora + 4);
    }
    if (audioIntro.chuvaPesadaGain) {
      audioIntro.chuvaPesadaGain.gain.cancelScheduledValues(agora);
      audioIntro.chuvaPesadaGain.gain.linearRampToValueAtTime(0.05 * f, agora + 0.8);
      audioIntro.chuvaPesadaGain.gain.linearRampToValueAtTime(0.05, agora + 4);
    }
  } catch(e) {}
}

// ============================================================
// 24. SINOS DE MISTÉRIO (aleatórios)
// ============================================================
function agendarSinos() {
  if (!audioIntro.ativo) return;
  
  const agendar = function() {
    if (!audioIntro.ativo) return;
    const delay = 12000 + Math.random() * 15000;
    
    audioIntro.sinoTimer = setTimeout(function() {
      if (!audioIntro.ativo) return;
      tocarSino();
      agendar();
    }, delay);
  };
  
  agendar();
}

function tocarSino() {
  if (!window.audioCtx || !audioIntro.ativo) return;
  
  const a = window.audioCtx;
  const agora = a.currentTime;
  
  // Notas de sino (dissonantes e misteriosas)
  const notas = [523.25, 587.33, 622.25, 739.99, 830.61];
  const nota = notas[Math.floor(Math.random() * notas.length)];
  
  // 3 harmônicas para simular sino
  const harmonicas = [
    { mult: 1, gain: 0.25, dur: 4.0 },
    { mult: 2.76, gain: 0.12, dur: 3.0 },
    { mult: 5.4, gain: 0.06, dur: 2.0 }
  ];
  
  harmonicas.forEach(function(h) {
    const osc = a.createOscillator();
    const gain = a.createGain();
    osc.type = 'sine';
    osc.frequency.value = nota * h.mult;
    
    gain.gain.setValueAtTime(0, agora);
    gain.gain.linearRampToValueAtTime(h.gain, agora + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, agora + h.dur);
    
    osc.connect(gain);
    if (audioIntro.masterGain) gain.connect(audioIntro.masterGain);
    if (audioIntro.reverbGain) gain.connect(audioIntro.reverbGain);
    
    osc.start(agora);
    osc.stop(agora + h.dur);
  });
}

// ============================================================
// 25. PASSOS ECOANDO NA CHUVA
// ============================================================
function agendarPassos() {
  if (!audioIntro.ativo) return;
  
  const agendar = function() {
    if (!audioIntro.ativo) return;
    const delay = 18000 + Math.random() * 20000;
    
    audioIntro.passosTimer = setTimeout(function() {
      if (!audioIntro.ativo) return;
      tocarSequenciaPassos();
      agendar();
    }, delay);
  };
  
  agendar();
}

function tocarSequenciaPassos() {
  if (!window.audioCtx || !audioIntro.ativo) return;
  
  const a = window.audioCtx;
  const passos = 4 + Math.floor(Math.random() * 4);
  const intervaloLento = 0.5;
  
  for (let i = 0; i < passos; i++) {
    setTimeout(function() {
      if (!audioIntro.ativo) return;
      const agora = a.currentTime;
      
      const osc = a.createOscillator();
      const gain = a.createGain();
      const filtro = a.createBiquadFilter();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, agora);
      osc.frequency.exponentialRampToValueAtTime(40, agora + 0.15);
      
      filtro.type = 'lowpass';
      filtro.frequency.value = 200;
      
      gain.gain.setValueAtTime(0.15, agora);
      gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.2);
      
      osc.connect(filtro);
      filtro.connect(gain);
      if (audioIntro.masterGain) gain.connect(audioIntro.masterGain);
      if (audioIntro.reverbGain) gain.connect(audioIntro.reverbGain);
      
      osc.start(agora);
      osc.stop(agora + 0.2);
    }, i * intervaloLento * 1000);
  }
}

// ============================================================
// 26. UIVO DISTANTE (madrugada)
// ============================================================
function agendarUivo() {
  if (!audioIntro.ativo) return;
  
  const agendar = function() {
    if (!audioIntro.ativo) return;
    const delay = 25000 + Math.random() * 30000;
    
    audioIntro.uivoTimer = setTimeout(function() {
      if (!audioIntro.ativo) return;
      const hora = new Date().getHours();
      // Só toca à noite/madrugada
      if (hora >= 20 || hora < 6) {
        tocarUivo();
      }
      agendar();
    }, delay);
  };
  
  agendar();
}

function tocarUivo() {
  if (!window.audioCtx || !audioIntro.ativo) return;
  
  const a = window.audioCtx;
  const agora = a.currentTime;
  const dur = 3.5;
  
  // Uivo: frequência que sobe e desce
  const osc = a.createOscillator();
  const gain = a.createGain();
  const filtro = a.createBiquadFilter();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(380, agora);
  osc.frequency.linearRampToValueAtTime(520, agora + dur * 0.4);
  osc.frequency.linearRampToValueAtTime(420, agora + dur);
  
  // Vibrato sutil
  const lfo = a.createOscillator();
  const lfoGain = a.createGain();
  lfo.frequency.value = 6;
  lfoGain.gain.value = 15;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);
  
  filtro.type = 'lowpass';
  filtro.frequency.value = 900;
  
  gain.gain.setValueAtTime(0, agora);
  gain.gain.linearRampToValueAtTime(0.08, agora + 0.8);
  gain.gain.linearRampToValueAtTime(0.06, agora + dur - 0.8);
  gain.gain.linearRampToValueAtTime(0, agora + dur);
  
  osc.connect(filtro);
  filtro.connect(gain);
  if (audioIntro.reverbGain) gain.connect(audioIntro.reverbGain);
  
  osc.start(agora);
  osc.stop(agora + dur);
  lfo.start(agora);
  lfo.stop(agora + dur);
}

// ============================================================
// 27. SIRENE POLICIAL DISTANTE (bem sutil)
// ============================================================
function agendarSirene() {
  if (!audioIntro.ativo) return;
  
  const agendar = function() {
    if (!audioIntro.ativo) return;
    const delay = 30000 + Math.random() * 40000;
    
    audioIntro.sireneTimer = setTimeout(function() {
      if (!audioIntro.ativo) return;
      tocarSireneDistante();
      agendar();
    }, delay);
  };
  
  agendar();
}

function tocarSireneDistante() {
  if (!window.audioCtx || !audioIntro.ativo) return;
  
  const a = window.audioCtx;
  const agora = a.currentTime;
  const dur = 4.0;
  
  const osc = a.createOscillator();
  const gain = a.createGain();
  const filtro = a.createBiquadFilter();
  
  osc.type = 'sine';
  // Alterna entre duas frequências (efeito de sirene)
  osc.frequency.setValueAtTime(650, agora);
  osc.frequency.setValueAtTime(880, agora + 0.5);
  osc.frequency.setValueAtTime(650, agora + 1.0);
  osc.frequency.setValueAtTime(880, agora + 1.5);
  osc.frequency.setValueAtTime(650, agora + 2.0);
  osc.frequency.setValueAtTime(880, agora + 2.5);
  osc.frequency.setValueAtTime(650, agora + 3.0);
  osc.frequency.setValueAtTime(880, agora + 3.5);
  
  filtro.type = 'lowpass';
  filtro.frequency.value = 1200;
  
  gain.gain.setValueAtTime(0, agora);
  gain.gain.linearRampToValueAtTime(0.02, agora + 1.0);
  gain.gain.linearRampToValueAtTime(0.02, agora + dur - 1.0);
  gain.gain.linearRampToValueAtTime(0, agora + dur);
  
  osc.connect(filtro);
  filtro.connect(gain);
  if (audioIntro.reverbGain) gain.connect(audioIntro.reverbGain);
  
  osc.start(agora);
  osc.stop(agora + dur);
}

// ============================================================
// 28. GOTAS PINGANDO EM METAL
// ============================================================
function agendarGotas() {
  if (!audioIntro.ativo) return;
  
  const agendar = function() {
    if (!audioIntro.ativo) return;
    const delay = 2000 + Math.random() * 4000;
    
    audioIntro.gotasTimer = setTimeout(function() {
      if (!audioIntro.ativo) return;
      tocarGota();
      agendar();
    }, delay);
  };
  
  agendar();
}

function tocarGota() {
  if (!window.audioCtx || !audioIntro.ativo) return;
  
  const a = window.audioCtx;
  const agora = a.currentTime;
  
  const osc = a.createOscillator();
  const gain = a.createGain();
  const filtro = a.createBiquadFilter();
  
  // Frequência alta para "ping" metálico
  const freq = 1800 + Math.random() * 1200;
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, agora);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.7, agora + 0.15);
  
  filtro.type = 'bandpass';
  filtro.frequency.value = freq;
  filtro.Q.value = 8;
  
  gain.gain.setValueAtTime(0.08, agora);
  gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.3);
  
  osc.connect(filtro);
  filtro.connect(gain);
  if (audioIntro.reverbGain) gain.connect(audioIntro.reverbGain);
  
  osc.start(agora);
  osc.stop(agora + 0.3);
}

// ============================================================
// 29. CHIADO DE RÁDIO AM (entre cenas)
// ============================================================
function tocarChiadoRadio() {
  if (!window.audioCtx || !audioIntro.ativo) return;
  
  const a = window.audioCtx;
  const agora = a.currentTime;
  const dur = 1.5;
  
  const bufferSize = a.sampleRate * dur;
  const buffer = a.createBuffer(1, bufferSize, a.sampleRate);
  const dados = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    dados[i] = (Math.random() * 2 - 1) * 0.5;
  }
  
  const chiado = a.createBufferSource();
  chiado.buffer = buffer;
  
  const filtro = a.createBiquadFilter();
  filtro.type = 'bandpass';
  filtro.frequency.value = 3500;
  filtro.Q.value = 0.5;
  
  const gain = a.createGain();
  gain.gain.setValueAtTime(0, agora);
  gain.gain.linearRampToValueAtTime(0.04, agora + 0.1);
  gain.gain.linearRampToValueAtTime(0.03, agora + dur - 0.3);
  gain.gain.linearRampToValueAtTime(0, agora + dur);
  
  chiado.connect(filtro);
  filtro.connect(gain);
  if (audioIntro.masterGain) gain.connect(audioIntro.masterGain);
  
  chiado.start(agora);
  chiado.stop(agora + dur);
}

// ============================================================
// 30. PARAR AMBIENTE SONORO
// ============================================================
function pararAudioIntroAmbiente() {
  if (!audioIntro.ativo) return;
  audioIntro.ativo = false;
  
  const a = window.audioCtx;
  if (!a) return;
  
  const fadeOut = a.currentTime + 2.5;
  
  try {
    if (audioIntro.chuvaLeveGain) audioIntro.chuvaLeveGain.gain.linearRampToValueAtTime(0, fadeOut);
    if (audioIntro.chuvaMediaGain) audioIntro.chuvaMediaGain.gain.linearRampToValueAtTime(0, fadeOut);
    if (audioIntro.chuvaPesadaGain) audioIntro.chuvaPesadaGain.gain.linearRampToValueAtTime(0, fadeOut);
    if (audioIntro.ventoGain) audioIntro.ventoGain.gain.linearRampToValueAtTime(0, fadeOut);
    if (audioIntro.musicaGain) audioIntro.musicaGain.gain.linearRampToValueAtTime(0, fadeOut);
    if (audioIntro.pianoGain) audioIntro.pianoGain.gain.linearRampToValueAtTime(0, fadeOut);
    if (audioIntro.masterGain) audioIntro.masterGain.gain.linearRampToValueAtTime(0, fadeOut + 1);
  } catch(e) {}
  
  setTimeout(function() {
    try {
      if (audioIntro.chuvaLeveNode) audioIntro.chuvaLeveNode.stop();
      if (audioIntro.chuvaMediaNode) audioIntro.chuvaMediaNode.stop();
      if (audioIntro.chuvaPesadaNode) audioIntro.chuvaPesadaNode.stop();
      if (audioIntro.ventoNode) audioIntro.ventoNode.stop();
    } catch(e) {}
    
    // Limpa referências
    audioIntro.chuvaLeveNode = null;
    audioIntro.chuvaMediaNode = null;
    audioIntro.chuvaPesadaNode = null;
    audioIntro.ventoNode = null;
    audioIntro.musicaGain = null;
    audioIntro.pianoGain = null;
    audioIntro.masterGain = null;
    audioIntro.reverbNode = null;
    audioIntro.reverbGain = null;
    audioIntro.chuvaLeveGain = null;
    audioIntro.chuvaMediaGain = null;
    audioIntro.chuvaPesadaGain = null;
    audioIntro.ventoGain = null;
  }, 4000);
  
  // Limpa timers
  if (audioIntro.trovaoTimer) { clearTimeout(audioIntro.trovaoTimer); audioIntro.trovaoTimer = null; }
  if (audioIntro.musicaTimer) { clearTimeout(audioIntro.musicaTimer); audioIntro.musicaTimer = null; }
  if (audioIntro.chuvaModTimer) { clearTimeout(audioIntro.chuvaModTimer); audioIntro.chuvaModTimer = null; }
  if (audioIntro.sinoTimer) { clearTimeout(audioIntro.sinoTimer); audioIntro.sinoTimer = null; }
  if (audioIntro.passosTimer) { clearTimeout(audioIntro.passosTimer); audioIntro.passosTimer = null; }
  if (audioIntro.uivoTimer) { clearTimeout(audioIntro.uivoTimer); audioIntro.uivoTimer = null; }
  if (audioIntro.sireneTimer) { clearTimeout(audioIntro.sireneTimer); audioIntro.sireneTimer = null; }
  if (audioIntro.gotasTimer) { clearTimeout(audioIntro.gotasTimer); audioIntro.gotasTimer = null; }
  if (audioIntro.pianoTimer) { clearTimeout(audioIntro.pianoTimer); audioIntro.pianoTimer = null; }
  
  console.log('🔇 Ambiente sonoro parado');
}

// ============================================================
// 31. BOTÃO DE SOM
// ============================================================
function adicionarBotaoSom() {
  const antigo = document.getElementById('btn-som-intro');
  if (antigo) antigo.remove();
  
  const btn = document.createElement('div');
  btn.id = 'btn-som-intro';
  btn.style.cssText = 
    'position:absolute;top:2rem;left:2rem;z-index:5;' +
    'background:rgba(139,26,26,0.85);color:#e8dcc4;padding:0.7rem 1.2rem;' +
    'font-family:"Courier Prime", monospace;font-size:0.8rem;' +
    'letter-spacing:2px;cursor:pointer;border:1px solid #c23b3b;' +
    'transition:all 0.3s;border-radius:4px;user-select:none;';
  btn.textContent = '🔊 ATIVAR SOM';
  
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    ativarAudioIntro();
    iniciarAudioIntroAmbiente();
    btn.textContent = '🔊 SOM ATIVO';
    btn.style.background = 'rgba(45,90,45,0.85)';
    btn.style.borderColor = '#4a8a4a';
  });
  
  const screen = document.getElementById('screen-intro');
  if (screen) screen.appendChild(btn);
  else document.body.appendChild(btn);
}

// ============================================================
// 32. INICIAR INTRO
// ============================================================
function iniciarIntro() {
  cenaAtual = 0;
  introAtiva = true;
  pularIntro = false;
  somIntroAtivo = false;
  
  const container = document.querySelector('.intro-container');
  if (container) container.innerHTML = '';
  
  mostrarTela('screen-intro');
  
  const btnVoltar = document.getElementById('btn-voltar-global');
  if (btnVoltar) btnVoltar.classList.remove('show');
  
  document.body.classList.add('modo-cinema');
  criarChuvaIntro();
  adicionarBotaoSom();
  
  document.addEventListener('click', function() {
    ativarAudioIntro();
    iniciarAudioIntroAmbiente();
  }, { once: true });
  
    // ✅ v8.1: garante que interação seja marcada ao clicar
  document.addEventListener('click', function() {
    if (typeof marcarInteracaoUsuario === 'function') marcarInteracaoUsuario();
  }, { once: true });

  document.addEventListener('keydown', function() {
    ativarAudioIntro();
    iniciarAudioIntroAmbiente();
  }, { once: true });
  
  setTimeout(proximaCena, 800);
}

// ============================================================
// 33. PRÓXIMA CENA
// ============================================================
function proximaCena() {
  if (pularIntro) return;
  
  document.querySelectorAll('.intro-cena').forEach(function(c) {
    c.classList.remove('ativa');
  });
  
  if (cenaAtual >= CENAS_INTRO.length) {
    finalizarIntro();
    return;
  }
  
  const cena = CENAS_INTRO[cenaAtual];
  let cenaEl = document.querySelector('[data-cena="' + cenaAtual + '"]');
  
  if (!cenaEl) {
    cenaEl = document.createElement('div');
    cenaEl.className = 'intro-cena';
    cenaEl.setAttribute('data-cena', cenaAtual);
    const container = document.querySelector('.intro-container');
    if (container) container.appendChild(cenaEl);
  }
  
  cenaEl.innerHTML = 
    (cena.titulo ? '<div class="intro-titulo">' + cena.titulo + '</div>' : '') +
    '<div class="intro-imagem">' + cena.imagem + '</div>' +
    '<div class="intro-texto"></div>';
  
  cenaEl.classList.add('ativa');
  
  if (somIntroAtivo) tocarSomCena(cenaAtual);
  
  // Chiado de rádio na cena do rádio
  if (cenaAtual === 1 && audioIntro.ativo) {
    setTimeout(tocarChiadoRadio, 2000);
  }
  
  const textoEl = cenaEl.querySelector('.intro-texto');
  if (!textoEl) { cenaAtual++; proximaCena(); return; }
  
  digitarTexto(textoEl, cena.texto, 40, function() {
    if (pularIntro) return;
    const tempoDigitacao = cena.texto.length * 40;
    const tempoLeituraExtra = Math.max(1800, cena.duracao - tempoDigitacao);
    
    timeoutCena = setTimeout(function() {
      cenaAtual++;
      proximaCena();
    }, tempoLeituraExtra);
  });
}

// ============================================================
// 34. DIGITAR TEXTO
// ============================================================
function digitarTexto(el, texto, velocidade, callback) {
  if (!el) { if (callback) callback(); return; }
  el.innerHTML = '';
  let i = 0;
  
  const timer = setInterval(function() {
    if (pularIntro) {
      clearInterval(timer);
      el.innerHTML = texto.replace(/\n/g, '<br>');
      if (callback) callback();
      return;
    }
    if (i >= texto.length) {
      clearInterval(timer);
      if (callback) callback();
      return;
    }
    const char = texto.charAt(i);
    el.innerHTML += char === '\n' ? '<br>' : char;
    i++;
  }, velocidade);
}

// ============================================================
// 35. FINALIZAR INTRO
// ============================================================
function finalizarIntro() {
  introAtiva = false;
  document.body.classList.remove('modo-cinema');
  pararAudioIntroAmbiente();
  
  const btn = document.getElementById('btn-som-intro');
  if (btn) btn.remove();
  
  mostrarTela('screen-menu');
}

// ============================================================
// 36. PULAR INTRO
// ============================================================
function pularTodaIntro() {
  pularIntro = true;
  if (timeoutCena) clearTimeout(timeoutCena);
  setTimeout(finalizarIntro, 300);
}

// ============================================================
// 37. HISTÓRIA NARRATIVA
// ============================================================
function iniciarHistoria() {
  mostrarTela('screen-historia');
  document.body.classList.add('modo-cinema');
  
  document.addEventListener('click', function() {
    ativarAudioIntro();
    if (!audioIntro.ativo) iniciarAudioIntroAmbiente();
  }, { once: true });
  
  const textoEl = document.getElementById('historia-texto');
  const btn = document.getElementById('btn-historia-continuar');
  if (btn) btn.style.display = 'none';
  
  let parte = 0;
  const textoCompleto = HISTORIA_INTRO.map(function(p) { return p.texto; });
  
  function mostrarParte() {
    if (parte >= textoCompleto.length) {
      document.body.classList.remove('modo-cinema');
      pararAudioIntroAmbiente();
      if (btn) {
        btn.style.display = 'inline-block';
        btn.textContent = 'COMEÇAR INVESTIGAÇÃO →';
      }
      return;
    }
    
    const texto = textoCompleto[parte];
    textoEl.innerHTML = '';
    
    if (texto.indexOf('<') !== -1) {
      textoEl.innerHTML = texto.replace(/\n/g, '<br>');
      setTimeout(function() {
        parte++;
        mostrarParte();
      }, HISTORIA_INTRO[parte - 1].tempo || 3000);
    } else {
      let i = 0;
      const timer = setInterval(function() {
        if (i < texto.length) {
          textoEl.innerHTML += texto.charAt(i) === '\n' ? '<br>' : texto.charAt(i);
          i++;
        } else {
          clearInterval(timer);
          setTimeout(function() {
            parte++;
            mostrarParte();
          }, 1200);
        }
      }, 35);
    }
  }
  
  mostrarParte();
}

// ============================================================
// 38. TRANSIÇÃO
// ============================================================
function transicaoCena(callback) {
  const trans = document.querySelector('.cena-transicao');
  if (!trans) { if (callback) callback(); return; }
  trans.classList.add('ativa');
  setTimeout(function() {
    if (callback) callback();
    setTimeout(function() { trans.classList.remove('ativa'); }, 200);
  }, 500);
}

// ============================================================
// 39. SOM DAS CENAS
// ============================================================
function tocarSomCena(index) {
  if (!window.audioCtx) return;
  if (window.audioCtx.state === 'suspended') window.audioCtx.resume();
  
  const a = window.audioCtx;
  const osc = a.createOscillator();
  const gain = a.createGain();
  
  osc.connect(gain);
  
  if (audioIntro.masterGain) gain.connect(audioIntro.masterGain);
  else gain.connect(a.destination);
  
  osc.type = 'triangle';
  const freq = 280 + index * 50;
  osc.frequency.setValueAtTime(freq, a.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.6, a.currentTime + 0.8);
  
  gain.gain.setValueAtTime(0.15, a.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 0.9);
  
  osc.start(a.currentTime);
  osc.stop(a.currentTime + 0.9);
}

// ============================================================
// 40. CINEMATIC INICIAL
// ============================================================
function iniciarCinematicInicial() {
  const jaViu = localStorage.getItem('arquivoMorto_viuIntro');
  if (!jaViu) {
    localStorage.setItem('arquivoMorto_viuIntro', 'true');
    setTimeout(iniciarIntro, 500);
  }
}

// ============================================================
// EXPORTAR GLOBAL
// ============================================================
window.iniciarIntro = iniciarIntro;
window.iniciarHistoria = iniciarHistoria;
window.pularTodaIntro = pularTodaIntro;
window.transicaoCena = transicaoCena;
window.iniciarCinematicInicial = iniciarCinematicInicial;
window.ativarAudioIntro = ativarAudioIntro;
window.iniciarAudioIntroAmbiente = iniciarAudioIntroAmbiente;
window.pararAudioIntroAmbiente = pararAudioIntroAmbiente;
window.criarChuvaIntro = criarChuvaIntro;
window.audioIntro = audioIntro;

console.log('✓ Cinematics v6.0 PREMIUM carregadas');
console.log('  🌧️ Chuva em 3 camadas · ⛈️ Trovões com eco duplo');
console.log('  🎷 Sax noir · 🎹 Piano melancólico · 🔔 Sinos');
console.log('  🚶 Passos · 🐺 Uivo · 🚨 Sirene · 💧 Gotas · 📻 Chiado');