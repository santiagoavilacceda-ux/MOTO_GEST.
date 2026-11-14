// Datos base de MotoGest (Módulos 1, 2, 3 y 4)
window.MotoGestData = {
  mechanics: [
    { id: 'MEC-01', name: 'Juan Mecánico', role: 'Técnico Líder', specialty: 'Frenos ABS e Inyección' },
    { id: 'MEC-02', name: 'Andrés Gómez', role: 'Técnico Especialista', specialty: 'Kits de Arrastre y Embrague' },
    { id: 'MEC-03', name: 'Carlos Ruiz', role: 'Técnico Mecatrónico', specialty: 'Sistema Eléctrico y ECU' },
    { id: 'MEC-04', name: 'Valentina Méndez', role: 'Técnica de Suspensión', specialty: 'Barras y Rodamientos' }
  ],

  initialPhotos: [
    { id: 'F-1', title: 'Foto 1: Odómetro', subtitle: '24,150 km' },
    { id: 'F-2', title: 'Foto 2: Rayón escape', subtitle: 'lado der.' },
    { id: 'F-3', title: 'Foto 3: Cúpula frontal', subtitle: 'sin daños' }
  ],

  initialOrders: [
    {
      id: '#OS-1045',
      clientName: 'Carlos Pérez',
      documentId: '1020304050',
      phone: '310 987 6543',
      plate: 'ABC-12D',
      bike: 'Yamaha MT-03 321cc',
      odometerKm: 24150,
      issuesReport: 'Ruido seco en tren delantero al frenar fuerte y cambio pastillas',
      mechanicId: 'MEC-01',
      status: 'Ingresada'
    },
    {
      id: '#OS-1044',
      clientName: 'Daniela Forero',
      documentId: '1019283746',
      phone: '312 456 7890',
      plate: 'KJH-55E',
      bike: 'KTM Duke 390 373cc',
      odometerKm: 18400,
      issuesReport: 'Revisión periódica de 18.000 km y cambio de kit de arrastre.',
      mechanicId: 'MEC-02',
      status: 'En Reparación'
    }
  ],

  initialWarranties: [
    {
      id: 'WAR-01',
      orderNumber: '#OS-1020',
      plate: 'ABC-12D',
      documentId: '1020304050',
      invoiceNumber: 'FAC-8821',
      clientName: 'Carlos Pérez',
      bikeModel: 'Yamaha MT-03',
      completionDate: '24/Oct/2026',
      daysAgo: 14,
      totalDays: 30,
      remainingDays: 16,
      jobsDone: 'Cambio de pastillas de freno y líquido hidráulico DOT4.',
      mechanicName: 'Juan Mecánico',
      status: 'vigente'
    },
    {
      id: 'WAR-02',
      orderNumber: '#OS-0980',
      plate: 'ABC-12D',
      documentId: '1020304050',
      invoiceNumber: 'FAC-7104',
      clientName: 'Carlos Pérez',
      bikeModel: 'Yamaha MT-03',
      completionDate: '10/Feb/2026',
      daysAgo: 270,
      totalDays: 60,
      remainingDays: 0,
      jobsDone: 'Cambio de kit de arrastre y bujía Iridium.',
      mechanicName: 'Andrés Gómez',
      status: 'vencida'
    }
  ]
};
