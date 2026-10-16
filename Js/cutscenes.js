// ============================================================
// ARQUIVO MORTO v7.2 — SISTEMA DE CUTSCENES (CORRIGIDO)
// ============================================================

const CONFIG_CUTSCENES = {
  duracao: 3200,
  ativa: true,
  pular: false
};

function tocarCutscenePasta(caso, callback) {
  if (!CONFIG_CUTSCENES.ativa) {
    if (callback) callback();
    return;
  }

  CONFIG_CUTSCENES.pular = false;

  const overlay = document.createElement('div');
  overlay.className = 'cutscene-overlay ativo';
  overlay.id = 'cutscene-overlay';

  let icone = '📁';
  if (caso.ehChefao) icone = '👑';
  else if (caso.gerado) icone = '🤖';
  else if (caso.id === 1) icone = '🖼️';
  else if (caso.id === 2) icone = '🎼';
  else if (caso.id === 3) icone = '📜';
  else if (caso.id === 4) icone = '🚂';

  overlay.innerHTML =
    '<div class="cutscene-pular" onclick="pularCutscene()">PULAR →</div>' +
    '<div class="pasta-cutscene">' +
      '<div class="fumaca-cutscene" id="fumaca-cutscene"></div>' +
      '<div class="faiscas-cutscene" id="faiscas-cutscene"></div>' +
      '<div class="pasta-corpo">' +
        '<div class="pasta-etiqueta">ARQUIVO MORTO #00' + caso.id + '</div>' +
      '</div>' +
      '<div class="pasta-aba"></div>' +
      '<div class="papel-cutscene">' +
        '<div class="papel-conteudo">' +
          '<div class="papel-icone">' + icone + '</div>' +
          '<div class="papel-caso-num">CASO #00' + caso.id + '</div>' +
          '<div class="papel-titulo">' + (typeof escapeHTML === 'function' ? escapeHTML(caso.titulo) : caso.titulo) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="vinheta-cutscene"></div>' +
    '</div>' +
    '<div class="cutscene-texto">ABRINDO DOSSIÊ...</div>';

  document.body.appendChild(overlay);

  tocarSomCutscene();

  setTimeout(function() {
    criarFumaca();
    criarFaiscas();
  }, 400);

  const tempoTotal = CONFIG_CUTSCENES.duracao;
  const timeout = setTimeout(function() {
    fecharCutscene(callback);
  }, tempoTotal);

  overlay._timeout = timeout;
  overlay._callback = callback;

  overlay.addEventListener('click', function(e) {
    if (e.target.classList.contains('cutscene-pular')) return;
    pularCutscene();
  });

  document.addEventListener('keydown', pularCutsceneComTecla, { once: true });
}

function pularCutscene() {
  CONFIG_CUTSCENES.pular = true;
  const overlay = document.getElementById('cutscene-overlay');
  if (!overlay) return;

  if (overlay._timeout) clearTimeout(overlay._timeout);

  overlay.style.transition = 'opacity 0.3s';
  overlay.style.opacity = '0';

  setTimeout(function() {
    if (overlay.parentNode) {
      const callback = overlay._callback;
      overlay.remove();
      if (callback) callback();
    }
  }, 300);

  if (typeof tocarSom === 'function') tocarSom('clique');
}

function pularCutsceneComTecla(e) {
  if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
    pularCutscene();
  }
}

function fecharCutscene(callback) {
  const overlay = document.getElementById('cutscene-overlay');
  if (!overlay) {
    if (callback) callback();
    return;
  }

  overlay._callback = callback;
  overlay.style.transition = 'opacity 0.5s';
  overlay.style.opacity = '0';

  setTimeout(function() {
    if (overlay.parentNode) overlay.remove();
    if (callback) callback();
  }, 500);
}

function criarFumaca() {
  const container = document.getElementById('fumaca-cutscene');
  if (!container) return;

  for (let i = 0; i < 8; i++) {
    const fumaca = document.createElement('div');
    fumaca.className = 'fumaca-particula';
    fumaca.style.left = (30 + Math.random() * 40) + '%';
    fumaca.style.bottom = '20%';
    fumaca.style.animationDelay = (Math.random() * 1.5) + 's';
    fumaca.style.animationDuration = (2 + Math.random() * 2) + 's';
    container.appendChild(fumaca);
  }
}

function criarFaiscas() {
  const container = document.getElementById('faiscas-cutscene');
  if (!container) return;

  const centroX = window.innerWidth / 2;
  const centroY = window.innerHeight / 2;

  for (let i = 0; i < 20; i++) {
    const faisca = document.createElement('div');
    faisca.className = 'faisca';
    const angulo = Math.random() * Math.PI * 2;
    const distancia = 100 + Math.random() * 150;
    const tx = Math.cos(angulo) * distancia;
    const ty = Math.sin(angulo) * distancia;
    faisca.style.left = centroX + 'px';
    faisca.style.top = centroY + 'px';
    faisca.style.setProperty('--tx', tx + 'px');
    faisca.style.setProperty('--ty', ty + 'px');
    faisca.style.animationDelay = (Math.random() * 0.3) + 's';
    container.appendChild(faisca);
  }
}

function tocarSomCutscene() {
  if (typeof initAudio === 'function') initAudio();
  if (!window.audioCtx) return;
  if (window.audioCtx.state === 'suspended') window.audioCtx.resume();

  const a = window.audioCtx.currentTime;

  const osc1 = window.audioCtx.createOscillator();
  const gain1 = window.audioCtx.createGain();
  osc1.connect(gain1);
  gain1.connect(window.audioCtx.destination);
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(120, a);
  osc1.frequency.exponentialRampToValueAtTime(40, a + 1.5);
  gain1.gain.setValueAtTime(0.15, a);
  gain1.gain.exponentialRampToValueAtTime(0.001, a + 1.5);
  osc1.start(a);
  osc1.stop(a + 1.5);

  setTimeout(function() {
    if (!window.audioCtx) return;
    const a2 = window.audioCtx.currentTime;
    const osc2 = window.audioCtx.createOscillator();
    const gain2 = window.audioCtx.createGain();
    osc2.connect(gain2);
    gain2.connect(window.audioCtx.destination);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(80, a2);
    osc2.frequency.exponentialRampToValueAtTime(200, a2 + 0.3);
    gain2.gain.setValueAtTime(0.2, a2);
    gain2.gain.exponentialRampToValueAtTime(0.001, a2 + 0.5);
    osc2.start(a2);
    osc2.stop(a2 + 0.5);
  }, 800);

  setTimeout(function() {
    if (!window.audioCtx) return;
    const a3 = window.audioCtx.currentTime;
    [600, 800, 1000].forEach(function(freq, i) {
      const osc = window.audioCtx.createOscillator();
      const gain = window.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(window.audioCtx.destination);
      osc.frequency.setValueAtTime(freq, a3 + i * 0.1);
      gain.gain.setValueAtTime(0.08, a3 + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, a3 + i * 0.1 + 0.3);
      osc.start(a3 + i * 0.1);
      osc.stop(a3 + i * 0.1 + 0.3);
    });
  }, 1200);
}

function tocarCutsceneZoom(caso, callback) {
  const overlay = document.createElement('div');
  overlay.className = 'zoom-cutscene ativo';
  overlay.id = 'zoom-cutscene';

  const svg = window.getIlustracao ? getIlustracao(caso.id) : '';

  overlay.innerHTML =
    '<div class="cutscene-pular" onclick="fecharZoomCutscene()">PULAR →</div>' +
    '<div class="zoom-conteudo">' + svg + '</div>';

  document.body.appendChild(overlay);
  tocarSomZoom();

  setTimeout(function() {
    fecharZoomCutscene(callback);
  }, 2500);

  overlay.addEventListener('click', function(e) {
    if (e.target.classList.contains('cutscene-pular')) return;
    fecharZoomCutscene(callback);
  });
}

function fecharZoomCutscene(callback) {
  const overlay = document.getElementById('zoom-cutscene');
  if (!overlay) {
    if (callback) callback();
    return;
  }

  overlay.style.transition = 'opacity 0.5s';
  overlay.style.opacity = '0';

  setTimeout(function() {
    if (overlay.parentNode) overlay.remove();
    if (callback) callback();
  }, 500);
}

function tocarSomZoom() {
  if (typeof initAudio === 'function') initAudio();
  if (!window.audioCtx) return;
  if (window.audioCtx.state === 'suspended') window.audioCtx.resume();

  const a = window.audioCtx.currentTime;
  const osc = window.audioCtx.createOscillator();
  const gain = window.audioCtx.createGain();
  osc.connect(gain);
  gain.connect(window.audioCtx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, a);
  osc.frequency.exponentialRampToValueAtTime(100, a + 2);
  gain.gain.setValueAtTime(0.1, a);
  gain.gain.exponentialRampToValueAtTime(0.001, a + 2);
  osc.start(a);
  osc.stop(a + 2);
}

function toggleCutscenes() {
  CONFIG_CUTSCENES.ativa = !CONFIG_CUTSCENES.ativa;
  try {
    localStorage.setItem('arquivoMorto_cutscenes', CONFIG_CUTSCENES.ativa ? 'true' : 'false');
  } catch(e) {}
  return CONFIG_CUTSCENES.ativa;
}

// ✅ BUG #14: respeitar prefers-reduced-motion
function iniciarCutscenes() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    CONFIG_CUTSCENES.ativa = false;
    console.log('✓ Cutscenes desativadas (prefers-reduced-motion)');
    return;
  }

  try {
    const salvo = localStorage.getItem('arquivoMorto_cutscenes');
    if (salvo === 'false') {
      CONFIG_CUTSCENES.ativa = false;
    }
  } catch(e) {}

  console.log('✓ Sistema de cutscenes carregado (v7.2)');
  console.log('  Cutscenes: ' + (CONFIG_CUTSCENES.ativa ? 'ATIVADAS' : 'DESATIVADAS'));
}

window.tocarCutscenePasta = tocarCutscenePasta;
window.tocarCutsceneZoom = tocarCutsceneZoom;
window.pularCutscene = pularCutscene;
window.fecharCutscene = fecharCutscene;
window.fecharZoomCutscene = fecharZoomCutscene;
window.toggleCutscenes = toggleCutscenes;
window.iniciarCutscenes = iniciarCutscenes;
window.CONFIG_CUTSCENES = CONFIG_CUTSCENES;

console.log('✓ Cutscenes carregadas (v7.2)');