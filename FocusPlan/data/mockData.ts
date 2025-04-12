// Archivo de datos mock para la aplicación FocusPlan

// Datos para el calendario
export const calendarEvents = [
  { id: '1', title: 'Trabajo', startTime: '08:00', endTime: '10:00', date: '2024-05-15', color: '#4285F4' },
  { id: '2', title: 'Examen', startTime: '14:00', endTime: '16:00', date: '2024-05-15', color: '#EA4335' },
  { id: '3', title: 'Reunión', startTime: '11:00', endTime: '12:30', date: '2024-05-16', color: '#FBBC05' },
  { id: '4', title: 'Estudio', startTime: '17:00', endTime: '19:00', date: '2024-05-16', color: '#34A853' },
  { id: '5', title: 'Deporte', startTime: '07:00', endTime: '08:30', date: '2024-05-17', color: '#4285F4' },
];

// Datos para los objetivos
export const goals = [
  { id: '1', text: 'Completar informe de proyecto', completed: true },
  { id: '2', text: 'Reunión con el equipo de diseño', completed: false },
  { id: '3', text: 'Revisar wireframes', completed: false },
  { id: '4', text: 'Actualizar documentación', completed: false },
];

// Datos para nutrición
export const meals = [
  {
    title: 'Desayuno',
    items: [
      { id: '1', name: 'Avena con frutas', completed: false },
      { id: '2', name: 'Yogur natural', completed: false },
    ],
  },
  {
    title: 'Almuerzo',
    items: [
      { id: '3', name: 'Ensalada de pollo', completed: false },
      { id: '4', name: 'Arroz integral', completed: false },
    ],
  },
  {
    title: 'Cena',
    items: [
      { id: '5', name: 'Salmón a la plancha', completed: false },
      { id: '6', name: 'Verduras al vapor', completed: false },
    ],
  },
  {
    title: 'Snack',
    items: [
      { id: '7', name: 'Frutos secos', completed: false },
      { id: '8', name: 'Manzana', completed: false },
    ],
  },
];

// Datos para entrenamiento
export const exercises = [
  { id: '1', name: 'Press de banca', sets: 4, reps: 10, weight: 70 },
  { id: '2', name: 'Sentadillas', sets: 3, reps: 12, weight: 80 },
  { id: '3', name: 'Dominadas', sets: 3, reps: 8, weight: 0 },
  { id: '4', name: 'Peso muerto', sets: 3, reps: 8, weight: 100 },
];

// Datos para finanzas
export const transactions = [
  { id: '1', description: 'Salario', amount: 1500, type: 'income', date: '01/05/2024' },
  { id: '2', description: 'Alquiler', amount: 600, type: 'expense', date: '03/05/2024' },
  { id: '3', description: 'Supermercado', amount: 120, type: 'expense', date: '05/05/2024' },
  { id: '4', description: 'Trabajo freelance', amount: 300, type: 'income', date: '10/05/2024' },
  { id: '5', description: 'Restaurante', amount: 45, type: 'expense', date: '12/05/2024' },
];

// Frases motivacionales para el dashboard
export const motivationalQuotes = [
  { quote: "La productividad no es hacer más cosas, sino hacer las cosas correctas.", author: "Peter Drucker" },
  { quote: "El tiempo es lo único que no podemos recuperar.", author: "Anónimo" },
  { quote: "La disciplina es el puente entre metas y logros.", author: "Jim Rohn" },
  { quote: "No cuentes los días, haz que los días cuenten.", author: "Muhammad Ali" },
  { quote: "La mejor manera de predecir el futuro es crearlo.", author: "Peter Drucker" },
];