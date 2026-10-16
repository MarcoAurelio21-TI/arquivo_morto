// ============================================================
// ARQUIVO MORTO v6.1 — NPCs PERSISTENTES (CORRIGIDO)
// ============================================================
// Adiciona: relação persistente, atualização automática ao
// resolver/errar casos, e arco narrativo progressivo.

const NPCS_PERSISTENTES = [
  {
    id: 'detetive_rival',
    nome: 'Vitor Bastos',
    titulo: 'O Detetive Rival',
    avatar: '🕵️‍♂️',
    desc: 'Um detetive particular arrogante que sempre aparece nas cenas de crime. Diz estar "só de passagem".',
    arco: 'rival',
    capitulosAparece: [1, 2, 3, 5, 8],
    aparencia: 'Sempre de terno cinza, cigarro na mão, sorriso de canto.',
    segredo: 'Foi expulso da polícia por plantar provas. Agora tenta provar seu valor a qualquer custo.',
    relacaoCulpado: 'Inocente em todos os casos — mas sempre esconde algo.',
    relacaoInicial: 'rival',
    frases: {
      saudacao: [
        'Ora, ora... o "gênio" do Arquivo Morto apareceu.',
        'Você de novo? Achei que já tinha desistido.',
        'Não precisa perder seu tempo, detetive. Eu já resolvi tudo.'
      ],
      defensiva: [
        'Eu? Nunca. Eu estava... investigando por conta própria.',
        'Cuidado com o que diz. Eu tenho contatos na polícia.',
        'Você está desperdiçando tempo. O culpado é outro.'
      ],
      aliado: [
        'Tá bom, tá bom... você me convenceu. Vou te passar o que sei.',
        'Não é pessoal, detetive. Mas dessa vez você tá certo.',
        'Vamos resolver isso juntos. Só dessa vez.'
      ],
      rival: [
        'Você teve sorte. Sorte. Não vai se repetir.',
        'Eu ainda vou provar que sou melhor que você.',
        'Aproveite enquanto pode, detetive.'
      ],
      derrota: [
        'Tá bom, tá bom... você venceu essa. Mas não vai ser sempre assim.',
        'Interessante... talvez você não seja tão inútil quanto parecia.'
      ]
    },
    pistasEspeciais: [
      'Vitor foi visto saindo da cena antes da polícia chegar.',
      'Vitor tinha uma pasta que nunca mostra pra ninguém.',
      'Vitor está sempre com o mesmo isqueiro — de ouro, gravado "VB".'
    ]
  },
  {
    id: 'jornalista',
    nome: 'Helena Prado',
    titulo: 'A Jornalista Investigativa',
    avatar: '👩‍💻',
    desc: 'Repórter de um portal de crimes famosos. Sempre aparece antes da polícia. Sabe mais do que deveria.',
    arco: 'aliada',
    capitulosAparece: [1, 3, 4, 6, 9],
    aparencia: 'Sempre com um gravador, notebook e uma xícara de café.',
    segredo: 'Está investigando o CÉREBRO há anos. Perdeu o irmão para o crime organizado.',
    relacaoCulpado: 'Geralmente inocente, mas em um capítulo é cúmplice involuntária.',
    relacaoInicial: 'aliado',
    frases: {
      saudacao: [
        'Detetive! Que bom te ver. Tenho informações que podem te interessar.',
        'Achei que você fosse aparecer. Sempre aparece nos melhores casos.',
        'Não é pessoal, mas vou publicar antes de você resolver.'
      ],
      defensiva: [
        'Eu só queria a matéria. Não sou criminosa.',
        'Liberdade de imprensa, detetive. Isso é tudo que eu tenho.',
        'Estou aqui pelo mesmo motivo que você: a verdade.'
      ],
      aliado: [
        'Vou te passar o que eu sei. Mas depois você me deve uma entrevista exclusiva.',
        'Se descobrir algo antes de mim, me avisa. Faço questão de publicar primeiro.',
        'Estamos do mesmo lado, detetive. Sempre estivemos.'
      ],
      rival: [
        'Você pisou na bola dessa vez, detetive. Vou ter que publicar.',
        'Não posso mais te proteger. A verdade vem antes de tudo.',
        'Espero que você entenda. É o meu trabalho.'
      ]
    },
    pistasEspeciais: [
      'Helena tem o hábito de anotar em um caderno vermelho.',
      'Helena já entrevistou todos os suspeitos deste caso antes.',
      'Helena conhece um informante na delegacia.'
    ]
  },
  {
    id: 'advogado',
    nome: 'Dr. Sérgio Rocha',
    titulo: 'O Advogado do Cartel',
    avatar: '👨‍⚖️',
    desc: 'Advogado famoso por defender criminosos ricos. Sempre tem uma resposta pronta.',
    arco: 'antagonista',
    capitulosAparece: [2, 4, 7, 10],
    aparencia: 'Terno preto impecável, pasta de couro, anel de ouro.',
    segredo: 'É o braço direito do CÉREBRO. Filtra informações e elimina testemunhas.',
    relacaoCulpado: 'Culpado em vários casos, mas nunca é pego.',
    relacaoInicial: 'inimigo',
    frases: {
      saudacao: [
        'Detetive. Que prazer... inesperado.',
        'Está me acusando de algo? Fale com meu advogado. Ah, sou eu.',
        'A lei é uma ferramenta, detetive. E eu a uso muito bem.'
      ],
      defensiva: [
        'Provas? Prove. Sem provas, é difamação.',
        'Tenho álibi pra tudo. Aliás, tenho álibi pra tudo o que você imaginar.',
        'Você não tem nada. E nunca terá.'
      ],
      aliado: [
        'Você me surpreendeu. Talvez possamos... colaborar.',
        'Vou fingir que não vi isso. Dessa vez.',
        'Cuidado com quem confia, detetive. Nem todos são o que parecem.'
      ],
      inimigo: [
        'Você vai se arrepender de ter me enfrentado.',
        'A lei vai te pegar. E quando pegar, eu vou estar lá.',
        'Isso não acabou, detetive. Nunca acaba.'
      ],
      vitoria: [
        'A lei venceu mais uma vez. Até a próxima, detetive.',
        'Foi um prazer. Não se esqueça de me citar no relatório.'
      ]
    },
    pistasEspeciais: [
      'Dr. Rocha representa todos os suspeitos ricos do caso.',
      'Dr. Rocha tem um anel de ouro com um rubi — sempre o mesmo.',
      'Dr. Rocha ligou para alguém assim que a polícia chegou.'
    ]
  },
  {
    id: 'medico_legista',
    nome: 'Dra. Camila Ferraz',
    titulo: 'A Médica Legista',
    avatar: '👩‍🔬',
    desc: 'Perita oficial do Departamento de Casos Não Resolvidos. Séria, direta e um pouco assustadora.',
    arco: 'aliada',
    capitulosAparece: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    aparencia: 'Jaleco branco, óculos de grau, luvas sempre no bolso.',
    segredo: 'Guarda provas de casos antigos em casa, por pura desconfiança.',
    relacaoCulpado: 'Nunca culpada. É a voz da ciência no jogo.',
    relacaoInicial: 'aliado',
    frases: {
      saudacao: [
        'Chegou tarde. Já tenho o laudo preliminar.',
        'Não toque em nada. Isso não é pedido, é ordem.',
        'A ciência não mente, detetive. Só as pessoas mentem.'
      ],
      tecnica: [
        'Hora da morte: entre 21h e 23h. Causa: a definir.',
        'Encontrei fibras no corpo. Vou analisar no laboratório.',
        'Esse ferimento foi feito por alguém canhoto. Anote isso.'
      ],
      aliado: [
        'Vou priorizar sua análise. Você merece.',
        'Encontrei algo estranho. Vem cá ver.',
        'Confio no seu instinto, detetive. A ciência confirma.'
      ],
      rival: [
        'Você errou feio dessa vez. Não posso te ajudar.',
        'A ciência é imparcial. Eu também.',
        'Da próxima vez, preste mais atenção.'
      ],
      humor: [
        'Se eu ganhasse um centavo por cada caso "impossível", já teria me aposentado.',
        'Você resolve o caso, eu resolvo a causa. Parceria.'
      ]
    },
    pistasEspeciais: [
      'Dra. Camila encontrou uma substância rara no corpo.',
      'Dra. Camila pediu uma análise de DNA urgente.',
      'Dra. Camila mencionou um detalhe que a polícia não divulgou.'
    ]
  },
  {
    id: 'hacker',
    nome: 'Nyx',
    titulo: 'O Fantasma Digital',
    avatar: '👤',
    desc: 'Hacker anônima. Ninguém sabe o rosto. Aparece só em casos com tecnologia envolvida.',
    arco: 'misteriosa',
    capitulosAparece: [3, 5, 6, 8, 10],
    aparencia: 'Sempre em chamadas de vídeo com a câmera desligada. Voz modificada.',
    segredo: 'É ex-funcionária do CÉREBRO. Fugiu quando descobriu a verdade.',
    relacaoCulpado: 'Nunca culpada. Fornece pistas digitais valiosas.',
    relacaoInicial: 'neutro',
    frases: {
      saudacao: [
        'Você é o detetive? Preciso de ajuda. E não, não vou mostrar meu rosto.',
        'Encontrei algo nos arquivos. Mas não sei em quem confiar.',
        'Se você está vendo isso, é porque confio em você. Não me decepcione.'
      ],
      tecnica: [
        'Rastreei o IP. Está em um servidor da Europa. Não é o criminoso — é um intermediário.',
        'Os arquivos foram apagados às 03h47. Ninguém trabalha a essa hora sem motivo.',
        'Encontrei uma pasta oculta. O nome é "CÉREBRO".'
      ],
      aliado: [
        'Você provou seu valor, detetive. Vou te contar tudo o que sei.',
        'Confio em você. É a primeira vez que digo isso a alguém.',
        'Vamos derrubar o CÉREBRO juntos. Eu cuido do digital, você do físico.'
      ],
      rival: [
        'Você me traiu, detetive. Não vou esquecer.',
        'Encontrei outro caminho. Não preciso de você.',
        'Da próxima vez, pense duas vezes antes de me usar.'
      ],
      medo: [
        'Eles me procuram. Preciso ir. Mas voltarei.',
        'Se eu desaparecer, procure em Genebra. Sempre em Genebra.'
      ]
    },
    pistasEspeciais: [
      'Nyx enviou um arquivo criptografado com a senha "CISNE".',
      'Nyx rastreou a origem das ameaças para um servidor suíço.',
      'Nyx deixou um recado: "Não confie em ninguém do Departamento".'
    ]
  }
];

// ===== ESTADO =====
let npcEstado = {
  encontros: {},
  relacoes: {},
  pistasReveladas: {},
  historico: {}
};

// ===== CARREGAR/SALVAR =====
function carregarNPCs() {
  try {
    const salvo = localStorage.getItem('arquivoMorto_npcs');
    if (salvo) {
      const parsed = JSON.parse(salvo);
      npcEstado = Object.assign(npcEstado, parsed);
    }
  } catch(e) {}

  NPCS_PERSISTENTES.forEach(function(npc) {
    if (!npcEstado.relacoes[npc.id]) {
      npcEstado.relacoes[npc.id] = npc.relacaoInicial || 'neutro';
    }
  });

  salvarNPCs();
}

function salvarNPCs() {
  try {
    localStorage.setItem('arquivoMorto_npcs', JSON.stringify(npcEstado));
  } catch(e) {}
}

// ===== ATUALIZAR RELAÇÃO =====
function atualizarRelacaoNPC(npcId, acao, casoId) {
  const npc = NPCS_PERSISTENTES.find(function(n) { return n.id === npcId; });
  if (!npc) return;

  const relacaoAtual = npcEstado.relacoes[npcId] || npc.relacaoInicial || 'neutro';

  if (!npcEstado.historico[npcId]) npcEstado.historico[npcId] = [];
  npcEstado.historico[npcId].push({
    caso: casoId,
    acao: acao,
    data: new Date().toLocaleDateString('pt-BR')
  });

  if (npcEstado.historico[npcId].length > 20) {
    npcEstado.historico[npcId] = npcEstado.historico[npcId].slice(-20);
  }

  let novaRelacao = relacaoAtual;

  if (npc.arco === 'aliada') {
    if (acao === 'resolvido') {
      novaRelacao = 'aliado';
    } else if (acao === 'errado') {
      const errosRecentes = npcEstado.historico[npcId].slice(-2).filter(function(h) {
        return h.acao === 'errado';
      }).length;
      if (errosRecentes >= 2) novaRelacao = 'rival';
      else novaRelacao = 'neutro';
    }
  }
  else if (npc.arco === 'rival') {
    if (acao === 'resolvido') {
      const acertosRecentes = npcEstado.historico[npcId].slice(-3).filter(function(h) {
        return h.acao === 'resolvido';
      }).length;
      if (acertosRecentes >= 3) novaRelacao = 'aliado';
      else novaRelacao = 'neutro';
    } else if (acao === 'errado') {
      novaRelacao = 'rival';
    }
  }
  else if (npc.arco === 'antagonista') {
    if (acao === 'errado') {
      novaRelacao = 'inimigo';
    } else if (acao === 'resolvido') {
      const acertosRecentes = npcEstado.historico[npcId].slice(-3).filter(function(h) {
        return h.acao === 'resolvido';
      }).length;
      if (acertosRecentes >= 3) novaRelacao = 'neutro';
    }
  }
  else if (npc.arco === 'misteriosa') {
    const totalEncontros = (npcEstado.encontros[npcId] || []).length;
    if (acao === 'resolvido' && totalEncontros >= 3) {
      novaRelacao = 'aliado';
    } else if (acao === 'errado') {
      novaRelacao = 'rival';
    }
  }

  npcEstado.relacoes[npcId] = novaRelacao;
  salvarNPCs();

  if (novaRelacao !== relacaoAtual && typeof notificar === 'function') {
    const icones = { aliado: '🤝', rival: '⚔️', neutro: '👤', inimigo: '💀' };
    notificar(
      icones[novaRelacao] + ' Relação alterada',
      npc.nome + ' agora é ' + novaRelacao.toUpperCase()
    );
  }

  return novaRelacao;
}

// ===== VERIFICAR SE NPC APARECE NO CASO =====
function npcApareceNoCaso(npcId, casoId) {
  const npc = NPCS_PERSISTENTES.find(function(n) { return n.id === npcId; });
  if (!npc) return false;

  const caso = (typeof getCasoPorId === 'function') ? getCasoPorId(casoId) : null;
  if (!caso) return false;

  return npc.capitulosAparece.indexOf(caso.capitulo) !== -1;
}

// ===== OBTER NPCs DO CASO =====
function getNPCsDoCaso(casoId) {
  const caso = (typeof getCasoPorId === 'function') ? getCasoPorId(casoId) : null;
  if (!caso) return [];

  return NPCS_PERSISTENTES.filter(function(npc) {
    return npc.capitulosAparece.indexOf(caso.capitulo) !== -1;
  });
}

// ===== REGISTRAR ENCONTRO =====
function registrarEncontroNPC(npcId, casoId) {
  if (!npcEstado.encontros[npcId]) npcEstado.encontros[npcId] = [];
  if (npcEstado.encontros[npcId].indexOf(casoId) === -1 && casoId) {
    npcEstado.encontros[npcId].push(casoId);
    salvarNPCs();
  }
}

// ===== RENDERIZAR NPCs NO CASO =====
function renderNPCsCaso(casoId) {
  const npcs = getNPCsDoCaso(casoId);
  if (npcs.length === 0) return '';

  let html =
    '<div class="npcs-caso">' +
      '<div class="npcs-titulo">👥 FIGURAS CONHECIDAS NESTE CASO</div>' +
      '<div class="npcs-lista">';

  npcs.forEach(function(npc) {
    const relacao = npcEstado.relacoes[npc.id] || 'neutro';
    const relacaoIcone = {
      'aliado': '🤝',
      'rival': '⚔️',
      'neutro': '👤',
      'inimigo': '💀'
    }[relacao] || '👤';

    const encontros = (npcEstado.encontros[npc.id] || []).length;

    html +=
      '<div class="npc-card" data-npc="' + npc.id + '">' +
        '<div class="npc-avatar">' + npc.avatar + '</div>' +
        '<div class="npc-info">' +
          '<strong>' + npc.nome + '</strong>' +
          '<span class="npc-titulo">' + npc.titulo + ' ' + relacaoIcone + ' <small style="opacity:0.6">(' + encontros + ' encontros)</small></span>' +
          '<p class="npc-desc">' + npc.desc + '</p>' +
        '</div>' +
        '<button class="btn-npc-conversar" onclick="abrirDialogoNPC(\'' + npc.id + '\')">💬 Conversar</button>' +
      '</div>';
  });

  html += '</div></div>';

  return html;
}

// ===== ABRIR DIÁLOGO =====
function abrirDialogoNPC(npcId) {
  const npc = NPCS_PERSISTENTES.find(function(n) { return n.id === npcId; });
  if (!npc) return;

  const casoId = window.casoAtual ? window.casoAtual.id : null;
  registrarEncontroNPC(npcId, casoId);

  const relacao = npcEstado.relacoes[npcId] || 'neutro';
  let frases = npc.frases.saudacao;

  if (npc.frases[relacao]) frases = npc.frases[relacao];
  else if (relacao === 'aliado' && npc.frases.aliado) frases = npc.frases.aliado;
  else if (relacao === 'rival' && npc.frases.rival) frases = npc.frases.rival;

  const frase = frases[Math.floor(Math.random() * frases.length)];

  let pistaHTML = '';
  const reveladas = npcEstado.pistasReveladas[npcId] || [];
  const pistasDisponiveis = npc.pistasEspeciais.filter(function(p) {
    return reveladas.indexOf(p) === -1;
  });

  if (pistasDisponiveis.length > 0 && Math.random() < 0.5) {
    const novaPista = pistasDisponiveis[0];
    if (!npcEstado.pistasReveladas[npcId]) npcEstado.pistasReveladas[npcId] = [];
    npcEstado.pistasReveladas[npcId].push(novaPista);
    salvarNPCs();

    pistaHTML =
      '<div class="npc-pista">' +
        '<div class="npc-pista-titulo">🔍 PISTA REVELADA</div>' +
        '<div class="npc-pista-texto">' + novaPista + '</div>' +
      '</div>';
  }

  const relacaoIcone = {
    'aliado': '🤝 Aliado',
    'rival': '⚔️ Rival',
    'neutro': '👤 Neutro',
    'inimigo': '💀 Inimigo'
  }[relacao] || '👤 Neutro';

  const overlay = document.createElement('div');
  overlay.className = 'modal-npc';
  overlay.innerHTML =
    '<div class="modal-npc-box">' +
      '<div class="npc-header">' +
        '<span class="npc-avatar-grande">' + npc.avatar + '</span>' +
        '<div>' +
          '<h3>' + npc.nome + '</h3>' +
          '<span class="npc-titulo-modal">' + npc.titulo + '</span>' +
          '<div style="font-size:0.7rem;color:var(--dourado);margin-top:0.3rem">' + relacaoIcone + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="npc-dialogo">' +
        '<p>"' + frase + '"</p>' +
      '</div>' +
      '<div class="npc-aparencia">' +
        '<strong>Aparência:</strong> ' + npc.aparencia +
      '</div>' +
      pistaHTML +
      '<div class="npc-acoes">' +
        '<button class="btn-npc" onclick="this.closest(\'.modal-npc\').remove()">FECHAR</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.remove();
  });

  if (typeof tocarSom === 'function') tocarSom('clique');
}

// ===== INICIALIZAR =====
function iniciarNPCs() {
  carregarNPCs();

  console.log('✓ Sistema de NPCs carregado (v6.1)');
  console.log('  NPCs: ' + NPCS_PERSISTENTES.length);
  console.log('  Encontros: ' + Object.keys(npcEstado.encontros).length);
  console.log('  Relações: ' + Object.keys(npcEstado.relacoes).length);
}

// ===== EXPORTAR =====
window.NPCS_PERSISTENTES = NPCS_PERSISTENTES;
window.iniciarNPCs = iniciarNPCs;
window.renderNPCsCaso = renderNPCsCaso;
window.abrirDialogoNPC = abrirDialogoNPC;
window.getNPCsDoCaso = getNPCsDoCaso;
window.atualizarRelacaoNPC = atualizarRelacaoNPC;
window.registrarEncontroNPC = registrarEncontroNPC;
window.npcEstado = npcEstado;

console.log('✓ NPCs persistentes carregados (v6.1 — relações)');