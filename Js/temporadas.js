// ============================================================
// ARQUIVO MORTO v6.0 — TEMPORADAS
// ============================================================

const CONFIG_TEMPORADAS = {
  duracaoDias: 30,
  premiacoes: [
    { posicao: 1, titulo: '👑 Lenda da Temporada', moedas: 5000, carta: 'lendaria' },
    { posicao: 2, titulo: '🥇 Elite', moedas: 3000, carta: 'epica' },
    { posicao: 3, titulo: '🥈 Mestre', moedas: 2000, carta: 'epica' },
    { posicao: 10, titulo: '🥉 Veterano', moedas: 1000, carta: 'rara' },
    { posicao: 50, titulo: '🎖️ Participante', moedas: 500, carta: 'comum' }
  ]
};

let temporadaEstado = {
  numero: 1,
  inicio: null,
  fim: null,
  pontosTemporada: 0,
  casosResolvidosTemporada: 0
};

function carregarTemporada() {
  try {
    const salvo = localStorage.getItem('arquivoMorto_temporada');
    if (salvo) {
      temporadaEstado = JSON.parse(salvo);
    }
  } catch(e) {}
  
  // Verifica se a temporada acabou
  const agora = Date.now();
  if (!temporadaEstado.inicio || agora > temporadaEstado.fim) {
    iniciarNovaTemporada();
  }
}

function iniciarNovaTemporada() {
  const agora = Date.now();
  const duracaoMs = CONFIG_TEMPORADAS.duracaoDias * 24 * 60 * 60 * 1000;
  
  // Se já tinha temporada, entrega prêmios
  if (temporadaEstado.inicio) {
    entregarPremiosTemporada();
  }
  
  temporadaEstado = {
    numero: (temporadaEstado.numero || 0) + 1,
    inicio: agora,
    fim: agora + duracaoMs,
    pontosTemporada: 0,
    casosResolvidosTemporada: 0
  };
  
  salvarTemporada();
  
  if (typeof notificar === 'function') {
    notificar('🏆 Nova Temporada!', 'Temporada ' + temporadaEstado.numero + ' começou!');
  }
}

function salvarTemporada() {
  try {
    localStorage.setItem('arquivoMorto_temporada', JSON.stringify(temporadaEstado));
  } catch(e) {}
}

function adicionarPontosTemporada(pontos) {
  temporadaEstado.pontosTemporada += pontos;
  salvarTemporada();
}

function adicionarCasoTemporada() {
  temporadaEstado.casosResolvidosTemporada++;
  salvarTemporada();
}

function getDiasRestantesTemporada() {
  const agora = Date.now();
  return Math.max(0, Math.ceil((temporadaEstado.fim - agora) / (24 * 60 * 60 * 1000)));
}

function entregarPremiosTemporada() {
  // Entrega prêmios baseado na posição (offline)
  let premio = null;
  if (temporadaEstado.pontosTemporada >= 5000) premio = CONFIG_TEMPORADAS.premiacoes[0];
  else if (temporadaEstado.pontosTemporada >= 3000) premio = CONFIG_TEMPORADAS.premiacoes[1];
  else if (temporadaEstado.pontosTemporada >= 2000) premio = CONFIG_TEMPORADAS.premiacoes[2];
  else if (temporadaEstado.pontosTemporada >= 1000) premio = CONFIG_TEMPORADAS.premiacoes[3];
  else if (temporadaEstado.pontosTemporada >= 100) premio = CONFIG_TEMPORADAS.premiacoes[4];
  
  if (premio) {
    if (typeof adicionarMoedas === 'function') adicionarMoedas(premio.moedas);
    if (typeof notificar === 'function') {
      notificar('🏆 Prêmios da Temporada!', premio.titulo + ' — +' + premio.moedas + ' moedas');
    }
  }
}

function iniciarTemporadas() {
  carregarTemporada();
  console.log('✓ Sistema de temporadas carregado');
  console.log('  Temporada ' + temporadaEstado.numero + ' — ' + getDiasRestantesTemporada() + ' dias restantes');
}

window.iniciarTemporadas = iniciarTemporadas;
window.adicionarPontosTemporada = adicionarPontosTemporada;
window.adicionarCasoTemporada = adicionarCasoTemporada;
window.getDiasRestantesTemporada = getDiasRestantesTemporada;
window.temporadaEstado = temporadaEstado;

console.log('✓ Temporadas carregadas');