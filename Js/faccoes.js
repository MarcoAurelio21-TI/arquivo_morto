// ============================================================
// ARQUIVO MORTO v8.0 — SISTEMA DE FACÇÕES
// ============================================================
// 3 facções: Polícia, Imprensa, Submundo (0-100 cada).
// Bônus passivos ao atingir 90+.
// ============================================================

const FACCOES_CONFIG = {
  policia: {
    id: 'policia',
    nome: 'Polícia',
    icone: '🚔',
    cor: '#3a6ea5',
    desc: 'A lei e a ordem.',
    bonus: {
      pontos: '+10% pontos ao resolver casos',
      dicas: 'Acesso a arquivos confidenciais (dicas grátis)'
    },
    nivel90: 'arquivos_confidenciais',
    nivel50: 'reconhecimento'
  },
  imprensa: {
    id: 'imprensa',
    nome: 'Imprensa',
    icone: '📰',
    cor: '#d4a83a',
    desc: 'A voz pública.',
    bonus: {
      pontos: '+15% pontos em casos resolvidos',
      notificacao: 'Divulgação gratuita de conquistas'
    },
    nivel90: 'manchete_nacional',
    nivel50: 'coluna_diaria'
  },
  submundo: {
    id: 'submundo',
    nome: 'Submundo',
    icone: '🕶️',
    cor: '#7a3aa5',
    desc: 'O crime organizado.',
    bonus: {
      interrogatorio: 'Subornos disponíveis (pular interrogatório)',
      cartas: 'Desconto em cartas na loja'
    },
    nivel90: 'rei_do_crime',
    nivel50: 'contatos'
  }
};

let faccoesEstado = {
  valores: { policia: 30, imprensa: 30, submundo: 30 },
  bonusAtivos: {},
  historico: []
};

// ============================================================
// CARREGAR / SALVAR
// ============================================================
function carregarFaccoes() {
  try {
    const salvo = localStorage.getItem('arquivoMorto_faccoes');
    if (salvo) {
      const parsed = JSON.parse(salvo);
      faccoesEstado.valores = parsed.valores || faccoesEstado.valores;
      faccoesEstado.historico = parsed.historico || [];
      faccoesEstado.bonusAtivos = parsed.bonusAtivos || {};
    }
  } catch(e) {}
}

function salvarFaccoes() {
  try {
    localStorage.setItem('arquivoMorto_faccoes', JSON.stringify(faccoesEstado));
  } catch(e) {}
}

// ============================================================
// ALTERAR VALOR DE UMA FACÇÃO
// ============================================================
function alterarFaccao(faccaoId, delta, motivo) {
  if (!faccoesEstado.valores[faccaoId] !== undefined && !FACCOES_CONFIG[faccaoId]) return;

  const antes = faccoesEstado.valores[faccaoId];
  let novo = Math.max(0, Math.min(100, antes + delta));
  faccoesEstado.valores[faccaoId] = novo;

  // Registra histórico
  const agora = new Date();
  faccoesEstado.historico.push({
    faccao: faccaoId,
    delta: delta,
    total: novo,
    motivo: motivo || 'Ação',
    hora: agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  });

  if (faccoesEstado.historico.length > 100) {
    faccoesEstado.historico = faccoesEstado.historico.slice(-100);
  }

  // Verifica bônus
  verificarBonusFaccao(faccaoId, antes, novo);

  salvarFaccoes();

  // Notifica se houve mudança relevante
  if (Math.abs(delta) >= 5 && typeof notificar === 'function') {
    const cfg = FACCOES_CONFIG[faccaoId];
    const sinal = delta > 0 ? '+' : '';
    notificar(
      cfg.icone + ' ' + cfg.nome,
      sinal + delta + ' · ' + motivo
    );
  }

  return novo;
}

function verificarBonusFaccao(faccaoId, antes, novo) {
  const cfg = FACCOES_CONFIG[faccaoId];
  if (!cfg) return;

  if (novo >= 90 && antes < 90) {
    faccoesEstado.bonusAtivos[faccaoId] = cfg.nivel90;
    if (typeof notificar === 'function') {
      notificar('🌟 BÔNUS DESBLOQUEADO!', cfg.nome + ' · ' + cfg.bonus[Object.keys(cfg.bonus)[0]]);
    }
  } else if (novo >= 50 && antes < 50) {
    faccoesEstado.bonusAtivos[faccaoId] = cfg.nivel50;
  } else if (novo < 50 && antes >= 50) {
    delete faccoesEstado.bonusAtivos[faccaoId];
  }
}

// ============================================================
// BÔNUS DE PONTOS COMBINADOS
// ============================================================
function calcularBonusFaccoes() {
  let mult = 1.0;
  if (faccoesEstado.valores.policia >= 50) mult += 0.10;
  if (faccoesEstado.valores.policia >= 90) mult += 0.10;
  if (faccoesEstado.valores.imprensa >= 50) mult += 0.15;
  if (faccoesEstado.valores.imprensa >= 90) mult += 0.15;
  return mult;
}

// ============================================================
// EVENTOS AUTOMÁTICOS
// ============================================================
function aplicarEventoFaccao(tipo, caso) {
  switch (tipo) {
    case 'resolver_caso':
      alterarFaccao('policia', +10, 'Caso resolvido');
      break;
    case 'usar_dica':
      alterarFaccao('imprensa', -5, 'Dica usada');
      alterarFaccao('policia', -3, 'Dica usada');
      break;
    case 'usar_ler_mente':
      alterarFaccao('policia', -10, 'Uso de carta Ler Mente');
      alterarFaccao('submundo', +5, 'Uso de carta Ler Mente');
      break;
    case 'pressionar':
      alterarFaccao('policia', -5, 'Pressão em suspeito');
      alterarFaccao('submundo', +10, 'Pressão em suspeito');
      break;
    case 'compartilhar':
      alterarFaccao('imprensa', +10, 'Compartilhamento');
      break;
    case 'julgamento_vitoria':
      alterarFaccao('policia', +5, 'Julgamento vencido');
      alterarFaccao('imprensa', +5, 'Julgamento vencido');
      break;
    case 'julgamento_derrota':
      alterarFaccao('policia', -8, 'Julgamento perdido');
      break;
  }
}

// ============================================================
// TELA DE FACÇÕES
// ============================================================
function abrirTelaFaccoes() {
  if (typeof tocarSom === 'function') tocarSom('clique');

  let tela = document.getElementById('screen-faccoes');
  if (!tela) {
    tela = document.createElement('section');
    tela.className = 'screen';
    tela.id = 'screen-faccoes';
    document.body.appendChild(tela);
  }

  renderizarTelaFaccoes();
  if (typeof mostrarTela === 'function') mostrarTela('screen-faccoes');
}

function renderizarTelaFaccoes() {
  const tela = document.getElementById('screen-faccoes');
  if (!tela) return;

  const lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  let html =
    '<div class="faccoes-box">' +
      '<h2 class="faccoes-titulo">🏛️ ' + (lang === 'en' ? 'FACTIONS' : 'FACÇÕES') + '</h2>' +
      '<p class="faccoes-sub">' + (lang === 'en' ? 'Your reputation with each faction' : 'Sua reputação com cada facção') + '</p>' +
      '<div class="faccoes-lista">';

  Object.keys(FACCOES_CONFIG).forEach(function(id) {
    const cfg = FACCOES_CONFIG[id];
    const valor = faccoesEstado.valores[id];
    const bonusAtivo = faccoesEstado.bonusAtivos[id];

    let bonusTexto = '';
    if (valor >= 90) bonusTexto = '🌟 ' + (cfg.bonus[Object.keys(cfg.bonus)[0]] || 'Bônus máximo');
    else if (valor >= 50) bonusTexto = '✨ ' + (cfg.bonus[Object.keys(cfg.bonus)[1]] || 'Bônus ativo');

    html +=
      '<div class="faccao-card" style="--faccao-cor:' + cfg.cor + '">' +
        '<div class="faccao-header">' +
          '<span class="faccao-icone">' + cfg.icone + '</span>' +
          '<div>' +
            '<div class="faccao-nome">' + cfg.nome + '</div>' +
            '<div class="faccao-desc">' + cfg.desc + '</div>' +
          '</div>' +
          '<div class="faccao-valor">' + valor + '%</div>' +
        '</div>' +
        '<div class="faccao-barra">' +
          '<div class="faccao-barra-fill" style="width:' + valor + '%;background:' + cfg.cor + '"></div>' +
        '</div>' +
        (bonusTexto ? '<div class="faccao-bonus-ativo" style="border-left-color:' + cfg.cor + '">' + bonusTexto + '</div>' : '') +
      '</div>';
  });

  html += '</div>';

  // Bônus combinado
  const mult = calcularBonusFaccoes();
  html +=
    '<div class="faccoes-bonus-total">' +
      '<div>' +
        '<span>' + (lang === 'en' ? 'Combined bonus:' : 'Bônus combinado:') + '</span>' +
        '<strong>+' + Math.round((mult - 1) * 100) + '% ' + (lang === 'en' ? 'points' : 'pontos') + '</strong>' +
      '</div>' +
    '</div>';

  // Histórico
  if (faccoesEstado.historico.length > 0) {
    html +=
      '<div class="faccoes-historico">' +
        '<h3>📜 ' + (lang === 'en' ? 'Recent history' : 'Histórico recente') + '</h3>' +
        '<div class="faccoes-historico-lista">';

    faccoesEstado.historico.slice(-15).reverse().forEach(function(h) {
      const cfg = FACCOES_CONFIG[h.faccao];
      const sinal = h.delta > 0 ? '+' : '';
      const classe = h.delta > 0 ? 'positivo' : 'negativo';
      html +=
        '<div class="faccoes-hist-item ' + classe + '">' +
          '<span>' + cfg.icone + ' ' + h.motivo + '</span>' +
          '<span class="valor">' + sinal + h.delta + '</span>' +
          '<span class="hora">' + h.hora + '</span>' +
        '</div>';
    });

    html += '</div></div>';
  }

  html += '<button class="faccoes-voltar" onclick="fecharTelaFaccoes()">← ' +
    (lang === 'en' ? 'BACK' : 'VOLTAR') + '</button></div>';

  tela.innerHTML = html;
}

function fecharTelaFaccoes() {
  if (typeof tocarSom === 'function') tocarSom('clique');
  if (typeof mostrarTela === 'function') mostrarTela('screen-app');
}

// ============================================================
// INICIALIZAR
// ============================================================
function iniciarFaccoes() {
  carregarFaccoes();
  console.log('✓ Sistema de Facções carregado (v8.0)');
  console.log('  Polícia: ' + faccoesEstado.valores.policia + '%');
  console.log('  Imprensa: ' + faccoesEstado.valores.imprensa + '%');
  console.log('  Submundo: ' + faccoesEstado.valores.submundo + '%');
}

// ============================================================
// EXPORTAR
// ============================================================
window.iniciarFaccoes = iniciarFaccoes;
window.alterarFaccao = alterarFaccao;
window.aplicarEventoFaccao = aplicarEventoFaccao;
window.calcularBonusFaccoes = calcularBonusFaccoes;
window.abrirTelaFaccoes = abrirTelaFaccoes;
window.fecharTelaFaccoes = fecharTelaFaccoes;
window.faccoesEstado = faccoesEstado;
window.FACCOES_CONFIG = FACCOES_CONFIG;