// ============================================================
// ARQUIVO MORTO v7.2 — SISTEMA DE REPUTAÇÃO (CORRIGIDO)
// ============================================================

const NIVEIS_REPUTACAO = [
  {
    nivel: 1, nome: 'NOVATO', icone: '🥉',
    min: 0, max: 99,
    desc: 'Você está começando. Ninguém confia em você ainda.',
    bonus: null, bonusTexto: 'Sem bônus ainda'
  },
  {
    nivel: 2, nome: 'DETETIVE', icone: '🥈',
    min: 100, max: 299,
    desc: 'As pessoas começam a notar seu trabalho. Você já resolveu alguns casos.',
    bonus: { multiplicadorPontos: 1.10 },
    bonusTexto: '+10% de pontos em todos os casos'
  },
  {
    nivel: 3, nome: 'INVESTIGADOR', icone: '🥇',
    min: 300, max: 599,
    desc: 'Sua reputação cresce. Clientes procuram você especificamente.',
    bonus: { multiplicadorPontos: 1.20 },
    bonusTexto: '+20% de pontos em todos os casos'
  },
  {
    nivel: 4, nome: 'DETETIVE SÊNIOR', icone: '🎩',
    min: 600, max: 999,
    desc: 'Você é respeitado. A polícia pede sua ajuda em casos difíceis.',
    bonus: { multiplicadorPontos: 1.30, vidasExtras: 1 },
    bonusTexto: '+30% de pontos + 1 vida extra'
  },
  {
    nivel: 5, nome: 'LENDA', icone: '👑',
    min: 1000, max: Infinity,
    desc: 'Você é uma lenda viva. Seu nome é sinônimo de justiça.',
    bonus: { multiplicadorPontos: 1.50, vidasExtras: 2 },
    bonusTexto: '+50% de pontos + 2 vidas extras'
  }
];

let reputacaoEstado = {
  pontos: 0, historico: [], nivelAtual: 1, bonusAplicado: false
};

const REPUTACAO_EVENTOS = {
  caso_resolvido: 15,
  caso_primeira: 25,
  caso_sem_dica: 20,
  caso_rapido: 10,
  caso_contrarrelogio: 30,
  caso_perfeicao: 40,
  chefao_derrotado: 50,
  caso_errado: -10,
  tempo_esgotado: -15,
  dica_usada: -5,
  caso_repetido: -20,
  game_over: -50
};

function carregarReputacao() {
  try {
    const salvo = localStorage.getItem('arquivoMorto_reputacao');
    if (salvo) {
      const parsed = JSON.parse(salvo);
      reputacaoEstado.pontos = parsed.pontos || 0;
      reputacaoEstado.historico = parsed.historico || [];
      reputacaoEstado.nivelAtual = parsed.nivelAtual || 1;
      reputacaoEstado.bonusAplicado = parsed.bonusAplicado || false;
    }
  } catch(e) {}
  atualizarNivelReputacao(false);
}

function salvarReputacao() {
  try {
    localStorage.setItem('arquivoMorto_reputacao', JSON.stringify(reputacaoEstado));
  } catch(e) {}
}

function atualizarNivelReputacao(mostrarPopup) {
  const pontos = reputacaoEstado.pontos;
  const nivelAntes = reputacaoEstado.nivelAtual;
  let nivelNovo = 1;

  for (let i = 0; i < NIVEIS_REPUTACAO.length; i++) {
    const n = NIVEIS_REPUTACAO[i];
    if (pontos >= n.min && pontos <= n.max) {
      nivelNovo = n.nivel;
      break;
    }
  }

  reputacaoEstado.nivelAtual = nivelNovo;

  if (nivelNovo !== nivelAntes && mostrarPopup !== false) {
    setTimeout(function() {
      mostrarPopupNivel(NIVEIS_REPUTACAO[nivelNovo - 1], nivelNovo > nivelAntes);
    }, 500);
  }

  return nivelNovo;
}

function getNivelReputacao() {
  return NIVEIS_REPUTACAO[reputacaoEstado.nivelAtual - 1] || NIVEIS_REPUTACAO[0];
}

function getBonusReputacao() {
  const nivel = getNivelReputacao();
  return nivel.bonus || { multiplicadorPontos: 1, vidasExtras: 0 };
}

function adicionarReputacao(tipo, motivoCustom) {
  const valor = REPUTACAO_EVENTOS[tipo] || 0;
  if (valor === 0) return;

  reputacaoEstado.pontos += valor;
  if (reputacaoEstado.pontos < 0) reputacaoEstado.pontos = 0;

  const agora = new Date();
  const hora = String(agora.getHours()).padStart(2, '0') + ':' + String(agora.getMinutes()).padStart(2, '0');

  const motivos = {
    caso_resolvido: '📁 Caso resolvido',
    caso_primeira: '🎯 Acerto de primeira',
    caso_sem_dica: '💡 Resolvido sem dicas',
    caso_rapido: '⚡ Resolvido em menos de 60s',
    caso_contrarrelogio: '⏱️ Contrarrelógio',
    caso_perfeicao: '💎 Modo Perfeição',
    chefao_derrotado: '👑 Chefão derrotado',
    caso_errado: '❌ Acusação errada',
    tempo_esgotado: '⏰ Tempo esgotado',
    dica_usada: '💡 Dica usada',
    caso_repetido: '🔄 Caso repetido',
    game_over: '💀 Fim de jogo'
  };

  reputacaoEstado.historico.push({
    tipo: tipo, valor: valor,
    motivo: motivoCustom || motivos[tipo] || tipo,
    hora: hora
  });

  if (reputacaoEstado.historico.length > 50) {
    reputacaoEstado.historico = reputacaoEstado.historico.slice(-50);
  }

  atualizarNivelReputacao(true);
  atualizarHUDReputacao();
  mostrarNotificacaoReputacao(valor, motivos[tipo] || tipo);
  salvarReputacao();

  return valor;
}

function mostrarNotificacaoReputacao(valor, motivo) {
  let notif = document.getElementById('rep-notificacao');
  if (!notif) {
    notif = document.createElement('div');
    notif.className = 'rep-notificacao';
    notif.id = 'rep-notificacao';
    notif.setAttribute('role', 'status');
    notif.setAttribute('aria-live', 'polite');
    document.body.appendChild(notif);
  }

  const sinal = valor > 0 ? '+' : '';
  const classe = valor > 0 ? 'positivo' : 'negativo';

  notif.className = 'rep-notificacao ' + classe;
  notif.innerHTML = (valor > 0 ? '⭐ ' : '⚠️ ') + sinal + valor + ' REPUTAÇÃO · ' + motivo;

  setTimeout(function() { notif.classList.add('show'); }, 100);
  setTimeout(function() { notif.classList.remove('show'); }, 3000);

  if (typeof tocarSom === 'function') {
    if (valor > 0) tocarSom('acerto');
    else tocarSom('erro');
  }
}

function mostrarPopupNivel(nivel, subiu) {
  let popup = document.getElementById('rep-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.className = 'rep-popup';
    popup.id = 'rep-popup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-modal', 'true');
    document.body.appendChild(popup);
  }

  popup.innerHTML =
    '<div class="rep-popup-icone">' + nivel.icone + '</div>' +
    '<div class="rep-popup-titulo">' + (subiu ? '⭐ SUBIU DE NÍVEL!' : '⚠️ DESCEU DE NÍVEL') + '</div>' +
    '<div class="rep-popup-nivel">' + nivel.nome + '</div>' +
    '<div class="rep-popup-bonus">' + nivel.bonusTexto + '</div>' +
    '<button class="rep-popup-btn" onclick="fecharPopupNivel()">CONTINUAR</button>';

  setTimeout(function() { popup.classList.add('show'); }, 100);

  if (typeof tocarSom === 'function') {
    if (subiu) tocarSom('vitoria');
    else tocarSom('gameover');
  }

  // ✅ CORRIGIDO: usa estadoRef()
  if (subiu && nivel.bonus && nivel.bonus.vidasExtras) {
    var est = window.estadoRef ? window.estadoRef() : window.estado;
    if (est) {
      est.vidas += nivel.bonus.vidasExtras;
      if (typeof atualizarHUD === 'function') atualizarHUD();
    }
  }
}

function fecharPopupNivel() {
  const popup = document.getElementById('rep-popup');
  if (popup) {
    popup.classList.remove('show');
    setTimeout(function() {
      if (popup.parentNode) popup.parentNode.removeChild(popup);
    }, 500);
  }
}

function atualizarHUDReputacao() {
  const hud = document.getElementById('hud-reputacao');
  if (!hud) return;

  const nivel = getNivelReputacao();
  hud.className = 'hud-reputacao nivel-' + nivel.nivel;

  const valorEl = hud.querySelector('.rep-valor');
  if (valorEl) valorEl.textContent = reputacaoEstado.pontos;

  const nivelEl = hud.querySelector('.rep-nivel');
  if (nivelEl) nivelEl.textContent = nivel.icone + ' ' + nivel.nome;

  const iconeEl = hud.querySelector('.rep-icone');
  if (iconeEl) iconeEl.textContent = '⭐';
}

function criarHUDReputacao() {
  const antigo = document.getElementById('hud-reputacao');
  if (antigo) antigo.remove();

  const hud = document.getElementById('hud-vidas');
  if (!hud) return;

  const repHud = document.createElement('span');
  repHud.className = 'hud-reputacao nivel-1';
  repHud.id = 'hud-reputacao';
  repHud.onclick = abrirTelaReputacao;
  repHud.innerHTML =
    '<span class="rep-icone">⭐</span>' +
    '<span class="rep-valor">0</span>' +
    '<span class="rep-nivel">🥉 NOVATO</span>';
  repHud.title = 'Clique para ver detalhes da reputação';

  hud.parentNode.insertBefore(repHud, hud.nextSibling);
  atualizarHUDReputacao();
}

function abrirTelaReputacao() {
  if (typeof tocarSom === 'function') tocarSom('clique');

  let tela = document.getElementById('screen-reputacao');
  if (!tela) {
    tela = document.createElement('section');
    tela.className = 'screen';
    tela.id = 'screen-reputacao';
    document.body.appendChild(tela);
  }

  renderizarTelaReputacao();
  if (typeof mostrarTela === 'function') {
    mostrarTela('screen-reputacao');
  }
}

function renderizarTelaReputacao() {
  const tela = document.getElementById('screen-reputacao');
  if (!tela) return;

  const nivel = getNivelReputacao();
  const pontos = reputacaoEstado.pontos;

  let progressoTexto = '';
  let progressoPct = 0;
  let falta = 0;

  if (nivel.max === Infinity) {
    progressoTexto = 'NÍVEL MÁXIMO ALCANÇADO';
    progressoPct = 100;
  } else {
    const range = nivel.max - nivel.min;
    const progresso = pontos - nivel.min;
    progressoPct = Math.round((progresso / range) * 100);
    falta = nivel.max - pontos + 1;
    progressoTexto = pontos + ' / ' + (nivel.max + 1) + ' (' + falta + ' para o próximo)';
  }

  const positivos = reputacaoEstado.historico.filter(function(h) { return h.valor > 0; });
  const negativos = reputacaoEstado.historico.filter(function(h) { return h.valor < 0; });
  const totalGanho = positivos.reduce(function(acc, h) { return acc + h.valor; }, 0);
  const totalPerdido = negativos.reduce(function(acc, h) { return acc + h.valor; }, 0);

  let html =
    '<div class="reputacao-box">' +
      '<h2 class="reputacao-titulo">⭐ REPUTAÇÃO</h2>' +
      '<p class="reputacao-sub">Sua fama como detetive</p>' +
      '<div class="nivel-atual-box">' +
        '<span class="nivel-icone">' + nivel.icone + '</span>' +
        '<div class="nivel-nome">' + nivel.nome + '</div>' +
        '<div class="nivel-desc">' + nivel.desc + '</div>' +
        '<div class="nivel-bonus">🎁 ' + nivel.bonusTexto + '</div>' +
      '</div>' +
      '<div class="rep-progresso-box">' +
        '<div class="rep-progresso-label">' +
          '<span>PROGRESSO</span>' +
          '<span>' + progressoTexto + '</span>' +
        '</div>' +
        '<div class="rep-progresso-barra">' +
          '<div class="rep-progresso-fill" style="width:' + progressoPct + '%">' + progressoPct + '%</div>' +
        '</div>' +
      '</div>' +
      '<div class="rep-stats-grid">' +
        '<div class="rep-stat"><div class="rep-stat-num">' + pontos + '</div><div class="rep-stat-lbl">PONTOS TOTAIS</div></div>' +
        '<div class="rep-stat"><div class="rep-stat-num positivo">+' + totalGanho + '</div><div class="rep-stat-lbl">GANHOS</div></div>' +
        '<div class="rep-stat"><div class="rep-stat-num negativo">' + totalPerdido + '</div><div class="rep-stat-lbl">PERDAS</div></div>' +
        '<div class="rep-stat"><div class="rep-stat-num">' + positivos.length + '</div><div class="rep-stat-lbl">AÇÕES POSITIVAS</div></div>' +
      '</div>' +
      '<h3 style="font-family:var(--font-titulo);color:var(--dourado);letter-spacing:2px;margin:2rem 0 1rem;font-size:1rem">🏅 NÍVEIS DE REPUTAÇÃO</h3>' +
      '<div class="niveis-lista">';

  NIVEIS_REPUTACAO.forEach(function(n) {
    const conquistado = pontos >= n.min;
    const atual = n.nivel === reputacaoEstado.nivelAtual;

    let statusClass, statusTexto;
    if (atual) { statusClass = 'atual'; statusTexto = '★ ATUAL'; }
    else if (conquistado) { statusClass = 'conquistado'; statusTexto = '✓ CONQUISTADO'; }
    else { statusClass = 'bloqueado'; statusTexto = '🔒 ' + n.min + ' pts'; }

    html +=
      '<div class="nivel-item ' + statusClass + '">' +
        '<div class="nivel-item-icone">' + n.icone + '</div>' +
        '<div class="nivel-item-info">' +
          '<div class="nivel-item-nome">' + n.nome + '</div>' +
          '<div class="nivel-item-req">' + (n.max === Infinity ? n.min + '+ pts' : n.min + ' - ' + n.max + ' pts') + '</div>' +
        '</div>' +
        '<span class="nivel-item-status ' + statusClass + '">' + statusTexto + '</span>' +
      '</div>';
  });

  html += '</div>';

  if (reputacaoEstado.historico.length > 0) {
    html +=
      '<div class="rep-historico">' +
        '<div class="rep-historico-titulo">📜 HISTÓRICO RECENTE</div>' +
        '<div class="rep-historico-lista">';

    const historicoRecente = reputacaoEstado.historico.slice(-15).reverse();

    historicoRecente.forEach(function(h) {
      const classe = h.valor > 0 ? 'positivo' : 'negativo';
      const sinal = h.valor > 0 ? '+' : '';
      html +=
        '<div class="rep-hist-item ' + classe + '">' +
          '<span class="motivo">' + h.motivo + '</span>' +
          '<span class="valor">' + sinal + h.valor + '</span>' +
          '<span class="data">' + h.hora + '</span>' +
        '</div>';
    });

    html += '</div></div>';
  }

  html += '<button class="gerador-voltar" style="width:100%;margin-top:1.5rem" onclick="fecharTelaReputacao()">← VOLTAR</button></div>';

  tela.innerHTML = html;
}

function fecharTelaReputacao() {
  if (typeof tocarSom === 'function') tocarSom('clique');
  if (typeof mostrarTela === 'function') {
    mostrarTela('screen-app');
  }
}

function aplicarBonusReputacao(pontosBase) {
  const bonus = getBonusReputacao();
  return Math.floor(pontosBase * bonus.multiplicadorPontos);
}

// ✅ CORRIGIDO: usa estadoRef()
function aplicarBonusVidasIniciais() {
  const bonus = getBonusReputacao();
  var est = window.estadoRef ? window.estadoRef() : window.estado;
  if (bonus.vidasExtras && est) {
    est.vidas += bonus.vidasExtras;
    console.log('⭐ Bônus de reputação: +' + bonus.vidasExtras + ' vidas iniciais');
  }
}

function iniciarReputacao() {
  carregarReputacao();
  criarHUDReputacao();

  console.log('✓ Sistema de reputação carregado (v7.2)');
  console.log('  Nível: ' + getNivelReputacao().nome + ' (' + reputacaoEstado.pontos + ' pts)');
}

window.iniciarReputacao = iniciarReputacao;
window.adicionarReputacao = adicionarReputacao;
window.abrirTelaReputacao = abrirTelaReputacao;
window.fecharTelaReputacao = fecharTelaReputacao;
window.fecharPopupNivel = fecharPopupNivel;
window.aplicarBonusReputacao = aplicarBonusReputacao;
window.aplicarBonusVidasIniciais = aplicarBonusVidasIniciais;
window.getNivelReputacao = getNivelReputacao;
window.getBonusReputacao = getBonusReputacao;
window.reputacaoEstado = reputacaoEstado;
window.NIVEIS_REPUTACAO = NIVEIS_REPUTACAO;

console.log('✓ Reputação carregada (v7.2)');