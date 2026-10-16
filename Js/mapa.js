// ============================================================
// ARQUIVO MORTO v6.6 — MAPA MUNDI + CASOS 55-104
// ============================================================
// ⚠️ ESTE ARQUIVO NÃO DEFINE CAPITULOS_V6 NEM CHEFOES_V6
// Eles estão em capitulos.js (definidos UMA única vez)
// ============================================================

// ============================================================
// GERADOR DOS CASOS 55-104 (bilíngue)
// ============================================================
function gerarCasosCapitulos6a10() {
  var locais = [
    { pt: 'Museu de História Antiga', en: 'Museum of Ancient History', emoji: '🏛️' },
    { pt: 'Teatro Municipal', en: 'City Theater', emoji: '🎭' },
    { pt: 'Estação Ferroviária', en: 'Train Station', emoji: '🚂' },
    { pt: 'Mansão dos Duques', en: 'Dukes Mansion', emoji: '🏰' },
    { pt: 'Biblioteca Nacional', en: 'National Library', emoji: '📚' },
    { pt: 'Hotel Copacabana', en: 'Copacabana Hotel', emoji: '🏨' },
    { pt: 'Iate do Magnata', en: 'Magnate Yacht', emoji: '🛥️' },
    { pt: 'Cassino de Mônaco', en: 'Monaco Casino', emoji: '🎰' },
    { pt: 'Ópera de Viena', en: 'Vienna Opera', emoji: '🎼' },
    { pt: 'Convento Abandonado', en: 'Abandoned Convent', emoji: '⛪' },
    { pt: 'Laboratório Secreto', en: 'Secret Lab', emoji: '🧪' },
    { pt: 'Circo Itinerante', en: 'Traveling Circus', emoji: '🎪' },
    { pt: 'Cemitério Antigo', en: 'Ancient Cemetery', emoji: '⚰️' },
    { pt: 'Aeroporto Privado', en: 'Private Airport', emoji: '✈️' },
    { pt: 'Aquário Municipal', en: 'City Aquarium', emoji: '🐠' },
    { pt: 'Observatório Astronômico', en: 'Astronomical Observatory', emoji: '🔭' },
    { pt: 'Vinícola Familiar', en: 'Family Winery', emoji: '🍷' },
    { pt: 'Fábrica Têxtil', en: 'Textile Factory', emoji: '🧵' },
    { pt: 'Universidade Federal', en: 'Federal University', emoji: '🎓' },
    { pt: 'Hospital Psiquiátrico', en: 'Psychiatric Hospital', emoji: '🏥' }
  ];

  var motivos = [
    { pt: { desc: 'vingança antiga', frase: 'Ele arruinou minha família.' }, en: { desc: 'old revenge', frase: 'He ruined my family.' } },
    { pt: { desc: 'herança milionária', frase: 'O testamento seria alterado.' }, en: { desc: 'millionaire inheritance', frase: 'The will was going to be changed.' } },
    { pt: { desc: 'crime passional', frase: 'Ela me traiu.' }, en: { desc: 'crime of passion', frase: 'She cheated on me.' } },
    { pt: { desc: 'dívida de jogo', frase: 'Devia uma fortuna.' }, en: { desc: 'gambling debt', frase: 'Owed a fortune.' } },
    { pt: { desc: 'segredo de família', frase: 'Sabia demais.' }, en: { desc: 'family secret', frase: 'Knew too much.' } },
    { pt: { desc: 'rivalidade profissional', frase: 'Roubou minha pesquisa.' }, en: { desc: 'professional rivalry', frase: 'Stole my research.' } },
    { pt: { desc: 'chantagem', frase: 'Me chantageava há meses.' }, en: { desc: 'blackmail', frase: 'Blackmailed me for months.' } },
    { pt: { desc: 'amor não correspondido', frase: 'Ela me rejeitou.' }, en: { desc: 'unrequited love', frase: 'She rejected me.' } },
    { pt: { desc: 'negócio fracassado', frase: 'Arruinou meus negócios.' }, en: { desc: 'failed business', frase: 'Ruined my business.' } },
    { pt: { desc: 'vingança política', frase: 'Destruiu minha carreira.' }, en: { desc: 'political revenge', frase: 'Destroyed my career.' } }
  ];

  var metodos = [
    { pt: { nome: 'veneno no chá', pista: 'xícara com resíduo' }, en: { nome: 'poison in tea', pista: 'cup with residue' } },
    { pt: { nome: 'faca de cozinha', pista: 'corte preciso' }, en: { nome: 'kitchen knife', pista: 'precise cut' } },
    { pt: { nome: 'empurrão da escada', pista: 'marcas de arranhão' }, en: { nome: 'push down stairs', pista: 'scratch marks' } },
    { pt: { nome: 'sufocamento', pista: 'fibras de tecido' }, en: { nome: 'suffocation', pista: 'fabric fibers' } },
    { pt: { nome: 'corda de seda', pista: 'marcas no pescoço' }, en: { nome: 'silk cord', pista: 'marks on neck' } },
    { pt: { nome: 'veneno injetado', pista: 'marca de agulha' }, en: { nome: 'injected poison', pista: 'needle mark' } },
    { pt: { nome: 'queda forjada', pista: 'posição estranha' }, en: { nome: 'staged fall', pista: 'strange position' } },
    { pt: { nome: 'afogamento', pista: 'água com sabão' }, en: { nome: 'drowning', pista: 'soapy water' } },
    { pt: { nome: 'faca de gelo', pista: 'ferida seca' }, en: { nome: 'ice dagger', pista: 'dry wound' } },
    { pt: { nome: 'veneno no vinho', pista: 'cheiro de amêndoas' }, en: { nome: 'poison in wine', pista: 'almond smell' } }
  ];

  var nomes = [
    'Ricardo Vasconcelos','Eduardo Salles','Marcelo Prado','Fernando Duarte',
    'Gustavo Rocha','Henrique Belmonte','Otávio Lemos','Vinícius Camargo',
    'Alexandre Torres','Rodrigo Peixoto','Beatriz Almeida','Carolina Mendes',
    'Daniela Siqueira','Elisa Vasques','Fernanda Coutinho','Gabriela Moraes',
    'Helena Prado','Isabela Rocha','Juliana Tavares','Larissa Pacheco'
  ];

  var titulosPT = [
    'O Advogado','O Médico','O Empresário','O Professor','O Jornalista',
    'O Detetive Rival','O Músico','O Pintor','O Cientista','O Carteiro',
    'A Jornalista','A Médica','A Empresária','A Professora','A Advogada',
    'A Pianista','A Atriz','A Cientista','A Fotógrafa','A Cozinheira'
  ];

  var titulosEN = [
    'The Lawyer','The Doctor','The Businessman','The Professor','The Journalist',
    'The Rival Detective','The Musician','The Painter','The Scientist','The Postman',
    'The Journalist','The Doctor','The Businesswoman','The Professor','The Lawyer',
    'The Pianist','The Actress','The Scientist','The Photographer','The Cook'
  ];

  var avatares = [
    '🎩','👨‍💼','👨‍🔬','👨‍🏫','👨‍🍳','🧔','👨‍⚖️','👨‍🎨','👨‍💻','🤵',
    '🕴️','🕵️','👩‍💼','👩‍🔬','👩‍🏫','👩‍🎨','👩‍⚖️','👩‍💻','💃','👩‍🎤'
  ];

  var casos = [];
  var id = 55;

  for (var cap = 6; cap <= 10; cap++) {
    for (var i = 0; i < 10; i++) {
      var local = locais[(id + cap) % locais.length];
      var metodo = metodos[(id * 3 + cap) % metodos.length];
      var motivo = motivos[(id * 7 + cap) % motivos.length];
      var numSuspeitos = 3 + ((id + cap) % 2);
      var suspeitos = [];
      var usados = {};

      for (var s = 0; s < numSuspeitos; s++) {
        var ni = (id * 11 + s * 5 + cap) % nomes.length;
        var ti = (id * 13 + s * 7 + cap) % titulosPT.length;
        var ai = (id * 17 + s * 11 + cap) % avatares.length;

        while (usados[titulosPT[ti]]) ti = (ti + 1) % titulosPT.length;
        usados[titulosPT[ti]] = true;

        suspeitos.push({
          nome: titulosPT[ti],
          nomeEN: titulosEN[ti],
          nomeCompleto: nomes[ni],
          desc: 'Estava no local no momento do crime.',
          descEN: 'Was at the scene when the crime happened.',
          defesa: 'Não fiz nada! ' + motivo.pt.frase,
          defesaEN: 'I did nothing! ' + motivo.en.frase,
          avatar: avatares[ai]
        });
      }

      var ic = (id * 19) % suspeitos.length;
      var culpado = suspeitos[ic];
      culpado.desc = 'Estava no local e tinha motivo.';
      culpado.descEN = 'Was at the scene and had a motive.';

      casos.push({
        id: id,
        capitulo: cap,
        titulo: 'O Enigma de ' + local.pt,
        tituloEN: 'The Enigma of the ' + local.en,
        resumo: 'Um caso de ' + metodo.pt.nome + ' abala ' + local.pt + '.',
        resumoEN: 'A case of ' + metodo.en.nome + ' shakes the ' + local.en + '.',
        premissa: 'Durante um evento em ' + local.pt + ', a vítima foi encontrada morta por ' + metodo.pt.nome + '. Todos são suspeitos.',
        premissaEN: 'During an event at the ' + local.en + ', the victim was found dead by ' + metodo.en.nome + '. Everyone is a suspect.',
        evidencias: [
          local.emoji + ' ' + metodo.pt.pista,
          '🔍 Carta com ameaças',
          '🔍 Objeto pessoal da vítima'
        ],
        evidenciasEN: [
          local.emoji + ' ' + metodo.en.pista,
          '🔍 Letter with threats',
          '🔍 Victim\'s personal item'
        ],
        suspeitos: suspeitos,
        culpado: culpado.nome,
        culpadoEN: culpado.nomeEN,
        solucao: culpado.nomeCompleto + ' cometeu o crime por ' + motivo.pt.desc + '. ' + motivo.pt.frase,
        solucaoEN: culpado.nomeCompleto + ' committed the crime for ' + motivo.en.desc + '. ' + motivo.en.frase,
        dicas: [
          'O crime em ' + local.pt + '. Quem conhecia o local?',
          'A arma foi ' + metodo.pt.nome + '.',
          'O culpado tinha motivo forte.'
        ],
        dicasEN: [
          'The crime at the ' + local.en + '. Who knew the place?',
          'The weapon was ' + metodo.en.nome + '.',
          'The culprit had a strong motive.'
        ]
      });

      id++;
    }
  }

  return casos;
}

// ============================================================
// INJETAR CASOS 55-104 NO ARRAY GLOBAL
// ============================================================
function iniciarCasos6a10() {
  if (!window.CASOS) {
    console.warn('⚠️ window.CASOS não existe — casos 55-104 não podem ser injetados');
    return;
  }

  var idsExistentes = window.CASOS.map(function(c) { return c.id; });
  var casosNovos = gerarCasosCapitulos6a10();
  var adicionados = 0;

  casosNovos.forEach(function(c) {
    if (idsExistentes.indexOf(c.id) === -1) {
      window.CASOS.push(c);
      adicionados++;
    }
  });

  console.log('✓ Casos 55-104 adicionados: ' + adicionados);
}

// ============================================================
// MAPA MUNDI
// ============================================================
function abrirTelaMapa() {
  if (window.mostrarTela) mostrarTela('screen-mapa');
  renderizarMapaMundi();
}

function renderizarMapaMundi() {
  var viewport = document.getElementById('mapa-viewport');
  if (!viewport) return;

  var total = document.getElementById('mapa-stat-total');
  var res = document.getElementById('mapa-stat-res');
  var casos = window.getCasosTodos ? getCasosTodos() : (window.CASOS || []);

  if (total) total.textContent = casos.length;
  if (res && window.estadoRef) res.textContent = estadoRef().resolvidos.length;

  var svg = '<svg class="mapa-svg" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">';
  svg += '<rect width="800" height="400" fill="#0a0806"/>';

  // Continentes estilizados
  svg += '<path class="pais" d="M 120 80 Q 180 60 220 100 Q 240 140 200 180 Q 160 200 120 170 Q 100 120 120 80 Z"/>';
  svg += '<path class="pais" d="M 200 200 Q 240 190 260 230 Q 250 300 220 340 Q 190 320 190 260 Q 180 220 200 200 Z"/>';
  svg += '<path class="pais" d="M 380 100 Q 440 80 480 110 Q 500 150 460 180 Q 420 190 390 160 Q 370 130 380 100 Z"/>';
  svg += '<path class="pais" d="M 400 200 Q 460 190 500 230 Q 510 300 470 340 Q 420 330 400 280 Q 390 240 400 200 Z"/>';
  svg += '<path class="pais" d="M 560 100 Q 680 80 740 130 Q 760 200 700 250 Q 620 260 580 200 Q 550 150 560 100 Z"/>';
  svg += '<path class="pais" d="M 660 300 Q 720 290 740 330 Q 720 360 680 350 Q 660 330 660 300 Z"/>';

  // Pinpoints
  var cidades = [
    { x: 180, y: 160, nome: 'Nova York' },
    { x: 220, y: 280, nome: 'Rio' },
    { x: 420, y: 140, nome: 'Londres' },
    { x: 440, y: 160, nome: 'Paris' },
    { x: 480, y: 180, nome: 'Roma' },
    { x: 640, y: 160, nome: 'Tóquio' },
    { x: 700, y: 320, nome: 'Sydney' }
  ];

  cidades.forEach(function(c) {
    svg += '<g class="pinpoint" data-cidade="' + c.nome + '">' +
      '<circle cx="' + c.x + '" cy="' + c.y + '" r="4"/>' +
      '<circle class="pulso" cx="' + c.x + '" cy="' + c.y + '" r="4"/>' +
      '<text x="' + c.x + '" y="' + (c.y - 8) + '">' + c.nome + '</text>' +
    '</g>';
  });

  svg += '</svg>';
  viewport.innerHTML = svg;
}

// ============================================================
// EXPORTAR
// ============================================================
window.gerarCasosCapitulos6a10 = gerarCasosCapitulos6a10;
window.iniciarCasos6a10 = iniciarCasos6a10;
window.abrirTelaMapa = abrirTelaMapa;
window.renderizarMapaMundi = renderizarMapaMundi;

console.log('✓ Mapa e casos 55-104 carregados (v6.6)');