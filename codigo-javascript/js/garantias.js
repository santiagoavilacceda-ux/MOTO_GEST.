// Módulo 4: Centro de Garantías con Semáforo Automático
window.GarantiasModule = {
  searchQuery: 'ABC-12D',

  render(container, state) {
    const query = this.searchQuery.trim().toUpperCase();
    const results = state.warranties.filter(w =>
      w.plate.toUpperCase() === query ||
      w.documentId.toUpperCase() === query ||
      w.invoiceNumber.toUpperCase() === query
    );

    const cardsHtml = results.length === 0
      ? '<div class="card"><div class="card-body">No se encontraron garantías para: <strong>' + query + '</strong></div></div>'
      : results.map(w => {
          const isVigente = w.status === 'vigente';
          const badge = isVigente
            ? '<span class="badge-vigente">🟢 EN GARANTÍA (Vigente: ' + w.remainingDays + ' días restantes de ' + w.totalDays + ')</span>'
            : '<span class="badge-vencida">🔴 GARANTÍA VENCIDA (Superó el límite de cobertura de ' + w.totalDays + ' días)</span>';

          const actionBtn = isVigente
            ? '<button type="button" class="btn-primary" data-claim-id="' + w.id + '">🛡️ RADICAR SOLICITUD DE GARANTÍA (RF03)</button>'
            : '<button type="button" class="btn-disabled" disabled>Botón Deshabilitado: Fuera de Plazo</button>';

          return (
            '<div class="card">' +
              '<div class="card-header">' +
                '<span class="mono">ORDEN ' + w.orderNumber + ' · Realizada el ' + w.completionDate + ' (Hace ' + w.daysAgo + ' días)</span>' +
                '<span class="plate-badge">' + w.plate + '</span>' +
              '</div>' +
              '<div class="card-body">' +
                '<p style="margin-bottom:8px;"><strong>Trabajos:</strong> ' + w.jobsDone + '</p>' +
                '<p style="margin-bottom:12px; font-size:13px;"><strong>Técnico:</strong> ' + w.mechanicName + ' | <strong>Factura:</strong> <span class="mono">' + w.invoiceNumber + '</span></p>' +
                '<div style="margin-bottom:14px;">' + badge + '</div>' +
                '<div style="display:flex; justify-content:flex-end;">' + actionBtn + '</div>' +
              '</div>' +
            '</div>'
          );
        }).join('');

    container.innerHTML =
      '<div class="card">' +
        '<div class="card-header"><span>CONSULTA Y GESTIÓN DE GARANTÍAS (MÓDULO 4)</span></div>' +
        '<div class="card-body" style="display:flex; gap:10px; align-items:flex-end;">' +
          '<div style="flex:1;">' +
            '<label>Buscar historial por Placa, Cédula o Factura</label>' +
            '<input type="text" id="gar-search-input" class="mono" value="' + this.searchQuery + '" placeholder="Ej: ABC-12D, 1020304050 o FAC-8821" />' +
          '</div>' +
          '<button type="button" id="gar-search-btn" class="btn-primary">Consultar Garantía</button>' +
        '</div>' +
      '</div>' +
      '<div id="gar-feedback"></div>' +
      cardsHtml;

    document.getElementById('gar-search-btn').addEventListener('click', () => {
      this.searchQuery = document.getElementById('gar-search-input').value;
      this.render(container, state);
    });

    container.querySelectorAll('[data-claim-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-claim-id');
        const warranty = state.warranties.find(item => item.id === id);
        if (!warranty) return;
        document.getElementById('gar-feedback').innerHTML =
          '<div class="alert-success" style="margin-bottom:16px;">' +
          '<strong>Solicitud de Garantía (RF03) radicada en estado Pendiente</strong> sobre la orden ' +
          '<span class="mono">' + warranty.orderNumber + '</span> (Placa ' + warranty.plate + '). Costo cliente: $0 COP.' +
          '</div>';
      });
    });
  }
};
