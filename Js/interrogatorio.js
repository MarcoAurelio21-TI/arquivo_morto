// ============================================================
// ARQUIVO MORTO v5.1 — INTERROGATÓRIO (CORRIGIDO)
// ============================================================

if (typeof window.escapeHTML !== 'function') {
  window.escapeHTML = function(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  };
}

if (typeof window.typewriter !== 'function') {
  window.typewriter = function(el, texto, v, cb) {
    if (!el) return;
    el.textContent = '';
    let i = 0;
    const t = setInterval(function() {
      el.textContent += texto.charAt(i);
      i++;
      if (i >= texto.length) { clearInterval(t); if (cb) cb(); }
    }, v || 30);
  };
}

// ===== PERGUNTAS PADRÃO =====
const PERGUNTAS_PADRAO = [
  {
    id: 'onde_estava',
    texto: "Onde você estava no momento do crime?",
    icone: '📍',
    respostas: {
      verdade: "Estava exatamente onde disse na minha declaração inicial. Não tenho nada a esconder.",
      mentira: "Eu... eu estava lá, sim. Mas não fiz nada! Só... só passei por perto, foi tudo."
    }
  },
  {
    id: 'relacao_vitima',
    texto: "Qual era sua relação com a vítima?",
    icone: '👥',
    respostas: {
      verdade: "Tínhamos uma relação normal. Nada que justificasse isso.",
      mentira: "Nós... nós éramos próximos. Muito próximos. Mas isso não significa nada, certo?"
    }
  },
  {
    id: 'motivo',
    texto: "Você tinha algum motivo para querer a vítima morta?",
    icone: '🎭',
    respostas: {
      verdade: "Nenhum motivo. Absolutamente nenhum. Isso é um absurdo.",
      mentira: "Motivo? Eu... bem, talvez houvesse... não, esquece, não havia nada. NADA."
    }
  },
  {
    id: 'coartada',
    texto: "Alguém pode confirmar sua coartada?",
    icone: '🔐',
    respostas: {
      verdade: "Sim, tenho testemunhas. Podem confirmar cada palavra que disse.",
      mentira: "Bem... não exatamente. Mas isso não prova nada, certo? Eu estava sozinho, mas..."
    }
  }
];

// ===== PERGUNTAS ESPECÍFICAS POR CASO (manuais 1-4) =====
const PERGUNTAS_ESPECIFICAS = {
  1: [
    { id: 'sobre_lavanda', texto: "Sobre o aroma de lavanda perto do duto de ar — você sabe algo disso?", icone: '🌸',
      respostas: { verdade: "Lavanda? Nunca usei isso na minha vida. Deve ser coincidência.", mentira: "Lavanda... é, eu uso óleo essencial às vezes. Mas isso não tem nada a ver! (hesita)" },
      prova: 'Aroma de Lavanda' },
    { id: 'sobre_duto', texto: "Você conhecia o sistema de ventilação da galeria?", icone: '💨',
      respostas: { verdade: "Conhecia por cima. Nunca me interessei pelos detalhes técnicos.", mentira: "Eu... sim, eu conhecia bem. Muito bem. Mas isso é normal para quem cresceu aqui!" },
      prova: 'Sistema de Ventilação' },
    { id: 'sobre_suco', texto: "Quem derramou o suco? Você viu?", icone: '🥤',
      respostas: { verdade: "Vi o mordomo passando. Foi um acidente, todos olharam para o barulho.", mentira: "Não... não vi nada. Só ouvi o barulho. (desvia o olhar)" } }
  ],
  2: [
    { id: 'sobre_luva', texto: "Uma luva de veludo preto foi encontrada. Você usa luvas?", icone: '🧤',
      respostas: { verdade: "Uso luvas apenas quando necessário. Não tenho nenhuma de veludo preto.", mentira: "Luva? É... uso sim. Para tocar piano. Mas não é crime usar luvas, certo?" },
      prova: 'Luva de Veludo' },
    { id: 'sobre_piano', texto: "Você teve acesso ao piano do maestro nos últimos dias?", icone: '🎹',
      respostas: { verdade: "Não mexi no piano dele. Só o maestro toca nesse instrumento.", mentira: "Eu... sim, eu conferi uma vez. Só para ver se estava afinado! Não fiz nada de mais." },
      prova: 'Acesso ao Piano' }
  ],
  3: [
    { id: 'sobre_tinta', texto: "A mancha de tinta azul ainda estava úmida. Você tem canetas azuis?", icone: '🖋️',
      respostas: { verdade: "Uso caneta preta. Sempre. Não tenho azuis.", mentira: "Azul? Bem... talvez. Mas isso não significa nada! Qualquer um pode ter caneta azul." },
      prova: 'Mancha de Tinta' },
    { id: 'sobre_cao', texto: "O cão de guarda permaneceu calmo a noite toda. Isso é normal?", icone: '🐕',
      respostas: { verdade: "O cão late para estranhos. Se não latiu, era alguém de casa.", mentira: "O cão... é, ele é quieto às vezes. Não significa nada que ele não tenha latido." },
      prova: 'Cão Tranquilo' }
  ],
  4: [
    { id: 'sobre_cha', texto: "Quem preparou o chá da condessa?", icone: '🍵',
      respostas: { verdade: "Não tenho nada a ver com o chá. Não subi naquela cabine esta noite.", mentira: "Eu... levei o chá. Mas foi só isso! Não coloquei nada nele, juro!" },
      prova: 'Chá com Sedativo' },
    { id: 'sobre_bilhete', texto: "O bilhete 03-12-09 significa algo para você?", icone: '📝',
      respostas: { verdade: "Números? Não sei o que significam. Deve ser algo do trem.", mentira: "03-12-09... é, talvez. Isso pode ser um horário, mas eu não escrevi nada!" },
      prova: 'Bilhete Numérico' }
  ]
};

// ===== GERADOR PROCEDURAL DE PERGUNTAS =====
// Cria perguntas específicas para qualquer caso baseado em evidências
function gerarPerguntasProcedurais(caso) {
  if (!caso || !caso.evidencias) return [];

  var perguntas = [];
  var evidencias = caso.evidencias || [];

  // 1 pergunta por evidência (até 4)
  for (var i = 0; i < evidencias.length && i < 4; i++) {
    var ev = evidencias[i];
    var evCurta = ev.length > 60 ? ev.substring(0, 57) + '...' : ev;

    perguntas.push({
      id: 'sobre_ev_' + i,
      texto: 'Sobre a evidência "' + evCurta + '" — o que você sabe?',
      icone: '🔍',
      respostas: {
        verdade: 'Não tenho nada a ver com isso. Essa evidência não me diz nada, detetive.',
        mentira: 'Isso... isso não prova nada! Qualquer um podia ter acesso a isso, não é mesmo?'
      },
      prova: evCurta
    });
  }

  // 1 pergunta sobre o suspeito culpado (para todos os casos)
  perguntas.push({
    id: 'onde_estava_detalhado',
    texto: 'Alguém pode confirmar onde você estava exatamente 30 minutos antes do crime?',
    icone: '⏰',
    respostas: {
      verdade: 'Sim. Falei com uma pessoa que pode confirmar. Não tenho nada a esconder.',
      mentira: 'Bem... eu... é complicado. Mas eu estava por perto, sim. Mas não fiz nada!'
    }
  });

  return perguntas;
}

// ===== OBTER PERGUNTAS DE UM CASO (manual ou procedural) =====
function getPerguntasDoCaso(caso) {
  if (!caso) return PERGUNTAS_PADRAO.slice();

  var especificas = PERGUNTAS_ESPECIFICAS[caso.id];
  if (!especificas) {
    especificas = gerarPerguntasProcedurais(caso);
  }

  return PERGUNTAS_PADRAO.concat(especificas);
}

// ===== PERGUNTA DE PRESSÃO =====
const PERGUNTA_PRESSAO = {
  id: 'pressao_mentira',
  texto: "🔴 PRESSIONAR — SABEMOS QUE VOCÊ ESTÁ MENTINDO!",
  icone: '⚠️',
  respostas: {
    verdade: "Eu NÃO estou mentindo! Como ousa dizer isso?!",
    mentira: "Eu... eu não... tá, tá bom! Não foi bem assim. Mas foi sem querer! (confessa)"
  }
};

// ===== ESTADO =====
let interrogatorioAtivo = false;
let suspeitoAtual = null;
let casoInterrogatorio = null;
let perguntasUsadas = [];
let logInterrogatorio = [];
let estresseSuspeito = 0;
let verdadeSuspeito = 100;
let suspeitoEstaMentindo = false;
let numPerguntasFeitas = 0;
let contradicoesEncontradas = 0;

// ===== INICIAR =====
function iniciarInterrogatorio(caso, suspeito) {
  casoInterrogatorio = caso;
  suspeitoAtual = suspeito;
  interrogatorioAtivo = true;
  perguntasUsadas = [];
  logInterrogatorio = [];
  estresseSuspeito = 0;
  numPerguntasFeitas = 0;
  contradicoesEncontradas = 0;

  const ehCulpado = suspeito.nome === caso.culpado;
  suspeitoEstaMentindo = ehCulpado;
  verdadeSuspeito = ehCulpado ? 20 : 90;

  criarOverlayInterrogatorio();
  adicionarLog('Interrogatório iniciado com ' + suspeito.nome, 'neutro');

  if (typeof tocarSom === 'function') tocarSom('clique');
}

// ===== CRIAR OVERLAY =====
function criarOverlayInterrogatorio() {
  const antigo = document.querySelector('.interrogatorio-overlay');
  if (antigo) antigo.remove();

  const ov = document.createElement('div');
  ov.className = 'interrogatorio-overlay ativo';
  ov.id = 'interrogatorio-overlay';

  const btnVoltar = document.getElementById('btn-voltar-global');
  if (btnVoltar) btnVoltar.classList.remove('show');

  const avatar = suspeitoAtual.avatar || '❓';
  const nomeSeguro = (typeof escapeHTML === 'function' ? escapeHTML(suspeitoAtual.nome) : suspeitoAtual.nome);

  ov.innerHTML =
    '<div class="interrogatorio-box" id="interrogatorio-box">' +
      '<div class="indicador-mentira" id="indicador-mentira">🤥 MENTINDO</div>' +
      '<div class="interrogatorio-header">' +
        '<div class="interrogatorio-titulo">' +
          '🔴 INTERROGATÓRIO · CASO #00' + casoInterrogatorio.id +
        '</div>' +
        '<div class="interrogatorio-controles">' +
          '<button class="btn-fechar-int" onclick="fecharInterrogatorio()">✕ ENCERRAR</button>' +
        '</div>' +
      '</div>' +
      '<div class="interrogatorio-conteudo">' +
        '<div class="suspeito-visual">' +
          '<div class="suspeito-avatar-grande" id="suspeito-avatar-grande">' +
            '<span>' + avatar + '</span>' +
            '<div class="suspeito-emocao" id="suspeito-emocao">😐</div>' +
          '</div>' +
          '<div class="suspeito-status">' +
            '<div class="status-barra">' +
              '<div class="status-label"><span>ESTRESSE</span><span id="estresse-val">0%</span></div>' +
              '<div class="status-fill"><div class="status-fill-inner estresse-fill" id="estresse-fill" style="width:0%"></div></div>' +
            '</div>' +
            '<div class="status-barra">' +
              '<div class="status-label"><span>VERDADE</span><span id="verdade-val">?</span></div>' +
              '<div class="status-fill"><div class="status-fill-inner verdade-fill" id="verdade-fill" style="width:50%"></div></div>' +
            '</div>' +
            '<div class="status-barra">' +
              '<div class="status-label"><span>CONFIANÇA</span><span id="confianca-val">50%</span></div>' +
              '<div class="status-fill"><div class="status-fill-inner confianca-fill" id="confianca-fill" style="width:50%"></div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="dialogo-area">' +
          '<div class="dialogo-nome" id="dialogo-nome">' + nomeSeguro + '</div>' +
          '<div class="dialogo-texto" id="dialogo-texto">' +
            'Estou pronto para responder suas perguntas, detetive.' +
          '</div>' +
          '<div class="resposta-analise" id="resposta-analise"></div>' +
          '<div class="perguntas-titulo">▸ ESCOLHA UMA PERGUNTA:</div>' +
          '<div class="perguntas-lista" id="perguntas-lista"></div>' +
          '<div class="pressionar-box" id="pressionar-box" style="display:none">' +
            '<h4>🔴 MODO PRESSÃO DISPONÍVEL</h4>' +
            '<p>Você já fez 3 perguntas. Pode pressionar o suspeito para forçar a verdade.</p>' +
            '<button class="btn-pressionar" onclick="pressionarSuspeito()">💥 PRESSIONAR</button>' +
          '</div>' +
          '<div class="int-log" id="int-log">' +
            '<div class="int-log-titulo">📋 REGISTRO DO INTERROGATÓRIO</div>' +
            '<div id="int-log-lista"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.body.appendChild(ov);

  renderizarPerguntas();
  atualizarStatusVisual();
}

// ===== RENDERIZAR PERGUNTAS (usa getPerguntasDoCaso) =====
function renderizarPerguntas() {
  const lista = document.getElementById('perguntas-lista');
  if (!lista) return;

  lista.innerHTML = '';

  const todas = getPerguntasDoCaso(casoInterrogatorio);

  todas.forEach(function(pergunta) {
    const usada = perguntasUsadas.indexOf(pergunta.id) !== -1;

    const btn = document.createElement('button');
    btn.className = 'pergunta-btn' + (usada ? ' usada' : '');
    btn.disabled = usada;
    btn.innerHTML =
      '<span class="icone">' + pergunta.icone + '</span>' +
      '<span>' + (usada ? '✓ ' : '') + (typeof escapeHTML === 'function' ? escapeHTML(pergunta.texto) : pergunta.texto) + '</span>';

    if (!usada) {
      btn.addEventListener('click', function() {
        fazerPergunta(pergunta);
      });
    }

    lista.appendChild(btn);
  });
}

// ===== FAZER PERGUNTA =====
function fazerPergunta(pergunta) {
  if (!interrogatorioAtivo) return;
  if (perguntasUsadas.indexOf(pergunta.id) !== -1) return;

  perguntasUsadas.push(pergunta.id);
  numPerguntasFeitas++;

  const ehCulpado = suspeitoAtual.nome === casoInterrogatorio.culpado;
  const chanceMentir = ehCulpado ? 0.7 + (numPerguntasFeitas * 0.05) : 0.2;
  const mentiu = Math.random() < chanceMentir;

  const resposta = mentiu ? pergunta.respostas.mentira : pergunta.respostas.verdade;

  estresseSuspeito = Math.min(100, estresseSuspeito + (mentiu ? 15 : 8));
  verdadeSuspeito = Math.max(0, Math.min(100, verdadeSuspeito + (mentiu ? -10 : 5)));

  mostrarResposta(suspeitoAtual.nome, resposta, mentiu);

  adicionarLog('P: ' + pergunta.texto, 'neutro');
  adicionarLog('R: ' + (mentiu ? '🤥 Detectada hesitação' : '✓ Resposta consistente'), mentiu ? 'mentira' : 'verdade');

  if (mentiu && pergunta.prova) {
    if (window.adicionarProvaInterrogatorio) {
      adicionarProvaInterrogatorio(casoInterrogatorio.id, pergunta.prova);
    }
    contradicoesEncontradas++;

    setTimeout(function() {
      adicionarLog('⚡ CONTRADIÇÃO ENCONTRADA: ' + pergunta.prova, 'mentira');
    }, 800);
  }

  setTimeout(function() {
    atualizarStatusVisual();
    renderizarPerguntas();

    if (numPerguntasFeitas >= 3) {
      const box = document.getElementById('pressionar-box');
      if (box) box.style.display = 'block';
    }
  }, 500);

  if (typeof tocarSom === 'function') tocarSom('clique');
}

// ===== MOSTRAR RESPOSTA =====
function mostrarResposta(nome, texto, mentiu) {
  const el = document.getElementById('dialogo-texto');
  if (!el) return;

  el.textContent = '';
  el.classList.toggle('gaguejando', mentiu);

  const avatar = document.getElementById('suspeito-avatar-grande');
  if (avatar) {
    avatar.classList.toggle('mentindo', mentiu);
    avatar.classList.toggle('nervoso', estresseSuspeito > 60);
  }

  const emocao = document.getElementById('suspeito-emocao');
  if (emocao) {
    if (mentiu && estresseSuspeito > 70) emocao.textContent = '😰';
    else if (mentiu) emocao.textContent = '🤥';
    else if (estresseSuspeito > 50) emocao.textContent = '😟';
    else emocao.textContent = '😐';
  }

  const ind = document.getElementById('indicador-mentira');
  if (ind) {
    ind.classList.toggle('show', mentiu);
    if (mentiu) {
      setTimeout(function() {
        ind.classList.remove('show');
      }, 2000);
    }
  }

  if (typeof typewriter === 'function') {
    typewriter(el, texto, 25);
  } else {
    el.textContent = texto;
  }

  setTimeout(function() {
    const analise = document.getElementById('resposta-analise');
    if (!analise) return;

    const nomeSeguro = (typeof escapeHTML === 'function' ? escapeHTML(nome) : nome);

    analise.className = 'resposta-analise show ' + (mentiu ? 'mentira' : 'verdade');
    analise.innerHTML =
      '<div class="analise-titulo">' +
        (mentiu ? '⚠️ HESITAÇÃO DETECTADA' : '✓ RESPOSTA CONSISTENTE') +
      '</div>' +
      '<div>' +
        (mentiu
          ? 'Você nota que ' + nomeSeguro + ' hesitou antes de responder. A gagueira e o olhar desviado são sinais claros de que ele está <strong>escondendo algo</strong>.'
          : nomeSeguro + ' respondeu de forma direta e consistente. O tom de voz e a postura parecem <strong>genuínos</strong>.'
        ) +
      '</div>';

    setTimeout(function() {
      analise.classList.remove('show');
    }, 5000);
  }, 1000);
}

// ===== ATUALIZAR STATUS =====
function atualizarStatusVisual() {
  const estresseFill = document.getElementById('estresse-fill');
  const estresseVal = document.getElementById('estresse-val');
  if (estresseFill) estresseFill.style.width = estresseSuspeito + '%';
  if (estresseVal) estresseVal.textContent = estresseSuspeito + '%';

  const verdadeFill = document.getElementById('verdade-fill');
  const verdadeVal = document.getElementById('verdade-val');
  if (verdadeFill) verdadeFill.style.width = verdadeSuspeito + '%';
  if (verdadeVal) {
    if (verdadeSuspeito >= 70) verdadeVal.textContent = 'ALTA';
    else if (verdadeSuspeito >= 40) verdadeVal.textContent = 'MÉDIA';
    else verdadeVal.textContent = 'BAIXA';
  }

  const confiancaFill = document.getElementById('confianca-fill');
  const confiancaVal = document.getElementById('confianca-val');
  const confianca = Math.max(0, 100 - estresseSuspeito);
  if (confiancaFill) confiancaFill.style.width = confianca + '%';
  if (confiancaVal) confiancaVal.textContent = confianca + '%';

  const avatar = document.getElementById('suspeito-avatar-grande');
  if (avatar) {
    avatar.classList.toggle('nervoso', estresseSuspeito > 60);
  }
}

// ===== PRESSIONAR =====
function pressionarSuspeito() {
  if (!interrogatorioAtivo) return;

  const box = document.getElementById('interrogatorio-box');
  if (box) box.classList.add('modo-pressao');

  if (typeof tocarSom === 'function') tocarSom('erro');
  if (typeof flash === 'function') flash('errado');

  const ehCulpado = suspeitoAtual.nome === casoInterrogatorio.culpado;
  const resposta = ehCulpado ? PERGUNTA_PRESSAO.respostas.mentira : PERGUNTA_PRESSAO.respostas.verdade;

  setTimeout(function() {
    mostrarResposta(suspeitoAtual.nome, resposta, ehCulpado);

    if (ehCulpado) {
      estresseSuspeito = 100;
      verdadeSuspeito = Math.max(0, verdadeSuspeito - 30);

      adicionarLog('💥 PRESSÃO APLICADA: Suspeito demonstrou desconforto extremo', 'mentira');

      if (window.adicionarProvaInterrogatorio) {
        adicionarProvaInterrogatorio(casoInterrogatorio.id, 'Confissão Parcial');
      }

      setTimeout(function() {
        adicionarLog('⚡ CONFISSÃO PARCIAL OBTIDA!', 'verdade');
      }, 1500);
    } else {
      adicionarLog('✓ Pressão aplicada: Suspeito mantém inocência', 'verdade');
    }

    setTimeout(function() {
      if (box) box.classList.remove('modo-pressao');
      atualizarStatusVisual();

      const btn = document.querySelector('.btn-pressionar');
      if (btn) {
        btn.disabled = true;
        btn.textContent = '✓ PRESSÃO APLICADA';
      }
    }, 2500);

  }, 300);
}

// ===== LOG =====
function adicionarLog(texto, tipo) {
  const agora = new Date();
  const hora = String(agora.getHours()).padStart(2, '0') + ':' + String(agora.getMinutes()).padStart(2, '0');

  logInterrogatorio.push({ hora: hora, texto: texto, tipo: tipo });

  const lista = document.getElementById('int-log-lista');
  if (!lista) return;

  const div = document.createElement('div');
  div.className = 'int-log-entrada ' + tipo;
  div.innerHTML =
    '<span class="hora">[' + hora + ']</span>' +
    '<span class="resultado">' + texto + '</span>';

  lista.appendChild(div);
  lista.scrollTop = lista.scrollHeight;
}

// ===== FECHAR =====
function fecharInterrogatorio() {
  const ov = document.getElementById('interrogatorio-overlay');
  if (ov) ov.remove();
  interrogatorioAtivo = false;

  const btnVoltar = document.getElementById('btn-voltar-global');
  if (btnVoltar) btnVoltar.classList.add('show');

  if (window.adicionarDiario && casoInterrogatorio) {
    adicionarDiario(
      casoInterrogatorio.id,
      '🗣️ Interrogatório de <strong>' + suspeitoAtual.nome + '</strong> encerrado. ' +
      numPerguntasFeitas + ' perguntas · ' + contradicoesEncontradas + ' contradições.',
      contradicoesEncontradas > 0
    );
  }
}

// ===== EXPORTAR =====
window.iniciarInterrogatorio = iniciarInterrogatorio;
window.fecharInterrogatorio = fecharInterrogatorio;
window.pressionarSuspeito = pressionarSuspeito;
window.getPerguntasDoCaso = getPerguntasDoCaso;
window.gerarPerguntasProcedurais = gerarPerguntasProcedurais;

console.log('✓ Sistema de interrogatório carregado (v5.1 — procedural)');