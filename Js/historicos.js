// ============================================================
// ARQUIVO MORTO v6.0 — CASOS HISTÓRICOS
// ============================================================
// Casos baseados em crimes reais, com contexto ético e respeito
// às vítimas. NÃO são glorificações — são estudos de caso.

const CASOS_HISTORICOS = [
  {
    id: 9001,
    capitulo: 99,
    titulo: 'O Caso de Whitechapel',
    subtitulo: 'Londres, 1888',
    icone: '🔪',
    historico: true,
    resumo: 'Uma série de crimes abalou o bairro de Whitechapel. A polícia não conseguiu identificar o responsável. Este caso é um estudo sobre a investigação da época.',
    avisoEtico: 'Este caso é uma reconstrução histórica com fins educativos. As vítimas eram pessoas reais e merecem respeito. Não há glorificação do crime.',
    contexto: 'Em 1888, o bairro de Whitechapel, em Londres, foi palco de uma série de assassinatos que nunca foram solucionados. A imprensa da época apelidou o responsável de um nome que hoje é considerado sensacionalista. A investigação foi limitada pela tecnologia da época: não havia impressões digitais, análise de DNA ou câmeras de segurança.',
    premissa: 'Você é um inspetor da Scotland Yard em 1888. Cinco mulheres foram encontradas mortas em Whitechapel. A imprensa pressiona. A população está em pânico. Você tem apenas as ferramentas da época: testemunhas, dedução e lógica. Encontre o responsável antes que ele ataque novamente.',
    evidencias: [
      'Uma carta enviada à imprensa com detalhes que só o assassino saberia',
      'Um lenço de seda encontrado perto de uma das cenas',
      'Testemunhas relatam ter visto um homem de capa escura',
      'Um diário encontrado em um quarto abandonado',
      'Uma faca de açougueiro com inscrições em latim'
    ],
    suspeitos: [
      { nome: 'O Açougueiro', desc: 'Trabalhava perto das cenas dos crimes.', defesa: 'Eu estava trabalhando. Meu patrão confirma.', avatar: '🔪' },
      { nome: 'O Médico', desc: 'Conhecia anatomia humana.', defesa: 'Sou um cirurgião respeitado. Isso é absurdo.', avatar: '🩺' },
      { nome: 'O Advogado', desc: 'Escrevia cartas para a imprensa.', defesa: 'Eu só queria ajudar a investigação.', avatar: '⚖️' },
      { nome: 'O Pintor', desc: 'Morava no bairro e era recluso.', defesa: 'Só pinto. Nunca machuquei ninguém.', avatar: '🎨' }
    ],
    culpado: 'O Médico',
    solucao: 'O Médico era um cirurgião com treinamento avançado. Ele usava seu conhecimento anatômico para cometer os crimes de forma precisa. A carta à imprensa continha termos médicos que só um profissional usaria. O lenço de seda tinha DNA — mas em 1888, isso não existia. Você precisou usar a lógica: quem tinha acesso a bisturis e conhecimento anatômico?',
    dicas: [
      'O nível de precisão dos ferimentos indica conhecimento médico.',
      'A carta à imprensa tem termos técnicos.',
      'Quem, no bairro, teria acesso a bisturis?'
    ],
    notaHistorica: 'Este caso é baseado em eventos reais, mas os nomes dos suspeitos são fictícios. A investigação original nunca foi concluída.'
  },
  {
    id: 9002,
    capitulo: 99,
    titulo: 'As Cartas Cifradas',
    subtitulo: 'Califórnia, 1960s',
    icone: '📨',
    historico: true,
    resumo: 'Um assassino em série envia cartas cifradas à imprensa. A polícia não consegue decifrá-las. Este caso é sobre criptografia e investigação.',
    avisoEtico: 'Este caso é uma reconstrução histórica com fins educativos. As vítimas eram pessoas reais e merecem respeito. Não há glorificação do crime.',
    contexto: 'Entre 1968 e 1969, um assassino não identificado enviou uma série de cartas cifradas aos jornais da Califórnia, ameaçando atacar novamente se não fossem publicadas. A polícia e a imprensa tentaram decifrar as mensagens, mas muitas nunca foram resolvidas. O caso inspirou filmes e livros, mas as vítimas reais merecem ser lembradas com respeito.',
    premissa: 'Você é um criptógrafo amador que decidiu ajudar a polícia. Três cartas cifradas foram enviadas. Duas já foram decifradas. A terceira contém a localização do próximo ataque. Você tem 48 horas para decifrá-la.',
    evidencias: [
      'Uma carta cifrada com 340 caracteres',
      'Um código de substituição parcialmente decifrado',
      'Um mapa da Califórnia com pontos marcados',
      'Um símbolo recorrente nas cartas'
    ],
    suspeitos: [
      { nome: 'O Professor de Matemática', desc: 'Especialista em criptografia.', defesa: 'Eu ajudei a decifrar. Não sou o autor.', avatar: '🧮' },
      { nome: 'O Jornalista', desc: 'Publicou as cartas.', defesa: 'Só publiquei. Não escrevi nada.', avatar: '📰' },
      { nome: 'O Taxista', desc: 'Conhecia a região.', defesa: 'Só dirijo. Não mato.', avatar: '🚕' },
      { nome: 'O Estudante', desc: 'Obcecado por códigos.', defesa: 'Estudo códigos. Mas não sou assassino.', avatar: '🎓' }
    ],
    culpado: 'O Taxista',
    solucao: 'O Taxista era um ex-presidiário que trabalhava em São Francisco. Ele usava o conhecimento da cidade para escolher vítimas e rotas de fuga. As cartas cifradas eram uma forma de provocar a polícia. O símbolo recorrente era uma marca pessoal que ele usava desde a prisão.',
    dicas: [
      'O símbolo recorrente é uma assinatura.',
      'O culpado conhecia bem as rotas da cidade.',
      'Quem tinha acesso a mapas e horários de trabalho?'
    ],
    notaHistorica: 'Este caso é inspirado em eventos reais, mas os nomes e detalhes foram adaptados para respeitar as vítimas e suas famílias.'
  },
  {
    id: 9003,
    capitulo: 99,
    titulo: 'O Enigma do Quarto 13',
    subtitulo: 'Chicago, 1924',
    icone: '🏨',
    historico: true,
    resumo: 'Dois assassinos brilhantes tentam cometer o crime perfeito. A investigação é sobre lógica e dedução.',
    avisoEtico: 'Este caso é uma reconstrução histórica com fins educativos. As vítimas eram pessoas reais e merecem respeito. Não há glorificação do crime.',
    contexto: 'Em 1924, dois jovens de famílias ricas de Chicago planejaram o que acreditavam ser o crime perfeito. Eles estudaram crimes famosos e tentaram aplicar o que aprenderam. A investigação foi um dos primeiros casos a usar análise de evidências forenses de forma sistemática.',
    premissa: 'Você é um detetive da polícia de Chicago. Um corpo foi encontrado em um quarto de hotel trancado por dentro. Não há sinais de arrombamento. A vítima era um estudante universitário. Todos os hóspedes do hotel são suspeitos.',
    evidencias: [
      'Uma corda de seda com nós específicos',
      'Um par de óculos com grau alto',
      'Uma carta escrita com tinta azul',
      'Uma marca de sapato no tapete',
      'Um bilhete de trem para Nova York'
    ],
    suspeitos: [
      { nome: 'O Estudante de Medicina', desc: 'Conhecia anatomia.', defesa: 'Estava na biblioteca. Tenho testemunhas.', avatar: '🩺' },
      { nome: 'O Colega de Quarto', desc: 'Último a ver a vítima.', defesa: 'Dormi a noite toda. Não ouvi nada.', avatar: '📚' },
      { nome: 'O Professor', desc: 'Tinha acesso aos quartos.', defesa: 'Sou professor. Isso é uma acusação absurda.', avatar: '🎓' },
      { nome: 'O Zelador', desc: 'Fazia a manutenção.', defesa: 'Só limpo. Não me envolvo com hóspedes.', avatar: '🧹' }
    ],
    culpado: 'O Colega de Quarto',
    solucao: 'O Colega de Quarto era o autor intelectual. Ele passou meses estudando crimes famosos e planejando o "crime perfeito". O bilhete de trem era um álibi falso que ele mesmo plantou. A corda de seda tinha nós que ele aprendeu em um manual de escotismo.',
    dicas: [
      'O bilhete de trem é um álibi falso.',
      'A corda foi comprada na mesma loja que a tinta.',
      'Quem tinha acesso ao quarto da vítima?'
    ],
    notaHistorica: 'Este caso é inspirado em eventos reais. Os nomes foram alterados e a narrativa foi adaptada para fins educativos.'
  }
];

// ===== ESTADO =====
let historicoEstado = {
  casosJogados: [],
  casosResolvidos: []
};

function carregarHistoricos() {
  try {
    const salvo = localStorage.getItem('arquivoMorto_historicos');
    if (salvo) {
      historicoEstado = JSON.parse(salvo);
    }
  } catch(e) {}
}

function salvarHistoricos() {
  try {
    localStorage.setItem('arquivoMorto_historicos', JSON.stringify(historicoEstado));
  } catch(e) {}
}

// ===== MARCAR CASO HISTÓRICO COMO JOGADO =====
function marcarHistoricoJogado(casoId) {
  if (historicoEstado.casosJogados.indexOf(casoId) === -1) {
    historicoEstado.casosJogados.push(casoId);
    salvarHistoricos();
  }
}

function marcarHistoricoResolvido(casoId) {
  if (historicoEstado.casosResolvidos.indexOf(casoId) === -1) {
    historicoEstado.casosResolvidos.push(casoId);
    salvarHistoricos();
  }
}

// ===== ADICIONAR CASOS HISTÓRICOS AO JOGO =====
function iniciarHistoricos() {
  carregarHistoricos();
  
  // Adiciona os casos históricos ao array de casos (se existir)
  if (window.CASOS) {
    CASOS_HISTORICOS.forEach(function(caso) {
      const existe = window.CASOS.find(function(c) { return c.id === caso.id; });
      if (!existe) {
        window.CASOS.push(caso);
      }
    });
  }
  
  console.log('✓ Casos históricos carregados');
  console.log('  Casos: ' + CASOS_HISTORICOS.length);
}

// ===== EXPORTAR =====
window.CASOS_HISTORICOS = CASOS_HISTORICOS;
window.iniciarHistoricos = iniciarHistoricos;
window.marcarHistoricoJogado = marcarHistoricoJogado;
window.marcarHistoricoResolvido = marcarHistoricoResolvido;

console.log('✓ Casos históricos carregados');