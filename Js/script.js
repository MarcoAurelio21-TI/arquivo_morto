// ============================================================
// ARQUIVO MORTO v7.2 — MOTOR DO JOGO (CORRIGIDO)
// ============================================================

(function() {
'use strict';

var CONFIG = {
  SAVE_DEBOUNCE_MS: 300,
  CACHE_TTL_MS: 1000,
  TEMPO_CONTRARRELOGIO: 60,
  BUSCA_DEBOUNCE_MS: 200
};

var ESTADO_INICIAL = {
  versao: 7, vidas: 3, pontos: 0, xp: 0, nivel: 1, combo: 0, comboMax: 0,
  resolvidos: [], dicasUsadas: {}, tentativas: {}, acertosPrimeira: {},
  conquistas: [], temasDesbloqueados: ['noir'], temaAtual: 'noir',
  cartas: [], tempoInicio: null, tempoTotal: 0, tempoPorCaso: {},
  historico: [], modoAtual: 'normal', capituloAtual: 1,
  chefesDerrotados: [], casosHistoricosJogados: [], casosHistoricosResolvidos: [],
  npcsEncontrados: [], tutorialCompletado: false,
  estatisticas: {
    acertos: 0, erros: 0, dicasTotais: 0, tempoTotalJogo: 0,
    casosContra: 0, casosPerfeitos: 0, casosHistoricos: 0, npcsInteragidos: 0
  }
};

var Estado = {
  dados: null,
  init: function() {
    this.dados = this._carregar();
    if (this.dados.vidas <= 0) this.dados.vidas = 3;
    return this.dados;
  },
  _carregar: function() {
    try {
      var s = localStorage.getItem('arquivoMorto_v5');
      if (s) return Object.assign({}, ESTADO_INICIAL, JSON.parse(s));
    } catch(e) {}
    return JSON.parse(JSON.stringify(ESTADO_INICIAL));
  },
  _saveTimer: null,
  salvar: function() {
    var self = this;
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(function() {
      try { localStorage.setItem('arquivoMorto_v5', JSON.stringify(self.dados)); } catch(e) {}
      self._saveTimer = null;
    }, CONFIG.SAVE_DEBOUNCE_MS);
  },
  salvarImediato: function() {
    if (this._saveTimer) { clearTimeout(this._saveTimer); this._saveTimer = null; }
    try { localStorage.setItem('arquivoMorto_v5', JSON.stringify(this.dados)); } catch(e) {}
  },
  resetar: function() {
    this.dados = JSON.parse(JSON.stringify(ESTADO_INICIAL));
    this.dados.tempoInicio = Date.now();
    this.salvarImediato();
    return this.dados;
  }
};

var CacheCasos = {
  _todos: null, _porId: null, _timestamp: 0,
  _expirado: function() { return !this._todos || (Date.now() - this._timestamp) > CONFIG.CACHE_TTL_MS; },
  invalidar: function() { this._todos = null; this._porId = null; this._timestamp = 0; },
  getTodos: function() { if (this._expirado()) this._reconstruir(); return this._todos; },
  _reconstruir: function() {
    var base = (window.CASOS || []).concat(window.CHEFOES || []);
    var gerados = [];
    try { if (window.carregarCasosGerados) gerados = carregarCasosGerados(); } catch(e) {}
    this._todos = base.concat(gerados);
    this._porId = {};
    for (var i = 0; i < this._todos.length; i++) this._porId[this._todos[i].id] = this._todos[i];
    this._timestamp = Date.now();
  },
  getPorId: function(id) { if (this._expirado()) this._reconstruir(); return this._porId[id] || null; },
  adicionar: function(caso) {
    if (this._expirado()) this._reconstruir();
    if (!this._porId[caso.id]) { this._todos.push(caso); this._porId[caso.id] = caso; }
  },
  getTotalCasos: function() {
    var todos = this.getTodos();
    return todos.filter(function(c) { return !c.ehChefao; }).length;
  }
};

window.escapeHTML = function(s) {
  return String(s).replace(/[&<>"']/g, function(c) {
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
};

window.typewriter = function(el, texto, v, cb) {
  if (!el) return;
  el.textContent = '';
  var i = 0;
  var t = setInterval(function() {
    el.textContent += texto.charAt(i); i++;
    if (i >= texto.length) { clearInterval(t); if (cb) cb(); }
  }, v || 30);
};

window.formatarTempo = function(s) {
  var m = Math.floor(s / 60); var seg = s % 60;
  return m + 'min ' + seg + 's';
};

window.getCasoPorId = function(id) { return CacheCasos.getPorId(id); };
window.getCasosTodos = function() { return CacheCasos.getTodos(); };

window.t = window.t || function(chave) {
  if (window.TRADUCOES && window.TRADUCOES[window.idiomaAtual]) {
    return window.TRADUCOES[window.idiomaAtual][chave] || chave;
  }
  return chave;
};

function textoCaso(caso, campo) {
  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';
  if (lang === 'en') {
    var campoEN = campo + 'EN';
    if (caso[campoEN]) return caso[campoEN];
  }
  return caso[campo] || '';
}

function tituloCaso(caso) {
  return textoCaso(caso, 'titulo') || caso.titulo || ('Caso #' + caso.id);
}

var Audio = {
  ctx: null, _falhou: false,
  init: function() {
    if (this.ctx) return this.ctx;
    if (this._falhou) return null;
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) { console.warn('⚠️ Web Audio API não suportada'); this._falhou = true; return null; }
      this.ctx = new Ctx();
    } catch(e) {
      console.warn('⚠️ Falha ao criar AudioContext:', e.message);
      this._falhou = true; this.ctx = null;
    }
    return this.ctx;
  },
  tocar: function(tipo) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    var a = this.ctx.currentTime;
    var osc = this.ctx.createOscillator();
    var gain = this.ctx.createGain();
    osc.connect(gain); gain.connect(this.ctx.destination);

    if (tipo === 'acerto') {
      osc.frequency.setValueAtTime(523, a);
      osc.frequency.setValueAtTime(659, a + 0.1);
      osc.frequency.setValueAtTime(784, a + 0.2);
      gain.gain.setValueAtTime(0.15, a);
      gain.gain.exponentialRampToValueAtTime(0.001, a + 0.5);
      osc.start(a); osc.stop(a + 0.5);
    } else if (tipo === 'erro') {
      osc.frequency.setValueAtTime(200, a);
      osc.frequency.exponentialRampToValueAtTime(80, a + 0.3);
      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.2, a);
      gain.gain.exponentialRampToValueAtTime(0.001, a + 0.4);
      osc.start(a); osc.stop(a + 0.4);
    } else if (tipo === 'clique') {
      osc.frequency.setValueAtTime(800, a);
      gain.gain.setValueAtTime(0.05, a);
      gain.gain.exponentialRampToValueAtTime(0.001, a + 0.08);
      osc.start(a); osc.stop(a + 0.08);
    } else if (tipo === 'dica') {
      osc.frequency.setValueAtTime(600, a);
      osc.frequency.setValueAtTime(900, a + 0.08);
      gain.gain.setValueAtTime(0.1, a);
      gain.gain.exponentialRampToValueAtTime(0.001, a + 0.2);
      osc.start(a); osc.stop(a + 0.2);
    } else if (tipo === 'gameover') {
      osc.frequency.setValueAtTime(400, a);
      osc.frequency.exponentialRampToValueAtTime(100, a + 1);
      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.2, a);
      gain.gain.exponentialRampToValueAtTime(0.001, a + 1);
      osc.start(a); osc.stop(a + 1);
    } else if (tipo === 'vitoria' || tipo === 'nivel') {
      var notas = tipo === 'vitoria' ? [523, 659, 784, 1047] : [784, 988, 1175];
      notas.forEach(function(freq, i) {
        var o = this.ctx.createOscillator();
        var g = this.ctx.createGain();
        o.connect(g); g.connect(this.ctx.destination);
        o.frequency.setValueAtTime(freq, a + i * 0.15);
        g.gain.setValueAtTime(0.15, a + i * 0.15);
        g.gain.exponentialRampToValueAtTime(0.001, a + i * 0.15 + 0.3);
        o.start(a + i * 0.15); o.stop(a + i * 0.15 + 0.3);
      }.bind(this));
    } else if (tipo === 'combo') {
      osc.frequency.setValueAtTime(1000, a);
      osc.frequency.setValueAtTime(1300, a + 0.05);
      gain.gain.setValueAtTime(0.12, a);
      gain.gain.exponentialRampToValueAtTime(0.001, a + 0.15);
      osc.start(a); osc.stop(a + 0.15);
    } else if (tipo === 'tick') {
      osc.frequency.setValueAtTime(1200, a);
      gain.gain.setValueAtTime(0.03, a);
      gain.gain.exponentialRampToValueAtTime(0.001, a + 0.05);
      osc.start(a); osc.stop(a + 0.05);
    }
  }
};
window.initAudio = function() { return Audio.init(); };
window.tocarSom = function(t) { Audio.tocar(t); };

var XP = {
  xpParaNivel: function(n) { return Math.floor(100 * Math.pow(1.15, n - 1)); },
  calcularNivel: function(xpTotal) {
    var nivel = 1, xpAcum = 0;
    while (xpAcum + this.xpParaNivel(nivel) <= xpTotal) {
      xpAcum += this.xpParaNivel(nivel); nivel++;
    }
    return { nivel: nivel, xpAtual: xpTotal - xpAcum, xpProximo: this.xpParaNivel(nivel) };
  },
  adicionar: function(qtd) {
    var est = Estado.dados;
    var antes = est.nivel;
    est.xp += qtd;
    var calc = this.calcularNivel(est.xp);
    est.nivel = calc.nivel;
    Estado.salvar();
    if (calc.nivel > antes) window.mostrarLevelUp(calc.nivel);
    if (window.atualizarHUD) atualizarHUD();
  }
};
window.adicionarXP = function(q) { XP.adicionar(q); };

window.abrirModal = function(titulo, conteudo) {
  var modal = document.getElementById('modal-global');
  var t = document.getElementById('modal-titulo');
  var c = document.getElementById('modal-conteudo');
  if (!modal) return;
  if (t) t.innerHTML = titulo;
  if (c) c.innerHTML = conteudo;
  modal.style.display = 'flex';
};

window.fecharModal = function() {
  var modal = document.getElementById('modal-global');
  if (modal) modal.style.display = 'none';
};

function criarParticulas() {
  var container = document.getElementById('particles');
  if (!container) return;
  container.innerHTML = '';
  for (var i = 0; i < 30; i++) {
    var brasa = document.createElement('div');
    brasa.className = 'particle';
    brasa.style.left = Math.random() * 100 + '%';
    brasa.style.animationDuration = (8 + Math.random() * 12) + 's';
    brasa.style.animationDelay = (Math.random() * 15) + 's';
    brasa.style.width = (2 + Math.random() * 3) + 'px';
    brasa.style.height = brasa.style.width;
    container.appendChild(brasa);
  }
  for (var j = 0; j < 6; j++) {
    var fumaca = document.createElement('div');
    fumaca.className = 'particle fumaca';
    fumaca.style.left = Math.random() * 100 + '%';
    fumaca.style.animationDuration = (15 + Math.random() * 10) + 's';
    fumaca.style.animationDelay = (Math.random() * 20) + 's';
    container.appendChild(fumaca);
  }
}

window.mostrarTela = function(id) {
  document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
  var tela = document.getElementById(id);
  if (tela) tela.classList.add('active');
  var btnVoltar = document.getElementById('btn-voltar-global');
  if (btnVoltar) {
    if (id === 'screen-app' || id === 'screen-menu' || id === 'screen-intro' || id === 'screen-historia') {
      btnVoltar.classList.remove('show');
    } else {
      btnVoltar.classList.add('show');
    }
  }
  window.scrollTo(0, 0);
};

window.voltarAoMenu = function() {
  if (window.tocarSom) tocarSom('clique');
  mostrarTela('screen-menu');
  atualizarBotaoContinuar();
};

function atualizarBotaoContinuar() {
  var btn = document.getElementById('btn-continuar');
  if (!btn) return;
  var tem = Estado.dados && (Estado.dados.resolvidos.length > 0 || Estado.dados.pontos > 0);
  btn.style.display = tem ? 'grid' : 'none';
}

var hudUpdatePending = null;
window.atualizarHUD = function() {
  if (hudUpdatePending) return;
  hudUpdatePending = requestAnimationFrame(function() {
    hudUpdatePending = null;
    var est = Estado.dados;
    if (!est) return;
    var total = CacheCasos.getTotalCasos() || 104;
    var el;
    el = document.getElementById('hud-vidas'); if (el) el.textContent = est.vidas;
    el = document.getElementById('hud-pontos'); if (el) el.textContent = est.pontos;
    el = document.getElementById('hud-moedas'); if (el && window.getMoedas) el.textContent = getMoedas();
    el = document.getElementById('hud-progresso'); if (el) el.textContent = est.resolvidos.length + '/' + total;
    el = document.getElementById('hud-nivel'); if (el) el.textContent = est.nivel;
    var calc = XP.calcularNivel(est.xp);
    var fill = document.getElementById('hud-xp-fill');
    if (fill) fill.style.width = ((calc.xpAtual / calc.xpProximo) * 100) + '%';
    el = document.getElementById('hud-combo'); if (el) el.textContent = 'x' + Math.max(1, est.combo);
    if (window.atualizarHUDReputacao) atualizarHUDReputacao();
  });
};

var filtroAtual = 'todos';
var buscaAtual = '';

function renderizarMenu() {
  var lista = document.getElementById('menu-casos');
  if (!lista) return;
  var todos = CacheCasos.getTodos();
  var resolvidos = Estado.dados.resolvidos || [];

  var filtrados = todos.filter(function(c) {
    if (filtroAtual === 'abertos' && resolvidos.indexOf(c.id) !== -1) return false;
    if (filtroAtual === 'resolvidos' && resolvidos.indexOf(c.id) === -1) return false;
    if (filtroAtual === 'historicos' && !c.historico) return false;
    if (buscaAtual && tituloCaso(c).toLowerCase().indexOf(buscaAtual.toLowerCase()) === -1) return false;
    return true;
  });

  lista.innerHTML = '';
  if (filtrados.length === 0) {
    lista.innerHTML = '<li style="padding:1rem;color:rgba(232,220,196,0.5);font-size:0.75rem">' +
      (window.idiomaAtual === 'en' ? 'No cases found' : 'Nenhum caso encontrado') + '</li>';
    return;
  }

  filtrados.slice(0, 200).forEach(function(c) {
    var li = document.createElement('li');
    var resolvido = resolvidos.indexOf(c.id) !== -1;
    var a = document.createElement('a');
    a.href = '#';
    a.className = 'menu-link' + (c.ehChefao ? ' perigo' : '');
    a.innerHTML = '<span>' + (c.ehChefao ? '👑 ' : (c.historico ? '📜 ' : '📁 ')) +
      escapeHTML(tituloCaso(c)) + '</span>' +
      (resolvido ? '<span class="check">✓</span>' : '');
    a.addEventListener('click', function(e) { e.preventDefault(); abrirCaso(c.id); });
    li.appendChild(a);
    lista.appendChild(li);
  });
}
window.renderizarMenu = renderizarMenu;

var casoAtual = null;
var tempoRestante = CONFIG.TEMPO_CONTRARRELOGIO;
var timerInterval = null;

window.abrirCaso = function(id) {
  var caso = CacheCasos.getPorId(id);
  if (!caso) {
    alert(window.idiomaAtual === 'en' ? 'Case not found.' : 'Caso não encontrado.');
    return;
  }
  casoAtual = caso;
  window.casoAtual = caso;

  if (window.resetarCartasCaso) resetarCartasCaso();
  if (window.adicionarDiario) {
    adicionarDiario(caso.id,
      (window.idiomaAtual === 'en' ? '🔎 Case opened: ' : '🔎 Caso aberto: ') +
      '<strong>' + escapeHTML(tituloCaso(caso)) + '</strong>', true);
  }

  var abrir = function() {
    mostrarTela('screen-app');
    renderizarCaso();
    iniciarTimerCaso();
  };

  if (window.tocarCutscenePasta && window.CONFIG_CUTSCENES && window.CONFIG_CUTSCENES.ativa) {
    tocarCutscenePasta(caso, abrir);
  } else { abrir(); }
};
window.abrirCasoDireto = window.abrirCaso;

function renderizarCaso() {
  var content = document.getElementById('content');
  if (!content || !casoAtual) return;
  var caso = casoAtual;
  var resolvido = Estado.dados.resolvidos.indexOf(caso.id) !== -1;
  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  var txt = {
    premissa: lang === 'en' ? '📜 Premise' : '📜 Premissa',
    contexto: lang === 'en' ? '📖 Historical Context' : '📖 Contexto Histórico',
    evidencias: lang === 'en' ? '🔍 Evidence (click to analyze)' : '🔍 Evidências (clique para analisar)',
    suspeitos: lang === 'en' ? '👤 Suspects' : '👤 Suspeitos',
    interrogar: lang === 'en' ? '🗣️ Click to INTERROGATE' : '🗣️ Clique para INTERROGAR',
    dicas: lang === 'en' ? '💡 Available Hints' : '💡 Dicas Disponíveis',
    revelarDica: lang === 'en' ? 'REVEAL HINT (-30 pts)' : 'REVELAR DICA (-30 pts)',
    todasUsadas: lang === 'en' ? 'ALL USED' : 'TODAS USADAS',
    nenhumaDica: lang === 'en' ? 'No hints revealed yet.' : 'Nenhuma dica revelada ainda.',
    casoResolvido: lang === 'en' ? '✓ CASE ALREADY SOLVED' : '✓ CASO JÁ RESOLVIDO',
    quemCulpado: lang === 'en' ? '⚖️ Who is the culprit?' : '⚖️ Quem é o culpado?',
    oCulpadoEra: lang === 'en' ? 'The culprit was' : 'O culpado era',
    comoAconteceu: lang === 'en' ? 'How it happened:' : 'Como aconteceu:',
    instrucaoAcusar: lang === 'en' ? 'Collect evidence before accusing. You need at least 3.' : 'Colete provas antes de acusar. Você precisa de pelo menos 3.'
  };

  var painelHTML = (!resolvido && window.renderPainelInvestigacao) ? renderPainelInvestigacao(caso) : '';
  var diarioHTML = window.renderDiario ? renderDiario(caso.id) : '';
  var ilustracaoHTML = window.renderIlustracaoCaso ? renderIlustracaoCaso(caso.id) : '';
  var npcsHTML = window.renderNPCsCaso ? renderNPCsCaso(caso.id) : '';

  var evidencias = (lang === 'en' && caso.evidenciasEN) ? caso.evidenciasEN : (caso.evidencias || []);
  var evidenciasHTML = evidencias.map(function(ev, i) {
    return '<li class="evidencia-item" data-evidencia-idx="' + i + '">' + escapeHTML(ev) + '</li>';
  }).join('');

  var suspeitosHTML = (caso.suspeitos || []).map(function(s, i) {
    var nomeSuspeito = (lang === 'en' && s.nomeEN) ? s.nomeEN : s.nome;
    var descSuspeito = (lang === 'en' && s.descEN) ? s.descEN : (s.desc || '');
    return '<div class="suspeito-card" data-suspeito-idx="' + i + '">' +
      '<div class="suspeito-avatar">' + (s.avatar || '❓') + '</div>' +
      '<div class="suspeito-info">' +
        '<strong>' + escapeHTML(nomeSuspeito) + '</strong>' +
        '<p>' + escapeHTML(descSuspeito) + '</p>' +
        '<div class="interrogar">' + txt.interrogar + '</div>' +
      '</div></div>';
  }).join('');

  var dicas = (lang === 'en' && caso.dicasEN) ? caso.dicasEN : (caso.dicas || []);
  var dicasUsadas = Estado.dados.dicasUsadas[caso.id] || 0;
  var dicasHTML = dicas.map(function(d, i) {
    if (i < dicasUsadas) return '<div class="dica-item">💡 ' + escapeHTML(d) + '</div>';
    return '';
  }).join('');

  var botoesHTML = (caso.suspeitos || []).map(function(s) {
    var nomeSuspeito = (lang === 'en' && s.nomeEN) ? s.nomeEN : s.nome;
    var nomeOriginal = s.nome;
    return '<button class="btn-suspeito" data-nome="' + escapeHTML(nomeOriginal) + '">' + escapeHTML(nomeSuspeito) + '</button>';
  }).join('');

  var avisoEtico = caso.avisoEtico
    ? '<div class="historicos-aviso" style="margin:1rem 0;padding:1rem;background:rgba(139,26,26,0.15);border-left:4px solid var(--sangue)"><strong>' +
      (lang === 'en' ? '⚠️ Ethical Notice: ' : '⚠️ Aviso Ético: ') + '</strong>' + escapeHTML(caso.avisoEtico) + '</div>'
    : '';

  var solucaoTexto = textoCaso(caso, 'solucao');
  var culpadoNome = (lang === 'en' && caso.culpadoEN) ? caso.culpadoEN : caso.culpado;

  content.innerHTML =
    '<div class="content-inner">' +
      '<div class="caso-header">' +
        '<div class="caso-numero">' + (lang === 'en' ? 'CASE #' : 'CASO #') + String(caso.id).padStart(4, '0') +
          (caso.ehChefao ? ' · 👑 ' + (lang === 'en' ? 'BOSS' : 'CHEFÃO') : '') +
          (caso.historico ? ' · 📜 ' + (lang === 'en' ? 'HISTORICAL' : 'HISTÓRICO') : '') + '</div>' +
        '<h2>' + escapeHTML(tituloCaso(caso)) + '</h2>' +
      '</div>' +
      avisoEtico +
      ilustracaoHTML +
      '<div class="caso-body">' +
        '<div class="coluna">' +
          '<h3>' + txt.premissa + '</h3><p>' + escapeHTML(textoCaso(caso, 'premissa') || textoCaso(caso, 'resumo')) + '</p>' +
          (caso.contexto ? '<h3 style="margin-top:1rem">' + txt.contexto + '</h3><p>' + escapeHTML(caso.contexto) + '</p>' : '') +
        '</div>' +
        '<div class="coluna">' +
          '<h3>' + txt.evidencias + '</h3>' +
          '<ul class="evidencias">' + evidenciasHTML + '</ul>' +
        '</div>' +
      '</div>' +
      painelHTML +
      '<div class="dicas-box">' +
        '<div class="dicas-header">' +
          '<h3>' + txt.dicas + '</h3>' +
          '<button class="btn-dica" id="btn-dica"' + (dicasUsadas >= 3 ? ' disabled' : '') + '>' +
            (dicasUsadas >= 3 ? txt.todasUsadas : txt.revelarDica) +
          '</button>' +
        '</div>' +
        '<div id="dicas-lista">' + (dicasHTML || '<div class="dica-item" style="opacity:0.5">' + txt.nenhumaDica + '</div>') + '</div>' +
      '</div>' +
      '<div class="coluna"><h3>' + txt.suspeitos + '</h3><div class="suspeitos">' + suspeitosHTML + '</div></div>' +
      npcsHTML + diarioHTML +
      '<div class="veredito">' +
        '<h3>' + (resolvido ? txt.casoResolvido : txt.quemCulpado) + '</h3>' +
        (resolvido
          ? '<p class="instrucao">' + txt.oCulpadoEra + ' <strong>' + escapeHTML(culpadoNome) + '</strong>.</p>' +
            '<div class="resultado correto show"><h4>' + txt.comoAconteceu + '</h4><p>' + escapeHTML(solucaoTexto) + '</p></div>'
          : '<p class="instrucao">' + txt.instrucaoAcusar + '</p>' +
            '<div class="botoes-suspeitos">' + botoesHTML + '</div>') +
        '<div class="resultado" id="resultado-caso"></div>' +
      '</div>' +
    '</div>';

  if (!resolvido) {
    if (window.configurarEvidencias) configurarEvidencias(caso);
    if (window.configurarSuspeitos) configurarSuspeitos(caso);
    if (window.configurarFerramentas) configurarFerramentas();
    if (window.atualizarPainelProvas) atualizarPainelProvas(caso.id);
  }

  var btnDica = document.getElementById('btn-dica');
  if (btnDica && !resolvido) btnDica.addEventListener('click', revelarDica);

  document.querySelectorAll('.btn-suspeito').forEach(function(btn) {
    btn.addEventListener('click', function() { acusar(btn.getAttribute('data-nome')); });
  });

  document.querySelectorAll('.suspeito-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (e.target.classList.contains('btn-marcar-suspeito')) return;
      var idx = parseInt(card.getAttribute('data-suspeito-idx'), 10);
      var s = caso.suspeitos[idx];
      if (s && window.iniciarInterrogatorio) iniciarInterrogatorio(caso, s);
    });
  });

  if (window.atualizarHUD) atualizarHUD();
}
window.renderizarCasoAtual = renderizarCaso;

function revelarDica() {
  if (!casoAtual) return;
  if (window.isHardcore && isHardcore()) {
    alert(window.idiomaAtual === 'en' ? '💀 Hardcore Mode: hints disabled!' : '💀 Modo Hardcore: dicas desabilitadas!');
    return;
  }
  var est = Estado.dados;
  var usadas = est.dicasUsadas[casoAtual.id] || 0;
  if (usadas >= 3) return;
  est.dicasUsadas[casoAtual.id] = usadas + 1;
  est.pontos = Math.max(0, est.pontos - 30);
  est.estatisticas.dicasTotais++;
  Estado.salvar();

  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';
  var dicas = (lang === 'en' && casoAtual.dicasEN) ? casoAtual.dicasEN : (casoAtual.dicas || []);

  var lista = document.getElementById('dicas-lista');
  if (lista) {
    if (usadas === 0) lista.innerHTML = '';
    var div = document.createElement('div');
    div.className = 'dica-item';
    div.innerHTML = '💡 ' + escapeHTML(dicas[usadas] || '');
    lista.appendChild(div);
  }
  var btn = document.getElementById('btn-dica');
  if (btn && usadas + 1 >= 3) {
    btn.disabled = true;
    btn.textContent = window.idiomaAtual === 'en' ? 'ALL USED' : 'TODAS USADAS';
  }

  if (window.adicionarDiario) {
    adicionarDiario(casoAtual.id,
      (window.idiomaAtual === 'en' ? '💡 Hint revealed (' : '💡 Dica revelada (') + (usadas + 1) + '/3)', false);
  }
  if (window.adicionarReputacao) adicionarReputacao('dica_usada');
  if (window.tocarSom) tocarSom('dica');
  if (window.atualizarHUD) atualizarHUD();
}

function acusar(nomeOriginal) {
  if (!casoAtual) return;
  if (window.validarAcusacao && !validarAcusacao()) return;

  var est = Estado.dados;
  var caso = casoAtual;
  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  if (!est.tentativas[caso.id]) est.tentativas[caso.id] = 0;
  est.tentativas[caso.id]++;

  var acertou = nomeOriginal === caso.culpado;
  if (acertou) { est.combo++; if (est.combo > est.comboMax) est.comboMax = est.combo; }
  else { est.combo = 0; }

  var mult = est.modoAtual === 'contrarrelogio' ? 2 : (est.modoAtual === 'perfeicao' ? 3 : 1);
  var pontosBase = acertou ? 100 : 0;
  var bonusCombo = Math.max(0, (est.combo - 1) * 20);
  var bonusSemDica = (est.dicasUsadas[caso.id] || 0) === 0 ? 30 : 0;
  var pontosFinal = Math.floor((pontosBase + bonusCombo + bonusSemDica) * mult);
  if (window.aplicarBonusReputacao) pontosFinal = aplicarBonusReputacao(pontosFinal);

  var resultado = document.getElementById('resultado-caso');
  if (!resultado) return;

  var nomeExibido = nomeOriginal;
  (caso.suspeitos || []).forEach(function(s) {
    if (s.nome === nomeOriginal && lang === 'en' && s.nomeEN) nomeExibido = s.nomeEN;
  });

  var culpadoNome = (lang === 'en' && caso.culpadoEN) ? caso.culpadoEN : caso.culpado;
  var solucaoTexto = textoCaso(caso, 'solucao');

  if (acertou) {
    est.pontos += pontosFinal;
    est.estatisticas.acertos++;
    if (est.resolvidos.indexOf(caso.id) === -1) est.resolvidos.push(caso.id);
    if (est.tentativas[caso.id] === 1) est.acertosPrimeira[caso.id] = true;
    if (caso.ehChefao && est.chefesDerrotados.indexOf(caso.id) === -1) est.chefesDerrotados.push(caso.id);
    if (caso.historico) {
      if (est.casosHistoricosResolvidos.indexOf(caso.id) === -1) est.casosHistoricosResolvidos.push(caso.id);
      if (window.marcarHistoricoResolvido) marcarHistoricoResolvido(caso.id);
    }

    if (window.CacheCasos) CacheCasos.invalidar();

    if (window.adicionarXP) adicionarXP(50 + Math.floor(pontosFinal / 2));
    if (window.adicionarReputacao) {
      adicionarReputacao('caso_resolvido');
      if (est.tentativas[caso.id] === 1) adicionarReputacao('caso_primeira');
      if ((est.dicasUsadas[caso.id] || 0) === 0) adicionarReputacao('caso_sem_dica');
      if (caso.ehChefao) adicionarReputacao('chefao_derrotado');
    }
    if (window.atualizarProgressoMissao) {
      atualizarProgressoMissao('casos', 1);
      if ((est.dicasUsadas[caso.id] || 0) === 0) atualizarProgressoMissao('sem_dica', 1);
      if (est.tentativas[caso.id] === 1) atualizarProgressoMissao('primeira', 1);
    }
    if (window.adicionarPontosTemporada) adicionarPontosTemporada(pontosFinal);
    if (window.adicionarCasoTemporada) adicionarCasoTemporada();
    verificarConquistas();
    if (window.atualizarRelacaoNPC) {
      var ns = window.getNPCsDoCaso ? getNPCsDoCaso(caso.id) : [];
      ns.forEach(function(n) { atualizarRelacaoNPC(n.id, 'resolvido', caso.id); });
    }
    if (Math.random() < 0.15 && window.darCartaAleatoria) darCartaAleatoria();
    if (window.adicionarMoedas) adicionarMoedas(Math.floor(pontosFinal / 2));

    resultado.className = 'resultado correto show';
    resultado.innerHTML =
      '<h4>' + (lang === 'en' ? '✓ CASE SOLVED' : '✓ CASO RESOLVIDO') + '</h4>' +
      '<p>' + (lang === 'en' ? 'The culprit was' : 'O culpado era') + ' <strong>' + escapeHTML(culpadoNome) + '</strong>.</p>' +
      '<p><strong>' + (lang === 'en' ? 'How it happened:' : 'Como aconteceu:') + '</strong> ' + escapeHTML(solucaoTexto) + '</p>' +
      '<p><strong>+ ' + pontosFinal + ' pts</strong>' + (bonusCombo ? ' (combo x' + est.combo + ')' : '') + '</p>';
    if (window.tocarSom) tocarSom('vitoria');
    if (window.flash) flash('correto');
    setTimeout(function() {
      if (window.iniciarJulgamento) iniciarJulgamento(caso, nomeOriginal);
    }, 2000);
  } else {
    est.estatisticas.erros++;
    var escudo = window.temEscudoAtivo && temEscudoAtivo();
    if (escudo) {
      if (window.consumirEscudo) consumirEscudo();
      resultado.className = 'resultado errado show';
      resultado.innerHTML =
        '<h4>' + (lang === 'en' ? '✕ WRONG SUSPECT' : '✕ ACUSADO ERRADO') + '</h4>' +
        '<p>' + (lang === 'en' ? 'You accused' : 'Você acusou') + ' <strong>' + escapeHTML(nomeExibido) + '</strong>.</p>' +
        '<p>' + (lang === 'en' ? '🎯 Your Precision card absorbed the damage!' : '🎯 Sua carta Precisão absorveu o dano!') + '</p>';
    } else {
      est.vidas--;
      if (window.adicionarReputacao) adicionarReputacao('caso_errado');
      resultado.className = 'resultado errado show';
      resultado.innerHTML =
        '<h4>' + (lang === 'en' ? '✕ WRONG SUSPECT' : '✕ ACUSADO ERRADO') + '</h4>' +
        '<p>' + (lang === 'en' ? 'You accused' : 'Você acusou') + ' <strong>' + escapeHTML(nomeExibido) + '</strong>.</p>' +
        '<p><strong>' + (lang === 'en' ? 'Remaining lives:' : 'Vidas restantes:') + '</strong> ' + est.vidas + '</p>';
      document.body.classList.add('tremendo');
      setTimeout(function() { document.body.classList.remove('tremendo'); }, 500);
    }
    if (window.tocarSom) tocarSom('erro');
    if (window.flash) flash('errado');
    if (window.atualizarRelacaoNPC) {
      var ns2 = window.getNPCsDoCaso ? getNPCsDoCaso(caso.id) : [];
      ns2.forEach(function(n) { atualizarRelacaoNPC(n.id, 'errado', caso.id); });
    }
    if (est.vidas <= 0) setTimeout(function() { if (window.mostrarGameOver) mostrarGameOver(); }, 2000);
  }
  Estado.salvar();
  if (window.atualizarHUD) atualizarHUD();
  if (window.renderizarMenu) renderizarMenu();
}

window.mostrarGameOver = function() {
  var est = Estado.dados;
  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';
  var s = document.getElementById('gameover-stats');
  if (s) s.innerHTML =
    '<div>' + (lang === 'en' ? '📁 Cases solved: ' : '📁 Casos resolvidos: ') + '<strong>' + est.resolvidos.length + '</strong></div>' +
    '<div>' + (lang === 'en' ? '⭐ Final score: ' : '⭐ Pontuação final: ') + '<strong>' + est.pontos + '</strong></div>' +
    '<div>' + (lang === 'en' ? '🏅 Level reached: ' : '🏅 Nível alcançado: ') + '<strong>' + est.nivel + '</strong></div>' +
    '<div>' + (lang === 'en' ? '🔥 Max combo: ' : '🔥 Combo máximo: ') + '<strong>x' + est.comboMax + '</strong></div>';
  mostrarTela('screen-gameover');
  if (window.tocarSom) tocarSom('gameover');
};

window.mostrarVitoria = function() {
  var est = Estado.dados;
  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';
  var r = document.getElementById('relatorio');
  if (r) {
    var t = est.tempoInicio ? Math.floor((Date.now() - est.tempoInicio) / 1000) : 0;
    r.innerHTML =
      '<div class="linha"><span>' + (lang === 'en' ? 'Cases' : 'Casos') + '</span><strong>' + est.resolvidos.length + '</strong></div>' +
      '<div class="linha"><span>' + (lang === 'en' ? 'Score' : 'Pontuação') + '</span><strong>' + est.pontos + '</strong></div>' +
      '<div class="linha"><span>' + (lang === 'en' ? 'Level' : 'Nível') + '</span><strong>' + est.nivel + '</strong></div>' +
      '<div class="linha"><span>' + (lang === 'en' ? 'Time' : 'Tempo') + '</span><strong>' + formatarTempo(t) + '</strong></div>' +
      '<div class="rank">' + (lang === 'en' ? '🏆 LEGENDARY DETECTIVE 🏆' : '🏆 DETETIVE LENDÁRIO 🏆') + '</div>';
  }
  mostrarTela('screen-vitoria');
  if (window.tocarSom) tocarSom('vitoria');
};

function verificarConquistas() {
  var est = Estado.dados;
  var r = est.resolvidos.length;
  var total = CacheCasos.getTotalCasos();
  var ch = function(id) {
    if (est.conquistas.indexOf(id) === -1) { est.conquistas.push(id); mostrarConquista(id); }
  };
  if (r >= 1) ch('primeiro');
  if (r >= 5) ch('cinco');
  if (r >= 10) ch('dez');
  if (r >= 20) ch('vinte');
  if (r >= 30) ch('trinta');
  if (r >= 40) ch('quarenta');
  if (r >= 50) ch('cinquenta');
  if (r >= total && total > 0) ch('completo');
  if (est.nivel >= 10) ch('nivel10');
  if (est.nivel >= 25) ch('nivel25');
  if (est.nivel >= 50) ch('nivel50');
  var primeiras = Object.keys(est.acertosPrimeira).length;
  if (primeiras >= 1) ch('primeira');
  if (primeiras >= 10) ch('primeira_10');
  if (primeiras >= r && r > 0) ch('primeira_todos');
  Estado.salvar();
}

function mostrarConquista(id) {
  var lista = window.CONQUISTAS || [];
  var c = lista.find(function(x) { return x.id === id; });
  if (!c) return;
  var popup = document.getElementById('conquista-popup');
  if (!popup) return;
  var ic = document.getElementById('conquista-popup-icone');
  var nm = document.getElementById('conquista-popup-nome');
  if (ic) ic.textContent = c.icone || '🏆';
  if (nm) {
    var chaveNome = 'conquista_' + id;
    var traduzido = window.t && window.t(chaveNome);
    nm.textContent = (traduzido && traduzido !== chaveNome) ? traduzido : (c.nome || id);
  }
  popup.classList.add('show');
  if (window.tocarSom) tocarSom('nivel');
  if (window.notificarConquista) notificarConquista(c.nome, c.desc);
  setTimeout(function() { popup.classList.remove('show'); }, 4000);
}

window.mostrarLevelUp = function(nivel) {
  var p = document.getElementById('levelup-popup');
  if (!p) return;
  var n = document.getElementById('levelup-num');
  if (n) n.textContent = nivel;
  p.classList.add('show');
  if (window.tocarSom) tocarSom('nivel');
  setTimeout(function() { p.classList.remove('show'); }, 2000);
};

function iniciarTimerCaso() {
  if (timerInterval) clearInterval(timerInterval);
  var modo = Estado.dados.modoAtual || 'normal';
  var box = document.getElementById('hud-timer-box');
  if (modo !== 'contrarrelogio') { if (box) box.style.display = 'none'; return; }
  if (box) box.style.display = '';
  tempoRestante = CONFIG.TEMPO_CONTRARRELOGIO;
  var el = document.getElementById('hud-timer');
  if (el) el.textContent = tempoRestante;
  timerInterval = setInterval(function() {
    tempoRestante--;
    if (el) el.textContent = tempoRestante;
    if (tempoRestante <= 10 && tempoRestante > 0 && window.tocarSom) tocarSom('tick');
    if (tempoRestante <= 0) {
      clearInterval(timerInterval);
      if (window.tocarSom) tocarSom('erro');
      if (window.adicionarReputacao) adicionarReputacao('tempo_esgotado');
      var est = Estado.dados;
      est.vidas--;
      Estado.salvar();
      if (est.vidas <= 0) { if (window.mostrarGameOver) mostrarGameOver(); }
      else {
        alert(window.idiomaAtual === 'en' ? '⏰ Time is up! You lost a life.' : '⏰ Tempo esgotado! Você perdeu uma vida.');
        renderizarCaso();
        iniciarTimerCaso();
      }
    }
  }, 1000);
}

window.flash = function(tipo) {
  var f = document.getElementById('flash');
  if (!f) return;
  f.className = 'flash ' + tipo;
  setTimeout(function() { f.className = 'flash'; }, 300);
};

function abrirTelaIdiomas() {
  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';
  var html =
    '<div style="text-align:center;padding:1rem 0">' +
      '<p style="color:rgba(232,220,196,0.85);font-size:1rem;margin-bottom:2rem">' +
        (lang === 'en' ? 'Choose your language' : 'Escolha seu idioma') +
      '</p>' +
      '<div style="display:flex;flex-direction:column;gap:1rem;max-width:400px;margin:0 auto">' +
        '<button class="btn-menu ' + (window.idiomaAtual === 'pt' ? 'btn-menu-destaque' : '') + '" onclick="selecionarIdioma(\'pt\')" style="display:grid;grid-template-columns:60px 1fr auto;padding:1.2rem;text-align:left;width:100%;cursor:pointer;border:2px solid ' + (window.idiomaAtual === 'pt' ? 'var(--sangue-claro)' : 'rgba(139,26,26,0.4)') + ';background:linear-gradient(135deg,rgba(20,15,10,0.92),rgba(10,8,6,0.98));color:var(--papel);border-radius:4px">' +
          '<span style="grid-row:1/3;font-size:2rem;text-align:center;filter:drop-shadow(0 0 8px rgba(194,59,59,0.6))">🇧🇷</span>' +
          '<span style="font-family:var(--font-titulo);font-size:1rem;letter-spacing:3px;font-weight:bold">PORTUGUÊS</span>' +
          '<span style="grid-column:2;font-size:0.75rem;color:rgba(232,220,196,0.7)">' + (window.idiomaAtual === 'pt' ? '✓ ATIVO' : 'CLIQUE PARA USAR') + '</span>' +
        '</button>' +
        '<button class="btn-menu ' + (window.idiomaAtual === 'en' ? 'btn-menu-destaque' : '') + '" onclick="selecionarIdioma(\'en\')" style="display:grid;grid-template-columns:60px 1fr auto;padding:1.2rem;text-align:left;width:100%;cursor:pointer;border:2px solid ' + (window.idiomaAtual === 'en' ? 'var(--sangue-claro)' : 'rgba(139,26,26,0.4)') + ';background:linear-gradient(135deg,rgba(20,15,10,0.92),rgba(10,8,6,0.98));color:var(--papel);border-radius:4px">' +
          '<span style="grid-row:1/3;font-size:2rem;text-align:center;filter:drop-shadow(0 0 8px rgba(194,59,59,0.6))">🇺🇸</span>' +
          '<span style="font-family:var(--font-titulo);font-size:1rem;letter-spacing:3px;font-weight:bold">ENGLISH</span>' +
          '<span style="grid-column:2;font-size:0.75rem;color:rgba(232,220,196,0.7)">' + (window.idiomaAtual === 'en' ? '✓ ACTIVE' : 'CLICK TO USE') + '</span>' +
        '</button>' +
      '</div>' +
    '</div>';
  abrirModal('🌎 ' + (lang === 'en' ? 'LANGUAGES' : 'IDIOMAS'), html);
}
window.abrirTelaIdiomas = abrirTelaIdiomas;

window.reRenderizarTelasDinamicas = function() {
  try {
    if (window.renderizarMenu) renderizarMenu();
    var telaAtiva = document.querySelector('.screen.active');
    if (!telaAtiva) return;
    var id = telaAtiva.id;
    if (id === 'screen-estatisticas' && window.renderizarEstatisticas) renderizarEstatisticas();
    else if (id === 'screen-colecao' && window.renderizarColecao) renderizarColecao();
    else if (id === 'screen-temas' && window.renderizarTemas) renderizarTemas();
    else if (id === 'screen-campanha' && window.renderizarCampanha) renderizarCampanha();
    else if (id === 'screen-npcs' && window.renderizarGaleriaNPCs) renderizarGaleriaNPCs();
    else if (id === 'screen-historicos' && window.renderizarHistoricos) renderizarHistoricos();
    else if (id === 'screen-missoes' && window.renderizarMissoes) renderizarMissoes();
    else if (id === 'screen-app') {
      if (casoAtual) renderizarCaso();
      else renderizarHome();
    }
  } catch(e) { console.warn('Erro ao re-renderizar:', e); }
};

function configurarMenuPrincipal() {
  document.querySelectorAll('.btn-menu[data-acao]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (window.tocarSom) tocarSom('clique');
      executarAcao(btn.getAttribute('data-acao'));
    });
  });
}

function executarAcao(acao) {
  switch (acao) {
    case 'jogar':
      Estado.resetar();
      Estado.dados.tempoInicio = Date.now();
      if (window.aplicarBonusVidasIniciais) aplicarBonusVidasIniciais();
      casoAtual = null; window.casoAtual = null;
      mostrarTela('screen-app');
      renderizarMenu(); renderizarHome(); atualizarHUD();
      break;
    case 'continuar':
      mostrarTela('screen-app');
      renderizarMenu(); renderizarHome(); atualizarHUD();
      break;
    case 'tutorial':
      if (window.iniciarTutorial) iniciarTutorial();
      break;
    case 'caso-dia':
      abrirCasoAleatorio();
      break;
    case 'campanha':
      if (window.renderizarCampanha) renderizarCampanha();
      break;
    case 'contrarrelogio':
      Estado.dados.modoAtual = 'contrarrelogio';
      Estado.dados.vidas = 3;
      Estado.salvar();
      mostrarTela('screen-app');
      renderizarMenu(); renderizarHome(); atualizarHUD();
      if (window.notificar) notificar(window.idiomaAtual === 'en' ? '⏱️ Time Attack' : '⏱️ Contrarrelógio', window.idiomaAtual === 'en' ? '60s per case · points x2' : '60s por caso · pontos x2');
      break;
    case 'perfeicao':
      Estado.dados.modoAtual = 'perfeicao';
      Estado.dados.vidas = 1;
      Estado.salvar();
      mostrarTela('screen-app');
      renderizarMenu(); renderizarHome(); atualizarHUD();
      if (window.notificar) notificar(window.idiomaAtual === 'en' ? '🎯 Perfection' : '🎯 Perfeição', window.idiomaAtual === 'en' ? '1 life · points x3' : '1 vida · pontos x3');
      break;
    case 'hardcore':
      if (window.ativarHardcore && ativarHardcore()) {
        mostrarTela('screen-app');
        renderizarMenu(); renderizarHome(); atualizarHUD();
      }
      break;
    case 'mapa':
      if (window.abrirTelaMapa) abrirTelaMapa();
      else mostrarTela('screen-mapa');
      break;
    case 'gerador':
      if (window.iniciarGerador) iniciarGerador();
      break;
    case 'historicos':
      if (window.renderizarHistoricos) renderizarHistoricos();
      break;
    case 'npcs':
      if (window.renderizarGaleriaNPCs) renderizarGaleriaNPCs();
      break;
    case 'cinematic':
      if (window.iniciarIntro) iniciarIntro();
      break;
    case 'missoes':
      if (window.renderizarMissoes) { renderizarMissoes(); mostrarTela('screen-missoes'); }
      break;
    case 'temporada':
      if (window.renderizarTemporada) renderizarTemporada();
      mostrarTela('screen-temporada');
      break;
    case 'reputacao':
      if (window.abrirTelaReputacao) abrirTelaReputacao();
      break;
    case 'ranking':
      if (window.renderRankingOnline) { mostrarTela('screen-ranking'); renderRankingOnline(); }
      break;
    case 'loja':
      if (window.mostrarLojaLoot) mostrarLojaLoot();
      break;
    case 'cartas-hab':
      if (window.abrirTelaCartas) abrirTelaCartas();
      break;
    case 'colecao':
      if (window.renderizarColecao) renderizarColecao();
      mostrarTela('screen-colecao');
      break;
    case 'temas':
      if (window.renderizarTemas) renderizarTemas();
      mostrarTela('screen-temas');
      break;
    case 'estatisticas':
      if (window.renderizarEstatisticas) renderizarEstatisticas();
      mostrarTela('screen-estatisticas');
      break;
    case 'idioma':
      abrirTelaIdiomas();
      break;
    case 'compartilhar':
      if (window.compartilharResultado) compartilharResultado();
      break;
    case 'como-jogar':
      mostrarTela('screen-como-jogar');
      break;
    case 'autor':
      mostrarTela('screen-autor');
      break;
  }
}

function renderizarHome() {
  var content = document.getElementById('content');
  if (!content) return;
  var est = Estado.dados;
  var todos = CacheCasos.getTodos();
  var r = est.resolvidos.length;
  var total = CacheCasos.getTotalCasos();
  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  var abertos = todos.filter(function(c) {
    return est.resolvidos.indexOf(c.id) === -1 && !c.historico;
  }).sort(function(a, b) { return a.id - b.id; }).slice(0, 12);

  var pastas = abertos.map(function(c) {
    return '<div class="pasta" data-numero="' + (lang === 'en' ? 'CASE #' : 'CASO #') + c.id + '" data-caso="' + c.id + '">' +
      '<h3>' + escapeHTML(tituloCaso(c)) + '</h3>' +
      '<p class="resumo">' + escapeHTML((textoCaso(c, 'resumo') || textoCaso(c, 'premissa') || '').substring(0, 100)) + '...</p>' +
      '<span class="caso-status">' + (c.ehChefao ? '👑 ' + (lang === 'en' ? 'BOSS' : 'CHEFÃO') : (lang === 'en' ? 'OPEN' : 'ABERTO')) + '</span>' +
      '<span class="abrir">' + (lang === 'en' ? 'OPEN →' : 'ABRIR →') + '</span></div>';
  }).join('');

  content.innerHTML =
    '<div class="content-inner">' +
      '<div class="content-intro">' +
        '<h2>' + (lang === 'en' ? '🕵️ WELCOME, DETECTIVE' : '🕵️ BEM-VINDO, DETETIVE') + '</h2>' +
        '<p>' + (lang === 'en'
          ? 'You have <strong>' + r + '/' + total + '</strong> cases solved. Your current reputation is <strong>' + est.pontos + ' points</strong>.'
          : 'Você tem <strong>' + r + '/' + total + '</strong> casos resolvidos. Sua reputação atual é <strong>' + est.pontos + ' pontos</strong>.') +
        '</p>' +
      '</div>' +
      '<div class="stat-grid">' +
        '<div class="stat-card"><div class="stat-numero">' + est.vidas + '</div><div class="stat-label">' + (lang === 'en' ? 'LIVES' : 'VIDAS') + '</div></div>' +
        '<div class="stat-card"><div class="stat-numero">' + est.pontos + '</div><div class="stat-label">' + (lang === 'en' ? 'POINTS' : 'PONTOS') + '</div></div>' +
        '<div class="stat-card"><div class="stat-numero">' + est.nivel + '</div><div class="stat-label">' + (lang === 'en' ? 'LEVEL' : 'NÍVEL') + '</div></div>' +
        '<div class="stat-card"><div class="stat-numero">' + r + '</div><div class="stat-label">' + (lang === 'en' ? 'SOLVED' : 'RESOLVIDOS') + '</div></div>' +
      '</div>' +
      '<h3 style="font-family:var(--font-titulo);color:var(--sangue);margin:2rem 0 1rem">' +
        (lang === 'en' ? '📁 AVAILABLE CASES' : '📁 CASOS DISPONÍVEIS') + '</h3>' +
      '<div class="grid-casos">' + (pastas || '<p style="opacity:0.6">' + (lang === 'en' ? 'No cases available.' : 'Nenhum caso disponível.') + '</p>') + '</div>' +
    '</div>';

  document.querySelectorAll('.pasta[data-caso]').forEach(function(p) {
    p.addEventListener('click', function() {
      abrirCaso(parseInt(p.getAttribute('data-caso'), 10));
    });
  });
}
window.renderizarHome = renderizarHome;

function abrirCasoAleatorio() {
  var todos = CacheCasos.getTodos();
  if (todos.length === 0) return;
  abrirCaso(todos[Math.floor(Math.random() * todos.length)].id);
}

window.renderizarCampanha = function() {
  var grid = document.getElementById('campanha-grid');
  if (!grid) return;
  var caps = window.CAPITULOS_V6 || window.CAPITULOS || [];
  var est = Estado.dados;
  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  grid.innerHTML = caps.map(function(c) {
    var casos = CacheCasos.getTodos().filter(function(x) { return x.capitulo === c.id; });
    var res = casos.filter(function(x) { return est.resolvidos.indexOf(x.id) !== -1; }).length;
    var chaveNome = 'cap' + c.id + '_nome';
    var nomeTrad = window.t ? window.t(chaveNome) : c.nome;
    var nomeFinal = (nomeTrad && nomeTrad !== chaveNome) ? nomeTrad : c.nome;
    return '<div class="capitulo" data-cap="' + c.id + '">' +
      '<div class="capitulo-num">' + (lang === 'en' ? 'CHAPTER ' : 'CAPÍTULO ') + c.id + '</div>' +
      '<div class="capitulo-titulo">' + (c.icone || '📖') + ' ' + escapeHTML(nomeFinal) + '</div>' +
      '<div class="capitulo-desc">' + escapeHTML(c.desc) + '</div>' +
      '<div class="capitulo-progresso">' + res + '/' + casos.length + ' ' + (lang === 'en' ? 'cases' : 'casos') + '</div></div>';
  }).join('');

  document.querySelectorAll('.capitulo').forEach(function(el) {
    el.addEventListener('click', function() {
      var cap = parseInt(el.getAttribute('data-cap'), 10);
      var casos = CacheCasos.getTodos().filter(function(x) { return x.capitulo === cap; });
      var prox = casos.find(function(x) { return est.resolvidos.indexOf(x.id) === -1; });
      if (prox) abrirCaso(prox.id);
    });
  });
  mostrarTela('screen-campanha');
};

window.renderizarHistoricos = function() {
  var lista = document.getElementById('historicos-lista');
  if (!lista) return;
  var hist = window.CASOS_HISTORICOS || [];
  var est = Estado.dados;
  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  lista.innerHTML = hist.map(function(c) {
    var res = est.casosHistoricosResolvidos.indexOf(c.id) !== -1;
    return '<div class="missao-card ' + (res ? 'completa' : '') + '" data-hist="' + c.id + '" style="cursor:pointer">' +
      '<div class="missao-info">' +
        '<div class="missao-nome">' + c.icone + ' ' + escapeHTML(c.titulo) + ' — ' + escapeHTML(c.subtitulo || '') + '</div>' +
        '<div class="missao-desc">' + escapeHTML(c.resumo) + '</div></div>' +
      '<div class="missao-recompensa"><div class="valor">' + (res ? '✓' : '▶') + '</div>' +
      '<div class="label">' + (res ? (lang === 'en' ? 'SOLVED' : 'RESOLVIDO') : (lang === 'en' ? 'PLAY' : 'JOGAR')) + '</div></div></div>';
  }).join('') || '<p style="text-align:center;opacity:0.6">' + (lang === 'en' ? 'No historical cases.' : 'Nenhum caso histórico.') + '</p>';

  var el = document.getElementById('historicos-resolvidos');
  if (el) el.textContent = est.casosHistoricosResolvidos.length;

  document.querySelectorAll('[data-hist]').forEach(function(el) {
    el.addEventListener('click', function() { abrirCaso(parseInt(el.getAttribute('data-hist'), 10)); });
  });
  mostrarTela('screen-historicos');
};

window.renderizarGaleriaNPCs = function() {
  var lista = document.getElementById('npcs-lista');
  if (!lista) return;
  var npcs = window.NPCS_PERSISTENTES || [];
  var estado = window.npcEstado || { encontros: {}, relacoes: {} };
  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';
  var encontrados = 0;

  lista.innerHTML = npcs.map(function(n) {
    var enc = (estado.encontros[n.id] || []).length;
    var conhecido = enc > 0;
    if (conhecido) encontrados++;
    var rel = estado.relacoes[n.id] || 'neutro';
    var relIcone = { aliado: '🤝', rival: '⚔️', neutro: '👤', inimigo: '💀' }[rel] || '👤';
    return '<div class="npc-card">' +
      '<div class="npc-avatar" style="' + (conhecido ? '' : 'filter:grayscale(1);opacity:0.4') + '">' +
        (conhecido ? n.avatar : '❓') + '</div>' +
      '<div class="npc-info">' +
        '<strong>' + (conhecido ? escapeHTML(n.nome) : '???') + '</strong>' +
        '<span class="npc-titulo">' + (conhecido ? escapeHTML(n.titulo) + ' ' + relIcone : (lang === 'en' ? 'Not discovered' : 'Não descoberto')) + '</span>' +
        '<p class="npc-desc">' + (conhecido ? escapeHTML(n.desc) : (lang === 'en' ? 'Keep investigating...' : 'Continue investigando...')) + '</p></div>' +
      (conhecido ? '<button class="btn-npc-conversar" onclick="abrirDialogoNPC(\'' + n.id + '\')">' + (lang === 'en' ? '💬 Talk' : '💬 Conversar') + '</button>' : '') +
    '</div>';
  }).join('');

  var el = document.getElementById('npcs-encontrados');
  if (el) el.textContent = encontrados;
  mostrarTela('screen-npcs');
};

window.renderizarColecao = function() {
  var grid = document.getElementById('colecao-grid');
  if (!grid) return;
  var casos = CacheCasos.getTodos();
  var est = Estado.dados;
  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';
  grid.innerHTML = casos.map(function(c) {
    var res = est.resolvidos.indexOf(c.id) !== -1;
    return '<div class="carta ' + (res ? '' : 'bloqueada') + '">' +
      '<div class="carta-icone">' + (c.ehChefao ? '👑' : (c.historico ? '📜' : '📁')) + '</div>' +
      '<div class="carta-nome">' + escapeHTML(tituloCaso(c).substring(0, 30)) + '</div>' +
      '<div class="carta-num">#' + c.id + '</div></div>';
  }).join('');
  var p = document.getElementById('colecao-progresso');
  if (p) p.textContent = est.resolvidos.length + '/' + casos.length + ' ' + (lang === 'en' ? 'cases' : 'casos');
};

window.renderizarTemas = function() {
  var grid = document.getElementById('temas-grid');
  if (!grid) return;
  var temas = window.TEMAS || [];
  var est = Estado.dados;
  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  grid.innerHTML = temas.map(function(t) {
    var des = est.resolvidos.length >= (t.req || 0);
    var ativo = est.temaAtual === t.id;
    var chaveNome = 'tema_' + t.id;
    var nomeTrad = window.t ? window.t(chaveNome) : t.nome;
    var nomeFinal = (nomeTrad && nomeTrad !== chaveNome) ? nomeTrad : t.nome;
    var reqTxt = lang === 'en'
      ? (des ? (ativo ? '★ ACTIVE' : 'CLICK TO USE') : '🔒 ' + t.req + ' cases')
      : (des ? (ativo ? '★ ATIVO' : 'CLIQUE PARA USAR') : '🔒 ' + t.req + ' casos');
    return '<div class="tema-card ' + (ativo ? 'ativo' : '') + ' ' + (des ? '' : 'bloqueado') + '" data-tema="' + t.id + '">' +
      '<div class="tema-preview" style="background:' + t.preview + '"></div>' +
      '<div class="tema-nome">' + escapeHTML(nomeFinal) + '</div>' +
      '<div class="tema-req">' + reqTxt + '</div></div>';
  }).join('');

  document.querySelectorAll('.tema-card').forEach(function(el) {
    el.addEventListener('click', function() {
      var id = el.getAttribute('data-tema');
      var t = temas.find(function(x) { return x.id === id; });
      if (!t || est.resolvidos.length < (t.req || 0)) return;
      est.temaAtual = id;
      document.body.setAttribute('data-tema', id);
      Estado.salvar();
      renderizarTemas();
      if (window.tocarSom) tocarSom('acerto');
    });
  });
};

window.renderizarEstatisticas = function() {
  var grid = document.getElementById('stats-grid');
  if (!grid) return;
  var est = Estado.dados;
  var st = est.estatisticas;
  var lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  grid.innerHTML =
    '<div class="stat-box"><div class="num">' + est.resolvidos.length + '</div><div class="lbl">' + (lang === 'en' ? 'CASES' : 'CASOS') + '</div></div>' +
    '<div class="stat-box"><div class="num">' + st.acertos + '</div><div class="lbl">' + (lang === 'en' ? 'CORRECT' : 'ACERTOS') + '</div></div>' +
    '<div class="stat-box"><div class="num">' + st.erros + '</div><div class="lbl">' + (lang === 'en' ? 'WRONG' : 'ERROS') + '</div></div>' +
    '<div class="stat-box"><div class="num">' + st.dicasTotais + '</div><div class="lbl">' + (lang === 'en' ? 'HINTS' : 'DICAS') + '</div></div>' +
    '<div class="stat-box"><div class="num">' + est.pontos + '</div><div class="lbl">' + (lang === 'en' ? 'POINTS' : 'PONTOS') + '</div></div>' +
    '<div class="stat-box"><div class="num">' + est.nivel + '</div><div class="lbl">' + (lang === 'en' ? 'LEVEL' : 'NÍVEL') + '</div></div>' +
    '<div class="stat-box"><div class="num">x' + est.comboMax + '</div><div class="lbl">' + (lang === 'en' ? 'MAX COMBO' : 'COMBO MAX') + '</div></div>' +
    '<div class="stat-box"><div class="num">' + est.conquistas.length + '</div><div class="lbl">' + (lang === 'en' ? 'ACHIEVEMENTS' : 'CONQUISTAS') + '</div></div>';

  var graf = document.getElementById('graficos');
  if (graf) {
    var total = st.acertos + st.erros;
    var pct = total > 0 ? Math.round((st.acertos / total) * 100) : 0;
    graf.innerHTML = '<div class="grafico-linha"><span>' + (lang === 'en' ? 'Accuracy' : 'Precisão') + '</span>' +
      '<div class="grafico-barra"><div class="grafico-fill" style="width:' + pct + '%"></div></div>' +
      '<span>' + pct + '%</span></div>';
  }
};

window.renderizarTemporada = function() {
  if (!window.temporadaEstado) return;
  var t = window.temporadaEstado;
  var e;
  e = document.getElementById('temporada-numero'); if (e) e.textContent = t.numero;
  e = document.getElementById('temporada-dias');
  if (e && window.getDiasRestantesTemporada) e.textContent = getDiasRestantesTemporada();
  e = document.getElementById('temporada-pontos'); if (e) e.textContent = t.pontosTemporada;
  e = document.getElementById('temporada-casos'); if (e) e.textContent = t.casosResolvidosTemporada;
};

function configurarSidebar() {
  var tg = document.getElementById('menu-toggle');
  var sb = document.getElementById('sidebar');
  if (tg && sb) tg.addEventListener('click', function() { sb.classList.toggle('aberto'); });

  var bs = document.getElementById('busca-caso');
  if (bs) {
    var buscaTimer = null;
    bs.addEventListener('input', function() {
      buscaAtual = bs.value;
      if (buscaTimer) clearTimeout(buscaTimer);
      buscaTimer = setTimeout(renderizarMenu, CONFIG.BUSCA_DEBOUNCE_MS);
    });
  }

  document.querySelectorAll('.filtro-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filtro-btn').forEach(function(b) { b.classList.remove('ativo'); });
      btn.classList.add('ativo');
      filtroAtual = btn.getAttribute('data-filtro');
      renderizarMenu();
    });
  });

  document.querySelectorAll('[data-view]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      var v = a.getAttribute('data-view');
      if (v === 'status') { casoAtual = null; renderizarHome(); }
      else if (v === 'conquistas') { renderizarEstatisticas(); mostrarTela('screen-estatisticas'); }
      else if (v === 'colecao') { renderizarColecao(); mostrarTela('screen-colecao'); }
    });
  });

  var mp = document.getElementById('btn-menu-principal');
  if (mp) mp.addEventListener('click', function(e) { e.preventDefault(); voltarAoMenu(); });

  var tc = document.getElementById('btn-toggle-cutscenes');
  if (tc) tc.addEventListener('click', function(e) {
    e.preventDefault();
    if (window.toggleCutscenes) {
      var ativa = toggleCutscenes();
      if (window.notificar) {
        notificar('🎬 Cutscenes',
          ativa ? (window.idiomaAtual === 'en' ? 'Enabled' : 'Ativadas')
                : (window.idiomaAtual === 'en' ? 'Disabled' : 'Desativadas'));
      }
    }
  });

  var bt = document.getElementById('btn-iniciar-tutorial');
  if (bt) bt.addEventListener('click', function(e) {
    e.preventDefault();
    if (window.iniciarTutorial) iniciarTutorial();
  });

  var bs2 = document.getElementById('btn-salvar-jogo');
  if (bs2) bs2.addEventListener('click', function(e) {
    e.preventDefault();
    var json = JSON.stringify(Estado.dados);
    var blob = new Blob([json], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'arquivo-morto-save.json'; a.click();
    URL.revokeObjectURL(url);
  });

  var bc = document.getElementById('btn-carregar-jogo');
  if (bc) bc.addEventListener('click', function(e) {
    e.preventDefault();
    var inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'application/json';
    inp.onchange = function() {
      var f = inp.files[0];
      var r = new FileReader();
      r.onload = function() {
        try {
          var dados = JSON.parse(r.result);
          Estado.dados = Object.assign({}, ESTADO_INICIAL, dados);
          Estado.salvarImediato();
          location.reload();
        } catch(err) {
          alert(window.idiomaAtual === 'en' ? 'Invalid file.' : 'Arquivo inválido.');
        }
      };
      r.readAsText(f);
    };
    inp.click();
  });

  var br = document.getElementById('btn-reiniciar-menu');
  if (br) br.addEventListener('click', function(e) {
    e.preventDefault();
    var msg = window.idiomaAtual === 'en' ? 'Reset ALL progress?' : 'Reiniciar TODO o progresso?';
    if (confirm(msg)) { localStorage.clear(); location.reload(); }
  });
}

window.finalizarHistoria = function() {
  mostrarTela('screen-menu');
  atualizarBotaoContinuar();
};

function configurarLogin() {
  var btn = document.getElementById('btn-entrar');
  var inp = document.getElementById('codigo');
  var err = document.getElementById('erro');
  if (!btn || !inp) return;
  var t = function() {
    if (inp.value === '1994') { mostrarTela('screen-menu'); atualizarBotaoContinuar(); }
    else if (err) err.textContent = window.idiomaAtual === 'en' ? 'Wrong code.' : 'Código incorreto.';
  };
  btn.addEventListener('click', t);
  inp.addEventListener('keypress', function(e) { if (e.key === 'Enter') t(); });
}

function configurarFinais() {
  var b1 = document.getElementById('btn-gameover-reiniciar');
  if (b1) b1.addEventListener('click', function() {
    Estado.resetar();
    casoAtual = null;
    mostrarTela('screen-app');
    renderizarMenu(); renderizarHome(); atualizarHUD();
  });
  var b2 = document.getElementById('btn-vitoria-reiniciar');
  if (b2) b2.addEventListener('click', function() {
    Estado.resetar();
    casoAtual = null;
    mostrarTela('screen-menu');
  });
  var b3 = document.getElementById('btn-ranking-limpar');
  if (b3) b3.addEventListener('click', function() {
    var msg = window.idiomaAtual === 'en' ? 'Clear local ranking?' : 'Limpar ranking local?';
    if (confirm(msg)) {
      localStorage.removeItem('arquivoMorto_ranking');
      var l = document.getElementById('ranking-lista');
      if (l) l.innerHTML = '';
    }
  });
}

function init() {
  Estado.init();
  CacheCasos.invalidar();

  if (Estado.dados.temaAtual) document.body.setAttribute('data-tema', Estado.dados.temaAtual);

  configurarMenuPrincipal();
  configurarSidebar();
  configurarLogin();
  configurarFinais();
  atualizarBotaoContinuar();
  atualizarHUD();
  renderizarMenu();

  var bi = document.getElementById('btn-idioma');
  if (bi) bi.addEventListener('click', function(e) {
    e.preventDefault();
    abrirTelaIdiomas();
  });

  var mf = document.getElementById('modal-fechar');
  if (mf) mf.addEventListener('click', fecharModal);

  var mo = document.getElementById('modal-global');
  if (mo) mo.addEventListener('click', function(e) {
    if (e.target === mo) fecharModal();
  });

  var tc = document.getElementById('total-conquistas-menu');
  if (tc) tc.textContent = Estado.dados.conquistas.length;

  var somAtivo = false;
  try { somAtivo = localStorage.getItem('arquivoMorto_somAtivo') === 'true'; } catch(e) {}
  var btnSom = document.getElementById('btn-som-global');
  if (btnSom) {
    btnSom.style.display = somAtivo ? 'none' : 'block';
  }

  criarParticulas();

  if (window.aplicarTraducoes) {
    try { window.aplicarTraducoes(); } catch(e) {}
  }

  console.log('✓ Motor do jogo v7.2 inicializado (corrigido)');
}

// ✅ EXPORTAR GLOBAIS
window.estadoRef = function() { return Estado.dados; };

window.estado = new Proxy({}, {
  get: function(target, prop) {
    if (prop === '__isProxy') return true;
    if (prop === '__target') return Estado.dados;
    return Estado.dados[prop];
  },
  set: function(target, prop, val) {
    Estado.dados[prop] = val;
    return true;
  },
  has: function(target, prop) {
    return prop in Estado.dados;
  },
  ownKeys: function() {
    return Object.keys(Estado.dados);
  },
  getOwnPropertyDescriptor: function(target, prop) {
    return { enumerable: true, configurable: true, value: Estado.dados[prop] };
  }
});

window.casoAtualRef = function() { return casoAtual; };
window.salvarEstado = function() { Estado.salvar(); };
window.CacheCasos = CacheCasos;
window.Estado = Estado;

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();