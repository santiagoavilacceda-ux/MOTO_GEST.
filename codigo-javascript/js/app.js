// Controlador principal de MotoGest (Navegación y Persistencia en localStorage)
(function () {
  const STORAGE_KEY = 'motogest_js_orders_v1';

  const savedOrders = localStorage.getItem(STORAGE_KEY);
  const state = {
    activeTab: 'checkin',
    orders: savedOrders ? JSON.parse(savedOrders) : [...window.MotoGestData.initialOrders],
    warranties: [...window.MotoGestData.initialWarranties]
  };

  function saveOrders() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.orders));
  }

  function renderView() {
    const container = document.getElementById('app-content');
    const titleEl = document.getElementById('topbar-title');

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === state.activeTab);
    });

    if (state.activeTab === 'checkin') {
      titleEl.innerHTML = 'MotoGest | Nueva Orden de Taller (<span class="mono">#OS-1045</span>)';
      window.CheckInModule.render(container, state, (newOrder) => {
        state.orders.unshift(newOrder);
        saveOrders();
      });
    } else if (state.activeTab === 'warranties') {
      titleEl.textContent = 'MotoGest | Centro de Garantías con Semáforo Automático';
      window.GarantiasModule.render(container, state);
    } else if (state.activeTab === 'orders') {
      titleEl.textContent = 'MotoGest | Tablero de Órdenes en Bahía';
      window.KanbanModule.renderOrders(container, state, (orderId) => {
        const order = state.orders.find(o => o.id === orderId);
        if (order) {
          order.status = order.status === 'Ingresada' ? 'En Reparación' : 'Lista para Entrega';
          saveOrders();
          renderView();
        }
      });
    } else if (state.activeTab === 'team') {
      titleEl.textContent = 'MotoGest | Personal & Mecánicos';
      window.KanbanModule.renderTeam(container, state);
    }
  }

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeTab = btn.getAttribute('data-tab');
      renderView();
    });
  });

  renderView();
})();
