// ============================================================
// ARQUIVO MORTO v8.1 — EXTRAS (FIX vibrate)
// ============================================================

const CONFIG_EXTRAS = {
  temporadaAtual: 1,
  diasTemporada: 30,
  moedaInicial: 0,
  versao: '8.1'
};

let estadoExtras = carregarExtras();

function carregarExtras() {
  try {
    const salvo = localStorage.getItem('arquivoMorto_extras');
    if (salvo) return JSON.parse(salvo);
  } catch(e) {}

  return {
    moedas: 0, missoesDiarias: [], missoesSemanais: [],
    ultimaAtualizacao: null, ultimaTemporadaReset: Date.now(),
    lootsAbertos: 0, badges: [],
    temporada: CONFIG_EXTRAS.temporadaAtual, notificacoesAtivas: false
  };
}

function salvarExtras() {
  try {
    localStorage.setItem('arquivoMorto_extras', JSON.stringify(estadoExtras));
  } catch(e) {}
}

function tt(chave, fallback) {
  if (typeof window.t === 'function') {
    var v = window.t(chave);
    if (v && v !== chave) return v;
  }
  return fallback || chave;
}

function adicionarMoedas(qtd) {
  estadoExtras.moedas += qtd;
  salvarExtras();
  atualizarMoedaUI();
  if (typeof atualizarHUD === 'function') atualizarHUD();
}

function getMoedas() { return estadoExtras.moedas; }

function atualizarMoedaUI() {
  const el = document.getElementById('moeda-valor');
  if (el) el.textContent = estadoExtras.moedas;
  const el2 = document.getElementById('hud-moedas');
  if (el2) el2.textContent = estadoExtras.moedas;
}

const MISSOES_DISPONIVEIS = {
  diarias: [
    { id: 'd1', nome: 'Primeiro Caso', desc: 'Resolva 1 caso hoje', meta: 1, progresso: 0, recompensa: 50, tipo: 'casos' },
    { id: 'd2', nome: 'Detetive Ágil', desc: 'Resolva 3 casos hoje', meta: 3, progresso: 0, recompensa: 150, tipo: 'casos' },
    { id: 'd3', nome: 'Sem Dicas', desc: 'Resolva 1 caso sem usar dicas', meta: 1, progresso: 0, recompensa: 100, tipo: 'sem_dica' },
    { id: 'd4', nome: 'Na Mosca', desc: 'Acerte 1 caso de primeira', meta: 1, progresso: 0, recompensa: 80, tipo: 'primeira' },
    { id: 'd5', nome: 'Coletor', desc: 'Junte 5 provas em um caso', meta: 5, progresso: 0, recompensa: 60, tipo: 'provas' }
  ],
  semanais: [
    { id: 's1', nome: 'Investigador', desc: 'Resolva 10 casos esta semana', meta: 10, progresso: 0, recompensa: 500, tipo: 'casos' },
    { id: 's2', nome: 'Perfeccionista', desc: 'Acerte 5 casos de primeira', meta: 5, progresso: 0, recompensa: 400, tipo: 'primeira' },
    { id: 's3', nome: 'Sob Pressão', desc: 'Resolva 3 casos no modo contrarrelógio', meta: 3, progresso: 0, recompensa: 350, tipo: 'contra' },
    { id: 's4', nome: 'Interrogador', desc: 'Faça 20 perguntas em interrogatórios', meta: 20, progresso: 0, recompensa: 300, tipo: 'perguntas' }
  ]
};

var TIPOS_MISSAO_VALIDOS = ['casos', 'sem_dica', 'primeira', 'provas', 'contra', 'perguntas'];

function carregarMissoesDiarias() {
  const hoje = new Date().toLocaleDateString('pt-BR');
  if (estadoExtras.ultimaAtualizacao !== hoje) {
    estadoExtras.missoesDiarias = MISSOES_DISPONIVEIS.diarias.map(function(m) {
      return Object.assign({}, m);
    });
    estadoExtras.ultimaAtualizacao = hoje;
    salvarExtras();
  }
  return estadoExtras.missoesDiarias;
}

function carregarMissoesSemanais() {
  if (!estadoExtras.missoesSemanais || estadoExtras.missoesSemanais.length === 0) {
    estadoExtras.missoesSemanais = MISSOES_DISPONIVEIS.semanais.map(function(m) {
      return Object.assign({}, m);
    });
    salvarExtras();
  }
  return estadoExtras.missoesSemanais;
}

function atualizarProgressoMissao(tipo, qtd) {
  if (TIPOS_MISSAO_VALIDOS.indexOf(tipo) === -1) {
    console.warn('⚠️ Tipo de missão inválido:', tipo);
    return;
  }
  qtd = qtd || 1;

  carregarMissoesDiarias().forEach(function(m) {
    if (m.tipo === tipo && m.progresso < m.meta) {
      m.progresso = Math.min(m.meta, m.progresso + qtd);
    }
  });
  carregarMissoesSemanais().forEach(function(m) {
    if (m.tipo === tipo && m.progresso < m.meta) {
      m.progresso = Math.min(m.meta, m.progresso + qtd);
    }
  });
  salvarExtras();
  verificarMissoesCompletas();
}

function verificarMissoesCompletas() {
  let completa = false;
  carregarMissoesDiarias().forEach(function(m) {
    if (m.progresso >= m.meta && !m.coletada) completa = true;
  });
  if (completa) {
    notificar(tt('notif_missao_completa', '🎯 Missão Completa!'), tt('notif_recompensa_pronta', 'Você tem recompensas para coletar.'));
  }
}

function coletarRecompensaMissao(id, tipo) {
  const lista = tipo === 'diaria' ? estadoExtras.missoesDiarias : estadoExtras.missoesSemanais;
  const missao = lista.find(function(m) { return m.id === id; });

  if (!missao || missao.coletada || missao.progresso < missao.meta) return;

  missao.coletada = true;
  adicionarMoedas(missao.recompensa);

  if (typeof tocarSom === 'function') tocarSom('acerto');
  notificar(tt('missoes_recompensa_coletada', '💰 Recompensa!'), '+' + missao.recompensa + ' ' + tt('missao_moedas', 'MOEDAS'));

  salvarExtras();
  renderizarMissoes();
}

function renderizarMissoes() {
  const container = document.getElementById('missoes-container');
  if (!container) return;

  let html =
    '<div class="missoes-header">' +
      '<div class="missoes-titulo">' + tt('missoes_titulo', '🎯 MISSÕES') + '</div>' +
      '<div class="missoes-moeda">💰 <span id="moeda-valor">' + estadoExtras.moedas + '</span> ' + tt('missao_moedas', 'MOEDAS') + '</div>' +
    '</div>' +
    '<div class="missoes-tabs">' +
      '<button class="missao-tab ativo" data-tab="diarias">' + tt('missoes_diarias', '📅 DIÁRIAS') + '</button>' +
      '<button class="missao-tab" data-tab="semanais">' + tt('missoes_semanais', '📆 SEMANAIS') + '</button>' +
    '</div>' +
    '<div id="missoes-lista"></div>';

  container.innerHTML = html;

  container.querySelectorAll('.missao-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      container.querySelectorAll('.missao-tab').forEach(function(t) { t.classList.remove('ativo'); });
      tab.classList.add('ativo');
      renderizarListaMissoes(tab.getAttribute('data-tab'));
    });
  });

  renderizarListaMissoes('diarias');
}

function renderizarListaMissoes(tipo) {
  const lista = document.getElementById('missoes-lista');
  if (!lista) return;

  const missoes = tipo === 'diarias' ? carregarMissoesDiarias() : carregarMissoesSemanais();
  const lblColetar = tt('missao_coletar', '🎁 COLETAR');
  const lblColetada = tt('missao_coletada', '✓ COLETADA');
  const lblAndamento = tt('missao_andamento', 'EM ANDAMENTO');
  const lblMoedas = tt('missao_moedas', 'MOEDAS');

  lista.innerHTML = '';

  missoes.forEach(function(m) {
    const pct = Math.round((m.progresso / m.meta) * 100);
    const completa = m.progresso >= m.meta;

    const div = document.createElement('div');
    div.className = 'missao-card ' + (m.coletada ? 'completa' : '');
    div.innerHTML =
      '<div class="missao-info">' +
        '<div class="missao-nome">' + (typeof escapeHTML === 'function' ? escapeHTML(m.nome) : m.nome) + '</div>' +
        '<div class="missao-desc">' + (typeof escapeHTML === 'function' ? escapeHTML(m.desc) : m.desc) + '</div>' +
        '<div class="missao-progresso"><div class="missao-prog-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="missao-prog-texto">' + m.progresso + ' / ' + m.meta + '</div>' +
      '</div>' +
      '<div class="missao-recompensa">' +
        '<div class="valor">💰 ' + m.recompensa + '</div>' +
        '<div class="label">' + lblMoedas + '</div>' +
      '</div>' +
      (m.coletada
        ? '<button class="btn-coletar-missao" disabled>' + lblColetada + '</button>'
        : (completa
            ? '<button class="btn-coletar-missao" onclick="coletarRecompensaMissao(\'' + m.id + '\', \'' + (tipo === 'diarias' ? 'diaria' : 'semanal') + '\')">' + lblColetar + '</button>'
            : '<button class="btn-coletar-missao" disabled>' + lblAndamento + '</button>'
          )
      );
    lista.appendChild(div);
  });
}

function verificarTemporada() {
  const agora = Date.now();
  const decorrido = agora - estadoExtras.ultimaTemporadaReset;
  const diasPassados = Math.floor(decorrido / (1000 * 60 * 60 * 24));

  if (diasPassados >= CONFIG_EXTRAS.diasTemporada) {
    estadoExtras.temporada++;
    estadoExtras.ultimaTemporadaReset = agora;
    salvarExtras();
    notificar('🏆 Nova Temporada!', 'Temporada ' + estadoExtras.temporada + ' começou!');
  }
}

function getDiasRestantesTemporada() {
  const agora = Date.now();
  const decorrido = agora - estadoExtras.ultimaTemporadaReset;
  const diasPassados = Math.floor(decorrido / (1000 * 60 * 60 * 24));
  return Math.max(0, CONFIG_EXTRAS.diasTemporada - diasPassados);
}

const LOOT_TABLE = [
  { icone: '💰', chaveNome: 'loot_moedas_100', nomeFallback: '100 Moedas', chaveDesc: 'loot_moedas_100_desc', descFallback: 'Um bônus em dinheiro.', raridade: 'comum', moedas: 100 },
  { icone: '💎', chaveNome: 'loot_moedas_250', nomeFallback: '250 Moedas', chaveDesc: 'loot_moedas_250_desc', descFallback: 'Uma quantia respeitável.', raridade: 'rara', moedas: 250 },
  { icone: '👑', chaveNome: 'loot_moedas_500', nomeFallback: '500 Moedas', chaveDesc: 'loot_moedas_500_desc', descFallback: 'Recompensa de elite.', raridade: 'epica', moedas: 500 },
  { icone: '🏆', chaveNome: 'loot_moedas_1000', nomeFallback: '1000 Moedas', chaveDesc: 'loot_moedas_1000_desc', descFallback: 'Uma fortuna completa.', raridade: 'lendaria', moedas: 1000 },
  { icone: '❤️', chaveNome: 'loot_vida', nomeFallback: '+1 Vida', chaveDesc: 'loot_vida_desc', descFallback: 'Uma vida extra.', raridade: 'rara', vida: 1 },
  { icone: '⭐', chaveNome: 'loot_xp', nomeFallback: '+500 XP', chaveDesc: 'loot_xp_desc', descFallback: 'Experiência bônus.', raridade: 'comum', xp: 500 },
  { icone: '🎴', chaveNome: 'loot_carta', nomeFallback: 'Carta Aleatória', chaveDesc: 'loot_carta_desc', descFallback: 'Uma carta colecionável.', raridade: 'epica', carta: true }
];

function abrirCaixa() {
  if (estadoExtras.moedas < 100) {
    notificar('💰 ' + tt('loot_caixa_moedas', 'Você tem') + ' ' + estadoExtras.moedas + ' ' + tt('missao_moedas', 'MOEDAS'), 'Precisa de 100 moedas para abrir uma caixa.');
    return;
  }

  estadoExtras.moedas -= 100;
  estadoExtras.lootsAbertos++;
  salvarExtras();
  atualizarMoedaUI();

  const total = LOOT_TABLE.reduce(function(acc, l) {
    if (l.raridade === 'comum') return acc + 60;
    if (l.raridade === 'rara') return acc + 25;
    if (l.raridade === 'epica') return acc + 12;
    return acc + 3;
  }, 0);

  let r = Math.random() * total;
  let loot = LOOT_TABLE[0];

  for (let i = 0; i < LOOT_TABLE.length; i++) {
    const peso = LOOT_TABLE[i].raridade === 'comum' ? 60 :
                 LOOT_TABLE[i].raridade === 'rara' ? 25 :
                 LOOT_TABLE[i].raridade === 'epica' ? 12 : 3;
    if (r < peso) { loot = LOOT_TABLE[i]; break; }
    r -= peso;
  }

  mostrarLoot(loot);
  if (typeof tocarSom === 'function') tocarSom('vitoria');
}

function mostrarLoot(loot) {
  const nomeTraduzido = tt(loot.chaveNome, loot.nomeFallback);
  const descTraduzido = tt(loot.chaveDesc, loot.descFallback);
  const raridadeTraduzida = tt('loot_raridade_' + loot.raridade, loot.raridade.toUpperCase());

  const popup = document.createElement('div');
  popup.className = 'loot-popup show';
  popup.setAttribute('role', 'dialog');
  popup.setAttribute('aria-modal', 'true');
  popup.innerHTML =
    '<div class="loot-box">' +
      '<div class="loot-titulo">' + tt('loot_titulo', '🎁 RECOMPENSA') + '</div>' +
      '<div class="loot-raridade ' + loot.raridade + '">' + raridadeTraduzida + '</div>' +
      '<div class="loot-item">' + loot.icone + '</div>' +
      '<div class="loot-nome">' + nomeTraduzido + '</div>' +
      '<div class="loot-desc">' + descTraduzido + '</div>' +
      '<button class="modal-fechar" onclick="fecharLoot()">' + tt('loot_coletar', 'COLETAR') + '</button>' +
    '</div>';

  document.body.appendChild(popup);

  if (loot.moedas) adicionarMoedas(loot.moedas);
  if (loot.xp && typeof adicionarXP === 'function') adicionarXP(loot.xp);
  if (loot.vida) {
    var est = window.estadoRef ? window.estadoRef() : window.estado;
    if (est) {
      est.vidas++;
      if (typeof atualizarHUD === 'function') atualizarHUD();
    }
  }
}

function fecharLoot() {
  const popup = document.querySelector('.loot-popup');
  if (popup) popup.remove();
}

// ✅ v8.1: FIX vibrate — usa função segura global
function notificar(titulo, msg) {
  let toast = document.getElementById('notif-toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'notif-toast';
    toast.id = 'notif-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.innerHTML =
    '<div class="titulo">' + titulo + '</div>' +
    '<div class="msg">' + msg + '</div>';

  toast.classList.add('show');

  setTimeout(function() {
    toast.classList.remove('show');
  }, 4000);

  // ✅ FIX: silenciosamente ignora se não houver interação
  if (typeof window.vibrarSeguro === 'function') {
    window.vibrarSeguro(50);
  }
}

function mostrarBoasVindas() {
  const agora = new Date();
  const hora = agora.getHours();
  let saudacao = 'Boa noite';
  if (hora < 12) saudacao = 'Bom dia';
  else if (hora < 18) saudacao = 'Boa tarde';

  const missoes = carregarMissoesDiarias();
  const completas = missoes.filter(function(m) { return m.progresso >= m.meta && !m.coletada; }).length;

  let msg = saudacao + ', detetive.';
  if (completas > 0) {
    msg += ' Você tem ' + completas + ' missão(ões) prontas para coletar!';
  }

  const hoje = agora.toLocaleDateString('pt-BR');
  const ultimoAcesso = localStorage.getItem('arquivoMorto_ultimoAcesso');

  if (ultimoAcesso !== hoje) {
    localStorage.setItem('arquivoMorto_ultimoAcesso', hoje);
    notificar(tt('notif_novo_dia', '📅 Novo Dia de Investigação'), msg);
  }
}

// ===== PWA =====
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('btn-instalar-pwa');
  if (btn) btn.classList.add('show');
});

function instalarPWA() {
  if (!deferredPrompt) {
    notificar('ℹ️ PWA', 'Seu navegador não suporta instalação ou já está instalado.');
    return;
  }

  deferredPrompt.prompt();

  deferredPrompt.userChoice.then(function(choice) {
    if (choice.outcome === 'accepted') {
      notificar(tt('notif_instalado', '✅ Instalado!'), tt('notif_instalado_msg', 'O ARQUIVO MORTO agora está no seu dispositivo.'));
    }
    deferredPrompt = null;
    const btn = document.getElementById('btn-instalar-pwa');
    if (btn) btn.classList.remove('show');
  });
}

function compartilharResultado() {
  var est = window.estadoRef ? window.estadoRef() : (window.estado || {});
  const total = (window.getCasosTodos ? getCasosTodos().length : 104);

  if (window.aplicarEventoFaccao) aplicarEventoFaccao('compartilhar');

  const texto = '🕵️ Joguei ARQUIVO MORTO!\n\n' +
    '📁 Casos resolvidos: ' + (est.resolvidos ? est.resolvidos.length : 0) + '/' + total + '\n' +
    '⭐ Pontuação: ' + (est.pontos || 0) + ' pts\n' +
    '🏅 Nível: ' + (est.nivel || 1) + '\n' +
    '🏆 Conquistas: ' + (est.conquistas ? est.conquistas.length : 0) + '\n\n' +
    'Jogue você também! 🎮';

  if (navigator.share) {
    navigator.share({
      title: 'ARQUIVO MORTO — O Jogo',
      text: texto,
      url: window.location.href
    }).catch(function() {});
  } else {
    navigator.clipboard.writeText(texto).then(function() {
      notificar(tt('notif_copiado', '📋 Copiado!'), tt('notif_copiado_msg', 'Resultado copiado para a área de transferência.'));
    });
  }
}

function mostrarLojaLoot() {
  const ov = document.createElement('div');
  ov.className = 'loot-popup show';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.innerHTML =
    '<div class="loot-box">' +
      '<div class="loot-titulo">' + tt('loot_caixa_titulo', '🎁 CAIXA DE RECOMPENSA') + '</div>' +
      '<div class="loot-desc">' + tt('loot_caixa_desc', 'Abra uma caixa por <strong>100 moedas</strong> e ganhe recompensas aleatórias!') + '</div>' +
      '<div class="caixa-recompensa" onclick="abrirCaixa()">📦</div>' +
      '<div style="color:var(--dourado);font-family:var(--font-tech);font-size:0.9rem;margin:1rem 0">' +
        '💰 ' + tt('loot_caixa_moedas', 'Você tem') + ' <strong>' + estadoExtras.moedas + '</strong> ' + tt('missao_moedas', 'MOEDAS') +
      '</div>' +
      '<button class="modal-fechar" onclick="fecharLoot()">' + tt('loot_coletar', 'FECHAR') + '</button>' +
    '</div>';
  document.body.appendChild(ov);
}

function iniciarExtras() {
  verificarTemporada();
  carregarMissoesDiarias();
  carregarMissoesSemanais();
  mostrarBoasVindas();
  atualizarMoedaUI();

  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('✓ Rodando como PWA instalado');
  }

  console.log('✓ Sistema de extras carregado (v8.1)');
  console.log('✓ Temporada ' + estadoExtras.temporada);
  console.log('✓ Moedas: ' + estadoExtras.moedas);
}

window.iniciarExtras = iniciarExtras;
window.renderizarMissoes = renderizarMissoes;
window.coletarRecompensaMissao = coletarRecompensaMissao;
window.abrirCaixa = abrirCaixa;
window.fecharLoot = fecharLoot;
window.notificar = notificar;
window.adicionarMoedas = adicionarMoedas;
window.atualizarProgressoMissao = atualizarProgressoMissao;
window.instalarPWA = instalarPWA;
window.compartilharResultado = compartilharResultado;
window.mostrarLojaLoot = mostrarLojaLoot;
window.getDiasRestantesTemporada = getDiasRestantesTemporada;
window.getMoedas = getMoedas;
window.estadoExtras = estadoExtras;

console.log('✓ Extras carregados (v8.1 — FIX vibrate)');