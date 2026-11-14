// Tablero de Órdenes y Personal Técnico
window.KanbanModule = {
  renderOrders(container, state, onAdvanceStatus) {
    const cards = state.orders.map(order => {
      const mec = window.MotoGestData.mechanics.find(m => m.id === order.mechanicId);
      return (
        '<div class="card">' +
          '<div class="card-header">' +
            '<span class="mono">' + order.id + '</span>' +
            '<span class="plate-badge">' + order.plate + '</span>' +
          '</div>' +
          '<div class="card-body">' +
            '<p><strong>' + order.bike + '</strong> · ' + order.clientName + ' (CC <span class="mono">' + order.documentId + '</span>)</p>' +
            '<p style="font-size:13px; color:#475569; margin:8px 0;">' + order.issuesReport + '</p>' +
            '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">' +
              '<span style="font-size:12px;">Técnico: <strong>' + (mec ? mec.name : 'Sin asignar') + '</strong> · Estado: <strong>' + order.status + '</strong></span>' +
              '<button type="button" class="btn-secondary" data-advance="' + order.id + '">Avanzar Estado</button>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    container.innerHTML = '<h2 style="margin-bottom:14px;">Órdenes Activas en Taller (' + state.orders.length + ')</h2>' + cards;

    container.querySelectorAll('[data-advance]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        onAdvanceStatus(e.target.getAttribute('data-advance'));
      });
    });
  },

  renderTeam(container, state) {
    const cards = window.MotoGestData.mechanics.map(m => {
      const count = state.orders.filter(o => o.mechanicId === m.id).length;
      return (
        '<div class="card"><div class="card-body">' +
          '<h3>' + m.name + '</h3>' +
          '<p style="color:#2563EB; font-size:12px; font-weight:700;">' + m.role + '</p>' +
          '<p style="font-size:13px; color:#475569; margin:6px 0;">' + m.specialty + '</p>' +
          '<p style="font-size:12px;">Órdenes asignadas en bahía: <strong class="mono">' + count + '</strong></p>' +
        '</div></div>'
      );
    }).join('');

    container.innerHTML = '<div class="grid-2">' + cards + '</div>';
  }
};
