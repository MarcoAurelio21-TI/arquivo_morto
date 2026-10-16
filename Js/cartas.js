// ============================================================
// ARQUIVO MORTO v7.2 — CARTAS DE HABILIDADE (CORRIGIDO)
// ============================================================

if (typeof window.escapeHTML !== 'function') {
  window.escapeHTML = function(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  };
}

const CARTAS_HABILIDADE = [
  { id: 'ler_mente', nome: 'Ler Mente', icone: '🧠', desc: 'Revela se o suspeito está mentindo na próxima pergunta.', efeito: 'revela_mentira', raridade: 'epica', cor: '#cc99ff', som: 'dica' },
  { id: 'intuicao', nome: 'Intuição', icone: '👁️', desc: 'Revela automaticamente 1 dica grátis do caso.', efeito: 'dica_gratis', raridade: 'rara', cor: '#ffdd66', som: 'dica' },
  { id: 'memoria', nome: 'Memória Fotográfica', icone: '📸', desc: 'Analisa automaticamente 1 evidência e a coleta como prova.', efeito: 'prova_auto', raridade: 'rara', cor: '#66ccff', som: 'acerto' },
  { id: 'reflexos', nome: 'Reflexos Rápidos', icone: '⏰', desc: '+30 segundos no cronômetro (só funciona no modo contrarrelógio).', efeito: 'tempo_extra', raridade: 'comum', cor: '#9fdf9f', som: 'acerto' },
  { id: 'precisao', nome: 'Precisão', icone: '🎯', desc: 'Próxima acusação errada não gasta vida.', efeito: 'escudo', raridade: 'epica', cor: '#ff9999', som: 'combo' },
  { id: 'lupa_ouro', nome: 'Lupa de Ouro', icone: '🔍', desc: 'Revela TODAS as evidências do caso automaticamente.', efeito: 'analisar_tudo', raridade: 'lendaria', cor: '#ffed4e', som: 'vitoria' }
];

let cartasEstado = {
  inventario: {},
  usadasNesteCaso: [],
  escudoAtivo: false
};

function carregarCartas() {
  try {
    const salvo = localStorage.getItem('arquivoMorto_cartas');
    if (salvo) {
      const parsed = JSON.parse(salvo);
      cartasEstado.inventario = parsed.inventario || {};
    }
  } catch(e) {}

  if (Object.keys(cartasEstado.inventario).length === 0) {
    cartasEstado.inventario = {
      'intuicao': 2,
      'reflexos': 2,
      'memoria': 1
    };
    salvarCartas();
  }
}

function salvarCartas() {
  try {
    localStorage.setItem('arquivoMorto_cartas', JSON.stringify({
      inventario: cartasEstado.inventario
    }));
  } catch(e) {}
}

function getCarta(id) {
  for (let i = 0; i < CARTAS_HABILIDADE.length; i++) {
    if (CARTAS_HABILIDADE[i].id === id) return CARTAS_HABILIDADE[i];
  }
  return null;
}

function qtdCarta(id) {
  return cartasEstado.inventario[id] || 0;
}

function adicionarCartaHab(id, qtd) {
  qtd = qtd || 1;
  cartasEstado.inventario[id] = (cartasEstado.inventario[id] || 0) + qtd;
  salvarCartas();
  return cartasEstado.inventario[id];
}

function darCartaAleatoria() {
  const rand = Math.random();
  let raridadeAlvo = 'comum';

  if (rand < 0.05) raridadeAlvo = 'lendaria';
  else if (rand < 0.20) raridadeAlvo = 'epica';
  else if (rand < 0.55) raridadeAlvo = 'rara';
  else raridadeAlvo = 'comum';

  const cartasDaRaridade = CARTAS_HABILIDADE.filter(function(c) {
    return c.raridade === raridadeAlvo;
  });

  const carta = cartasDaRaridade[Math.floor(Math.random() * cartasDaRaridade.length)];

  if (carta) {
    adicionarCartaHab(carta.id, 1);
    mostrarLootCarta(carta);
    return carta;
  }
}

function mostrarLootCarta(carta) {
  const overlay = document.createElement('div');
  overlay.className = 'carta-loot-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Nova carta obtida: ' + carta.nome);

  overlay.innerHTML =
    '<div class="carta-loot-box" style="--carta-cor:' + carta.cor + '">' +
      '<div class="carta-loot-titulo">🎴 NOVA CARTA!</div>' +
      '<span class="carta-loot-icone" style="filter:drop-shadow(0 0 30px ' + carta.cor + ')">' + carta.icone + '</span>' +
      '<div class="carta-loot-nome" style="color:' + carta.cor + '">' + carta.nome + '</div>' +
      '<div class="carta-loot-desc">' + carta.desc + '</div>' +
      '<div class="carta-hab-qtd">x' + qtdCarta(carta.id) + '</div>' +
      '<button class="btn-carta" style="margin-top:1.5rem;width:100%" onclick="this.closest(\'.carta-loot-overlay\').remove()">CONTINUAR</button>' +
    '</div>';

  document.body.appendChild(overlay);

  if (typeof tocarSom === 'function') tocarSom('vitoria');

  setTimeout(function() {
    const btn = overlay.querySelector('.btn-carta');
    if (btn) btn.focus();
  }, 100);

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.remove();
  });

  overlay.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') overlay.remove();
  });
}

function renderBarraCartas() {
  let html =
    '<div class="barra-cartas" role="region" aria-label="Cartas de habilidade">' +
      '<div class="barra-cartas-titulo">🎴 CARTAS</div>';

  CARTAS_HABILIDADE.forEach(function(carta) {
    const qtd = qtdCarta(carta.id);
    const usadaNeste = cartasEstado.usadasNesteCaso.indexOf(carta.id) !== -1;
    const semEstoque = qtd <= 0;

    let classes = 'carta-habilidade';
    let status = '';
    if (semEstoque) { classes += ' bloqueada'; status = ' (sem estoque)'; }
    else if (usadaNeste) { classes += ' usada'; status = ' (já usada neste caso)'; }

    const tabindex = (semEstoque || usadaNeste) ? '-1' : '0';

    html +=
      '<div class="' + classes + '" style="--carta-cor:' + carta.cor + '" onclick="abrirModalCarta(\'' + carta.id + '\')" role="button" tabindex="' + tabindex + '" aria-label="' + carta.nome + ': ' + carta.desc + status + '" title="' + carta.desc + '">' +
        '<span class="carta-habilidade-icone">' + carta.icone + '</span>' +
        '<div class="carta-habilidade-nome">' + carta.nome + '</div>' +
        '<div class="carta-habilidade-qtd">x' + qtd + '</div>' +
      '</div>';
  });

  html += '</div>';
  return html;
}

function abrirModalCarta(id) {
  const carta = getCarta(id);
  if (!carta) return;

  const qtd = qtdCarta(id);
  if (qtd <= 0) {
    if (typeof notificar === 'function') notificar('🚫 Sem cartas', 'Você não tem mais cartas do tipo ' + carta.nome);
    return;
  }

  const usadaNeste = cartasEstado.usadasNesteCaso.indexOf(id) !== -1;
  if (usadaNeste) {
    if (typeof notificar === 'function') notificar('✓ Já usada', 'Você já usou essa carta neste caso');
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'modal-carta';
  overlay.id = 'modal-carta';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  overlay.innerHTML =
    '<div class="modal-carta-box" style="--carta-cor:' + carta.cor + '">' +
      '<span class="modal-carta-icone" style="filter:drop-shadow(0 0 25px ' + carta.cor + ')">' + carta.icone + '</span>' +
      '<div class="modal-carta-titulo" style="color:' + carta.cor + '">' + carta.nome + '</div>' +
      '<div class="modal-carta-desc">' + carta.desc + '</div>' +
      '<div style="color:' + carta.cor + ';font-family:var(--font-tech);margin-bottom:1.5rem">Você tem: <strong>' + qtd + '</strong></div>' +
      '<div class="modal-carta-botoes">' +
        '<button class="btn-carta cancelar" onclick="fecharModalCarta()">CANCELAR</button>' +
        '<button class="btn-carta" style="background:linear-gradient(135deg,' + carta.cor + ',#8b1a1a);" onclick="usarCarta(\'' + carta.id + '\')">USAR CARTA</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  if (typeof tocarSom === 'function') tocarSom('clique');

  overlay.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') fecharModalCarta();
  });

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) fecharModalCarta();
  });
}

function fecharModalCarta() {
  const overlay = document.getElementById('modal-carta');
  if (overlay) overlay.remove();
}

function animarVooCarta(carta, alvoSeletor) {
  const origem = document.querySelector('.barra-cartas');
  const alvo = document.querySelector(alvoSeletor);
  if (!origem || !alvo) return;

  const origemRect = origem.getBoundingClientRect();
  const alvoRect = alvo.getBoundingClientRect();

  const voando = document.createElement('div');
  voando.textContent = carta.icone;
  voando.setAttribute('aria-hidden', 'true');
  voando.style.cssText =
    'position:fixed;z-index:99999;pointer-events:none;' +
    'left:' + (origemRect.left + 40) + 'px;top:' + (origemRect.top + 10) + 'px;' +
    'font-size:2rem;filter:drop-shadow(0 0 20px ' + carta.cor + ');' +
    'transition:all 0.9s cubic-bezier(0.4, 0, 0.2, 1);';

  document.body.appendChild(voando);

  requestAnimationFrame(function() {
    voando.style.left = (alvoRect.left + alvoRect.width / 2 - 20) + 'px';
    voando.style.top = (alvoRect.top + alvoRect.height / 2 - 20) + 'px';
    voando.style.transform = 'scale(0.5) rotate(360deg)';
    voando.style.opacity = '0.3';
  });

  setTimeout(function() {
    if (voando.parentNode) voando.remove();
  }, 950);
}

function flashCorCarta(cor) {
  const flash = document.createElement('div');
  flash.setAttribute('aria-hidden', 'true');
  flash.style.cssText =
    'position:fixed;inset:0;z-index:9998;pointer-events:none;' +
    'background:radial-gradient(circle at center, ' + cor + '33 0%, transparent 70%);' +
    'opacity:0;transition:opacity 0.3s;';

  document.body.appendChild(flash);
  requestAnimationFrame(function() { flash.style.opacity = '1'; });

  setTimeout(function() {
    flash.style.opacity = '0';
    setTimeout(function() { if (flash.parentNode) flash.remove(); }, 300);
  }, 400);
}

// ✅ BUG #8: bloqueio de cartas no Hardcore
function usarCarta(id) {
  if (window.isHardcore && isHardcore()) {
    if (typeof notificar === 'function') {
      notificar('💀 HARDCORE', window.idiomaAtual === 'en' ? 'Cards disabled in Hardcore mode' : 'Cartas desabilitadas no modo Hardcore');
    }
    return;
  }

  const carta = getCarta(id);
  if (!carta) return;

  cartasEstado.inventario[id] = (cartasEstado.inventario[id] || 0) - 1;
  cartasEstado.usadasNesteCaso.push(id);
  salvarCartas();

  fecharModalCarta();

  if (typeof tocarSom === 'function') tocarSom(carta.som || 'dica');
  flashCorCarta(carta.cor);

  let alvoSeletor = '.barra-cartas';
  if (carta.efeito === 'dica_gratis') alvoSeletor = '.dicas-box';
  else if (carta.efeito === 'prova_auto' || carta.efeito === 'analisar_tudo') alvoSeletor = '.painel-investigacao';
  else if (carta.efeito === 'escudo') alvoSeletor = '.veredito';
  else if (carta.efeito === 'tempo_extra') alvoSeletor = '#hud-timer-box';
  else if (carta.efeito === 'revela_mentira') alvoSeletor = '.suspeitos';

  animarVooCarta(carta, alvoSeletor);

  setTimeout(function() {
    aplicarEfeitoCarta(carta);
    atualizarBarraCartasNoCaso();
  }, 400);
}

function aplicarEfeitoCarta(carta) {
  let casoAtual = null;
  if (typeof window.casoAtualRef === 'function') casoAtual = window.casoAtualRef();
  else if (window.casoAtual) casoAtual = window.casoAtual;

  let mensagem = '';

  if (carta.efeito === 'revela_mentira') {
    cartasEstado.escudoAtivo = false;
    window.lerMenteAtivo = true;
    mensagem = 'A próxima resposta revelará se o suspeito mente';

  } else if (carta.efeito === 'dica_gratis') {
    if (casoAtual && casoAtual.dicas) {
      const est = (typeof window.estadoRef === 'function') ? window.estadoRef() : window.estado;
      const usadas = (est && est.dicasUsadas[casoAtual.id]) || 0;
      if (usadas < 3) {
        const lista = document.getElementById('dicas-lista');
        if (lista) {
          const nova = document.createElement('div');
          nova.className = 'dica-item dica-carta';
          const dicaTexto = (typeof escapeHTML === 'function' ? escapeHTML(casoAtual.dicas[usadas]) : casoAtual.dicas[usadas]);
          nova.innerHTML = '👁️ <strong>Dica ' + (usadas + 1) + ' (grátis):</strong> ' + dicaTexto;
          lista.appendChild(nova);
        }
        if (est) {
          est.dicasUsadas[casoAtual.id] = usadas + 1;
          if (typeof salvarEstado === 'function') salvarEstado();
        }
        mensagem = 'Uma dica foi revelada gratuitamente';
      } else {
        mensagem = 'Todas as dicas já foram usadas';
      }
    }

  } else if (carta.efeito === 'prova_auto') {
    const evidencias = document.querySelectorAll('.evidencia-item');
    let encontrou = false;
    for (let i = 0; i < evidencias.length; i++) {
      if (!evidencias[i].classList.contains('analisada')) {
        evidencias[i].click();
        encontrou = true;
        break;
      }
    }
    mensagem = encontrou ? 'Uma evidência foi analisada automaticamente' : 'Todas as evidências já foram analisadas';

  } else if (carta.efeito === 'tempo_extra') {
    const est = (typeof window.estadoRef === 'function') ? window.estadoRef() : window.estado;
    if (est && est.modoAtual === 'contrarrelogio') {
      if (typeof window.tempoRestante !== 'undefined') {
        window.tempoRestante = (window.tempoRestante || 0) + 30;
      }
      const el = document.getElementById('hud-timer');
      if (el && typeof window.tempoRestante !== 'undefined') {
        el.textContent = window.tempoRestante;
        el.style.color = '#9fdf9f';
        el.style.fontWeight = 'bold';
        setTimeout(function() { el.style.color = ''; el.style.fontWeight = ''; }, 2000);
      }
      mensagem = '+30 segundos adicionados ao cronômetro';
    } else {
      mensagem = 'Só funciona no modo contrarrelógio';
    }

  } else if (carta.efeito === 'escudo') {
    cartasEstado.escudoAtivo = true;
    mensagem = 'Próxima acusação errada não gasta vida';

  } else if (carta.efeito === 'analisar_tudo') {
    const evidencias = document.querySelectorAll('.evidencia-item');
    evidencias.forEach(function(ev) {
      if (!ev.classList.contains('analisada')) ev.click();
    });
    mensagem = 'Todas as evidências foram reveladas!';
  }

  if (typeof notificar === 'function') {
    notificar(carta.icone + ' ' + carta.nome, mensagem);
  }
}

function atualizarBarraCartasNoCaso() {
  const barraAntiga = document.querySelector('.barra-cartas');
  if (!barraAntiga) return;

  const novaBarra = document.createElement('div');
  novaBarra.innerHTML = renderBarraCartas();

  if (novaBarra.firstChild) {
    barraAntiga.parentNode.replaceChild(novaBarra.firstChild, barraAntiga);
  }
}

function resetarCartasCaso() {
  cartasEstado.usadasNesteCaso = [];
  cartasEstado.escudoAtivo = false;
}

function temEscudoAtivo() { return cartasEstado.escudoAtivo; }
function consumirEscudo() { cartasEstado.escudoAtivo = false; }

function abrirTelaCartas() {
  if (typeof tocarSom === 'function') tocarSom('clique');

  let tela = document.getElementById('screen-cartas-hab');
  if (!tela) {
    tela = document.createElement('section');
    tela.className = 'screen';
    tela.id = 'screen-cartas-hab';
    document.body.appendChild(tela);
  }

  renderizarTelaCartas();
  if (typeof mostrarTela === 'function') mostrarTela('screen-cartas-hab');
}

function renderizarTelaCartas() {
  const tela = document.getElementById('screen-cartas-hab');
  if (!tela) return;

  let totalCartas = 0;
  Object.keys(cartasEstado.inventario).forEach(function(id) {
    totalCartas += cartasEstado.inventario[id] || 0;
  });

  let html =
    '<div class="cartas-hab-box">' +
      '<h2 class="cartas-hab-titulo">🎴 CARTAS DE HABILIDADE</h2>' +
      '<p class="cartas-hab-sub">Você tem ' + totalCartas + ' cartas no inventário</p>' +
      '<div class="cartas-hab-grid" role="list">';

  CARTAS_HABILIDADE.forEach(function(carta) {
    const qtd = qtdCarta(carta.id);
    const bloqueada = qtd <= 0;

    html +=
      '<div class="carta-hab-item ' + (bloqueada ? 'bloqueada' : '') + '" style="--carta-cor:' + carta.cor + ';border-color:' + (bloqueada ? '#444' : carta.cor) + '" role="listitem">' +
        '<span class="carta-hab-icone" style="filter:drop-shadow(0 0 10px ' + carta.cor + ')">' + carta.icone + '</span>' +
        '<div class="carta-hab-nome" style="color:' + carta.cor + '">' + carta.nome + '</div>' +
        '<div class="carta-hab-desc">' + carta.desc + '</div>' +
        '<div class="carta-hab-qtd">x' + qtd + '</div>' +
      '</div>';
  });

  html += '</div>' +
    '<button class="gerador-voltar" style="width:100%;margin-top:1.5rem;display:block" onclick="fecharTelaCartas()">← VOLTAR</button>' +
  '</div>';

  tela.innerHTML = html;
}

function fecharTelaCartas() {
  if (typeof tocarSom === 'function') tocarSom('clique');
  if (typeof mostrarTela === 'function') mostrarTela('screen-app');
}

function iniciarCartas() {
  carregarCartas();

  console.log('✓ Sistema de cartas carregado (v7.2)');
  let total = 0;
  Object.keys(cartasEstado.inventario).forEach(function(id) {
    total += cartasEstado.inventario[id];
  });
  console.log('  Cartas no inventário: ' + total);
}

window.iniciarCartas = iniciarCartas;
window.renderBarraCartas = renderBarraCartas;
window.abrirModalCarta = abrirModalCarta;
window.fecharModalCarta = fecharModalCarta;
window.usarCarta = usarCarta;
window.darCartaAleatoria = darCartaAleatoria;
window.mostrarLootCarta = mostrarLootCarta;
window.abrirTelaCartas = abrirTelaCartas;
window.fecharTelaCartas = fecharTelaCartas;
window.resetarCartasCaso = resetarCartasCaso;
window.temEscudoAtivo = temEscudoAtivo;
window.consumirEscudo = consumirEscudo;
window.adicionarCartaHab = adicionarCartaHab;
window.animarVooCarta = animarVooCarta;
window.flashCorCarta = flashCorCarta;
window.CARTAS_HABILIDADE = CARTAS_HABILIDADE;
window.cartasEstado = cartasEstado;

console.log('✓ Cartas de habilidade carregadas (v7.2)');