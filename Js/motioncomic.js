// ============================================================
// ARQUIVO MORTO v8.0 — MOTION COMIC
// ============================================================
// Substitui a cutscene de pasta por quadrinhos animados.
// 4 painéis que aparecem em sequência com typewriter.
// ============================================================

let motionComicEstado = {
  ativo: false,
  painelAtual: 0,
  pulando: false,
  casoAtual: null,
  callback: null
};

// ============================================================
// DADOS DOS PAINÉIS
// ============================================================
function gerarPainéisQuadrinho(caso) {
  const lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  // Escolhe ícones baseados no caso
  let iconeLocal = '🏚️';
  if (caso.ehChefao) iconeLocal = '👑';
  else if (caso.historico) iconeLocal = '📜';
  else if (caso.gerado) iconeLocal = '🤖';

  let iconeDescoberta = '📁';
  if (caso.ehChefao) iconeDescoberta = '🗡️';
  else if (caso.historico) iconeDescoberta = '📰';

  const painéis = [
    {
      icone: iconeLocal,
      titulo: lang === 'en' ? 'THE SCENE' : 'A CENA',
      texto: lang === 'en'
        ? 'It started like any other night... but this one would be different.'
        : 'Começou como qualquer outra noite... mas esta seria diferente.'
    },
    {
      icone: iconeDescoberta,
      titulo: lang === 'en' ? 'THE DISCOVERY' : 'A DESCOBERTA',
      texto: lang === 'en'
        ? 'The evidence was there. Someone left it behind — on purpose.'
        : 'A evidência estava ali. Alguém a deixou para trás — de propósito.'
    },
    {
      icone: '🩸',
      titulo: lang === 'en' ? 'THE CRIME' : 'O CRIME',
      texto: lang === 'en'
        ? 'The victim had secrets. And someone made sure they stayed buried.'
        : 'A vítima tinha segredos. E alguém garantiu que permanecessem enterrados.'
    },
    {
      icone: '🕵️',
      titulo: lang === 'en' ? 'THE DETECTIVE' : 'O DETETIVE',
      texto: lang === 'en'
        ? 'Only one person can put the pieces together. Time to work.'
        : 'Só uma pessoa pode juntar as peças. Hora de trabalhar.'
    }
  ];

  return painéis;
}

// ============================================================
// TOCAR MOTION COMIC
// ============================================================
function tocarMotionComic(caso, callback) {
  if (!caso) {
    if (callback) callback();
    return;
  }

  // Respeita prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (callback) callback();
    return;
  }

  motionComicEstado.ativo = true;
  motionComicEstado.painelAtual = 0;
  motionComicEstado.pulando = false;
  motionComicEstado.casoAtual = caso;
  motionComicEstado.callback = callback;

  const painéis = gerarPainéisQuadrinho(caso);

  // Cria overlay
  const overlay = document.createElement('div');
  overlay.className = 'motioncomic-overlay';
  overlay.id = 'motioncomic-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Cutscene');

  const painéisHTML = painéis.map(function(p, i) {
    return '<div class="motioncomic-painel" data-painel="' + i + '" style="opacity:0">' +
      '<div class="motioncomic-painel-icone">' + p.icone + '</div>' +
      '<div class="motioncomic-painel-titulo">' + p.titulo + '</div>' +
      '<div class="motioncomic-painel-texto" data-painel-texto="' + i + '"></div>' +
    '</div>';
  }).join('');

  overlay.innerHTML =
    '<div class="motioncomic-barra-topo"></div>' +
    '<button class="motioncomic-pular" onclick="pularMotionComic()" aria-label="Skip">' +
      (window.idiomaAtual === 'en' ? 'SKIP →' : 'PULAR →') +
    '</button>' +
    '<div class="motioncomic-painéis-container">' + painéisHTML + '</div>' +
    '<div class="motioncomic-barra-base"></div>' +
    '<div class="motioncomic-progresso">' +
      painéis.map(function(p, i) {
        return '<span class="motioncomic-dot" data-dot="' + i + '"></span>';
      }).join('') +
    '</div>';

  document.body.appendChild(overlay);

  if (typeof tocarSom === 'function') tocarSom('clique');

  // Inicia animação
  setTimeout(function() {
    mostrarPainelMotion(0, painéis);
  }, 400);
}

// ============================================================
// MOSTRAR PAINEL
// ============================================================
function mostrarPainelMotion(index, painéis) {
  if (motionComicEstado.pulando) return;
  if (!motionComicEstado.ativo) return;

  const overlay = document.getElementById('motioncomic-overlay');
  if (!overlay) return;

  if (index >= painéis.length) {
    finalizarMotionComic();
    return;
  }

  motionComicEstado.painelAtual = index;

  // Atualiza dots
  overlay.querySelectorAll('.motioncomic-dot').forEach(function(dot, i) {
    dot.classList.toggle('ativo', i <= index);
  });

  const painelEl = overlay.querySelector('[data-painel="' + index + '"]');
  if (painelEl) {
    painelEl.style.opacity = '1';
    painelEl.classList.add('ativo');
  }

  // Som de virada de página
  tocarSomPagina();

  // Typewriter no texto
  const textoEl = overlay.querySelector('[data-painel-texto="' + index + '"]');
  if (textoEl) {
    textoEl.textContent = '';
    let i = 0;
    const texto = painéis[index].texto;
    const timer = setInterval(function() {
      if (motionComicEstado.pulando) {
        clearInterval(timer);
        textoEl.textContent = texto;
        return;
      }
      if (i >= texto.length) {
        clearInterval(timer);
        // Avança para o próximo painel
        setTimeout(function() {
          mostrarPainelMotion(index + 1, painéis);
        }, 1200);
        return;
      }
      textoEl.textContent += texto.charAt(i);
      i++;
    }, 35);
  }
}

// ============================================================
// FINALIZAR
// ============================================================
function finalizarMotionComic() {
  if (!motionComicEstado.ativo) return;

  const overlay = document.getElementById('motioncomic-overlay');
  if (overlay) {
    overlay.style.transition = 'opacity 0.5s';
    overlay.style.opacity = '0';
    setTimeout(function() {
      if (overlay.parentNode) overlay.remove();
    }, 500);
  }

  motionComicEstado.ativo = false;
  const cb = motionComicEstado.callback;
  motionComicEstado.callback = null;

  if (typeof tocarSom === 'function') tocarSom('acerto');

  setTimeout(function() {
    if (cb) cb();
  }, 500);
}

// ============================================================
// PULAR
// ============================================================
function pularMotionComic() {
  motionComicEstado.pulando = true;
  finalizarMotionComic();
}

// ============================================================
// SOM DE VIRADA DE PÁGINA
// ============================================================
function tocarSomPagina() {
  if (typeof initAudio === 'function') initAudio();
  if (!window.audioCtx) return;
  if (window.audioCtx.state === 'suspended') window.audioCtx.resume();

  try {
    const a = window.audioCtx.currentTime;

    // Ruído branco curto (simula virada de página)
    const bufferSize = window.audioCtx.sampleRate * 0.3;
    const buffer = window.audioCtx.createBuffer(1, bufferSize, window.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
    }

    const source = window.audioCtx.createBufferSource();
    source.buffer = buffer;

    const filtro = window.audioCtx.createBiquadFilter();
    filtro.type = 'bandpass';
    filtro.frequency.value = 2500;
    filtro.Q.value = 1.5;

    const gain = window.audioCtx.createGain();
    gain.gain.setValueAtTime(0.12, a);
    gain.gain.exponentialRampToValueAtTime(0.001, a + 0.3);

    source.connect(filtro);
    filtro.connect(gain);
    gain.connect(window.audioCtx.destination);

    source.start(a);
    source.stop(a + 0.3);
  } catch(e) {}
}

// ============================================================
// INICIALIZAR
// ============================================================
function iniciarMotionComic() {
  console.log('✓ Sistema Motion Comic carregado (v8.0)');
}

// ============================================================
// EXPORTAR
// ============================================================
window.iniciarMotionComic = iniciarMotionComic;
window.tocarMotionComic = tocarMotionComic;
window.finalizarMotionComic = finalizarMotionComic;
window.pularMotionComic = pularMotionComic;
window.gerarPainéisQuadrinho = gerarPainéisQuadrinho;