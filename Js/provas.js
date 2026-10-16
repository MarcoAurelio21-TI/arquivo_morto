// ============================================================
// ARQUIVO MORTO v5.1 — SISTEMA DE PROVAS E DIÁRIO (CORRIGIDO)
// ============================================================

// ===== BANCO DE PROVAS POR CASO (manual para casos 1-4) =====
const PROVAS_CASOS = {
  1: [
    { prova: true, analise: "O suco foi derramado EXATAMENTE no momento do roubo. Isso não é coincidência — foi uma distração planejada.", nome: "Copo Derrubado" },
    { prova: true, analise: "O relógio parou às 21h15. Isso fixa o momento exato do crime. O amassado indica que foi forçado.", nome: "Relógio Amassado" },
    { prova: true, analise: "Lavanda reduz atrito. Alguém usou óleo essencial para deslizar algo pelo duto de ar sem fazer barulho.", nome: "Aroma de Lavanda" }
  ],
  2: [
    { prova: true, analise: "A luva foi usada para não deixar digitais. Quem usaria luvas naturalmente? Alguém acostumado a manusear objetos delicados.", nome: "Luva de Veludo" },
    { prova: true, analise: "Fita amarela é usada para marcar palcos e cabos. Só alguém que trabalha com palco teria isso à mão.", nome: "Fita Amarela" },
    { prova: true, analise: "A porta foi trancada POR FORA sem a chave. Só quem conhece o mecanismo consegue fazer isso com arame.", nome: "Tranca Forçada" }
  ],
  3: [
    { prova: true, analise: "A tinta ainda estava úmida. Isso significa que a mancha foi feita HÁ POUCO TEMPO. O crime ocorreu recentemente.", nome: "Tinta Fresca" },
    { prova: true, analise: "O livro fora de ordem indica que alguém subiu numa escada com pressa e devolveu o livro no lugar errado.", nome: "Livro Fora de Ordem" },
    { prova: true, analise: "O cão NÃO latiu. Isso significa que quem entrou era alguém CONHECIDO da casa — um familiar ou morador.", nome: "Cão Tranquilo" }
  ],
  4: [
    { prova: true, analise: "O sedativo foi colocado no chá. Só quem preparou ou serviu a bebida poderia ter feito isso.", nome: "Chá com Sedativo" },
    { prova: true, analise: "03-12-09 pode ser um horário (03:12) ou uma data. Combinado com a parada técnica, indica quando o crime ocorreu.", nome: "Bilhete Numérico" },
    { prova: true, analise: "A poeira de carvão está na parte EXTERNA da janela. Alguém entrou por fora — só o condutor teria a chave mestra.", nome: "Fuligem Externa" }
  ]
};

// ===== GERADOR PROCEDURAL DE PROVAS =====
// Cria 3 provas analisáveis para QUALQUER caso que não tenha banco manual
function gerarProvasProcedurais(caso) {
  if (!caso || !caso.evidencias) return [];

  var analises = [
    'Essa evidência é consistente com o momento do crime. Alguém que estava no local teria acesso a ela.',
    'O padrão dessa evidência sugere conhecimento prévio do local. Não foi acidental.',
    'Detalhe revelador: essa evidência conecta o suspeito à cena. Quem tinha acesso a isso?',
    'A presença desse item é anômala. Não deveria estar aqui — a menos que alguém o tenha colocado de propósito.',
    'Essa evidência contradiz o depoimento de pelo menos um dos suspeitos. Anote isso.',
    'A análise forense confirma: essa evidência foi deixada no momento do crime, não antes.',
    'Vestígio sutil, mas decisivo. Correlacione com os outros achados para identificar o culpado.',
    'A posição dessa evidência sugere que foi plantada ou movida. Investigar quem teve oportunidade.'
  ];

  var provas = [];
  var evidencias = caso.evidencias || [];

  // Para cada evidência, gera uma prova analisável
  for (var i = 0; i < evidencias.length && i < 3; i++) {
    var ev = evidencias[i];
    var nomeCurto = ev.length > 40 ? ev.substring(0, 37) + '...' : ev;
    provas.push({
      prova: true,
      analise: analises[i % analises.length],
      nome: nomeCurto
    });
  }

  // Se o caso tem menos de 3 evidências, completa com base nas dicas
  if (provas.length < 3 && caso.dicas) {
    for (var j = 0; provas.length < 3 && j < caso.dicas.length; j++) {
      var dica = caso.dicas[j];
      var nomeDica = dica.length > 40 ? dica.substring(0, 37) + '...' : dica;
      provas.push({
        prova: true,
        analise: 'A dica se confirma como prova material: ' + dica,
        nome: nomeDica
      });
    }
  }

  // Último recurso: provas genéricas
  while (provas.length < 3) {
    provas.push({
      prova: true,
      analise: 'Evidência circunstancial coletada na cena. Reforça a linha de investigação.',
      nome: 'Evidência #' + (provas.length + 1)
    });
  }

  return provas;
}

// ===== OBTER PROVAS DE UM CASO (manual ou procedural) =====
function getProvasDoCaso(caso) {
  if (!caso) return [];
  if (PROVAS_CASOS[caso.id]) return PROVAS_CASOS[caso.id];
  return gerarProvasProcedurais(caso);
}

// ===== ESTADO DE PROVAS =====
let provasColetadas = {};
let diarioEntradas = {};
let suspeitoMarcado = {};
let ferramentaAtiva = null;

// ===== INICIALIZAÇÃO =====
function iniciarSistemaProvas() {
  try {
    const salvo = localStorage.getItem('arquivoMorto_provas');
    if (salvo) provasColetadas = JSON.parse(salvo);
  } catch(e) {}

  try {
    const salvoDiario = localStorage.getItem('arquivoMorto_diario');
    if (salvoDiario) diarioEntradas = JSON.parse(salvoDiario);
  } catch(e) {}

  try {
    const salvoSuspeito = localStorage.getItem('arquivoMorto_suspeito');
    if (salvoSuspeito) suspeitoMarcado = JSON.parse(salvoSuspeito);
  } catch(e) {}

  console.log('✓ Sistema de provas carregado (v5.1 — procedural)');
}

function salvarProvas() {
  try {
    localStorage.setItem('arquivoMorto_provas', JSON.stringify(provasColetadas));
    localStorage.setItem('arquivoMorto_diario', JSON.stringify(diarioEntradas));
    localStorage.setItem('arquivoMorto_suspeito', JSON.stringify(suspeitoMarcado));
  } catch(e) {}
}

// ===== ADICIONAR ENTRADA AO DIÁRIO =====
function adicionarDiario(casoId, texto, destaque) {
  if (!diarioEntradas[casoId]) diarioEntradas[casoId] = [];

  const agora = new Date();
  const hora = String(agora.getHours()).padStart(2, '0') + ':' + String(agora.getMinutes()).padStart(2, '0');

  diarioEntradas[casoId].push({
    hora: hora,
    texto: texto,
    destaque: destaque || false
  });

  salvarProvas();
  atualizarDiario(casoId);
}

// ===== ANALISAR EVIDÊNCIA =====
function analisarEvidencia(casoId, idx) {
  const caso = getCasoPorId(casoId);
  if (!caso) return;

  const provasCaso = getProvasDoCaso(caso);
  const prova = provasCaso[idx];

  if (!prova) {
    mostrarAnaliseGenerica(caso.evidencias[idx], casoId, idx);
    return;
  }

  if (!provasColetadas[casoId]) provasColetadas[casoId] = [];
  const jaColetada = provasColetadas[casoId].indexOf(prova.nome) !== -1;

  if (jaColetada) {
    mostrarAnalise(prova.nome, prova.analise, true, null);
    return;
  }

  mostrarAnalise(prova.nome, prova.analise, false, function() {
    if (provasColetadas[casoId].indexOf(prova.nome) === -1) {
      provasColetadas[casoId].push(prova.nome);
    }

    adicionarDiario(casoId, '📌 Coletada prova: <strong>' + prova.nome + '</strong>', true);
    adicionarDiario(casoId, prova.analise, false);

    salvarProvas();
    atualizarPainelProvas(casoId);

    const el = document.querySelector('[data-evidencia-idx="' + idx + '"]');
    if (el) el.classList.add('analisada');

    tocarSom('acerto');
  });
}

// ===== MOSTRAR MODAL DE ANÁLISE =====
function mostrarAnalise(titulo, texto, jaColetada, callback) {
  const antigo = document.querySelector('.modal-analise');
  if (antigo) antigo.remove();

  const modal = document.createElement('div');
  modal.className = 'modal-analise';
  modal.innerHTML =
    '<div class="modal-analise-box">' +
      '<div class="modal-analise-titulo">🔍 ' + escapeHTML(titulo) + '</div>' +
      '<div class="modal-analise-texto">' + texto + '</div>' +
      '<div class="modal-analise-botoes">' +
        (jaColetada
          ? '<button class="modal-analise-btn secundario" onclick="this.closest(\'.modal-analise\').remove()">FECHAR</button>'
          : '<button class="modal-analise-btn" id="btn-coletar-prova">📌 COLETAR PROVA</button>' +
            '<button class="modal-analise-btn secundario" onclick="this.closest(\'.modal-analise\').remove()">IGNORAR</button>'
        ) +
      '</div>' +
    '</div>';

  document.body.appendChild(modal);

  if (!jaColetada && callback) {
    const btn = document.getElementById('btn-coletar-prova');
    if (btn) {
      btn.addEventListener('click', function() {
        callback();
        modal.remove();
      });
    }
  }
}

function mostrarAnaliseGenerica(textoEvidencia, casoId, idx) {
  const analise = "Essa evidência parece comum à primeira vista. Talvez ela se conecte com outras provas se você analisar mais detalhadamente.";

  mostrarAnalise(
    'Evidência Sem Análise Especial',
    analise + '<br><br><em>Dica: nem toda evidência é uma prova. Algumas são apenas distrações.</em>',
    false,
    function() {
      adicionarDiario(casoId, '📄 Analisada evidência sem relevância aparente.', false);
      const el = document.querySelector('[data-evidencia-idx="' + idx + '"]');
      if (el) el.classList.add('falsa');
    }
  );
}

// ===== ADICIONAR PROVA VIA INTERROGATÓRIO =====
function adicionarProvaInterrogatorio(casoId, nomeProva) {
  if (!provasColetadas[casoId]) provasColetadas[casoId] = [];

  if (provasColetadas[casoId].indexOf(nomeProva) === -1) {
    provasColetadas[casoId].push(nomeProva);
    salvarProvas();

    adicionarDiario(casoId, '⚡ Prova obtida via interrogatório: <strong>' + nomeProva + '</strong>', true);

    if (window.atualizarPainelProvas) {
      atualizarPainelProvas(casoId);
    }

    tocarSom('acerto');
  }
}

// ===== ATUALIZAR PAINEL DE PROVAS =====
function atualizarPainelProvas(casoId) {
  const painel = document.querySelector('.painel-investigacao');
  if (!painel) return;

  const caso = getCasoPorId(casoId);
  if (!caso) return;

  const provasCaso = getProvasDoCaso(caso);
  const coletadas = provasColetadas[casoId] || [];
  const totalProvas = provasCaso.length;
  const numColetadas = coletadas.length;
  const pct = totalProvas > 0 ? (numColetadas / totalProvas) * 100 : 0;

  const contador = painel.querySelector('.painel-contador strong');
  if (contador) contador.textContent = numColetadas + '/' + totalProvas;

  const fill = painel.querySelector('.barra-inv-fill');
  if (fill) fill.style.width = pct + '%';

  const chips = painel.querySelector('.provas-coletadas');
  if (chips) {
    chips.innerHTML = '';
    coletadas.forEach(function(nome) {
      const chip = document.createElement('div');
      chip.className = 'prova-chip';
      chip.innerHTML = '📌 ' + escapeHTML(nome);
      chips.appendChild(chip);
    });
  }

  const podeAcusar = numColetadas >= 3;

  const aviso = document.querySelector('.aviso-provas');
  if (aviso) {
    if (podeAcusar) {
      aviso.className = 'aviso-provas completo';
      aviso.innerHTML = '✓ <strong>Você tem provas suficientes para acusar!</strong><br>Escolha o suspeito com cuidado.';
    } else {
      aviso.className = 'aviso-provas';
      aviso.innerHTML = '⚠ Você precisa coletar <strong>' + (3 - numColetadas) + ' prova(s) a mais</strong> antes de acusar.';
    }
  }

  const botoes = document.querySelectorAll('.btn-suspeito');
  botoes.forEach(function(btn) {
    if (!podeAcusar) {
      btn.disabled = true;
      btn.title = 'Colete pelo menos 3 provas primeiro';
    } else {
      btn.disabled = false;
      btn.title = '';
    }
  });
}

// ===== RENDERIZAR PAINEL =====
function renderPainelInvestigacao(caso) {
  const provasCaso = getProvasDoCaso(caso);
  const coletadas = provasColetadas[caso.id] || [];
  const numColetadas = coletadas.length;
  const totalProvas = provasCaso.length;
  const pct = totalProvas > 0 ? (numColetadas / totalProvas) * 100 : 0;
  const podeAcusar = numColetadas >= 3;

  let chipsHTML = '';
  coletadas.forEach(function(nome) {
    chipsHTML += '<div class="prova-chip">📌 ' + escapeHTML(nome) + '</div>';
  });

  return (
    '<div class="painel-investigacao">' +
      '<div class="painel-header">' +
        '<div class="painel-titulo">🔍 INVESTIGAÇÃO EM ANDAMENTO</div>' +
        '<div class="painel-contador">Provas: <strong>' + numColetadas + '/' + totalProvas + '</strong></div>' +
      '</div>' +
      '<div class="barra-investigacao">' +
        '<div class="barra-inv-fill" style="width:' + pct + '%"></div>' +
      '</div>' +
      '<div class="ferramentas">' +
        '<button class="ferramenta-btn" data-ferramenta="lupa">🔍 MODO LUPA</button>' +
        '<button class="ferramenta-btn" data-ferramenta="analisar">📊 ANALISAR TUDO</button>' +
      '</div>' +
      '<div class="provas-coletadas">' + chipsHTML + '</div>' +
      '<div class="aviso-provas ' + (podeAcusar ? 'completo' : '') + '">' +
        (podeAcusar
          ? '✓ <strong>Você tem provas suficientes para acusar!</strong><br>Escolha o suspeito com cuidado.'
          : '⚠ Você precisa coletar <strong>' + (3 - numColetadas) + ' prova(s) a mais</strong> antes de acusar.'
        ) +
      '</div>' +
    '</div>'
  );
}

// ===== RENDERIZAR DIÁRIO =====
function renderDiario(casoId) {
  const entradas = diarioEntradas[casoId] || [];

  let html =
    '<div class="diario-container" id="diario-container">' +
      '<div class="diario-header" onclick="toggleDiario()">' +
        '<h3>📓 DIÁRIO DO DETETIVE</h3>' +
        '<span class="diario-toggle">▼</span>' +
      '</div>' +
      '<div class="diario-body">';

  if (entradas.length === 0) {
    html += '<div class="diario-vazio">Nenhuma anotação ainda.<br>Analise as evidências para adicionar entradas.</div>';
  } else {
    entradas.forEach(function(entrada) {
      html +=
        '<div class="diario-entrada ' + (entrada.destaque ? 'destaque' : '') + '">' +
          '<span class="hora">[' + entrada.hora + ']</span>' +
          '<span class="texto">' + entrada.texto + '</span>' +
        '</div>';
    });
  }

  html += '</div></div>';

  return html;
}

function toggleDiario() {
  const container = document.getElementById('diario-container');
  if (container) {
    container.classList.toggle('fechado');
  }
}

function atualizarDiario(casoId) {
  const body = document.querySelector('.diario-body');
  if (!body) return;

  const entradas = diarioEntradas[casoId] || [];

  if (entradas.length === 0) {
    body.innerHTML = '<div class="diario-vazio">Nenhuma anotação ainda.</div>';
    return;
  }

  body.innerHTML = '';
  entradas.forEach(function(entrada) {
    const div = document.createElement('div');
    div.className = 'diario-entrada ' + (entrada.destaque ? 'destaque' : '');
    div.innerHTML =
      '<span class="hora">[' + entrada.hora + ']</span>' +
      '<span class="texto">' + entrada.texto + '</span>';
    body.appendChild(div);
  });

  body.scrollTop = body.scrollHeight;
}

// ===== CONFIGURAR EVIDÊNCIAS =====
function configurarEvidencias(caso) {
  const provasCaso = getProvasDoCaso(caso);

  document.querySelectorAll('.evidencia-item').forEach(function(el, idx) {
    const prova = provasCaso[idx];
    const jaColetada = prova && provasColetadas[caso.id] &&
                       provasColetadas[caso.id].indexOf(prova.nome) !== -1;

    if (jaColetada) {
      el.classList.add('analisada');
    }

    el.addEventListener('click', function() {
      analisarEvidencia(caso.id, idx);
    });

    el.addEventListener('mouseenter', function(e) {
      mostrarTooltipEvidencia(e, caso, idx);
    });

    el.addEventListener('mousemove', function(e) {
      moverTooltipEvidencia(e);
    });

    el.addEventListener('mouseleave', function() {
      esconderTooltipEvidencia();
    });
  });
}

// ===== TOOLTIP DE EVIDÊNCIA =====
function mostrarTooltipEvidencia(e, caso, idx) {
  let tooltip = document.getElementById('evidencia-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'evidencia-tooltip';
    tooltip.id = 'evidencia-tooltip';
    document.body.appendChild(tooltip);
  }

  const provasCaso = getProvasDoCaso(caso);
  const prova = provasCaso[idx];
  const jaColetada = prova && provasColetadas[caso.id] &&
                     provasColetadas[caso.id].indexOf(prova.nome) !== -1;

  tooltip.innerHTML =
    '<div class="titulo">' + (prova ? '🔍 ' + escapeHTML(prova.nome) : '📄 Evidência') + '</div>' +
    '<div>' + (prova ? escapeHTML(prova.analise.substring(0, 80)) + '...' : 'Clique para analisar') + '</div>' +
    '<div class="instrucao">' + (jaColetada ? '✓ Já coletada como prova' : '💡 Clique para analisar') + '</div>';

  tooltip.classList.add('show');
  moverTooltipEvidencia(e);
}

function moverTooltipEvidencia(e) {
  const tooltip = document.getElementById('evidencia-tooltip');
  if (!tooltip) return;

  let x = e.clientX + 15;
  let y = e.clientY + 15;

  if (x + 300 > window.innerWidth) x = e.clientX - 310;
  if (y + 150 > window.innerHeight) y = e.clientY - 160;

  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
}

function esconderTooltipEvidencia() {
  const tooltip = document.getElementById('evidencia-tooltip');
  if (tooltip) tooltip.classList.remove('show');
}

// ===== CONFIGURAR FERRAMENTAS =====
function configurarFerramentas() {
  document.querySelectorAll('.ferramenta-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const ferramenta = btn.getAttribute('data-ferramenta');

      if (ferramentaAtiva === ferramenta) {
        ferramentaAtiva = null;
        btn.classList.remove('ativo');
      } else {
        document.querySelectorAll('.ferramenta-btn').forEach(function(b) {
          b.classList.remove('ativo');
        });
        ferramentaAtiva = ferramenta;
        btn.classList.add('ativo');

        if (ferramenta === 'analisar') {
          analisarTudo();
          setTimeout(function() {
            btn.classList.remove('ativo');
            ferramentaAtiva = null;
          }, 500);
        }
      }

      tocarSom('clique');
    });
  });
}

// ===== ANALISAR TUDO =====
function analisarTudo() {
  if (!casoAtual) return;

  const provasCaso = getProvasDoCaso(casoAtual);

  if (!provasColetadas[casoAtual.id]) provasColetadas[casoAtual.id] = [];

  provasCaso.forEach(function(prova) {
    if (provasColetadas[casoAtual.id].indexOf(prova.nome) === -1) {
      provasColetadas[casoAtual.id].push(prova.nome);
    }
  });

  document.querySelectorAll('.evidencia-item').forEach(function(el) {
    el.classList.add('analisada');
  });

  adicionarDiario(casoAtual.id, '📊 Análise completa realizada. ' + provasCaso.length + ' provas identificadas.', true);

  salvarProvas();
  atualizarPainelProvas(casoAtual.id);

  tocarSom('acerto');
}

// ===== CONFIGURAR SUSPEITOS =====
function configurarSuspeitos(caso) {
  document.querySelectorAll('.suspeito-card').forEach(function(card, idx) {
    const nome = caso.suspeitos[idx].nome;
    const marcado = suspeitoMarcado[caso.id] === nome;

    if (marcado) card.classList.add('suspeito-principal');

    const btnMarcar = document.createElement('button');
    btnMarcar.className = 'btn-marcar-suspeito' + (marcado ? ' marcado' : '');
    btnMarcar.textContent = marcado ? '⭐ PRINCIPAL' : '☆ MARCAR PRINCIPAL';
    btnMarcar.addEventListener('click', function(e) {
      e.stopPropagation();
      marcarSuspeito(caso.id, nome, card, btnMarcar);
    });

    const info = card.querySelector('.suspeito-info');
    if (info) info.appendChild(btnMarcar);
  });
}

function marcarSuspeito(casoId, nome, card, btn) {
  document.querySelectorAll('.suspeito-card').forEach(function(c) {
    c.classList.remove('suspeito-principal');
  });
  document.querySelectorAll('.btn-marcar-suspeito').forEach(function(b) {
    b.classList.remove('marcado');
    b.textContent = '☆ MARCAR PRINCIPAL';
  });

  if (suspeitoMarcado[casoId] === nome) {
    delete suspeitoMarcado[casoId];
    adicionarDiario(casoId, '☆ Suspeito desmarcado.', false);
  } else {
    suspeitoMarcado[casoId] = nome;
    card.classList.add('suspeito-principal');
    btn.classList.add('marcado');
    btn.textContent = '⭐ PRINCIPAL';
    adicionarDiario(casoId, '⭐ <strong>' + nome + '</strong> marcado como suspeito principal.', true);
  }

  salvarProvas();
  tocarSom('clique');
}

// ===== VALIDAR ACUSAÇÃO =====
function validarAcusacao() {
  if (!casoAtual) return false;

  const coletadas = provasColetadas[casoAtual.id] || [];

  if (coletadas.length < 3) {
    alert('🔍 Você precisa coletar pelo menos 3 provas antes de acusar!\n\nVocê tem ' + coletadas.length + ' prova(s).\n\nClique nas evidências para analisá-las.');
    return false;
  }

  return true;
}

// ===== LIMPAR PROVAS =====
function limparProvasCaso(casoId) {
  adicionarDiario(casoId, '✓ Caso encerrado. Provas arquivadas.', true);
}

// ===== EXPORTAR =====
window.iniciarSistemaProvas = iniciarSistemaProvas;
window.renderPainelInvestigacao = renderPainelInvestigacao;
window.renderDiario = renderDiario;
window.configurarEvidencias = configurarEvidencias;
window.configurarFerramentas = configurarFerramentas;
window.configurarSuspeitos = configurarSuspeitos;
window.atualizarPainelProvas = atualizarPainelProvas;
window.toggleDiario = toggleDiario;
window.validarAcusacao = validarAcusacao;
window.adicionarProvaInterrogatorio = adicionarProvaInterrogatorio;
window.adicionarDiario = adicionarDiario;
window.limparProvasCaso = limparProvasCaso;
window.getProvasDoCaso = getProvasDoCaso;
window.gerarProvasProcedurais = gerarProvasProcedurais;
window.diarioEntradas = diarioEntradas;

console.log('✓ Sistema de provas carregado (v5.1 — procedural)');