// ============================================================
// ARQUIVO MORTO v3.0 — BANCO DE CASOS
// 54 casos + chefões de campanha
// ============================================================

const CASOS = [
  // ===== CAPÍTULO 1 — OS PRIMEIROS CASOS (1-10) =====
  {
    id: 1,
    capitulo: 1,
    titulo: "O Enigma da Galeria Vazia",
    resumo: "Uma pintura valiosa desaparece de uma galeria trancada durante um coquetel exclusivo.",
    premissa: "O prestigiado colecionador Arthur Vance organizou um coquetel exclusivo em sua galeria particular para celebrar a exibição da valiosa obra 'O Cisne de Prata'. Apenas quatro convidados selecionados estavam presentes na sala. Durante um breve momento de distração, a pintura desapareceu de sua moldura sem que o alarme disparasse.",
    evidencias: [
      "O Copo de Suco Derrubado: um copo de suco de laranja derramado no piso de madeira.",
      "O Relógio de Bolso: parou exatamente às 21h15, com leve amassado na carcaça.",
      "Aroma de Lavanda: óleo essencial detectado próximo ao duto de ar condicionado."
    ],
    suspeitos: [
      { nome: "O Crítico de Arte", desc: "Questionava a autenticidade da obra.", defesa: "Eu só critiquei a obra publicamente — isso não me faz um ladrão!", avatar: "🎩" },
      { nome: "A Herdeira da Galeria", desc: "Enfrentava dívidas e conhecia o sistema.", defesa: "Minha família construiu esta galeria! Por que eu roubaria meu próprio legado?", avatar: "👩‍💼" },
      { nome: "O Restaurador de Quadros", desc: "Tinha acesso prévio e conhecimento técnico.", defesa: "Sim, eu sei remover uma tela. Mas isso não significa que fiz isso.", avatar: "🎨" },
      { nome: "O Mordomo", desc: "Encarregado do serviço de bebidas.", defesa: "Eu apenas servi as bebidas, senhor. Quando o copo caiu, todos olharam.", avatar: "🤵" }
    ],
    culpado: "A Herdeira da Galeria",
    solucao: "A Herdeira utilizou o duto de ventilação como transporte. O suco derramado serviu como distração. Ela havia afrouxado a tela previamente e a enrolou, presa a uma linha de nylon com óleo de lavanda.",
    dicas: ["O aroma de lavanda não é coincidência.", "O suco foi derramado no momento exato.", "Quem conhecia o sistema de segurança?"]
  },
  {
    id: 2,
    capitulo: 1,
    titulo: "A Última Nota do Maestro",
    resumo: "A partitura original de uma sinfonia inédita desaparece do camarim do maestro.",
    premissa: "No Teatro Municipal, durante o ensaio geral, a partitura original de uma sinfonia do Maestro Bernardo desapareceu de seu camarim. O maestro ausentou-se por apenas cinco minutos.",
    evidencias: [
      "Luva de Veludo Preto: encontrada debaixo do piano de cauda.",
      "Fita Amarela na Lixeira: do tipo usado para marcação de palco.",
      "Mecanismo da Tranca: porta trancada por fora, chave com o maestro."
    ],
    suspeitos: [
      { nome: "O Primeiro Violinista", desc: "Invejoso, buscava impedir a estreia.", defesa: "Tenho inveja, sim. Mas sou músico, não criminoso.", avatar: "🎻" },
      { nome: "A Produtora do Espetáculo", desc: "Sob pressão financeira.", defesa: "Preciso do dinheiro, não nego. Mas sabotar a estreia seria sabotar meus lucros.", avatar: "💼" },
      { nome: "O Afinador de Pianos", desc: "Acesso livre a ferramentas e camarins.", defesa: "Eu afino pianos, senhor. Uso ferramentas para consertar, não para roubar.", avatar: "🔧" }
    ],
    culpado: "O Afinador de Pianos",
    solucao: "O Afinador entrou no camarim sob pretexto de conferir o piano. Usou a luva e ocultou as folhas no fundo falso do estojo. Trancou a porta por fora com um arame dobrado e fita adesiva.",
    dicas: ["Quem usaria luvas naturalmente?", "A fita amarela é usada para marcar cabos.", "A porta foi trancada por fora SEM a chave."]
  },
  {
    id: 3,
    capitulo: 1,
    titulo: "O Mistério da Biblioteca Trancada",
    resumo: "O testamento original de um barão desaparece do cofre horas antes da reunião oficial.",
    premissa: "O Barão de Kensington constatou o desaparecimento do testamento original poucas horas antes da reunião com o tabelião. A chave de emergência sumiu do bolso do casaco do Barão.",
    evidencias: [
      "Mancha de Tinta Azul: ainda úmida, na borda do tapete persa.",
      "Livro de Botânica Fora do Lugar: na prateleira superior, fora da ordem alfabética.",
      "Comportamento do Cão: tranquilo durante toda a madrugada."
    ],
    suspeitos: [
      { nome: "O Sobrinho do Barão", desc: "Principal prejudicado pelo novo testamento.", defesa: "Eu amo meu tio! Sim, o novo testamento me prejudica, mas jamais roubaria dele.", avatar: "👨‍🦱" },
      { nome: "A Governanta", desc: "Acesso a todos os cômodos da mansão.", defesa: "Sirvo esta família há 30 anos, senhor. O cão latiria se eu entrasse à noite.", avatar: "👩‍🍳" },
      { nome: "O Jovem Bibliotecário", desc: "Encarregado do acervo pessoal.", defesa: "Organizo os livros, não os cofres. Nunca soube da combinação.", avatar: "📚" }
    ],
    culpado: "O Sobrinho do Barão",
    solucao: "O Sobrinho retirou a chave do casaco do Barão durante o jantar. Subiu na escada móvel e derrubou a caneta, gerando a mancha. O cão não latiu por reconhecer seu dono.",
    dicas: ["O cão não latiu. Quem era conhecido da casa?", "A tinta ainda estava úmida — foi recente.", "O livro foi colocado fora de ordem."]
  },
  {
    id: 4,
    capitulo: 1,
    titulo: "O Roubo no Expresso da Meia-Noite",
    resumo: "Um diamante raro desaparece de um vagão leito trancado por dentro.",
    premissa: "Durante uma travessia noturna, um diamante raro da Condessa de Avelar desapareceu. O vagão estava trancado por dentro e ninguém circulou entre os vagões.",
    evidencias: [
      "Xícara de Chá Morna: com resíduos de sedativo fraco.",
      "Bilhete com Números: anotação manual '03-12-09'.",
      "Poeira de Carvão: vestígios na trava externa da janela."
    ],
    suspeitos: [
      { nome: "O Condutor do Trem", desc: "Conhecia a rota e as paradas técnicas.", defesa: "Sou responsável por todos os passageiros. Fazer parte de um roubo seria trair minha profissão.", avatar: "🚂" },
      { nome: "A Camareira do Vagão", desc: "Serviu o chá e teve acesso à cabine.", defesa: "Servi o chá como faço todas as noites. Se a condessa dormiu, foi porque estava cansada.", avatar: "👩‍✈️" },
      { nome: "O Negociante de Antiguidades", desc: "Passageiro ao lado, interessado nas joias.", defesa: "Admiro joias raras, sim. Mas estava na minha cabine a noite toda.", avatar: "💎" }
    ],
    culpado: "A Camareira do Vagão",
    solucao: "A Camareira agiu com o Condutor. Ela adicionou sedativo ao chá. Na parada às 03:12 (bilhete 03-12-09), o condutor pegou a mala pela janela externa, deixando marcas de fuligem.",
    dicas: ["A xícara tinha sedativo. Quem serviu o chá?", "O bilhete '03-12-09' é um horário.", "A poeira de carvão está na parte EXTERNA."]
  },
  {
    id: 5,
    capitulo: 1,
    titulo: "O Sumiço no Museu Egípcio",
    resumo: "Uma relíquia milenar desaparece durante uma exposição noturna.",
    premissa: "Durante uma exposição noturna no Museu Egípcio, o amuleto de Tutankhamon desapareceu da vitrine blindada. Os alarmes não dispararam.",
    evidencias: ["Vidro da vitrine intacto", "Pegadas de sapatos pequenos", "Cheiro de incenso queimado"],
    suspeitos: [
      { nome: "A Curadora", desc: "Última a sair do salão.", defesa: "Tranquei tudo pessoalmente. O sistema é infalível.", avatar: "👩‍🔬" },
      { nome: "O Segurança Noturno", desc: "Fazia a ronda no momento.", defesa: "Vi tudo pelas câmeras, juro. Ninguém entrou.", avatar: "💂" },
      { nome: "O Arqueólogo Visitante", desc: "Especialista em Egito.", defesa: "Só vim estudar as peças. Não toquei em nada.", avatar: "🏺" }
    ],
    culpado: "A Curadora",
    solucao: "A Curadora tinha a chave da vitrine e trocou o amuleto por uma réplica perfeita semanas antes. O incenso foi usado para encobrir odores de resina da réplica.",
    dicas: ["Se o vidro está intacto, quem tinha a chave?", "Por que haveria cheiro de incenso?", "A troca pode ter acontecido ANTES."]
  },
  {
    id: 6,
    capitulo: 1,
    titulo: "A Carta Falsa do Advogado",
    resumo: "Um testamento é adulterado e o culpado deixa uma pista sutil.",
    premissa: "O advogado Sr. Prado percebeu que o testamento que redigiu foi alterado. A nova versão beneficiava apenas um herdeiro.",
    evidencias: ["Assinatura levemente tremida", "Papel de gramatura diferente", "Tinta de caneta azul vs preta original"],
    suspeitos: [
      { nome: "O Filho Mais Velho", desc: "Beneficiado pela mudança.", defesa: "Não sabia de nada! Meu pai sempre me favoreceu.", avatar: "👨" },
      { nome: "A Secretária", desc: "Digitou o documento.", defesa: "Digitei o que me foi ditado. Não alterei nada.", avatar: "👩‍💻" },
      { nome: "O Sócio do Escritório", desc: "Tinha acesso ao cofre.", defesa: "Sou advogado há 20 anos. Jamais faria isso.", avatar: "👔" }
    ],
    culpado: "A Secretária",
    solucao: "A Secretária digitou duas versões e trocou os papéis. A tinta diferente revelou que uma página foi refeita por ela.",
    dicas: ["Por que duas canetas diferentes?", "Quem tinha acesso ao arquivo digital?", "A assinatura tremida indica nervosismo."]
  },
  {
    id: 7,
    capitulo: 1,
    titulo: "O Veneno no Chá das Cinco",
    resumo: "Uma senhora morre durante o chá da tarde. Todos beberam a mesma chávena — exceto um.",
    premissa: "Durante o chá das cinco na casa dos Addington, a matriarca caiu morta após beber seu chá. Todos os presentes beberam do mesmo bule.",
    evidencias: ["Açúcar cristalizado na xícara dela", "Um sachê de adoçante vazio no lixo", "Ela era diabética"],
    suspeitos: [
      { nome: "A Sobrinha", desc: "Herdeira universal.", defesa: "Amava minha tia como mãe!", avatar: "👧" },
      { nome: "O Jardineiro", desc: "Cultivava plantas venenosas.", defesa: "Só planto rosas, senhor.", avatar: "🌹" },
      { nome: "A Cozinheira", desc: "Preparou o chá.", defesa: "Uso a mesma receita há 15 anos.", avatar: "👩‍🍳" }
    ],
    culpado: "A Sobrinha",
    solucao: "A Sobrinha trocou o adoçante da tia por veneno em pó. Como todos bebiam chá puro ou com açúcar, só ela foi envenenada.",
    dicas: ["Ela era diabética — por que teria açúcar?", "Quem conhecia a rotina do chá?", "O veneno foi colocado no que ela ADICIONAVA."]
  },
  {
    id: 8,
    capitulo: 1,
    titulo: "O Quadro que Muda de Lugar",
    resumo: "Um quadro famoso aparece em posição diferente toda manhã.",
    premissa: "Na galeria do Sr. Belmonte, o quadro 'A Dama de Azul' aparece virado para a parede toda manhã. Câmeras não captam ninguém.",
    evidencias: ["Poeira movida apenas nas bordas", "Cheiro de verniz fresco", "Uma chave antiga esquecida atrás do quadro"],
    suspeitos: [
      { nome: "O Restaurador", desc: "Trabalha à noite.", defesa: "Só restauro obras autorizadas.", avatar: "🎨" },
      { nome: "A Bilheteira", desc: "Tem cópia das chaves.", defesa: "Nunca entrei na galeria após o horário.", avatar: "🎫" },
      { nome: "O Neto do Sr. Belmonte", desc: "Herdeiro da galeria.", defesa: "Por que mexeria no quadro do meu avô?", avatar: "👦" }
    ],
    culpado: "O Restaurador",
    solucao: "O Restaurador estava fazendo uma cópia perfeita e escondia o original virado para a parede à noite. A chave antiga era dele.",
    dicas: ["Por que só a poeira das bordas foi movida?", "O verniz fresco indica manuseio recente.", "Quem precisa esconder um quadro?"]
  },
  {
    id: 9,
    capitulo: 1,
    titulo: "O Assassinato no Elevador",
    resumo: "Um homem é encontrado morto dentro de um elevador parado entre andares.",
    premissa: "O empresário Sr. Rocha foi encontrado morto dentro do elevador do prédio comercial. O elevador estava parado entre o 7º e o 8º andar.",
    evidencias: ["Botão de emergência acionado", "Um lenço com perfume feminino", "Marcas de arranhão na porta"],
    suspeitos: [
      { nome: "A Sócia", desc: "Estava no 8º andar.", defesa: "Estava em reunião. Ouvi o alarme e chamei ajuda.", avatar: "👩‍💼" },
      { nome: "O Porteiro", desc: "Controla os elevadores.", defesa: "Não posso parar elevador entre andares.", avatar: "🛎️" },
      { nome: "A Secretária", desc: "Usava o mesmo perfume.", defesa: "Muitas pessoas usam esse perfume!", avatar: "👩‍💻" }
    ],
    culpado: "A Sócia",
    solucao: "A Sócia entrou no elevador com ele, o matou e saiu antes de parar entre andares. O lenço era dela, usado para não deixar digitais.",
    dicas: ["Como alguém sairia de um elevador parado?", "O perfume é uma pista forte demais.", "Quem estava no andar certo?"]
  },
  {
    id: 10,
    capitulo: 1,
    titulo: "A Herança do Relojoeiro",
    resumo: "Um relógio antigo esconde um segredo. O dono morre antes de revelá-lo.",
    premissa: "O relojoeiro Sr. Tempus morreu deixando um relógio de bolso com instruções cifradas. Três sobrinhos disputam a peça.",
    evidencias: ["Engrenagem faltando", "Inscrição: 'Tempo revela tudo'", "Um bilhete com números 4-8-15-16-23-42"],
    suspeitos: [
      { nome: "O Sobrinho Mais Velho", desc: "Herdeiro direto.", defesa: "Só quero o relógio como lembrança.", avatar: "👨" },
      { nome: "A Sobrinha Pianista", desc: "Sabia tocar a música favorita dele.", defesa: "Não entendo de relógios.", avatar: "🎹" },
      { nome: "O Aprendiz", desc: "Trabalhou com ele 10 anos.", defesa: "Aprendi tudo com ele, mas nunca vi esse relógio.", avatar: "🔧" }
    ],
    culpado: "O Aprendiz",
    solucao: "O Aprendiz retirou a engrenagem que escondia a combinação do cofre. Os números do bilhete eram a chave para abrir o cofre.",
    dicas: ["Por que falta uma engrenagem?", "Os números parecem uma sequência.", "Quem sabia abrir o relógio?"]
  },

  // ===== CAPÍTULO 2 — A REDE CRIMINOSA (11-20) =====
  {
    id: 11,
    capitulo: 2,
    titulo: "O Fantasma do Farol",
    resumo: "Luzes aparecem no farol abandonado toda noite.",
    premissa: "O farol da ilha está abandonado há 10 anos, mas luzes aparecem toda madrugada. Pescadores juram ver um vulto.",
    evidencias: ["Pegadas recentes na areia", "Restos de comida enlatada", "Uma corda amarrada no topo"],
    suspeitos: [
      { nome: "O Pescador Velho", desc: "Conhece todos os segredos da ilha.", defesa: "Vi as luzes, mas nunca subi lá.", avatar: "🎣" },
      { nome: "A Filha do Faroleiro", desc: "Cresceu no farol.", defesa: "Não tenho motivos para voltar.", avatar: "👩" },
      { nome: "O Contrabandista", desc: "Suspeito de usar a costa.", defesa: "Nunca pisei nessa ilha.", avatar: "🚬" }
    ],
    culpado: "A Filha do Faroleiro",
    solucao: "A Filha voltou para recuperar um diário escondido pelo pai. Ela subia à noite para não ser vista, usando a corda para escapar rapidamente.",
    dicas: ["As pegadas são recentes e pequenas.", "Alguém conhece a estrutura do farol.", "Por que uma corda no topo?"]
  },
  {
    id: 12,
    capitulo: 2,
    titulo: "O Crime do Chef",
    resumo: "Um crítico gastronômico morre após jantar em restaurante famoso.",
    premissa: "O crítico Sr. Gourmet morreu após comer no restaurante 'Le Coq'. Todos os pratos foram provados por outros clientes sem problema.",
    evidencias: ["Amêndoas amargas no prato dele", "Um copo de vinho trocado", "O chef suava frio na cozinha"],
    suspeitos: [
      { nome: "O Chef", desc: "Humilhado pela última crítica.", defesa: "Jamais colocaria minha carreira em risco!", avatar: "👨‍🍳" },
      { nome: "O Sommelier", desc: "Serviu o vinho.", defesa: "O vinho era o mesmo para todos.", avatar: "🍷" },
      { nome: "O Garçom", desc: "Levou o prato.", defesa: "Só entreguei o prato pronto.", avatar: "🤵" }
    ],
    culpado: "O Chef",
    solucao: "O Chef usou amêndoas amargas (ácido cianídrico) no prato específico do crítico. Os outros clientes receberam pratos idênticos mas sem as amêndoas.",
    dicas: ["Por que só ele passou mal?", "Amêndoas amargas têm perigo específico.", "Quem tinha motivo pessoal?"]
  },
  {
    id: 13,
    capitulo: 2,
    titulo: "O Sequestro do Pianista",
    resumo: "Um pianista famoso desaparece após um concerto.",
    premissa: "Após o concerto, o pianista Sr. Melodia não foi encontrado. Um bilhete de resgate exigia 1 milhão em 24h.",
    evidencias: ["Uma partitura com anotações estranhas", "Uma luva de seda no camarim", "Cheiro de éter no ar"],
    suspeitos: [
      { nome: "A Empresária", desc: "Cuida da carreira dele.", defesa: "Ele é meu ganha-pão! Por que o sequestraria?", avatar: "👩‍💼" },
      { nome: "O Motorista", desc: "Levava-o aos shows.", defesa: "Deixei-o no camarim e fui embora.", avatar: "🚗" },
      { nome: "A Fã Obsessiva", desc: "Perseguia o pianista.", defesa: "Só queria um autógrafo!", avatar: "👧" }
    ],
    culpado: "A Empresária",
    solucao: "A Empresária armou o falso sequestro para esconder dívidas. A partitura tinha anotações combinando o local onde ele estava escondido (vivo).",
    dicas: ["A partitura pode ser uma mensagem.", "Por que ninguém viu o sequestro?", "Quem lucraria com o 'resgate'?"]
  },
  {
    id: 14,
    capitulo: 2,
    titulo: "A Morte no Cassino",
    resumo: "Um jogador sortudo cai morto após ganhar uma fortuna na roleta.",
    premissa: "O Sr. Sorte Grande ganhou 5 milhões na roleta e caiu morto minutos depois. Todos viram ele beber champanhe.",
    evidencias: ["A taça tinha resíduo na borda", "Um botão dourado no chão", "O crupiê estava pálido"],
    suspeitos: [
      { nome: "A Dançarina", desc: "Ficou com ele a noite toda.", defesa: "Só comemorei com ele.", avatar: "💃" },
      { nome: "O Crupiê", desc: "Girou a roleta.", defesa: "Só faço meu trabalho.", avatar: "🎰" },
      { nome: "O Gerente", desc: "Perdeu muito dinheiro.", defesa: "O cassino cobre esses prejuízos.", avatar: "👔" }
    ],
    culpado: "O Crupiê",
    solucao: "O Crupiê estava endividado com agiotas e envenenou a taça quando serviu o champanhe. O botão dourado era do uniforme dele.",
    dicas: ["O botão dourado é do uniforme de quem?", "Quem serviu a taça diretamente?", "Por que o crupiê estava pálido?"]
  },
  {
    id: 15,
    capitulo: 2,
    titulo: "O Mistério do Lago Congelado",
    resumo: "Um corpo aparece sob o gelo de um lago.",
    premissa: "O corpo do Sr. Frost foi encontrado sob o gelo do lago da vila. Ele desapareceu há 3 dias.",
    evidencias: ["Um buraco perfeito no gelo", "Uma luva de pescador", "Cordas cortadas na margem"],
    suspeitos: [
      { nome: "O Pescador", desc: "Pesca no lago toda manhã.", defesa: "Só pesco, não mato.", avatar: "🎣" },
      { nome: "A Viúva", desc: "Herdeira da fortuna.", defesa: "Estava em casa com a empregada.", avatar: "👩‍🦰" },
      { nome: "O Vizinho", desc: "Brigou com ele na semana.", defesa: "Briga antiga, mas já passou.", avatar: "👨" }
    ],
    culpado: "O Pescador",
    solucao: "O Pescador atraiu o Sr. Frost para o lago e cortou o gelo fino ao redor dele. A luva era dele, caída na pressa.",
    dicas: ["O buraco é perfeito demais.", "Quem conhece o lago e suas armadilhas?", "A luva é a pista mais óbvia."]
  },
  {
    id: 16,
    capitulo: 2,
    titulo: "O Roubo da Coroa de Cristal",
    resumo: "Uma coroa de cristal desaparece durante um desfile real.",
    premissa: "Durante o desfile, a coroa de cristal da Rainha desapareceu da vitrine ambulante. Ninguém abriu a vitrine.",
    evidencias: ["Fita adesiva no vidro", "Um alfinete dourado no chão", "O motorista do caminhão estava nervoso"],
    suspeitos: [
      { nome: "O Motorista", desc: "Conduzia o caminhão.", defesa: "Só dirigi. Não toquei em nada.", avatar: "🚛" },
      { nome: "A Figurante", desc: "Andava ao lado da vitrine.", defesa: "Só desfilei, senhor.", avatar: "👸" },
      { nome: "O Segurança", desc: "Cuidava da vitrine.", defesa: "Estava atento o tempo todo.", avatar: "💂" }
    ],
    culpado: "O Motorista",
    solucao: "O Motorista parou o caminhão por 3 segundos num ponto combinado, e um cúmplice trocou a coroa por uma réplica pela parte de trás.",
    dicas: ["Como trocar algo sem abrir a vitrine?", "Quem controlava o tempo da parada?", "O alfinete era da réplica."]
  },
  {
    id: 17,
    capitulo: 2,
    titulo: "A Mentira do Astronauta",
    resumo: "Um astronauta some após voltar de uma missão.",
    premissa: "O astronauta Sr. Órbita desapareceu após retornar da ISS. A agência espacial diz que ele está de férias.",
    evidencias: ["Um diário com anotações cifradas", "Uma amostra de solo desconhecido", "Uma mensagem: 'Eles não são o que parecem'"],
    suspeitos: [
      { nome: "A Diretora da NASA", desc: "Negou tudo.", defesa: "Sigilo é protocolo padrão.", avatar: "👩‍💼" },
      { nome: "O Colega Astronauta", desc: "Voltou com ele.", defesa: "Não vi nada estranho.", avatar: "👨‍🚀" },
      { nome: "A Esposa", desc: "Não o viu desde o retorno.", defesa: "Ele nunca me ligaria sem avisar.", avatar: "👩" }
    ],
    culpado: "O Colega Astronauta",
    solucao: "O Colega descobriu algo na ISS e o Sr. Órbita queria denunciar. Ele o escondeu para manter o segredo.",
    dicas: ["A mensagem é um aviso claro.", "Quem voltou com ele sabe mais.", "A amostra desconhecida é a chave."]
  },
  {
    id: 18,
    capitulo: 2,
    titulo: "O Envenenamento do Rei",
    resumo: "Um rei morre após beber vinho. Três taças foram servidas.",
    premissa: "O Rei Balthazar morreu após brinde. Três taças foram servidas: uma para ele, uma para o general, uma para o bobo da corte.",
    evidencias: ["A taça do rei tinha cheiro amendoado", "O bobo da corte não bebeu", "O general estava com a mão enfaixada"],
    suspeitos: [
      { nome: "O General", desc: "Rival político do rei.", defesa: "Jamais trairia meu rei!", avatar: "⚔️" },
      { nome: "O Bobo da Corte", desc: "Nunca bebeu.", defesa: "Sou alérgico a uva!", avatar: "🃏" },
      { nome: "O Copeiro", desc: "Serviu o vinho.", defesa: "Só servi, não provei.", avatar: "🍷" }
    ],
    culpado: "O Copeiro",
    solucao: "O Copeiro passou veneno na borda da taça do rei. Como o bobo não bebeu e o general usou a mão enfaixada, só o rei foi afetado.",
    dicas: ["Por que só o rei passou mal?", "Quem sabia que o bobo não bebia?", "A mão enfaixada é coincidência."]
  },
  {
    id: 19,
    capitulo: 2,
    titulo: "A Casa que Sussurra",
    resumo: "Uma casa abandonada emite sussurros toda noite.",
    premissa: "A casa do falecido Sr. Sombra emite sussurros noturnos. O vizinho que investigou foi encontrado morto.",
    evidencias: ["Fios elétricos escondidos nas paredes", "Um microfone antigo no sótão", "Um gravador com fitas"],
    suspeitos: [
      { nome: "A Sobrinha do Morto", desc: "Herdeira da casa.", defesa: "Só quero vender o imóvel.", avatar: "👧" },
      { nome: "O Eletricista", desc: "Trabalhou na casa.", defesa: "Só fiz reparos simples.", avatar: "⚡" },
      { nome: "O Investigador Paranormal", desc: "Estava obcecado.", defesa: "Só queria documentar.", avatar: "🔮" }
    ],
    culpado: "A Sobrinha do Morto",
    solucao: "A Sobrinha instalou o sistema de som para assustar curiosos e afastar investidores. O vizinho descobriu e foi silenciado.",
    dicas: ["Sussurros precisam de eletricidade.", "Quem lucraria afastando pessoas?", "O gravador tem fitas — de quem?"]
  },
  {
    id: 20,
    capitulo: 2,
    titulo: "O Último Trem para Nowhere",
    resumo: "Um passageiro desaparece entre duas estações.",
    premissa: "O Sr. Wilson embarcou em um trem noturno e desapareceu antes da próxima estação. O vagão estava trancado por dentro.",
    evidencias: ["Janela levemente aberta", "Uma mala trocada", "Um bilhete de outra estação"],
    suspeitos: [
      { nome: "O Condutor", desc: "Faz a rota há anos.", defesa: "Só conferi os bilhetes.", avatar: "🚂" },
      { nome: "O Passageiro ao Lado", desc: "Dormiu durante a viagem.", defesa: "Não vi nada.", avatar: "😴" },
      { nome: "A Atendente", desc: "Serviu água.", defesa: "Só passei com o carrinho.", avatar: "👩‍✈️" }
    ],
    culpado: "O Passageiro ao Lado",
    solucao: "O Passageiro trocou as malas com o Sr. Wilson, forçou-o a saltar em movimento na curva lenta e assumiu a identidade dele na estação seguinte.",
    dicas: ["A janela estava aberta — como?", "Por que as malas foram trocadas?", "O bilhete de outra estação é uma pista."]
  },

  // ===== CAPÍTULO 3 — O MESTRE DOS DISFARCES (21-30) =====
  {
    id: 21,
    capitulo: 3,
    titulo: "A Baleia que Cantou",
    resumo: "Um biólogo marinho morre após gravar um canto de baleia desconhecido.",
    premissa: "O biólogo Sr. Oceano morreu em seu barco após gravar um som desconhecido no mar. O equipamento desapareceu.",
    evidencias: ["Arranhões no casco do barco", "Uma fita quebrada", "Um mapa com coordenadas circuladas"],
    suspeitos: [
      { nome: "A Colega Bióloga", desc: "Rival acadêmica.", defesa: "Discordamos, mas não mataria.", avatar: "👩‍🔬" },
      { nome: "O Pescador Local", desc: "Conhece as águas.", defesa: "Só pesco, não me meto com cientistas.", avatar: "🎣" },
      { nome: "O Patrocinador", desc: "Financiava a pesquisa.", defesa: "Investi muito na pesquisa dele!", avatar: "💰" }
    ],
    culpado: "O Patrocinador",
    solucao: "O canto era de uma espécie secreta em área de mineração ilegal. O Patrocinador estava envolvido e silenciou o biólogo.",
    dicas: ["Por que o equipamento foi levado?", "As coordenadas apontam para onde?", "Quem tinha interesse financeiro?"]
  },
  {
    id: 22,
    capitulo: 3,
    titulo: "O Colecionador de Borboletas",
    resumo: "Um colecionador morre com uma borboleta rara na mão.",
    premissa: "O Sr. Papilio foi encontrado morto em seu quarto trancado, segurando uma borboleta recém-capturada.",
    evidencias: ["Janela fechada com vidro duplo", "Uma rede de captura no chão", "Um frasco de éter quebrado"],
    suspeitos: [
      { nome: "A Empregada", desc: "Última a vê-lo vivo.", defesa: "Deixei o jantar e saí.", avatar: "👩‍🍳" },
      { nome: "O Rival Colecionador", desc: "Disputava a mesma espécie.", defesa: "Nem sabia que ele estava atrás dela.", avatar: "🦋" },
      { nome: "O Jardineiro", desc: "Cuidava do jardim.", defesa: "Só cuido das plantas.", avatar: "🌿" }
    ],
    culpado: "A Empregada",
    solucao: "A Empregada envenenou o frasco de éter que ele usava para capturar borboletas. Ele inalou o vapor e caiu morto sozinho.",
    dicas: ["Como alguém morre trancado?", "O éter é essencial para capturar borboletas.", "Quem tinha acesso ao material dele?"]
  },
  {
    id: 23,
    capitulo: 3,
    titulo: "A Bela Adormecida",
    resumo: "Uma atriz morre em seu camarim após tomar seu chá habitual.",
    premissa: "A atriz Srta. Estrela morreu em seu camarim antes da estreia. Seu chá habitual tinha um gosto amargo.",
    evidencias: ["Um batom trocado", "Uma carta de fã ameaçadora", "Um frasco de remédio para dormir vazio"],
    suspeitos: [
      { nome: "O Diretor", desc: "Substituiu-a por outra atriz.", defesa: "Ela era o nome do espetáculo!", avatar: "🎬" },
      { nome: "A Dublê", desc: "Substituiria em cenas de risco.", defesa: "Só faço cenas de ação.", avatar: "🎭" },
      { nome: "A Rival", desc: "Queria o papel principal.", defesa: "Nunca faria isso por um papel.", avatar: "👩‍🎤" }
    ],
    culpado: "A Dublê",
    solucao: "A Dublê queria o papel principal e colocou remédio para dormir no chá, mas exagerou na dose. O batom trocado era dela.",
    dicas: ["O remédio estava vazio — quem tinha acesso?", "Por que o batom foi trocado?", "Quem ganharia com a ausência dela?"]
  },
  {
    id: 24,
    capitulo: 3,
    titulo: "O Silêncio do Violoncelista",
    resumo: "Um violoncelista para de tocar no meio do concerto e cai morto.",
    premissa: "Durante a sinfonia, o violoncelista Sr. Cordas parou abruptamente e caiu morto. O público aplaudiu achando que era performance.",
    evidencias: ["Uma agulha fina no assento", "Um frasco de veneno no bolso do maestro", "Um sussurro entre os músicos"],
    suspeitos: [
      { nome: "O Maestro", desc: "Brigou com o violoncelista.", defesa: "Discordâncias musicais são normais.", avatar: "🎼" },
      { nome: "O Primeiro Violino", desc: "Rival direto.", defesa: "Respeito o Sr. Cordas.", avatar: "🎻" },
      { nome: "A Harpista", desc: "Namorada do maestro.", defesa: "Nada a ver comigo.", avatar: "🎵" }
    ],
    culpado: "O Maestro",
    solucao: "O Maestro colocou uma agulha envenenada no assento para eliminar o músico que ameaçava revelar plágio musical. O frasco no bolso foi descuido.",
    dicas: ["Uma agulha fina é uma arma discreta.", "O frasco no bolso do maestro é suspeito.", "Quem tinha mais a perder com a verdade?"]
  },
  {
    id: 25,
    capitulo: 3,
    titulo: "A Morte do Escultor",
    resumo: "Um escultor morre esmagado por sua própria obra.",
    premissa: "O escultor Sr. Mármore foi encontrado esmagado por uma estátua inacabada. A corda que a sustentava foi cortada.",
    evidencias: ["Corte limpo na corda", "Uma faca de cozinha no chão", "Marcas de giz no chão"],
    suspeitos: [
      { nome: "O Aprendiz", desc: "Trabalhava com ele.", defesa: "Ele era meu mestre!", avatar: "🔨" },
      { nome: "A Modelo", desc: "Posava para ele.", defesa: "Só trabalhava com ele.", avatar: "💃" },
      { nome: "O Galerista", desc: "Devia dinheiro a ele.", defesa: "Pago minhas dívidas.", avatar: "🖼️" }
    ],
    culpado: "O Aprendiz",
    solucao: "O Aprendiz cortou a corda durante o almoço, sabendo que o mestre voltaria para trabalhar. Queria assumir o ateliê.",
    dicas: ["O corte é limpo — ferramenta afiada.", "As marcas de giz indicam estudo.", "Quem herda o ateliê?"]
  },
  {
    id: 26,
    capitulo: 3,
    titulo: "O Fantasma do Cinema",
    resumo: "Um projecionista morre na sala de projeção durante um filme.",
    premissa: "Durante a exibição, o projecionista Sr. Filme morreu na sala. A porta estava trancada e ninguém entrou.",
    evidencias: ["Uma lata de filme aberta", "Um bilhete com horários", "Um cabo solto"],
    suspeitos: [
      { nome: "O Diretor do Cinema", desc: "Queria demiti-lo.", defesa: "Ele era o melhor projecionista.", avatar: "🎬" },
      { nome: "A Bilheteira", desc: "Namorada dele.", defesa: "Estava trabalhando no balcão.", avatar: "🎫" },
      { nome: "O Segurança", desc: "Fazia ronda.", defesa: "Só vi o filme rodando.", avatar: "💂" }
    ],
    culpado: "O Diretor do Cinema",
    solucao: "O Diretor soltou um cabo elétrico na sala de projeção sabendo que ele ia mexer no equipamento. A lata aberta foi para parecer acidente.",
    dicas: ["Por que o cabo estava solto?", "Quem queria demiti-lo?", "O bilhete com horários é distração."]
  },
  {
    id: 27,
    capitulo: 3,
    titulo: "A Herança do Vinicultor",
    resumo: "Um produtor de vinhos morre após beber de sua safra especial.",
    premissa: "O Sr. Vinho morreu após beber uma taça de sua safra reservada. Só ele tinha acesso à adega.",
    evidencias: ["Uma garrafa com rolha trocada", "Um bilhete com a palavra 'traição'", "Uma chave de adega no bolso do sobrinho"],
    suspeitos: [
      { nome: "O Sobrinho", desc: "Único herdeiro.", defesa: "Adorava meu tio!", avatar: "👨" },
      { nome: "A Enóloga", desc: "Fazia os vinhos.", defesa: "Só cuido da produção.", avatar: "🍇" },
      { nome: "O Mordomo", desc: "Servia os vinhos.", defesa: "Só sirvo o que me pedem.", avatar: "🤵" }
    ],
    culpado: "O Sobrinho",
    solucao: "O Sobrinho trocou a garrafa da safra especial por uma envenenada. A chave no bolso dele foi esquecida após o crime.",
    dicas: ["A rolha trocada indica adulteração.", "Quem tinha a chave da adega?", "O bilhete 'traição' é dele."]
  },
  {
    id: 28,
    capitulo: 3,
    titulo: "O Segredo do Fotógrafo",
    resumo: "Um fotógrafo é encontrado morto em seu estúdio.",
    premissa: "O fotógrafo Sr. Flash morreu em seu estúdio. As fotos no chão mostram uma pessoa que não deveria estar lá.",
    evidencias: ["Filme revelado com figura estranha", "Uma tesoura de jardinagem", "Um negativo escondido"],
    suspeitos: [
      { nome: "A Modelo", desc: "Estava nas fotos.", defesa: "Só fiz meu trabalho.", avatar: "📸" },
      { nome: "O Marido Ciumento", desc: "Apareceu no estúdio.", defesa: "Vim buscar minha esposa.", avatar: "😠" },
      { nome: "O Assistente", desc: "Revelava os filmes.", defesa: "Só cuidava do laboratório.", avatar: "🎞️" }
    ],
    culpado: "O Assistente",
    solucao: "O Assistente era cúmplice de chantagem e matou o fotógrafo para impedir que ele entregasse as provas à polícia.",
    dicas: ["A figura estranha nas fotos é a chave.", "Quem controlava o laboratório?", "O negativo escondido tem valor de prova."]
  },
  {
    id: 29,
    capitulo: 3,
    titulo: "O Assassinato do Bibliotecário",
    resumo: "Um bibliotecário é encontrado morto entre livros raros.",
    premissa: "O bibliotecário Sr. Livro morreu na seção de livros raros. Um exemplar do século XVI desapareceu.",
    evidencias: ["Uma escada caída", "Uma luva branca", "Uma anotação em um catálogo"],
    suspeitos: [
      { nome: "O Colecionador", desc: "Queria o livro.", defesa: "Ofereci comprar legalmente.", avatar: "📚" },
      { nome: "A Pesquisadora", desc: "Consultava o acervo.", defesa: "Só fazia pesquisa acadêmica.", avatar: "👩‍🎓" },
      { nome: "O Estagiário", desc: "Organizava as prateleiras.", defesa: "Só sigo as ordens.", avatar: "👦" }
    ],
    culpado: "O Colecionador",
    solucao: "O Colecionador tentou roubar o livro, foi confrontado pelo bibliotecário e o empurrou da escada. A luva era dele.",
    dicas: ["A escada caída não é acidente.", "A luva branca é típica de colecionadores.", "A anotação no catálogo é recente."]
  },
  {
    id: 30,
    capitulo: 3,
    titulo: "O Crime no Jardim Botânico",
    resumo: "Um botânico morre após cheirar uma flor rara.",
    premissa: "O botânico Sr. Flora morreu ao cheirar uma flor que ele mesmo cultivava. A flor tinha um cheiro estranho.",
    evidencias: ["Um frasco de perfume ao lado", "Uma seringa descartada", "Um livro sobre plantas venenosas aberto"],
    suspeitos: [
      { nome: "A Estagiária", desc: "Cuidava das flores.", defesa: "Só regava e podava.", avatar: "🌸" },
      { nome: "O Rival Botânico", desc: "Disputava a descoberta.", defesa: "Nunca entraria no jardim dele.", avatar: "🌺" },
      { nome: "A Esposa", desc: "Herdeira da estufa.", defesa: "Amo plantas tanto quanto ele.", avatar: "👩" }
    ],
    culpado: "A Estagiária",
    solucao: "A Estagiária injetou veneno no caule da flor. Ele, ao cheirar, inalou o vapor concentrado.",
    dicas: ["A seringa descartada é a prova.", "Quem cuidava diretamente das flores?", "O livro aberto é tentativa de desviar."]
  },

  // ===== CAPÍTULO 4 — O SINDICATO (31-40) =====
  {
    id: 31,
    capitulo: 4,
    titulo: "O Mistério do Cemitério",
    resumo: "Um coveiro morre durante o turno da noite.",
    premissa: "O coveiro Sr. Terra morreu durante o turno. Um túmulo recente foi aberto e um caixão revirado.",
    evidencias: ["Uma pá com sangue", "Uma lanterna quebrada", "Uma pegada de bota grande"],
    suspeitos: [
      { nome: "O Coveiro Auxiliar", desc: "Trabalhava com ele.", defesa: "Só cavo covas.", avatar: "⛏️" },
      { nome: "O Ladrão de Túmulos", desc: "Conhecido na região.", defesa: "Estou aposentado.", avatar: "💀" },
      { nome: "O Parente do Falecido", desc: "Queria recuperar uma joia.", defesa: "Só queria a aliança dela.", avatar: "👤" }
    ],
    culpado: "O Ladrão de Túmulos",
    solucao: "O ladrão foi surpreendido pelo coveiro e o matou com a pá. A pegada grande é dele.",
    dicas: ["A bota grande é uma pista física.", "Quem tem histórico de violar túmulos?", "O túmulo específico tem valor?"]
  },
  {
    id: 32,
    capitulo: 4,
    titulo: "O Assassinato na Padaria",
    resumo: "Um padeiro morre após comer seu próprio pão.",
    premissa: "O padeiro Sr. Pão morreu após comer o primeiro pão do dia. Nenhum cliente passou mal.",
    evidencias: ["Um pote de mel aberto", "Uma faca de passar manteiga", "Um bilhete: 'Você vai pagar'"],
    suspeitos: [
      { nome: "O Aprendiz", desc: "Queria o negócio.", defesa: "Só aprendo o ofício.", avatar: "🥖" },
      { nome: "A Confeiteira", desc: "Namorada traída.", defesa: "Não tenho nada a ver.", avatar: "🧁" },
      { nome: "O Fornecedor", desc: "Devia dinheiro a ele.", defesa: "Pago em dia.", avatar: "🚚" }
    ],
    culpado: "A Confeiteira",
    solucao: "A Confeiteira passou veneno no mel que ele usava só no primeiro pão. Ninguém mais comia com mel.",
    dicas: ["Por que só ele passou mal?", "O mel era de uso exclusivo dele?", "O bilhete revela motivo passional."]
  },
  {
    id: 33,
    capitulo: 4,
    titulo: "O Crime do Alfaiate",
    resumo: "Um alfaiate morre esfaqueado por uma tesoura.",
    premissa: "O alfaiate Sr. Linha foi encontrado morto com uma tesoura cravada no peito. A porta estava trancada por dentro.",
    evidencias: ["Um molde de terno rasgado", "Uma agulha de costura no chão", "Um alfinete com sangue"],
    suspeitos: [
      { nome: "O Cliente Importante", desc: "Brigou pelo atraso.", defesa: "Só reclamei do prazo.", avatar: "👔" },
      { nome: "A Costureira", desc: "Trabalhava com ele.", defesa: "Estava em casa doente.", avatar: "🧵" },
      { nome: "O Rival Alfaiate", desc: "Roubava clientes.", defesa: "Concorrência é normal.", avatar: "✂️" }
    ],
    culpado: "A Costureira",
    solucao: "A Costureira estava escondida na loja após o fechamento. Discussão, crime e fuga pela janela dos fundos.",
    dicas: ["Como a porta está trancada por dentro?", "Quem conhece o layout da loja?", "O molde rasgado indica briga."]
  },
  {
    id: 34,
    capitulo: 4,
    titulo: "O Naufrágio Falso",
    resumo: "Um capitão desaparece após naufrágio.",
    premissa: "O capitão Sr. Mar desapareceu após um 'naufrágio'. O barco foi encontrado intacto e vazio.",
    evidencias: ["Um cofre aberto", "Um mapa com rota estranha", "Um bilhete com coordenadas"],
    suspeitos: [
      { nome: "O Imediato", desc: "Assumiu o comando.", defesa: "Só obedeci ordens.", avatar: "⚓" },
      { nome: "A Esposa", desc: "Herdeira do seguro.", defesa: "Amo meu marido!", avatar: "👩" },
      { nome: "O Armador", desc: "Dono do barco.", defesa: "Perdi muito dinheiro com isso.", avatar: "🚢" }
    ],
    culpado: "O Imediato",
    solucao: "O Imediato simulou o naufrágio para roubar o cofre e fugir. O capitão foi jogado ao mar.",
    dicas: ["Por que o barco está intacto?", "As coordenadas levam para onde?", "Quem assumiu o comando?"]
  },
  {
    id: 35,
    capitulo: 4,
    titulo: "A Morte do Enxadrista",
    resumo: "Um enxadrista morre durante a partida.",
    premissa: "O enxadrista Sr. Xeque morreu durante o campeonato. Um peão branco desapareceu do tabuleiro.",
    evidencias: ["Uma marca no pescoço", "Um peão na mão do adversário", "Uma garrafa de água aberta"],
    suspeitos: [
      { nome: "O Adversário", desc: "Perdia a partida.", defesa: "Só jogava xadrez.", avatar: "♟️" },
      { nome: "O Árbitro", desc: "Viu tudo.", defesa: "Não vi nada de estranho.", avatar: "🧑‍⚖️" },
      { nome: "A Treinadora", desc: "Amante do morto.", defesa: "Só o ajudava com estratégia.", avatar: "👩‍🏫" }
    ],
    culpado: "O Adversário",
    solucao: "O Adversário usou o peão com uma agulha escondida para injetar veneno no pescoço durante um aperto de mãos.",
    dicas: ["A marca no pescoço é recente.", "Por que o peão está na mão dele?", "Quem tinha mais a perder?"]
  },
  {
    id: 36,
    capitulo: 4,
    titulo: "O Crime da Cartomante",
    resumo: "Uma cartomante prevê sua própria morte e é encontrada morta.",
    premissa: "A cartomante Madame Lua previu sua morte para o dia seguinte. Foi encontrada morta exatamente como descreveu.",
    evidencias: ["Cartas de tarô espalhadas", "Uma vela queimada", "Um bilhete com a data"],
    suspeitos: [
      { nome: "A Cliente Frequente", desc: "Ouviu a previsão.", defesa: "Só fui consultar.", avatar: "🔮" },
      { nome: "O Marido", desc: "Traído publicamente.", defesa: "Já superei.", avatar: "👨" },
      { nome: "A Rival", desc: "Outra cartomante.", defesa: "Concorrência sadia.", avatar: "🌙" }
    ],
    culpado: "A Rival",
    solucao: "A Rival enviou ameaças fingindo ser 'o destino', e cumpriu a profecia para parecer sobrenatural.",
    dicas: ["Como ela previu a própria morte?", "O bilhete com data é suspeito.", "Quem ganharia com a morte dela?"]
  },
  {
    id: 37,
    capitulo: 4,
    titulo: "O Assassinato do Mágico",
    resumo: "Um mágico morre durante seu truque mais famoso.",
    premissa: "O mágico Sr. Ilusão morreu dentro da caixa de seu truque. A caixa estava trancada por dentro e por fora.",
    evidencias: ["Um espelho quebrado", "Uma fenda na caixa", "Um alfinete grande"],
    suspeitos: [
      { nome: "A Assistente", desc: "Sabia todos os truques.", defesa: "Ajudei ele a ficar famoso!", avatar: "🎩" },
      { nome: "O Ilusionista Rival", desc: "Copiou seu truque.", defesa: "Só me inspirei.", avatar: "🃏" },
      { nome: "O Produtor", desc: "Ganharia com o seguro.", defesa: "Ele valia mais vivo.", avatar: "💼" }
    ],
    culpado: "A Assistente",
    solucao: "A Assistente trocou o mecanismo da caixa, fazendo com que a lâmina do truque o matasse. A fenda foi usada para inserir a arma real.",
    dicas: ["Como morrer dentro de caixa trancada?", "Quem manipulava o mecanismo?", "O espelho quebrado esconde algo."]
  },
  {
    id: 38,
    capitulo: 4,
    titulo: "O Mistério da Ópera",
    resumo: "Uma soprano cai morta no meio de uma ária.",
    premissa: "Durante a ópera, a soprano Srta. Nota caiu morta no palco enquanto o lustre despencava na plateia.",
    evidencias: ["Corda do lustre cortada", "Um frasco de veneno no camarim", "Uma luva de veludo no palco"],
    suspeitos: [
      { nome: "O Tenor", desc: "Rival artístico.", defesa: "Nunca faria isso!", avatar: "🎤" },
      { nome: "O Maestro", desc: "Brigou com ela.", defesa: "Discordâncias são normais.", avatar: "🎼" },
      { nome: "O Contra-regra", desc: "Cortou a corda?", defesa: "Só cuido do palco.", avatar: "🔧" }
    ],
    culpado: "O Tenor",
    solucao: "O Tenor envenenou a água da soprano e cortou a corda do lustre para causar pânico e desviar atenção.",
    dicas: ["Dois crimes ao mesmo tempo?", "O veneno foi no camarim — quem tinha acesso?", "A luva no palco é uma pista."]
  },
  {
    id: 39,
    capitulo: 4,
    titulo: "O Crime do Hotel",
    resumo: "Um hóspede morre no quarto 404.",
    premissa: "O Sr. Hóspede morreu no quarto 404. A porta estava trancada por dentro e a janela dava para um muro.",
    evidencias: ["Um copo com resíduo", "Uma chave extra no corredor", "Uma marca de batom no lençol"],
    suspeitos: [
      { nome: "A Camareira", desc: "Entrou no quarto.", defesa: "Só limpei o banheiro.", avatar: "🧹" },
      { nome: "O Gerente", desc: "Tem chave mestra.", defesa: "Nunca entro nos quartos.", avatar: "👔" },
      { nome: "A Acompanhante", desc: "Estava com ele.", defesa: "Fui embora cedo.", avatar: "💄" }
    ],
    culpado: "A Camareira",
    solucao: "A Camareira tinha chave extra e voltou após o check-out dela. Envenenou a bebida e trancou por fora com a chave.",
    dicas: ["A chave extra no corredor é a prova.", "Quem pode trancar por fora?", "A marca de batom é distração."]
  },
  {
    id: 40,
    capitulo: 4,
    titulo: "O Assassinato do Pintor",
    resumo: "Um pintor morre na frente de sua tela inacabada.",
    premissa: "O pintor Sr. Tela morreu em seu ateliê. O autorretrato que ele fazia tinha uma expressão de medo.",
    evidencias: ["Tinta fresca no chão", "Um copo de vinho derramado", "Uma faca de paleta limpa demais"],
    suspeitos: [
      { nome: "A Modelo", desc: "Posava para ele.", defesa: "Só fazia poses.", avatar: "💃" },
      { nome: "O Galerista", desc: "Roubou obras dele.", defesa: "Vendi tudo legalmente.", avatar: "🖼️" },
      { nome: "O Irmão", desc: "Herdeiro do ateliê.", defesa: "Apoiava a arte dele.", avatar: "👨" }
    ],
    culpado: "O Irmão",
    solucao: "O Irmão matou o pintor por causa de uma herança. A faca limpa demais revela que foi lavada após o crime.",
    dicas: ["Por que a faca está limpa demais?", "A expressão de medo é real ou pintada?", "Quem herda o ateliê?"]
  },

  // ===== CAPÍTULO 5 — O CÉREBRO (41-54) =====
  {
    id: 41,
    capitulo: 5,
    titulo: "O Mistério do Zoológico",
    resumo: "Um tratador é encontrado morto na jaula do leão.",
    premissa: "O tratador Sr. Selva morreu dentro da jaula do leão. A jaula estava trancada por fora.",
    evidencias: ["Uma chave no chão", "Carne envenenada no canto", "Uma marca de garra falsa"],
    suspeitos: [
      { nome: "O Veterinário", desc: "Cuidava dos animais.", defesa: "Só faço exames.", avatar: "🩺" },
      { nome: "O Diretor do Zoo", desc: "Queria demiti-lo.", defesa: "Ele era o melhor tratador.", avatar: "👔" },
      { nome: "O Outro Tratador", desc: "Rivalidade antiga.", defesa: "Nunca entrei na jaula dele.", avatar: "🦁" }
    ],
    culpado: "O Outro Tratador",
    solucao: "Ele drogou o leão com carne envenenada, trancou o colega na jaula e forjou o ataque com uma garra falsa.",
    dicas: ["A marca de garra é falsa.", "A chave no chão é a prova.", "Quem queria o posto dele?"]
  },
  {
    id: 42,
    capitulo: 5,
    titulo: "O Crime da Estação de Rádio",
    resumo: "Um locutor morre ao vivo durante o programa.",
    premissa: "O locutor Sr. Onda morreu ao vivo. A porta do estúdio estava trancada por dentro e a transmissão continuou.",
    evidencias: ["Um fone com fio rompido", "Um copo de café derramado", "Uma mensagem no painel: 'Você sabia demais'"],
    suspeitos: [
      { nome: "O Técnico de Som", desc: "Controlava o equipamento.", defesa: "Só ajustava o som.", avatar: "🎚️" },
      { nome: "A Produtora", desc: "Tinha acesso ao estúdio.", defesa: "Estava na sala de controle.", avatar: "👩‍💼" },
      { nome: "O Diretor", desc: "Queria demiti-lo.", defesa: "Ele era o melhor locutor.", avatar: "📻" }
    ],
    culpado: "O Técnico de Som",
    solucao: "O Técnico eletrocutou o locutor através do fone modificado. A mensagem foi plantada para parecer crime político.",
    dicas: ["O fio rompido tem marcas de queimadura.", "Quem mexe no equipamento de áudio?", "A mensagem no painel é plantada."]
  },
  {
    id: 43,
    capitulo: 5,
    titulo: "O Assassinato do Relojoeiro II",
    resumo: "Um relojoeiro morre em sua loja. Todos os relógios pararam às 15h47.",
    premissa: "O relojoeiro Sr. Hora morreu em sua loja. Todos os relógios pararam no mesmo instante.",
    evidencias: ["Uma engrenagem na mão dele", "Uma chave de fenda suja", "Uma nota com horário exato"],
    suspeitos: [
      { nome: "O Aprendiz", desc: "Queria a loja.", defesa: "Só aprendo o ofício.", avatar: "🔧" },
      { nome: "A Filha", desc: "Herdeira.", defesa: "Amo meu pai.", avatar: "👧" },
      { nome: "O Cobrador", desc: "Devia dinheiro a ele.", defesa: "Estava pagando.", avatar: "💰" }
    ],
    culpado: "O Aprendiz",
    solucao: "O Aprendiz parou todos os relógios para forjar a hora da morte e ter um álibi. A nota com horário era dele.",
    dicas: ["Como TODOS os relógios pararam juntos?", "Quem sabia mexer em relógios?", "A nota com horário é álibi falso."]
  },
  {
    id: 44,
    capitulo: 5,
    titulo: "O Crime da Floricultura",
    resumo: "Uma florista morre entre suas flores.",
    premissa: "A florista Srta. Pétala morreu entre suas flores. Um buquê foi entregue depois, sem remetente.",
    evidencias: ["Uma tesoura de poda com sangue", "Um cartão com mensagem cifrada", "Uma rosa negra no balcão"],
    suspeitos: [
      { nome: "O Entregador", desc: "Trouxe o buquê.", defesa: "Só entrego flores.", avatar: "🚚" },
      { nome: "A Cliente Obsessiva", desc: "Enviava flores para ela.", defesa: "Só admirava o trabalho dela.", avatar: "🌹" },
      { nome: "O Ex-Namorado", desc: "Ameaçou ela.", defesa: "Já superei.", avatar: "👨" }
    ],
    culpado: "A Cliente Obsessiva",
    solucao: "A Cliente invadiu a loja e a matou com a tesoura. Depois enviou o buquê como despedida mórbida.",
    dicas: ["A rosa negra é um símbolo importante.", "O cartão cifrado revela obsessão.", "Quem enviaria flores PARA a florista?"]
  },
  {
    id: 45,
    capitulo: 5,
    titulo: "O Naufrágio do Iate",
    resumo: "Um empresário morre em seu iate.",
    premissa: "O empresário Sr. Luxo morreu em seu iate durante uma festa. A tripulação diz que ele caiu sozinho.",
    evidencias: ["Um copo com resíduo estranho", "Uma corda cortada", "Um bilhete no bolso do capitão"],
    suspeitos: [
      { nome: "O Capitão", desc: "Comandava o iate.", defesa: "Só cumpri minha função.", avatar: "⚓" },
      { nome: "A Esposa", desc: "Herdeira da fortuna.", defesa: "Amo meu marido!", avatar: "👩" },
      { nome: "O Convidado", desc: "Rival de negócios.", defesa: "Só vim à festa.", avatar: "👔" }
    ],
    culpado: "O Capitão",
    solucao: "O Capitão foi contratado pela esposa para simular um acidente. O bilhete no bolso era o pagamento combinado.",
    dicas: ["A corda cortada não é natural.", "O bilhete no bolso do capitão é crucial.", "Quem ganha com a morte dele?"]
  },
  {
    id: 46,
    capitulo: 5,
    titulo: "O Crime da Universidade",
    resumo: "Um professor morre em seu escritório trancado.",
    premissa: "O professor Sr. Doutor morreu em seu escritório. A porta estava trancada e a janela no 5º andar não abre.",
    evidencias: ["Um livro com anotação estranha", "Uma caneta quebrada", "Uma chave reserva no armário"],
    suspeitos: [
      { nome: "O Aluno Brilhante", desc: "Discussão sobre nota.", defesa: "Só queria minha nota.", avatar: "🎓" },
      { nome: "A Colega Professora", desc: "Rivalidade acadêmica.", defesa: "Respeito o trabalho dele.", avatar: "👩‍🏫" },
      { nome: "O Zelador", desc: "Tem chave de tudo.", defesa: "Só limpo o escritório.", avatar: "🧹" }
    ],
    culpado: "O Zelador",
    solucao: "O Zelador tinha chave reserva e matou o professor por causa de uma dívida de jogo. A caneta quebrada é marca da luta.",
    dicas: ["A chave reserva no armário é suspeita.", "A janela não abre — como sair?", "Quem tem acesso a todas as chaves?"]
  },
  {
    id: 47,
    capitulo: 5,
    titulo: "O Assassinato do Joalheiro",
    resumo: "Um joalheiro morre em sua loja.",
    premissa: "O joalheiro Sr. Ouro morreu em sua loja. A joia mais valiosa foi trocada por uma réplica.",
    evidencias: ["Uma lupa caída no chão", "Uma pinça com resíduo", "Um recibo de compra de réplica"],
    suspeitos: [
      { nome: "O Funcionário", desc: "Vendia as joias.", defesa: "Só atendo clientes.", avatar: "💼" },
      { nome: "A Compradora", desc: "Comprou a réplica.", defesa: "Só queria uma joia bonita.", avatar: "💍" },
      { nome: "O Segurança", desc: "Fazia ronda.", defesa: "Só olho as câmeras.", avatar: "💂" }
    ],
    culpado: "O Funcionário",
    solucao: "O Funcionário comprou a réplica, trocou pela joia real e matou o joalheiro quando foi descoberto. O recibo é a prova.",
    dicas: ["O recibo da réplica é crucial.", "Quem tinha acesso direto às joias?", "A lupa e a pinça indicam inspeção."]
  },
  {
    id: 48,
    capitulo: 5,
    titulo: "O Mistério do Circo",
    resumo: "Um trapezista cai durante o show.",
    premissa: "O trapezista Sr. Voo caiu durante a apresentação. A rede de segurança estava cortada de propósito.",
    evidencias: ["Corda cortada com precisão", "Uma luva de palhaço", "Um bilhete com ameaça"],
    suspeitos: [
      { nome: "O Palhaço", desc: "Rivalidade antiga.", defesa: "Só faço as crianças rirem.", avatar: "🤡" },
      { nome: "A Contorcionista", desc: "Ex-namorada dele.", defesa: "Superei o término.", avatar: "🤸" },
      { nome: "O Domador", desc: "Brigou com ele.", defesa: "Brigas de circo são normais.", avatar: "🦁" }
    ],
    culpado: "O Palhaço",
    solucao: "O Palhaço cortou a rede para se vingar de humilhações. A luva era dele, esquecida no local.",
    dicas: ["A luva de palhaço é a prova.", "O corte preciso indica ferramenta afiada.", "Quem tinha motivo passional?"]
  },
  {
    id: 49,
    capitulo: 5,
    titulo: "O Crime do Laboratório",
    resumo: "Um cientista morre em seu laboratório.",
    premissa: "O cientista Sr. Química morreu em seu laboratório. Uma amostra de vírus modificado desapareceu.",
    evidencias: ["Um frasco quebrado", "Uma luva rasgada", "Um cartão de acesso bloqueado"],
    suspeitos: [
      { nome: "A Assistente", desc: "Trabalhava com ele.", defesa: "Só preparava amostras.", avatar: "🥼" },
      { nome: "O Concorrente", desc: "Rival científico.", defesa: "Nunca entrei no laboratório dele.", avatar: "🧪" },
      { nome: "O Segurança", desc: "Fazia ronda.", defesa: "Só cuido do prédio.", avatar: "💂" }
    ],
    culpado: "A Assistente",
    solucao: "A Assistente roubou a amostra para vender e matou o cientista quando foi confrontada. A luva rasgada é dela.",
    dicas: ["A luva rasgada tem DNA.", "Quem tinha cartão de acesso?", "Por que a amostra específica sumiu?"]
  },
  {
    id: 50,
    capitulo: 5,
    titulo: "O Assassinato do Carteiro",
    resumo: "Um carteiro morre em sua rota.",
    premissa: "O carteiro Sr. Correio morreu durante sua rota. Uma carta específica não foi entregue.",
    evidencias: ["Um envelope aberto", "Uma bicicleta caída", "Uma testemunha viu uma discussão"],
    suspeitos: [
      { nome: "O Destinatário", desc: "Esperava a carta.", defesa: "Só queria minha carta.", avatar: "📬" },
      { nome: "O Remetente", desc: "Enviou a carta.", defesa: "Só mandei informações.", avatar: "✉️" },
      { nome: "O Vizinho", desc: "Brigou com ele.", defesa: "Só reclamei do barulho.", avatar: "🏠" }
    ],
    culpado: "O Destinatário",
    solucao: "O Destinatário queria interceptar a carta com informações comprometedoras. Matou o carteiro e rasgou o envelope.",
    dicas: ["Por que aquela carta específica não foi entregue?", "O envelope aberto é a prova.", "Quem tinha a ganhar com o conteúdo?"]
  },
  {
    id: 51,
    capitulo: 5,
    titulo: "O Crime do Restaurante Chinês",
    resumo: "Um cliente morre após comer biscoito da sorte.",
    premissa: "O Sr. Fome morreu após comer um biscoito da sorte. O bilhete dizia 'Você vai pagar'.",
    evidencias: ["Biscoito com veneno", "Um bilhete cifrado", "Um garçom nervoso"],
    suspeitos: [
      { nome: "O Garçom", desc: "Trouxe o biscoito.", defesa: "Só entreguei o pedido.", avatar: "🥢" },
      { nome: "O Cozinheiro", desc: "Fez o biscoito.", defesa: "Só preparo a massa.", avatar: "👨‍🍳" },
      { nome: "O Dono", desc: "Devia dinheiro a ele.", defesa: "Pago minhas dívidas.", avatar: "🏮" }
    ],
    culpado: "O Garçom",
    solucao: "O Garçom escolheu o biscoito específico e colocou veneno dentro. O bilhete era uma vingança pessoal.",
    dicas: ["Por que só o biscoito dele tinha veneno?", "Quem escolhe qual biscoito vai pra mesa?", "O bilhete é uma mensagem pessoal."]
  },
  {
    id: 52,
    capitulo: 5,
    titulo: "O Assassinato na Piscina",
    resumo: "Um nadador olímpico morre afogado na piscina.",
    premissa: "O nadador Sr. Água morreu afogado na piscina do clube. Ele era campeão olímpico.",
    evidencias: ["Uma bebida com sedativo", "Um roupão trocado", "Uma câmera desligada"],
    suspeitos: [
      { nome: "A Treinadora", desc: "Discutiu com ele.", defesa: "Só cobrei resultados.", avatar: "🏊" },
      { nome: "O Rival", desc: "Perdeu a vaga olímpica.", defesa: "Já superei.", avatar: "🥈" },
      { nome: "O Massagista", desc: "Aplicou sedativo?", defesa: "Só faço massagens.", avatar: "💆" }
    ],
    culpado: "O Rival",
    solucao: "O Rival colocou sedativo na bebida dele e desligou a câmera. Ele adormeceu na água e se afogou.",
    dicas: ["Como um campeão se afoga?", "O sedativo é a chave.", "Quem tinha motivo esportivo?"]
  },
  {
    id: 53,
    capitulo: 5,
    titulo: "O Mistério da Cartomante II",
    resumo: "Outra cartomante morre. As cartas formam uma mensagem clara.",
    premissa: "A cartomante Madame Estrela morreu em sua tenda. As cartas na mesa formavam a palavra 'TRAIDOR'.",
    evidencias: ["Uma carta extra escondida na manga", "Um lenço com perfume masculino", "Uma vela com marca de dedo"],
    suspeitos: [
      { nome: "O Marido", desc: "Traído publicamente.", defesa: "Nunca a traí.", avatar: "👨" },
      { nome: "A Irmã", desc: "Herdeira da tenda.", defesa: "Amo minha irmã.", avatar: "👩" },
      { nome: "O Cliente Fiel", desc: "Apaixonado por ela.", defesa: "Só admirava o dom dela.", avatar: "🔮" }
    ],
    culpado: "O Cliente Fiel",
    solucao: "O Cliente era obcecado. Ao ser rejeitado, matou e montou as cartas formando 'TRAIDOR' como mensagem distorcida.",
    dicas: ["A palavra 'TRAIDOR' pode ser uma pista falsa.", "O perfume masculino é do assassino.", "Quem era obcecado por ela?"]
  },
  {
    id: 54,
    capitulo: 5,
    titulo: "O Crime do Marceneiro",
    resumo: "Um marceneiro morre em sua oficina.",
    premissa: "O marceneiro Sr. Madeira morreu em sua oficina. Uma cadeira foi concluída após sua morte.",
    evidencias: ["Serragem fresca", "Uma chave de fenda faltando", "Uma encomenda urgente"],
    suspeitos: [
      { nome: "O Aprendiz", desc: "Terminou a cadeira.", defesa: "Só finalizei o trabalho.", avatar: "🪚" },
      { nome: "O Cliente", desc: "Encomendou a cadeira.", defesa: "Só queria meu móvel.", avatar: "🪑" },
      { nome: "O Filho", desc: "Herdeiro da oficina.", defesa: "Nunca mexi em ferramentas.", avatar: "👦" }
    ],
    culpado: "O Aprendiz",
    solucao: "O Aprendiz matou o mestre para assumir a oficina e concluiu a cadeira às pressas. A chave de fenda faltando é a arma.",
    dicas: ["A serragem fresca indica trabalho recente.", "Quem terminou o móvel?", "A chave de fenda faltando é crucial."]
  }
];

// ============================================================
// CHEFÕES DE CAMPANHA
// ============================================================

const CHEFOES = [
  {
    id: 1001,
    capitulo: 1,
    titulo: "O Mestre da Distração",
    resumo: "Um ladrão de elite testa suas habilidades contra você.",
    premissa: "Durante o maior leilão de arte do ano, três obras desapareceram simultaneamente em salas separadas. Todas as câmeras foram desligadas por exatamente 47 segundos. Isso não é obra de amador — é um teste.",
    evidencias: [
      "Um cronômetro digital parado em 47 segundos",
      "Três cartas de baralho deixadas nas cenas",
      "Nenhuma digital, nenhum cabelo, nada"
    ],
    suspeitos: [
      { nome: "O Leiloeiro", desc: "Conhecia a rotina de cada sala.", defesa: "Eu estava no palco durante todo o evento!", avatar: "🔨" },
      { nome: "O Segurança-Chefe", desc: "Sabia dos pontos cegos.", defesa: "Fui o primeiro a notar o roubo. Não teria motivos.", avatar: "💂" },
      { nome: "O Colecionador Misterioso", desc: "Ninguém o conhece.", defesa: "Só vim comprar. Não sou ladrão.", avatar: "🕴️" }
    ],
    culpado: "O Colecionador Misterioso",
    solucao: "O Colecionador é o Mestre da Distração. Ele contratou três cúmplices, cada um numa sala diferente, e sincronizou tudo em 47 segundos. As cartas são sua assinatura — ele as deixa como provocação.",
    dicas: ["47 segundos é tempo demais para um só ladrão.", "As cartas são uma assinatura.", "Quem não tinha álibi nem motivo aparente?"],
    ehChefao: true
  },
  {
    id: 1002,
    capitulo: 2,
    titulo: "A Aranha",
    resumo: "Uma mente criminosa tecida em uma rede de mentiras.",
    premissa: "Cinco membros de um cartel apareceram mortos em cinco cidades diferentes no mesmo dia. Cada um recebeu uma carta idêntica antes de morrer. A polícia acredita que é uma guerra interna. Mas você sabe que é algo pior.",
    evidencias: [
      "Cinco cartas com o mesmo símbolo: uma aranha",
      "Os cinco mortos tinham contatos em comum",
      "Uma lista parcial encontrada num cofre"
    ],
    suspeitos: [
      { nome: "O Banqueiro Suíço", desc: "Lavava o dinheiro do cartel.", defesa: "Só cuidava das contas. Nunca me envolvi com violência.", avatar: "🏦" },
      { nome: "O Advogado do Cartel", desc: "Sabia de todos os segredos.", defesa: "Eu os defendia. Se quisesse matá-los, não os defenderia.", avatar: "⚖️" },
      { nome: "A Viúva do Fundador", desc: "Sumiu após a morte do marido.", defesa: "Chorei a morte dele. Não sou assassina.", avatar: "🕷️" }
    ],
    culpado: "A Viúva do Fundador",
    solucao: "A Aranha é a Viúva. Ela passou anos coletando informação dos negócios do marido. Quando ele morreu, ela decidiu eliminar todos os herdeiros e ficar com o império. A aranha é seu símbolo pessoal — era o apelido dela antes de casar.",
    dicas: ["Quem tinha acesso a TODOS os nomes da lista?", "O símbolo da aranha é a chave.", "Ninguém desconfiou dela porque parecia vítima."],
    ehChefao: true
  },
  {
    id: 1003,
    capitulo: 3,
    titulo: "O Camaleão",
    resumo: "Um criminoso que muda de identidade em cada cidade.",
    premissa: "Em seis meses, seis crimes idênticos em seis cidades diferentes. Em cada uma, uma pessoa 'desapareceu' e outra 'chegou'. A polícia não percebeu o padrão. Você percebeu.",
    evidencias: [
      "Seis passaportes com fotos diferentes mas mesmo queixo",
      "Um diário escrito em código",
      "Uma foto de infância encontrada num dos esconderijos"
    ],
    suspeitos: [
      { nome: "O Fotógrafo Viajante", desc: "Estava em todas as cidades.", defesa: "Viajo para trabalhar. Isso não me faz criminoso.", avatar: "📷" },
      { nome: "A Jornalista Investigativa", desc: "Cobriu todos os casos.", defesa: "Estava investigando justamente esses crimes!", avatar: "📰" },
      { nome: "O Funcionário de Aeroporto", desc: "Poderia criar identidades falsas.", defesa: "Só faço check-in. Não forjo documentos.", avatar: "✈️" }
    ],
    culpado: "O Fotógrafo Viajante",
    solucao: "O Camaleão é o Fotógrafo. Ele viaja para 'trabalhar' e em cada cidade assume uma nova identidade. A foto de infância é a única que sobrou de sua verdadeira origem — e ele a carrega por nostalgia.",
    dicas: ["Quem tem motivo para estar em todas as cidades?", "O queixo é a única característica imutável.", "A foto de infância revela a verdadeira identidade."],
    ehChefao: true
  },
  {
    id: 1004,
    capitulo: 4,
    titulo: "O Sindicato",
    resumo: "Um grupo de criminosos que age como empresa.",
    premissa: "Doze crimes perfeitos em doze meses. Cada um executado por uma pessoa diferente, sem conexão aparente. Mas os doze têm uma assinatura sutil: sempre roubam algo pequeno e aparentemente sem valor.",
    evidencias: [
      "Doze objetos aparentemente inúteis roubados",
      "Uma lista de nomes codificada",
      "Um cofre com doze compartimentos vazios"
    ],
    suspeitos: [
      { nome: "O Empresário Filantropo", desc: "Financia projetos sociais.", defesa: "Ajudo a comunidade. Não sou criminoso.", avatar: "💼" },
      { nome: "A Funcionária Pública", desc: "Conhece os processos legais.", defesa: "Só faço meu trabalho no cartório.", avatar: "📋" },
      { nome: "O Professor de História", desc: "Especialista em sociedades secretas.", defesa: "Estudo o passado. Não crio o presente.", avatar: "📚" }
    ],
    culpado: "O Empresário Filantropo",
    solucao: "O Sindicato é uma rede de doze criminosos liderada pelo Empresário. Cada um rouba um objeto específico que, junto com os outros onze, forma uma chave para abrir um cofre lendário. A fachada filantrópica esconde tudo.",
    dicas: ["Os objetos roubados devem formar algo juntos.", "Quem teria recursos para organizar 12 pessoas?", "A fachada de filantropo é perfeita demais."],
    ehChefao: true
  },
  {
    id: 1005,
    capitulo: 5,
    titulo: "O CÉREBRO",
    resumo: "O mentor por trás de tudo. O verdadeiro vilão.",
    premissa: "Todos os criminosos que você prendeu tinham um ponto em comum: recebiam instruções de alguém. Alguém que nunca foi visto. Alguém que sempre esteve um passo à frente. Agora, você finalmente tem a chance de confrontá-lo.",
    evidencias: [
      "Todos os suspeitos anteriores tinham o mesmo número na agenda",
      "Uma carta escrita à mão encontrada em cada cena de crime",
      "Um padrão matemático em todos os crimes — sempre números primos"
    ],
    suspeitos: [
      { nome: "O Detetive Aposentado", desc: "Seu mentor na polícia.", defesa: "Eu te ensinei tudo. Confie em mim, garoto.", avatar: "🎩" },
      { nome: "A Promotora", desc: "Trabalhou em todos os casos.", defesa: "Estou do lado da lei. Sempre estive.", avatar: "⚖️" },
      { nome: "O Professor de Matemática", desc: "Especialista em números primos.", defesa: "Ensino números, não cometo crimes.", avatar: "🧮" },
      { nome: "Você Mesmo", desc: "O detetive que resolveu tudo.", defesa: "Eu? Não faz sentido... ou faz?", avatar: "🕵️" }
    ],
    culpado: "O Detetive Aposentado",
    solucao: "O CÉREBRO é seu mentor. Ele treinou você desde o início — não para resolver crimes, mas para se tornar o melhor detetive possível, porque só um detetive perfeito pode ser um criminoso perfeito. Ele usou cada caso que você resolveu para aprender com seus erros e nunca ser pego. Você foi o experimento dele. E agora, ele quer que você se junte a ele.",
    dicas: ["Quem te conhece melhor que ninguém?", "Quem sabia de cada movimento seu durante todo o jogo?", "O verdadeiro vilão é aquele em quem você mais confia."],
    ehChefao: true,
    ehFinal: true
  }
];

// ============================================================
// CONQUISTAS
// ============================================================
const CONQUISTAS = [
  { id: 'primeiro', icone: '🎯', nome: 'Primeiro Caso', desc: 'Resolva seu primeiro caso' },
  { id: 'cinco', icone: '🎖️', nome: 'Iniciante', desc: 'Resolva 5 casos' },
  { id: 'dez', icone: '🥉', nome: 'Detetive Júnior', desc: 'Resolva 10 casos' },
  { id: 'vinte', icone: '🥈', nome: 'Investigador', desc: 'Resolva 20 casos' },
  { id: 'trinta', icone: '🥇', nome: 'Detetive Sênior', desc: 'Resolva 30 casos' },
  { id: 'quarenta', icone: '🎩', nome: 'Veterano', desc: 'Resolva 40 casos' },
  { id: 'cinquenta', icone: '👑', nome: 'Lenda Viva', desc: 'Resolva 50 casos' },
  { id: 'completo', icone: '🏆', nome: 'Arquivo Fechado', desc: 'Resolva os 54 casos' },
  { id: 'sem_dica', icone: '🕵️', nome: 'Olho Clínico', desc: 'Resolva um caso sem dicas' },
  { id: 'sem_dica_10', icone: '👁️', nome: 'Visão de Águia', desc: 'Resolva 10 casos sem dicas' },
  { id: 'primeira', icone: '💯', nome: 'Primeira Tentativa', desc: 'Acerte um caso de primeira' },
  { id: 'primeira_10', icone: '🌟', nome: 'Precisão Cirúrgica', desc: 'Acerte 10 casos de primeira' },
  { id: 'primeira_todos', icone: '🔮', nome: 'Vidente', desc: 'Acerte TODOS de primeira' },
  { id: 'rapido', icone: '⚡', nome: 'Relâmpago', desc: 'Resolva um caso em menos de 30s' },
  { id: 'contrarrelogio', icone: '⏱️', nome: 'Velocidade Máxima', desc: 'Complete o modo contrarrelógio' },
  { id: 'perfeicao', icone: '🎯', nome: 'Perfeccionista', desc: 'Complete o modo perfeição' },
  { id: 'chefao1', icone: '🔨', nome: 'Mestre da Distração', desc: 'Derrote o primeiro chefão' },
  { id: 'chefao2', icone: '🕷️', nome: 'Caçador de Aranhas', desc: 'Derrote A Aranha' },
  { id: 'chefao3', icone: '🦎', nome: 'Camaleão Desmascarado', desc: 'Derrote O Camaleão' },
  { id: 'chefao4', icone: '💼', nome: 'Sindicato Desmantelado', desc: 'Derrote O Sindicato' },
  { id: 'chefao5', icone: '🧠', nome: 'CÉREBRO', desc: 'Derrote O CÉREBRO' },
  { id: 'nivel10', icone: '⭐', nome: 'Nível 10', desc: 'Alcance o nível 10' },
  { id: 'nivel25', icone: '🌠', nome: 'Nível 25', desc: 'Alcance o nível 25' },
  { id: 'nivel50', icone: '💫', nome: 'Nível 50', desc: 'Alcance o nível 50' },
  { id: 'colecao_completa', icone: '🎴', nome: 'Colecionador', desc: 'Complete a coleção de cartas' },
  { id: 'rank_s', icone: '🥇', nome: 'Rank S', desc: 'Alcance o rank S' },
  { id: 'rank_ss', icone: '💎', nome: 'Rank SS', desc: 'Alcance o rank SS' },
  { id: 'rank_sss', icone: '🌟', nome: 'Rank SSS', desc: 'Alcance o rank máximo' },
  { id: 'temas_todos', icone: '🎨', nome: 'Estilista', desc: 'Desbloqueie todos os temas' },
  { id: 'impecavel', icone: '💯', nome: 'Impecável', desc: 'Resolva todos os 54 casos sem errar' }
];

// ============================================================
// TEMAS DESBLOQUEÁVEIS
// ============================================================
const TEMAS = [
  { id: 'noir', nome: 'Noir Clássico', desc: 'O visual original do Arquivo Morto', req: 0, preview: 'linear-gradient(135deg, #1a1410, #8b1a1a)' },
  { id: 'sangue', nome: 'Sangue Frio', desc: 'Vermelho intenso e brutal', req: 5, preview: 'linear-gradient(135deg, #0a0000, #d40000)' },
  { id: 'cyber', nome: 'Cyberpunk', desc: 'Neon, glitch e futurismo', req: 15, preview: 'linear-gradient(135deg, #ff0080, #00ffcc)' },
  { id: 'vhs', nome: 'VHS Anos 80', desc: 'Nostalgia retrô com scanlines', req: 25, preview: 'linear-gradient(135deg, #d43b8a, #4ae0d4)' },
  { id: 'sherlock', nome: 'Sherlock Vintage', desc: 'Elegância vitoriana', req: 40, preview: 'linear-gradient(135deg, #5a3a1a, #c49a3a)' },
  { id: 'lenda', nome: 'Lenda', desc: 'O tema dos verdadeiros mestres', req: 54, preview: 'linear-gradient(135deg, #d4a83a, #ffed4e)' }
];

// ============================================================
// CAPÍTULOS DA CAMPANHA
// ============================================================
const CAPITULOS = [
  { id: 1, nome: 'Os Primeiros Casos', desc: 'Casos 1-10: Aprenda os fundamentos da investigação.', chefao: 1001 },
  { id: 2, nome: 'A Rede Criminosa', desc: 'Casos 11-20: Uma organização oculta se revela.', chefao: 1002 },
  { id: 3, nome: 'O Mestre dos Disfarces', desc: 'Casos 21-30: Ninguém é quem parece ser.', chefao: 1003 },
  { id: 4, nome: 'O Sindicato', desc: 'Casos 31-40: A teia se fecha ao seu redor.', chefao: 1004 },
  { id: 5, nome: 'O CÉREBRO', desc: 'Casos 41-54: A verdade final. O mentor aparece.', chefao: 1005 }
];

// ============================================================
// RARIDADES DAS CARTAS
// ============================================================
const RARIDADES = {
  comum: { nome: 'COMUM', cor: '#666', peso: 60 },
  rara: { nome: 'RARA', cor: '#3a6ea5', peso: 25 },
  epica: { nome: 'ÉPICA', cor: '#7a3aa5', peso: 12 },
  lendaria: { nome: 'LENDÁRIA', cor: '#d4a83a', peso: 3 }
};

// ============================================================
// EXPORTAR
// ============================================================
window.CASOS = CASOS;
window.CHEFOES = CHEFOES;
window.CONQUISTAS = CONQUISTAS;
window.TEMAS = TEMAS;
window.CAPITULOS = CAPITULOS;
window.RARIDADES = RARIDADES;

console.log('✓ ' + CASOS.length + ' casos + ' + CHEFOES.length + ' chefões carregados');
console.log('✓ ' + CONQUISTAS.length + ' conquistas disponíveis');
console.log('✓ ' + TEMAS.length + ' temas desbloqueáveis');