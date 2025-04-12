import React, { createContext, useContext, useState, ReactNode } from 'react';
import { calendarEvents, goals, meals, exercises, transactions, motivationalQuotes } from '@/data/mockData';

// Definición de tipos para el contexto
type AppContextType = {
  // Calendario
  events: typeof calendarEvents;
  addEvent: (event: typeof calendarEvents[0]) => void;
  updateEvent: (id: string, updatedEvent: Partial<typeof calendarEvents[0]>) => void;
  deleteEvent: (id: string) => void;
  
  // Objetivos
  goalsList: typeof goals;
  toggleGoalCompletion: (id: string) => void;
  addGoal: (text: string) => void;
  deleteGoal: (id: string) => void;
  
  // Nutrición
  mealsList: typeof meals;
  toggleMealItemCompletion: (mealTitle: string, itemId: string) => void;
  addMealItem: (mealTitle: string, name: string) => void;
  deleteMealItem: (mealTitle: string, itemId: string) => void;
  
  // Entrenamiento
  exercisesList: typeof exercises;
  updateExercise: (id: string, updatedExercise: Partial<typeof exercises[0]>) => void;
  addExercise: (exercise: typeof exercises[0]) => void;
  deleteExercise: (id: string) => void;
  
  // Finanzas
  transactionsList: typeof transactions;
  addTransaction: (transaction: typeof transactions[0]) => void;
  deleteTransaction: (id: string) => void;
  
  // Frases motivacionales
  getRandomQuote: () => typeof motivationalQuotes[0];
};

// Crear el contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
};

// Proveedor del contexto
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado para cada módulo
  const [events, setEvents] = useState(calendarEvents);
  const [goalsList, setGoalsList] = useState(goals);
  const [mealsList, setMealsList] = useState(meals);
  const [exercisesList, setExercisesList] = useState(exercises);
  const [transactionsList, setTransactionsList] = useState(transactions);
  
  // Funciones para el calendario
  const addEvent = (event: typeof calendarEvents[0]) => {
    setEvents([...events, event]);
  };
  
  const updateEvent = (id: string, updatedEvent: Partial<typeof calendarEvents[0]>) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  };
  
  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };
  
  // Funciones para objetivos
  const toggleGoalCompletion = (id: string) => {
    setGoalsList(goalsList.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };
  
  const addGoal = (text: string) => {
    const newGoal = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setGoalsList([...goalsList, newGoal]);
  };
  
  const deleteGoal = (id: string) => {
    setGoalsList(goalsList.filter(goal => goal.id !== id));
  };
  
  // Funciones para nutrición
  const toggleMealItemCompletion = (mealTitle: string, itemId: string) => {
    setMealsList(mealsList.map(meal => {
      if (meal.title === mealTitle) {
        return {
          ...meal,
          items: meal.items.map(item => 
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
        };
      }
      return meal;
    }));
  };
  
  const addMealItem = (mealTitle: string, name: string) => {
    setMealsList(mealsList.map(meal => {
      if (meal.title === mealTitle) {
        return {
          ...meal,
          items: [
            ...meal.items,
            { id: Date.now().toString(), name, completed: false },
          ],
        };
      }
      return meal;
    }));
  };
  
  const deleteMealItem = (mealTitle: string, itemId: string) => {
    setMealsList(mealsList.map(meal => {
      if (meal.title === mealTitle) {
        return {
          ...meal,
          items: meal.items.filter(item => item.id !== itemId),
        };
      }
      return meal;
    }));
  };
  
  // Funciones para entrenamiento
  const updateExercise = (id: string, updatedExercise: Partial<typeof exercises[0]>) => {
    setExercisesList(exercisesList.map(exercise => 
      exercise.id === id ? { ...exercise, ...updatedExercise } : exercise
    ));
  };
  
  const addExercise = (exercise: typeof exercises[0]) => {
    setExercisesList([...exercisesList, exercise]);
  };
  
  const deleteExercise = (id: string) => {
    setExercisesList(exercisesList.filter(exercise => exercise.id !== id));
  };
  
  // Funciones para finanzas
  const addTransaction = (transaction: typeof transactions[0]) => {
    setTransactionsList([...transactionsList, transaction]);
  };
  
  const deleteTransaction = (id: string) => {
    setTransactionsList(transactionsList.filter(transaction => transaction.id !== id));
  };
  
  // Función para obtener una frase motivacional aleatoria
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  };
  
  // Valor del contexto
  const value: AppContextType = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    goalsList,
    toggleGoalCompletion,
    addGoal,
    deleteGoal,
    mealsList,
    toggleMealItemCompletion,
    addMealItem,
    deleteMealItem,
    exercisesList,
    updateExercise,
    addExercise,
    deleteExercise,
    transactionsList,
    addTransaction,
    deleteTransaction,
    getRandomQuote,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};