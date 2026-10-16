// ============================================================
// ARQUIVO MORTO v8.1 — NOTIFICAÇÕES PUSH (FIX vibrate)
// ============================================================

async function iniciarNotificacoes() {
  if (!window.Capacitor || !window.Capacitor.Plugins.LocalNotifications) {
    console.log('ℹ️ Notificações push disponíveis apenas no app nativo');
    return;
  }

  try {
    const { LocalNotifications } = window.Capacitor.Plugins;

    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== 'granted') {
      console.log('⚠️ Permissão de notificações negada');
      return;
    }

    console.log('✓ Notificações ativadas');
    agendarNotificacaoDiaria();

  } catch(e) {
    console.warn('Erro ao iniciar notificações:', e.message);
  }
}

async function agendarNotificacaoDiaria() {
  if (!window.Capacitor || !window.Capacitor.Plugins.LocalNotifications) return;

  try {
    const { LocalNotifications } = window.Capacitor.Plugins;

    await LocalNotifications.schedule({
      notifications: [
        {
          title: '🕵️ Arquivo Morto',
          body: 'Novas missões disponíveis! Volte a investigar.',
          id: 1,
          schedule: {
            on: { hour: 20, minute: 0 },
            repeats: true
          },
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null
        }
      ]
    });

    console.log('✓ Notificação diária agendada para 20h');
  } catch(e) {
    console.warn('Erro ao agendar notificação:', e.message);
  }
}

function notificarConquista(titulo, mensagem) {
  if (!window.Capacitor || !window.Capacitor.Plugins.LocalNotifications) return;

  window.Capacitor.Plugins.LocalNotifications.schedule({
    notifications: [{
      title: titulo,
      body: mensagem,
      id: Math.floor(Math.random() * 100000),
      schedule: { at: new Date(Date.now() + 1000) }
    }]
  });
}

window.iniciarNotificacoes = iniciarNotificacoes;
window.notificarConquista = notificarConquista;

console.log('✓ Módulo de notificações carregado (v8.1)');