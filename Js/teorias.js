// ============================================================
// ARQUIVO MORTO v8.0 — SISTEMA DE TEORIAS (DEDUÇÃO ATIVA)
// ============================================================
// O jogador arrasta evidências para suspeitos para construir
// teorias. 3 conexões corretas = bônus de +200 pts.
// ============================================================

let teoriasEstado = {
  ativo: false,
  casoId: null,
  conexoes: {},           // { evidenciaIdx: suspeitoIdx }
  conexoesCorretas: 0,
  jaValidou: false
};

// ============================================================
// ABRIR OVERLAY DE TEORIAS
// ============================================================
function abrirTeorias(caso) {
  if (!caso) return;

  teoriasEstado.ativo = true;
  teoriasEstado.casoId = caso.id;
  teoriasEstado.conexoes = {};
  teoriasEstado.conexoesCorretas = 0;
  teoriasEstado.jaValidou = false;

  // Restaura teorias salvas (se houver)
  try {
    const salvo = localStorage.getItem('arquivoMorto_teorias_' + caso.id);
    if (salvo) {
      const parsed = JSON.parse(salvo);
      teoriasEstado.conexoes = parsed.conexoes || {};
    }
  } catch(e) {}

  renderizarOverlayTeorias(caso);

  if (typeof tocarSom === 'function') tocarSom('clique');
}

// ============================================================
// RENDERIZAR OVERLAY
// ============================================================
function renderizarOverlayTeorias(caso) {
  const antigo = document.getElementById('teorias-overlay');
  if (antigo) antigo.remove();

  const overlay = document.createElement('div');
  overlay.className = 'teorias-overlay';
  overlay.id = 'teorias-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Construir teoria');

  const lang = window.idiomaAtual === 'en' ? 'en' : 'pt';
  const evidencias = caso.evidencias || [];
  const suspeitos = caso.suspeitos || [];

  const txt = {
    titulo: lang === 'en' ? '🧩 BUILD YOUR THEORY' : '🧩 CONSTRUIR TEORIA',
    sub: lang === 'en' ? 'Drag evidence onto suspects to incriminate them.' : 'Arraste evidências até os suspeitos para incriminá-los.',
    evidLabel: lang === 'en' ? '📋 EVIDENCE' : '📋 EVIDÊNCIAS',
    suspLabel: lang === 'en' ? '👤 SUSPECTS' : '👤 SUSPEITOS',
    contador: lang === 'en' ? 'Connections' : 'Conexões',
    botaoValidar: lang === 'en' ? '🔍 TEST THEORY' : '🔍 TESTAR TEORIA',
    botaoFechar: lang === 'en' ? 'CLOSE' : 'FECHAR',
    botaoLimpar: lang === 'en' ? 'CLEAR' : 'LIMPAR',
    dica: lang === 'en' ? 'Connect 3 correct evidences to the culprit' : 'Conecte 3 evidências corretas ao culpado'
  };

  let evidenciasHTML = evidencias.map(function(ev, i) {
    const conectada = teoriasEstado.conexoes[i] !== undefined;
    return '<div class="teoria-evidencia ' + (conectada ? 'conectada' : '') + '" ' +
      'data-evidencia="' + i + '" ' +
      'draggable="true" ' +
      'role="button" ' +
      'tabindex="0">' +
      '<span class="teoria-icone">🔍</span>' +
      '<span class="teoria-texto">' + (typeof escapeHTML === 'function' ? escapeHTML(ev) : ev) + '</span>' +
      (conectada ? '<span class="teoria-conectada-badge">✓ → ' + suspeitos[teoriasEstado.conexoes[i]].nome + '</span>' : '') +
    '</div>';
  }).join('');

  let suspeitosHTML = suspeitos.map(function(s, i) {
    const conectadoPor = Object.keys(teoriasEstado.conexoes).filter(function(k) {
      return teoriasEstado.conexoes[k] === i;
    });
    const destaque = conectadoPor.length > 0;
    return '<div class="teoria-suspeito ' + (destaque ? 'destaque' : '') + '" ' +
      'data-suspeito="' + i + '" ' +
      'role="button" ' +
      'tabindex="0">' +
      '<div class="teoria-suspeito-avatar">' + (s.avatar || '❓') + '</div>' +
      '<div class="teoria-suspeito-nome">' + (typeof escapeHTML === 'function' ? escapeHTML(s.nome) : s.nome) + '</div>' +
      '<div class="teoria-suspeito-badge">' + conectadoPor.length + '</div>' +
    '</div>';
  }).join('');

  overlay.innerHTML =
    '<div class="teorias-box">' +
      '<div class="teorias-header">' +
        '<h2>' + txt.titulo + '</h2>' +
        '<p>' + txt.sub + '</p>' +
        '<button class="teorias-fechar" onclick="fecharTeorias()" aria-label="Fechar">✕</button>' +
      '</div>' +
      '<div class="teorias-contador">' +
        '<strong>' + txt.contador + ':</strong> ' +
        '<span class="teorias-contador-num">' + Object.keys(teoriasEstado.conexoes).length + '/3</span>' +
      '</div>' +
      '<div class="teorias-body">' +
        '<div class="teorias-coluna">' +
          '<div class="teorias-coluna-titulo">' + txt.evidLabel + '</div>' +
          '<div class="teorias-evidencia-lista" id="teorias-evidencias">' + evidenciasHTML + '</div>' +
        '</div>' +
        '<div class="teorias-coluna">' +
          '<div class="teorias-coluna-titulo">' + txt.suspLabel + '</div>' +
          '<div class="teorias-suspeito-lista" id="teorias-suspeitos">' + suspeitosHTML + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="teorias-rodape">' +
        '<div class="teorias-dica">💡 ' + txt.dica + '</div>' +
        '<div class="teorias-acoes">' +
          '<button class="teorias-btn secundario" onclick="limparTeorias()">🗑️ ' + txt.botaoLimpar + '</button>' +
          '<button class="teorias-btn primario" onclick="validarTeoria()">' + txt.botaoValidar + '</button>' +
          '<button class="teorias-btn cancelar" onclick="fecharTeorias()">' + txt.botaoFechar + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  // Drag & drop nas evidências
  overlay.querySelectorAll('.teoria-evidencia').forEach(function(el) {
    el.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('text/plain', el.getAttribute('data-evidencia'));
      el.classList.add('arrastando');
    });
    el.addEventListener('dragend', function() {
      el.classList.remove('arrastando');
    });
  });

  // Drop nos suspeitos
  overlay.querySelectorAll('.teoria-suspeito').forEach(function(el) {
    el.addEventListener('dragover', function(e) {
      e.preventDefault();
      el.classList.add('drag-over');
    });
    el.addEventListener('dragleave', function() {
      el.classList.remove('drag-over');
    });
    el.addEventListener('drop', function(e) {
      e.preventDefault();
      el.classList.remove('drag-over');
      const evIdx = parseInt(e.dataTransfer.getData('text/plain'), 10);
      const suspIdx = parseInt(el.getAttribute('data-suspeito'), 10);
      conectarEvidenciaSuspeito(evIdx, suspIdx, caso);
    });
    // Clique direto (mobile)
    el.addEventListener('click', function() {
      const evSelecionada = overlay.querySelector('.teoria-evidencia.selecionada');
      if (evSelecionada) {
        const evIdx = parseInt(evSelecionada.getAttribute('data-evidencia'), 10);
        const suspIdx = parseInt(el.getAttribute('data-suspeito'), 10);
        conectarEvidenciaSuspeito(evIdx, suspIdx, caso);
      }
    });
  });

  // Seleção por clique nas evidências (mobile)
  overlay.querySelectorAll('.teoria-evidencia').forEach(function(el) {
    el.addEventListener('click', function(e) {
      if (e.target.classList.contains('teoria-conectada-badge')) return;
      overlay.querySelectorAll('.teoria-evidencia').forEach(function(x) {
        x.classList.remove('selecionada');
      });
      el.classList.add('selecionada');
    });
  });
}

// ============================================================
// CONECTAR EVIDÊNCIA → SUSPEITO
// ============================================================
function conectarEvidenciaSuspeito(evIdx, suspIdx, caso) {
  if (isNaN(evIdx) || isNaN(suspIdx)) return;

  teoriasEstado.conexoes[evIdx] = suspIdx;
  salvarTeorias(caso.id);
  renderizarOverlayTeorias(caso);

  if (typeof tocarSom === 'function') tocarSom('clique');
}

// ============================================================
// VALIDAR TEORIA
// ============================================================
function validarTeoria() {
  const caso = window.getCasoPorId ? window.getCasoPorId(teoriasEstado.casoId) : null;
  if (!caso) return;

  // Encontra o índice do culpado
  const culpadoIdx = caso.suspeitos.findIndex(function(s) {
    return s.nome === caso.culpado;
  });

  // Conta conexões corretas (evidência real → culpado)
  const evidenciasCulpado = caso.evidencias;
  let corretas = 0;

  Object.keys(teoriasEstado.conexoes).forEach(function(evIdx) {
    const suspIdx = teoriasEstado.conexoes[evIdx];
    if (parseInt(suspIdx, 10) === culpadoIdx) {
      corretas++;
    }
  });

  const venceu = corretas >= 3;
  mostrarResultadoTeoria(venceu, corretas, caso);
}

// ============================================================
// MOSTRAR RESULTADO
// ============================================================
function mostrarResultadoTeoria(venceu, corretas, caso) {
  const lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  const resultado = document.createElement('div');
  resultado.className = 'teoria-resultado-overlay';
  resultado.innerHTML =
    '<div class="teoria-resultado-box ' + (venceu ? 'vitoria' : 'derrota') + '">' +
      '<div class="teoria-resultado-icone">' + (venceu ? '🎯' : '❌') + '</div>' +
      '<h3>' + (venceu
        ? (lang === 'en' ? 'THEORY CONFIRMED!' : 'TEORIA CONFIRMADA!')
        : (lang === 'en' ? 'THEORY REJECTED' : 'TEORIA REJEITADA')
      ) + '</h3>' +
      '<p>' + (lang === 'en'
        ? 'You connected <strong>' + corretas + '</strong> correct evidence(s) to the culprit.'
        : 'Você conectou <strong>' + corretas + '</strong> evidência(s) correta(s) ao culpado.'
      ) + '</p>' +
      (venceu
        ? '<p class="teoria-bonus">+' + (corretas === 3 ? 200 : corretas === 2 ? 100 : 50) + ' pts</p>'
        : '<p>' + (lang === 'en' ? 'Try again — you need at least 3 correct connections.' : 'Tente novamente — você precisa de pelo menos 3 conexões corretas.') + '</p>'
      ) +
      '<button class="teorias-btn primario" onclick="this.closest(\'.teoria-resultado-overlay\').remove();' + (venceu ? 'fecharTeorias();' : '') + '">' +
        (lang === 'en' ? 'OK' : 'OK') +
      '</button>' +
    '</div>';

  document.body.appendChild(resultado);

  if (venceu) {
    // Aplica bônus de pontos
    const bonus = corretas === 3 ? 200 : corretas === 2 ? 100 : 50;
    var est = window.estadoRef ? window.estadoRef() : window.estado;
    if (est) {
      est.pontos += bonus;
      if (typeof salvarEstado === 'function') salvarEstado();
      if (typeof atualizarHUD === 'function') atualizarHUD();
    }
    if (typeof tocarSom === 'function') tocarSom('vitoria');
    if (typeof notificar === 'function') {
      notificar(
        lang === 'en' ? '🧩 Theory Confirmed!' : '🧩 Teoria Confirmada!',
        '+' + bonus + ' ' + (lang === 'en' ? 'points' : 'pontos')
      );
    }
  } else {
    if (typeof tocarSom === 'function') tocarSom('erro');
  }
}

// ============================================================
// SALVAR / LIMPAR / FECHAR
// ============================================================
function salvarTeorias(casoId) {
  try {
    localStorage.setItem('arquivoMorto_teorias_' + casoId, JSON.stringify({
      conexoes: teoriasEstado.conexoes
    }));
  } catch(e) {}
}

function limparTeorias() {
  teoriasEstado.conexoes = {};
  const caso = window.getCasoPorId ? window.getCasoPorId(teoriasEstado.casoId) : null;
  if (caso) {
    try { localStorage.removeItem('arquivoMorto_teorias_' + caso.id); } catch(e) {}
    renderizarOverlayTeorias(caso);
  }
  if (typeof tocarSom === 'function') tocarSom('clique');
}

function fecharTeorias() {
  const overlay = document.getElementById('teorias-overlay');
  if (overlay) overlay.remove();
  teoriasEstado.ativo = false;
  if (typeof tocarSom === 'function') tocarSom('clique');
}

// ============================================================
// BOTÃO NO PAINEL DE INVESTIGAÇÃO
// ============================================================
function adicionarBotaoTeorias(caso) {
  const painel = document.querySelector('.painel-investigacao');
  if (!painel) return;

  const ferramentas = painel.querySelector('.ferramentas');
  if (!ferramentas) return;

  // Evita duplicar
  if (ferramentas.querySelector('.ferramenta-btn[data-ferramenta="teorias"]')) return;

  const btn = document.createElement('button');
  btn.className = 'ferramenta-btn';
  btn.setAttribute('data-ferramenta', 'teorias');
  btn.innerHTML = '🧩 ' + (window.idiomaAtual === 'en' ? 'THEORY' : 'TEORIA');
  btn.addEventListener('click', function() {
    abrirTeorias(caso);
  });
  ferramentas.appendChild(btn);
}

// ============================================================
// INICIALIZAR
// ============================================================
function iniciarTeorias() {
  console.log('✓ Sistema de Teorias carregado (v8.0)');
}

// ============================================================
// EXPORTAR
// ============================================================
window.iniciarTeorias = iniciarTeorias;
window.abrirTeorias = abrirTeorias;
window.fecharTeorias = fecharTeorias;
window.validarTeoria = validarTeoria;
window.limparTeorias = limparTeorias;
window.adicionarBotaoTeorias = adicionarBotaoTeorias;