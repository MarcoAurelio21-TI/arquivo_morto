// ============================================================
// ARQUIVO MORTO v6.6 — 10 CAPÍTULOS + 5 CHEFÕES FINAIS
// ============================================================
// ⚠️ ESTE é o ÚNICO arquivo que define CAPITULOS_V6 e CHEFOES_V6.
// O mapa.js NÃO redefine — apenas usa via window.
// ============================================================

const CAPITULOS_V6 = [
  { id: 1, nome: 'Os Primeiros Casos', desc: 'Casos 1-10: Aprenda os fundamentos da investigação.', chefao: 1001, icone: '🔰' },
  { id: 2, nome: 'A Rede Criminosa', desc: 'Casos 11-20: Uma organização oculta se revela.', chefao: 1002, icone: '🕸️' },
  { id: 3, nome: 'O Mestre dos Disfarces', desc: 'Casos 21-30: Ninguém é quem parece ser.', chefao: 1003, icone: '🎭' },
  { id: 4, nome: 'O Sindicato', desc: 'Casos 31-40: A teia se fecha ao seu redor.', chefao: 1004, icone: '💼' },
  { id: 5, nome: 'O CÉREBRO', desc: 'Casos 41-54: A verdade final. O mentor aparece.', chefao: 1005, icone: '🧠' },
  { id: 6, nome: 'Ecos do Passado', desc: 'Casos 55-64: Crimes antigos voltam para assombrar o presente.', chefao: 1006, icone: '📜' },
  { id: 7, nome: 'A Cidade Silenciosa', desc: 'Casos 65-74: O caso que mudou tudo.', chefao: 1007, icone: '🌃' },
  { id: 8, nome: 'A Corte das Sombras', desc: 'Casos 75-84: Uma sociedade secreta de criminosos de elite.', chefao: 1008, icone: '🏛️' },
  { id: 9, nome: 'O Último Ato', desc: 'Casos 85-94: Todos os fios se conectam.', chefao: 1009, icone: '🎬' },
  { id: 10, nome: 'O Fim do Arquivo', desc: 'Casos 95-104: O confronto final.', chefao: 1010, icone: '🔥' }
];

const CHEFOES_V6 = [
  {
    id: 1006, capitulo: 6, titulo: 'O Colecionador', icone: '🏺',
    resumo: 'Um assassino que coleciona troféus humanos.',
    premissa: 'Cinco pessoas desapareceram em três meses. Todas frequentaram o mesmo leilão de antiguidades.',
    evidencias: [
      'Cinco objetos pessoais desaparecidos',
      'Um catálogo de leilão com anotações',
      'Uma vitrine trancada com itens "decorativos"',
      'Um diário com listas de nomes'
    ],
    suspeitos: [
      { nome: 'O Leiloeiro', desc: 'Organizou todos os leilões.', defesa: 'Só faço meu trabalho.', avatar: '🔨' },
      { nome: 'A Curadora do Museu', desc: 'Conhecia todas as vítimas.', defesa: 'Sou historiadora.', avatar: '🏛️' },
      { nome: 'O Colecionador Recluso', desc: 'Nunca aparece em público.', defesa: 'Minha coleção é legal.', avatar: '🕴️' }
    ],
    culpado: 'O Colecionador Recluso',
    solucao: 'O Colecionador é um milionário excêntrico que mata para obter objetos únicos. Cada vítima possuía um item que ele cobiçava. Ele as convidava para ver sua "coleção" e nunca deixava sair.',
    dicas: [
      'Os objetos desaparecidos formam uma coleção.',
      'O leilão é o ponto em comum entre as vítimas.',
      'O culpado não aparece em público — mas conhece todos.'
    ],
    ehChefao: true
  },
  {
    id: 1007, capitulo: 7, titulo: 'O Fantasma da Cidade Silenciosa', icone: '🌃',
    resumo: 'O caso que assombra o detetive há 12 anos.',
    premissa: 'Em 1994, uma cidade inteira ficou em silêncio por 3 dias. Todos os moradores desapareceram. Agora, um sobrevivente apareceu morto com uma carta endereçada a você.',
    evidencias: [
      'Uma carta com a caligrafia do desaparecido',
      'Uma foto da cidade vazia em 1994',
      'Um mapa com 7 pontos marcados',
      'Um diário com anotações em código'
    ],
    suspeitos: [
      { nome: 'O Sobrevivente', desc: 'O único que escapou.', defesa: 'Eu só quero viver em paz.', avatar: '👤' },
      { nome: 'O Jornalista Aposentado', desc: 'Cobriu o caso em 1994.', defesa: 'Eu investiguei, não participei.', avatar: '📰' },
      { nome: 'O Prefeito da Cidade', desc: 'Governou na época.', defesa: 'Não sabia de nada.', avatar: '🏛️' }
    ],
    culpado: 'O Sobrevivente',
    solucao: 'O Sobrevivente não é vítima — é o responsável. Em 1994, ele envenenou o reservatório de água para "limpar" a cidade de pessoas que considerava impuras. Ele voltou agora para terminar o trabalho.',
    dicas: [
      'A cidade ficou em silêncio por 3 dias — o que aconteceu nesse tempo?',
      'A caligrafia da carta é do próprio desaparecido.',
      'O sobrevivente voltou. Mas voltou para quê?'
    ],
    ehChefao: true
  },
  {
    id: 1008, capitulo: 8, titulo: 'A Corte das Sombras', icone: '🏛️',
    resumo: 'Uma sociedade secreta de criminosos de elite.',
    premissa: 'Uma juíza, um banqueiro, um bispo e um general foram encontrados mortos na mesma noite. Todos com uma carta de baralho na mão.',
    evidencias: [
      'Quatro cartas de baralho (Ás, Rei, Rainha, Valete)',
      'Um convite para uma "reunião privada"',
      'Um símbolo da corte em cada cena',
      'Um livro sobre sociedades secretas'
    ],
    suspeitos: [
      { nome: 'O Mordomo da Corte', desc: 'Servia a todos os mortos.', defesa: 'Eu apenas servia.', avatar: '🤵' },
      { nome: 'A Herdeira', desc: 'Única sobrevivente da família.', defesa: 'Não sabia dessa "corte".', avatar: '👰' },
      { nome: 'O Cardeal', desc: 'Celebrava os rituais.', defesa: 'Sou um homem de Deus.', avatar: '⛪' }
    ],
    culpado: 'O Mordomo da Corte',
    solucao: 'O Mordomo é o guardião dos segredos da Corte das Sombras. Quando os quatro membros decidiram dissolver a sociedade, ele os eliminou para proteger o que sabiam.',
    dicas: [
      'As cartas formam uma mão de baralho completa.',
      'O símbolo da corte está em todas as cenas.',
      'Quem servia a todos — e sabia de tudo?'
    ],
    ehChefao: true
  },
  {
    id: 1009, capitulo: 9, titulo: 'O Último Ato', icone: '🎬',
    resumo: 'Todos os suspeitos dos casos anteriores aparecem mortos.',
    premissa: 'Em uma única noite, 12 pessoas que você interrogou ao longo dos anos apareceram mortas. Todas com o mesmo bilhete: "Você foi o último a vê-las". Alguém está te incriminando.',
    evidencias: [
      'Doze bilhetes com a mesma mensagem',
      'Uma lista com todos os seus casos',
      'Uma gravação de áudio com sua voz',
      'Um contrato de aluguel em seu nome'
    ],
    suspeitos: [
      { nome: 'O Detetive Rival', desc: 'Sempre te odiou.', defesa: 'Eu queria te ver na cadeia. Mas não assim.', avatar: '🕵️‍♂️' },
      { nome: 'A Jornalista', desc: 'Publicou matérias sobre você.', defesa: 'Eu te elogiei!', avatar: '👩‍💻' },
      { nome: 'O Advogado', desc: 'Defendeu todos que você prendeu.', defesa: 'Eu perdi clientes com você.', avatar: '👨‍⚖️' }
    ],
    culpado: 'O Advogado',
    solucao: 'O Advogado perdeu tudo por causa dos seus casos — clientes, dinheiro, reputação. Ele passou anos planejando a vingança perfeita: matar todos que você interrogou e incriminar você.',
    dicas: [
      'Alguém está te incriminando — e conhece seu histórico.',
      'A lista de casos só podia vir de alguém com acesso a arquivos.',
      'Quem perdeu mais com o seu sucesso?'
    ],
    ehChefao: true
  },
  {
    id: 1010, capitulo: 10, titulo: 'O CÉREBRO — Ato Final', icone: '🔥',
    resumo: 'O confronto final. A verdade sobre o CÉREBRO.',
    premissa: 'Você finalmente descobriu quem é o CÉREBRO. Em uma mansão isolada, você encontrará as respostas — ou morrerá tentando.',
    evidencias: [
      'Uma pasta com todos os seus casos desde 1994',
      'Uma fita cassete com a voz do CÉREBRO',
      'Um espelho com a inscrição "Quem te treinou?"',
      'Uma fotografia sua de infância'
    ],
    suspeitos: [
      { nome: 'O Detetive Aposentado', desc: 'Seu mentor.', defesa: 'Você foi meu melhor aluno.', avatar: '🎩' },
      { nome: 'A Promotora', desc: 'Trabalhou em todos os casos.', defesa: 'Estou do lado da lei.', avatar: '⚖️' },
      { nome: 'Nyx', desc: 'A hacker misteriosa.', defesa: 'Eu fui vítima, não vilã.', avatar: '👤' },
      { nome: 'Você Mesmo', desc: 'A teoria impossível.', defesa: 'Eu? Não faz sentido...', avatar: '🕵️' }
    ],
    culpado: 'O Detetive Aposentado',
    solucao: 'O CÉREBRO é seu mentor. Ele treinou você — não para resolver crimes, mas para se tornar o detetive perfeito, porque só um detetive perfeito pode ser um criminoso perfeito.',
    dicas: [
      'O espelho pergunta "Quem te treinou?". Pense nisso.',
      'A fita cassete tem a voz de quem você mais confia.',
      'A foto de infância revela mais do que deveria.'
    ],
    ehChefao: true,
    ehFinal: true
  }
];

// ===== FUNÇÕES =====
function getCapituloV6(id) {
  return CAPITULOS_V6.find(function(c) { return c.id === id; }) || null;
}

function getChefaoV6(id) {
  return CHEFOES_V6.find(function(c) { return c.id === id; }) || null;
}

function iniciarCapitulosV6() {
  // Define window.CAPITULOS (usado pelo renderizarCampanha)
  window.CAPITULOS = CAPITULOS_V6;

  // Adiciona chefões ao array global (sem duplicar)
  if (!window.CHEFOES) window.CHEFOES = [];
  var idsExistentes = window.CHEFOES.map(function(c) { return c.id; });
  CHEFOES_V6.forEach(function(c) {
    if (idsExistentes.indexOf(c.id) === -1) {
      window.CHEFOES.push(c);
    }
  });

  // Chama a geração dos casos 55-104 (definida em mapa.js)
  if (window.iniciarCasos6a10) {
    window.iniciarCasos6a10();
  }

  // Invalida o cache de casos
  if (window.CacheCasos) window.CacheCasos.invalidar();

  console.log('✓ Capítulos v6 carregados');
  console.log('  Capítulos: ' + CAPITULOS_V6.length);
  console.log('  Chefões: ' + CHEFOES_V6.length);
  console.log('  Casos no total: ' + (window.CASOS ? window.CASOS.length : 0));
}

// ===== EXPORTAR =====
window.CAPITULOS_V6 = CAPITULOS_V6;
window.CHEFOES_V6 = CHEFOES_V6;
window.iniciarCapitulosV6 = iniciarCapitulosV6;
window.getCapituloV6 = getCapituloV6;
window.getChefaoV6 = getChefaoV6;

console.log('✓ 10 capítulos v6 carregados (com 5 chefões finais)');