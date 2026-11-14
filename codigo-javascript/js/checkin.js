// Módulo 3: Pantalla de Entrada / Check-in del Taller
window.CheckInModule = {
  photos: [...window.MotoGestData.initialPhotos],

  render(container, state, onSaveOrder) {
    const mechanicOptions = window.MotoGestData.mechanics
      .map(m => '<option value="' + m.id + '">' + m.name + ' (' + m.role + ')</option>')
      .join('');

    const photoCards = this.photos
      .map((p, index) =>
        '<div class="photo-card">' +
          '<strong>' + p.title + '</strong><br>' +
          '<span class="mono">' + p.subtitle + '</span><br><br>' +
          '<button type="button" class="btn-secondary" data-remove-photo="' + index + '">x Quitar</button>' +
        '</div>'
      )
      .join('');

    container.innerHTML =
      '<div class="grid-2">' +
        '<div>' +
          '<div class="card">' +
            '<div class="card-header"><span>PASO 1: DATOS DEL VEHÍCULO</span><span class="plate-badge">ABC-12D</span></div>' +
            '<div class="card-body">' +
              '<div class="form-grid">' +
                '<div><label>Cliente</label><input type="text" id="ci-client" value="Carlos Pérez" /></div>' +
                '<div><label>Cédula (CC)</label><input type="text" id="ci-doc" class="mono" value="1020304050" /></div>' +
                '<div><label>Motocicleta</label><input type="text" id="ci-bike" value="Yamaha MT-03 321cc" /></div>' +
                '<div><label>Placa</label><input type="text" id="ci-plate" class="mono" value="ABC-12D" /></div>' +
              '</div>' +
              '<div><label>Odómetro Actual (km)</label><input type="number" id="ci-km" class="mono" value="24150" /></div>' +
            '</div>' +
          '</div>' +

          '<div class="card">' +
            '<div class="card-header"><span>PASO 2: REPORTE DE FALLAS Y ASIGNACIÓN</span></div>' +
            '<div class="card-body">' +
              '<div style="margin-bottom:12px;">' +
                '<label>Ruidos / Solicitud del Cliente</label>' +
                '<textarea id="ci-issues" rows="3">Ruido seco en tren delantero al frenar fuerte y cambio pastillas</textarea>' +
              '</div>' +
              '<div>' +
                '<label>Mecánico Asignado</label>' +
                '<select id="ci-mechanic">' + mechanicOptions + '</select>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div>' +
          '<div class="card">' +
            '<div class="card-header"><span>PASO 3: CHECK-IN FOTOGRÁFICO (RF06)</span><span>' + this.photos.length + ' Fotos</span></div>' +
            '<div class="card-body">' +
              '<p style="font-size:12px; color:#64748B;">Estado exterior de ingreso (rayones, odómetro, cúpula):</p>' +
              '<div class="photo-grid">' +
                photoCards +
                '<div class="photo-card" style="border-style:dashed; text-align:center;">' +
                  '<strong>+ Subir Fotos</strong><br>' +
                  '<span style="font-size:11px; color:#64748B;">JPG, PNG - Máx 5MB</span><br><br>' +
                  '<input type="file" id="ci-photo-input" accept="image/*" style="font-size:11px;" />' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="card"><div class="card-body" style="display:flex; justify-content:space-between; align-items:center;">' +
            '<button type="button" id="ci-cancel" class="btn-secondary">Cancelar</button>' +
            '<button type="button" id="ci-submit" class="btn-primary">GENERAR ORDEN DE ENTRADA</button>' +
          '</div></div>' +
          '<div id="ci-feedback"></div>' +
        '</div>' +
      '</div>';

    // Eventos
    container.querySelectorAll('[data-remove-photo]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = Number(e.target.getAttribute('data-remove-photo'));
        this.photos.splice(idx, 1);
        this.render(container, state, onSaveOrder);
      });
    });

    const fileInput = document.getElementById('ci-photo-input');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        this.photos.push({
          id: 'F-' + Date.now(),
          title: file.name,
          subtitle: Math.round(file.size / 1024) + ' KB'
        });
        this.render(container, state, onSaveOrder);
      });
    }

    document.getElementById('ci-submit').addEventListener('click', () => {
      const clientName = document.getElementById('ci-client').value.trim();
      const documentId = document.getElementById('ci-doc').value.trim();
      const plate = document.getElementById('ci-plate').value.trim().toUpperCase();
      const bike = document.getElementById('ci-bike').value.trim();
      const odometerKm = Number(document.getElementById('ci-km').value);
      const issuesReport = document.getElementById('ci-issues').value.trim();
      const mechanicId = document.getElementById('ci-mechanic').value;

      if (!clientName || !documentId || !plate) {
        alert('Por favor completa los campos obligatorios: Cliente, Cédula y Placa.');
        return;
      }

      const newOrder = {
        id: '#OS-' + (1046 + state.orders.length),
        clientName,
        documentId,
        plate,
        bike,
        odometerKm,
        issuesReport,
        mechanicId,
        status: 'Ingresada'
      };

      onSaveOrder(newOrder);
      document.getElementById('ci-feedback').innerHTML =
        '<div class="alert-success"><strong>Orden ' + newOrder.id + ' generada exitosamente</strong> para ' +
        clientName + ' (<span class="mono">' + plate + '</span>).</div>';
    });
  }
};
