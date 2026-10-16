// ============================================================
// ARQUIVO MORTO v7.2 — MODO JULGAMENTO (CORRIGIDO)
// ============================================================

let julgamentoEstado = {
  caso: null,
  acusado: null,
  provasSelecionadas: [],
  provasDisponiveis: [],
  maxProvas: 3
};

function iniciarJulgamento(caso, acusado) {
  julgamentoEstado.caso = caso;
  julgamentoEstado.acusado = acusado;
  julgamentoEstado.provasSelecionadas = [];
  julgamentoEstado.provasDisponiveis = caso.evidencias.slice();

  embaralharArray(julgamentoEstado.provasDisponiveis);

  criarTelaJulgamento();

  if (typeof mostrarTela === 'function') {
    mostrarTela('screen-julgamento');
  }

  if (typeof tocarSom === 'function') tocarSom('clique');
}

function embaralharArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

function criarTelaJulgamento() {
  let tela = document.getElementById('screen-julgamento');
  if (!tela) {
    tela = document.createElement('section');
    tela.className = 'screen';
    tela.id = 'screen-julgamento';
    document.body.appendChild(tela);
  }
  renderizarJulgamento();
}

function renderizarJulgamento() {
  const tela = document.getElementById('screen-julgamento');
  if (!tela) return;

  const caso = julgamentoEstado.caso;
  if (!caso) return;

  let slotsHTML = '';
  for (let i = 0; i < julgamentoEstado.maxProvas; i++) {
    const prova = julgamentoEstado.provasSelecionadas[i];
    if (prova) {
      slotsHTML +=
        '<div class="prova-slot preenchido">' +
          '<span class="slot-num">PROVA ' + (i + 1) + '</span>' +
          '<div class="prova-texto">' + escapeHTML(prova) + '</div>' +
        '</div>';
    } else {
      slotsHTML +=
        '<div class="prova-slot vazio">' +
          '<span class="slot-num">PROVA ' + (i + 1) + '</span>' +
          'Selecione uma prova' +
        '</div>';
    }
  }

  let provasHTML = '';
  julgamentoEstado.provasDisponiveis.forEach(function(prova, idx) {
    const usada = julgamentoEstado.provasSelecionadas.indexOf(prova) !== -1;
    provasHTML +=
      '<div class="prova-card ' + (usada ? 'usada' : '') + '" onclick="selecionarProva(' + idx + ')">' +
        escapeHTML(prova) +
      '</div>';
  });

  const podeConfirmar = julgamentoEstado.provasSelecionadas.length >= julgamentoEstado.maxProvas;

  tela.innerHTML =
    '<div class="julgamento-box">' +
      '<h2 class="julgamento-titulo">⚖️ JULGAMENTO</h2>' +
      '<p class="julgamento-sub">Apresente 3 provas que incriminam o acusado</p>' +
      '<div class="julgamento-caso">' +
        '<div class="julgamento-caso-titulo">' + escapeHTML(caso.titulo) + '</div>' +
        '<div class="julgamento-caso-acusado">Acusado: <strong>' + escapeHTML(julgamentoEstado.acusado) + '</strong></div>' +
      '</div>' +
      '<div class="julgamento-provas">' +
        '<div class="julgamento-provas-titulo">📋 SUAS PROVAS SELECIONADAS</div>' +
        '<div class="provas-slots">' + slotsHTML + '</div>' +
      '</div>' +
      '<div class="julgamento-provas">' +
        '<div class="julgamento-provas-titulo">📂 PROVAS DISPONÍVEIS</div>' +
        '<div class="provas-disponiveis">' + provasHTML + '</div>' +
      '</div>' +
      '<div class="julgamento-acoes">' +
        '<button class="btn-julgar secundario" onclick="cancelarJulgamento()">← VOLTAR</button>' +
        '<button class="btn-julgar" id="btn-confirmar-julgamento" ' + (podeConfirmar ? '' : 'disabled') + ' onclick="confirmarJulgamento()">' +
          '⚖️ CONFIRMAR ACUSAÇÃO (' + julgamentoEstado.provasSelecionadas.length + '/' + julgamentoEstado.maxProvas + ')' +
        '</button>' +
      '</div>' +
      '<div class="julgamento-resultado" id="resultado-julgamento"></div>' +
    '</div>';
}

function selecionarProva(idx) {
  const prova = julgamentoEstado.provasDisponiveis[idx];
  if (!prova) return;

  const posicao = julgamentoEstado.provasSelecionadas.indexOf(prova);
  if (posicao !== -1) {
    julgamentoEstado.provasSelecionadas.splice(posicao, 1);
  } else {
    if (julgamentoEstado.provasSelecionadas.length >= julgamentoEstado.maxProvas) {
      if (typeof notificar === 'function') {
        notificar('⚖️ Limite', 'Você só pode selecionar 3 provas');
      }
      return;
    }
    julgamentoEstado.provasSelecionadas.push(prova);
  }

  if (typeof tocarSom === 'function') tocarSom('clique');
  renderizarJulgamento();
}

function confirmarJulgamento() {
  const caso = julgamentoEstado.caso;
  if (!caso) return;

  const provasCorretas = caso.evidencias;
  let acertos = 0;

  julgamentoEstado.provasSelecionadas.forEach(function(prova) {
    if (provasCorretas.indexOf(prova) !== -1) acertos++;
  });

  const venceu = acertos >= 2;

  const resultado = document.getElementById('resultado-julgamento');
  if (!resultado) return;

  if (venceu) {
    resultado.className = 'julgamento-resultado vitoria show';
    resultado.innerHTML =
      '<h3>✓ ACUSAÇÃO ACEITA</h3>' +
      '<p>O júri concordou com suas provas. <strong>' + escapeHTML(julgamentoEstado.acusado) + '</strong> foi condenado!</p>' +
      '<p>Acertos: ' + acertos + '/' + julgamentoEstado.maxProvas + '</p>' +
      '<button class="btn-julgar" style="margin-top:1rem" onclick="finalizarJulgamento(true)">CONTINUAR</button>';
    if (typeof tocarSom === 'function') tocarSom('vitoria');
  } else {
    resultado.className = 'julgamento-resultado derrota show';
    resultado.innerHTML =
      '<h3>✕ ACUSAÇÃO REJEITADA</h3>' +
      '<p>O júri não se convenceu. <strong>' + escapeHTML(julgamentoEstado.acusado) + '</strong> foi absolvido por falta de provas.</p>' +
      '<p>Acertos: ' + acertos + '/' + julgamentoEstado.maxProvas + ' (precisava de 2)</p>' +
      '<button class="btn-julgar secundario" style="margin-top:1rem" onclick="finalizarJulgamento(false)">CONTINUAR</button>';
    if (typeof tocarSom === 'function') tocarSom('erro');
  }

  document.querySelectorAll('.prova-card, .btn-julgar').forEach(function(el) {
    el.style.pointerEvents = 'none';
  });
}

function finalizarJulgamento(venceu) {
  const caso = julgamentoEstado.caso;
  const casoId = caso ? caso.id : null;
  const casoRef = caso;

  var est = window.estadoRef ? window.estadoRef() : window.estado;

  if (venceu) {
    if (est && casoRef) {
      if (est.resolvidos.indexOf(casoRef.id) === -1) {
        est.resolvidos.push(casoRef.id);
      }
      if (typeof salvarEstado === 'function') salvarEstado();
    }

    if (typeof notificar === 'function') {
      notificar('⚖️ Condenado!', 'A justiça foi feita. Caso encerrado.');
    }

    if (typeof adicionarReputacao === 'function') {
      adicionarReputacao('caso_resolvido', '⚖️ Julgamento vencido');
    }

    if (typeof atualizarProgressoMissao === 'function') {
      atualizarProgressoMissao('casos', 1);
    }
  } else {
    if (est) {
      est.vidas--;
      if (typeof salvarEstado === 'function') salvarEstado();
    }

    if (typeof notificar === 'function') {
      notificar('⚠️ Absolvido', 'O culpado escapou. -1 vida');
    }

    if (typeof adicionarReputacao === 'function') {
      adicionarReputacao('caso_errado', '⚖️ Julgamento perdido');
    }
  }

  julgamentoEstado = {
    caso: null, acusado: null,
    provasSelecionadas: [], provasDisponiveis: [], maxProvas: 3
  };

  if (est && est.vidas <= 0) {
    if (typeof mostrarGameOver === 'function') {
      setTimeout(mostrarGameOver, 500);
    }
    return;
  }

  if (typeof mostrarTela === 'function') {
    mostrarTela('screen-app');
  }

  if (typeof atualizarHUD === 'function') atualizarHUD();
  if (typeof renderizarMenu === 'function') renderizarMenu();
  if (window.CacheCasos) CacheCasos.invalidar();

  if (casoRef && typeof abrirCasoDireto === 'function') {
    setTimeout(function() {
      abrirCasoDireto(casoId);
    }, 300);
  }
}

function cancelarJulgamento() {
  julgamentoEstado.provasSelecionadas = [];
  if (typeof tocarSom === 'function') tocarSom('clique');
  if (typeof mostrarTela === 'function') mostrarTela('screen-app');
}

window.iniciarJulgamento = iniciarJulgamento;
window.selecionarProva = selecionarProva;
window.confirmarJulgamento = confirmarJulgamento;
window.finalizarJulgamento = finalizarJulgamento;
window.cancelarJulgamento = cancelarJulgamento;

console.log('✓ Sistema de julgamento carregado (v7.2)');