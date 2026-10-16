// ============================================================
// ARQUIVO MORTO v7.2 — GERADOR DE CASOS (BILÍNGUE PT/EN)
// ============================================================
// Correções v7.2:
//   • BUG #6: expõe window.PECAS_PROCEDURAIS
//   • BUG #11: substitui alert() por notificar()
//   • BUG #12: trata QuotaExceededError em salvarCasoGerado()
// ============================================================

const CONFIG_GERADOR = {
  apiPollinations: 'https://text.pollinations.ai/',
  modeloIA: 'openai',
  timeout: 30000
};

let geradorEstado = {
  tema: 'assassinato',
  dificuldade: 'medio',
  numSuspeitos: 4,
  modoGeracao: null
};

// ============================================================
// HELPER DE IDIOMA
// ============================================================
function _lg() {
  return (window.idiomaAtual === 'en') ? 'en' : 'pt';
}

// ============================================================
// PEÇAS PROCEDURAIS — BILÍNGUE
// ============================================================
const PECAS_PROCEDURAIS = {
  locais: [
    { pt: { nome: "Museu Municipal", objeto: "amuleto egípcio" }, en: { nome: "City Museum", objeto: "Egyptian amulet" }, emoji: "🏛️" },
    { pt: { nome: "Teatro Real", objeto: "partitura original" }, en: { nome: "Royal Theater", objeto: "original score" }, emoji: "🎭" },
    { pt: { nome: "Estação Central", objeto: "diamante raro" }, en: { nome: "Central Station", objeto: "rare diamond" }, emoji: "🚂" },
    { pt: { nome: "Mansão Vitoriana", objeto: "testamento" }, en: { nome: "Victorian Mansion", objeto: "will" }, emoji: "🏰" },
    { pt: { nome: "Biblioteca Antiga", objeto: "manuscrito raro" }, en: { nome: "Ancient Library", objeto: "rare manuscript" }, emoji: "📚" },
    { pt: { nome: "Hotel de Luxo", objeto: "joia da coroa" }, en: { nome: "Luxury Hotel", objeto: "crown jewel" }, emoji: "🏨" },
    { pt: { nome: "Iate Particular", objeto: "colar de esmeraldas" }, en: { nome: "Private Yacht", objeto: "emerald necklace" }, emoji: "🛥️" },
    { pt: { nome: "Cassino Noturno", objeto: "fichas marcadas" }, en: { nome: "Night Casino", objeto: "marked chips" }, emoji: "🎰" },
    { pt: { nome: "Galeria de Arte", objeto: "quadro renascentista" }, en: { nome: "Art Gallery", objeto: "renaissance painting" }, emoji: "🖼️" },
    { pt: { nome: "Ópera Municipal", objeto: "violino Stradivarius" }, en: { nome: "City Opera", objeto: "Stradivarius violin" }, emoji: "🎼" },
    { pt: { nome: "Convento Abandonado", objeto: "cálice sagrado" }, en: { nome: "Abandoned Convent", objeto: "sacred chalice" }, emoji: "⛪" },
    { pt: { nome: "Laboratório Secreto", objeto: "fórmula química" }, en: { nome: "Secret Lab", objeto: "chemical formula" }, emoji: "🧪" },
    { pt: { nome: "Circo Itinerante", objeto: "máscara ritual" }, en: { nome: "Traveling Circus", objeto: "ritual mask" }, emoji: "🎪" },
    { pt: { nome: "Cemitério Antigo", objeto: "relíquia de família" }, en: { nome: "Ancient Cemetery", objeto: "family relic" }, emoji: "⚰️" },
    { pt: { nome: "Aeroporto Privado", objeto: "documentos secretos" }, en: { nome: "Private Airport", objeto: "secret documents" }, emoji: "✈️" }
  ],
  motivos: [
    { pt: { desc: "herança milionária", frase: "O testamento seria alterado amanhã" }, en: { desc: "millionaire inheritance", frase: "The will was going to be changed tomorrow" } },
    { pt: { desc: "vingança antiga", frase: "Ele arruinou minha família anos atrás" }, en: { desc: "old revenge", frase: "He ruined my family years ago" } },
    { pt: { desc: "crime passional", frase: "Ela me traiu com meu melhor amigo" }, en: { desc: "crime of passion", frase: "She cheated on me with my best friend" } },
    { pt: { desc: "dívida de jogo", frase: "Eu devia uma fortuna aos agiotas" }, en: { desc: "gambling debt", frase: "I owed a fortune to loan sharks" } },
    { pt: { desc: "segredo de família", frase: "Ele sabia demais sobre meu passado" }, en: { desc: "family secret", frase: "He knew too much about my past" } },
    { pt: { desc: "rivalidade profissional", frase: "Ele roubou minha pesquisa" }, en: { desc: "professional rivalry", frase: "He stole my research" } },
    { pt: { desc: "chantagem", frase: "Ele me chantageava há meses" }, en: { desc: "blackmail", frase: "He'd been blackmailing me for months" } },
    { pt: { desc: "amor não correspondido", frase: "Eu a amava e ela me rejeitou" }, en: { desc: "unrequited love", frase: "I loved her and she rejected me" } },
    { pt: { desc: "negócio fracassado", frase: "Ele arruinou meus negócios" }, en: { desc: "failed business", frase: "He ruined my business" } },
    { pt: { desc: "vingança política", frase: "Ele destruiu minha carreira pública" }, en: { desc: "political revenge", frase: "He destroyed my public career" } }
  ],
  metodos: [
    { pt: { nome: "veneno no chá", pista: "xícara com resíduo estranho" }, en: { nome: "poison in tea", pista: "cup with strange residue" } },
    { pt: { nome: "faca de cozinha", pista: "corte preciso no pescoço" }, en: { nome: "kitchen knife", pista: "precise cut on the neck" } },
    { pt: { nome: "empurrão da escada", pista: "marcas de arranhão no corrimão" }, en: { nome: "push down the stairs", pista: "scratch marks on the railing" } },
    { pt: { nome: "sufocamento com travesseiro", pista: "fibras de tecido na boca" }, en: { nome: "suffocation with pillow", pista: "fabric fibers in the mouth" } },
    { pt: { nome: "corda de seda", pista: "marcas profundas no pescoço" }, en: { nome: "silk cord", pista: "deep marks on the neck" } },
    { pt: { nome: "veneno injetado", pista: "pequena marca de agulha no braço" }, en: { nome: "injected poison", pista: "small needle mark on the arm" } },
    { pt: { nome: "queda forjada", pista: "posição estranha do corpo" }, en: { nome: "staged fall", pista: "strange body position" } },
    { pt: { nome: "afogamento na banheira", pista: "água com sabão na traqueia" }, en: { nome: "bathtub drowning", pista: "soapy water in the trachea" } },
    { pt: { nome: "faca de gelo", pista: "ferida que não sangrou muito" }, en: { nome: "ice dagger", pista: "wound that didn't bleed much" } },
    { pt: { nome: "veneno no vinho", pista: "taça com cheiro de amêndoas" }, en: { nome: "poison in wine", pista: "glass with almond smell" } }
  ],
  pistasExtras: [
    { pt: "pegadas de sapato 42 na cena", en: "size 42 shoe prints at the scene" },
    { pt: "um lenço com perfume doce", en: "a handkerchief with sweet perfume" },
    { pt: "um botão dourado no chão", en: "a golden button on the floor" },
    { pt: "marcas de luva na maçaneta", en: "glove marks on the doorknob" },
    { pt: "uma carta rasgada na lixeira", en: "a torn letter in the trash" },
    { pt: "um relógio parado às 23h47", en: "a watch stopped at 11:47 PM" },
    { pt: "um cabelo loiro no tapete", en: "a blonde hair on the carpet" },
    { pt: "uma chave estranha no bolso", en: "a strange key in the pocket" },
    { pt: "um bilhete cifrado no cofre", en: "an encrypted note in the safe" },
    { pt: "uma foto amassada no lixo", en: "a crumpled photo in the trash" },
    { pt: "um copo com marca de batom", en: "a glass with lipstick mark" },
    { pt: "uma luva de seda no corredor", en: "a silk glove in the hallway" },
    { pt: "um cachimbo quebrado no sofá", en: "a broken pipe on the sofa" },
    { pt: "um livro aberto na página 47", en: "a book open at page 47" },
    { pt: "uma garrafa de vinho aberta", en: "an open wine bottle" }
  ],
  nomesMasculinos: [
    "Ricardo Vasconcelos", "Eduardo Salles", "Marcelo Prado", "Fernando Duarte",
    "Gustavo Rocha", "Henrique Belmonte", "Otávio Lemos", "Vinícius Camargo",
    "Alexandre Torres", "Rodrigo Peixoto", "Caio Brandão", "Davi Machado",
    "Igor Fontes", "Leandro Pires", "Murilo Castro", "Nelson Aguiar"
  ],
  nomesFemininos: [
    "Beatriz Almeida", "Carolina Mendes", "Daniela Siqueira", "Elisa Vasques",
    "Fernanda Coutinho", "Gabriela Moraes", "Helena Prado", "Isabela Rocha",
    "Juliana Tavares", "Larissa Pacheco", "Mariana Duarte", "Natália Campos",
    "Olívia Brandão", "Patrícia Lemos", "Renata Salgado", "Sofia Ribeiro"
  ],
  titulosMasculinos: {
    pt: ["O Advogado", "O Médico", "O Empresário", "O Professor", "O Jornalista", "O Detetive Rival", "O Músico", "O Pintor", "O Cientista", "O Carteiro", "O Mecânico", "O Cônsul"],
    en: ["The Lawyer", "The Doctor", "The Businessman", "The Professor", "The Journalist", "The Rival Detective", "The Musician", "The Painter", "The Scientist", "The Postman", "The Mechanic", "The Consul"]
  },
  titulosFemininos: {
    pt: ["A Jornalista", "A Médica", "A Empresária", "A Professora", "A Advogada", "A Pianista", "A Atriz", "A Cientista", "A Fotógrafa", "A Cozinheira", "A Bailarina", "A Escritora"],
    en: ["The Journalist", "The Doctor", "The Businesswoman", "The Professor", "The Lawyer", "The Pianist", "The Actress", "The Scientist", "The Photographer", "The Cook", "The Dancer", "The Writer"]
  },
  avataresMasculinos: ["🎩","👨‍💼","👨‍🔬","👨‍🏫","👨‍🍳","🧔","👨‍⚖️","👨‍🎨","👨‍💻","🤵","🕴️","🕵️"],
  avataresFemininos: ["👩‍💼","👩‍🔬","👩‍🏫","👩‍🎨","👩‍⚖️","👩‍💻","💃","👩‍🎤","👩‍🍳","👰","👸","🕵️‍♀️"]
};

// ============================================================
// ✅ BUG #6: expor PECAS_PROCEDURAIS globalmente
// (mapa.js reutiliza estas listas para não duplicar)
// ============================================================
window.PECAS_PROCEDURAIS = PECAS_PROCEDURAIS;

// ============================================================
// HELPERS
// ============================================================
function sortear(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function sortearVarios(arr, qtd) {
  const copia = arr.slice();
  const resultado = [];
  for (let i = 0; i < qtd && copia.length > 0; i++) {
    const idx = Math.floor(Math.random() * copia.length);
    resultado.push(copia.splice(idx, 1)[0]);
  }
  return resultado;
}

function gerarId() {
  return 10000 + Math.floor(Math.random() * 50000);
}

function _loc(obj) { return obj[_lg()]; }
function _mot(obj) { return obj[_lg()]; }
function _met(obj) { return obj[_lg()]; }
function _pista(obj) { return obj[_lg()]; }
function _tituloM(arr) { return arr[_lg()][Math.floor(Math.random() * arr[_lg()].length)]; }
function _tituloF(arr) { return arr[_lg()][Math.floor(Math.random() * arr[_lg()].length)]; }

// ============================================================
// GERADOR PROCEDURAL
// ============================================================
function gerarCasoProcedural() {
  const lang = _lg();
  const local = sortear(PECAS_PROCEDURAIS.locais);
  const metodo = sortear(PECAS_PROCEDURAIS.metodos);
  const motivoCulpado = sortear(PECAS_PROCEDURAIS.motivos);
  const pistasExtras = sortearVarios(PECAS_PROCEDURAIS.pistasExtras, 2);

  const numSuspeitos = geradorEstado.numSuspeitos;
  const suspeitos = [];
  const usados = new Set();

  for (let i = 0; i < numSuspeitos; i++) {
    const genero = Math.random() > 0.5 ? 'M' : 'F';
    let nome, titulo, avatar;

    do {
      if (genero === 'M') {
        nome = sortear(PECAS_PROCEDURAIS.nomesMasculinos);
        titulo = _tituloM(PECAS_PROCEDURAIS.titulosMasculinos);
        avatar = sortear(PECAS_PROCEDURAIS.avataresMasculinos);
      } else {
        nome = sortear(PECAS_PROCEDURAIS.nomesFemininos);
        titulo = _tituloF(PECAS_PROCEDURAIS.titulosFemininos);
        avatar = sortear(PECAS_PROCEDURAIS.avataresFemininos);
      }
    } while (usados.has(nome));

    usados.add(nome);

    suspeitos.push({
      nome: titulo,
      nomeCompleto: nome,
      desc: gerarDescricaoSuspeito(),
      defesa: gerarDefesaSuspeito(),
      avatar: avatar,
      genero: genero
    });
  }

  const indiceCulpado = Math.floor(Math.random() * suspeitos.length);
  const culpado = suspeitos[indiceCulpado];
  const mot = _mot(motivoCulpado);

  culpado.desc = lang === 'en'
    ? "Was at the scene when the crime happened."
    : "Estava no local no momento do crime.";
  culpado.defesa = (lang === 'en' ? "I did nothing! " : "Não fiz nada! ") + mot.frase;

  const caso = {
    id: gerarId(),
    capitulo: 99,
    titulo: gerarTitulo(local, metodo),
    resumo: gerarResumo(local, metodo),
    premissa: gerarPremissa(local, metodo, motivoCulpado),
    evidencias: [
      `${local.emoji} ${_pista(metodo)}`,
      `🔍 ${_pista(pistasExtras[0])}`,
      `🔍 ${_pista(pistasExtras[1])}`
    ],
    suspeitos: suspeitos,
    culpado: culpado.nome,
    solucao: gerarSolucao(culpado, motivoCulpado, metodo),
    dicas: gerarDicas(local, metodo, culpado),
    gerado: true,
    geradoPor: 'procedural',
    dataGeracao: new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR')
  };

  return caso;
}

function gerarTitulo(local, metodo) {
  const lang = _lg();
  const l = _loc(local);
  if (lang === 'en') {
    const t = [
      `The Enigma of the ${l.nome}`,
      `The Mystery of the ${l.nome}`,
      `Tragedy at the ${l.nome}`,
      `The Crime of the ${l.nome}`,
      `Secrets at the ${l.nome}`
    ];
    return sortear(t);
  }
  const t = [
    `O Enigma do ${l.nome}`,
    `O Mistério do ${l.nome}`,
    `A Tragédia no ${l.nome}`,
    `O Crime do ${l.nome}`,
    `Segredos no ${l.nome}`
  ];
  return sortear(t);
}

function gerarResumo(local, metodo) {
  const lang = _lg();
  const l = _loc(local);
  const m = _met(metodo);
  if (lang === 'en') {
    return `A ${m.nome} shakes the ${l.nome}. The guests were present when the crime occurred.`;
  }
  return `Um caso de ${m.nome} abala ${l.nome}. Os convidados estavam no local quando o crime aconteceu.`;
}

function gerarPremissa(local, metodo, motivo) {
  const lang = _lg();
  const l = _loc(local);
  const m = _met(metodo);
  if (lang === 'en') {
    const p = [
      `During an exclusive event at the ${l.nome}, a terrible crime took place. The victim was found dead by ${m.nome}. Everyone present is a suspect.`,
      `What was supposed to be a quiet night at the ${l.nome} ended in tragedy. When the lights came on, the victim was dead.`,
      `The ${l.nome} was the scene of a shocking crime. The police sealed off the area and no one could leave. One of the guests is the murderer.`
    ];
    return sortear(p);
  }
  const p = [
    `Durante um evento exclusivo no ${l.nome}, um crime terrível aconteceu. A vítima foi encontrada morta por ${m.nome}. Todos os presentes são suspeitos.`,
    `O que era para ser uma noite tranquila no ${l.nome} terminou em tragédia. Quando as luzes se acenderam, a vítima estava morta.`,
    `${l.nome} foi palco de um crime chocante. A polícia isolou a área e ninguém pôde sair. Um dos convidados é o assassino.`
  ];
  return sortear(p);
}

function gerarDescricaoSuspeito() {
  const lang = _lg();
  if (lang === 'en') {
    const d = [
      "Was at the scene when the crime happened.",
      "Knew the victim for years.",
      "Had motives to commit the crime.",
      "Was seen near the crime scene.",
      "Gave a contradictory statement to the police.",
      "Was strangely calm.",
      "Showed nervousness when questioned."
    ];
    return sortear(d);
  }
  const d = [
    "Estava no local no momento do crime.",
    "Conhecia a vítima há anos.",
    "Tinha motivos para cometer o crime.",
    "Foi visto próximo à cena.",
    "Deu uma resposta contraditória à polícia.",
    "Estava estranhamente calmo.",
    "Demonstrou nervosismo ao ser questionado."
  ];
  return sortear(d);
}

function gerarDefesaSuspeito() {
  const lang = _lg();
  if (lang === 'en') {
    const d = [
      "I did nothing! I was talking to someone else.",
      "How dare you accuse me? I'm innocent!",
      "I have no reason to kill anyone.",
      "I was in the bathroom when it happened.",
      "I just heard the scream and ran to see.",
      "This is absurd! I barely knew the victim."
    ];
    return sortear(d);
  }
  const d = [
    "Eu não fiz nada! Estava conversando com outra pessoa.",
    "Como ousa me acusar? Eu sou inocente!",
    "Não tenho motivo algum para matar ninguém.",
    "Estava no banheiro quando aconteceu.",
    "Só ouvi o grito e corri para ver.",
    "Isso é um absurdo! Eu nem conhecia bem a vítima."
  ];
  return sortear(d);
}

function gerarSolucao(culpado, motivo, metodo) {
  const lang = _lg();
  const mot = _mot(motivo);
  const m = _met(metodo);
  if (lang === 'en') {
    return `${culpado.nomeCompleto} committed the crime for ${mot.desc}. ${mot.frase}. They used ${m.nome} to carry out the plan.`;
  }
  return `${culpado.nomeCompleto} cometeu o crime por ${mot.desc}. ${mot.frase}. Ele usou ${m.nome} para executar o plano.`;
}

function gerarDicas(local, metodo, culpado) {
  const lang = _lg();
  const l = _loc(local);
  const m = _met(metodo);
  if (lang === 'en') {
    return [
      `The crime happened at the ${l.nome}. Whoever knew the place had an advantage.`,
      `The weapon was ${m.nome}. This narrows down the suspects.`,
      `The culprit had a strong motive. Pay attention to answers about the victim.`
    ];
  }
  return [
    `O crime aconteceu no ${l.nome}. Quem conhecia o local tinha vantagem.`,
    `A arma foi ${m.nome}. Isso limita o número de suspeitos.`,
    `O culpado tinha um motivo forte. Preste atenção nas respostas sobre a vítima.`
  ];
}

// ============================================================
// GERAR CASO COM IA
// ============================================================
async function gerarCasoComIA() {
  const lang = _lg();
  const tema = geradorEstado.tema;
  const dificuldade = geradorEstado.dificuldade;
  const numSuspeitos = geradorEstado.numSuspeitos;

  const prompt = lang === 'en'
    ? `You are a classic detective mystery writer.
Create a criminal case in "locked room" or "riddle mystery" style.
Reply ONLY with valid JSON, no text before or after.

Theme: ${tema}
Difficulty: ${dificuldade}
Number of suspects: ${numSuspeitos}

The JSON must have EXACTLY this structure:
{
  "titulo": "short and mysterious case title",
  "resumo": "one sentence summarizing the crime",
  "premissa": "3-4 sentence paragraph explaining the crime context",
  "evidencias": [
    "First evidence with details",
    "Second evidence with details",
    "Third evidence with details"
  ],
  "suspeitos": [
    {
      "nome": "Suspect title (ex: The Doctor)",
      "nomeCompleto": "Suspect full name",
      "desc": "Brief suspect description",
      "defesa": "What they say in their defense",
      "avatar": "an emoji representing the suspect"
    }
  ],
  "culpado": "The guilty suspect's title (same as 'nome' field)",
  "solucao": "Complete explanation of how the crime happened",
  "dicas": [
    "First subtle hint",
    "Second more direct hint",
    "Third revealing hint"
  ]
}

IMPORTANT RULES:
- The "culpado" field must be EQUAL to one of the suspects' "nome" fields
- Create exactly ${numSuspeitos} suspects
- Each suspect must have a unique personality
- The solution must be logical and coherent
- The 3 hints must be progressive
- Use English`
    : `Você é um escritor de mistérios de detetive clássicos.
Crie um caso criminal no estilo "sala trancada" ou "mistério de enigma".
Responda APENAS com um JSON válido, sem texto antes ou depois.

Tema: ${tema}
Dificuldade: ${dificuldade}
Número de suspeitos: ${numSuspeitos}

O JSON deve ter EXATAMENTE esta estrutura:
{
  "titulo": "título curto e misterioso do caso",
  "resumo": "uma frase resumindo o crime",
  "premissa": "parágrafo de 3-4 frases explicando o contexto do crime",
  "evidencias": [
    "Primeira evidência com detalhes",
    "Segunda evidência com detalhes",
    "Terceira evidência com detalhes"
  ],
  "suspeitos": [
    {
      "nome": "Título do suspeito (ex: O Médico)",
      "nomeCompleto": "Nome completo do suspeito",
      "desc": "Breve descrição do suspeito",
      "defesa": "O que ele diz em sua defesa",
      "avatar": "um emoji que represente o suspeito"
    }
  ],
  "culpado": "O Título do suspeito culpado (igual ao campo nome)",
  "solucao": "Explicação completa de como o crime aconteceu",
  "dicas": [
    "Primeira dica sutil",
    "Segunda dica mais direta",
    "Terceira dica reveladora"
  ]
}

REGRAS IMPORTANTES:
- O campo "culpado" deve ser IGUAL ao campo "nome" de um dos suspeitos
- Crie exatamente ${numSuspeitos} suspeitos
- Cada suspeito deve ter personalidade única
- A solução deve ser lógica e coerente
- As 3 dicas devem ser progressivas
- Use português brasileiro`;

  try {
    const response = await fetch(CONFIG_GERADOR.apiPollinations, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: lang === 'en'
              ? 'You are a mystery writer. Always reply in valid JSON.'
              : 'Você é um escritor de mistérios. Responda sempre em JSON válido.'
          },
          { role: 'user', content: prompt }
        ],
        model: CONFIG_GERADOR.modeloIA,
        jsonMode: true,
        seed: Math.floor(Math.random() * 1000000)
      }),
      signal: AbortSignal.timeout(CONFIG_GERADOR.timeout)
    });

    if (!response.ok) throw new Error('API error');

    const texto = await response.text();

    let jsonTexto = texto.trim();
    jsonTexto = jsonTexto.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');

    const primeiroChave = jsonTexto.indexOf('{');
    const ultimoChave = jsonTexto.lastIndexOf('}');

    if (primeiroChave !== -1 && ultimoChave !== -1) {
      jsonTexto = jsonTexto.substring(primeiroChave, ultimoChave + 1);
    }

    const casoIA = JSON.parse(jsonTexto);

    if (!casoIA.titulo || !casoIA.suspeitos || !casoIA.culpado) {
      throw new Error('Incomplete case');
    }

    const culpadoExiste = casoIA.suspeitos.some(function(s) {
      return s.nome === casoIA.culpado;
    });

    if (!culpadoExiste) {
      casoIA.culpado = casoIA.suspeitos[0].nome;
    }

    casoIA.id = gerarId();
    casoIA.capitulo = 99;
    casoIA.gerado = true;
    casoIA.geradoPor = 'ia';
    casoIA.dataGeracao = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR');

    return casoIA;

  } catch (erro) {
    console.warn('Error generating case with AI:', erro.message);
    throw erro;
  }
}

async function gerarCaso(modo) {
  if (modo === 'ia') {
    try {
      return await gerarCasoComIA();
    } catch (e) {
      console.warn('AI failed, using procedural:', e.message);
      const casoProc = gerarCasoProcedural();
      casoProc.geradoPor = 'procedural (fallback)';
      return casoProc;
    }
  } else {
    return gerarCasoProcedural();
  }
}

// ============================================================
// SALVAR / CARREGAR (✅ BUG #12: trata QuotaExceededError)
// ============================================================
function salvarCasoGerado(caso) {
  try {
    var salvo = localStorage.getItem('arquivoMorto_casosGerados');
    var casos = salvo ? JSON.parse(salvo) : [];
    casos.push(caso);
    if (casos.length > 20) casos = casos.slice(-20);
    localStorage.setItem('arquivoMorto_casosGerados', JSON.stringify(casos));
    console.log('✓ Case saved:', caso.titulo);
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      try {
        localStorage.setItem('arquivoMorto_casosGerados', JSON.stringify([caso]));
        if (typeof notificar === 'function') {
          notificar(
            '⚠️ ' + (window.idiomaAtual === 'en' ? 'Storage' : 'Armazenamento'),
            window.idiomaAtual === 'en'
              ? 'Old cases deleted to free space.'
              : 'Casos antigos apagados para liberar espaço.'
          );
        }
      } catch(e2) {
        console.warn('Storage completely full — cannot save case');
      }
    }
    console.warn('Error saving case:', e.message);
    return false;
  }
}

function carregarCasosGerados() {
  try {
    const salvo = localStorage.getItem('arquivoMorto_casosGerados');
    return salvo ? JSON.parse(salvo) : [];
  } catch (e) {
    return [];
  }
}

// ============================================================
// TELA DO GERADOR
// ============================================================
function iniciarGerador() {
  if (window.mostrarTela) mostrarTela('screen-gerador');
  resetarGerador();

  setTimeout(function() {
    document.querySelectorAll('.gerador-voltar').forEach(function(b) { b.remove(); });
    if (typeof removerBotoesVoltarInternos === 'function') {
      removerBotoesVoltarInternos();
    }
  }, 50);
}

function resetarGerador() {
  const form = document.querySelector('.gerador-form');
  const loading = document.getElementById('gerador-loading');
  const preview = document.getElementById('gerador-preview');

  if (form) form.style.display = 'flex';
  if (loading) loading.classList.remove('show');
  if (preview) preview.classList.remove('show');

  atualizarHistoricoGerador();
}

function selecionarOpcao(campo, valor, el) {
  const pai = el.parentElement;
  pai.querySelectorAll('.gerador-opcao').forEach(function(op) {
    op.classList.remove('ativo');
  });
  el.classList.add('ativo');

  if (campo === 'tema') geradorEstado.tema = valor;
  else if (campo === 'dificuldade') geradorEstado.dificuldade = valor;
  else if (campo === 'numSuspeitos') geradorEstado.numSuspeitos = parseInt(valor);
}

async function acionarGeracao(modo) {
  const lang = _lg();
  const form = document.querySelector('.gerador-form');
  const loading = document.getElementById('gerador-loading');
  const preview = document.getElementById('gerador-preview');

  if (form) form.style.display = 'none';
  if (preview) preview.classList.remove('show');
  if (loading) loading.classList.add('show');

  animarLoading(modo);

  try {
    const caso = await gerarCaso(modo);
    salvarCasoGerado(caso);

    setTimeout(function() {
      if (loading) loading.classList.remove('show');
      mostrarPreviewCaso(caso);
    }, 1500);

  } catch (e) {
    console.error('Error generating case:', e);
    if (loading) loading.classList.remove('show');
    if (form) form.style.display = 'flex';

    // ✅ BUG #11: substitui alert() por notificar()
    if (typeof notificar === 'function') {
      notificar(
        '❌ ' + (lang === 'en' ? 'Error' : 'Erro'),
        lang === 'en' ? 'Failed to generate case.' : 'Falha ao gerar caso.'
      );
    }
  }
}

function animarLoading(modo) {
  const lang = _lg();
  const fill = document.querySelector('.loading-fill-gerador');
  const texto = document.querySelector('.loading-texto-gerador');
  const titulo = document.querySelector('.loading-titulo-gerador');

  if (titulo) {
    if (lang === 'en') {
      titulo.textContent = modo === 'ia' ? '🤖 CREATING CASE WITH AI...' : '🎲 BUILDING CASE...';
    } else {
      titulo.textContent = modo === 'ia' ? '🤖 CRIANDO CASO COM IA...' : '🎲 MONTANDO CASO...';
    }
  }

  const frases = lang === 'en'
    ? (modo === 'ia'
        ? ['Connecting to AI...','Generating crime premise...','Creating unique suspects...','Hiding clues...','Refining the mystery...']
        : ['Drawing scenario...','Choosing suspects...','Defining murder weapon...','Hiding clues...','Finalizing case...'])
    : (modo === 'ia'
        ? ['Conectando com a IA...','Gerando premissa do crime...','Criando suspeitos únicos...','Escondendo pistas...','Refinando o mistério...']
        : ['Sorteando cenário...','Escolhendo suspeitos...','Definindo arma do crime...','Escondendo pistas...','Finalizando caso...']);

  let progresso = 0;
  let fraseAtual = 0;

  const interval = setInterval(function() {
    progresso += 5;
    if (progresso > 90) progresso = 90;

    if (fill) fill.style.width = progresso + '%';

    if (progresso % 20 === 0 && fraseAtual < frases.length) {
      if (texto) texto.textContent = frases[fraseAtual];
      fraseAtual++;
    }

    if (progresso >= 90) {
      clearInterval(interval);
      if (fill) fill.style.width = '100%';
      if (texto) texto.textContent = lang === 'en' ? '✓ Ready!' : '✓ Pronto!';
    }
  }, 200);
}

function mostrarPreviewCaso(caso) {
  const lang = _lg();
  const preview = document.getElementById('gerador-preview');
  if (!preview) return;

  const badge = caso.geradoPor === 'ia'
    ? '<span class="badge-ia">🤖 ' + (lang === 'en' ? 'AI' : 'IA') + '</span>'
    : '<span class="badge-procedural">🎲 ' + (lang === 'en' ? 'ALGORITHM' : 'ALGORITMO') + '</span>';

  const suspeitosHTML = caso.suspeitos.map(function(s) {
    return '<div class="preview-suspeito">' + (s.avatar || '❓') + ' ' + s.nome + '</div>';
  }).join('');

  const lblCaso = lang === 'en' ? '📁 CASE' : '📁 CASO';
  const lblSuspeitos = lang === 'en' ? '👤 SUSPECTS' : '👤 SUSPEITOS';
  const lblPistas = lang === 'en' ? '🔍 CLUES' : '🔍 PISTAS';
  const lblDif = lang === 'en' ? '⭐ DIFFICULTY' : '⭐ DIFICULDADE';
  const lblPronto = lang === 'en' ? '✓ CASE GENERATED!' : '✓ CASO GERADO!';
  const lblJogar = lang === 'en' ? '▶ PLAY NOW' : '▶ JOGAR AGORA';
  const lblOutro = lang === 'en' ? '🔄 GENERATE ANOTHER' : '🔄 GERAR OUTRO';

  let difTexto;
  if (lang === 'en') {
    difTexto = geradorEstado.dificuldade === 'facil' ? 'Easy'
      : geradorEstado.dificuldade === 'medio' ? 'Medium'
      : geradorEstado.dificuldade === 'dificil' ? 'Hard' : 'Nightmare';
  } else {
    difTexto = geradorEstado.dificuldade === 'facil' ? 'Fácil'
      : geradorEstado.dificuldade === 'medio' ? 'Médio'
      : geradorEstado.dificuldade === 'dificil' ? 'Difícil' : 'Pesadelo';
  }

  preview.innerHTML =
    '<div class="preview-titulo">' + lblPronto + '</div>' +
    '<div class="preview-caso-titulo">' + (typeof escapeHTML === 'function' ? escapeHTML(caso.titulo) : caso.titulo) + ' ' + badge + '</div>' +
    '<div class="preview-info">' +
      '<div class="preview-item"><div class="label">' + lblCaso + '</div><div class="valor">#' + caso.id + '</div></div>' +
      '<div class="preview-item"><div class="label">' + lblSuspeitos + '</div><div class="valor">' + caso.suspeitos.length + '</div></div>' +
      '<div class="preview-item"><div class="label">' + lblPistas + '</div><div class="valor">' + caso.evidencias.length + '</div></div>' +
      '<div class="preview-item"><div class="label">' + lblDif + '</div><div class="valor">' + difTexto + '</div></div>' +
    '</div>' +
    '<div class="preview-suspeitos">' + suspeitosHTML + '</div>' +
    '<div class="preview-acoes">' +
      '<button class="btn-preview btn-jogar-preview" onclick="jogarCasoGerado()">' + lblJogar + '</button>' +
      '<button class="btn-preview btn-outro-preview" onclick="resetarGerador()">' + lblOutro + '</button>' +
    '</div>';

  window.casoGeradoAtual = caso;
  preview.classList.add('show');
}

function jogarCasoGerado() {
  if (!window.casoGeradoAtual) return;

  const caso = window.casoGeradoAtual;

  if (window.CASOS) window.CASOS.push(caso);
  if (window.CacheCasos) window.CacheCasos.invalidar();

  if (typeof abrirCaso === 'function') {
    if (window.mostrarTela) mostrarTela('screen-app');
    if (window.renderizarMenu) renderizarMenu();
    setTimeout(function() { abrirCaso(caso.id); }, 200);
  }
}

function atualizarHistoricoGerador() {
  const lang = _lg();
  const container = document.getElementById('gerador-historico-lista');
  if (!container) return;

  const casos = carregarCasosGerados();

  if (casos.length === 0) {
    container.innerHTML = '<div class="historico-vazio">' +
      (lang === 'en' ? 'No cases generated yet.' : 'Nenhum caso gerado ainda.') +
    '</div>';
    return;
  }

  container.innerHTML = '';

  casos.slice().reverse().slice(0, 10).forEach(function(caso) {
    const div = document.createElement('div');
    div.className = 'historico-item';
    div.innerHTML =
      '<span>' + (caso.geradoPor === 'ia' ? '🤖' : '🎲') + ' ' +
      (typeof escapeHTML === 'function' ? escapeHTML(caso.titulo) : caso.titulo) + '</span>' +
      '<span class="data">' + (caso.dataGeracao || '') + '</span>';

    div.addEventListener('click', function() { mostrarPreviewCaso(caso); });
    container.appendChild(div);
  });
}

// ============================================================
// EXPORTAR
// ============================================================
window.iniciarGerador = iniciarGerador;
window.resetarGerador = resetarGerador;
window.selecionarOpcao = selecionarOpcao;
window.acionarGeracao = acionarGeracao;
window.jogarCasoGerado = jogarCasoGerado;
window.gerarCasoProcedural = gerarCasoProcedural;
window.gerarCasoComIA = gerarCasoComIA;
window.gerarCaso = gerarCaso;
window.carregarCasosGerados = carregarCasosGerados;
window.salvarCasoGerado = salvarCasoGerado;
window.gerarId = gerarId;
// ✅ BUG #6: PECAS_PROCEDURAIS exposto (já feito acima, mas reforçando)
window.PECAS_PROCEDURAIS = PECAS_PROCEDURAIS;

console.log('✓ Gerador de casos v7.2 carregado (PT + EN)');
console.log('  • PECAS_PROCEDURAIS exposto globalmente');
console.log('  • notificar() usado em erros');
console.log('  • QuotaExceededError tratado');