// ============================================================
// ARQUIVO MORTO v6.0 — RANKING ONLINE (Firebase)
// ============================================================
// Configuração do Firebase — Arquivo Morto
// Projeto: arquivo-morto-443a8

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBx_RwxDfGrNiew2pknWYhFpr6W8x1bY6k",
  authDomain: "arquivo-morto-443a8.firebaseapp.com",
  projectId: "arquivo-morto-443a8",
  storageBucket: "arquivo-morto-443a8.firebasestorage.app",
  messagingSenderId: "495303922324",
  appId: "1:495303922324:web:da38da69a27c469d21da81"
};

let firebaseApp = null;
let firebaseDB = null;
let usuarioAtual = null;
let onlineEstado = {
  conectado: false,
  modoOffline: true,
  rankingCache: [],
  erro: null
};

// ===== INICIALIZAR FIREBASE (carregamento dinâmico) =====
async function iniciarFirebase() {
  try {
    // Carrega Firebase dinamicamente via CDN
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js');
    const { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } = 
      await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js');
    const { getAuth, signInAnonymously, onAuthStateChanged } = 
      await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js');
    
    firebaseApp = initializeApp(FIREBASE_CONFIG);
    firebaseDB = getFirestore(firebaseApp);
    const auth = getAuth(firebaseApp);
    
    // Expõe funções do Firebase globalmente
    window._fb = { 
      getFirestore, 
      collection, 
      addDoc, 
      getDocs, 
      query, 
      orderBy, 
      limit, 
      serverTimestamp, 
      firebaseDB 
    };
    
    // Login anônimo — espera o login completar
    return new Promise(function(resolve) {
      onAuthStateChanged(auth, async function(user) {
        if (user) {
          usuarioAtual = user;
          onlineEstado.conectado = true;
          onlineEstado.modoOffline = false;
          onlineEstado.erro = null;
          console.log('✓ Firebase conectado. UID:', user.uid);
          resolve(true);
        } else {
          // Tenta fazer login anônimo
          try {
            await signInAnonymously(auth);
          } catch(e) {
            console.warn('⚠️ Login anônimo falhou:', e.message);
            onlineEstado.modoOffline = true;
            onlineEstado.erro = e.message;
            resolve(false);
          }
        }
      });
    });
    
  } catch(e) {
    console.warn('⚠️ Firebase não configurado. Rodando offline.', e.message);
    onlineEstado.modoOffline = true;
    onlineEstado.erro = e.message;
    return false;
  }
}

// ===== ENVIAR PONTUAÇÃO =====
async function enviarPontuacaoOnline() {
  if (onlineEstado.modoOffline || !window._fb) {
    console.log('Modo offline — pontuação salva localmente');
    return false;
  }
  
  try {
    const est = window.estado || {};
    const nome = prompt('🏆 Digite seu nome para o ranking online:') || 'Anônimo';
    
    const { collection, addDoc, serverTimestamp, firebaseDB } = window._fb;
    
    await addDoc(collection(firebaseDB, 'ranking'), {
      nome: nome.substring(0, 20),
      pontos: est.pontos || 0,
      resolvidos: (est.resolvidos || []).length,
      nivel: est.nivel || 1,
      conquistas: (est.conquistas || []).length,
      uid: usuarioAtual ? usuarioAtual.uid : 'anon',
      timestamp: serverTimestamp()
    });
    
    console.log('✓ Pontuação enviada para o ranking online');
    return true;
  } catch(e) {
    console.warn('Erro ao enviar pontuação:', e.message);
    return false;
  }
}

// ===== BUSCAR RANKING ONLINE =====
async function buscarRankingOnline() {
  if (onlineEstado.modoOffline || !window._fb) {
    console.log('Modo offline — usando cache local');
    return onlineEstado.rankingCache;
  }
  
  try {
    const { collection, getDocs, query, orderBy, limit, firebaseDB } = window._fb;
    
    const q = query(
      collection(firebaseDB, 'ranking'),
      orderBy('pontos', 'desc'),
      limit(100)
    );
    
    const snapshot = await getDocs(q);
    const ranking = [];
    
    snapshot.forEach(function(doc) {
      ranking.push(doc.data());
    });
    
    onlineEstado.rankingCache = ranking;
    console.log('✓ Ranking online carregado:', ranking.length, 'detetives');
    return ranking;
  } catch(e) {
    console.warn('Erro ao buscar ranking:', e.message);
    return onlineEstado.rankingCache;
  }
}

// ===== RENDERIZAR RANKING ONLINE =====
async function renderRankingOnline() {
  const lista = document.getElementById('ranking-lista');
  if (!lista) return;
  
  lista.innerHTML = '<p style="text-align:center;color:var(--dourado);padding:2rem">📡 Carregando ranking online...</p>';
  
  const ranking = await buscarRankingOnline();
  
  if (ranking.length === 0) {
    lista.innerHTML = '<p style="text-align:center;color:#888;padding:2rem">Nenhuma pontuação online ainda.<br>Jogue para ser o primeiro!</p>';
    return;
  }
  
  let html = '<div class="ranking-online-info">';
  if (onlineEstado.modoOffline) {
    html += '🔌 <strong>Modo Offline</strong> — mostrando apenas seu ranking local';
    if (onlineEstado.erro) {
      html += '<br><small style="color:#a05050">Erro: ' + onlineEstado.erro + '</small>';
    }
  } else {
    html += '🌐 <strong>Ranking Online</strong> — ' + ranking.length + ' detetives';
  }
  html += '</div>';
  
  html += '<table class="ranking-tabela"><thead><tr><th>#</th><th>Detetive</th><th>Pontos</th><th>Nível</th><th>Casos</th></tr></thead><tbody>';
  
  ranking.forEach(function(r, i) {
    const medalha = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
    html += '<tr>' +
      '<td class="ranking-pos">' + medalha + '</td>' +
      '<td>' + (typeof escapeHTML === 'function' ? escapeHTML(r.nome) : r.nome) + '</td>' +
      '<td class="ranking-pontos">' + r.pontos + '</td>' +
      '<td>Nv ' + r.nivel + '</td>' +
      '<td>' + r.resolvidos + '</td>' +
    '</tr>';
  });
  
  html += '</tbody></table>';
  lista.innerHTML = html;
}

// ===== INICIALIZAR =====
async function iniciarOnline() {
  console.log('🌐 Iniciando sistema online...');
  const conectado = await iniciarFirebase();
  
  if (conectado) {
    console.log('✓ Sistema online carregado (Firebase conectado)');
  } else {
    console.log('✓ Sistema online em modo offline (fallback local)');
  }
  
  return conectado;
}

// ===== EXPORTAR =====
window.iniciarOnline = iniciarOnline;
window.enviarPontuacaoOnline = enviarPontuacaoOnline;
window.buscarRankingOnline = buscarRankingOnline;
window.renderRankingOnline = renderRankingOnline;
window.onlineEstado = onlineEstado;

console.log('✓ Módulo online carregado');