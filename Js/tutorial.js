// ============================================================
// ARQUIVO MORTO v6.0 — TUTORIAL INTERATIVO
// ============================================================
// Missões guiadas para novos jogadores.

const TUTORIAL_PASSOS = [
  {
    id: 1,
    titulo: 'Bem-vindo, Detetive',
    icone: '🕵️',
    texto: 'Você acaba de ser contratado pelo Departamento de Casos Não Resolvidos. Sua missão: resolver casos que a polícia não conseguiu.',
    destaque: '.caso-header',
    posicao: 'bottom',
    acao: 'proximo'
  },
  {
    id: 2,
    titulo: 'Analise as Evidências',
    icone: '🔍',
    texto: 'Clique em cada evidência para analisá-la. Você precisa coletar pelo menos 3 provas antes de acusar alguém.',
    destaque: '.evidencia-item',
    posicao: 'right',
    acao: 'clicar_evidencia'
  },
  {
    id: 3,
    titulo: 'Interrogue os Suspeitos',
    icone: '🗣️',
    texto: 'Clique em um suspeito para interrogá-lo. Faça perguntas e observe as respostas. Suspeitos podem mentir — procure contradições!',
    destaque: '.suspeito-card',
    posicao: 'left',
    acao: 'clicar_suspeito'
  },
  {
    id: 4,
    titulo: 'Use Cartas de Habilidade',
    icone: '🎴',
    texto: 'Você tem cartas especiais que podem te ajudar. Use Ler Mente para detectar mentiras, ou Intuição para ganhar dicas grátis.',
    destaque: '.barra-cartas',
    posicao: 'top',
    acao: 'proximo'
  },
  {
    id: 5,
    titulo: 'Consulte o Diário',
    icone: '📓',
    texto: 'Suas anotações ficam no Diário do Detetive. Use-o para revisar o que descobriu.',
    destaque: '.diario-container',
    posicao: 'top',
    acao: 'proximo'
  },
  {
    id: 6,
    titulo: 'Faça sua Acusação',
    icone: '⚖️',
    texto: 'Quando tiver provas suficientes, escolha o suspeito que você acredita ser o culpado. Cuidado — errar custa uma vida!',
    destaque: '.botoes-suspeitos',
    posicao: 'top',
    acao: 'proximo'
  },
  {
    id: 7,
    titulo: 'Enfrente o Julgamento',
    icone: '⚖️',
    texto: 'Após acertar o culpado, você irá a julgamento. Escolha 3 provas para convencer o júri.',
    destaque: null,
    posicao: 'center',
    acao: 'finalizar'
  }
];

// ===== ESTADO =====
let tutorialEstado = {
  ativo: false,
  passoAtual: 0,
  completado: false
};

function carregarTutorial() {
  try {
    const salvo = localStorage.getItem('arquivoMorto_tutorial');
    if (salvo) {
      tutorialEstado.completado = JSON.parse(salvo).completado || false;
    }
  } catch(e) {}
}

function salvarTutorial() {
  try {
    localStorage.setItem('arquivoMorto_tutorial', JSON.stringify(tutorialEstado));
  } catch(e) {}
}

// ===== INICIAR TUTORIAL =====
function iniciarTutorial() {
  if (tutorialEstado.completado) {
    const refazer = confirm('Você já completou o tutorial. Deseja refazê-lo?');
    if (!refazer) return;
  }
  
  tutorialEstado.ativo = true;
  tutorialEstado.passoAtual = 0;
  
  mostrarPassoTutorial();
}

// ===== MOSTRAR PASSO =====
function mostrarPassoTutorial() {
  if (!tutorialEstado.ativo) return;
  
  const passo = TUTORIAL_PASSOS[tutorialEstado.passoAtual];
  if (!passo) {
    finalizarTutorial();
    return;
  }
  
  // Remove overlay anterior
  const antigo = document.querySelector('.tutorial-overlay');
  if (antigo) antigo.remove();
  
  // Cria overlay
  const overlay = document.createElement('div');
  overlay.className = 'tutorial-overlay';
  
  // Calcula posição do destaque
  let destaqueHTML = '';
  if (passo.destaque) {
    const el = document.querySelector(passo.destaque);
    if (el) {
      const rect = el.getBoundingClientRect();
      destaqueHTML = 
        '<div class="tutorial-destaque" style="' +
          'top:' + (rect.top - 5) + 'px;' +
          'left:' + (rect.left - 5) + 'px;' +
          'width:' + (rect.width + 10) + 'px;' +
          'height:' + (rect.height + 10) + 'px;' +
        '"></div>';
    }
  }
  
  // Calcula posição da caixa
  let boxStyle = '';
  if (passo.posicao === 'center') {
    boxStyle = 'top:50%;left:50%;transform:translate(-50%,-50%)';
  } else if (passo.destaque) {
    const el = document.querySelector(passo.destaque);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (passo.posicao === 'bottom') {
        boxStyle = 'top:' + (rect.bottom + 20) + 'px;left:50%;transform:translateX(-50%)';
      } else if (passo.posicao === 'top') {
        boxStyle = 'bottom:' + (window.innerHeight - rect.top + 20) + 'px;left:50%;transform:translateX(-50%)';
      } else if (passo.posicao === 'right') {
        boxStyle = 'top:' + rect.top + 'px;left:' + (rect.right + 20) + 'px';
      } else if (passo.posicao === 'left') {
        boxStyle = 'top:' + rect.top + 'px;right:' + (window.innerWidth - rect.left + 20) + 'px';
      }
    }
  }
  
  overlay.innerHTML = 
    destaqueHTML +
    '<div class="tutorial-box" style="' + boxStyle + '">' +
      '<div class="tutorial-header">' +
        '<span class="tutorial-icone">' + passo.icone + '</span>' +
        '<div class="tutorial-titulo">' + passo.titulo + '</div>' +
        '<span class="tutorial-passo">' + (tutorialEstado.passoAtual + 1) + '/' + TUTORIAL_PASSOS.length + '</span>' +
      '</div>' +
      '<div class="tutorial-texto">' + passo.texto + '</div>' +
      '<div class="tutorial-acoes">' +
        '<button class="btn-tutorial-pular" onclick="pularTutorial()">PULAR TUTORIAL</button>' +
        '<button class="btn-tutorial-proximo" onclick="proximoTutorialPasso()">' +
          (tutorialEstado.passoAtual === TUTORIAL_PASSOS.length - 1 ? 'FINALIZAR ✓' : 'PRÓXIMO →') +
        '</button>' +
      '</div>' +
    '</div>';
  
  document.body.appendChild(overlay);
  
  if (typeof tocarSom === 'function') tocarSom('clique');
}

// ===== PRÓXIMO PASSO =====
function proximoTutorialPasso() {
  tutorialEstado.passoAtual++;
  
  if (tutorialEstado.passoAtual >= TUTORIAL_PASSOS.length) {
    finalizarTutorial();
  } else {
    mostrarPassoTutorial();
  }
}

// ===== PULAR TUTORIAL =====
function pularTutorial() {
  if (confirm('Tem certeza que deseja pular o tutorial? Você pode refazê-lo depois nas configurações.')) {
    finalizarTutorial();
  }
}

// ===== FINALIZAR =====
function finalizarTutorial() {
  tutorialEstado.ativo = false;
  tutorialEstado.completado = true;
  salvarTutorial();
  
  const overlay = document.querySelector('.tutorial-overlay');
  if (overlay) overlay.remove();
  
  if (typeof notificar === 'function') {
    notificar('🎓 Tutorial Completo!', 'Você está pronto para investigar. Boa sorte, detetive!');
  }
  
  if (typeof tocarSom === 'function') tocarSom('vitoria');
}

// ===== VERIFICAR SE DEVE MOSTRAR TUTORIAL =====
function verificarTutorial() {
  carregarTutorial();
  
  if (!tutorialEstado.completado) {
    setTimeout(function() {
      const refazer = confirm('🎓 Bem-vindo ao ARQUIVO MORTO!\n\nDeseja fazer o tutorial interativo? (Recomendado para novos jogadores)');
      if (refazer) {
        iniciarTutorial();
      } else {
        tutorialEstado.completado = true;
        salvarTutorial();
      }
    }, 2000);
  }
}

// ===== EXPORTAR =====
window.iniciarTutorial = iniciarTutorial;
window.proximoTutorialPasso = proximoTutorialPasso;
window.pularTutorial = pularTutorial;
window.finalizarTutorial = finalizarTutorial;
window.verificarTutorial = verificarTutorial;
window.tutorialEstado = tutorialEstado;

console.log('✓ Tutorial interativo carregado');