// ============================================================
// ARQUIVO MORTO v8.0 — MODO CASO GÊMEO
// ============================================================
// Após resolver um caso, gera uma versão espelhada com
// suspeitos trocados e evidências alteradas.
// ============================================================

function gerarCasoGemeo(casoOriginal) {
  if (!casoOriginal || !casoOriginal.suspeitos) return null;

  const lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  // Clona suspeitos e embaralha
  const suspeitosOriginais = casoOriginal.suspeitos.slice();
  const suspeitosEmbaralhados = embarilhar(suspeitosOriginais.slice());

  // Mapa nome antigo → novo
  const mapaNomes = {};
  casoOriginal.suspeitos.forEach(function(s, i) {
    mapaNomes[s.nome] = suspeitosEmbaralhados[i].nome;
  });

  // Embaralha evidências + adiciona 1 falsa
  const evidenciasEmbaralhadas = embarilhar(casoOriginal.evidencias.slice());
  const evidenciasFinais = evidenciasEmbaralhadas.concat([
    lang === 'en' ? '🔍 Planted evidence (fake)' : '🔍 Evidência Plantada (falsa)'
  ]);

  const casoGemeo = {
    id: casoOriginal.id + 20000,
    capitulo: casoOriginal.capitulo,
    titulo: casoOriginal.titulo + (lang === 'en' ? ' — TWIN VERSION' : ' — VERSÃO GÊMEA'),
    resumo: lang === 'en'
      ? 'A mirrored version of the original case. Suspects swapped roles.'
      : 'Uma versão espelhada do caso original. Os suspeitos trocaram de papel.',
    premissa: casoOriginal.premissa,
    evidencias: evidenciasFinais,
    suspeitos: suspeitosEmbaralhados,
    culpado: mapaNomes[casoOriginal.culpado],
    solucao: casoOriginal.solucao,
    dicas: casoOriginal.dicas,
    ehGemeo: true,
    casoOriginal: casoOriginal.id,
    recompensa: { pontos: 500, cartaGarantida: 'epica' }
  };

  return casoGemeo;
}

function embarilhar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

// ============================================================
// MODAL DE DESAFIO GÊMEO
// ============================================================
function oferecerCasoGemeo(casoOriginal) {
  const lang = window.idiomaAtual === 'en' ? 'en' : 'pt';

  // Verifica se já foi feito
  try {
    const feitos = JSON.parse(localStorage.getItem('arquivoMorto_gemeosFeitos') || '[]');
    if (feitos.indexOf(casoOriginal.id) !== -1) return;
  } catch(e) {}

  const overlay = document.createElement('div');
  overlay.className = 'gemeo-overlay';
  overlay.id = 'gemeo-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  overlay.innerHTML =
    '<div class="gemeo-box">' +
      '<div class="gemeo-icone">🎭</div>' +
      '<h2>' + (lang === 'en' ? 'TWIN CHALLENGE!' : 'DESAFIO GÊMEO!') + '</h2>' +
      '<p>' + (lang === 'en'
        ? 'You solved the original case. Now try the <strong>mirrored version</strong> — suspects swapped roles, evidence shuffled, plus one planted clue.'
        : 'Você resolveu o caso original. Agora tente a <strong>versão espelhada</strong> — suspeitos trocaram de papel, evidências foram embaralhadas, e uma pista falsa foi adicionada.'
      ) + '</p>' +
      '<div class="gemeo-recompensa">' +
        '<span>🎁</span>' +
        '<strong>+500 ' + (lang === 'en' ? 'points' : 'pontos') + '</strong>' +
        '<span>+</span>' +
        '<strong>1 ' + (lang === 'en' ? 'EPIC CARD' : 'CARTA ÉPICA') + '</strong>' +
      '</div>' +
      '<div class="gemeo-acoes">' +
        '<button class="gemeo-btn secundario" onclick="recusarGemeo(' + casoOriginal.id + ')">' +
          (lang === 'en' ? 'NOT NOW' : 'AGORA NÃO') +
        '</button>' +
        '<button class="gemeo-btn primario" onclick="aceitarGemeo(' + casoOriginal.id + ')">' +
          (lang === 'en' ? '🎭 PLAY TWIN' : '🎭 JOGAR GÊMEO') +
        '</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  if (typeof tocarSom === 'function') tocarSom('nivel');
}

function aceitarGemeo(casoId) {
  const casoOriginal = window.getCasoPorId ? window.getCasoPorId(casoId) : null;
  if (!casoOriginal) { fecharGemeo(); return; }

  const gemeo = gerarCasoGemeo(casoOriginal);
  if (!gemeo) { fecharGemeo(); return; }

  // Adiciona ao array global
  if (window.CASOS) window.CASOS.push(gemeo);
  if (window.CacheCasos) window.CacheCasos.invalidar();

  fecharGemeo();

  if (typeof notificar === 'function') {
    notificar(
      '🎭 ' + (window.idiomaAtual === 'en' ? 'Twin Mode' : 'Modo Gêmeo'),
      window.idiomaAtual === 'en' ? 'Good luck, detective.' : 'Boa sorte, detetive.'
    );
  }

  if (typeof abrirCaso === 'function') {
    setTimeout(function() { abrirCaso(gemeo.id); }, 300);
  }
}

function recusarGemeo(casoId) {
  try {
    const feitos = JSON.parse(localStorage.getItem('arquivoMorto_gemeosFeitos') || '[]');
    if (feitos.indexOf(casoId) === -1) {
      feitos.push(casoId);
      localStorage.setItem('arquivoMorto_gemeosFeitos', JSON.stringify(feitos));
    }
  } catch(e) {}
  fecharGemeo();
}

function fecharGemeo() {
  const overlay = document.getElementById('gemeo-overlay');
  if (overlay) overlay.remove();
}

// ============================================================
// RECOMPENSA AO VENCER GÊMEO
// ============================================================
function verificarRecompensaGemeo(caso) {
  if (!caso || !caso.ehGemeo) return;

  var est = window.estadoRef ? window.estadoRef() : window.estado;
  if (!est) return;

  // Bônus pontos
  est.pontos += 500;

  // Carta épica garantida
  if (typeof darCartaAleatoria === 'function') {
    // Força épica
    const cartasEpicas = window.CARTAS_HABILIDADE ? window.CARTAS_HABILIDADE.filter(function(c) {
      return c.raridade === 'epica';
    }) : [];
    if (cartasEpicas.length > 0 && typeof adicionarCartaHab === 'function') {
      const carta = cartasEpicas[Math.floor(Math.random() * cartasEpicas.length)];
      adicionarCartaHab(carta.id, 1);
      if (typeof mostrarLootCarta === 'function') mostrarLootCarta(carta);
    }
  }

  try {
    const feitos = JSON.parse(localStorage.getItem('arquivoMorto_gemeosFeitos') || '[]');
    if (feitos.indexOf(caso.casoOriginal) === -1) {
      feitos.push(caso.casoOriginal);
      localStorage.setItem('arquivoMorto_gemeosFeitos', JSON.stringify(feitos));
    }
  } catch(e) {}

  if (typeof salvarEstado === 'function') salvarEstado();
  if (typeof atualizarHUD === 'function') atualizarHUD();
}

// ============================================================
// INICIALIZAR
// ============================================================
function iniciarGemeos() {
  console.log('✓ Sistema de Casos Gêmeos carregado (v8.0)');
}

// ============================================================
// EXPORTAR
// ============================================================
window.iniciarGemeos = iniciarGemeos;
window.gerarCasoGemeo = gerarCasoGemeo;
window.oferecerCasoGemeo = oferecerCasoGemeo;
window.aceitarGemeo = aceitarGemeo;
window.recusarGemeo = recusarGemeo;
window.fecharGemeo = fecharGemeo;
window.verificarRecompensaGemeo = verificarRecompensaGemeo;