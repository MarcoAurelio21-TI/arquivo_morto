// ============================================================
// ARQUIVO MORTO v7.2 — MODO HARDCORE (CORRIGIDO)
// ============================================================

let hardcoreEstado = {
  ativo: false,
  saveBloqueado: false
};

function ativarHardcore() {
  const confirmar = confirm(
    '💀 MODO HARDCORE 💀\n\n' +
    'REGRAS:\n' +
    '• Você tem APENAS 1 VIDA\n' +
    '• Se errar 1 caso = GAME OVER PERMANENTE\n' +
    '• Não pode usar dicas\n' +
    '• Não pode usar cartas\n' +
    '• Sem save/load\n' +
    '• Sem voltar atrás\n\n' +
    'Você tem coragem, detetive?'
  );

  if (!confirmar) return false;

  hardcoreEstado.ativo = true;
  hardcoreEstado.saveBloqueado = true;

  var est = window.estadoRef ? window.estadoRef() : window.estado;
  if (est) {
    est.vidas = 1;
    est.modoAtual = 'hardcore';
    if (typeof salvarEstado === 'function') salvarEstado();
  }

  if (typeof notificar === 'function') {
    notificar('💀 MODO HARDCORE ATIVADO', 'Uma vida. Zero margem pra erro.');
  }

  return true;
}

function isHardcore() {
  var est = window.estadoRef ? window.estadoRef() : window.estado;
  return hardcoreEstado.ativo || (est && est.modoAtual === 'hardcore');
}

function podeUsarDica() {
  return !isHardcore();
}

function podeUsarCarta() {
  return !isHardcore();
}

function resetHardcore() {
  hardcoreEstado.ativo = false;
  hardcoreEstado.saveBloqueado = false;

  try {
    localStorage.removeItem('arquivoMorto_v5');
    localStorage.removeItem('arquivoMorto_reputacao');
    localStorage.removeItem('arquivoMorto_cartas');
    localStorage.removeItem('arquivoMorto_provas');
    localStorage.removeItem('arquivoMorto_diario');
  } catch(e) {}

  if (typeof notificar === 'function') {
    notificar('💀 FIM PERMANENTE', 'Progresso apagado. Recarregue a página.');
  }

  setTimeout(function() {
    window.location.reload();
  }, 2000);
}

window.ativarHardcore = ativarHardcore;
window.isHardcore = isHardcore;
window.podeUsarDica = podeUsarDica;
window.podeUsarCarta = podeUsarCarta;
window.resetHardcore = resetHardcore;

console.log('✓ Modo Hardcore carregado (v7.2)');