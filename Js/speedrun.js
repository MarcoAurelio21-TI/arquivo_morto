// ============================================================
// ARQUIVO MORTO v8.0 — MODO SPEEDRUN
// ============================================================
// 1 caso · 180 segundos · sem dicas · sem cartas · ranking.
// ============================================================

const CONFIG_SPEEDRUN = {
  tempoMaximo: 180,
  pontosBase: 10,
  bonusSemErros: 500,
  bonusCombo: 50
};

let speedrunEstado = {
  ativo: false,
  casoId: null,
  tempoRestante: CONFIG_SPEEDRUN.tempoMaximo,
  tempoInicio: 0,
  timerInterval: null,
  erros: 0,
  acertou: false
};

// ============================================================
// INICIAR
// ============================================================
function iniciarSpeedrun() {
  const lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  // Escolhe caso aleatório do capítulo atual
  const casos = window.getCasosTodos ? window.getCasosTodos() : (window.CASOS || []);
  const candidatos = casos.filter(function(c) {
    return !c.historico && !c.ehChefao && !c.ehGemeo;
  });

  if (candidatos.length === 0) {
    if (typeof notificar === 'function') {
      notificar('⚡ Speedrun', lang === 'en' ? 'No cases available.' : 'Nenhum caso disponível.');
    }
    return;
  }

  const caso = candidatos[Math.floor(Math.random() * candidatos.length)];

  speedrunEstado.ativo = true;
  speedrunEstado.casoId = caso.id;
  speedrunEstado.tempoRestante = CONFIG_SPEEDRUN.tempoMaximo;
  speedrunEstado.tempoInicio = Date.now();
  speedrunEstado.erros = 0;
  speedrunEstado.acertou = false;

  // Configura modo
  var est = window.estadoRef ? window.estadoRef() : window.estado;
  if (est) {
    est.modoAtual = 'speedrun';
    est.vidas = 1;
    if (typeof salvarEstado === 'function') salvarEstado();
  }

  mostrarTelaSpeedrunInicio(caso);

  if (typeof tocarSom === 'function') tocarSom('nivel');
}

// ============================================================
// TELA DE INÍCIO
// ============================================================
function mostrarTelaSpeedrunInicio(caso) {
  const lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  const overlay = document.createElement('div');
  overlay.className = 'speedrun-overlay';
  overlay.id = 'speedrun-overlay';

  overlay.innerHTML =
    '<div class="speedrun-box speedrun-intro">' +
      '<div class="speedrun-intro-icone">⚡</div>' +
      '<h2>' + (lang === 'en' ? 'SPEEDRUN MODE' : 'MODO SPEEDRUN') + '</h2>' +
      '<div class="speedrun-regras">' +
        '<div><span>⏱️</span> ' + (lang === 'en' ? '180 seconds to solve' : '180 segundos para resolver') + '</div>' +
        '<div><span>🚫</span> ' + (lang === 'en' ? 'No hints, no cards' : 'Sem dicas, sem cartas') + '</div>' +
        '<div><span>⚖️</span> ' + (lang === 'en' ? 'Only evidence and accusation' : 'Só evidências e acusação') + '</div>' +
        '<div><span>🏆</span> ' + (lang === 'en' ? 'Fastest time = highest score' : 'Mais rápido = mais pontos') + '</div>' +
      '</div>' +
      '<div class="speedrun-caso-info">' +
        '<strong>' + (lang === 'en' ? 'Case:' : 'Caso:') + '</strong> ' +
        (typeof escapeHTML === 'function' ? escapeHTML(caso.titulo) : caso.titulo) +
      '</div>' +
      '<button class="speedrun-btn primario" onclick="comecarSpeedrun()">' +
        '▶ ' + (lang === 'en' ? 'START' : 'COMEÇAR') +
      '</button>' +
      '<button class="speedrun-btn secundario" onclick="cancelarSpeedrun()">' +
        '← ' + (lang === 'en' ? 'CANCEL' : 'CANCELAR') +
      '</button>' +
    '</div>';

  document.body.appendChild(overlay);
}

function comecarSpeedrun() {
  const overlay = document.getElementById('speedrun-overlay');
  if (overlay) overlay.remove();

  speedrunEstado.tempoInicio = Date.now();
  speedrunEstado.tempoRestante = CONFIG_SPEEDRUN.tempoMaximo;

  // Abre o caso
  if (typeof abrirCaso === 'function') {
    abrirCaso(speedrunEstado.casoId);
  }

  // Cria HUD do timer
  criarHUDSpeedrun();

  // Inicia contagem
  speedrunEstado.timerInterval = setInterval(function() {
    speedrunEstado.tempoRestante--;
    atualizarHUDSpeedrun();

    if (speedrunEstado.tempoRestante <= 10 && speedrunEstado.tempoRestante > 0) {
      if (typeof tocarSom === 'function') tocarSom('tick');
    }

    if (speedrunEstado.tempoRestante <= 0) {
      finalizarSpeedrun(false, 'tempo');
    }
  }, 1000);
}

function cancelarSpeedrun() {
  const overlay = document.getElementById('speedrun-overlay');
  if (overlay) overlay.remove();
  speedrunEstado.ativo = false;
  if (typeof tocarSom === 'function') tocarSom('clique');
  if (typeof mostrarTela === 'function') mostrarTela('screen-app');
}

// ============================================================
// HUD DO TIMER
// ============================================================
function criarHUDSpeedrun() {
  const antigo = document.getElementById('speedrun-hud');
  if (antigo) antigo.remove();

  const hud = document.createElement('div');
  hud.id = 'speedrun-hud';
  hud.className = 'speedrun-hud';
  hud.innerHTML =
    '<div class="speedrun-hud-icone">⚡</div>' +
    '<div class="speedrun-hud-timer" id="speedrun-timer">' + CONFIG_SPEEDRUN.tempoMaximo + '</div>' +
    '<div class="speedrun-hud-label">SEGUNDOS</div>' +
    '<div class="speedrun-hud-barra"><div class="speedrun-hud-barra-fill" id="speedrun-barra-fill"></div></div>' +
    '<button class="speedrun-hud-sair" onclick="confirmarSaidaSpeedrun()">✕</button>';

  document.body.appendChild(hud);
}

function atualizarHUDSpeedrun() {
  const el = document.getElementById('speedrun-timer');
  if (el) el.textContent = speedrunEstado.tempoRestante;

  const fill = document.getElementById('speedrun-barra-fill');
  if (fill) {
    const pct = (speedrunEstado.tempoRestante / CONFIG_SPEEDRUN.tempoMaximo) * 100;
    fill.style.width = pct + '%';
    fill.style.background = pct > 50 ? 'linear-gradient(90deg, #4a8a4a, #9fdf9f)' :
                            pct > 20 ? 'linear-gradient(90deg, #d4a83a, #ffdd66)' :
                            'linear-gradient(90deg, #8b1a1a, #c23b3b)';
  }
}

function confirmarSaidaSpeedrun() {
  const lang = window.idiomaAtual === 'en' ? 'en' : 'pt';
  if (confirm(lang === 'en' ? 'Abandon the speedrun?' : 'Abandonar o speedrun?')) {
    finalizarSpeedrun(false, 'desistiu');
  }
}

// ============================================================
// FINALIZAR
// ============================================================
function finalizarSpeedrun(venceu, motivo) {
  if (!speedrunEstado.ativo) return;

  if (speedrunEstado.timerInterval) {
    clearInterval(speedrunEstado.timerInterval);
    speedrunEstado.timerInterval = null;
  }

  const hud = document.getElementById('speedrun-hud');
  if (hud) hud.remove();

  const tempoGastoSegundos = Math.floor((Date.now() - speedrunEstado.tempoInicio) / 1000);

  // Calcula pontuação
  let pontos = 0;
  if (venceu) {
    pontos = (CONFIG_SPEEDRUN.tempoMaximo - tempoGastoSegundos) * CONFIG_SPEEDRUN.pontosBase;
    if (speedrunEstado.erros === 0) pontos += CONFIG_SPEEDRUN.bonusSemErros;
    const est = window.estadoRef ? window.estadoRef() : window.estado;
    if (est && est.combo > 1) pontos += (est.combo - 1) * CONFIG_SPEEDRUN.bonusCombo;
  }

  mostrarResultadoSpeedrun(venceu, pontos, tempoGastoSegundos, motivo);

  // Salva no ranking local
  if (venceu) {
    salvarRankingSpeedrun(pontos, tempoGastoSegundos);
  }

  speedrunEstado.ativo = false;
}

// ============================================================
// RESULTADO
// ============================================================
function mostrarResultadoSpeedrun(venceu, pontos, tempo, motivo) {
  const lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  const overlay = document.createElement('div');
  overlay.className = 'speedrun-overlay';
  overlay.id = 'speedrun-resultado';

  overlay.innerHTML =
    '<div class="speedrun-box speedrun-resultado ' + (venceu ? 'vitoria' : 'derrota') + '">' +
      '<div class="speedrun-res-icone">' + (venceu ? '⚡' : '⏰') + '</div>' +
      '<h2>' + (venceu
        ? (lang === 'en' ? 'RUN COMPLETE!' : 'CORRIDA COMPLETA!')
        : (motivo === 'tempo'
            ? (lang === 'en' ? 'TIME IS UP!' : 'TEMPO ESGOTADO!')
            : (lang === 'en' ? 'RUN ABANDONED' : 'CORRIDA ABANDONADA'))
      ) + '</h2>' +
      '<div class="speedrun-stats">' +
        '<div class="speedrun-stat"><span>' + (lang === 'en' ? 'Time' : 'Tempo') + '</span><strong>' + tempo + 's</strong></div>' +
        '<div class="speedrun-stat"><span>' + (lang === 'en' ? 'Errors' : 'Erros') + '</span><strong>' + speedrunEstado.erros + '</strong></div>' +
        '<div class="speedrun-stat destaque"><span>' + (lang === 'en' ? 'Score' : 'Pontuação') + '</span><strong>' + pontos + '</strong></div>' +
      '</div>' +
      '<div class="speedrun-acoes">' +
        '<button class="speedrun-btn primario" onclick="fecharResultadoSpeedrun();iniciarSpeedrun()">' +
          '🔄 ' + (lang === 'en' ? 'PLAY AGAIN' : 'JOGAR NOVAMENTE') +
        '</button>' +
        '<button class="speedrun-btn secundario" onclick="fecharResultadoSpeedrun();abrirRankingSpeedrun()">' +
          '🏆 ' + (lang === 'en' ? 'RANKING' : 'RANKING') +
        '</button>' +
        '<button class="speedrun-btn cancelar" onclick="fecharResultadoSpeedrun()">' +
          '✕ ' + (lang === 'en' ? 'CLOSE' : 'FECHAR') +
        '</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  if (venceu) {
    if (typeof tocarSom === 'function') tocarSom('vitoria');
  } else {
    if (typeof tocarSom === 'function') tocarSom('gameover');
  }
}

function fecharResultadoSpeedrun() {
  const overlay = document.getElementById('speedrun-resultado');
  if (overlay) overlay.remove();

  var est = window.estadoRef ? window.estadoRef() : window.estado;
  if (est) est.modoAtual = 'normal';

  if (typeof mostrarTela === 'function') mostrarTela('screen-app');
  if (typeof renderizarHome === 'function') renderizarHome();
}

// ============================================================
// RANKING SPEEDRUN
// ============================================================
function salvarRankingSpeedrun(pontos, tempo) {
  try {
    const ranking = JSON.parse(localStorage.getItem('arquivoMorto_speedrun') || '[]');
    ranking.push({
      pontos: pontos,
      tempo: tempo,
      data: new Date().toLocaleDateString('pt-BR')
    });
    ranking.sort(function(a, b) { return b.pontos - a.pontos; });
    if (ranking.length > 50) ranking.length = 50;
    localStorage.setItem('arquivoMorto_speedrun', JSON.stringify(ranking));
  } catch(e) {}
}

function abrirRankingSpeedrun() {
  const lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  const ranking = (function() {
    try {
      return JSON.parse(localStorage.getItem('arquivoMorto_speedrun') || '[]');
    } catch(e) { return []; }
  })();

  const overlay = document.createElement('div');
  overlay.className = 'speedrun-overlay';
  overlay.id = 'speedrun-ranking-overlay';

  let listHTML = '';
  if (ranking.length === 0) {
    listHTML = '<div class="speedrun-ranking-vazio">' +
      (lang === 'en' ? 'No runs yet. Be the first!' : 'Nenhuma corrida ainda. Seja o primeiro!') +
    '</div>';
  } else {
    listHTML = '<div class="speedrun-ranking-lista">';
    ranking.slice(0, 10).forEach(function(r, i) {
      const medalha = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
      listHTML +=
        '<div class="speedrun-ranking-item">' +
          '<span class="speedrun-ranking-pos">' + medalha + '</span>' +
          '<span class="speedrun-ranking-pontos">' + r.pontos + '</span>' +
          '<span class="speedrun-ranking-tempo">' + r.tempo + 's</span>' +
          '<span class="speedrun-ranking-data">' + r.data + '</span>' +
        '</div>';
    });
    listHTML += '</div>';
  }

  overlay.innerHTML =
    '<div class="speedrun-box">' +
      '<h2>🏆 ' + (lang === 'en' ? 'SPEEDRUN RANKING' : 'RANKING SPEEDRUN') + '</h2>' +
      listHTML +
      '<button class="speedrun-btn primario" style="width:100%;margin-top:1.5rem" onclick="document.getElementById(\'speedrun-ranking-overlay\').remove()">' +
        '← ' + (lang === 'en' ? 'BACK' : 'VOLTAR') +
      '</button>' +
    '</div>';

  document.body.appendChild(overlay);
}

// ============================================================
// HOOKS DE JOGO
// ============================================================
// Chamado quando o jogador acusa alguém no modo speedrun
function speedrunRegistrarAcusacao(acertou) {
  if (!speedrunEstado.ativo) return;

  if (acertou) {
    speedrunEstado.acertou = true;
    finalizarSpeedrun(true, 'acertou');
  } else {
    speedrunEstado.erros++;
    // Não perde vida — só conta erro
  }
}

// ============================================================
// INICIALIZAR
// ============================================================
function iniciarSpeedrunSistema() {
  console.log('✓ Sistema Speedrun carregado (v8.0)');
  console.log('  Tempo máximo: ' + CONFIG_SPEEDRUN.tempoMaximo + 's');
}

// ============================================================
// EXPORTAR
// ============================================================
window.iniciarSpeedrunSistema = iniciarSpeedrunSistema;
window.iniciarSpeedrun = iniciarSpeedrun;
window.comecarSpeedrun = comecarSpeedrun;
window.cancelarSpeedrun = cancelarSpeedrun;
window.finalizarSpeedrun = finalizarSpeedrun;
window.fecharResultadoSpeedrun = fecharResultadoSpeedrun;
window.abrirRankingSpeedrun = abrirRankingSpeedrun;
window.speedrunRegistrarAcusacao = speedrunRegistrarAcusacao;
window.speedrunEstado = speedrunEstado;