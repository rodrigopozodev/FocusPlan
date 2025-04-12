# FocusPlan - App Integral de Productividad Personal

## 🧩 Visión General del Proyecto

**Nombre de la app:** FocusPlan  
**Tipo de proyecto:** App integral de productividad personal  
**Estado actual:** Anteproyecto completo aprobado + En camino a prototipo navegable en Figma  
**Primera versión:** MVP funcional, limpio, navegable

**Descripción general:**  
FocusPlan es una app integral que une todas las herramientas clave para la organización personal y la mejora del rendimiento diario, dentro de un solo entorno fluido y amigable. Su enfoque principal es ayudar a las personas a planificar mejor su tiempo, cumplir objetivos, mejorar su salud y tener control financiero.

## 🎯 Objetivos de la App

- ✅ Planificación por bloques horarios (días, semanas, meses)
- ✅ Lista de objetivos diarios tachables
- ✅ Registro diario de comidas y recomendaciones nutricionales
- ✅ Registro de entrenamientos y marcas personales
- ✅ Registro de finanzas personales: ingresos, gastos y ahorros

**Enfoque:**
- Mejorar la productividad diaria
- Fomentar hábitos saludables
- Control total del progreso personal

## 🛠️ Proceso de Desarrollo

**Etapas:**
- Definición de necesidades ✅
- Creación de wireframes visuales ✅
- Generación del flujo de navegación ✅
- Preparación del prototipo navegable en Figma (en curso) 🚧
- Desarrollo del MVP inicial 🏗️
- Testeo, iteraciones y preparación de extras 🚀

## 🗂️ Estructura de Carpetas

```
/FocusPlan
│
├── /assets
│   ├── /images
│   │   ├── logo.png
│   │   ├── wireframes.png
│   │   └── splashscreen.png
│   └── /icons
│       └── app_icon.png
│
├── /src
│   ├── /components
│   │   ├── CalendarBlock.js
│   │   ├── DailyGoals.js
│   │   ├── NutritionTracker.js
│   │   ├── WorkoutTracker.js
│   │   └── FinanceTracker.js
│   │
│   ├── /screens
│   │   ├── Dashboard.js
│   │   ├── Calendar.js
│   │   ├── Goals.js
│   │   ├── Nutrition.js
│   │   ├── Workout.js
│   │   └── Finance.js
│   │
│   └── /navigation
│       └── AppNavigator.js
│
├── /design
│   ├── flowchart.pdf
│   └── prototype.fig
│
└── README.md
```

## 📱 Módulos / Funcionalidades

### 1. Calendario de Planificación por Bloques
- Planificador visual para organizar tiempo por horas, días, semanas y meses
- División flexible por:
  - Bloques de trabajo o estudio
  - Temas específicos (ej.: asignaturas, proyectos, áreas de interés)
  - Exámenes o tests programados
  - Descansos programados (para evitar saturación)
- Opcional: notificaciones o recordatorios

### 2. Lista de Objetivos Diarios
- Espacio para anotar objetivos del día
- Función para marcar objetivos como cumplidos (tachado o check)
- Historial o resumen de cumplimiento diario/semanal
- Opcional: notificación de los pendientes diarios

### 3. Planificador Nutricional Diario
- Plan de comidas personalizado para tus objetivos
- Recomendaciones diarias de:
  - Comidas principales
  - Snacks saludables
- Opcional: recetas o cantidades aproximadas según necesidades calóricas
- Registro de comidas ingeridas

### 4. Registro de Entrenamientos
- Registro diario de:
  - Ejercicios realizados
  - Series, repeticiones, pesos
  - Marcas personales (tiempos, pesos, distancias)
- Evolución de rendimiento por fechas
- Opcional: sugerencias de progresión

### 5. Gestión de Finanzas Personales
- Registro manual de:
  - Ingresos diarios
  - Gastos diarios
- Resumen automático:
  - Ahorros diarios/semanales/mensuales/anuales
  - Gráficas de evolución de gastos e ingresos

## 🔀 Flujo de Navegación
- Splash screen > Logo animado FocusPlan
- Dashboard principal > Resumen general del día
- Navegación inferior (tab bar):
  - 📅 Calendario
  - ✅ Objetivos diarios
  - 🥗 Nutrición
  - 🏋️‍♂️ Entrenamiento
  - 💰 Finanzas
- Acciones rápidas:
  - Añadir bloque calendario
  - Añadir objetivo diario
  - Registrar comida
  - Registrar entrenamiento
  - Registrar gasto/ingreso
- Transiciones suaves y limpias (estilo iOS)

## 💡 MVP Inicial (Primera versión de la app)

**Funcionalidades confirmadas:**
- Calendario de bloques básicos (creación/edición de bloques)
- Lista de objetivos diarios con opción de tachado
- Registro básico de comidas y nutrición
- Registro de entrenamientos y marcas personales
- Registro de finanzas personales: ingresos, gastos, ahorros
- Dashboard resumen diario y mensual

**Extras futuros planificados:**
- 📈 Estadísticas avanzadas
- ☁️ Copia de seguridad en la nube
- 🌙 Modo oscuro
- 🧩 Integración con otros dispositivos (health data)
- 📊 Exportación de datos